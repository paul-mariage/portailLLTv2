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
	Filter dialog fragment
--%>
<TABLE CELLPADDING="0px" CELLSPACING="0px" CLASS="dialog_content_table" STYLE="width: 100%;">
	<TR>
		<TD>
			<DIV>
			<TABLE CELLPADDING="0px" CELLSPACING="0px">
				<TR>
					<TD CLASS="labelWidth">
						<fmt:message key="filterDialog.text.filterBy" bundle="${dialogBundle}"/>
					</TD>
					<TD>
						<DIV ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_filterByTextBox'>
						</DIV>
					</TD>
					<TD>
					</TD>
				</TR>
				<TR>
					<TD></TD>
					<TD>
						<DIV ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_filterByTree'>
						</DIV>
					</TD>
					<TD>
					</TD>
				</TR>
				<TR></TR>
				<TR>
					<TD CLASS="labelWidth">
						<fmt:message key="filterDialog.text.condition" bundle="${dialogBundle}"/>
					</TD>
					<TD>
						<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_condition" ></DIV>
					</TD>
					<TD>
					</TD>
				</TR>
			</TABLE>
			</DIV>
			<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_value1" >
				<TABLE CELLPADDING="0px" CELLSPACING="0px">
					<TR>
						<TD COLSPAN="2">
							<DIV ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_valueValueBlock1' >
								<TABLE CELLPADDING="0px" CELLSPACING="0px" CLASS="valueTablePadding">
									<TR>
										<TD CLASS="labelWidth">
											<span  ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_textValue1Div' STYLE="padding:0px;margin:0px;" >
											<fmt:message key="filterDialog.text.value" bundle="${dialogBundle}"/>
											</span>
										</TD>
										<TD style="padding-right: 0px">										
											<DIV ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_value1InputDiv'>
											</DIV>
											<DIV ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_ListSelectedValues' style="margin-left: 1px;" ></DIV>
										</TD>
										<TD style="padding-left: 0px; padding-top: 3px;"><INPUT TYPE="button" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_DateImg1" 
										          STYLE="width:20px;height:20px;background: url(<jsp:getProperty name='presentationBean' property='baseUrl' />/iportal/jsapi/actuate/widget/images/form/icon-ygg-calendar-default16x16.png) 0 0 transparent;cursor:pointer;border-bottom: 1px solid #B5B8C8;"
										          CLASS=" actuateCSSSprite_dialog actuateIV_calendar" /></TD>
										<TD>
											<DIV CLASS="selectValuesLinkMargin">
												<SPAN CLASS="link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_SelectValuesLink1">
													<fmt:message key="filterDialog.text.selectValues" bundle="${dialogBundle}"/>
												</SPAN>
											</DIV>
										</TD>
									</TR>
								</TABLE>
							</DIV>
						</TD>						
					</TR>
												
					</TABLE>						
				</DIV>
				<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_advAnyOfListValuesDiv" >
				<TABLE ALIGN="center" CELLPADDING="0px" CELLSPACING="0px" WIDTH="100%">
				<TR>
					<TD ALIGN="center">
						<A CLASS="link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_advAnyOfListValuesLink">
						<fmt:message key="filterDialog.text.ListValues" bundle="${dialogBundle}"/></A>
						<LABEL>|</LABEL>
						<A CLASS="link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_advAnyOfDeleteValuesLink">
						<fmt:message key="filterDialog.text.DeleteValues" bundle="${dialogBundle}"/></A>
					</TD>
				</TR>
				</TABLE>	
				</DIV>					
				<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_value2">
				
					<TABLE CELLPADDING="0px" CELLSPACING="0px">
							<TR>
								<TD COLSPAN="2" >
									<DIV  ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_valueValueBlock2'>
										<TABLE CELLPADDING="0px" CELLSPACING="0px" CLASS="valueTablePadding">
											<TR>
												<TD CLASS="labelWidth">
													<SPAN  ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_textValue2Div' >
													<fmt:message key="filterDialog.text.value" bundle="${dialogBundle}"/>
													</SPAN>
												</TD>
												<TD style="padding-right: 0px">
													<DIV ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_value2InputDiv' >
													</DIV>
												</TD>
												<TD style="padding-left: 0px; padding-top: 3px;"><INPUT TYPE="button" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_DateImg2" 
												          STYLE="width:20px;height:20px;background: url(<jsp:getProperty name='presentationBean' property='baseUrl' />/iportal/jsapi/actuate/widget/images/form/icon-ygg-calendar-default16x16.png) 0 0 transparent;cursor:pointer;border-bottom: 1px solid #B5B8C8;"
										          CLASS=" actuateCSSSprite_dialog actuateIV_calendar" /></TD>
												<TD>
													<DIV CLASS="selectValuesLinkMargin">
														<SPAN CLASS="link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_SelectValuesLink2">
															<fmt:message key="filterDialog.text.selectValues" bundle="${dialogBundle}"/>
														</SPAN>
													</DIV>
												</TD>
											</TR>
										</TABLE>
									</DIV>											
								</TD>
							</TR>
							
					</TABLE>						
			</DIV>
			
		    <DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_SelectValuesDiv">
			<TABLE CELLPADDING="0px" CELLSPACING="0px">
				<TR ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_FindRow">
					<TD WIDTH=78px><DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_filterTextLabel"><fmt:message key="filterDialog.text.filterText" bundle="${dialogBundle}"/></DIV></TD>
					<TD>
						<table CELLPADDING="0px" CELLSPACING="0px">
						<tr>
							<td style="padding: 0px" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_FilterText"></td>
							<td ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_FindButton"></td>
						</tr>
						</table>
					</TD>
					<TD></TD>
				</TR>
				<TR></TR>	
				<TR>
					<TD WIDTH=78px VALIGN=top>
				</TD>	
					<TD>
						<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_ValuesList"></DIV>
					</TD>
					<TD></TD>
				</TR>
				<TR>
					<TD></TD>
 					<TD ALIGN="center">
 						<SPAN CLASS="link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_previous">
 							<fmt:message key="filterDialog.text.previous" bundle="${dialogBundle}"/>
 						</SPAN>&nbsp;
 						<LABEL>|</LABEL>&nbsp;
 						<SPAN CLASS="link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_next">
 							<fmt:message key="filterDialog.text.next" bundle="${dialogBundle}"/>
 						</SPAN>
 					</TD>
 				</TR>
			</TABLE>
			</DIV>
			<TABLE CELLPADDING="0px" CELLSPACING="0px">
			<TR>
				<TD WIDTH=70px></TD>
				<TD>
					<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_Calendar" STYLE="display:none">
					</DIV>
				</TD>
				<TD></TD>
			</TR>	
			</TABLE>	
			
			</TD>
			</TR>
	<TR>
		<TD>
			<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_FormatHintMessage"></DIV>
		</TD>
	</TR>	
			
			<TR>
				<TD ALIGN=center>
					<TABLE CELLPADDING="0px" CELLSPACING="0px">
						<TR>
							<TD>
								<SPAN CLASS="link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_button_addCondition">
								<fmt:message key="advancedFilterDialog.text.button.addCondition" bundle="${dialogBundle}"/>
								</SPAN>
							</TD>
							<TD></TD>
							<TD>
								<SPAN CLASS="link_enabled" ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_button_changeCondition">
								<fmt:message key="advancedFilterDialog.text.button.changeCondition" bundle="${dialogBundle}"/>
								</SPAN>
							</TD>
						</TR>
					</TABLE>
				</TD>
			</TR>
		<TR>
		<TD>
		<DIV>
			<DIV>
				<fmt:message key="advancedFilterDialog.text.filters" bundle="${dialogBundle}"/>
			</DIV>
			<DIV CLASS="filtersAreaContentDiv">
			<TABLE CELLPADDING="5px" CELLSPACING="2px">
				<TR>
					<TD>
						<DIV ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_class_filter'>
						</DIV>
					</TD>
					<TD VALIGN="top">
						<TABLE CELLPADDING="0px" CELLSPACING="0px">
							<TR>
								<TD>
									<!-- IE uses the value of the text node. Firefox uses the value attribute.-->
									<button ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_button_andSymbol' name="andSymbol" TYPE="button" VALUE="and"
										CLASS='dialog_default_button symbolButtonSize_1'>
										<fmt:message key="advancedFilterDialog.text.button.andSymbol" bundle="${dialogBundle}"/>
									</button>
								</TD>
								<TD>
									<button ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_button_orSymbol' name="orSymbol" TYPE="button" VALUE="or" 
									CLASS='dialog_default_button symbolButtonSize_1' >
										<fmt:message key="advancedFilterDialog.text.button.orSymbol" bundle="${dialogBundle}"/>
									</button>
								</TD>
								<TD>
									<button ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_button_notSymbol' name="divideSymbol" TYPE="button" VALUE="not" 
									CLASS='dialog_default_button symbolButtonSize_1'>
										<fmt:message key="advancedFilterDialog.text.button.notSymbol" bundle="${dialogBundle}"/>
									</button>
								</TD>
							</TR>
							<TR>
								<TD>
									<button ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_button_leftBracketSymbol' name="leftBracketSymbol" TYPE="button" VALUE="(" 
									CLASS='dialog_default_button symbolButtonSize_1' >
										<fmt:message key="advancedFilterDialog.text.button.leftBracketSymbol" bundle="${dialogBundle}"/>
									</button>
								</TD>
								<TD>
									<button ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_button_rightBracketSymbol' name="rightBracketSymbol" TYPE="button" VALUE=")" 
									CLASS='dialog_default_button symbolButtonSize_1' >
										<fmt:message key="advancedFilterDialog.text.button.rightBracketSymbol" bundle="${dialogBundle}"/>
									</button>
								</TD>
								<TD>
								</TD>
							</TR>
						</TABLE>
						<TABLE CELLPADDING="0px" CELLSPACING="0px">
							<TR>
								<TD colspan="2">
									<button ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_button_deleteSymbol' name="deleteSymbol" TYPE="button" 
									CLASS='dialog_default_button symbolButtonSize_2' >
								 			<fmt:message key="advancedFilterDialog.text.button.delete" bundle="${dialogBundle}"/>
									</button>
								</TD>
								<TD colspan="2" style="display: block">
									<button ID='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_GADGETBUILDER_FILTER_DIALOG_JS)%>_button_validateSymbol' name="validateSymbol" TYPE="button" 
									CLASS='dialog_default_button symbolButtonSize_2'>
								 			<fmt:message key="advancedFilterDialog.text.button.validate" bundle="${dialogBundle}"/>
									</button>
								</TD>
							</TR>
						</TABLE>
					</TD>
				</TR>
			</TABLE>
		</DIV>		
	</DIV></TD>
	</TR>
</TABLE>