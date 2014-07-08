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
	Date time formatting dialog fragment
--%>
<DIV width="100%" CLASS="dialogLabelFont">
	<DIV id="timeFormattingDialog_title"></DIV>
	<DIV CLASS="formatdialog_format">
		<DIV CLASS="spacer"></DIV>
		<SPAN CLASS="formatdialog_label">
			<fmt:message key="timeFormattingDialog.label.formatDateTime" bundle="${dialogBundle}"/>
		</SPAN>
		<SPAN CLASS="formatdialog_dropdown">			
		 	<DIV ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_TIME_FORMATTING_DIALOG_JS)%>_category' ></DIV> 
		</SPAN>
		<DIV CLASS="spacer"></DIV>
	</DIV>
	<DIV CLASS="formatdialog_format" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_TIME_FORMATTING_DIALOG_JS)%>_customeCode'>
		<SPAN CLASS="formatdialog_label">
			<fmt:message key="timeFormattingDialog.label.formatCode" bundle="${dialogBundle}"/>
		</SPAN>
		<SPAN CLASS="formatdialog_dropdown" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_TIME_FORMATTING_DIALOG_JS)%>_customPatternInput'>
		</SPAN>
		<DIV CLASS="spacer"></DIV>
	</DIV>
	<DIV CLASS="formatdialog_format" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_TIME_FORMATTING_DIALOG_JS)%>_localeDIV'>
		<span CLASS="formatdialog_label">
			<fmt:message key="timeFormattingDialog.label.locale" bundle="${dialogBundle}"/>
		</SPAN>
		<span CLASS="formatdialog_dropdown">
			<DIV id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_TIME_FORMATTING_DIALOG_JS)%>_locale'></DIV>
		</SPAN>
		<DIV CLASS="spacer"></DIV>
	</DIV>
	<DIV id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_TIME_FORMATTING_DIALOG_JS)%>_customePattern'>
		<DIV CLASS="formattingHelp" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_TIME_FORMATTING_DIALOG_JS)%>_customePatternHelp'>
			
		</DIV>
	</DIV>		
</DIV>
