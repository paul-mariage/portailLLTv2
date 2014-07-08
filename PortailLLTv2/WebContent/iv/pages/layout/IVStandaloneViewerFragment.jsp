<%-----------------------------------------------------------------------------
	Copyright (c) 2004 Actuate Corporation and others.
	All rights reserved. This program and the accompanying materials 
	are made available under the terms of the Eclipse Public License v1.0
	which accompanies this distribution, and is available at
	http://www.eclipse.org/legal/epl-v10.html
	
	Contributors:
		Actuate Corporation - Initial implementation.
--%>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ page session="false" buffer="none" %>
<%@ page import="com.actuate.reportcast.utils.AcRequestHandlerBean,
				 com.actuate.activeportal.beans.UserInfoBean,
				 com.actuate.reportcast.utils.StaticFuncs,
				 java.util.Map,
				 java.util.ResourceBundle, 
				 java.util.Locale,
				 java.util.Iterator" %>
				  
<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c_rt" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="/actabpanel" prefix="ap" %>
<%@ taglib uri="/struts-html" prefix="html" %>
 
<%-----------------------------------------------------------------------------
	Expected java beans
--%>
<jsp:useBean id="presentationBean" type="com.actuate.iv.context.bean.IVPresentationBean" scope="request" />

<%
	Locale locale = presentationBean.getLocale( );
	AcRequestHandlerBean reqHandler = new AcRequestHandlerBean( );
	reqHandler.setRequest( request );
	UserInfoBean userBean = reqHandler.getUserInfoBeanFromSession( );
	Map parameters = presentationBean.getParameters( );
	String servletPath = ( String ) request.getAttribute( "servletPath" );
	// ted 21336
	// get the UUID for viewer
	// each viewer has a unique UUID
	String viewerUUID = (String)request.getAttribute( "ViewerUUID" );
	
	String helpBase = presentationBean.getHelpBase( );

	String volumeProfile = userBean.getVolumeProfile( );
	
	String userAgentStr = request.getHeader( "User-Agent" );
	boolean needForceDocumentMode = false;
	if( userAgentStr != null )
	{
		userAgentStr = userAgentStr.toLowerCase();
		if( userAgentStr.indexOf( "msie 7" ) > -1
				|| userAgentStr.indexOf( "msie 8" ) > -1 )
		{
			needForceDocumentMode = true;
		}
	}
%>	

<%-----------------------------------------------------------------------------
	Loading page resources (once)
--%>
<c_rt:set var='sLocale' value='<%= locale.toString( ) %>' scope="request"/>
<fmt:setLocale value='${ sLocale }' scope="request"/>
<fmt:setBundle basename="com.actuate.iv.resource.Dialog" var="dialogBundle" scope="request"/>
<fmt:setBundle basename="com.actuate.iv.resource.id.Dialog" var="dialogIdBundle" scope="request"/>
<fmt:setBundle basename="com.actuate.iv.resource.Control" var="controlBundle" scope="request"/>
<fmt:setBundle basename="com.actuate.iv.resource.id.Control" var="controlIdBundle" scope="request"/>
<fmt:setBundle basename="com.actuate.iv.resource.Misc" var="miscBundle" scope="request"/>

<%-----------------------------------------------------------------------------
	Viewer cotnent
--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/REC-html40/strict.dtd">
<HTML>
	<HEAD>
	 	<TITLE><%=com.actuate.reportcast.utils.StaticFuncs.htmlEncode(com.actuate.iportal.utils.Utility.getCustomTitle( request, locale, "com.actuate.iv.resource.Control", "browser.title", null ))%></TITLE>
		<META HTTP-EQUIV="Content-Type" CONTENT="text/html; CHARSET=utf-8">
<%
	if( needForceDocumentMode )
	{
%>	
		<meta http-equiv="X-UA-Compatible" content="IE=edge" >
<%
	}
