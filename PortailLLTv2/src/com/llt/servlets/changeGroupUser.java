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
 * Servlet permettant � un administrateur de changer le groupe d'un utilisateur
 * @author Paul Mariage
 */

public class changeGroupUser extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public changeGroupUser() {
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
			System.out.println("Tentative d'acc�s direct � la servlet changeGroupUser");
			getServletContext().getRequestDispatcher("/home.jsp").forward(request,
				response);
	}

	/**
	 * Methode de traitement des requ�tes de type POST
	 * La m�thode r�cup�re le login de l'utilisateur et son groupe
	 * puis effectue la requete sur la base de donn�e
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response) 
	 * @param request la requ�te re�u par la servlet
	 * @param response la r�ponse envoy� par la servlet
	 * @exception {@link javax.servlet.ServletException}
	 * @exception {@link java.io.IOException}
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out.println("-----------------changeGroupUser------------------");
		System.out.println("         D�but doPost changeGroupUser");

		//On r�cup�re le login de l'utilisateur a changer et son nouveau groupe
		String login = request.getParameter("login");
		String newGroup = request.getParameter("group");

		//System.out.println("L'user " + login + ": groupe =" + newGroup);

		/* Connexion � la base de donn�es */
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

			// R�alisation de la connexion
			connexion = DriverManager.getConnection(url, utilisateur,
					motDePasse);

			// Cr�ation du statement
			stmt = connexion.createStatement();

			//Mise � jour du groupe de l'utilisateur
			//System.out.println("Requete : UPDATE user SET nomGroup='" + newGroup + "' WHERE login='" + login + "';");
			stmt.executeUpdate("UPDATE user SET nomGroup='" + newGroup
					+ "' WHERE login='" + login + "';");

			// r�cup�ration de la nouvelle liste d'utilisateur
			getUsers = stmt.executeQuery("SELECT * FROM user where nomGroup='"+newGroup+"';");

			// Boucle de parcours getUsers

			while (getUsers.next()) {
				
				//Sauvegarde de l'utilisateur courant dans la liste des utilisateurs
				listeUser.add(new User(getUsers.getString("login"), getUsers
						.getString("password"),getUsers.getString("nom"),getUsers.getString("prenom"),getUsers.getString("email"), getUsers.getString("nomGroup"),
						getUsers.getBoolean("allowed")));

			}

			//Enregistrement de la liste d'utilisateur
			request.setAttribute("listeUser", listeUser);
			
			//R�cup�ration des groupes
			getGroups = stmt.executeQuery("SELECT * FROM groups;");


			//Boucle de parcours getGroups

			while (getGroups.next()) {

				listeGroup.add(new Group(getGroups.getString("nomGroup"),
						getGroups.getString("link")));

			}
			
			//Enregistrement de la liste des groupes
			request.setAttribute("listeGroup", listeGroup);

			/* Affichage sur la console des utilisateurs pour test
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

		//Redirection vers la liste des utilisateurs
		request.getRequestDispatcher("/ShowUsers.jsp").forward(request,
				response);
	}

}
