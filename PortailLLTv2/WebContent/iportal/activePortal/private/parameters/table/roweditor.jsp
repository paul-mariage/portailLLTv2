<%-- --------------------------------------------------------------------------
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.
-------------------------------------------------------------------------- --%>
<%@ page contentType="text/html; charset=utf-8" %>


<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean"%> 
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html"%> 
<%@ taglib uri="/WEB-INF/struts-logic.tld" prefix="logic"%> 
<%@ taglib uri="/actabpanel" prefix="ap" %>

<%@ page import="com.actuate.schemas.*,
	java.text.SimpleDateFormat,
	java.util.Calendar,
	java.util.GregorianCalendar, 
	com.actuate.common.util.AcLocale,
	com.actuate.reportcast.utils.StaticFuncs,
	com.actuate.activeportal.utils.Parameter" %>
<%@ include file="/iportal/activePortal/common/initCommonParam.jsp" %>

<%@ include file="/iportal/activePortal/private/query/combostyle.jsp"%>

<html> 
	<head>
		<META http-equiv="Content-Type" content="text/html; charset=unicode">
		<META http-equiv="Pragma" content="no-cache">
		<META http-equiv="Cache-Control" content="no-cache">
		<META http-equiv="Expires" content="-1">
		
		<logic:equal name="userinfobean" property="userAgent.NS4" value="false">
			<LINK href="<html:rewrite page="/css/allstyles.css"/>" type="text/css" rel="stylesheet">
		</logic:equal>
		<logic:equal name="userinfobean" property="userAgent.NS4" value="true">
			<LINK href="<html:rewrite page="/css/allstylesns4.css"/>" type="text/css" rel="stylesheet">
		</logic:equal>	
		<LINK href="<ap:skinResource resource="/css/skinstyles.css" />" type="text/css" rel="stylesheet" >
		<STYLE>
			<bean:write name="userinfobean" property="skinConfig.cssCode" />
		</STYLE>

		<title><bean:write name="TableRowEditorActionForm" property="title" /></title>
		<SCRIPT language="javascript" src="<html:rewrite page="/js/query.js"/>"></SCRIPT>
		<SCRIPT language="javascript" src="<html:rewrite page="/js/allscripts.js"/>"></SCRIPT>
		<SCRIPT language="javascript" src="<html:rewrite page="/js/browsertype.js"/>"></SCRIPT>
		<SCRIPT language="javascript">
			function cancel()
			{
				window.close();
			}
		</SCRIPT>
	</head>
	<body>
		<html:form action="/editTableRow">
		<%@ include file="/iportal/activePortal/private/common/commonParam.jsp" %>

			<table cellpadding="4" border="0" width="100%">
				<tbody>
					<tr>
						<th rowspan="1" colspan="3" class="tableParameterHeader">
						<bean:write name="TableRowEditorActionForm" property="title" />
       					</th>
     				</tr>
					<tr>
						<td rowspan="1" colspan="3" class="tableParameterButtonPanel" nowrap="nowrap" >
							<jsp:include page="/iportal/activePortal/private/parameters/table/roweditorbuttons.jsp" flush="true"/>
						</td>
					</tr>

			<logic:iterate id="definition" name="TableRowEditorActionForm" property="fieldDefinitions" indexId="currentIndex" >

				<logic:equal name="definition" property="isHidden" value="false">
				
				<%
					String columnName = "columnName[" + currentIndex + "]";
					String controlValue = "value[" + currentIndex + "]";
					String controlId = "parameterID" + currentIndex;
					String nonNullControlValue = "nonNullValue[" + currentIndex + "]";
					String fieldType = "columnTypeDescription[" + currentIndex + "]";
				%>
					<bean:define id="actualControlValue" name="TableRowEditorActionForm" property="<%= nonNullControlValue %>" type="java.lang.String"/>
	
					<tr>
						<td width="10%" class="tableRowColumnName" nowrap="nowrap">
							<bean:write name="TableRowEditorActionForm" property="<%= columnName %>" />
						</td>
						<td class="tableParameterRows" nowrap="nowrap" width="350pt">
							<%@ include file="/iportal/activePortal/private/parameters/table/tablecontrols.jsp" %>
						</td>
					
						<td class="tableRowColumnName" nowrap="nowrap" >
						<bean:write name="TableRowEditorActionForm" property="<%= fieldType %>" />
						</td>
					</tr>
				</logic:equal>
			</logic:iterate>
			<html:hidden property="mode" />
			<html:hidden property="postback" />
					<tr>
						<td rowspan="1" colspan="3" class="tableParameterButtonPanel" nowrap="nowrap" >
							<jsp:include page="/iportal/activePortal/private/parameters/table/roweditorbuttons.jsp" flush="true"/>
						</td>
					</tr>
				</tbody> 
			</table>
		</html:form>
		<jsp:include page="/iportal/activePortal/private/newrequest/calendar.jsp" flush="true"/>
		<jsp:include page="/iportal/activePortal/private/common/errors/error.jsp" flush="true"/>
	<body>
</html>
