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
					<TABLE CLASS="dialog_flashChartTypeTable" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FLASHGADGET_TYPE_DIALOG_JS)%>_gadgetTypeTab">
						<TR>
							<TD CLASS="padding subTypeCell"">
								<INPUT TYPE="button" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FLASHGADGET_TYPE_DIALOG_JS)%>_gadgetTypeImage1Id"
									CLASS="subtypeimages actuateCSSSprite_flashgadget" />
								<DIV CLASS="subTypeTexts" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FLASHGADGET_TYPE_DIALOG_JS)%>_gadgetTypeNameDiv1Id" >
								</DIV>
							</TD>
							<TD CLASS="padding subTypeCell" >
								<INPUT TYPE="button" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FLASHGADGET_TYPE_DIALOG_JS)%>_gadgetTypeImage2Id"
									CLASS="subtypeimages actuateCSSSprite_flashgadget" />
								<DIV CLASS="subTypeTexts" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FLASHGADGET_TYPE_DIALOG_JS)%>_gadgetTypeNameDiv2Id" >
								</DIV>
							</TD>
							<TD CLASS="padding subTypeCell">
								<INPUT TYPE="button" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FLASHGADGET_TYPE_DIALOG_JS)%>_gadgetTypeImage3Id"
									CLASS="subtypeimages actuateCSSSprite_flashgadget" />
								<DIV CLASS="subTypeTexts" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FLASHGADGET_TYPE_DIALOG_JS)%>_gadgetTypeNameDiv3Id" >
								</DIV>
							</TD>
						</TR>	
						<TR>
							<TD COLSPAN=3>
								<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FLASHGADGET_TYPE_DIALOG_JS)%>_noswitchToType"></DIV>
							</TD>
						</TR>	
					</TABLE>
				</DIV>
				</TD>
				</TR>
		</TR>
</TABLE>
