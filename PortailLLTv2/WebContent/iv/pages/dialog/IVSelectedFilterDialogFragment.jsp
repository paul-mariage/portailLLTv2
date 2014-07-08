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
	Filter dialog fragment
--%>
<TABLE CELLPADDING="0px" CELLSPACING="0px" CLASS="dialog_content_table" STYLE="width: 100%;">
	<TR>   
		<TD>
		
		<TABLE CELLPADDING="0px" CELLSPACING="0px">
			<TR>
				<TD WIDTH="75px"  >
					<DIV>
					<fmt:message key="filterDialog.text.filterBy" bundle="${dialogBundle}"/>
					</DIV>
				</TD>
				<TD ALIGN="left">
					<DIV  STYLE="display:block;" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_filterBy">
					</DIV>
				</TD>
			</TR>
			<TR>
				<TD WIDTH="75px"  >
					<DIV>
					<fmt:message key="filterDialog.text.condition" bundle="${dialogBundle}"/>
					</DIV>
				</TD>
				<TD ALIGN="left">
					<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_condition">
					</DIV>
				</TD>
			</TR>
		</TABLE>
		
		<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_value1">
		<TABLE CELLPADDING="0px" CELLSPACING="0px">
			<TR>
				<TD WIDTH="75px" NOWRAP>
					<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_textValue1Div">
						<fmt:message key="filterDialog.text.value" bundle="${dialogBundle}"/>
					</DIV>
				</TD>
				<TD ALIGN="left">
					<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_value1InputDiv">
					</DIV>
					
					<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_ListSelectedValues"></DIV>
					
				</TD>
				<TD  style="padding-left: 0px">
					<INPUT TYPE="button" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_DateImg1"  
					       STYLE="width:20px;height:20px;background: url(<jsp:getProperty name='presentationBean' property='baseUrl' />/iportal/jsapi/actuate/widget/images/form/icon-ygg-calendar-default16x16.png) 0 0 transparent;cursor:pointer;border-bottom: 1px solid #B5B8C8;"
							CLASS=" actuateCSSSprite_dialog actuateIV_calendar" />
				</TD>
				<TD>
					<A CLASS="iv_dialog_link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_SelectValuesLink1"">
					<fmt:message key="filterDialog.text.selectValues" bundle="${dialogBundle}"/></A>
					<A CLASS="iv_dialog_link_disabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_SelectValuesLabel1" >
					<fmt:message key="filterDialog.text.selectValues" bundle="${dialogBundle}"/></A>
				</TD>
			</TR>
		</TABLE>
		</DIV>
		<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_anyOfListValuesDiv" >
		<TABLE ALIGN="center" CELLPADDING="0px" CELLSPACING="0px" WIDTH="100%">
			<TR>
				<TD ALIGN="center"  STYLE="display:block;" NOWRAP>
					<A CLASS="iv_dialog_link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_anyOfListValuesLink">
					<fmt:message key="filterDialog.text.ListValues" bundle="${dialogBundle}"/></A>
					<LABEL>|</LABEL>
					<A CLASS="iv_dialog_link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_anyOfDeleteValuesLink">
					<fmt:message key="filterDialog.text.DeleteValues" bundle="${dialogBundle}"/></A>
				</TD>
			</TR>
		</TABLE>	
		</DIV>
		<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_value2">
		<TABLE CELLPADDING="0px" CELLSPACING="0px">
			<TR>
				<TD WIDTH="75px" NOWRAP>
					<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_textValue2Div">
						<fmt:message key="filterDialog.text.value" bundle="${dialogBundle}"/>
					</DIV>
				</TD>
				<TD style="padding-right: 0px">
					<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_value2InputDiv">
					</DIV>
				</TD>
				<TD style="padding-left: 0px">
					<INPUT TYPE="button" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_DateImg2"  
					       STYLE="width:20px;height:20px;background: url(<jsp:getProperty name='presentationBean' property='baseUrl' />/iportal/jsapi/actuate/widget/images/form/icon-ygg-calendar-default16x16.png) 0 0 transparent;cursor:pointer;border-bottom: 1px solid #B5B8C8;"
							CLASS=" actuateCSSSprite_dialog actuateIV_calendar" />
				 </TD>
				<TD>
					<A CLASS="iv_dialog_link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_SelectValuesLink2">
					<fmt:message key="filterDialog.text.selectValues" bundle="${dialogBundle}"/></A>
					<A CLASS="iv_dialog_link_disabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_SelectValuesLabel2">
					<fmt:message key="filterDialog.text.selectValues" bundle="${dialogBundle}"/></A>
				</TD>
			</TR>
	    </TABLE>
	    </DIV>
	    
	    <DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_SelectValuesDiv">
		<TABLE CELLPADDING="0px" CELLSPACING="0px">
			<TR ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_FindRow">
				<TD WIDTH="75px" NOWRAP><DIV id="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_filterTextLabel"><fmt:message key="filterDialog.text.filterText" bundle="${dialogBundle}"/></DIV></TD>
				<TD>
					<table CELLPADDING="0px" CELLSPACING="0px">
					<tr>
						<td style="padding: 0px" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_FilterText"></td>
						<td ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_FindButton"></td>
					</tr>
					</table>
				</TD>
				<TD>
				</TD>
			</TR>	
			<TR>
				<TD WIDTH="75px" VALIGN=top STYLE="display:block;" NOWRAP>
				</TD>	
				<TD>
					<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_ValuesList"></DIV>
				</TD>
				<TD></TD>
			</TR>
			<TR>
				<TD></TD>
				<TD ALIGN="center">
					<SPAN CLASS="link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_previous">
						<fmt:message key="filterDialog.text.previous" bundle="${dialogBundle}"/>
					</SPAN>&nbsp;
					<LABEL>|</LABEL>&nbsp;
					<SPAN CLASS="link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_next">
						<fmt:message key="filterDialog.text.next" bundle="${dialogBundle}"/>
					</SPAN>
				</TD>
			</TR>
		</TABLE>
		</DIV>
		</TD>
</TR>
</TABLE>
		
<DIV>
	<TABLE ALIGN="center" CELLPADDING="2px" CELLSPACING="2px">
		<TR>
			<TD WIDTH="75px" NOWRAP></TD>
			<TD>
				<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_Calendar">
				</DIV>
			</TD>
			<TD></TD>
		</TR>	
	</TABLE>	
</DIV>


<!-- to display date time format msg -->
<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_dateTimeFormatDiv">
</DIV>
<DIV>
		<SPAN ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_recalculateTotalsDiv"></SPAN>
</DIV>
	    
<TABLE ALIGN="center" CELLPADDING="0px;" CELLSPACING="2px;" WIDTH="100%">
	<TR HEIGHT='10px'><TD></TD></TR>
	<TR>
		<TD ALIGN='center' COLSPAN="5">
			<A CLASS="iv_dialog_link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_advancedFilterButton">
				<fmt:message key="filterDialog.text.AdvancedFilterButton" bundle="${dialogBundle}"/>
			</A>
			<LABEL ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_labelPipe">|</LABEL>
			<A CLASS="iv_dialog_link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_SELECTED_FILETER_DIALOG_JS)%>_filterClearLink">
				<fmt:message key="topBottomNDialog.text.clearValuesLink" bundle="${dialogBundle}"/>
			</A>
		</TD>
	</TR>
</TABLE>