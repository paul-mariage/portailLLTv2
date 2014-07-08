<!--  Copyright 1994-2005, Actuate Software Corp., All rights reserved.--> 

<%@ page contentType="text/html; charset=utf-8" %>
<%@ page session="false" buffer="none" %>

<%@ page import="com.actuate.iv.presentation.aggregation.IFragment,
				com.actuate.iv.context.bean.IVPresentationBean,
				com.actuate.iv.utility.IVParameterAccessor,
				com.actuate.iv.IIVConstants" %>
<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<jsp:useBean id="fragment" type="com.actuate.iv.presentation.aggregation.IFragment" scope="request" />
<jsp:useBean id="presentationBean" type="com.actuate.iv.context.bean.IVPresentationBean" scope="request" />
<%-----------------------------------------------------------------------------
	boolean formatting dialog fragment
--%>

<DIV CLASS="dialogLabelFont">
	<DIV CLASS="formatdialog_format">
		<DIV class="spacer"></DIV>
		<SPAN class="formatdialog_label">
			<fmt:message key="booleanFormattingDialog.label.forTrue" bundle="${dialogBundle}"/>
		</SPAN>
		<SPAN class="formatdialog_dropdown" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_BOOLEAN_FORMATTING_DIALOG_JS)%>_ifTrue">
		</SPAN>
		<DIV class="spacer"></DIV>
	</DIV>
	<DIV CLASS="formatdialog_format">
		<DIV class="spacer"></DIV>
		<SPAN class="formatdialog_label">
			<fmt:message key="booleanFormattingDialog.label.forFalse" bundle="${dialogBundle}"/>
		</SPAN>
		<SPAN class="formatdialog_dropdown" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_BOOLEAN_FORMATTING_DIALOG_JS)%>_ifFalse">
		</SPAN>
		<DIV class="spacer"></DIV>
	</DIV>
</DIV>
