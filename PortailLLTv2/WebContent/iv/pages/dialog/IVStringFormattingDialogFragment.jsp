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
	String formatting dialog fragment
--%>

<DIV CLASS="dialogLabelFont">
	<DIV CLASS="formatdialog_format">
		<DIV class="spacer"></DIV>
		<TABLE><TBODY><TR>
		<TD width=40%>
		<SPAN class="formatdialog_label">
			<fmt:message key="stringFormattingDialog.label.formatString" bundle="${dialogBundle}"/>
		</SPAN></TD>
		<TD width=60%>
		<SPAN class="formatdialog_dropdown" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_STRING_FROMATTING_DIALOG_JS)%>_category">
		</SPAN></TD>
		</TR></TBODY></TABLE>
		<DIV class="spacer"></DIV>
	</DIV>
	<DIV id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_STRING_FROMATTING_DIALOG_JS)%>_customePattern'>
		<DIV class="spacer"></DIV>
		<TABLE><TBODY><TR>
		<TD width=40%>
		<SPAN class="formatdialog_label">
			<fmt:message key="stringFormattingDialog.label.formatCode" bundle="${dialogBundle}"/>
		</SPAN></TD>
		<TD width=60%>
		<SPAN class="formatdialog_dropdown" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_STRING_FROMATTING_DIALOG_JS)%>_customPatternInput'>
		</SPAN></TD>
		</TR></TBODY></TABLE>
		<DIV class="spacer"></DIV>
		<DIV class="formattingHelp" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_STRING_FROMATTING_DIALOG_JS)%>_customePatternHelp'>
		</DIV>
	</DIV>	
</DIV>
