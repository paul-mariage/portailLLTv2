package com.llt.beans;

/**
 * Classe définissant les relevés qui sont fait sur les sites
 * @author Paul Mariage
 */
 

public class Releve {

	String annee;
	String mois;
	String jour;
	String heure;
	String minute;
	String seconde;
	String nomVariable;
	Float value;
	String site;
	
	
	/**
	* Constructeur de la classe Releve
	* @param site le site ou a été fait le relevé
	* @param annee l'année ou a été fait le relevé
	* @param mois le mois ou a été fait le relevé
	* @param jour le jour ou a été fait le relevé
	* @param heure l'heure ou a été fait le relevé
	* @param minute la minute ou a été fait le relevé
	* @param seconde la seconde ou a été fait le relevé
	* @param nomVariable le nom de la variable
	* @param value la valeur qu'avait la variable
	*/
	public Releve(String site,String annee, String mois, String jour, String heure,
			String minute, String seconde, String nomVariable, Float value) {
		this.site = site;
		this.annee = annee;
		this.mois = mois;
		this.jour = jour;
		this.heure = heure;
		this.minute = minute;
		this.seconde = seconde;
		this.nomVariable = nomVariable;
		this.value = value;
	}
	
	
	/**
	* Methode de récupération du nom du site
	* @return Le nom du site
	*/
	public String getSite() {
		return site;
	}

	/**
	* Methode de définition du nom d'un site
	* @param site le nouveau nom du site
	*/
	public void setSite(String site) {
		this.site = site;
	}


	/**
	 * Methode de récupération de l'année
	 * @return l'annee à laquelle a été fait le relevé
	 */
	public String getAnnee() {
		return annee;
	}


	/**
	 * Methode de definiton de l'année
	 * @param annee l'année a definir
	 */
	public void setAnnee(String annee) {
		this.annee = annee;
	}


	/**
	 * Methode de récupération du mois
	 * @return le mois auquel a été fait le relevé
	 */
	public String getMois() {
		return mois;
	}


	/**
	 * Methode de definiton du mois
	 * @param mois le mois a définir
	 */
	public void setMois(String mois) {
		this.mois = mois;
	}


	/**
	 * Methode de récupération du jour
	 * @return le jour auquel a été fait le relevé
	 */
	public String getJour() {
		return jour;
	}


	/**
	 * Methode de definiton du jour
	 * @param jour le jour a définir
	 */
	public void setJour(String jour) {
		this.jour = jour;
	}


	/**
	 * Methode de récupération de l'heure
	 * @return l'heure à laquelle a été fait le relevé
	 */
	public String getHeure() {
		return heure;
	}


	/**
	 * Methode de definiton de l'heure
	 * @param heure l'heure a définir
	 */
	public void setHeure(String heure) {
		this.heure = heure;
	}


	/**
	 * Methode de récupération de la minute
	 * @return la minute à laquelle a été fait le relevé
	 */
	public String getMinute() {
		return minute;
	}


	/**
	 * Methode de definiton de la minute
	 * @param minute la minute a définir
	 */
	public void setMinute(String minute) {
		this.minute = minute;
	}


	/**
	 * Methode de récupération de la seconde
	 * @return la seconde à laquelle a été fait le relevé
	 */
	public String getSeconde() {
		return seconde;
	}


	/**
	 * Methode de definiton de la seconde
	 * @param seconde la seconde a définir
	 */
	public void setSeconde(String seconde) {
		this.seconde = seconde;
	}


	/**
	 * Methode de récupération du nom de la variable
	 * @return le nom de la variable
	 */
	public String getNomVariable() {
		return nomVariable;
	}


	/**
	 * Methode de definiton du nom de la variable
	 * @param nomVariable le nom de la variable à définir
	 */
	public void setNomVariable(String nomVariable) {
		this.nomVariable = nomVariable;
	}


	/**
	 * Methode de récupération du mois
	 * @return la value relevée
	 */
	public Float getValue() {
		return value;
	}


	/**
	 * Methode de definiton de la valeur
	 * @param value la valeur a définir
	 */
	public void setValue(Float value) {
		this.value = value;
	}


	@Override
	/**
	* Methode décrivant le relevé sous forme de chaine
	* @return la chaine descriptive du relevé
	*/
	public String toString() {
		return "Releve [annee=" + annee + ", mois=" + mois + ", jour=" + jour
				+ ", heure=" + heure + ", minute=" + minute + ", seconde="
				+ seconde + ", nomVariable=" + nomVariable + ", value=" + value
				+ ", site=" + site + "]";
	}


	
	
	
}
