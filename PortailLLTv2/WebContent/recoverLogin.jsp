<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>LLT Report Maker - R�cup�ration du login</title>
</head>
<body>
	<img src="image/logo-llt.png" align="left" height="200" />
	<br><br><br><br>
	<h1 style="FONT-SIZE: xx-large" align=center ><b>R�cup�ration du login</b></h1>
	<br><br>
	<br><br>
	<center><h3>Formulaire</h3></center>
	
	<div><center>
		<form action="recoverInformation" method="post">
			Email : <input type="text" name="email" /><br>
			<input type="hidden" name="champ" value="login" /><br>
			<input type="hidden" name="login" value="" /><br>		
			<input type="submit" value="Renvoyer mon login" />
		</form><br>
		<button onClick="history.back()">Retour</button>
		</center>
	</div>
</body>
</html>