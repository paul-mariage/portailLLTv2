<%-- --------------------------------------------------------------------------
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.
-------------------------------------------------------------------------- --%>
<%@ page contentType="text/html; charset=utf-8" import="com.actuate.reportcast.utils.*" %>


<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean"%> 
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html"%> 
<%@ taglib uri="/WEB-INF/struts-logic.tld" prefix="logic"%> 
<%@ taglib uri="/actabpanel" prefix="ap" %>
<%@ include file="/iportal/activePortal/common/initCommonParam.jsp" %>


<html> 
	<head>
		<title><bean:message bundle="iportalResources" key="parameters.tables.title"/></title>

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
	<Script language="JavaScript">
	
		<%
		String windowName = "rowEditor" + String.valueOf(Math.abs(request.getSession().getId().hashCode()));
		%>
		function insertRow()
		{
			urlToOpen = '<html:rewrite page="/editTableRow.do" paramId="parameterName" paramName="TableParamListActionForm" paramProperty="tableName" />';
			<%
			if (commonQueryString != null && commonQueryString.length() > 0)
			{
			%>
				urlToOpen += "&" + <%= commonQueryString %>;
			<%	
			}
			%>			
			window.open(urlToOpen, '<%= windowName %>', 'menubar=no,height=400,width=600,resizable=yes,scrollbars=yes');
		}
		function deleteRow(rowNumber)
		{
			urlToOpen = '<html:rewrite page="/tableList.do" paramId="parameterName" paramName="TableParamListActionForm" paramProperty="tableName" />&deleteRow=' + rowNumber;
			<%
			if (commonQueryString != null && commonQueryString.length() > 0)
			{
			%>
				urlToOpen += "&" + <%=commonQueryString%>;
			<%	
			}
			%>			
			
			window.location.href=urlToOpen;
		}
		function deleteAllRows()
		{
			if(confirm('<bean:message bundle="iportalResources" key="parameters.tables.confirm.deleteall"/>'))
			{
				urlToOpen = '<html:rewrite page="/tableList.do" paramId="parameterName" paramName="TableParamListActionForm" paramProperty="tableName" />&deleteAll=true';
			<%
			if (commonQueryString != null && commonQueryString.length() > 0)
			{
			%>
				urlToOpen += "&" + <%=commonQueryString%>;
			<%	
			}
			%>			
				window.location.href=urlToOpen;
			}
		}
		function editRow(rowNumber)
		{
			urlToOpen = '<html:rewrite page="/editTableRow.do" paramId="parameterName" paramName="TableParamListActionForm" paramProperty="tableName" />&rowIndex=' + rowNumber;
			<%
			if (commonQueryString != null && commonQueryString.length() > 0)
			{
			%>
				urlToOpen += "&" + <%=commonQueryString%>;
			<%	
			}
			%>			
			window.open(urlToOpen, '<%= windowName %>', 'menubar=no,height=400,width=600,resizable=yes,scrollbars=yes');
		}
		function discardChanges()
		{
			if( confirm('<bean:message bundle="iportalResources" key="parameters.tables.confirm.discardAll"/>'))
			{
				urlToOpen = '<html:rewrite page="/tableList.do" paramId="parameterName" paramName="TableParamListActionForm" paramProperty="tableName" />&discard=true';
			<%
			if (commonQueryString != null && commonQueryString.length() > 0)
			{
			%>
				urlToOpen += "&" + <%=commonQueryString%>;
			<%	
			}
			%>			
				window.location.href=urlToOpen;
			}
		}
	</Script>
	</head>
	<body>
		<html:form action="/tableList" method="post">
		<%@ include file="/iportal/activePortal/private/common/commonParam.jsp" %>

			<%-- This bean holds the table display name --%>
			<bean:define id="tableName" name="TableParamListActionForm" property="tableDisplayName" type="java.lang.String"/>
			<%-- This bean is used for holding javascript expression --%>
			<bean:define id="script" type="java.lang.String" value=""/>
			<%-- This bean stores all the rows in the table --%>
			<bean:define id="tableRows" name="TableParamListActionForm" property="rows" type="java.util.Collection"/>

			<%
				//Find out whether we need to disable the delete all button
				boolean disableDeleteAll = (((java.util.Collection)pageContext.findAttribute("tableRows")).size() == 0);
			%>
			
			
  			<table cellpadding="4" cellspacing="0" border="0" width="100%">
            	<tbody>
                	<tr>
                    	<th class="tableParameterHeader">
                    		<bean:message bundle="iportalResources" key="parameters.tables.header" arg0="<%= tableName %>" />
                    	</th>
					</tr>
					<tr>
						<td class="tableParameterButtonPanel" nowrap="nowrap">
							<jsp:include page="/iportal/activePortal/private/parameters/table/listbuttons.jsp" flush="true"/>
						</td>
					</tr>
					<tr>
						<td valign="top">
							<table cellpadding="2" cellspacing="0" border="1">
								<tbody>
								
									<%-- Retrieve the column headers --%>
									<tr>
										<th class="tableParameterColumnHeader" nowrap="nowrap">
										<%-- The delete all button needs to be disabled if there are no rows --%>
											
											<html:button property="deleteall" onclick="javascript:deleteAllRows()" disabled="<%= disableDeleteAll %>">
												<bean:message bundle="iportalResources" key="parameters.tables.button.deleteall"/>
											</html:button>
										</th>
									<logic:iterate id="tableHeader" name="TableParamListActionForm" property="columnNames" indexId="currentIndex" >
										<%
											String isHidden = "isHidden[" + currentIndex + "]";
										%>
										<logic:equal name="TableParamListActionForm" property="<%= isHidden %>" value="false">
											<th class="tableParameterColumnHeader" nowrap="nowrap">
													&nbsp;&nbsp;
													<bean:write name="tableHeader" />
													&nbsp;&nbsp;
											</th>
										</logic:equal>
									</logic:iterate>
										
									</tr>

									<%-- Retrieve the rows and display them --%>
									<logic:iterate id="tableList" name="TableParamListActionForm" property="rows" indexId="currentRow">
									<tr>
										<td class="tableParameterRows" nowrap="nowrap">
											<%
												script = "javascript:editRow('" + currentRow + "');";
											%>
											<html:button property="edit" onclick="<%= script %>">
												<bean:message bundle="iportalResources" key="parameters.tables.button.edit"/>
											</html:button>
											<%
												script = "javascript:deleteRow('" + currentRow + "');";
											%>
											<html:button property="delete" onclick="<%= script %>">
												<bean:message bundle="iportalResources" key="parameters.tables.button.delete"/>
											</html:button>
                                        </td>
										<logic:iterate id="row" name="tableList" property="fieldValue" indexId="currentIndex" >
											<%
												String isHidden = "isHidden[" + currentIndex + "]";
											%>
											<logic:equal name="TableParamListActionForm" property="<%= isHidden %>" value="false">
		                                        <td class="tableParameterRows" >
		                                        	&nbsp;
													<bean:write name="row" property="value" />
													&nbsp;
		                                        </td>
		                                    </logic:equal>
										</logic:iterate>
									</tr>
									</logic:iterate>
								</tbody>                                                       
							</table>
                        </td>
					</tr>
					<tr>
						<td class="tableParameterButtonPanel" nowrap="nowrap">
							<jsp:include page="/iportal/activePortal/private/parameters/table/listbuttons.jsp" flush="true"/>
						</td>
					</tr>
				</tbody>                                                             
			</table>
			<input type="hidden" name="parameterName" value="<bean:write name="TableParamListActionForm" property="tableName"/>" >
			<html:hidden property="executableId" />
		</html:form>

<logic:present name="javaScriptCommands">
	<%= request.getAttribute("javaScriptCommands") %>
</logic:present>

	<body>
</html>
