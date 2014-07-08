<%--
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.
	
	Included in all the jsp pages in the system to handle caching using meta tag

	
--%>
	<meta http-equiv="Content-Type" content="text/html; charset=unicode">
	<% if(!userMapObj.getPageCachingForDHTML()){ %>
	<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Cache-Control" content="no-cache">
	<meta http-equiv="Expires" content="-1">
	<% } %>