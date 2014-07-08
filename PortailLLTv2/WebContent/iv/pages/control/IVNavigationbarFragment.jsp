<%-----------------------------------------------------------------------------
	Copyright (c) 2004 Actuate Corporation and others.
	All rights reserved. This program and the accompanying materials 
	are made available under the terms of the Eclipse Public License v1.0
	which accompanies this distribution, and is available at
	http://www.eclipse.org/legal/epl-v10.html
	
	Contributors:
		Actuate Corporation - Initial implementation.
--%>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ page session="false" buffer="none" %>
<%@ page import="com.actuate.iv.utility.IVParameterAccessor,com.actuate.iv.IIVConstants,
				com.actuate.reportcast.utils.AcRequestHandlerBean,
				 com.actuate.activeportal.beans.UserInfoBean,
				 com.actuate.reportcast.utils.StaticFuncs,
				 java.util.ResourceBundle, 
				 java.util.Locale" %>


<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%-----------------------------------------------------------------------------
	Expected java beans
--%>
<jsp:useBean id="presentationBean" type="com.actuate.iv.context.bean.IVPresentationBean" scope="request" />
<jsp:useBean id="fragment" type="com.actuate.iv.presentation.aggregation.IFragment" scope="request" />
 <%
	Locale locale = presentationBean.getLocale( );
	AcRequestHandlerBean reqHandler = new AcRequestHandlerBean( );
	reqHandler.setRequest( request );
	UserInfoBean userBean = reqHandler.getUserInfoBeanFromSession( );
	boolean isWorkgroup = false;
	if ( userBean.getRepositoryType() != null 
	        && userBean.getRepositoryType().compareToIgnoreCase("Workgroup") == 0 )
	{
		isWorkgroup = true;
	}
	boolean isAJC = false;	
	isAJC = StaticFuncs.isAJC();
%>	
<%-----------------------------------------------------------------------------
	Navbar fragment
