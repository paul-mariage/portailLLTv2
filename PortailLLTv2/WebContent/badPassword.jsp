<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>LLT Report Maker - Mauvais mot de passe</title>
</head>

<%@page import="com.llt.beans.User" %>

<body>
	<img src="image/logo-llt.png" align="left" height="200" />
	<br><br><br><br>
	<h1 style="FONT-SIZE: xx-large" align=center ><b>Mot de passe erron�</b></h1>
	<br><br>
	<br><br><center>
		<% if(request.getSession().getAttribute("user") == null){
		out.print("Vous n'�tes pas connect�. Cliquez <a href=\"home.jsp\">ici</a> pour vous authentifier");
		
	} else { %>
	Mauvais mot de passe, veuillez r�essayer.<br>
	<a href="home.jsp"><button>Retour</button> </a>
	<% } %>

	</center>