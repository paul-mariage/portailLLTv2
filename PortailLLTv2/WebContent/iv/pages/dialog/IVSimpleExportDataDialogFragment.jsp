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
	Export data dialog fragment
--%>
<TABLE CELLPADDING='0px' CELLSPACING='0px'>
	<TR ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SIMPLE_EXPORTDATA_DIALOG_JS)%>_resultsetsBlock">
		<TD>
			<TABLE CELLPADDING='0px' CELLSPACING='0px'>
				<TR>
					<TD STYLE="padding-right:5px;">
						<fmt:message key="exportDialog.text.availableResultSets" bundle="${dialogBundle}"/>
					</TD>
					<TD>
						<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SIMPLE_EXPORTDATA_DIALOG_JS)%>_resultsets">
						</DIV>
					</TD>
				</TR>
			</TABLE>
		</TD>
	</TR>
	<TR CLASS="itemSpacing"><TD></TD></TR>
	<TR>
		<TD>
			<TABLE CELLPADDING='0' CELLSPACING='0'>
				<TR>
					<TD VALIGN="top" CLASS="columnsDiv">
						<TABLE  CELLPADDING='0px' CELLSPACING='0px'>
							<TR><TD>
								<fmt:message key="exportDialog.text.availableColumns" bundle="${dialogBundle}"/>
								<ul style="float:right; margin-bottom: 0; margin-top:-3px">
									<li style="list-style:none; float:left; margin-right:3px;" class="actuateCSSSprite_selection actuateIV_overlaysortdesc" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SIMPLE_EXPORTDATA_DIALOG_JS)%>_asortBtn"/></li>
									<li style="list-style:none; float:left;" class="actuateCSSSprite_selection actuateIV_overlaysortasc" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SIMPLE_EXPORTDATA_DIALOG_JS)%>_dsortBtn"></li>
								</ul>
							</TD></TR>
							<TR CLASS="titleSpacing"><TD></TD></TR>
							<TR><TD>
								<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SIMPLE_EXPORTDATA_DIALOG_JS)%>_availableDiv">
								</DIV>
							</TD></TR>
						</TABLE>
					</TD>
					<TD VALIGN="middle" class="moveButtonSpacing">
						<TABLE CELLPADDING="0px" CELLSPACING="0px" CLASS="buttonPaddingStyle" >
							<TR CLASS="titleSpacing"><TD></TD></TR>
							<TR><TD>
								<DIV TYPE="button" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SIMPLE_EXPORTDATA_DIALOG_JS)%>_addAllBtn"
									  />
							</TD></TR>
							<TR height="2px"><TD></TD></TR>
							<TR><TD>
								<DIV TYPE="button" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SIMPLE_EXPORTDATA_DIALOG_JS)%>_addBtn"
									 />
							</TD></TR>
							<TR height="2px"><TD></TD></TR>
							<TR><TD>
								<DIV TYPE="button" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SIMPLE_EXPORTDATA_DIALOG_JS)%>_removeBtn"
									/>
							</TD></TR>
							<TR height="2px"><TD></TD></TR>
							<TR><TD>
								<DIV TYPE="button" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SIMPLE_EXPORTDATA_DIALOG_JS)%>_removeAllBtn"
									 />
							</TD></TR>
						</TABLE>
					</TD>
					<TD VALIGN="top" CLASS="columnsDiv">
						<TABLE CELLPADDING='0px' CELLSPACING='0px'>
							<TR><TD>
								<fmt:message key="exportDialog.text.selectedColumns" bundle="${dialogBundle}"/>
							</TD></TR>
							<TR CLASS="titleSpacing"><TD></TD></TR>
							<TR><TD>
								<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SIMPLE_EXPORTDATA_DIALOG_JS)%>_selectedDiv">
								</DIV>
							</TD></TR>
						</TABLE>
					</TD>
				</TR>
			</TABLE>
			<TABLE >
				<TR>
					<TD>
						<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SIMPLE_EXPORTDATA_DIALOG_JS)%>_encodestyleDiv">
						</DIV>
					</TD>
				<TR>
				</TR>
					<TD>
						<DIV STYLE="width:460px;" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SIMPLE_EXPORTDATA_DIALOG_JS)%>_miscellaneousDiv">
						</DIV>
					</TD>
				</TR>
			</TABLE>
			<TABLE style="padding-left: 2px; padding-right: 2px;">
 				<TR>
 					<TD>
 						<TABLE CELLPADDING='0px' CELLSPACING='0px'>
 							<TR>
 								<TD VALIGN="top">
									<SPAN ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SIMPLE_EXPORTDATA_DIALOG_JS)%>_dataTypeChkBox">
										<%-- Check Box --%>
									</SPAN>
								</TD>
							</TR>
						</TABLE>	
					</TD>
 					<TD WIDTH=20px></TD>
					<TD>
 						<TABLE CELLPADDING='0px' CELLSPACING='0px'>
 							<TR>
 								<TD VALIGN="top">
									<SPAN ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SIMPLE_EXPORTDATA_DIALOG_JS)%>_localeChkBox">
										<%-- Check Box --%>
									</SPAN>
								</TD>
							</TR>
						</TABLE>	
					</TD>
				</TR>
				<TR>
 					<TD>
 						<TABLE CELLPADDING='0px' CELLSPACING='0px'>
 							<TR>
 								<TD VALIGN="top">
									<SPAN ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SIMPLE_EXPORTDATA_DIALOG_JS)%>_columnHeaderChkBox">
										<%-- Check Box --%>
									</SPAN>
								</TD>
							</TR>
						</TABLE>	
					</TD>
					<TD WIDTH=20px></TD>
					<TD>
 						<TABLE CELLPADDING='0px' CELLSPACING='0px'>
 							<TR>
 								<TD VALIGN="top">
									<SPAN ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SIMPLE_EXPORTDATA_DIALOG_JS)%>_exportWithCRChkBox">
										<%-- Check Box --%>
									</SPAN>
								</TD>
							</TR>
						</TABLE>	
					</TD>
				</TR>	
			</TABLE>
		</TD>
	</TR>
</TABLE>