package com.llt.servlets;



import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.llt.beans.Group;
import com.llt.beans.User;
import com.mysql.jdbc.Driver;

/**
 * Servlet permettant la cr�ation d'un compte utilisateur par un administrateur
 * @author Paul Mariage
 */

public class createUserAdmin extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public createUserAdmin() {
		super();
		// TODO Auto-generated constructor stub
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
		System.out.println("Tentative d'acc�s direct � la servlet createUserAdmin");
		getServletContext().getRequestDispatcher("/home.jsp").forward(request,
				response);
	}

	/**
	 * Methode de traitement des requ�tes de type POST
	 * La m�thode r�cup�re les informations du nouvel utilisateur et le cr�e sur 
	 * la base de donn�es
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response) 
	 * @param request la requ�te re�u par la servlet
	 * @param response la r�ponse envoy� par la servlet
	 * @exception {@link javax.servlet.ServletException}
	 * @exception {@link java.io.IOException}
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out.println("-----------------CreateUserAdmin------------------");
		System.out.println("         D�but doPost CreateUserAdmin");

		String login = request.getParameter("login");
		String password = request.getParameter("password");
		String nom = request.getParameter("nom");
		String prenom = request.getParameter("prenom");
		String email = request.getParameter("email");
		String group = request.getParameter("group");
		int allowed = 0;
		if(request.getParameter("allowed") != null) {
			allowed = 1;
        }

		
		if (!login.isEmpty() && !password.isEmpty() && !nom.isEmpty() && !prenom.isEmpty() && !email.isEmpty()) {
		/* Connexion � la base de donn�es */
		String url = "jdbc:mysql://localhost:8082/gestionPortail";
		String utilisateur = "root";
		String motDePasse = "root";
		boolean existe=false;
		Connection connexion = null;
		Statement stmt = null;
		ResultSet getUsers = null;
		List<User> listeUser = new ArrayList<User>();
		ResultSet getGroups = null;
		List<Group> listeGroup = new ArrayList<Group>();

		try {

			Class<?> driver_class = Class.forName("com.mysql.jdbc.Driver");
			Driver driver = (Driver) driver_class.newInstance();
			DriverManager.registerDriver(driver);

			// R�alisation de la connexion
			connexion = DriverManager.getConnection(url, utilisateur,
					motDePasse);

			// Cr�ation du statement
			stmt = connexion.createStatement();
			
			//R�cup�ration des utilisateurs
			getUsers = stmt.executeQuery("SELECT * FROM user ORDER BY nomGroup;");


			//Boucle de parcours getUsers

			while (getUsers.next()) {
				//Test de l'existance de l'utilisateur � ajouter
				//System.out.println("User a tester : '"+getUsers.getString("login")+"' -- user a inserer : '"+login+"'");
				if (getUsers.getString("login").equals(login))
				{
					existe = true;
				}

			}
			
			if(!existe)
			{
			
			// Cr�ation du nouvel utilisateur si il n'existe pas
			//System.out.println("Requete : INSERT INTO user VALUES ('" + login + "','" + password + "','" + nom + "','" + prenom + "','" + email + "','"+group+"','"+allowed+"');");
			stmt.executeUpdate("INSERT INTO user VALUES ('" + login + "','"
					+ password + "','" + nom + "','" + prenom + "','" + email + "','"+group+"','"+allowed+"');");
			}
			
			//r�cup�ration de la nouvelle liste d'utilisateur
			getUsers = stmt.executeQuery("SELECT * FROM user;");


			//Boucle de parcours getUsers

			while (getUsers.next()) {

				listeUser.add(new User(getUsers.getString("login"), getUsers
						.getString("password"),getUsers.getString("nom"),getUsers.getString("prenom"),getUsers.getString("email"), getUsers.getString("nomGroup"),
						getUsers.getBoolean("allowed")));

			}
			//Enregistrement de l'attribut listeUser � la requete
			request.setAttribute("listeUser", listeUser);
			
			//R�cup�ration des groupes
			getGroups = stmt.executeQuery("SELECT * FROM groups;");


			//Boucle de parcours getGroups

			while (getGroups.next()) {

				listeGroup.add(new Group(getGroups.getString("nomGroup"),
						getGroups.getString("link")));

			}
			
			//Enregistrement des groupes � la requete
			request.setAttribute("listeGroup", listeGroup);

		} catch (SQLException e) {
			System.out.println("Erreur SQL : "+e.getMessage());
		} catch (InstantiationException e) {
			System.out.println("Erreur d'instantiation : "+e.getMessage());
		} catch (IllegalAccessException e) {
			System.out.println("Erreur d'acc�s ill�gal : "+e.getMessage());
		} catch (ClassNotFoundException e) {
			System.out.println("Classe non trouv� : "+e.getMessage());
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
		if(!existe)
		{
		//On affiche l'ensemble des utilisateur si pas d'erreur � la cr�ation
		request.getRequestDispatcher("/ShowUsers.jsp").forward(request,
				response);
		}
		//Sinon, on affiche que l'utilisateur existe
		else request.getRequestDispatcher("/userExist.jsp").forward(request,
				response);
		} else {
			// Si l'utilisateur n'a pas rempli les deux champs du formulaire, il
			// est renvoy� sur home.jsp
			//System.out.println("Donn�e manquante");
			response.sendRedirect("missingValue.jsp");
		}
	}
}
