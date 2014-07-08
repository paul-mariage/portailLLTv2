<%-- --------------------------------------------------------------------------
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.
	
	Description:	
		included by optionsPage.jsp
		
	Accessed URL parameters:
		none
-------------------------------------------------------------------------- --%>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="org.apache.struts.taglib.TagUtils, 
				org.apache.struts.Globals, 
				com.actuate.reportcast.utils.StaticFuncs,
				java.text.MessageFormat,
				javax.servlet.jsp.*" %>



<%-- TAG LIBRARIES ------------------------------------------------------- --%>
<%@ taglib uri="/struts-bean" prefix="bean" %>
<%@ taglib uri="/struts-logic" prefix="logic" %>
<%@ taglib uri="/struts-tiles" prefix="template" %>
<%@ include file="/iportal/activePortal/common/initCommonParam.jsp" %>

<%  
String whichTitle = StaticFuncs.getBrowserTitle( pageContext ); 
String fileNameTitle = (String)request.getAttribute("TITLE");

String curPageTitle = com.actuate.reportcast.utils.StaticFuncs.htmlEncode(com.actuate.iportal.utils.Utility.getCustomTitle( pageContext, null, whichTitle,  new String[]{ fileNameTitle } ));
%>

<template:insert template="/iportal/activePortal/private/templates/querytemplate.jsp">
	<template:put name="title" direct="true">
		<%= curPageTitle %>
	</template:put>
	<template:put name="banner" content="/iportal/activePortal/private/query/banner.jsp" />
	<template:put name="content" content="/iportal/activePortal/private/newrequest/newrequestpage.jsp" />
</template:insert>