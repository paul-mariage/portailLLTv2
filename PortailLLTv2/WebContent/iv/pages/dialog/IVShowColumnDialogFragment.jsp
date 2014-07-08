<!--  Copyright 1994-2005, Actuate Software Corp., All rights reserved.--> 

<%@ page contentType="text/html; charset=utf-8" %>
<%@ page session="false" buffer="none" %>
<%@ page import="com.actuate.iv.context.bean.IVPresentationBean,
				com.actuate.iv.utility.IVParameterAccessor,
				com.actuate.iv.IIVConstants" %>
<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="presentationBean" type="com.actuate.iv.context.bean.IVPresentationBean" scope="request" />

<%-----------------------------------------------------------------------------
	Arrange Table Column dialog fragment
--%>
<TABLE CELLSPACING="0" CELLPADDING="0" WIDTH="100%" >
	<TR>
		<TD class="defaultdialog_boldlabel">
			<fmt:message key="showColumnDialog.availableColumns" bundle="${dialogBundle}"/>
		</TD>
	</TR>
	<TR>
		<TD HEIGHT="7px">
		</TD>
	</TR>
	<TR>
		<TD>
			<DIV ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SHOWCOLUMN_DIALOG_JS)%>_panel'>
			</DIV>
		</TD>
		
	</TR>
</TABLE>
