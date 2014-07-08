<!--  Copyright 1994-2005, Actuate Software Corp., All rights reserved.--> 

<%@ page contentType="text/html; charset=utf-8" %>
<%@ page session="false" buffer="none" %>
<%@ page import="com.actuate.iv.context.bean.IVPresentationBean,
				com.actuate.iv.utility.IVParameterAccessor,
				com.actuate.iv.IIVConstants" %>
<jsp:useBean id="presentationBean" type="com.actuate.iv.context.bean.IVPresentationBean" scope="request" />
<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%-----------------------------------------------------------------------------
	Arrange Table Column dialog fragment
--%>
<TABLE CELLPADDING="0px" CELLSPACING="0px" CLASS="dialog_content_table" STYLE="width: 100%;">

	<TR HEIGHT='10px'><TD></TD></TR>

	<!-- dialog content -->
	<TR>
		<TD>
			<TABLE CELLSPACING="0" CELLPADDING="0">
				<TR CLASS="padding">
					<TD COLSPAN='2' class="lableright">
						<fmt:message key="moveToGroupDialog.group" bundle="${dialogBundle}"/>
					</TD>
					<TD>
						<DIV ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_MOVETOGROUP_DIALOG_JS)%>_groupList'>
						</DIV>
					</TD>
				</TR>
				<TR>
					<TD COLSPAN='2' VALIGN='top'>
						<fmt:message key="moveToGroupDialog.row" bundle="${dialogBundle}"/>
					</TD>
					<TD>
						<DIV ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_MOVETOGROUP_DIALOG_JS)%>_rowList' >
						</DIV>
					</TD>
				</TR>
			</TABLE>
		</TD>
	</TR>
</TABLE>
