<!--  Copyright 1994-2005, Actuate Software Corp., All rights reserved.--> 

<%@ page contentType="text/html; charset=utf-8" %>
<%@ page session="false" buffer="none" %>
<%@ page import="java.util.Iterator,
				java.util.Collection,
				com.actuate.iv.context.*,
				com.actuate.iv.presentation.aggregation.IFragment,
				com.actuate.iv.context.bean.IVPresentationBean,
				com.actuate.iv.utility.IVParameterAccessor,
				com.actuate.iv.IIVConstants" %>
<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<jsp:useBean id="fragment" type="com.actuate.iv.presentation.aggregation.IFragment" scope="request" />
<jsp:useBean id="presentationBean" type="com.actuate.iv.context.bean.IVPresentationBean" scope="request" />
<%-----------------------------------------------------------------------------
	Advanced Font dialog fragment
--%>
<!--<DIV id="fontDialog_title"></DIV>-->
<DIV class="dialogLabelFont">
	<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FONT_DIALOG_EX_JS)%>_headerDataSt">
		<TABLE CELLPADDING="0px" CELLSPACING="2px" WIDTH="100%">
			<TR>
				<TD>
					<DIV CLASS="titleSpacing">
						<fmt:message key="fontDialog.label.applyto" bundle="${dialogBundle}"/>
					</DIV>
				</TD>
				<TD COLSPAN="2">				
					<DIV style="margin-left:5px;">
						<SPAN style="margin-right:15px;" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FONT_DIALOG_EX_JS)%>_applyToBoth'> 
							<%-- Radio Button --%> 
						</SPAN>
						<SPAN style="margin-right:15px;" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FONT_DIALOG_EX_JS)%>_applyToHeader'>
							<%-- Radio Button --%> 
						</SPAN>	
						<SPAN id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FONT_DIALOG_EX_JS)%>_applyToData'>
							<%-- Radio Button --%> 
						</SPAN>									
					</DIV>				
				</TD>
			</TR>
			<TR>
				<TD COLSPAN="3" HEIGHT="20"><DIV CLASS="linespacer"></DIV></TD>
			</TR>
		</TABLE>
	</DIV>	
	<TABLE CELLPADDING="0px" CELLSPACING="2px" WIDTH="100%">
		<TR>
			<TD>
				<DIV CLASS="titleSpacing">
					<fmt:message key="fontDialog.label.font" bundle="${dialogBundle}"/>
				</DIV>
			</TD>
			<TD>				
				<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FONT_DIALOG_EX_JS)%>_fontSelect"></DIV>				
			</TD>
			<TD>
				<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FONT_DIALOG_EX_JS)%>_sizeSelect"></DIV>
			</TD>
			<TD>
				<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FONT_DIALOG_EX_JS)%>_sizeUnitSelect"></DIV>
			</TD>
		</TR>	
		<TR>
			<TD COLSPAN="4" height="10"></TD>
		</TR>
		<TR>
			<TD>	
				<DIV CLASS="titleSpacing">
					<fmt:message key="fontDialog.label.fontcolor" bundle="${dialogBundle}"/>
				</DIV>				
			</TD>
			<TD COLSPAN="3">		
				<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FONT_DIALOG_EX_JS)%>_colorSelect"></DIV>			 	
		 	</TD>
	 	</TR>
		<TR>
			<TD COLSPAN="4" height="10"></TD>
		</TR>	 			
		<TR>
			<TD>	
				<DIV CLASS="titleSpacing" style="margin-right:5px;">
					<fmt:message key="fontDialog.label.backgroundColor" bundle="${dialogBundle}"/>
				</DIV>
			</TD>
			<TD COLSPAN="3">		
			 	<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FONT_DIALOG_EX_JS)%>_bgColorSelect"></DIV>
		 	</TD>
	 	</TR>	 	
	</TABLE>
	<DIV style="margin-top:10px;text-align:center;width:100%;"  CLASS="itemSpacing">	
		<SPAN style="margin-right:15px;">
			<INPUT TYPE="button" id="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FONT_DIALOG_EX_JS)%>_bold"
			 	name="boldimg" 
			 	CLASS="imagebutton actuateCSSSprite_dialog actuateIV_bold_disable"
			 	ENABLED_ON="imagebutton actuateCSSSprite_dialog actuateIV_bold_enable"
			 	ENABLED_OFF="imagebutton actuateCSSSprite_dialog actuateIV_bold_disable"
			 	style="cursor:pointer"/>
			<INPUT TYPE="button" id="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FONT_DIALOG_EX_JS)%>_italic" 
			 	name="italicimg" 
			 	CLASS="imagebutton actuateCSSSprite_dialog actuateIV_italic_disable"
			 	ENABLED_ON="imagebutton actuateCSSSprite_dialog actuateIV_italic_enable"
			 	ENABLED_OFF="imagebutton actuateCSSSprite_dialog actuateIV_italic_disable"
			 	style="cursor:pointer"/>
			<INPUT TYPE="button" id="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FONT_DIALOG_EX_JS)%>_underline"
			 	name="underlineimg"  
			 	CLASS="imagebutton actuateCSSSprite_dialog actuateIV_underline_disable"
			 	ENABLED_ON="imagebutton actuateCSSSprite_dialog actuateIV_underline_enable"
			 	ENABLED_OFF="imagebutton actuateCSSSprite_dialog actuateIV_underline_disable"
			 	style="cursor:pointer"/>			 				 				
		</SPAN>
		<SPAN>
			<INPUT TYPE="button" id="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FONT_DIALOG_EX_JS)%>_alignleft"
			 	name="alignleftimg" 
			 	CLASS="imagebutton actuateCSSSprite_dialog actuateIV_AlignLeft_disable"
			 	ENABLED_ON="imagebutton actuateCSSSprite_dialog actuateIV_AlignLeft_enable"
			 	ENABLED_OFF="imagebutton actuateCSSSprite_dialog actuateIV_AlignLeft_disable"
			 	style="cursor:pointer"/>
			<INPUT TYPE="button" id="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FONT_DIALOG_EX_JS)%>_aligncenter"
			 	name="aligncenterimg" 
			 	CLASS="imagebutton actuateCSSSprite_dialog actuateIV_AlignCenter_disable"
			 	ENABLED_ON="imagebutton actuateCSSSprite_dialog actuateIV_AlignCenter_enable"
			 	ENABLED_OFF="imagebutton actuateCSSSprite_dialog actuateIV_AlignCenter_disable"
			 	style="cursor:pointer"/>
			<INPUT TYPE="button" id="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FONT_DIALOG_EX_JS)%>_alignright"
			 	name="alignrightimg" 
			 	CLASS="imagebutton actuateCSSSprite_dialog actuateIV_AlignRight_disable"
			 	ENABLED_ON="imagebutton actuateCSSSprite_dialog actuateIV_AlignRight_enable"
			 	ENABLED_OFF="imagebutton actuateCSSSprite_dialog actuateIV_AlignRight_disable"
			 	style="cursor:pointer"/>			 				 	
		</SPAN>
	</DIV>
	<DIV id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FONT_DIALOG_EX_JS)%>_radioButtons' CLASS="itemSpacing">	
		<DIV style="clear:both"></DIV>
		<DIV style="float:left;margin-right:1ex;">
			<DIV>
				<DIV style="clear:both"></DIV>
				<DIV style="float:left;margin-right:1ex;">
					<SPAN id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FONT_DIALOG_EX_JS)%>_applyToTable'> 
						<%-- Radio Button --%> 
					</SPAN>
				</DIV>
				<DIV style="clear:both"></DIV>
			</DIV>
			<DIV>
				<DIV style="clear:both"></DIV>
				<DIV style="float:left;margin-right:1ex;">
					<SPAN id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FONT_DIALOG_EX_JS)%>_applyToColumn'>
						<%-- Radio Button --%> 
					</SPAN>
				</DIV>
				<DIV style="clear:both"></DIV>
			</DIV>
		</DIV>
		<DIV style="clear:both"></DIV>
	</DIV>
	<DIV id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FONT_DIALOG_EX_JS)%>_previewBox' class="fontPreviewBoxA" >
   		<DIV style="height: 35px; width: 100%; overflow: hidden" >
	   		<SPAN style="line-height: 35px;" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_FONT_DIALOG_EX_JS)%>_previewText'>
	   			<fmt:message key="conditionFormatDialog.text.noFormatRule" bundle="${dialogBundle}"/>
	   		</SPAN>
   		</DIV>
  	</DIV>		
</DIV>
