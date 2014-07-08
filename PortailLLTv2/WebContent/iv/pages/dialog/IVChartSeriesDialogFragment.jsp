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
	ChartSeriesDialog fragment
--%>
<TABLE CELLPADDING="0px" CELLSPACING="0px" CLASS="dialog_content_table" STYLE="width: 100%;">
	<TR>  
		<TD>
		<TABLE>
		<TR>
			<TD WIDTH="75px">
				<fmt:message key="chartSeriesDialog.text.series" bundle="${dialogBundle}"/>
			</TD>
			<TD>
				<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_SERIES_DIALOG_JS)%>_series"></DIV> 
			</TD>			
		</TR>
		</TABLE>
		</TD>
	</TR>
</TABLE>
