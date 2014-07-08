package com.llt.beans;

/**
 * Classe définissant les groupes d'utilisateurs du portail
 * @author Paul Mariage
 */

public class Group {

	/**
	 * Le nom du groupe
	 */
	private String nomGroup;
	/**
	 * Le lien vers la page du groupe
	 */
	private String link;

	/**
	* Constructeur de la classe Group
	* @param nomGroup le nom du groupe
	* @param link le lien de la page du groupe
	*/
	public Group(String nomGroup, String link) {
		this.nomGroup=nomGroup;
		this.link=link;
	}

	/**
	* Constructeur de la classe Group
	*/
	public Group() {
	}
	
	/**
	* Methode de récupération du nom d'un groupe
	* @return Le nom du groupe
	*/
	public String getNomGroup() {
		return nomGroup;
	}

	
	/**
	* Methode de définition du nom d'un groupe
	* @param nomGroup le nouveau nom du groupe
	*/
	public void setNomGroup(String nomGroup) {
		this.nomGroup = nomGroup;
	}

	/**
	* Methode de récupération lien de la page du groupe
	* @return Le lien de la page du groupe
	*/
	public String getLink() {
		return link;
	}

	/**
	* Methode de définition lien de la page du groupe
	* @param link le nouveau lien
	*/
	public void setLink(String link) {
		this.link = link;
	}

	@Override
	/**
	* Methode décrivant le groupe sous forme de chaine
	* @return la chaine descriptive du groupe
	*/
	public String toString() {
		return "Group [nomGroup=" + nomGroup + ", link=" + link + "]";
	}

	
	
}
