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

				 
<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<fmt:setBundle basename="com.actuate.iv.resource.Control" var="controlBundle" scope="request"/>

<%-----------------------------------------------------------------------------
	Expected java beans
--%>
<jsp:useBean id="presentationBean" type="com.actuate.iv.context.bean.IVPresentationBean" scope="request" />

<DIV STYLE="display:none;" CLASS="toolbar_outermostDiv">
	<DIV ID="toolbar_menuDiv"  CLASS="toolbar_menuDiv">
		<DIV CLASS="toolbar_menuDiv_margin" >  
		<%
			if ( presentationBean.isAllowInteractiveViewing( ) )
			{
		%>
				<DIV NAME="ENABLE_IV" CLASS="toolbar_buttonStyle" OPT="EditReport"
					CONFIGENABLED="<%=(presentationBean.getGlobalFeatureOptions().getEditReport().booleanValue( )==true)?"YES":"NO"%>" >
					
					<INPUT TYPE="button"
			       CLASS="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Interactive_viewer"
			       ENABLED_ON="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Interactive_viewer"
			       ENABLED_OFF="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Interactive_viewer_disabled"/> 	 
					<fmt:message key="toolbar.enableiv" bundle="${controlBundle}"/>
				</DIV>
				<DIV NAME="DISABLE_IV" CLASS="toolbar_buttonStyle" OPT="EditReport"
					CONFIGENABLED="<%=(presentationBean.getGlobalFeatureOptions().getEditReport().booleanValue( )==true)?"YES":"NO"%>" >
		 			
  					<INPUT TYPE="button"
  			    	   CLASS="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Interactive_viewer_disabled"
	  			       ENABLED_ON="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Interactive_viewer"
  				       ENABLED_OFF="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Interactive_viewer_disabled"/> 	 
  					<fmt:message key="toolbar.disableiv" bundle="${controlBundle}"/>
		  		</DIV>
		  		<DIV NAME="UNDO" CLASS="toolbar_buttonStyle" OPT="EditReport"
					CONFIGENABLED="<%=(presentationBean.getGlobalFeatureOptions().getEditReport().booleanValue( )==true)?"YES":"NO"%>" >					
					<INPUT TYPE="button"
					class='toolbar_imageUrl actuateCSSSprite_firstload actuateIV_undo'
					ENABLED_ON='toolbar_imageUrl actuateCSSSprite_firstload actuateIV_undo' 
					ENABLED_OFF='toolbar_imageUrl actuateCSSSprite_firstload actuateIV_undo_disabled' />
					<fmt:message key="navbar.undo" bundle="${controlBundle}"/>
				</DIV>		
			
				<DIV NAME="REDO" CLASS="toolbar_buttonStyle" OPT="EditReport"
					CONFIGENABLED="<%=(presentationBean.getGlobalFeatureOptions().getEditReport().booleanValue( )==true)?"YES":"NO"%>" >					
					<INPUT TYPE="button"
					class='toolbar_imageUrl actuateCSSSprite_firstload actuateIV_redo' 
					ENABLED_ON='toolbar_imageUrl actuateCSSSprite_firstload actuateIV_redo' 
					ENABLED_OFF='toolbar_imageUrl actuateCSSSprite_firstload actuateIV_redo_disabled' />
					<fmt:message key="navbar.redo" bundle="${controlBundle}"/>
				</DIV>
					
		  		<DIV NAME="LAUNCH_VIEWER" CLASS="toolbar_buttonStyle" >
		 			
	 					<INPUT TYPE="button"
	 			    	   CLASS="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Launch_viewer"/> 	 
	 					<fmt:message key="toolbar.launchViewer" bundle="${controlBundle}"/>
		  		</DIV>
		<% 
			}
		%>	
    	   </DIV>		
			<HR>
