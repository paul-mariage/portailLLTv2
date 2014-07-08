<!--  Copyright 1994-2005, Actuate Software Corp., All rights reserved.--> 

<%@ page contentType="text/html; charset=utf-8" %>
<%@ page session="false" buffer="none" %>
<%@ page import="com.actuate.erni.resource.ERNIDialogResources,
				org.eclipse.birt.report.model.api.elements.DesignChoiceConstants,
				com.actuate.iv.presentation.aggregation.IFragment,
				com.actuate.iv.context.bean.IVPresentationBean,
				com.actuate.iv.utility.IVParameterAccessor,
				com.actuate.iv.IIVConstants" %>
<jsp:useBean id="fragment" type="com.actuate.iv.presentation.aggregation.IFragment" scope="request" />
<jsp:useBean id="presentationBean" type="com.actuate.iv.context.bean.IVPresentationBean" scope="request" />
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<fmt:setBundle basename="com.actuate.iv.resource.Dialog" var="dialogBundle" scope="request"/>
<fmt:setBundle basename="com.actuate.iv.resource.id.Dialog" var="idBundle" scope="request"/>

<%-----------------------------------------------------------------------------
	Top/BottomN dialog fragment 
--%>
<TABLE CELLPADDING='0px' CELLSPACING='0px'>
	<TR ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_TOP_BOTTOMN_DIALOG_JS)%>_filterByRow1">
		<TD ALIGN="right" VALIGN="top" CLASS='columnPadding'>
			<LABEL>
			<fmt:message key="filterDialog.text.filterBy" bundle="${dialogBundle}"/></LABEL>
		</TD>
		<TD ALIGN="left" VALIGN="top">
			<DIV  STYLE="display:block;" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_TOP_BOTTOMN_DIALOG_JS)%>_filterBy">
			</DIV>
		</TD>
	</TR>
	<TR ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_TOP_BOTTOMN_DIALOG_JS)%>_filterByRow2">
		<TD COLSPAN=2 HEIGHT="10px">
		</TD>
	</TR> 
	<TR>
		<TD ALIGN="right" VALIGN="top" CLASS='columnPadding'>
			<LABEL><fmt:message key="topBottomNDialog.text.filterLabel" bundle="${dialogBundle}"/>:</LABEL>
		</TD>
		<TD VALIGN="top" CLASS='columnPadding'>
			<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_TOP_BOTTOMN_DIALOG_JS)%>_filterOptionElement"></DIV>
		</TD>
		<TD VALIGN="top">
			<SPAN ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_TOP_BOTTOMN_DIALOG_JS)%>_valueElement"></SPAN>
		</TD>
	</TR>
	<TR ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_TOP_BOTTOMN_DIALOG_JS)%>_recalculateTotalsRow">
		<TD COLSPAN="3">
			<SPAN ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_TOP_BOTTOMN_DIALOG_JS)%>_recalculateTotalsDiv"></SPAN>
		</TD>
	</TR>  
</TABLE>	