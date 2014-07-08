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
		<TABLE>
		<TR>
			<TD WIDTH="75px">
				<fmt:message key="filterDialog.text.filterBy" bundle="${dialogBundle}"/>
			</TD>
			<TD>
				<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_chartfilterBy">
				</DIV> 
			</TD>			
		</TR>
		<TR HEIGHT="1px"></TR>
		<TR>
			<TD WIDTH="75px">
				<fmt:message key="filterDialog.text.condition" bundle="${dialogBundle}"/>
			</TD>
			<TD>
				<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_chartcondition">
				</DIV>
			</TD>
			<TD></TD>
		</TR>
		</TABLE>
		<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_chartvalue1">
		<TABLE>
		<TR>
			<TD WIDTH="75px">
				<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_charttextValue1Div">
					<fmt:message key="filterDialog.text.value" bundle="${dialogBundle}"/>
				</DIV>
			</TD>
			<TD style="padding-right: 0px">
				<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_chartvalue1InputDiv">
				</DIV>
				<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_ChartListSelectedValues"></DIV>
			</TD>
			<TD style="padding-left: 0px">
				<INPUT TYPE="button" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_ChartDateImg1"  
			         STYLE="width:20px;height:20px;background: url(<jsp:getProperty name='presentationBean' property='baseUrl' />/iportal/jsapi/actuate/widget/images/form/icon-ygg-calendar-default16x16.png) 0 0 transparent;cursor:pointer;border-bottom: 1px solid #B5B8C8;"
					 CLASS=" actuateCSSSprite_dialog actuateIV_calendar" />
			</TD>
			<TD>
				<A CLASS="iv_dialog_link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_chartSelectValuesLink1">
				<fmt:message key="filterDialog.text.selectValues" bundle="${dialogBundle}"/></A>
				<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_chartSelectValuesLabel1">
				<fmt:message key="filterDialog.text.selectValues" bundle="${dialogBundle}"/></DIV>
			</TD>
		</TR>
		</TABLE>
		</DIV>
		<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_chartAnyOfListValuesDiv" >
		<TABLE ALIGN="center" WIDTH="100%" CELLPADDING="0px;" CELLSPACING="2px;">
			<TR>
				<TD ALIGN="center">
					<A CLASS="iv_dialog_link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_chartAnyOfListValuesLink">
					<fmt:message key="filterDialog.text.ListValues" bundle="${dialogBundle}"/></A>
					<LABEL>|</LABEL>
					<A CLASS="iv_dialog_link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_chartAnyOfDeleteValuesLink">
					<fmt:message key="filterDialog.text.DeleteValues" bundle="${dialogBundle}"/></A>
				</TD>
			</TR>
		</TABLE>	
		</DIV>
		<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_chartvalue2">
		<TABLE>
		<TR>
			<TD WIDTH="75px">
				<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_charttextValue2Div">
					<fmt:message key="filterDialog.text.value" bundle="${dialogBundle}"/>
				</DIV>
			</TD>
			<TD style="padding-right: 0px">
				<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_chartvalue2InputDiv">
				</DIV>
			</TD>
			<TD style="padding-left: 0px">
				<INPUT TYPE="button" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_ChartDateImg2"  
			          STYLE="width:20px;height:20px;background: url(<jsp:getProperty name='presentationBean' property='baseUrl' />/iportal/jsapi/actuate/widget/images/form/icon-ygg-calendar-default16x16.png) 0 0 transparent;cursor:pointer;border-bottom: 1px solid #B5B8C8;"
					CLASS=" actuateCSSSprite_dialog actuateIV_calendar" />
			</TD>
			<TD>
				<A CLASS="iv_dialog_link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_chartSelectValuesLink2">
				<fmt:message key="filterDialog.text.selectValues" bundle="${dialogBundle}"/></A>
				<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_chartSelectValuesLabel2">
				<fmt:message key="filterDialog.text.selectValues" bundle="${dialogBundle}"/></DIV>
			</TD>
		</TR>
	    </TABLE>
	    </DIV>
	    
		<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_chartSelectValuesDiv">
		<TABLE>
			<TR ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_FindRow">
				<TD WIDTH=55><div ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_filterTextLabel"><fmt:message key="filterDialog.text.filterText" bundle="${dialogBundle}"/></div></TD>
				<TD>
					<table CELLPADDING="0px" CELLSPACING="0px">
					<tr>
						<td style="padding: 0px" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_chartFilterText"></td>
						<td ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_chartFindButton"></td>
					</tr>
					</table>
				</TD>
				<TD></TD>
			</TR>	
			<TR>
				<TD WIDTH="75px" VALIGN=top>
				</TD>	
				<TD>
					<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_chartValuesList"></DIV>
				</TD>
				<TD></TD>
			</TR>
			<TR>
				<TD></TD>
 				<TD ALIGN="center">
 					<SPAN CLASS="link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_previous">
 						<fmt:message key="filterDialog.text.previous" bundle="${dialogBundle}"/>
 					</SPAN>&nbsp;
 					<LABEL>|</LABEL>&nbsp;
 					<SPAN CLASS="link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_next">
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
	<TABLE>
		<TR>
			<TD WIDTH="75px"></TD>
			<TD>
				<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_ChartCalendar">
				</DIV>
			</TD>
			<TD></TD>
		</TR>	
	</TABLE>	
</DIV>		
<!-- to display date time format msg -->

<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_chartDateTimeFormatDiv">
fdfds
</DIV>

<TABLE CELLPADDING="0px;" CELLSPACING="2px;" WIDTH="100%">
	<TR HEIGHT='10px'><TD></TD></TR>
	<TR>
		<TD ALIGN='center' COLSPAN="5">
			<A CLASS="iv_dialog_link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_chartAdvancedFilterButton">
				<fmt:message key="filterDialog.text.AdvancedFilterButton" bundle="${dialogBundle}"/>
			</A>
			<LABEL ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_labelPipe">|</LABEL>
			<A CLASS="iv_dialog_link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CHART_FILTER_DIALOG_JS)%>_filterClearLink">
				<fmt:message key="topBottomNDialog.text.clearValuesLink" bundle="${dialogBundle}"/>
			</A>
		</TD>
	</TR>
</TABLE>
