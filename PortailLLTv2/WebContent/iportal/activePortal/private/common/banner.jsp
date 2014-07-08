<%-- --------------------------------------------------------------------------
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.

	Description:
		Tree View Skin Banner
-------------------------------------------------------------------------- --%>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="com.actuate.iportal.session.iPortalRepository" %>
<%@ page import="com.actuate.reportcast.utils.StaticFuncs" %>
<%-- TAG LIBRARIES ------------------------------------------------------- --%>
<%@ taglib uri="/struts-bean" prefix="bean" %>
<%@ taglib uri="/struts-tiles" prefix="template" %>
<%@ taglib uri="/struts-logic" prefix="logic" %>
<%@ taglib uri="/struts-html" prefix="html" %>
<%@ taglib uri="/actabpanel" prefix="ap" %>

<%-- --------------------------------------------------------------------------
	Expected JavaBeans:
-------------------------------------------------------------------------- --%>
<%@ include file="/iportal/activePortal/common/initCommonParam.jsp" %>

<%@ include file="/iportal/activePortal/private/common/getusageType.jsp" %>

<%
	boolean isWorkgroup = false;
		if ( userinfobean.getRepositoryType() != null 
		        && userinfobean.getRepositoryType().compareToIgnoreCase(iPortalRepository.REPOSITORY_STANDALONE) == 0 )
		{
			isWorkgroup = true;
		}
	boolean isAJC = false;
	
	isAJC = StaticFuncs.isAJC();
	
	String startComment = "";
	String endComment = "";
	
	if(isAJC){
	 startComment = "<!--";
	 endComment = "-->";
	}
%>
<HTML>
	<HEAD>
		<LINK href="<html:rewrite page="/css/allstyles.css"/>" type="text/css" rel="stylesheet" />
		<LINK href="<ap:skinResource resource="/css/skinstyles.css" />" type="text/css" rel="stylesheet" />
		<SCRIPT language="javascript" src="<html:rewrite page="/js/allscripts.js"/>"></SCRIPT>
		<STYLE>
			<bean:write name="userinfobean" property="skinConfig.cssCode" />
		</STYLE>
		<SCRIPT>
			function openHelpWindow() 
			{		
					if (top.frames['main'].sLink)
					{
						window.open(top.frames['main'].sLink);
					}
					else
					{
						var helpDocBase = "<%= helpDocBase %>";
						var sTopic = "Document_list";
						var helpContext = "UserConsole";
						var customizedHelpPath = "";
						var locale = "<%= javaLocale %>";
						var bOpenHelpWindow = true;
						attachHelpPage(helpDocBase, sTopic, helpContext, customizedHelpPath, locale, bOpenHelpWindow);
						
					}
			}
			
			function openHelpWindowForAJC()
			{
				if (top.frames['main'].sLink)
				{
					window.open(top.frames['main'].sLink);
				}
				else
				{
					var helpDocBase = "<%= helpDocBase %>";
					var sTopic = "";
					var helpContext = "";
					var customizedHelpPath = "/using-dk/about-dkreports.html";
					var locale = "<%= javaLocale %>";
					var bOpenHelpWindow = true;
					attachHelpPage(helpDocBase, sTopic, helpContext, customizedHelpPath, locale, bOpenHelpWindow);
				}
			}
		</SCRIPT>
	</HEAD>

	<BODY style="margin: 0">
<%
	String serverVolume = userinfobean.getMultivolumeParameter();
	String link = null;			
				
%>

		<table class="topBanner" width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td class="bannerLogoArea">
					<img border="0" src="<ap:skinImage imageName="Logo" />" align="middle">
				</td>
				<td class="topBannerDivider"></td>
				<td class="bannerGlueArea"></td>
				<td class="topBannerDivider"></td>
				
				<%-- USER --%>
				<%= startComment %>
					<td class="bannerTextArea" id="userElement" nowrap="nowrap">
						<bean:message bundle="iportalResources" key="PROP_USER"/>
						<b><bean:write name="userinfobean" property="userid"/></b>
					</td>
					<td class="topBannerDivider"></td>
				<%= endComment %>
				
				<%-- LICENSE --%>
				<%
					if ( sUsageType != null ) 
					{
				%>
					<td class="bannerTextArea" id="licenseElement" nowrap="nowrap">
						<bean:message bundle="iportalResources" key="PROP_LICENSED_FOR"/>
						<b><%= sUsageType %></b>
					</td>
					<td class="topBannerDivider"></td>
				<% 
					} 
				%>
				
				<td class="bannerIconAreaSpace"></td>
				<%-- OPTIONS --%>
				<%	link = "/options.do?reload=true&doframe=true&" + serverVolume; %>
				<%-- LINK: OPTIONS --%>
				<% 
					if ( !isWorkgroup ) { 
					String optionsURL = link + "&content=pref";
				%>
					<td id="optionElement" class="bannerIconArea">
						<html:link page="<%= optionsURL %>" styleClass="bannerImageLink" target="_top">
							<img src="<ap:skinImage imageName='Options' />" 
								 class="bannerImage"
								 title="<bean:message bundle="iportalResources" key="BNR_OPTIONS"/>" />
						</html:link>		
					</td>	
					<td class="bannerIconAreaSpace"></td>
				<% 
					} 
				%> 
				
				<%-- ABOUT --%>
				<%
					String aboutUrl = link + "&content=about";
				%>
					<td id="aboutElement" class="bannerIconArea">
						<html:link page="<%= aboutUrl %>" styleClass="bannerImageLink" target="_top">
							<img src="<ap:skinImage imageName='About' />" 
								 class="bannerImage"
								 title="<bean:message bundle='iportalResources' key='BNR_ABOUT'/>" />			
						</html:link>
					</td>
					<td class="bannerIconAreaSpace"></td>
					
				<%-- HELP --%>
				<% 
					String helpWindow = "openHelpWindow();";
					if(isAJC)
						helpWindow = "openHelpWindowForAJC();";
				%>
				<td id="helpElement" class="bannerIconArea">
					<a href="javascript:<%= helpWindow %> "
						id="helpHyperlink"
						class="bannerImageLink">
						<img src="<ap:skinImage imageName='Help' />" 
							 class="bannerImage"
							 title="<bean:message bundle='iportalResources' key='BNR_HELP'/>" />
					</a>
				</td>
				<td class="bannerIconAreaSpace"></td>
				
				<%-- LOGOUT --%>
				<logic:notPresent parameter="isPortlet">
				<%
					link = "/logout.do?" + serverVolume;					
				%>				
				<%= startComment %>
				<td id="logoutElement" class="bannerIconArea">
					<html:link page="<%= link %>" styleClass="bannerImageLink" target="_top">
						<img src="<ap:skinImage imageName='Log out' />" 
							 class="bannerImage"
							 title="<bean:message bundle='iportalResources' key='BNR_LOGOUT'/>" />
					</html:link>
				</td>
				<td class="bannerIconAreaSpace"></td>
				<%= endComment %>
				</logic:notPresent>
			</tr>
		</table>
	</BODY>
</HTML>

