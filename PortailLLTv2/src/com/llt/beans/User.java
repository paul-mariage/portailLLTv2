package com.llt.beans;

/**
 * Classe d�finissant les utilisateurs du portail
 * @author Paul Mariage
 */

public class User {
	
	private String login,password,nom,prenom,email,groupe;
	private boolean autorisation;
	
	/**
	 * Constructeur par d�faut
	 */
	public User(){
		this.login = "anonyme";
		this.password = "default";
	}
	/**
	* Constructeur de la classe User
	* @param login le login de l'utilisateur
	* @param password le mot de passe de l'utilisateur
	* @param nom le nom de l'utilisateur
	* @param prenom le pr�nom de l'utilisateur
	* @param email l'email de l'utilisateur
	* @param groupe le groupe de l'utilisateur
	* @param autorisation si oui ou non le compte de l'utilisateur est activ�
	*/
	public User(String login, String password,String nom,String prenom,String email,String groupe, boolean autorisation){
		this.login = login;
		this.password = password;
		this.groupe = groupe;
		this.nom=nom;
		this.prenom=prenom;
		this.email=email;
		this.autorisation=autorisation;
	}

	/**
	 * Methode de recuperation du login
	 * @return le login de l'utilisateur
	 */
	public String getLogin() {
		return login;
	}

	/**
	 * Methode de d�finition du login
	 * @param login le nouveau login a d�finir
	 */
	public void setLogin(String login) {
		this.login = login;
	}

	/**
	 * Methode de recuperation du mot de passe
	 * @return le mot de passe de l'utilisateur
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * Methode de d�finition du mot de passe
	 * @param password le nouveau mot de passe a d�finir
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * Methode de recuperation du nom
	 * @return le nom de l'utilisateur
	 */
	public String getNom() {
		return nom;
	}

	/**
	 * Methode de d�finition du nom
	 * @param nom le nouveau nom a d�finir
	 */
	public void setNom(String nom) {
		this.nom = nom;
	}

	/**
	 * Methode de recuperation du pr�nom
	 * @return le pr�nom de l'utilisateur
	 */
	public String getPrenom() {
		return prenom;
	}

	/**
	 * Methode de d�finition du pr�nom
	 * @param prenom le nouveau pr�nom a d�finir
	 */
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	/**
	 * Methode de recuperation de l'email
	 * @return l'email de l'utilisateur
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * Methode de d�finition de l'email
	 * @param email le nouvel email a d�finir
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * Methode de recuperation du groupe
	 * @return le groupe de l'utilisateur
	 */
	public String getGroupe() {
		return groupe;
	}

	/**
	 * Methode de d�finition du groupe
	 * @param groupe le nouveau groupe a d�finir
	 */
	public void setGroupe(String groupe) {
		this.groupe = groupe;
	}

	/**
	 * Methode de recuperation de l'autorisation de l'utilisateur
	 * @return l'autorisation
	 */
	public boolean isAllowed() {
		return autorisation;
	}

	/**
	 * Methode de d�finition de l'autorisation
	 * @param autorisation la nouvelle valeur du booleen
	 */
	public void setAutorisation(boolean autorisation) {
		this.autorisation = autorisation;
	}
	
	/**
	 * Methode de g�n�ration de la chaine repr�sentant l'utilisateur
	 */
	public String toString() {
		return "User [login=" + login + ", password=" + password + ", nom="
				+ nom + ", prenom=" + prenom + ", email=" + email + ", groupe="
				+ groupe + ", autorisation=" + autorisation + "]";
	}


	
	
}
