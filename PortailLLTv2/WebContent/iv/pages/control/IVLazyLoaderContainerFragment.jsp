<!--  Copyright 1994-2005, Actuate Software Corp., All rights reserved.--> 

<%@ page contentType="text/html; charset=utf-8" %>
<%@ page session="false" buffer="none" %>
<%@ page import="java.util.Iterator,
				java.util.Collection,
				com.actuate.iv.context.*,
				com.actuate.iv.presentation.aggregation.IFragment,
				com.actuate.iv.context.bean.IVPresentationBean,
				com.actuate.iv.utility.IVParameterAccessor,
				com.actuate.iv.IIVConstants, 
				com.actuate.reportcast.utils.AcRequestHandlerBean,
				 com.actuate.activeportal.beans.UserInfoBean,
				 java.util.Map,
				 java.util.Locale,
				 java.util.Iterator" %>
<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c_rt" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<jsp:useBean id="fragment" type="com.actuate.iv.presentation.aggregation.IFragment" scope="request" />
<jsp:useBean id="presentationBean" type="com.actuate.iv.context.bean.IVPresentationBean" scope="request" />

<%
	Locale locale = presentationBean.getLocale( );
	AcRequestHandlerBean reqHandler = new AcRequestHandlerBean( );
	reqHandler.setRequest( request );
	UserInfoBean userBean = reqHandler.getUserInfoBeanFromSession( );
	Map parameters = presentationBean.getParameters( );
	String servletPath = ( String ) request.getAttribute( "servletPath" );
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
	Conditional formatting dialog fragment
--%>
<%
	if ( fragment != null )
	{
		fragment.callBack( request, response );
	}
%>
