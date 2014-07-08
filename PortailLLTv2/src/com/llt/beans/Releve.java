package com.llt.beans;

/**
 * Classe d�finissant les relev�s qui sont fait sur les sites
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
	* @param site le site ou a �t� fait le relev�
	* @param annee l'ann�e ou a �t� fait le relev�
	* @param mois le mois ou a �t� fait le relev�
	* @param jour le jour ou a �t� fait le relev�
	* @param heure l'heure ou a �t� fait le relev�
	* @param minute la minute ou a �t� fait le relev�
	* @param seconde la seconde ou a �t� fait le relev�
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
	* Methode de r�cup�ration du nom du site
	* @return Le nom du site
	*/
	public String getSite() {
		return site;
	}

	/**
	* Methode de d�finition du nom d'un site
	* @param site le nouveau nom du site
	*/
	public void setSite(String site) {
		this.site = site;
	}


	/**
	 * Methode de r�cup�ration de l'ann�e
	 * @return l'annee � laquelle a �t� fait le relev�
	 */
	public String getAnnee() {
		return annee;
	}


	/**
	 * Methode de definiton de l'ann�e
	 * @param annee l'ann�e a definir
	 */
	public void setAnnee(String annee) {
		this.annee = annee;
	}


	/**
	 * Methode de r�cup�ration du mois
	 * @return le mois auquel a �t� fait le relev�
	 */
	public String getMois() {
		return mois;
	}


	/**
	 * Methode de definiton du mois
	 * @param mois le mois a d�finir
	 */
	public void setMois(String mois) {
		this.mois = mois;
	}


	/**
	 * Methode de r�cup�ration du jour
	 * @return le jour auquel a �t� fait le relev�
	 */
	public String getJour() {
		return jour;
	}


	/**
	 * Methode de definiton du jour
	 * @param jour le jour a d�finir
	 */
	public void setJour(String jour) {
		this.jour = jour;
	}


	/**
	 * Methode de r�cup�ration de l'heure
	 * @return l'heure � laquelle a �t� fait le relev�
	 */
	public String getHeure() {
		return heure;
	}


	/**
	 * Methode de definiton de l'heure
	 * @param heure l'heure a d�finir
	 */
	public void setHeure(String heure) {
		this.heure = heure;
	}


	/**
	 * Methode de r�cup�ration de la minute
	 * @return la minute � laquelle a �t� fait le relev�
	 */
	public String getMinute() {
		return minute;
	}


	/**
	 * Methode de definiton de la minute
	 * @param minute la minute a d�finir
	 */
	public void setMinute(String minute) {
		this.minute = minute;
	}


	/**
	 * Methode de r�cup�ration de la seconde
	 * @return la seconde � laquelle a �t� fait le relev�
	 */
	public String getSeconde() {
		return seconde;
	}


	/**
	 * Methode de definiton de la seconde
	 * @param seconde la seconde a d�finir
	 */
	public void setSeconde(String seconde) {
		this.seconde = seconde;
	}


	/**
	 * Methode de r�cup�ration du nom de la variable
	 * @return le nom de la variable
	 */
	public String getNomVariable() {
		return nomVariable;
	}


	/**
	 * Methode de definiton du nom de la variable
	 * @param nomVariable le nom de la variable � d�finir
	 */
	public void setNomVariable(String nomVariable) {
		this.nomVariable = nomVariable;
	}


	/**
	 * Methode de r�cup�ration du mois
	 * @return la value relev�e
	 */
	public Float getValue() {
		return value;
	}


	/**
	 * Methode de definiton de la valeur
	 * @param value la valeur a d�finir
	 */
	public void setValue(Float value) {
		this.value = value;
	}


	@Override
	/**
	* Methode d�crivant le relev� sous forme de chaine
	* @return la chaine descriptive du relev�
	*/
	public String toString() {
		return "Releve [annee=" + annee + ", mois=" + mois + ", jour=" + jour
				+ ", heure=" + heure + ", minute=" + minute + ", seconde="
				+ seconde + ", nomVariable=" + nomVariable + ", value=" + value
				+ ", site=" + site + "]";
	}


	
	
	
}
