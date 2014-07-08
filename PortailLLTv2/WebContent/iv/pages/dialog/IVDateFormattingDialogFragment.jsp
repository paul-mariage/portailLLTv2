<!--  Copyright 1994-2005, Actuate Software Corp., All rights reserved.--> 

<%@ page contentType="text/html; charset=utf-8" %>
<%@ page session="false" buffer="none" %>
<%@ page import="org.eclipse.birt.report.model.api.elements.DesignChoiceConstants,
				com.actuate.iv.presentation.aggregation.IFragment,
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
	Date formatting dialog fragment
--%>
<div width="100%" class="dialogLabelFont">
	<div id="dateFormattingDialog_title"></div>
	<div class="formatdialog_format">
		<div class="spacer"></div>
		<TABLE width=100%><TBODY><TR>
		<TD width=40% >
		<span class="formatdialog_label">
			<fmt:message key="dateFormattingDialog.label.formatDateTime" bundle="${dialogBundle}"/>
		</span></TD>
		<TD width=60% >
		<span class="formatdialog_dropdown">
			<DIV id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_DATE_FORMATTING_DIALOG_JS)%>_category'></DIV>
		</span></TD>
		</TR></TBODY></TABLE>
		<div class="spacer"></div>
	</div>
	<DIV CLASS="formatdialog_format" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_DATE_FORMATTING_DIALOG_JS)%>_customeCode'>
		<TABLE width=100%><TBODY><TR>
		<TD width=40% >
		<span class="formatdialog_label">
			<fmt:message key="dateFormattingDialog.label.formatCode" bundle="${dialogBundle}"/>
		</span></TD>
		<TD width=60% >
		<span class="formatdialog_dropdown" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_DATE_FORMATTING_DIALOG_JS)%>_customPatternInput'>
		</span></TD>
		</TR></TBODY></TABLE>
		<div class="spacer"></div>
	</DIV>
	<DIV CLASS="formatdialog_format" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_DATE_FORMATTING_DIALOG_JS)%>_localeDIV'>
		<TABLE width=100%><TBODY><TR>
		<TD width=40% >
		<span CLASS="formatdialog_label">
			<fmt:message key="dateFormattingDialog.label.locale" bundle="${dialogBundle}"/>
		</span></TD>
		<TD width=60% >
		<span CLASS="formatdialog_dropdown">
			<DIV id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_DATE_FORMATTING_DIALOG_JS)%>_locale'></DIV>
		</span></TD>
		</TR></TBODY></TABLE>
		<DIV CLASS="spacer"></DIV>
	</DIV>
	<div id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_DATE_FORMATTING_DIALOG_JS)%>_customePattern'>
		<div class="formattingHelp" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_DATE_FORMATTING_DIALOG_JS)%>_customePatternHelp'>
			
		</div>
	</div>		
</DIV>