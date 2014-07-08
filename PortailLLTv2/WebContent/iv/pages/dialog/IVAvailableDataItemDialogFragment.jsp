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
	AvailableDataItemDialogFragment
--%>
<table CELLPADDING='0' CELLSPACING='0' WIDTH="100%">			
	<TR>
		<TD ALIGN="CENTER">
			<DIV ALIGN="left" ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_AVAILABLE_DATAITEM_DIALOG_JS)%>_dataItems' CLASS="select">
			</DIV>
		</TD>
	</TR>
	<TR>
		<TD COLSPAN="2" >
		</TD>
	</TR>
</TABLE>							

