package com.llt.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.llt.beans.Group;
import com.llt.beans.User;
import com.mysql.jdbc.Driver;

/**
 * Servlet permettant la suppression d'un compte utilisateur par un administrateur
 * @author Paul Mariage
 */

public class deleteUser extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public deleteUser() {
		super();
	}

	/**
	 * Methode de traitement des requêtes de type GET
	 * Rends inaccessible la servlet si on tente d'y accéder en GET
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 * @param request la requête reçu par la servlet
	 * @param response la réponse envoyé par la servlet
	 * @exception {@link javax.servlet.ServletException}
	 * @exception {@link java.io.IOException}
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Tentative d'accès direct à la servlet deleteUser");
		getServletContext().getRequestDispatcher("/home.jsp").forward(request,
				response);
	}

	/**
	 * Methode de traitement des requêtes de type POST
	 * La méthode récupère les informations de l'utilisateur, supprime son compte sur
	 * la base de données, et l'informe par mail de la suppression de son compte
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response) 
	 * @param request la requête reçu par la servlet
	 * @param response la réponse envoyé par la servlet
	 * @exception {@link javax.servlet.ServletException}
	 * @exception {@link java.io.IOException}
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out
				.println("-----------------CreateUserAdmin------------------");
		System.out.println("Début doPost CreateUserAdmin");

		//Récupération des informations de l'utilisateur
		String login = request.getParameter("login");
		String nom = request.getParameter("nom");
		String prenom = request.getParameter("prenom");
		String email = request.getParameter("email");

		/* Connexion à la base de données */
		String url = "jdbc:mysql://localhost:8082/gestionPortail";
		String utilisateur = "root";
		String motDePasse = "root";
		Connection connexion = null;
		Statement stmt = null;
		ResultSet getUsers = null;
		List<User> listeUser = new ArrayList<User>();
		ResultSet getGroups = null;
		List<Group> listeGroup = new ArrayList<Group>();

		try {
			//Enregistrement du driver
			Class<?> driver_class = Class.forName("com.mysql.jdbc.Driver");
			Driver driver = (Driver) driver_class.newInstance();
			DriverManager.registerDriver(driver);

			// Réalisation de la connexion
			connexion = DriverManager.getConnection(url, utilisateur,
					motDePasse);

			// Création du statement
			stmt = connexion.createStatement();

			// Suppression de l'utilisateur
			stmt.executeUpdate("DELETE FROM user WHERE login='"+login+"';");
			
			//Envoi du mail à l'utilisateur concerné
			envoyerMailSMTP(new User(login,"",nom,prenom,email,"invite",false),true);

			// récupération de la liste d'utilisateur
			getUsers = stmt.executeQuery("SELECT * FROM user;");

			// Boucle de parcours getUsers

			while (getUsers.next()) {

				listeUser.add(new User(getUsers.getString("login"), getUsers
						.getString("password"),getUsers.getString("nom"),getUsers.getString("prenom"),getUsers.getString("email"), getUsers.getString("nomGroup"),
						getUsers.getBoolean("allowed")));

			}
			
			//Enregistrement de la liste d'utilisateur dans la requete
			request.setAttribute("listeUser", listeUser);
			
			//Récupération des groupes
			getGroups = stmt.executeQuery("SELECT * FROM groups;");


			//Boucle de parcours getGroups

			while (getGroups.next()) {

				listeGroup.add(new Group(getGroups.getString("nomGroup"),
						getGroups.getString("link")));

			}
			
			//Enregistrement de la liste des groupes dans la requete
			request.setAttribute("listeGroup", listeGroup);

		} catch (SQLException e) {
			System.out.println("Erreur SQL : "+e.getMessage());
		} catch (InstantiationException e) {
			System.out.println("Erreur d'instantiation : "+e.getMessage());
		} catch (IllegalAccessException e) {
			System.out.println("Erreur d'accès illégal : "+e.getMessage());
		} catch (ClassNotFoundException e) {
			System.out.println("Classe non trouvé : "+e.getMessage());
		} finally {
			if (stmt != null)
				try {
					/* Fermeture des statments */
					stmt.close();
				} catch (SQLException ignore) {
					/*
					 * Si une erreur survient lors de la fermeture, il suffit de
					 * l'ignorer.
					 */
					System.out.println("Erreur SQLExeption 3");
				}
			if (connexion != null)
				try {
					/* Fermeture de la connexion */
					connexion.close();
				} catch (SQLException ignore) {
					/*
					 * Si une erreur survient lors de la fermeture, il suffit de
					 * l'ignorer.
					 */
					System.out.println("Erreur SQLExeption 4");
				}
		}
		//Renvoi vers l'affichage des utilisateur
		request.getRequestDispatcher("/ShowUsers.jsp").forward(request,
				response);
	}

	public static boolean envoyerMailSMTP(User user,boolean debug) {
		boolean result = false;
		System.out.println(">>>envoyerMailSMTP");
		try {
		    Properties properties = new Properties(); 
		    properties.setProperty("mail.transport.protocol", "smtp"); 
		    properties.setProperty("mail.smtp.host", "localhost"); 
		    properties.setProperty("mail.smtp.user", "root"); 
		    properties.setProperty("mail.from", "Portail LLT"); 
		    Session session = Session.getInstance(properties); 
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("Portail@llt.fr"));
			System.out.println(">>>>>>>Parcours des admins");
	
				InternetAddress[] internetAddresses = new InternetAddress[1];
					internetAddresses[0] = new InternetAddress(user.getEmail());

				message.setRecipients(Message.RecipientType.TO,internetAddresses);
				message.setSubject("Compte supprimé");
				message.setText("Bonjour "+user.getPrenom()+" "+user.getNom()+"!\n\nVotre compte viens d'être supprimé.\n\n\nPortail Leroux & Lotz");
				message.setHeader("X-Mailer", "Java");
				message.setSentDate(new Date());
				session.setDebug(debug);
				Transport.send(message);

			result = true;
			
		} catch (MessagingException e) {
			System.out.println("Exception envoi du message"+e.getMessage());
		}
		
		
		result = true;
	
		return result;
		
	}
	
}
