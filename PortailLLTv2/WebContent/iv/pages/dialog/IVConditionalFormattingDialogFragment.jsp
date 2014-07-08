<!--  Copyright 1994-2005, Actuate Software Corp., All rights reserved.--> 

<%@ page contentType="text/html; charset=utf-8" %>
<%@ page session="false" buffer="none" %>
<%@ page import="org.eclipse.birt.report.model.api.elements.DesignChoiceConstants,
				java.sql.Types,
				java.util.Iterator,
				java.util.Collection,
				com.actuate.iv.context.*,
				com.actuate.iv.presentation.aggregation.IFragment,
				com.actuate.iv.context.bean.IVPresentationBean,
				com.actuate.iv.utility.IVParameterAccessor,
				com.actuate.iv.IIVConstants" %>
 				 
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
 				 
<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>				 


<jsp:useBean id="fragment" type="com.actuate.iv.presentation.aggregation.IFragment" scope="request" />
<jsp:useBean id="presentationBean" type="com.actuate.iv.context.bean.IVPresentationBean" scope="request" />
 
<%-----------------------------------------------------------------------------
	Conditional Formatting dialog fragment
--%>
<DIV CLASS="conditionalformatdiv">
	<DIV>
		<SPAN class="formatDialog_caption"><fmt:message key="conditionFormatDialog.text.selectColumn" bundle="${dialogBundle}"/></SPAN>
		<SPAN class="formatDialog_caption" id="conditionFormatDialog_id_columnHeader" style="margin-left: 4px;" ></SPAN>
	</DIV>
	<DIV CLASS="divWidth">
	<%
		for ( int idx = 1; idx <= 3; idx++ )
		{
	%>
	
		<DIV id='conditionFormatDialog_id_r<%= idx %>_ruleBlock' CLASS="margin">
			<DIV CLASS="iv_dialog_link_enabled"	ALIGN="right"	 
					id='conditionFormatDialog_id_r<%= idx %>_deleteRule'>
				<fmt:message key="conditionFormatDialog.text.buttonDeleteRule" bundle="${dialogBundle}"/>
			</DIV>	
		
			<DIV CLASS="conditionalformatcontainer">
				
				<TABLE CELLPADDING="0px" CELLSPACING="0px" CLASS="tableMargin">
					<TR>
						<TD>
							<SPAN class="iv_dialog_link_enabled" id="conditionFormatDialog_id_r<%= idx %>_formatBtn">
			    				<fmt:message key="conditionFormatDialog.text.format" bundle="${dialogBundle}"/>
			    			</SPAN>	
						</TD>
						<TD COLSPAN="2">
							<DIV id="conditionFormatDialog_id_r<%= idx %>_previewBox" CLASS="previewbox" >
				   				<TABLE CELLPADDING="0px" CELLSPACING="0px" ALIGN="center">
				   					<TR>
				   						<TD CLASS="previewtext">
				   							<DIV style="height: 27px; width: inherit; overflow: hidden;"  >
												<SPAN CLASS="lineheight" id="conditionFormatDialog_id_r<%= idx %>_previewText" >
				   									<fmt:message key="conditionFormatDialog.text.noFormatRule" bundle="${dialogBundle}"/>
				   								</SPAN>
			   								</DIV>
				   						</TD>
				   					</TR>
				   				</TABLE>			    		
			    			</DIV>
						</TD>
					</TR>
					<TR>
						<TD>
							<fmt:message key="conditionalFormatting.text.columnName" bundle="${dialogBundle}"/>
						</TD>
						<TD>
							<DIV id="conditionFormatDialog_id_r<%= idx %>_conditionColumn" >
								<DIV value="" TEXT=""></DIV>
							</DIV>
						</TD>
					</TR>
					<TR>
						<TD>
							<fmt:message key="conditionalFormatting.text.condition" bundle="${dialogBundle}"/>
						</TD>
						<TD>
							<DIV id="conditionFormatDialog_id_r<%= idx %>_operator" >
								<DIV TEXT="" value=""></DIV>	
							</DIV>
						</TD>
					</TR>	
					<TR>
						<TD>
							<LABEL Id="conditionFormatDialog_id_r<%= idx %>_value1Label"><fmt:message key="conditionalFormatting.text.value" bundle="${dialogBundle}"/></LABEL>
						</TD>
						<TD COLSPAN="3">
							<TABLE CELLPADDING="0px" CELLSPACING="0px" CLASS="valueTable">
								<TR>
									<TD>
										<span ID="conditionFormatDialog_id_r<%= idx %>_value1"></span>
									</TD>
									<TD width="4px"></TD>	
									<TD>
										<A class="iv_dialog_link_enabled" id="conditionFormatDialog_id_r<%= idx %>_changeValueBtn1">
											<fmt:message key="conditionFormatDialog.text.changeValue" bundle="${dialogBundle}"/>
										</A>	
									</TD>
								</TR>
							</TABLE>			
						</TD>
					</TR>	
					<TR>
						<TD>
							<LABEL Id="conditionFormatDialog_id_r<%= idx %>_value2Label"><fmt:message key="conditionalFormatting.text.value" bundle="${dialogBundle}"/></LABEL>
						</TD>
						<TD COLSPAN="3">
							<TABLE CELLPADDING="0px" CELLSPACING="0px" CLASS="valueTable">
								<TR>
									<TD>
										<span ID="conditionFormatDialog_id_r<%= idx %>_value2"></span>
									</TD>
									<TD width="4px"></TD>	
									<TD>		
										<A class="iv_dialog_link_enabled" id="conditionFormatDialog_id_r<%= idx %>_changeValueBtn2">
											<fmt:message key="conditionFormatDialog.text.changeValue" bundle="${dialogBundle}"/>
										</A>
									</TD>
								</TR>
							</TABLE>	
						</TD>
					</TR>		
				</TABLE>
			</DIV>
		</DIV>
	<%
		}
	%>
	</DIV>
	<DIV ALIGN="center" CLASS="divWidth">
		<a id="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_CONDITIONAL_FORMATTING_DIALOG_JS)%>_buttonAddRule"
			name="validateSymbol">
			<fmt:message key="conditionFormatDialog.text.buttonAddRule" bundle="${dialogBundle}"/>
		</a>
	</DIV>
</DIV>
