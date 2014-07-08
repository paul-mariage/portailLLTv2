<%@ include file="/iportal/doctypedeclaration.jsp" %>

<%-- --------------------------------------------------------------------------
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.
-------------------------------------------------------------------------- --%>
<%@ page contentType="text/html; charset=utf-8" %>


<%-- TAG LIBRARIES ------------------------------------------------------- --%>
<%@ taglib uri="/struts-tiles" prefix="template" %>
<%@ taglib uri="/struts-html" prefix="html" %>
<%@ taglib uri="/struts-logic" prefix="logic" %>

<HTML>

	<HEAD>
		<meta name="viewport" content="width=660" />
		<jsp:include page="/iportal/activePortal/private/common/htmlhead.jsp" flush="true" />
		<SCRIPT>
			initializeSE('<html:rewrite page="/login.do"/>');
			function bodyOnload()
			{
				if ( typeof( reorderICTabs ) == 'function' ) {
					reorderICTabs();
				}
			}
		</SCRIPT>
		<style>
			.ac {
				min-width: 200px;
			}
		</style>
	</HEAD>

	<BODY onload="if (typeof(bodyOnload) != 'undefined') bodyOnload();" class="<%=com.actuate.web.jslib.Utility.CSS_WRAPPER_CLASS%>" style="margin: 0;background: none">
		<TABLE cellSpacing="0" cellPadding="0" width="100%" border="0">
			<TR height="100%">
				<TD valign="top">
					<template:get name="content" flush="true"/>
				</TD>
			</TR>
		</TABLE>	
	</BODY>

</HTML>

<logic:present name="javaScriptCommands">
	<%= request.getAttribute("javaScriptCommands") %>
</logic:present>
