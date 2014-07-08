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
<%@ page import="com.actuate.iv.presentation.aggregation.IFragment,
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
	Page break dialog fragment
--%>
<TABLE CELLPADDING='0' CELLSPACING='0' WIDTH="100%" >
	<TR>
		<TD>
			<TABLE ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_PAGEBREAK_DIALOG_JS)%>_tableSection'
				CELLPADDING='0' CELLSPACING='0'>
				<TR>
					<TD  class="defaultdialog_boldlabel">
						<fmt:message key="pageBreakDialog.interval" bundle="${ dialogBundle }"/>&nbsp;
						<span ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_PAGEBREAK_DIALOG_JS)%>_interval"></span> 
					</TD>
				</TR>
			</TABLE>
			<TABLE ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_PAGEBREAK_DIALOG_JS)%>_groupSection' ALIGN='center'>
				<TR>
					<TD>
						<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_PAGEBREAK_DIALOG_JS)%>_Before" />
					</TD>
					
					<TD WIDTH='20px'></TD>
					
					<TD ALIGN="left">
						<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_PAGEBREAK_DIALOG_JS)%>_After" />
					</TD>
				</TR>
			</TABLE>
		</TD>
	</TR>
</TABLE>
