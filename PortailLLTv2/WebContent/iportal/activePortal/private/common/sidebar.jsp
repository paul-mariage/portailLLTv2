<%-- --------------------------------------------------------------------------
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.

	
	Description:
		included with <template:put name="sidebar"
		render side bar component		
		
	Accessed URL parameters:
		none	
-------------------------------------------------------------------------- --%>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="com.actuate.reportcast.utils.StaticFuncs,
	org.apache.struts.taglib.TagUtils, 
	com.actuate.iportal.utils.Utility,
	org.apache.struts.Globals" %>

<%-- TAG LIBRARIES ------------------------------------------------------- --%>
<%@ taglib uri="/actabpanel" prefix="ui" %>
<%@ taglib uri="/actabpanel" prefix="ap" %>
<%@ taglib uri="/struts-bean" prefix="bean" %>
<%@ taglib uri="/struts-html" prefix="html" %>
<%@ taglib uri="/struts-logic" prefix="logic" %>


<%-- --------------------------------------------------------------------------
	Expected JavaBeans:
-------------------------------------------------------------------------- --%>
<%@ include file="/iportal/activePortal/common/initCommonParam.jsp" %>

	<table class="classicSidebar" cellpadding="0" cellspacing="0" border="0" width="100%">
		<tr>
			<td id="sidebar_border_top"><IMG src="<ap:skinImage imageName="Sidebar Border Top" />"/></td>
		</tr>
		
		<tr>
			<td>
				<table id="sidebarEntries" cellpadding="0" cellspacing="0" border="0" width="100%">
					<%
						int counter = 1;
					%>
					<logic:iterate id="feature" name="userinfobean" property="sideBarFeatures"
						type="com.actuate.activeportal.functionality.config.Feature">
						<bean:define id="className" value="sidebarUnselected" type="java.lang.String" />
						<bean:define id="linkClassName" value="sidebarLink" type="java.lang.String" />
				
						<logic:equal name="userinfobean" property="sideBarSelected" value="<%= feature.getLink() %>">
							<% 
								className="sidebarSelected"; 
								linkClassName="sidebarLinkSelected";
							%>
						</logic:equal>
						<tr class="<%= className %>" >
							<td id="entry<%=counter %>" nowrap="nowrap">
								<%
									String featureLink = feature.getLink();
									featureLink = StaticFuncs.appendRequiredDataToBasePath(featureLink)+ commonQueryString;
								%>
								<a href="<html:rewrite page="<%= featureLink %>" />" class="<%= linkClassName %>">
									<bean:message bundle="iportalResources" key="<%= feature.getLabelkey() %>"/>
								</a>
							</td>
						</tr>
						<%
							counter++;
						%>
					</logic:iterate>
				</table>
			</td>
		</tr>
	</table>