--%>
		<DIV ID="NavigationBar" CLASS="navbar" OPT="Toolbar" 
				CONFIGENABLED="<%=( presentationBean.getGlobalFeatureOptions( ).getToolBar( ).booleanValue( ) == true ) ? "YES" : "NO"%>" > 
	
 		
			<TABLE CELLSPACING="0" CELLPADDING="0" CLASS='navbar_layout' position: relative;" WIDTH="100%">				
				<TR NOWRAP>
					<TD WIDTH="" >
						 <TABLE CELLSPACING="0" CELLPADDING="0" CLASS='navbar_layout' style='margin-left:16px' >
						 <TR NOWRAP>	
								<TD WIDTH="32px">	
									<INPUT TYPE="button" 
									    NAME="ToolbarBtn"
										CLASS='actuateCSSSprite_firstload actuateIV_start'
								   		TITLE="<fmt:message key="navbar.toolbar" bundle="${ controlBundle }"/>"
								   		OPT="MainMenu" 	
										CONFIGENABLED="<%=(presentationBean.getGlobalFeatureOptions().getMainmenu().booleanValue( )==true)?"YES":"NO"%>" />
								</TD>
							
												
								<TD WIDTH="32px" HEIGHT="0px" CLASS="navbar_cell_right"  style="display:none;">
									<INPUT TYPE="button" NAME="undoimg" 
									class='actuateCSSSprite_firstload actuateIV_undo'
									ENABLED_ON='actuateCSSSprite_firstload actuateIV_undo' 
									ENABLED_OFF='actuateCSSSprite_firstload actuateIV_undo actuate-item-disabled' 
									TITLE='<fmt:message key="navbar.undo" bundle="${controlBundle}"/>' />
								</TD>
					
								<TD WIDTH="32px" HEIGHT="0px"  CLASS="navbar_cell_right"  style="display:none;">																	
									<INPUT TYPE="button" NAME="redoimg" 
									class='actuateCSSSprite_firstload actuateIV_redo' 
									ENABLED_ON='actuateCSSSprite_firstload actuateIV_redo' 
									ENABLED_OFF='actuateCSSSprite_firstload actuateIV_redo actuate-item-disabled' 
									TITLE='<fmt:message key="navbar.redo" bundle="${controlBundle}"/>' />
								</TD>
								
								
								<TD WIDTH="0px">	
									<INPUT TYPE="button"  style="display:none;"
									    NAME="BrsEdit"
										CLASS='actuateCSSSprite_firstload actuateIV_BrsEdit'
								   		TITLE="<fmt:message key="navbar.toolbar" bundle="${ controlBundle }"/>"
								   		OPT="MainMenu" 	
										CONFIGENABLED="<%=(presentationBean.getGlobalFeatureOptions().getMainmenu().booleanValue( )==true)?"YES":"NO"%>" />
								</TD>
						 </TR>
						 </TABLE>	
					</TD>
					<TD WIDTH="" >
						<DIV ID="<%=IVParameterAccessor.getHtmlId( IIVConstants.IV_NAV_BAR_JS )%>_pagenavigation" style = "float:right; position: relative;"
							CONFIGENABLED="<%=( presentationBean.getGlobalFeatureOptions( ).getPageNavigation( ).booleanValue( ) == true ) ? "YES" : "NO"%>" >
							<TABLE CELLSPACING="0" CELLPADDING="0" CLASS='navbar_layout'  style='margin-right:16px'>
								<TR>
									 <TD ID="NavigationBar_ReportName">
									 <%
									 	String reportName = presentationBean.getReportDesign( );
									 	if ( reportName != null && reportName.lastIndexOf( "/" ) >= 0 && reportName.lastIndexOf( "/" ) < reportName.lastIndexOf( "." ) )
									 	{
									 		reportName = reportName.substring( reportName.lastIndexOf( "/" )+1, reportName.lastIndexOf( "." ) );
									 	}
									 %>
									 <lable class="reporttitle_text"> <% out.print(reportName==null?"":reportName); %></lable>
									</TD>

									<TD WIDTH="0px" HEIGHT="27px" ALIGN='center'>&nbsp;&nbsp;</TD>
									<TD WIDTH="32px" HEIGHT="27px" ALIGN='center'>
										<INPUT TYPE="button" NAME='First' 
										    TITLE="<fmt:message key="navbar.first.title" bundle="${ controlBundle }"/>"
											CLASS='actuateCSSSprite_firstload actuateIV_first' 
											ENABLED_ON='actuateCSSSprite_firstload actuateIV_first' 
											ENABLED_OFF='actuateCSSSprite_firstload actuateIV_first grayer_actuate-item-disabled'/>
									</TD>
									<TD WIDTH="32px" HEIGHT="27px" ALIGN='center'>
										<INPUT TYPE="button" NAME='Previous' 
										    TITLE="<fmt:message key="navbar.previous.title" bundle="${ controlBundle }"/>"
											CLASS='actuateCSSSprite_firstload actuateIV_prev' 
											ENABLED_ON='actuateCSSSprite_firstload actuateIV_prev' 
											ENABLED_OFF='actuateCSSSprite_firstload actuateIV_prev grayer_actuate-item-disabled'/>

									</TD>
									
									<TD WIDTH="27px" HEIGHT="27px" NOWRAP>
										<span  ID="<%=IVParameterAccessor.getHtmlId( IIVConstants.IV_NAV_BAR_JS )%>_gotoPage"
											value="<%if ( presentationBean.getBookmark( ) == null )
			{%>
												<%=presentationBean.getReportPage( ) == null ? ( 0 + "" ) : presentationBean.getReportPage( )%>
										<%}%>"									
											CLASS="navbar_input_goto" ></span>
									</TD>
									<TD WIDTH="10px" HEIGHT="27px" NOWRAP>
									    <span style="padding: 0 2px 0 2px;" CLASS="navbar_totalPage">/</span>
									</TD>
									<TD NOWRAP>
										<div ID="<%=IVParameterAccessor.getHtmlId( IIVConstants.IV_NAV_BAR_JS )%>_totalPage"></div>
									</TD>
									<TD WIDTH="32px" HEIGHT="27px" ALIGN='center'>
										<INPUT TYPE="button" NAME='Next' 
										    TITLE="<fmt:message key="navbar.next.title" bundle="${ controlBundle }"/>"
											CLASS='actuateCSSSprite_firstload actuateIV_next' 
											ENABLED_ON='actuateCSSSprite_firstload actuateIV_next' 
											ENABLED_OFF='actuateCSSSprite_firstload actuateIV_next grayer_actuate-item-disabled'/>
									</TD>
									<TD WIDTH="32px" HEIGHT="0px" ALIGN='center'>
										<INPUT TYPE="button" NAME='Last'  
										    TITLE="<fmt:message key="navbar.last.title" bundle="${ controlBundle }"/>"
											CLASS='actuateCSSSprite_firstload actuateIV_last' 
											ENABLED_ON='actuateCSSSprite_firstload actuateIV_last' 
											ENABLED_OFF='actuateCSSSprite_firstload actuateIV_last grayer_actuate-item-disabled'/>
									</TD>		
									</TR>
							</TABLE>
						</DIV>
					</TD>
</TD>
								
				</TR>				
				<tr  width="100%" ><td colspan=2>
				<DIV class="navbar_bottomline">
				</DIV>
				</td></tr>	
			</TABLE>
 
		</DIV>
		<DIV CLASS="navbar_divider"></DIV>
		<%
			if ( fragment != null )
			{
				fragment.callBack( request, response );
			}
		%>
