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
				com.actuate.iv.presentation.aggregation.IFragment,
				com.actuate.iv.context.bean.IVPresentationBean,
				com.actuate.iv.utility.IVParameterAccessor,
				com.actuate.iv.IIVConstants" %>

<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%-----------------------------------------------------------------------------
	Expected java beans
--%>
<jsp:useBean id="fragment" type="com.actuate.iv.presentation.aggregation.IFragment" scope="request" />
<jsp:useBean id="presentationBean" type="com.actuate.iv.context.bean.IVPresentationBean" scope="request" />
<%-----------------------------------------------------------------------------
	Group Detail dialog fragment
--%>
<TABLE CELLSPACING="1" CELLPADDING="1" CLASS="birtviewer_dialog_body dialogLabelFont" STYLE="width:100%">
	<TR>
		<TD>
			<SPAN STYLE="width:100%">
				<fmt:message key="groupDetailDialog.groupOn" bundle="${dialogBundle}" />
			</SPAN>
			<SPAN ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GROUPDETAIL_DIALOG_JS)%>_groupOn" />		
		</TD>
	</TR>
	<TR>
		<TD>
			<SPAN STYLE="width:100%">
				<fmt:message key="groupDetailDialog.groupOptions" bundle="${dialogBundle}" />
			</SPAN>
		</TD>
	</TR>

	<TR><TD STYLE="height:2px"></TD></TR>

	<TR>
		<TD CLASS="rectangle">
			<TABLE CELLPADDING="0px" CELLSPACING="0px" CLASS="padding" STYLE="width:100%">
				<TR>
					<TD CLASS="ColumnWidthofNoInterval" COLSPAN="3">
						<SPAN ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GROUPDETAIL_DIALOG_JS)%>_noInterval'>
							<%-- Radio Button --%>
						</SPAN>
					</TD>
				</TR>
				<TR>
					<TD CLASS="ColumnWidthofInterval">
						<div ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GROUPDETAIL_DIALOG_JS)%>_setInterval'> 
							<%-- Radio Button --%>
						</div>
					</TD>
					<TD>
						<div ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GROUPDETAIL_DIALOG_JS)%>_interval_range"></div>
					</TD>
					<TD>		
						<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GROUPDETAIL_DIALOG_JS)%>_interval_type">
						</DIV>
					</TD>
				</TR>
			</TABLE>
		</TD>
	</TR>
</TABLE>
