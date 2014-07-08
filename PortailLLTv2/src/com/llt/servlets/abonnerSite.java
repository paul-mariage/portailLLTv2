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

import com.mysql.jdbc.Driver;

/**
 * Servlet permettant à un utilisateur de s'abonner à des rapports 
 * @author Paul Mariage 
 */

public class abonnerSite extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public abonnerSite() {
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
		System.out
				.println("Tentative d'accès direct à la servlet recoverInformation");
		getServletContext().getRequestDispatcher("/home.jsp").forward(request,
				response);
	}

	/**
	 * Methode de traitement des requêtes de type POST
	 * La méthode récupère le login de l'utilisateur et son email,
	 * puis l'abonne/le désabonne des rapports du site
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 * @param request la requête reçu par la servlet
	 * @param response la réponse envoyé par la servlet
	 * @exception {@link javax.servlet.ServletException}
	 * @exception {@link java.io.IOException}
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out.println("-----------------abonnerSite------------------");
		System.out.println("          Début doPost abonnerSite");
		
		//Récupération des paramètres envoyés à la servlet
		String login = request.getParameter("login");
		String email = request.getParameter("email");
		String nomSite = request.getParameter("nomSite");
		String action = request.getParameter("action");

		/* Connexion à la base de données */
		String url = "jdbc:mysql://localhost:8082/gestionPortail";
		String utilisateur = "root";
		String motDePasse = "root";
		Connection connexion = null;
		Statement stmt = null;
		ResultSet getAbo = null;
		List<String> listeAbo = new ArrayList<String>();
		ResultSet getSites = null;
		List<String> listeSites = new ArrayList<String>();

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
			
			//Si on s'abonne, insertion dans la base des abonnements, si on se désabonne, suppression
			if (action.equals(new String("Abonner"))) {
				//System.out.println("Requete : INSERT into abonnement value ('"+ login + "','" + nomSite + "','" + email + "');");
				stmt.executeUpdate("INSERT into abonnement value ('" + login
						+ "','" + nomSite + "','" + email + "');");
			} else {
				//System.out.println("Requete : DELETE from abonnement WHERE login='"+ login + "' AND site='" + nomSite + "';");
				stmt.executeUpdate("DELETE from abonnement WHERE login='"
						+ login + "' AND site='" + nomSite + "';");
			}

			// Récupération des abonnements de l'utilisateur
			getAbo = stmt.executeQuery("SELECT * FROM abonnement WHERE login='"
					+ login + "';");

			// Boucle de parcours des abonnements

			while (getAbo.next()) {

				listeAbo.add(getAbo.getString("site"));

			}

			//Enregistrement de l'attribut listeAbo dans la session
			request.getSession().setAttribute("listeAbo", listeAbo);

			/* Affichage sur la console des utilisateurs pour test
			Iterator<String> it = listeAbo.iterator();
			System.out.println("------Liste des abonnements déja pris");
			while (it.hasNext()) {
				System.out.println(it.next().toString());
			}
			 */
			
			
			// Récupération des sites
			getSites = stmt.executeQuery("SELECT * FROM sites;");

			// Boucle de parcours getSites

			while (getSites.next()) {

				listeSites.add(getSites.getString("nomSite"));

			}
			
			//Enregistrement des sites disponibles
			request.getSession().setAttribute("listeSites", listeSites);

			/* Affichage sur la console des utilisateurs pour test
			Iterator<String> it2 = listeSites.iterator();
			System.out.println("------Liste des sites dispo");
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
			if (getAbo != null || getSites != null)
				try {
					/* Fermeture de la connexion */
					getAbo.close();
					getSites.close();
				} catch (SQLException ignore) {
					/*
					 * Si une erreur survient lors de la fermeture, il suffit de
					 * l'ignorer.
					 */
					System.out.println("Erreur SQLExeption 2");
				}
			if (stmt != null)
				try {
					/* Fermeture de la connexion */
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

		//Retour aux abonnements de l'utilisateur
		request.getRequestDispatcher("abonnements.jsp").forward(request,
				response);

	}

}