%>	
		<LINK REL="shortcut icon" HREF="<jsp:getProperty name='presentationBean' property='baseUrl' />common/jslib/themes/img/favicon/favicon.png" type="image/x-icon" />
		<LINK HREF="<html:rewrite page="/iv/styles/default.css"/>" MEDIA="screen" REL="stylesheet" TYPE="text/css"/>
		<LINK HREF="<html:rewrite page="/iportal/common/webfonts/webfonts.css"/>" MEDIA="screen" REL="stylesheet" TYPE="text/css"/>
  		<SCRIPT TYPE="text/javascript" LANGUAGE="JavaScript" SRC="<html:rewrite page="/jsapi"/>"></SCRIPT>
 
 		<STYLE>
			<%= userBean.getSkinConfig( ).getCssCode( "IV" ) %>
		</STYLE>				
	</HEAD>
	
	<%-- Margin and Padding added here because Safari ignores the ones from the CSS file --%>
	<BODY CLASS="viewerBody" STYLE="margin: 0px; padding: 0px;" ONLOAD="javascript:init( );">
		<SCRIPT TYPE="text/javascript">

			function init( )
			{	
				var reqOps = new actuate.RequestOptions( );
				<%
				if( volumeProfile != null && volumeProfile.length( ) > 0 )
				{
				%>
					reqOps.setVolumeProfile( "<%= StaticFuncs.jsEncode( volumeProfile ) %>" );
				<%
					if ( userBean.isAddVolumeToUrl() )
	            	{               
	        	%>
						reqOps.setVolume( "<%= StaticFuncs.jsEncode( userBean.getVolume( ) ) %>" );
				<%
	            	}
				}
				else
				{
				%>
				reqOps.setRepositoryType( "<%= userBean.getRepositoryType( ) %>" );
				reqOps.setIServerUrl( "<%= StaticFuncs.jsEncode( userBean.getServerurl( ) ) %>" );
				reqOps.setVolume( "<%= StaticFuncs.jsEncode( userBean.getVolume( ) ) %>" );
				<%
				}
				%>
			
 				var urlParameters = {};
 				urlParameters["__locale"] = "<%= userBean.getLocale( ).toString( ) %>";
				<%
				if ( parameters != null )
				{
					Iterator it = parameters.keySet( ).iterator( );
					while ( it.hasNext( ) ) 
					{
						Object name = it.next( );
						String value = ( String ) parameters.get( name );
				%>
	 					urlParameters["<%= name %>"] = "<%= StaticFuncs.jsEncode( value ) %>";
				<%
					}
				}
				%>

				reqOps.setCustomParameters( urlParameters );
				<%
					if ( servletPath == null )
					{
					    servletPath = "/iv";
					}
				%>
						
				var baseURL = location.href.replace( /(\<%=servletPath%>.*)/, "/" );
				<%
					if( "tablet".equalsIgnoreCase( presentationBean.getUserEnv() ) )
					{	
				%>		
						actuate.USER_ENV = "tablet";
						//<meta name="viewport" content="width=device-width,height=device-height,initial-scale=1">
						var meta;
						if (document.createElement && (meta = document.createElement('meta'))) 
						{		
							meta.name = "viewport";
							meta.content = "width=device-width,initial-scale=1";
							// now add the meta element to the head
							document.getElementsByTagName('head').item(0).appendChild(meta);
						}
										
				<%
					}
				%>	
				<%
					if( "tabletapp".equalsIgnoreCase( presentationBean.getUserEnv() ) )
					{	
				%>		
						actuate.USER_ENV = "tabletapp";
						//<meta name="viewport" content="width=device-width,height=device-height,initial-scale=1">
						var meta;
						if (document.createElement && (meta = document.createElement('meta'))) 
						{		
							meta.name = "viewport";
							meta.content = "width=device-width,initial-scale=1,target-densitydpi=medium-dpi";
							// now add the meta element to the head
							document.getElementsByTagName('head').item(0).appendChild(meta);
						}
									
				<%
					}
				%>	
				actuate.load("viewer");
				actuate.load("dialog");
				actuate.initialize(
						baseURL,
						reqOps,
						"<%= StaticFuncs.jsEncode( userBean.getUserid( ) ) %>",
						null,
						function()
						{
						<%
							if( "tablet".equalsIgnoreCase( presentationBean.getUserEnv() ) || "tabletapp".equalsIgnoreCase( presentationBean.getUserEnv() ) )
							{	
						%>	
						    Ext.setup({
								onReady: function() {
									initViewer();
								}
							});	
										
						<%
							}
							else
							{
						%>		
								initViewer();
						<%
							}
						%>	
						}
						
						);
			}
	
			function initViewer( )
			{	
				// Set widget theme
				var baseURL = location.href.replace( /(\<%=servletPath%>.*)/, "/" );
				actuate.util.Style.setTheme( baseURL, 'classic' );
				
				try
				{
					// ted 21336
					// get UUID for viewr
					var viewerUUID = <%=viewerUUID%>;
					// pass UUID to viewer
					var viewer = new actuate.Viewer( "container", null, viewerUUID );
					<%
	 					if( presentationBean.getHelpBase() != null )
	 					{	
	 				%>		
	 						viewer.setHelpBase( "<%= presentationBean.getHelpBase( ) %>" );
	 				<%
	 					}
	 				%>	
					<%
	 					if( presentationBean.getReportDesign( ) != null )
	 					{	
	 				%>		
	 						viewer.setReportDesign( "<%= presentationBean.getReportDesign( ) %>" );
	 				<%
	 					}
	 				%>	
					<%
	 					if( presentationBean.getConnectionHandle( ) != null )
	 					{	
	 				%>		
	 						viewer.setReportDocument( "<%= presentationBean.getReportDocName( ) %>", "<%= presentationBean.getConnectionHandle( ) %>" );
	 				<%
	 					}	
	 					else
						{
					%>	
							viewer.setReportDocument( "<%= presentationBean.getReportDocName( ) %>" );
					<%
						}
					%>				
					viewer.setBRSEnabled( <%=presentationBean.isBRSEnabled()%> );
					
					var options = new actuate.viewer.UIOptions( );
					viewer.setUIOptions( options );
					viewer.submit( );
				}
				catch( e )
				{
					alert( e.getErrorMessage( ) );
				}
			}
			
		</SCRIPT>

		<!-- Header section -->
		<DIV CLASS="standaloneViewer">
			<!-- ted 27913 remove logo from iv -->
			<!--< DIV CLASS="viewerCaption">
				 <IMG BORDER="0" style="padding-bottom:1px" SRC="<ap:skinImage imageName="Logo" />" ALIGN="middle"> 
			</DIV> -->
			<%
			if( "tablet".equalsIgnoreCase( presentationBean.getUserEnv() ) || "tabletapp".equalsIgnoreCase( presentationBean.getUserEnv() ) )
				{	
			%>	
				<DIV ID="container" CLASS="viewerContainer" style="background-color:#474747"></DIV>
			<%
				}
				else
				{	
			%>
				<DIV ID="viewerTitle"  style="display:none;">	
					<TABLE CLASS="viewertitle_table">
						<TR>
							<TD>
								<A CLASS="viewertitle_logo"></A>
								<A ID="viewer_title_label"  CLASS="viewertitle_label"><%=com.actuate.reportcast.utils.StaticFuncs.htmlEncode(com.actuate.iportal.utils.Utility.getCustomTitle( request, locale, "com.actuate.iv.resource.Control", "browser.title", null ))%></A>
							</TD>

							<TD CLASS="viewertitle_info">
								<DIV NAME="HELP" HREF="" TARGET="_blank" CLASS="viewertitle_help"><%=com.actuate.reportcast.utils.StaticFuncs.htmlEncode(com.actuate.iportal.utils.Utility.getCustomTitle( request, locale, "com.actuate.iv.resource.Control", "browser.help", null ))%></DIV>
								<DIV ID="viewertitle_user" CLASS="viewertitle_user_container"></DIV>											
							</TD>
						</TR>
					</TABLE>
				</DIV>
				
				<DIV ID="container" CLASS="viewerContainer" ></DIV>	
			<%
				}
			%>	
		</DIV>
	</BODY>
</HTML>

<script type="text/javascript" LANGUAGE="JavaScript"> 
// <![CDATA[
    if( !Constants ){
        var  Constants = {}; 
    } 
// ]]>
</script>	
