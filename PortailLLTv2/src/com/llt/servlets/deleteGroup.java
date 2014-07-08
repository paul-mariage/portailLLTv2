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
import com.mysql.jdbc.Driver;

/**
 * Servlet permettant la suppression d'un groupe par un administrateur
 * @author Paul Mariage
 */

public class deleteGroup extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public deleteGroup() {
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
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Tentative d'accès direct à la servlet deleteGroup");
		getServletContext().getRequestDispatcher("/home.jsp").forward(request,
				response);
	}

	/**
	 * Methode de traitement des requêtes de type POST
	 * La méthode récupère le nom du groupe et le supprime sur la base de donnée
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response) 
	 * @param request la requête reçu par la servlet
	 * @param response la réponse envoyé par la servlet
	 * @exception {@link javax.servlet.ServletException}
	 * @exception {@link java.io.IOException}
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out.println("-----------------deleteGroup------------------");
		System.out.println("         Début doPost deleteGroup");

		String nomGroup = request.getParameter("nomGroup");
		String link = new String(nomGroup + ".jsp");

		//System.out.println("Le groupe a créer : " + nomGroup + " avec comme lien :" + link);

		/* Connexion à la base de données */
		String url = "jdbc:mysql://localhost:8082/gestionPortail";
		String utilisateur = "root";
		String motDePasse = "root";
		Connection connexion = null;
		Statement stmt = null;
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

			// Récupération des utilisateurs
			stmt.executeUpdate("DELETE FROM groups WHERE nomGroup='"+nomGroup+"'");

			// récupération de la nouvelle liste de groupe
			getGroups = stmt.executeQuery("SELECT * FROM groups;");

			// Boucle de parcours getUsers

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

		request.getRequestDispatcher("/ShowGroups.jsp").forward(request,
				response);
	}

}
