<!--  Copyright 1994-2005, Actuate Software Corp., All rights reserved.--> 

<%@ page contentType="text/html; charset=utf-8" %>
<%@ page session="false" buffer="none" %>
<%@ page import="com.actuate.iv.context.bean.IVPresentationBean,
				com.actuate.iv.utility.IVParameterAccessor,
				com.actuate.iv.IIVConstants" %>
<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%-----------------------------------------------------------------------------
	Arrange Table Column dialog fragment
--%>

<jsp:useBean id="presentationBean" type="com.actuate.iv.context.bean.IVPresentationBean" scope="request" />
<TABLE CELLSPACING="0" CELLPADDING="0" WIDTH="100%">
	<TR>
		<TD>
			<TABLE CELLSPACING="0" CELLPADDING="0" WIDTH="100%">
				<TR>
					<TD COLSPAN='4'>
						<b><fmt:message key="arrangeColumnDialog.availableColumns" bundle="${dialogBundle}"/></b>
					</TD>
				</TR>
				<TR>
					<TD COLSPAN='4' HEIGHT="7px">
					</TD>
				</TR>
				<TR>
					<TD>
						<DIV ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_ARRANGE_COLUMN_DIALOG_JS)%>_panel'>
						</DIV>
					</TD>
					<TD CLASS="titleSpacing">
					</TD>
					<TD VALIGN="CENTER">
						<TABLE CELLSPACING="0" CELLPADDING="0">
							<TR>
								<TD WIDTH="30px" HEIGHT="30px">
									<INPUT ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_ARRANGE_COLUMN_DIALOG_JS)%>_button_up'
											NAME="moveupbutton"
											TYPE="button" 
											CLASS='actuateCSSSprite_selection actuateIV_overlaysortasc'>
									</INPUT>
								</TD>
							</TR>
							<TR>
								<TD>
									<INPUT ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_ARRANGE_COLUMN_DIALOG_JS)%>_button_down'
											NAME="movedownbutton"
											TYPE="button" 
											CLASS='actuateCSSSprite_selection actuateIV_overlaysortdesc'>
									</INPUT>
								</TD>
							</TR>
						</TABLE>
					</TD>
					<TD CLASS="itemSpacing">
					</TD>
				</TR>
			</TABLE>
		</TD>
	</TR>
</TABLE>
