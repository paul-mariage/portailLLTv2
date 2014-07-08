<%--	
	Actuate Corporation	
	Copyright (C) 2003
	Simplest template with only Actuate Logo
	No side bar, inlined banner.				

--%>
<%@ page contentType="text/html; charset=utf-8" %>

<%@ taglib uri="/struts-tiles" prefix="template" %>
<%@ taglib uri="/struts-html" prefix="html" %>
<%@ taglib uri="/struts-logic" prefix="logic" %>

<HTML>

	<HEAD>
		<jsp:include page="/iportal/activePortal/private/common/htmlhead.jsp" flush="true" />
	</HEAD>

	<BODY <template:get name="bodyAttribute" flush="true"/> 
			onload="if (typeof(bodyOnload) != 'undefined') bodyOnload();" class="<%=com.actuate.web.jslib.Utility.CSS_WRAPPER_CLASS%>"
	>
		<template:get name="banner" flush="true"/>
		<template:get name="content" flush="true"/>
	</BODY>

	<jsp:include page="/iportal/activePortal/private/common/errors/error.jsp" flush="true" />

</HTML>