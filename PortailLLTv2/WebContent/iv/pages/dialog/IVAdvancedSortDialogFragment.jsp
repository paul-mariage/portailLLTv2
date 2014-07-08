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

<%-----------------------------------------------------------------------------
	Advanced sort dialog fragment
--%>

<TABLE CELLPADDING='0px' CELLSPACING='0px'  CLASS="dialog_content_table" STYLE="width: 100%;">
	<TR>
		<TD>
			<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_ADVANCED_SORT_DIALOG_JS)%>_sortDiv1" >
			</DIV>
			<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_ADVANCED_SORT_DIALOG_JS)%>_sortDiv2" >
			</DIV>
			<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_ADVANCED_SORT_DIALOG_JS)%>_sortDiv3" >
			</DIV>	
		</TD>
	</TR>
</TABLE>