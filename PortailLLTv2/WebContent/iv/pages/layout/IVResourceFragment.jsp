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
				 com.actuate.iv.context.bean.IVPresentationBean,
				 com.actuate.reportcast.utils.AcRequestHandlerBean,
				 java.util.Locale" %>
				 
<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c_rt" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="/actabpanel" prefix="ap" %>

<%-----------------------------------------------------------------------------
	Expected java beans
--%>
<jsp:useBean id="fragment" type="com.actuate.iv.presentation.aggregation.IFragment" scope="request" />
<jsp:useBean id="presentationBean" type="com.actuate.iv.context.bean.IVPresentationBean" scope="request" />

<%
	Locale locale = presentationBean.getLocale( );
	AcRequestHandlerBean reqHandler = new AcRequestHandlerBean( );
	reqHandler.setRequest( request );
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
<%
	if ( fragment != null )
	{
		fragment.callBack( request, response );
	}
%>