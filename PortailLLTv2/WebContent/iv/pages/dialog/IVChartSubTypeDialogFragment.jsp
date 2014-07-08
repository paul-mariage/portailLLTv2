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
<fmt:setBundle basename="com.actuate.iv.resource.Dialog" var="dialogBundle" scope="request"/>
<fmt:setBundle basename="com.actuate.iv.resource.id.Dialog" var="idBundle" scope="request"/>


<%-----------------------------------------------------------------------------
	Chart Settings dialog fragment
--%>
<TABLE CLASS="dialog_content_table" STYLE="width: 100%;">
	<TR>
		<TD>
			<DIV CLASS="dialog_chartSubType_Div">
				<TABLE CLASS="dialog_chartTypeTable" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_SUBTYPE_DIALOG_JS)%>_chartTypeTab">
					<TR>
						<TD	CLASS="padding subTypeCell">
							<INPUT TYPE="button" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_SUBTYPE_DIALOG_JS)%>_subChartTypeImage1Id"
								CLASS="subtypeimages actuateCSSSprite" />
							<DIV CLASS="subTypeTexts" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_SUBTYPE_DIALOG_JS)%>_subChartTypeNameDiv1Id" >
							</DIV>
						</TD>
						<TD	CLASS="padding subTypeCell">
							<INPUT TYPE="button" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_SUBTYPE_DIALOG_JS)%>_subChartTypeImage2Id"
								CLASS="subtypeimages actuateCSSSprite" />
							<DIV CLASS="subTypeTexts" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_SUBTYPE_DIALOG_JS)%>_subChartTypeNameDiv2Id" >
							</DIV>
						</TD>
						<TD CLASS="padding subTypeCell">
							<INPUT TYPE="button" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_SUBTYPE_DIALOG_JS)%>_subChartTypeImage3Id"
								CLASS="subtypeimages actuateCSSSprite" />
							<DIV CLASS="subTypeTexts" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_SUBTYPE_DIALOG_JS)%>_subChartTypeNameDiv3Id" >
							</DIV>
						</TD>
					</TR>	
					<TR>
						<TD COLSPAN=3>
							<DIV CLASS="noSubtypeTexts" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_SUBTYPE_DIALOG_JS)%>_noChartSubType"></DIV>
						</TD>
					</TR>	
				</TABLE>
			</DIV>
		</TD>
	</TR>
</TABLE>
