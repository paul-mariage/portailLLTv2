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
 * Servlet permettant à un administrateur d'activer le compte d'un utilisateur
 * @author Paul Mariage
 */

public class changeStateUser extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public changeStateUser() {
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
		System.out.println("Tentative d'accès direct à la servlet changeStateUser");
		getServletContext().getRequestDispatcher("/home.jsp").forward(request,
				response);
	}

	/**
	 * Methode de traitement des requêtes de type POST
	 * La méthode récupère les informations de l'utilisateur, active son compte via
	 * une requete sur la base de donnée, puis l'informe par mail que son compte est activé
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response) 
	 * @param request la requête reçu par la servlet
	 * @param response la réponse envoyé par la servlet
	 * @exception {@link javax.servlet.ServletException}
	 * @exception {@link java.io.IOException}
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out.println("-----------------changeStateUser------------------");
		System.out.println("         Début doPost changeStateUser");

		//On récupère les informations de l'utilisateur
		String login = request.getParameter("login");
		String nom = request.getParameter("nom");
		String prenom = request.getParameter("prenom");
		String email = request.getParameter("email");
		String groupe = request.getParameter("groupe");
		String allowed = request.getParameter("allowed");
		
		//System.out.println("L'user "+login+" du groupe "+groupe+": allowed ="+allowed);

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
		boolean autorise = (allowed.equals(new String("true")));
		int aut = 0;
		
		if (autorise)
		{
			aut = 1;
		}
		System.out.println(autorise);

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

			// Mise a jour du groupe
			System.out.println("Requete : UPDATE user SET allowed='" + aut
					+ "' WHERE login='" + login + "';");
			stmt.executeUpdate("UPDATE user SET allowed='" + aut
					+ "' WHERE login='" + login + "';");
			
			//Envoi du mail disant que le compte est activé
			envoyerMailSMTP(new User(login, "", nom, prenom, email, "invite", autorise),false);

			
			// récupération de la nouvelle liste d'utilisateur du groupe de l'utilisateur
			//System.out.println("Requete : SELECT * FROM user where nomGroup='"+groupe+"';");
			getUsers = stmt.executeQuery("SELECT * FROM user where nomGroup='"+groupe+"';");

			// Boucle de parcours getUsers

			while (getUsers.next()) {
				//Enregistrement de l'utilisateur à la liste d'utilisateur
				listeUser.add(new User(getUsers.getString("login"), getUsers
						.getString("password"),getUsers.getString("nom"),getUsers.getString("prenom"),getUsers.getString("email"), getUsers.getString("nomGroup"),
						getUsers.getBoolean("allowed")));

			}

			//Enregistrement de l'attribut listeUser dans la requete
			request.setAttribute("listeUser", listeUser);
			
			//Récupération des groupes
			getGroups = stmt.executeQuery("SELECT * FROM groups;");


			//Boucle de parcours getGroups

			while (getGroups.next()) {
				//Enregistrement du groupe courant dans la liste des groupes
				listeGroup.add(new Group(getGroups.getString("nomGroup"),
						getGroups.getString("link")));

			}
			
			//Enregistrement de l'attribut listeGroup dans la requete
			request.setAttribute("listeGroup", listeGroup);

			/* Affichage sur la console des groupes pour test
			Iterator<Group> it2 = listeGroup.iterator();
			while (it2.hasNext()) {
				System.out.println(it2.next().toString());
			}
			*/
			
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

		//Renvoi à la liste des utilisateurs
		request.getRequestDispatcher("/ShowUsers.jsp").forward(request,
				response);

	}
	
	public static boolean envoyerMailSMTP(User user,boolean debug) {
		boolean result = false;
		String val = "";
		if (user.isAllowed()){
			val= "activé";
		}
		else val = "désactivé";
		try {
		    Properties properties = new Properties(); 
		    properties.setProperty("mail.transport.protocol", "smtp"); 
		    properties.setProperty("mail.smtp.host", "localhost"); 
		    properties.setProperty("mail.smtp.user", "root"); 
		    properties.setProperty("mail.from", "Portail LLT"); 
		    Session session = Session.getInstance(properties); 
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("Portail@llt.fr"));
	
				InternetAddress[] internetAddresses = new InternetAddress[1];
					internetAddresses[0] = new InternetAddress(user.getEmail());

				message.setRecipients(Message.RecipientType.TO,internetAddresses);
				message.setSubject("Compte "+val);
				message.setText("Bonjour "+user.getPrenom()+" "+user.getNom()+"!\n\nVotre compte viens d'être "+val+".\n\n\nPortail Leroux & Lotz");
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
