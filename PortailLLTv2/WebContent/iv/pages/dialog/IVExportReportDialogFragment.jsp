<%@ page contentType="text/html; charset=utf-8" %>
<%@ page session="false" buffer="none" %>
<%@ page import="com.actuate.iv.resource.IVResources,
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
	Filter dialog fragment
--%>
<%
	int pageLimit = IVParameterAccessor.getParameterFromWebXMLAsInt( request, IVParameterAccessor.WEBXML_ALLOW_EXPORT_PAGE_LIMIT, 200 ) ;
	String strPageLimit = Integer.toString( pageLimit );		
	String[] arguments = { strPageLimit };
	String limitInfo = IVResources
							.getFormattedString(
									"com.actuate.iv.resource.Dialog", 
									"exportReportDialog.text.exportLimitInfo",
									arguments );
								
%>

<TABLE CELLPADDING='0px' CELLSPACING='0px' CLASS="dialog_content_table" STYLE="width: 100%;" >
	<TR>
		<TD CLASS="columnPadding">
			<TABLE CLASS="outputFormatBox">
				<TR>
					<TD class="labelCell">
						<fmt:message key="exportReportDialog.text.exportReportFormat" bundle="${dialogBundle}"/>&nbsp;
					</TD>
					<TD style="padding-left: 2px">
						<DIV class="inputCell" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_EXPROTREPORT_DIALOG_JS)%>_ExportReportFormat">
						</DIV>
					</TD>
				</TR>
			</TABLE>
		</TD>
	</TR>
	<TR>
		<TD>
			<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_EXPROTREPORT_DIALOG_JS)%>_ExportReportPageStyle">
			</DIV>
		</TD>
	</TR>
</TABLE>		