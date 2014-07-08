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
<%@ page import="com.actuate.iv.utility.IVParameterAccessor,
				com.actuate.iv.config.IVConfiguration,
				com.actuate.iv.IIVConstants" %>


<%-----------------------------------------------------------------------------
	Expected java beans
--%>
<jsp:useBean id="configuration" type="com.actuate.iv.config.IVConfiguration" scope="request" />

<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%-----------------------------------------------------------------------------
	Exception dialog fragment
--%>
<TABLE CELLSPACING="2" CELLPADDING="4" CLASS="birtviewer_dialog_body" style="margin:auto; width:80%;">
	<TR>
		<TD ALIGN='center' >
			<SPAN ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_EXCEPTION_DIALOG_JS)%>_faultstring'></SPAN>
		</TD>
	</TR>

	<%
	if ( configuration.allowExceptionStackTrace( ) )
	{
	%>
	<TR>
		<TD ALIGN='center' >
			<DIV ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_EXCEPTION_DIALOG_JS)%>_stacktraceicon'
				 CLASS='exception_dialog_stacktrace_collapsed'>
				<U><fmt:message key="ExceptionDialog.stacktrace" bundle="${ dialogBundle }"/><BR></U>
			</DIV>
		</TD>
	</TR>
	<TR ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_EXCEPTION_DIALOG_JS)%>_stacktracerow'>
		<TD>
			<DIV CLASS="exception_dialog_stacktrace">
				<SPAN ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_EXCEPTION_DIALOG_JS)%>_stacktrace'></SPAN>
			</DIV>
		</TD>
	</TR>
	<%
	}
	%>
</TABLE>
