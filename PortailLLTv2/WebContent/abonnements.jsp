<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>LLT Report Maker- Abonnements</title>
</head>
<%@page import="com.llt.beans.User"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Iterator"%>
<body>
	<img src="image/logo-llt.png" align="left" height="200" />
	<br><br><br><br>
	<h1 style="FONT-SIZE: xx-large" align=center ><b>S'abonner à un rapport</b></h1>
	<br><br>
	<br><br>

		<div><center>
	<% if(request.getSession().getAttribute("user") == null){
		out.print("Vous n'êtes pas connecté. Cliquez <a href=\"home.jsp\">ici</a> pour vous authentifier");
		
	} else { %>
	
	<center><h3>Mes abonnements</h3></center>
	<% 
	
	
	List<String> listeAbo = (ArrayList<String>) request.getSession().getAttribute("listeAbo");
	Iterator<String> it = listeAbo.iterator();%>

<TABLE BORDER="1">
            <TR>
                <TH>Nom du site</TH>
            </TR>
            <TR>
            <%
            while(it.hasNext()){ 
            %>
            
                <TD><center> <%= it.next() %></center></td>
            
            <%} %>
            </TR>
            </TABLE>
            <BR><BR>
        <center><h3>Gestion des abonnements</h3></center>    
      <% 
	
	
	List<String> listeSitesDispo = (ArrayList<String>) request.getSession().getAttribute("listeSites");
	Iterator<String> it2 = listeSitesDispo.iterator();
	Iterator<String> it3 = listeAbo.iterator();
	String site = "";
	String action = "Abonner";
	String affichage  = "S'abonner";%> 
	
	<TABLE BORDER="1">
            <TR>
                <TH>Nom du site</TH>
                <TH>Action</TH>
            </TR>
            <TR>
            <%
            while(it2.hasNext()){ 
           	site=it2.next();
           	while (it3.hasNext()){
           		if(it3.next().compareTo(site)==0)
           			{action="Desabonner";
           			affichage = "Se désabonner";}
           	}
            %>
            
                <TD><center><%=site%></center></td>
            	<TD><FORM action="abonnerSite" method="post">
						<input type="hidden" name="login"
							value="<%=((User) request.getSession().getAttribute("user")).getLogin()%>">
						<input type="hidden" name="email"
							value="<%=((User) request.getSession().getAttribute("user")).getEmail()%>">
						<input type="hidden" name="nomSite"
							value="<%=site%>">
						<input type="hidden" name="action"
							value="<%=action%>">
						<center>
							<INPUT TYPE="submit" VALUE="<%=affichage%>">
						</center>
					</FORM></TD>
            <%} %>
            </TR>
            </TABLE>
            <BR><BR>
	     
		<a href="user.jsp"><button>Retour</button></a> 
	<%} %>
			</center>
	</div>
</body>
</html>