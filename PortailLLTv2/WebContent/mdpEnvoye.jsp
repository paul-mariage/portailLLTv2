<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>LLT Report Maker - Password Envoy�</title>
</head>

<%@page import="com.llt.beans.User" %>

<body>
	<img src="image/logo-llt.png" align="left" height="200" />
	<br><br><br><br>
	<h1 style="FONT-SIZE: xx-large" align=center ><b>Mot de passe Envoy�!</b></h1>
	<br><br>
	<br><br><center>
	<% if(request.getSession().getAttribute("user") == null){
		out.print("Vous n'�tes pas connect�. Cliquez <a href=\"home.jsp\">ici</a> pour vous authentifier");
		
	} else { %>
		Votre mot de passe a �t� renvoy� � votre adresse.<br>
		<a href="home.jsp"><button>Retour</button> </a>
			<% } %>
	</center>
</body>
</html>