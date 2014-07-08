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
	Save view dialog fragment
--%>
<TABLE  CELLPADDING='0px' CELLSPACING='0px'>
	<TR>
		<TD>
			<fmt:message key="saveViewDialog.folderName" bundle="${ dialogBundle }" />
		</TD>
	</TR>
	<TR CLASS="titleSpacing"><TD></TD></TR>
	<TR>
		<TD>
			<SPAN ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SAVEFILE_DIALOG_JS)%>_category" CLASS="breadcrumb">
			</SPAN>
		</TD>
	</TR>

	<!-- File/folder list -->
	<TR CLASS="titleSpacing"><TD></TD></TR>
	<TR>
		<TD>
			<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SAVEFILE_DIALOG_JS)%>_list">
			</DIV>
		</TD>
	</TR>
	
	<!-- File name -->
	<TR CLASS="itemSpacing"><TD></TD></TR>
	<TR>
		<TD>
			<fmt:message key="saveViewDialog.fileName" bundle="${ dialogBundle }" />
		</TD>
	</TR>
	<TR CLASS="titleSpacing"><TD></TD></TR>
	<TR>
		<TD ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SAVEFILE_DIALOG_JS)%>_fileName">
		</TD>
	</TR>
	
	
	<!-- File type -->
	<TR CLASS="itemSpacing"><TD></TD></TR>
	<TR>
		<TD>
			<fmt:message key="saveViewDialog.fileType" bundle="${ dialogBundle }" />
		</TD>
	</TR>
	<TR CLASS="titleSpacing"><TD></TD></TR>
	<TR>
		<TD>
			<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SAVEFILE_DIALOG_JS)%>_fileType">
			</DIV>
		</TD>
	</TR>
</TABLE>