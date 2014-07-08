<!--  Copyright 1994-2005, Actuate Software Corp., All rights reserved.--> 

<%@ page contentType="text/html; charset=utf-8" %>
<%@ page session="false" buffer="none" %>
<%@ page import="java.text.*" %>
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
	Number formatting dialog fragment
--%>
<DIV width="100%" class="dialogLabelFont">
	<DIV id="numberFormattingDialog_title"></DIV>
	<DIV class="formatdialog_format">
		<DIV CLASS="spacer"></DIV>
		<TABLE width=100%><TBODY><TR>
		<TD width=40% >
		<SPAN CLASS="formatdialog_label">
			<fmt:message key="numberFormattingDialog.label.formatNumber" bundle="${dialogBundle}"/>
		</SPAN></TD>
		<TD width=60%><SPAN CLASS="formatdialog_dropdown" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_NUMBER_FORMATTING_DIALOG_JS)%>_category'>
		</SPAN>	</TD>
		</TR></TBODY></TABLE>
		<DIV CLASS="spacer"></DIV>
	</DIV>
	<DIV id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_NUMBER_FORMATTING_DIALOG_JS)%>_symbolMenu'>
		<DIV CLASS="spacer"></DIV>
		<TABLE width=100%><TBODY><TR>
		<TD width=40%>
		<SPAN CLASS="formatdialog_label">
			<fmt:message key="numberFormattingDialog.label.symbol" bundle="${dialogBundle}"/>
		</SPAN></TD>
		<TD width=60%>
		<SPAN CLASS="formatdialog_dropdown">
			<DIV id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_NUMBER_FORMATTING_DIALOG_JS)%>_symbolMenuInput'></DIV>	
		</SPAN>	</TD></TR></TBODY></TABLE>
		<DIV CLASS="spacer"></DIV>		
	</DIV>
	<DIV id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_NUMBER_FORMATTING_DIALOG_JS)%>_symbolPosition'>
		<DIV CLASS="spacer"></DIV>
		<TABLE width=100%><TBODY><TR>
		<TD width=40%>
		<SPAN CLASS="formatdialog_label">
			<fmt:message key="numberFormattingDialog.label.symbolPos" bundle="${dialogBundle}"/>
		</SPAN></TD>
		<TD width=60%>
		<SPAN CLASS="formatdialog_dropdown" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_NUMBER_FORMATTING_DIALOG_JS)%>_symbolPositionInput'>
		</SPAN>	</TD></TR></TBODY></TABLE>
		<DIV CLASS="spacer"></DIV>			
	</DIV>
	<DIV id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_NUMBER_FORMATTING_DIALOG_JS)%>_decPlacesMenu'>
		<DIV CLASS="spacer"></DIV>
		<TABLE width=100%><TBODY><TR>
		<TD width=40%>
		<SPAN CLASS="formatdialog_label">
			<fmt:message key="numberFormattingDialog.label.decPlaces" bundle="${dialogBundle}"/>
		</SPAN></TD>
		<TD width=60%>
		<SPAN CLASS="formatdialog_dropdown" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_NUMBER_FORMATTING_DIALOG_JS)%>_decPlacesMenuInput'>				
		</SPAN>	</TD></TR></TBODY></TABLE>
		<DIV CLASS="spacer"></DIV>			
	</DIV>
	<DIV id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_NUMBER_FORMATTING_DIALOG_JS)%>_useSeparator'>
		<DIV CLASS="spacer"></DIV>
		<TABLE width=100%><TBODY><TR><TD width=40%></TD>
		<TD width=60%>
		<SPAN CLASS="checkbox_useSeparator" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_NUMBER_FORMATTING_DIALOG_JS)%>_useSeparatorInput'>
			<%-- Check Box --%>
		</SPAN> </TD></TR></TBODY></TABLE>
		<DIV CLASS="spacer"></DIV>
	</DIV>
	<DIV id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_NUMBER_FORMATTING_DIALOG_JS)%>_negativeNumber'>
		<DIV CLASS="spacer"></DIV>
		<TABLE width=100%><TBODY><TR>
		<TD width=40%>
		<SPAN CLASS="formatdialog_label">
			<fmt:message key="numberFormattingDialog.label.negative" bundle="${dialogBundle}"/>
		</SPAN></TD>
		<TD width=60%>
		<SPAN CLASS="formatdialog_dropdown" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_NUMBER_FORMATTING_DIALOG_JS)%>_negativeNumberInput'>
			<%
		      NumberFormat nf = NumberFormat.getNumberInstance( presentationBean.getLocale( ) );
		      DecimalFormat df = ( DecimalFormat ) nf;
		      String patternHyphen = "-###.###";
		      String patternBracket = "(###.###)";
		      double value = 1234.56;
		      
		      df.applyPattern( patternHyphen );
		      String outputHyphen = df.format( value );						
		      
		      df.applyPattern( patternBracket );
		      String outputBracket = df.format( value );	
			%>
			<DIV value='<fmt:message key="numberFormattingDialog.hyphen" bundle="${dialogIdBundle}"/>'
				TEXT = '<%= outputHyphen %>' >
			</DIV>
			<DIV value='<fmt:message key="numberFormattingDialog.bracket" bundle="${dialogIdBundle}"/>'
				TEXT = '<%= outputBracket %>' >
			</DIV>
		</SPAN>	</TD></TR></TBODY></TABLE>
		<DIV CLASS="spacer"></DIV>		
	</DIV>
	<DIV CLASS="formatdialog_format" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_NUMBER_FORMATTING_DIALOG_JS)%>_customeCode'>
		<TABLE width=100%><TBODY><TR>
		<TD width=40%>
		<SPAN CLASS="formatdialog_label">
			<fmt:message key="numberFormattingDialog.label.formatCode" bundle="${dialogBundle}"/>
		</SPAN></TD>
		<TD width=60%>
		<SPAN CLASS="formatdialog_dropdown" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_NUMBER_FORMATTING_DIALOG_JS)%>_customPatternInput'>
		</SPAN></TD></TR></TBODY></TABLE>
		<DIV CLASS="spacer"></DIV>
	</DIV>
	<DIV CLASS="formatdialog_format" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_NUMBER_FORMATTING_DIALOG_JS)%>_localeDIV'>
		<TABLE width=100%><TBODY><TR>
		<TD width=40%>
		<span CLASS="formatdialog_label">
			<fmt:message key="numberFormattingDialog.label.locale" bundle="${dialogBundle}"/>
		</span></TD>
		<TD width=60%>
		<span CLASS="formatdialog_dropdown">
			<DIV id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_NUMBER_FORMATTING_DIALOG_JS)%>_locale'></DIV>
		</span>
		</TD></TR></TBODY></TABLE>
		<DIV CLASS="spacer"></DIV>
	</DIV>
	<DIV id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_NUMBER_FORMATTING_DIALOG_JS)%>_customePattern'>
		<DIV CLASS="formattingHelp" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_NUMBER_FORMATTING_DIALOG_JS)%>_customePatternHelp'>
			
		</DIV>
	</DIV>	
</DIV>
