package com.llt.servlets;


import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Date;
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

import com.llt.beans.User;
import com.mysql.jdbc.Driver;

/**
 * Servlet permettant � un utilisateur de retrouver son login ou son mot de passe
 * @author Paul Mariage
 */

public class recoverInformation extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public recoverInformation() {
		super();
	}

	/**
	 * Methode de traitement des requ�tes de type GET
	 * Rends inaccessible la servlet si on tente d'y acc�der en GET
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 * @param request la requ�te re�u par la servlet
	 * @param response la r�ponse envoy� par la servlet
	 * @exception {@link javax.servlet.ServletException}
	 * @exception {@link java.io.IOException}
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out
				.println("Tentative d'acc�s direct � la servlet recoverInformation");
		getServletContext().getRequestDispatcher("/home.jsp").forward(request,
				response);

	}

	/**
	 * Methode de traitement des requ�tes de type POST
	 * La m�thode r�cup�re l'email ou le login et l'email de la personne qui souhaite
	 * r�cup�rer ses informations qui lui seront envoy� par mail
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response) 
	 * @param request la requ�te re�u par la servlet
	 * @param response la r�ponse envoy� par la servlet
	 * @exception {@link javax.servlet.ServletException}
	 * @exception {@link java.io.IOException}
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		
		//R�cup�ration des informations de l'utilisateur
		String login = request.getParameter("login");
		String email = request.getParameter("email");
		String champ = request.getParameter("champ");

		System.out.println("-----------------RecuperationUsers------------------");
		System.out.println("D�but doPost RecuperationUsers");
		/* Connexion � la base de donn�es */
		String url = "jdbc:mysql://localhost:8082/gestionPortail";
		String utilisateur = "root";
		String motDePasse = "root";
		Connection connexion = null;
		Statement stmt = null;
		ResultSet getUsers = null;


		try {
			
			//Enregistrement du driver
			Class<?> driver_class = Class.forName("com.mysql.jdbc.Driver");
			Driver driver = (Driver) driver_class.newInstance();
			DriverManager.registerDriver(driver);

			// R�alisation de la connexion
			connexion = DriverManager.getConnection(url, utilisateur,
					motDePasse);

			// Cr�ation du statement
			stmt = connexion.createStatement();

			// R�cup�ration des utilisateurs
			getUsers = stmt.executeQuery("SELECT * FROM user;");

			// Boucle de parcours getUsers

			while (getUsers.next()) {
				//Si l'utilisateur veux r�cup�rer son mot de passe
				if (champ.equals(new String("password")))
				{
					//Si le login et l'email concordent
					if ((getUsers.getString("login").equals(login))&&(getUsers.getString("email").equals(email)))
					{
						envoyerMailSMTP(new User(login,getUsers.getString("password"),getUsers.getString("nom"),getUsers.getString("prenom"),email,"invite",false),champ, getUsers.getString("password"), false);
					}
				}
				//Si l'utilisateur veux r�cup�rer son login
				else {
					//Si l'email concorde
					if (getUsers.getString("email").equals(email))
					{
						envoyerMailSMTP(new User(getUsers.getString("login"),getUsers.getString("password"),getUsers.getString("nom"),getUsers.getString("prenom"),email,"invite",false),champ, getUsers.getString("login"), false);
					}
				}

			}

		} catch (SQLException e) {
			System.out.println("Erreur SQL : "+e.getMessage());
		} catch (InstantiationException e) {
			System.out.println("Erreur d'instantiation : "+e.getMessage());
		} catch (IllegalAccessException e) {
			System.out.println("Erreur d'acc�s ill�gal : "+e.getMessage());
		} catch (ClassNotFoundException e) {
			System.out.println("Classe non trouv� : "+e.getMessage());
		} finally {
			if (getUsers != null)
				try {
					System.out.println("Fermeture getInfosUser");
					/* Fermeture de la connexion */
					getUsers.close();
				} catch (SQLException ignore) {
					/*
					 * Si une erreur survient lors de la fermeture, il suffit de
					 * l'ignorer.
					 */
					System.out.println("Erreur SQLExeption 2");
				}
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
		request.getSession().setAttribute("user", new User());
		//Si l'utilisateur veux r�cup�rer son login, on renvoi vers la confirmation du login envoy�
		if (champ.equals("login"))
		{
			request.getRequestDispatcher("loginEnvoye.jsp").forward(request, response);
		}
		//Si l'utilisateur veux r�cup�rer son mot de passe, on renvoi vers la confirmation du mot de passe envoy�
		else request.getRequestDispatcher("mdpEnvoye.jsp").forward(request, response);
				
	}

	public static boolean envoyerMailSMTP(User user,String champ, String info,boolean debug) {
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
				message.setSubject("Recover "+champ);
				message.setText("Bonjour "+user.getPrenom()+" "+user.getNom()+"!\n\nVotre "+champ+" est : "+info+".\n\n\nPortail Leroux & Lotz");				
				message.setHeader("X-Mailer", "Java");
				message.setSentDate(new Date());
				session.setDebug(debug);
				Transport.send(message);

			result = true;
			
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		result = true;
	
		return result;
		
	}
	
}
