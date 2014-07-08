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
				com.actuate.iv.context.bean.IVPresentationBean,com.actuate.iv.utility.IVParameterAccessor" %>

<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%-----------------------------------------------------------------------------
	Expected java beans
--%>
<jsp:useBean id="fragment" type="com.actuate.iv.presentation.aggregation.IFragment" scope="request" />
<jsp:useBean id="presentationBean" type="com.actuate.iv.context.bean.IVPresentationBean" scope="request" />

<%-----------------------------------------------------------------------------
	Dialog container fragment, shared by all standard dialogs.
--%>
<DIV ID="<%= fragment.getClientId( ) %>" CLASS="<%= fragment.getClientId( ) %> dialogContainerRoot actuate-hidden">
	<%-- TODO: move these properties to the client side for every dialog, this includes localized texts --%>
	<span id="<%= fragment.getClientId( ) %>_properties" style="display: none; visibility: hidden;">
		<span name="title" value="<%= fragment.getClientName( ) %>"></span>
	</span>
	<%
	if ( fragment != null )
	{
		fragment.callBack( request, response );
	}
	%>
</DIV>
