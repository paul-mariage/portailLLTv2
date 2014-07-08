<!--  Copyright 1994-2005, Actuate Software Corp., All rights reserved.--> 

<%@ page contentType="text/html; charset=utf-8" %>
<%@ page session="false" buffer="none" %>
<%@ page import="com.actuate.iv.utility.IVParameterAccessor,
				 com.actuate.iv.IIVConstants" %>
				
<jsp:useBean id="fragment" type="com.actuate.iv.presentation.aggregation.IFragment" scope="request" />
<jsp:useBean id="presentationBean" type="com.actuate.iv.context.bean.IVPresentationBean" scope="request" />

<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%-----------------------------------------------------------------------------
	Value dialog fragment
--%>
<div class="dialogLabelFont">
<TABLE CELLSPACING="2" CELLPADDING="2" CLASS="dialogTableLayout">	
	<TR>
		<TD>
			<table>
				<tr>
					<td class="labelWidth"></td>
					<td>
					<SPAN id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_VALUE_DIALOG_JS)%>_radioByValue' class="valueRadio">
							<%-- Radio Button --%>
					</SPAN>
					<SPAN id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_VALUE_DIALOG_JS)%>_radioByColumn' class="valueRadio">
							<%-- Radio Button --%>
					</SPAN>
					</td>
				</tr>
				<tr>	
					<td class="labelWidth"></td>
					<td>		
					<!-- Container for all "Use value from Data Field" content -->
					<div id="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_VALUE_DIALOG_JS)%>_bindingsContainer" style="display: none;">
						<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_VALUE_DIALOG_JS)%>_bindingsDropdown"></DIV>
					</div>
					</td>
				</tr>
			</table>
			
			<!-- Container for all "Specify Literal Values" content -->
			<div id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_VALUE_DIALOG_JS)%>_value1'>
				<table>
					<tr>
						<td class="labelWidth"><fmt:message key="filterDialog.text.value" bundle="${dialogBundle}"/></td>
						<td>
							<div id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_VALUE_DIALOG_JS)%>_value1InputDiv'>
							</div>
						</td>
						<td>
							<INPUT id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_VALUE_DIALOG_JS)%>_DateImg1'  
							       STYLE="width:20px;height:20px;background: url(<jsp:getProperty name='presentationBean' property='baseUrl' />/iportal/jsapi/actuate/widget/images/form/icon-ygg-calendar-default16x16.png) 0 0 transparent;cursor:pointer;border-bottom: 1px solid #B5B8C8;"
									CLASS="actuateCSSSprite_dialog actuateIV_calendar"/>
							</td>
						<td>
							<span class="iv_dialog_link_enabled" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_VALUE_DIALOG_JS)%>_SelectValuesLink1'>
								<fmt:message key="filterDialog.text.selectValues" bundle="${dialogBundle}"/>
							</span>
						</td>
					</tr>
				</table>	
			</div>
	    
	   		<div id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_VALUE_DIALOG_JS)%>_SelectValuesDiv' CLASS="padding">
				<TABLE>
				<TR ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_VALUE_DIALOG_JS)%>_FindRow">
					<TD class="labelWidth"><DIV><fmt:message key="filterDialog.text.filterText" bundle="${dialogBundle}"/></DIV></TD>
					<TD class="fieldMargin">
						<table cellpadding="0" cellspacing="0">
						<tr>
							<td ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_VALUE_DIALOG_JS)%>_FilterText"></td>
							<td ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_VALUE_DIALOG_JS)%>_FindButton"></td>
						</tr>
						</table>
					</TD>
					<TD>
					</TD>
				</TR>
				</TABLE>
				<TABLE CLASS="padding">	
				<TR>
					<TD class="labelWidth" valign=top>
					</TD>	
					<TD>
						<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_VALUE_DIALOG_JS)%>_ValuesList"></DIV>
					</TD>
				</TR>
				<TR>
					<TD></TD>
					<TD ALIGN="center">
						<SPAN CLASS="link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_VALUE_DIALOG_JS)%>_previous">
							<fmt:message key="filterDialog.text.previous" bundle="${dialogBundle}"/>
						</SPAN>&nbsp;
						<LABEL>|</LABEL>&nbsp;
						<SPAN CLASS="link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_VALUE_DIALOG_JS)%>_next">
							<fmt:message key="filterDialog.text.next" bundle="${dialogBundle}"/>
						</SPAN>
					</TD>
				</TR>
				</TABLE>
			</div>
			<table>
				<tr>
					<td class="labelWidth"></td>
					<td>
						<div id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_VALUE_DIALOG_JS)%>_Calendar' style="display:none">
						</div>
					</td>
				</tr>	
			</table>	
			<div id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_VALUE_DIALOG_JS)%>_FormatHintMessage' style="color:black"></div>	
		<!-- End of "Specify Literal Values" content -->
		</TD>
	</TR>
</TABLE>	
</div>