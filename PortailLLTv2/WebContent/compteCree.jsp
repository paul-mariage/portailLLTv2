<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>LLT Report Maker - Compt� cr�e</title>
</head>

<%@page import="com.llt.beans.User" %>

<body>
	<img src="image/logo-llt.png" align="left" height="200" />
	<br><br><br><br>
	<h1 style="FONT-SIZE: xx-large" align=center ><b>Compt� cr�e!</b></h1>
	<br><br>
	<br><br><center>
<% if(request.getSession().getAttribute("user") == null){
		out.print("Vous n'�tes pas connect�. Cliquez <a href=\"home.jsp\">ici</a> pour vous authentifier");
		
	} else { 
			User currentUser = (User) request.getSession().getAttribute("user");
			out.print("Votre compte a bien �t� cr�er.");
			out.print("<br />");
			out.print("Rappel des informations du compte : <br>");
			out.print(String.format("Votre login :  %s<br>", currentUser.getLogin()));
			out.print(String.format("Votre password : %s<br>", currentUser.getPassword()));
			out.print(String.format("Votre nom : %s<br>", currentUser.getNom()));
			out.print(String.format("Votre prenom : %s<br>", currentUser.getPrenom()));
			out.print(String.format("Votre email : %s<br>", currentUser.getEmail()));
			out.print("Un email a �t� envoy� � l'administrateur pour qu'il valide votre compte");
			out.print("<p><a href=\"LogoutServlet\">Retour Accueil</a></p>");
	}
	%>
	</center>
</body>
</html>