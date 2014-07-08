package com.llt.servlets;

import java.sql.Statement;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;







import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.llt.beans.User;
import com.mysql.jdbc.Driver;

/**
 * Servlet permettant à un utilisateur du portail de se logger
 * @author Paul Mariage
 */
public class LoginsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * Default constructor.
	 */
	public LoginsServlet() {
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
		/*
		 * si l'utilisateur tape l'adresse de la servlet directement dans la
		 * barre d'adresse, il est renvoyé sur la page d'accueil !
		 */
		System.out.println("Tentative d'accès direct à la servlet LoginsServlet");
		getServletContext().getRequestDispatcher("/home.jsp").forward(request,
				response);
	}

	/**
	 * Methode de traitement des requêtes de type POST
	 * La méthode vérifie l'existance du compte de l'utilisateur, puis le redirige selon
	 * si son compte existe ou non.
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response) 
	 * @param request la requête reçu par la servlet
	 * @param response la réponse envoyé par la servlet
	 * @exception {@link javax.servlet.ServletException}
	 * @exception {@link java.io.IOException}
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out.println("-----------------LoginsServlet------------------");
		System.out.println("           début doPost LoginsServlet");
		boolean autorisationDB = false;
		String groupeDB = "";
		String nom = "";
		String prenom = "";
		String email = "";
		String link="";
		
		// on récupère les valeurs des deux champs du formulaire de la page de
		// login
		String login = request.getParameter("login");
		String password = request.getParameter("password");
		//System.out.println("Sauvegarde du login et du password");

		// on vérifie qu'ils ont bien été remplis
		if (!login.isEmpty() && !password.isEmpty()) {
			// on créé un objet User pour conserver les informations de
			// l'utilisateur...
			//System.out.println("Creation de l'user");
			User currentUser = new User();
			currentUser.setLogin(login);
			currentUser.setPassword(password);
			//System.out.println("user crée");
			
			//System.out.println("Login : "+currentUser.getLogin()+" password : '"+currentUser.getPassword()+"'");

			//System.out.println("Recherche de l'utilisateur existant");			
			
			
			/* Connexion à la base de données */
			String url = "jdbc:mysql://localhost:8082/gestionPortail";
			String utilisateur = "root";
			String motDePasse = "root";
			Connection connexion = null;
			Statement stmt1 = null;
			Statement stmt2 = null;
			ResultSet getInfosUser = null;
			ResultSet getInfosGroups = null;
			boolean vide = false;
			boolean badPassword = false;

			try {
				//Enregistrement du driver
		    	Class<?> driver_class = Class.forName("com.mysql.jdbc.Driver");
				Driver driver = (Driver) driver_class.newInstance();
			    DriverManager.registerDriver(driver); 
				
			    //Création de la connection
				connexion = DriverManager.getConnection(url, utilisateur,
						motDePasse);

				//Creation des statements
				stmt1 = connexion.createStatement();
				stmt2 = connexion.createStatement();

				getInfosUser = stmt1
						.executeQuery("SELECT * FROM user WHERE login='"
								+ currentUser.getLogin()+"';");
				
				//Si la requête n'est pas vide, on récupère les données
				if (getInfosUser.next())
				{
				String loginDB = getInfosUser.getString("login");
				String passwordDB = getInfosUser.getString("password");
				nom = getInfosUser.getString("nom");
				prenom = getInfosUser.getString("prenom");
				email = getInfosUser.getString("email");
				autorisationDB = getInfosUser.getBoolean("allowed");
				groupeDB = getInfosUser.getString("nomGroup");
				
				//On test si le mot de passe saisie est correct			
				if (!passwordDB.equals(password))
				{
					badPassword = true;
				}
				
				
				getInfosUser.close();				
				
				//On récupère le groupe de l'utilisateur
				getInfosGroups = stmt2
						.executeQuery("SELECT * FROM groups WHERE nomGroup='"+groupeDB+"';");
				
				
				if (getInfosGroups.next())
				{
					 link = getInfosGroups.getString("link");
				}

				}
				else {
					System.out.println("getInfosGroup est vide");
					vide = true;
				}

			} catch (SQLException e) {
				/* Gérer les éventuelles erreurs ici */
				System.out.println("Exception SQL"+e.getMessage());
				request.getRequestDispatcher("/errorDB").forward(request, response);
			} catch (InstantiationException e) {
				System.out.println("Erreur d'instantiation : "+e.getMessage());
			} catch (IllegalAccessException e) {
				System.out.println("Erreur d'accès illégal : "+e.getMessage());
			} catch (ClassNotFoundException e) {
				System.out.println("Classe non trouvé : "+e.getMessage());
			} finally {
				if (getInfosUser != null)
					try {
						/* Fermeture de la connexion */
						getInfosUser.close();
					} catch (SQLException ignore) {
						/*
						 * Si une erreur survient lors de la fermeture, il
						 * suffit de l'ignorer.
						 */
						System.out.println("Erreur SQLExeption 2");
					}
				if (stmt1 != null || stmt2 != null)
					try {
						/* Fermeture des statments */
						stmt1.close();
						stmt2.close();
					} catch (SQLException ignore) {
						/*
						 * Si une erreur survient lors de la fermeture, il
						 * suffit de l'ignorer.
						 */
						System.out.println("Erreur SQLExeption 3");
					}
				if (connexion != null)
					try {
						/* Fermeture de la connexion */
						connexion.close();
					} catch (SQLException ignore) {
						/*
						 * Si une erreur survient lors de la fermeture, il
						 * suffit de l'ignorer.
						 */
						System.out.println("Erreur SQLExeption 4");
					}
			}
			
			//traitement si l'utilisateur n'existe pas
			if (vide) request.getRequestDispatcher("userInexistant.jsp").forward(request, response);
			
			//traitement si le mot de passe est erroné
			if (!vide & badPassword) 
				{
				//System.out.println("        Redirection car mauvais mot de passe");
				request.getRequestDispatcher("badPassword.jsp").forward(request, response);
				}

			//traitement si le compte de l'utilisateur n'a pas été activé
			if(!vide & !badPassword & !autorisationDB)  {
				//System.out.println("        Redirection car utilisateur non autorisé");
				request.getRequestDispatcher("/nonAutorise.jsp").forward(request, response);
			}
			
			//traitement si tout est ok
			if (!vide & !badPassword & autorisationDB) {
				// Si il est activé,on le redirige vers son lien
				//On stocke l'utilisateur dans la session
				//System.out.println("        Redirection user autorisé");
				currentUser.setGroupe(groupeDB);
				currentUser.setNom(nom);
				currentUser.setPrenom(prenom);
				currentUser.setEmail(email);
				currentUser.setGroupe(groupeDB);
				request.getSession().setAttribute("user", currentUser);
				
				//On redirige vers la page
				//System.out.println("On redirige vers : "+link);
				request.getRequestDispatcher("/"+link).forward(request, response);
				//request.getRequestDispatcher("content.jsp").forward(request, response);
			}
			


		} else {
			// Si l'utilisateur n'a pas rempli les deux champs du formulaire, il
			// est renvoyé sur vers une page d'erreur
			System.out.println("Donnée manquante");
			response.sendRedirect("missingValue.jsp");
		}
	}

}
