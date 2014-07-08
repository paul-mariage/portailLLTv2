<!--  Copyright 1994-2005, Actuate Software Corp., All rights reserved.--> 

<%@ page contentType="text/html; charset=utf-8" %>
<%@ page session="false" buffer="none" %>
<%@ page import="com.actuate.iv.presentation.aggregation.IFragment,
				com.actuate.iv.context.bean.IVPresentationBean,
				com.actuate.iv.utility.IVParameterAccessor,
				com.actuate.iv.IIVConstants" %>
<jsp:useBean id="fragment" type="com.actuate.iv.presentation.aggregation.IFragment" scope="request" />
<jsp:useBean id="presentationBean" type="com.actuate.iv.context.bean.IVPresentationBean" scope="request" />
<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<fmt:setBundle basename="com.actuate.iv.resource.Dialog" var="dialogBundle" scope="request"/>
<fmt:setBundle basename="com.actuate.iv.resource.id.Dialog" var="idBundle" scope="request"/>

<%-----------------------------------------------------------------------------
	Apply view dialog fragment
--%>

	<TABLE CELLPADDING="0px" CELLSPACING="0px">
		<TR>
			<TD><fmt:message key="hideShowItemDialog.unCheckToHide" bundle="${dialogBundle}"/></TD>
		</TR>
		<TR STYLE="margin-top:5px;margin-bottom:5px;">
			<TD>
				<DIV ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_HIDE_SHOW_ITEM_DIALOG_JS)%>_hideShowItemsDiv' 
						CLASS="itemsDiv">
					<UL style="padding-top:10px;padding-bottom:10px;" ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_HIDE_SHOW_ITEM_DIALOG_JS)%>_hideShowItemsUL'></UL>
				</DIV>
			</TD>
		</TR>
		
		<!-- help -->
		<TR>
			<TD ALIGN='center'>
				<A ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_HIDE_SHOW_ITEM_DIALOG_JS)%>_hideShowItemsClearAll'
					href="javascript:actuate.iv.ui.dialog.group.ivHideShowItemDialog.clearAllChecks( );">
					<fmt:message key="hideShowItemDialog.clearAllChecks" bundle="${dialogBundle}"/>
				</A>
			</TD>
		</TR>
	</TABLE>

