package com.llt.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.llt.beans.Group;
import com.llt.beans.User;
import com.mysql.jdbc.Driver;

/**
 * Servlet permettant de récupérer les utilisateurs d'un groupe défini
 * @author Paul Mariage
 */

public class RecuperationUsersGroup extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public RecuperationUsersGroup() {
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
		System.out.println("Tentative d'accès direct à la servlet RecuperationUsersGroup");
		getServletContext().getRequestDispatcher("/home.jsp").forward(request,
				response);
	}

	/**
	 * Methode de traitement des requêtes de type POST
	 * Récupère tous les utilisateurs d'un groupe et les renvoi
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
				.println("-----------------RecuperationUsersGroups------------------");
		System.out.println("Début doPost RecuperationUsersGroups");
		
		//Récupération du groupe qui nous interesse
		String nomGroup = request.getParameter("nomGroup");
		//System.out.println(nomGroup);
		
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
		//System.out.println("nomGroup = "+nomGroup);
		
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

			// Récupération des utilisateurs du groupe
			getUsers = stmt.executeQuery("SELECT * FROM user WHERE nomGroup='"+nomGroup+"';");

			// Boucle de parcours getUsers
			User currentUser = null;
			while (getUsers.next()) {
				currentUser=new User(getUsers.getString("login"), getUsers
						.getString("password"),getUsers.getString("nom"),getUsers.getString("prenom"),getUsers.getString("email"), getUsers.getString("nomGroup"),
						getUsers.getBoolean("allowed"));
				listeUser.add(currentUser);

			}

			//Enregistrement de la liste des utilisateurs du groupe correspondant
			request.setAttribute("listeUser", listeUser);
			
			//Récupération des groupes
			getGroups = stmt.executeQuery("SELECT * FROM groups;");


			//Boucle de parcours getUsers

			while (getGroups.next()) {

				listeGroup.add(new Group(getGroups.getString("nomGroup"),
						getGroups.getString("link")));

			}

			//Enregistrement de la liste des groupes
			request.setAttribute("listeGroup", listeGroup);

			/*Affichage sur la console des utilisateurs pour test
			Iterator<Group> it2 = listeGroup.iterator();
			while (it2.hasNext()) {
				System.out.println(it2.next().toString());
			}
			*/
			
			/* Affichage sur la console des utilisateurs pour test
			Iterator<User> it = listeUser.iterator();
			while (it.hasNext()) {
				System.out.println(it.next().toString());
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
			if (getUsers != null)
				try {
					/* Fermeture du resultSet */
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
		//System.out.println("Redirection ves la page des utilisateur du groupe"+nomGroup);
		request.getRequestDispatcher("ShowUsers.jsp")
				.forward(request, response);
	}

}
