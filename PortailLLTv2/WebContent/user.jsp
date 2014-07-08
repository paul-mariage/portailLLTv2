<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>LLT Report Maker - Page Utilisateur</title>
</head>

<%@page import="com.llt.beans.User" %>
<body>
	<img src="image/logo-llt.png" align="left" height="200" />
	<br><br><br><br>
	<h1 style="FONT-SIZE: xx-large" align=center ><b>Page utilisateur</b></h1>
	<br><br>
	<br><br>
<center>
	<%		
	// si l'utilisateur tape l'adresse de la page content.jsp sans s'�tre logu� auparavant, on affiche...
	if(request.getSession().getAttribute("user") == null){
		out.print("Vous n'�tes pas connect�. Veuillez vous authentifier.");
		%><br><br><button onClick="history.back()">Retour</button><%
		
	} else {
			// S'il s'est loggu�, on affiche...
			User currentUser = (User) request.getSession().getAttribute("user");
			out.print(String.format("Bonjour %s %s!",currentUser.getNom(),currentUser.getPrenom()));
			out.print("<br />");

	%>
	<p><form action="RecupAbonnement" method="post">
		<input type="hidden" name="login" value="<%=currentUser.getLogin()%>">
		<input type="hidden" name="password" value="<%=currentUser.getPassword()%>">
		<input type="hidden" name="nom" value="<%=currentUser.getNom()%>">
		<input type="hidden" name="prenom" value="<%=currentUser.getPrenom()%>">
		<input type="hidden" name="email" value="<%=currentUser.getEmail()%>">
		<input type="hidden" name="groupe" value="<%=currentUser.getGroupe()%>">
		<input type="submit" value="G�rer mes abonnements" />
	</form>

	<p><a href="<%= request.getContextPath( ) + "/frameset?__report=testRapport.rptdesign" %>"><button>Rapport G�n�ral <%=currentUser.getGroupe()%></button></a>
	<p><a href="<%= request.getContextPath( ) + "/frameset?__report=testRapportParam.rptdesign" %>"><button>Rapport Param�trable </button></a>
	<p><a href="<%= request.getContextPath( ) + "/frameset?__report=EvolutionVariable.rptdesign" %>"><button>Evolution d'une variable </button></a>
	<p><a href="<%= request.getContextPath( ) + "/frameset?__report=ComparerVariables.rptdesign" %>"><button>Comparer 2 sites </button></a>

	<p><form action="sendInfoUser" method="post">
		<input type="hidden" name="login" value="<%=currentUser.getLogin()%>">
		<input type="hidden" name="password" value="<%=currentUser.getPassword()%>">
		<input type="hidden" name="nom" value="<%=currentUser.getNom()%>">
		<input type="hidden" name="prenom" value="<%=currentUser.getPrenom()%>">
		<input type="hidden" name="email" value="<%=currentUser.getEmail()%>">
		<input type="hidden" name="groupe" value="<%=currentUser.getGroupe()%>">
		<input type="submit" value="Modifier mes infos" />
	</form>
	<!--  Lien vers le futur explorateur de fichier
	<p><a href="explorer.jsp"><button>Explorateur</button></a>
	-->
	<p><form action="LogoutServlet" method="get">
		<input type="submit" value="D�connexion" />
	</form>
</center>
<%}%>
</body>
</html>