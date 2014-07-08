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
<%@ page import="com.actuate.iv.presentation.aggregation.IFragment,
				 com.actuate.iv.config.IVConfiguration" %>

<%-----------------------------------------------------------------------------
	Expected java beans
--%>
<jsp:useBean id="presentationBean" type="com.actuate.iv.context.bean.IVPresentationBean" scope="request" />
<jsp:useBean id="fragment" type="com.actuate.iv.presentation.aggregation.IFragment" scope="request" />

<%
	IVConfiguration ivConfig = presentationBean.getConfig( request );
	String scrollPanel = "";
	String panInOut = "";
	String mouseScrolling = "";
	Boolean hoverHighlight = presentationBean.getGlobalFeatureOptions( ).getHoverHighlight( );
	Boolean highlight = presentationBean.getGlobalFeatureOptions( ).getHighlight( );
	boolean ivHoverHighlight = ( hoverHighlight != null ? hoverHighlight.booleanValue( ) : false );
	boolean ivHighlight = ( highlight != null ? highlight.booleanValue( ) : false );

	if( ivConfig != null && ivConfig.getUIConfig( ) != null
			&& ivConfig.getUIConfig( ).getContentPanel( ) != null )
	{
		if( ivConfig.getUIConfig( ).getContentPanel( ).getBrowserPanel( ) != null )
		{
			scrollPanel = "OFF";
		}
		else if( ivConfig.getUIConfig( ).getContentPanel( ).getScrollPanel( ) != null )
		{
			scrollPanel = "ON";
			panInOut = ivConfig.getUIConfig( ).getContentPanel( ).getScrollPanel( ).getPanInOut( )? "ON" : "OFF"; 
			mouseScrolling = ivConfig.getUIConfig( ).getContentPanel( ).getScrollPanel( ).getMouseScrolling( )? "ON" : "OFF"; 
		}
	}
%> 

<%-----------------------------------------------------------------------------
	Report content fragment
--%>
<DIV CLASS="contentPanel"
	ScrollPanel="<%=scrollPanel%>"
	PanInOut="<%=panInOut%>"
	MouseScrolling="<%=mouseScrolling%>"
	IVHoverHighlight="<%=ivHoverHighlight%>"
	IVHighlight="<%=ivHighlight%>">
<%
	if ( fragment != null )
	{
		fragment.callBack( request, response );
	}
%>
	<DIV CLASS="floatPanel" ></DIV>
</DIV>
		