<%--
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved. 
	
	Forward request from Active Portal 6.0 URL to
	Struts Active Portal 7.0
	Used when publishing from Management Console.
--%>

<%
String saveOutput = "false";

String requestType = request.getParameter( "__requesttype" );
	if ( "scheduled".equalsIgnoreCase( requestType ) ) {
		requestType = "async";
		saveOutput = "true";

	} else {
		requestType = "sync";
	}

	String selectedTab = "0";
	String subPage = request.getParameter( "__subpage" );
	if ( "save_as".equalsIgnoreCase( subPage ) ) {
		selectedTab = "1";
		saveOutput = "true";

	} else if ( "output".equalsIgnoreCase( subPage ) ) {
		selectedTab = "2";
	} else if ( ("parameter".equalsIgnoreCase( subPage )
				|| "parameters".equalsIgnoreCase( subPage ))
				&& "async".equalsIgnoreCase( requestType ) ) {
		selectedTab = "1";
	}
	//check whether user passed in __saveoutput parameter
	String tmp = request.getParameter( "__saveOutput" );
	if ("true".equalsIgnoreCase(tmp))
	{
	    saveOutput = "true";
	}
	    
%>

<jsp:forward page="/submitjob.do">

	<jsp:param name="jobType"  value="<%= requestType %>"/>

	<jsp:param name="postback" value="false"/>

	<jsp:param name="selectedTab" value="<%= selectedTab %>"/>
	<jsp:param name="__saveOutput" value="<%= saveOutput %>"/>
	<jsp:param name="__subpage" value="<%= subPage %>"/>

</jsp:forward>
