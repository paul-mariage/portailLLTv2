<%--
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.
	
	Description: Displays the error detail.
	
--%>

<%@ page language="java" %>
<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="org.apache.struts.Globals,
	org.apache.struts.taglib.TagUtils, 
	com.actuate.reportcast.utils.StaticFuncs" %>

<%-- TAG LIBRARIES ------------------------------------------------------- --%>
<%@ taglib uri="/struts-bean" prefix="bean" %>
<%@ taglib uri="/struts-tiles" prefix="template" %>
<%@ taglib uri="/struts-logic" prefix="logic" %>
<% 
	String pageTitle = TagUtils.getInstance().message(pageContext, "iportalResources", 
	        	Globals.LOCALE_KEY, "TBAR_ERROR",  null); 

	String curPageTitle = com.actuate.reportcast.utils.StaticFuncs.htmlEncode(com.actuate.iportal.utils.Utility.getCustomTitle( pageContext, null, "MSGT_BROWSER",  new String[]{ pageTitle } ));
%>
<template:insert template="/iportal/activePortal/private/templates/simpletemplate.jsp">
	<template:put name="bodyAttribute" direct="true">
		class="panel"
	</template:put>	
	<template:put name="title" direct="true">
		<%= curPageTitle %>
	</template:put>
	<template:put name="banner" direct="true" />
	<template:put name="content" direct="true"/>
</template:insert>

