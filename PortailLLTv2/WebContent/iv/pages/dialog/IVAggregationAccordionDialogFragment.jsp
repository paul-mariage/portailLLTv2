<!--  Copyright 1994-2005, Actuate Software Corp., All rights reserved.--> 

<%@ page contentType="text/html; charset=utf-8" %>
<%@ page session="false" buffer="none" %>
<%@ page import="java.sql.Types" %>
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
	Column Aggregation dialog fragment
--%>

<div CLASS="dialog_content_table" STYLE="width: 100%;">
	
	<DIV id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_AGGREGATION_ACCORDION_DIALOG_JS)%>_blocksContainer' >
	</DIV>
	
	<DIV CLASS="add">	
		<A id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_AGGREGATION_ACCORDION_DIALOG_JS)%>_add' class="iv_dialog_link_enabled">
			<fmt:message key="columnAggregationDialog.addAggregationLabel" bundle="${ dialogBundle }"/>
		</A>
	</DIV>
</div>
