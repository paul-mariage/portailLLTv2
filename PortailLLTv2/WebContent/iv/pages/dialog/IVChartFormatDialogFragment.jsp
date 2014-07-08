<!--  Copyright 1994-2005, Actuate Software Corp., All rights reserved.--> 

<%@ page contentType="text/html; charset=utf-8" %>
<%@ page session="false" buffer="none" %>
<%@ page import="org.eclipse.birt.report.model.api.elements.DesignChoiceConstants,
				com.actuate.iv.presentation.aggregation.IFragment,
				com.actuate.iv.context.bean.IVPresentationBean,
				com.actuate.iv.utility.IVParameterAccessor,
				com.actuate.iv.IIVConstants" %>
<jsp:useBean id="fragment" type="com.actuate.iv.presentation.aggregation.IFragment" scope="request" />
<jsp:useBean id="presentationBean" type="com.actuate.iv.context.bean.IVPresentationBean" scope="request" />
<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<fmt:setBundle basename="com.actuate.iv.resource.Dialog" var="dialogBundle" scope="request"/>
<fmt:setBundle basename="com.actuate.iv.resource.id.Dialog" var="idBundle" scope="request"/>


<%-----------------------------------------------------------------------------
	Chart Settings dialog fragment
--%>
<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FORMAT_DIALOG_JS)%>_chartTitleTableDiv" STYLE="margin-top:2px">
	
</DIV>
<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FORMAT_DIALOG_JS)%>_legendTitleTableDiv" STYLE="margin-top:2px">				
	
</DIV>
<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FORMAT_DIALOG_JS)%>_xAxisTitleTableDiv" STYLE="margin-top:2px">

</DIV>
<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FORMAT_DIALOG_JS)%>_yAxisTitleTableDiv" STYLE="margin-top:2px">

</DIV>
<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FORMAT_DIALOG_JS)%>_baseFontTableDiv" STYLE="margin-top:2px">

</DIV>
<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FORMAT_DIALOG_JS)%>_outsideFontTableDiv" STYLE="margin-top:2px">

</DIV>