<DIV CLASS="toolbar_menuDiv_margin" > 
				<DIV NAME="QUERY_PARAMETER" CLASS="toolbar_buttonStyle" OPT="Parameter"
				CONFIGENABLED="<%=(presentationBean.getGlobalFeatureOptions().getParameter().booleanValue( )==true)?"YES":"NO"%>" >
					
					<INPUT TYPE="button" 
					       CLASS="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Parameter"
					       ENABLED_ON="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Parameter"
					       ENABLED_OFF="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Parameter_disabled"/> 	 
					<fmt:message key="toolbar.parameter" bundle="${controlBundle}"/>
				</DIV>			 
			<%
			if( presentationBean.isAllowFacebookComments( ) )
			{
			%>
				<DIV NAME="FACEBOOK_COMMENTS" CLASS="toolbar_buttonStyle" OPT="FacebookComments"
							CONFIGENABLED="YES" >
					
					<INPUT TYPE="button" 
					       CLASS="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Facebook_enable"
					       ENABLED_ON="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Facebook_enable"
					       ENABLED_OFF="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Facebook_enable"/> 	 
					<fmt:message key="toolbar.facebookComments" bundle="${controlBundle}"/>
				</DIV>
			<%} %>
			<DIV NAME="TOC" CLASS="toolbar_buttonStyle" OPT="Toc"
						CONFIGENABLED="<%=(presentationBean.getGlobalFeatureOptions().getToc().booleanValue( )==true)?"YES":"NO"%>" >
				
				<INPUT TYPE="button" 
				       CLASS="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Toc"
				       ENABLED_ON="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Toc"
			           ENABLED_OFF="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Toc_disabled" /> 	
					<fmt:message key="toolbar.toc" bundle="${controlBundle}"/>
			</DIV>
			</DIV>
			<HR>
			<DIV CLASS="toolbar_menuDiv_margin" > 
				<%
				if ( presentationBean.isAllowInteractiveViewing( ) )
				{
				%>
					<DIV NAME="HIDESHOW_ITEM" CLASS="toolbar_buttonStyle" OPT="HideShowItems"
							CONFIGENABLED="<%=(presentationBean.getGlobalFeatureOptions().getHideShowItems().booleanValue( )==true)?"YES":"NO"%>" >
						
						<INPUT TYPE="button" 
						       CLASS="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Hide_show_item"
						       ENABLED_ON="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Hide_show_item"
					           ENABLED_OFF="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Hide_show_item_disabled"/> 	 
					<fmt:message key="toolbar.hideshowitem" bundle="${controlBundle}"/>
					</DIV>
				<% 
					}
				%>					
					
					<DIV NAME="LINKTOTHISPAGE" CLASS="toolbar_buttonStyle" OPT="LinkToThisPage"
								CONFIGENABLED="<%=(presentationBean.getGlobalFeatureOptions().getLinkToThisPage().booleanValue( )==true)?"YES":"NO"%>" >
						
						<INPUT TYPE="button" 
						       CLASS="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Link_to_pg"
						       ENABLED_ON="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Link_to_pg"
						       ENABLED_OFF="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Link_to_pg"/> 	 
					<fmt:message key="toolbar.linkToThisPage" bundle="${controlBundle}"/>
					</DIV>	

		</DIV>
		<HR>
		<DIV CLASS="toolbar_menuDiv_margin">
		<%
			if ( presentationBean.isAllowInteractiveViewing( ) )
			{
		%>					
				<DIV NAME="QUERY_SAVE_FILE" CLASS="toolbar_buttonStyle" OPT="SaveDesign"
					CONFIGENABLED="<%=(presentationBean.getGlobalFeatureOptions().getSaveDesign().booleanValue( )==true)?"YES":"NO"%>" >
					
					<INPUT TYPE="button" 
   				       CLASS="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_saveDesign"
   				       ENABLED_ON="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_saveDesign"
   			           ENABLED_OFF="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_saveDesign_disable"/> 	
						<fmt:message key="toolbar.saveAs" bundle="${controlBundle}"/>
				</DIV>
				<!-- <DIV NAME="QUERY_SAVE_DOCUMENT" style="display:none;"  OPT="SaveDocument"
					CONFIGENABLED="<%=(presentationBean.getGlobalFeatureOptions().getSaveDocument().booleanValue( )==true)?"YES":"NO"%>" >
					
					<INPUT TYPE="button" 
				       CLASS="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_saveDocument"
				       ENABLED_ON="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_saveDocument"
			           ENABLED_OFF="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_saveDocument_disable"/> 	 
						<fmt:message key="toolbar.saveDocument" bundle="${controlBundle}"/>
					
				</DIV> -->
		<% 
			}
		%>	

		<DIV NAME="DOCUMENT_EXPORTREPORT" CLASS="toolbar_buttonStyle" OPT="ExportReport"
					CONFIGENABLED="<%=(presentationBean.getGlobalFeatureOptions().getExportReport().booleanValue( )==true)?"YES":"NO"%>" >
			
			<INPUT TYPE="button" 
			       CLASS="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_ExportReport"
			       ENABLED_ON="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_ExportReport"
			       ENABLED_OFF="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_ExportReport_disabled"/> 	 
					<fmt:message key="toobar.exportReport" bundle="${controlBundle}"/>
		</DIV>
		<DIV NAME="QUERY_DOCUMENT_EXPORT" CLASS="toolbar_buttonStyle" OPT="ExportData"
					CONFIGENABLED="<%=(presentationBean.getGlobalFeatureOptions().getExportData().booleanValue( )==true)?"YES":"NO"%>" >
			
			<INPUT TYPE="button" 
			       CLASS="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Export"
			       ENABLED_ON="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Export"
			       ENABLED_OFF="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Export_disabled"/> 	 
					<fmt:message key="toolbar.export" bundle="${controlBundle}"/>
		</DIV>
		<DIV NAME="PRINT" CLASS="toolbar_buttonStyle" OPT="Print"
					CONFIGENABLED="<%=(presentationBean.getGlobalFeatureOptions().getPrint().booleanValue( )==true)?"YES":"NO"%>" >
			
			<INPUT TYPE="button" 
			       CLASS="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Print"
			       ENABLED_ON="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Print"
			       ENABLED_OFF="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Print_disabled"/> 	 
					<fmt:message key="toolbar.print" bundle="${controlBundle}"/>
		</DIV>
		</DIV>
		<HR>
		<DIV CLASS="toolbar_menuDiv_margin">
		<DIV NAME="FIRST" CLASS="toolbar_buttonStyle" >
			
			<INPUT TYPE="button" 
			       CLASS="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_first"
			       ENABLED_ON="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_first"
			       ENABLED_OFF="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_first_disabled"/> 	 
					<fmt:message key="navbar.first.title" bundle="${controlBundle}"/>
		</DIV>
		<DIV NAME="PREVIOUS" CLASS="toolbar_buttonStyle" >
			
			<INPUT TYPE="button" 
			       CLASS="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_prev"
			       ENABLED_ON="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_prev"
			       ENABLED_OFF="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_prev_disabled"/> 	 
					<fmt:message key="navbar.previous.title" bundle="${controlBundle}"/>
		</DIV>
		<DIV NAME="NEXT" CLASS="toolbar_buttonStyle" >
			
			<INPUT TYPE="button" 
			       CLASS="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_next"
			       ENABLED_ON="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_next"
			       ENABLED_OFF="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_next_disabled"/>
					<fmt:message key="navbar.next.title" bundle="${controlBundle}"/>
		</DIV>
		<DIV NAME="LAST" CLASS="toolbar_buttonStyle" >
			
			<INPUT TYPE="button" 
			       CLASS="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_last"
			       ENABLED_ON="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_last"
			       ENABLED_OFF="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_last_disabled"/> 	 
					<fmt:message key="navbar.last.title" bundle="${controlBundle}"/>
		</DIV>


		</DIV>
		<DIV CLASS="toolbar_menuDiv_margin">
		<DIV NAME="SHOW_MARGIN" CLASS="toolbar_buttonStyle" OPT="ShowMargin"
				CONFIGENABLED="YES" >
			
			<INPUT TYPE="button" 
			       CLASS="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Show_margin"
			       ENABLED_ON="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Show_margin"
		           ENABLED_OFF="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_Show_margin"/> 	 
					<label><fmt:message key="toolbar.showmargin" bundle="${controlBundle}"/></label>
		</DIV>
		<!--
		<DIV NAME="EditBRS" CLASS="toolbar_buttonStyle" OPT="EditReport"
					CONFIGENABLED="<%=(presentationBean.getGlobalFeatureOptions().getEditReport().booleanValue( )==true)?"YES":"NO"%>" >					
					<INPUT TYPE="button"
			       CLASS="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_BrsEdit"
			       ENABLED_ON="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_BrsEdit"
			       ENABLED_OFF="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_BrsEdit_disabled"/> 	 
					<fmt:message key="toolbar.EditBRS" bundle="${controlBundle}"/>
		</DIV>
		-->	
		<DIV NAME="HELP" CLASS="toolbar_buttonStyle" OPT="ToolbarHelp"
					CONFIGENABLED="<%=(presentationBean.getGlobalFeatureOptions().getToolbarHelp().booleanValue( )==true)?"YES":"NO"%>" >
			
			<INPUT TYPE="button" 
			       CLASS="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_toolbarHelp"
			       ENABLED_ON="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_toolbarHelp"
			       ENABLED_OFF="toolbar_imageUrl actuateCSSSprite_firstload actuateIV_toolbarHelp"/> 	 
					<fmt:message key="toolbar.help" bundle="${controlBundle}"/>
		</DIV>
		
		</DIV>
	</DIV>	
</DIV>
