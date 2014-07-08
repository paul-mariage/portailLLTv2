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
				com.actuate.iv.context.bean.IVPresentationBean" %>
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
	Print dialog fragment
--%>
<TABLE CELLSPACING="2" CELLPADDING="2" CLASS="birtviewer_dialog_body">
	
	<!-- printer -->
	<TR>
		<TD><B><fmt:message key="serverPrintDialog.prompt" bundle="${ dialogBundle }"/></B></TD>
	</TR>	
	<TR>
		<TD CLASS='rectangle'>
			<TABLE WIDTH="100%" ID="printer_general">
				<TR>
					<TD WIDTH="80px">
						<fmt:message key="serverPrintDialog.printer" bundle="${ dialogBundle }"/>
					</TD>
					<TD>
						<SELECT ID='<fmt:message key="serverPrintDialog.id.printer" bundle="${ dialogIdBundle }"/>'
							CLASS="selection">
						</SELECT>
					</TD>
				</TR>
				<TR>
					<TD><fmt:message key="serverPrintDialog.status" bundle="${ dialogBundle }"/></TD>
					<TD>
						<LABEL ID='<fmt:message key="serverPrintDialog.id.printerStatus" bundle="${ dialogIdBundle }"/>'>
						</LABEL>
					</TD>
				</TR>
				<TR>
					<TD><fmt:message key="serverPrintDialog.model" bundle="${ dialogBundle }"/></TD>
					<TD>
						<LABEL ID='<fmt:message key="serverPrintDialog.id.printerModel" bundle="${ dialogIdBundle }"/>'>
						</LABEL>
					</TD>
				</TR>
				<TR>
					<TD><fmt:message key="serverPrintDialog.description" bundle="${ dialogBundle }"/></TD>
					<TD>
						<LABEL ID='<fmt:message key="serverPrintDialog.id.printerDescription" bundle="${ dialogIdBundle }"/>'>
						</LABEL>
					</TD>
				</TR>
			</TABLE>
		</TD>
	</TR>
	
	
	<TR HEIGHT="5px"><TD></TD></TR>
	
	
	<!-- printer settings -->
	<TR>
		<TD><B><fmt:message key="serverPrintDialog.settings" bundle="${ dialogBundle }"/></B></TD>
	</TR>	
	<TR>
		<TD CLASS='rectangle'>
			<TABLE WIDTH="100%" ID="printer_config">
				<TR>
					<TD WIDTH="100px">
						<fmt:message key="serverPrintDialog.settings.copies" bundle="${ dialogBundle }"/>
					</TD>
					<TD>
						<INPUT TYPE="text"
							CLASS="inputText"
							ID='<fmt:message key="serverPrintDialog.id.printerCopies" bundle="${ dialogIdBundle }"/>'/>
						&nbsp;&nbsp;
						
						<fmt:message key="serverPrintDialog.settings.collate" bundle="${ dialogBundle }"/>
						&nbsp;&nbsp;
						<INPUT TYPE="checkbox"
							ID='<fmt:message key="serverPrintDialog.id.printerCollate" bundle="${ dialogIdBundle }"/>'/>						
					</TD>
				</TR>	
				<TR>
					<TD>
						<fmt:message key="serverPrintDialog.settings.duplex" bundle="${ dialogBundle }"/>
					</TD>
					<TD>						
						<INPUT TYPE="radio"
							ID='<fmt:message key="serverPrintDialog.id.duplex.simplex" bundle="${ dialogIdBundle }"/>'
							NAME="printerDuplex"/>
						<fmt:message key="serverPrintDialog.settings.duplex.simplex" bundle="${ dialogBundle }"/>
						
						&nbsp;&nbsp;
						
						<INPUT TYPE="radio"
							ID='<fmt:message key="serverPrintDialog.id.duplex.horizontal" bundle="${ dialogIdBundle }"/>'
							NAME="printerDuplex"/>
						<fmt:message key="serverPrintDialog.settings.duplex.horizontal" bundle="${ dialogBundle }"/>
						
						&nbsp;&nbsp;
						
						<INPUT TYPE="radio"
							ID='<fmt:message key="serverPrintDialog.id.duplex.vertical" bundle="${ dialogIdBundle }"/>'
							NAME="printerDuplex"/>
						<fmt:message key="serverPrintDialog.settings.duplex.vertical" bundle="${ dialogBundle }"/>
					</TD>
				</TR>
				<TR>
					<TD>
						<fmt:message key="serverPrintDialog.settings.mode" bundle="${ dialogBundle }"/>
					</TD>
					<TD>						
						<INPUT TYPE="radio"
							ID='<fmt:message key="serverPrintDialog.id.mode.bw" bundle="${ dialogIdBundle }"/>'
							NAME="printerMode"/>
						<fmt:message key="serverPrintDialog.settings.mode.bw" bundle="${ dialogBundle }"/>
						
						&nbsp;&nbsp;
						
						<INPUT TYPE="radio"
							ID='<fmt:message key="serverPrintDialog.id.mode.color" bundle="${ dialogIdBundle }"/>'
							NAME="printerMode"/>
						<fmt:message key="serverPrintDialog.settings.mode.color" bundle="${ dialogBundle }"/>
					</TD>
				</TR>
				<TR>
					<TD>
						<fmt:message key="serverPrintDialog.settings.pagesize" bundle="${ dialogBundle }"/>
					</TD>				
					<TD>						
						<SELECT ID='<fmt:message key="serverPrintDialog.id.pageSize" bundle="${ dialogIdBundle }"/>'
							CLASS="selection"></SELECT>
					</TD>
				</TR>					
			</TABLE>
		</TD>
	</TR>
	
	
	<TR HEIGHT="5px"><TD></TD></TR>
	
	
	<!-- page range -->
	<TR>
		<TD><B><fmt:message key="printDialog.pagerange" bundle="${ dialogBundle }"/></B></TD>
	</TR>
	<TR>
		<TD CLASS='rectangle'>
			<TABLE>
				<TR>
					<TD>
						<INPUT TYPE='radio'
							ID="<fmt:message key="serverPrintDialog.id.pagerange.all" bundle="${ dialogIdBundle }"/>"
							NAME="<fmt:message key="serverPrintDialog.id.pagerange" bundle="${ dialogIdBundle }"/>"
							VALUE="All">
					</TD>
					<TD>
						<fmt:message key="printDialog.pagerange.all" bundle="${ dialogBundle }"/>
						<INPUT TYPE='radio'
							ID="<fmt:message key="serverPrintDialog.id.pagerange.current" bundle="${ dialogIdBundle }"/>"
							NAME="<fmt:message key="serverPrintDialog.id.pagerange" bundle="${ dialogIdBundle }"/>"
							VALUE="Current" CHECKED>
						<fmt:message key="printDialog.pagerange.current" bundle="${ dialogBundle }"/><BR>
					</TD>
					<TD>
						<INPUT TYPE='radio'
							ID="<fmt:message key="serverPrintDialog.id.pagerange.pages" bundle="${ dialogIdBundle }"/>"
							NAME="<fmt:message key="serverPrintDialog.id.pagerange" bundle="${ dialogIdBundle }"/>"
							VALUE="Pages">
					</TD>
					<TD>
						<fmt:message key="printDialog.pagerange.pages" bundle="${ dialogBundle }"/>
						<INPUT TYPE='text' SIZE='8'
							ID="<fmt:message key="serverPrintDialog.id.pages" bundle="${ dialogIdBundle }"/>"
							NAME="<fmt:message key="printDialog.id.pages" bundle="${ dialogIdBundle }"/>"
							CLASS="inputText"
							VALUE=""><BR>
					</TD>
				</TR>
				<TR>
					<TD COLSPAN='4'>
						<fmt:message key="printDialog.pagerangesample" bundle="${ dialogBundle }"/>
					</TD>
				</TR>
			</TABLE>
		</TD>
	</TR>
</TABLE>