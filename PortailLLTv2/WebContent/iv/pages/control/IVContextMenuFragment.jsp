<!--  Copyright 1994-2005, Actuate Software Corp., All rights reserved.--> 

<%@ page contentType="text/html; charset=utf-8" %>
<%@ page session="false" buffer="none" %>
<%@ page import="com.actuate.iv.context.bean.IVPresentationBean" %>

<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="presentationBean" type="com.actuate.iv.context.bean.IVPresentationBean" scope="request" />

<DIV ID='actuate_iv_ui_app_contextmenu_ivContextMenu' CLASS='contextMenu'>

	<!-- Main menu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.main.htmlId" bundle="${controlIdBundle}"/>'
		ROOT='true'
		STYLE="display:none;position:absolute;z-index:310">
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>
				    <DIV CLASS='ContextMenuItem'
	 					SUBMENUID='<fmt:message key="contextmenu.submenu.header.htmlId" bundle="${controlIdBundle}"/>' >
	 					<LABEL CLASS="ContextMenuArrowLabel"><fmt:message key="contextmenu.header" bundle="${controlBundle}"/></LABEL>
						<INPUT TYPE="button" CLASS='ContextMenuArrow actuateCSSSprite_selection actuateIV_arrow__r' />
					</DIV>
					<DIV CLASS='ContextMenuItem'
	 					SUBMENUID='<fmt:message key="contextmenu.submenu.group.htmlId" bundle="${controlIdBundle}"/>' >
	 					<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Add_group' />	 					
	 					<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.group" bundle="${controlBundle}"/></LABEL>
						<INPUT TYPE="button" CLASS='ContextMenuArrow actuateCSSSprite_selection actuateIV_arrow__r' />
					</DIV>
					<DIV CLASS='ContextMenuItem'
	 					SUBMENUID='<fmt:message key="contextmenu.submenu.column.htmlId" bundle="${controlIdBundle}"/>' >
	 					<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Calculation' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.column" bundle="${controlBundle}"/></LABEL>
						<INPUT TYPE="button" CLASS='ContextMenuArrow actuateCSSSprite_selection actuateIV_arrow__r' />
					</DIV>
					
				 	<DIV CLASS="ContextMenuHorizontalRule"></DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillUpFromCategories10" bundle="${controlIdBundle}"/>'
				 		eventName="DRILLUP_FROM_CATEGORIES"
				 		eventParam="10" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillUpFromCategories" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillUpFromCategories9" bundle="${controlIdBundle}"/>'
				 		eventName="DRILLUP_FROM_CATEGORIES"
				 		eventParam="9" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillUpFromCategories" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillUpFromCategories8" bundle="${controlIdBundle}"/>'
				 		eventName="DRILLUP_FROM_CATEGORIES"
				 		eventParam="8" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillUpFromCategories" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillUpFromCategories7" bundle="${controlIdBundle}"/>'
				 		eventName="DRILLUP_FROM_CATEGORIES"
				 		eventParam="7" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillUpFromCategories" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillUpFromCategories6" bundle="${controlIdBundle}"/>'
				 		eventName="DRILLUP_FROM_CATEGORIES"
				 		eventParam="6" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillUpFromCategories" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillUpFromCategories5" bundle="${controlIdBundle}"/>'
				 		eventName="DRILLUP_FROM_CATEGORIES"
				 		eventParam="5" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillUpFromCategories" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillUpFromCategories4" bundle="${controlIdBundle}"/>'
				 		eventName="DRILLUP_FROM_CATEGORIES"
				 		eventParam="4" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillUpFromCategories" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillUpFromCategories3" bundle="${controlIdBundle}"/>'
				 		eventName="DRILLUP_FROM_CATEGORIES"
				 		eventParam="3" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillUpFromCategories" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillUpFromCategories2" bundle="${controlIdBundle}"/>'
				 		eventName="DRILLUP_FROM_CATEGORIES"
				 		eventParam="2" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillUpFromCategories" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillUpFromCategories" bundle="${controlIdBundle}"/>'
				 		eventName="DRILLUP_FROM_CATEGORIES"
				 		eventParam="1" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillUpFromCategories" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillDownFromCategories" bundle="${controlIdBundle}"/>'
				 		eventName="CHART_CATEGORIES"
				 		eventParam="1" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillDownFromCategories" bundle="${controlBundle}"/></LABEL>
				 	</DIV>

				 	<DIV CLASS="ContextMenuHorizontalRule"></DIV>
						
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillUpFromSeries10" bundle="${controlIdBundle}"/>'
				 		eventName="DRILLUP_FROM_SERIES"
				 		eventParam="10" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillUpFromSeries" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillUpFromSeries9" bundle="${controlIdBundle}"/>'
				 		eventName="DRILLUP_FROM_SERIES"
				 		eventParam="9" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillUpFromSeries" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillUpFromSeries8" bundle="${controlIdBundle}"/>'
				 		eventName="DRILLUP_FROM_SERIES"
				 		eventParam="8" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillUpFromSeries" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillUpFromSeries7" bundle="${controlIdBundle}"/>'
				 		eventName="DRILLUP_FROM_SERIES"
				 		eventParam="7" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillUpFromSeries" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillUpFromSeries6" bundle="${controlIdBundle}"/>'
				 		eventName="DRILLUP_FROM_SERIES"
				 		eventParam="6" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillUpFromSeries" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillUpFromSeries5" bundle="${controlIdBundle}"/>'
				 		eventName="DRILLUP_FROM_SERIES"
				 		eventParam="5" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillUpFromSeries" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillUpFromSeries4" bundle="${controlIdBundle}"/>'
				 		eventName="DRILLUP_FROM_SERIES"
				 		eventParam="4" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillUpFromSeries" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillUpFromSeries3" bundle="${controlIdBundle}"/>'
				 		eventName="DRILLUP_FROM_SERIES"
				 		eventParam="3" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillUpFromSeries" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillUpFromSeries2" bundle="${controlIdBundle}"/>'
				 		eventName="DRILLUP_FROM_SERIES"
				 		eventParam="2" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillUpFromSeries" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillUpFromSeries" bundle="${controlIdBundle}"/>'
				 		eventName="DRILLUP_FROM_SERIES"
				 		eventParam="1" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillUpFromSeries" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillDownFromSeries" bundle="${controlIdBundle}"/>'
				 		eventName="CHART_SERIES"
				 		eventParam="1" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillDownFromSeries" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	
				 	<DIV CLASS="ContextMenuHorizontalRule"></DIV>
						
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.aggregation" bundle="${ controlIdBundle }"/>'
				 		eventName="AGGREGATION" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Aggregate' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.aggregation" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
	 					SUBMENUID='<fmt:message key="contextmenu.submenu.filter.htmlId" bundle="${controlIdBundle}"/>' >
	 					<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_filter16' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.filter" bundle="${controlBundle}"/></LABEL>
						<INPUT TYPE="button" CLASS='ContextMenuArrow actuateCSSSprite_selection actuateIV_arrow__r' />
				 	</DIV>	

				 	<DIV CLASS="ContextMenuHorizontalRule"></DIV>

				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.chartSubType" bundle="${ controlIdBundle }"/>'
				 		eventName="QUERYTYPE" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />		
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.chartSubType" bundle="${controlBundle}"/></LABEL>
				 	</DIV>	
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.flashGadgetType" bundle="${ controlIdBundle }"/>'
				 		eventName="QUERYTYPE" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.flashGadgetType" bundle="${controlBundle}"/></LABEL>
				 	</DIV>	
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.flashGadgetFormat" bundle="${ controlIdBundle }"/>'
				 		eventName="FLASHGADGET_FORMAT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.flashGadgetFormat" bundle="${controlBundle}"/></LABEL>
				 	</DIV>	
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.chartProperty" bundle="${ controlIdBundle }"/>'
				 		eventName="CHART_FORMAT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.chartProperty" bundle="${controlBundle}"/></LABEL>
				 	</DIV>	
				 	
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.text" bundle="${ controlIdBundle }"/>'
				 		eventName="QUERY_TEXT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_overlayedit' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.text" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS="ContextMenuHorizontalRule"></DIV>
				 	
				 	<DIV CLASS='ContextMenuItem' 
				 		OPT='<fmt:message key="operation.showTooltip" bundle="${ controlIdBundle }"/>'
				 		eventName="SHOW_TOOLTIP" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.showTooltip" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	 	
					<DIV CLASS="ContextMenuHorizontalRule"></DIV>
					<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.grandTotal" bundle="${ controlIdBundle }"/>'
	 					SUBMENUID='<fmt:message key="contextmenu.submenu.grandTotal.htmlId" bundle="${controlIdBundle}"/>' >
						<LABEL CLASS="ContextMenuArrowLabel"><fmt:message key="contextmenu.grandTotal" bundle="${controlBundle}"/></LABEL>
						<INPUT TYPE="button" CLASS='ContextMenuArrow actuateCSSSprite_selection actuateIV_arrow__r' />
					</DIV>
					
					<DIV CLASS='ContextMenuItem'
	 					OPT='<fmt:message key="operation.subTotal" bundle="${ controlIdBundle }"/>'
	 					SUBMENUID='<fmt:message key="contextmenu.submenu.subTotal.htmlId" bundle="${controlIdBundle}"/>' >
						<LABEL CLASS="ContextMenuArrowLabel"><fmt:message key="contextmenu.subTotal" bundle="${controlBundle}"/></LABEL>
						<INPUT TYPE="button" CLASS='ContextMenuArrow actuateCSSSprite_selection actuateIV_arrow__r' />
					</DIV>
				 	 
				 	<DIV CLASS="ContextMenuHorizontalRule"></DIV>
					
					<DIV CLASS='ContextMenuItem'
	 					SUBMENUID='<fmt:message key="contextmenu.submenu.sort.htmlId" bundle="${controlIdBundle}"/>' >
	 					<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_SortMenu16' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.sort" bundle="${controlBundle}"/></LABEL>
						<INPUT TYPE="button" CLASS='ContextMenuArrow actuateCSSSprite_selection actuateIV_arrow__r' />
					</DIV>
				 	<DIV CLASS='ContextMenuItem'
	 					SUBMENUID='<fmt:message key="contextmenu.submenu.align.htmlId" bundle="${controlIdBundle}"/>' >
						<LABEL CLASS="ContextMenuArrowLabel"><fmt:message key="contextmenu.align" bundle="${controlBundle}"/></LABEL>
						<INPUT TYPE="button" CLASS='ContextMenuArrow actuateCSSSprite_selection actuateIV_arrow__r' />
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
	 					SUBMENUID='<fmt:message key="contextmenu.submenu.style.htmlId" bundle="${controlIdBundle}"/>' >
	 					<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Format_font' />	
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.style" bundle="${controlBundle}"/></LABEL>
						<INPUT TYPE="button" CLASS='ContextMenuArrow actuateCSSSprite_selection actuateIV_arrow__r' />
				 	</DIV>
				 	<DIV CLASS="ContextMenuHorizontalRule"></DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.dataAnalyzer" bundle="${controlIdBundle}"/>'
				 		eventName="DATA_ANALYZER" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_DataAnalyzer' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.dataAnalyzer" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.switchView" bundle="${controlIdBundle}"/>'
				 		eventName="SWITCH_VIEW" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.switchView" bundle="${controlBundle}"/></LABEL>
				 	</DIV>

				 	<DIV CLASS="ContextMenuHorizontalRule"></DIV>

				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.export" bundle="${ controlIdBundle }"/>'
				 		eventName="QUERY_EXPORT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.export" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.exportReport" bundle="${ controlIdBundle }"/>'
				 		eventName="EXPORTREPORT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.exportReport" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				</TD>
			</TR>
		</TABLE>
	</DIV>	
	
	
	<!-- Style sub menu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.style.htmlId" bundle="${controlIdBundle}"/>'
		PARENTID='<fmt:message key="contextmenu.submenu.main.htmlId" bundle="${controlIdBundle}"/>'
		STYLE="display:none;position:absolute;z-index:310">
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.changeFont" bundle="${ controlIdBundle }"/>'
				 		eventName="QUERY_FONT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.font" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.shareStyle" bundle="${ controlIdBundle }"/>'
				 		eventName="SHARE_STYLE" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.shareStyle" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.conditionalformat" bundle="${ controlIdBundle }"/>'
				 		eventName="CONDITIONALFORMATTING" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.conditionalformat" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.format" bundle="${ controlIdBundle }"/>'
				 		eventName="QUERY_FORMAT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Format_data' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.format" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 		<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.shareFormat" bundle="${ controlIdBundle }"/>'
				 		eventName="SHARE_FORMAT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.shareFormat" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				</TD>
			</TR>
		</TABLE>
	</DIV>	
	
	<!-- Grand Total sub menu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.grandTotal.htmlId" bundle="${controlIdBundle}"/>'
		PARENTID='<fmt:message key="contextmenu.submenu.main.htmlId" bundle="${controlIdBundle}"/>'
		STYLE="display:none;position:absolute;z-index:310">
	
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>						
					<DIV CLASS='ContextMenuItem'
	 					SUBMENUID='<fmt:message key="contextmenu.submenu.grandTotal.label.htmlId" bundle="${controlIdBundle}"/>' >
						<LABEL CLASS="ContextMenuArrowLabel"><fmt:message key="contextmenu.grandTotal.label" bundle="${controlBundle}"/></LABEL>
						<INPUT TYPE="button" CLASS='ContextMenuArrow actuateCSSSprite_selection actuateIV_arrow__r' />
					</DIV>
					
					<DIV CLASS='ContextMenuItem'
	 					SUBMENUID='<fmt:message key="contextmenu.submenu.grandTotal.data.htmlId" bundle="${controlIdBundle}"/>' >
						<LABEL CLASS="ContextMenuArrowLabel"><fmt:message key="contextmenu.grandTotal.data" bundle="${controlBundle}"/></LABEL>
						<INPUT TYPE="button" CLASS='ContextMenuArrow actuateCSSSprite_selection actuateIV_arrow__r' />
					</DIV>

				</TD>
			</TR>
		</TABLE>
	</DIV>	
	
	<!-- Grand Total Label sub menu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.grandTotal.label.htmlId" bundle="${controlIdBundle}"/>'
		PARENTID='<fmt:message key="contextmenu.submenu.grandTotal.htmlId" bundle="${controlIdBundle}"/>'
		STYLE="display:none;position:absolute;z-index:310">
	
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>						
					<DIV CLASS='ContextMenuItem'
	 					SUBMENUID='<fmt:message key="contextmenu.submenu.grandTotal.label.align.htmlId" bundle="${controlIdBundle}"/>' >
						<LABEL CLASS="ContextMenuArrowLabel"><fmt:message key="contextmenu.grandTotal.label.align" bundle="${controlBundle}"/></LABEL>
						<INPUT TYPE="button" CLASS='ContextMenuArrow actuateCSSSprite_selection actuateIV_arrow__r' />
					</DIV>
					
					<DIV CLASS='ContextMenuItem'
	 					SUBMENUID='<fmt:message key="contextmenu.submenu.grandTotal.label.format.htmlId" bundle="${controlIdBundle}"/>' >
	 					
						<LABEL CLASS="ContextMenuArrowLabel"><fmt:message key="contextmenu.grandTotal.label.style" bundle="${controlBundle}"/></LABEL>
						<INPUT TYPE="button" CLASS='ContextMenuArrow actuateCSSSprite_selection actuateIV_arrow__r' />
					</DIV>

				</TD>
			</TR>
		</TABLE>
	</DIV>	
	
		<!-- Grand Total data sub menu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.grandTotal.data.htmlId" bundle="${controlIdBundle}"/>'
		PARENTID='<fmt:message key="contextmenu.submenu.grandTotal.htmlId" bundle="${controlIdBundle}"/>'
		STYLE="display:none;position:absolute;z-index:310">
	
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>						
					<DIV CLASS='ContextMenuItem'
	 					SUBMENUID='<fmt:message key="contextmenu.submenu.grandTotal.data.align.htmlId" bundle="${controlIdBundle}"/>' >
						<LABEL CLASS="ContextMenuArrowLabel"><fmt:message key="contextmenu.grandTotal.label.align" bundle="${controlBundle}"/></LABEL>
						<INPUT TYPE="button" CLASS='ContextMenuArrow actuateCSSSprite_selection actuateIV_arrow__r' />
					</DIV>
				</TD>
			</TR>
		</TABLE>
	</DIV>	
	
	<!-- Grand Total Label alignment sub menu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.grandTotal.label.align.htmlId" bundle="${controlIdBundle}"/>'
		PARENTID='<fmt:message key="contextmenu.submenu.grandTotal.label.htmlId" bundle="${controlIdBundle}"/>'
		STYLE="display:none;position:absolute;z-index:310">
	
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.alignLeft" bundle="${ controlIdBundle }"/>'
				 		eventName="GRANDTOTAL_LABEL_ALIGN_LEFT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Align_left' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.align.left" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.alignCenter" bundle="${ controlIdBundle }"/>'
				 		eventName="GRANDTOTAL_LABEL_ALIGN_CENTER" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Align_center' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.align.center" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.alignRight" bundle="${ controlIdBundle }"/>'
				 		eventName="GRANDTOTAL_LABEL_ALIGN_RIGHT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Align_right' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.align.right" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				</TD>
			</TR>
		</TABLE>
	</DIV>

	<!-- Grand Total Label format sub menu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.grandTotal.label.format.htmlId" bundle="${controlIdBundle}"/>'
		PARENTID='<fmt:message key="contextmenu.submenu.grandTotal.label.htmlId" bundle="${controlIdBundle}"/>'
		STYLE="display:none;position:absolute;z-index:310">
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.changeFont" bundle="${ controlIdBundle }"/>'
				 		eventName="QUERY_GRANDTOTAL_LABEL_FONT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Format_font' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.font" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				</TD>
			</TR>
		</TABLE>
	</DIV>	
	
	<!-- Grand Total data alignment sub menu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.grandTotal.data.align.htmlId" bundle="${controlIdBundle}"/>'
		PARENTID='<fmt:message key="contextmenu.submenu.grandTotal.data.htmlId" bundle="${controlIdBundle}"/>'
		STYLE="display:none;position:absolute;z-index:310">
	
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.alignLeft" bundle="${ controlIdBundle }"/>'
				 		eventName="GRANDTOTAL_DATA_ALIGN_LEFT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Align_left' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.align.left" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.alignCenter" bundle="${ controlIdBundle }"/>'
				 		eventName="GRANDTOTAL_DATA_ALIGN_CENTER" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Align_center' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.align.center" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.alignRight" bundle="${ controlIdBundle }"/>'
				 		eventName="GRANDTOTAL_DATA_ALIGN_RIGHT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Align_right' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.align.right" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				</TD>
			</TR>
		</TABLE>
	</DIV>

	<!-- Grand Total data format sub menu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.grandTotal.data.format.htmlId" bundle="${controlIdBundle}"/>'
		PARENTID='<fmt:message key="contextmenu.submenu.grandTotal.data.htmlId" bundle="${controlIdBundle}"/>'
		STYLE="display:none;position:absolute;z-index:310">
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.changeFont" bundle="${ controlIdBundle }"/>'
				 		eventName="QUERY_GRANDTOTAL_DATA_FONT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Format_font' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.font" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>				 	
				 	
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.format" bundle="${ controlIdBundle }"/>'
				 		eventName="QUERY_GRANDTOTAL_DATA_FORMAT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Format_data' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.format" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				</TD>
			</TR>
		</TABLE>
	</DIV>	

	<!-- Sub Total sub menu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.subTotal.htmlId" bundle="${controlIdBundle}"/>'
		PARENTID='<fmt:message key="contextmenu.submenu.main.htmlId" bundle="${controlIdBundle}"/>'
		STYLE="display:none;position:absolute;z-index:310">
	
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>						
					<DIV CLASS='ContextMenuItem'
	 					SUBMENUID='<fmt:message key="contextmenu.submenu.subTotal.label.htmlId" bundle="${controlIdBundle}"/>' >
						<LABEL CLASS="ContextMenuArrowLabel"><fmt:message key="contextmenu.grandTotal.label" bundle="${controlBundle}"/></LABEL>
						<INPUT TYPE="button" CLASS='ContextMenuArrow actuateCSSSprite_selection actuateIV_arrow__r' />
					</DIV>
					
					<DIV CLASS='ContextMenuItem'
	 					SUBMENUID='<fmt:message key="contextmenu.submenu.subTotal.data.htmlId" bundle="${controlIdBundle}"/>' >
						<LABEL CLASS="ContextMenuArrowLabel"><fmt:message key="contextmenu.grandTotal.data" bundle="${controlBundle}"/></LABEL>
						<INPUT TYPE="button" CLASS='ContextMenuArrow actuateCSSSprite_selection actuateIV_arrow__r' />
					</DIV>

				</TD>
			</TR>
		</TABLE>
	</DIV>	
	
	<!-- sub Total Label sub menu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.subTotal.label.htmlId" bundle="${controlIdBundle}"/>'
		PARENTID='<fmt:message key="contextmenu.submenu.subTotal.htmlId" bundle="${controlIdBundle}"/>'
		STYLE="display:none;position:absolute;z-index:310">
	
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>						
					<DIV CLASS='ContextMenuItem'
	 					SUBMENUID='<fmt:message key="contextmenu.submenu.subTotal.label.align.htmlId" bundle="${controlIdBundle}"/>' >
						<LABEL CLASS="ContextMenuArrowLabel"><fmt:message key="contextmenu.grandTotal.label.align" bundle="${controlBundle}"/></LABEL>
						<INPUT TYPE="button" CLASS='ContextMenuArrow actuateCSSSprite_selection actuateIV_arrow__r' />
					</DIV>
					
					<DIV CLASS='ContextMenuItem'
	 					SUBMENUID='<fmt:message key="contextmenu.submenu.subTotal.label.format.htmlId" bundle="${controlIdBundle}"/>' >
						<LABEL CLASS="ContextMenuArrowLabel"><fmt:message key="contextmenu.grandTotal.label.style" bundle="${controlBundle}"/></LABEL>
						<INPUT TYPE="button" CLASS='ContextMenuArrow actuateCSSSprite_selection actuateIV_arrow__r' />
					</DIV>

				</TD>
			</TR>
		</TABLE>
	</DIV>	
	
		<!-- Sub Total data sub menu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.subTotal.data.htmlId" bundle="${controlIdBundle}"/>'
		PARENTID='<fmt:message key="contextmenu.submenu.subTotal.htmlId" bundle="${controlIdBundle}"/>'
		STYLE="display:none;position:absolute;z-index:310">
	
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>						
					<DIV CLASS='ContextMenuItem'
	 					SUBMENUID='<fmt:message key="contextmenu.submenu.subTotal.data.align.htmlId" bundle="${controlIdBundle}"/>' >
						<LABEL CLASS="ContextMenuArrowLabel"><fmt:message key="contextmenu.grandTotal.label.align" bundle="${controlBundle}"/></LABEL>
						<INPUT TYPE="button" CLASS='ContextMenuArrow actuateCSSSprite_selection actuateIV_arrow__r' />
					</DIV>
				</TD>
			</TR>
		</TABLE>
	</DIV>	
	
	<!-- Sub Total Label alignment sub menu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.subTotal.label.align.htmlId" bundle="${controlIdBundle}"/>'
		PARENTID='<fmt:message key="contextmenu.submenu.subTotal.label.htmlId" bundle="${controlIdBundle}"/>'
		STYLE="display:none;position:absolute;z-index:310">
	
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.alignLeft" bundle="${ controlIdBundle }"/>'
				 		eventName="SUBTOTAL_LABEL_ALIGN_LEFT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Align_left' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.align.left" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.alignCenter" bundle="${ controlIdBundle }"/>'
				 		eventName="SUBTOTAL_LABEL_ALIGN_CENTER" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Align_center' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.align.center" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.alignRight" bundle="${ controlIdBundle }"/>'
				 		eventName="SUBTOTAL_LABEL_ALIGN_RIGHT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Align_right' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.align.right" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				</TD>
			</TR>
		</TABLE>
	</DIV>

	<!-- Sub Total Label format sub menu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.subTotal.label.format.htmlId" bundle="${controlIdBundle}"/>'
		PARENTID='<fmt:message key="contextmenu.submenu.subTotal.label.htmlId" bundle="${controlIdBundle}"/>'
		STYLE="display:none;position:absolute;z-index:310">
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.changeFont" bundle="${ controlIdBundle }"/>'
				 		eventName="QUERY_SUBTOTAL_LABEL_FONT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Format_font' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.font" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				</TD>
			</TR>
		</TABLE>
	</DIV>	
	
	<!-- Sub Total data alignment sub menu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.subTotal.data.align.htmlId" bundle="${controlIdBundle}"/>'
		PARENTID='<fmt:message key="contextmenu.submenu.subTotal.data.htmlId" bundle="${controlIdBundle}"/>'
		STYLE="display:none;position:absolute;z-index:310">
	
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.alignLeft" bundle="${ controlIdBundle }"/>'
				 		eventName="SUBTOTAL_DATA_ALIGN_LEFT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Align_left' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.align.left" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.alignCenter" bundle="${ controlIdBundle }"/>'
				 		eventName="SUBTOTAL_DATA_ALIGN_CENTER" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Align_center' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.align.center" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.alignRight" bundle="${ controlIdBundle }"/>'
				 		eventName="SUBTOTAL_DATA_ALIGN_RIGHT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Align_right' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.align.right" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				</TD>
			</TR>
		</TABLE>
	</DIV>

	<!-- Sub Total data format sub menu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.subTotal.data.format.htmlId" bundle="${controlIdBundle}"/>'
		PARENTID='<fmt:message key="contextmenu.submenu.subTotal.data.htmlId" bundle="${controlIdBundle}"/>'
		STYLE="display:none;position:absolute;z-index:310">
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.changeFont" bundle="${ controlIdBundle }"/>'
				 		eventName="QUERY_SUBTOTAL_DATA_FONT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Format_font' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.font" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.format" bundle="${ controlIdBundle }"/>'
				 		eventName="QUERY_SUBTOTAL_DATA_FORMAT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Format_data' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.format" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				</TD>
			</TR>
		</TABLE>				
	</DIV>	
	
	<!-- Alignment sub menu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.align.htmlId" bundle="${controlIdBundle}"/>'
		PARENTID='<fmt:message key="contextmenu.submenu.main.htmlId" bundle="${controlIdBundle}"/>'
		STYLE="display:none;position:absolute;z-index:310">
	
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.alignLeft" bundle="${ controlIdBundle }"/>'
				 		eventName="ALIGN_LEFT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Align_left' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.align.left" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.alignCenter" bundle="${ controlIdBundle }"/>'
				 		eventName="ALIGN_CENTER" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Align_center' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.align.center" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.alignRight" bundle="${ controlIdBundle }"/>'
				 		eventName="ALIGN_RIGHT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Align_right' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.align.right" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				</TD>
			</TR>
		</TABLE>
	</DIV>	
	
	<!-- LabelMenu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.header.htmlId" bundle="${controlIdBundle}"/>'
		PARENTID='<fmt:message key="contextmenu.submenu.main.htmlId" bundle="${controlIdBundle}"/>'
		STYLE="display:none;position:absolute;z-index:310">
	
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>
				    <DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.headerText" bundle="${ controlIdBundle }"/>'
				 		eventName="QUERY_TEXT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_overlayedit' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.text" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
	 					SUBMENUID='<fmt:message key="contextmenu.submenu.headeralign.htmlId" bundle="${controlIdBundle}"/>' >
						<LABEL CLASS="ContextMenuArrowLabel"><fmt:message key="contextmenu.align" bundle="${controlBundle}"/></LABEL>
						<INPUT TYPE="button" CLASS='ContextMenuArrow actuateCSSSprite_selection actuateIV_arrow__r' />
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.changeHeaderFont" bundle="${ controlIdBundle }"/>'
				 		eventName="QUERY_HEADER_FONT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Format_font' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.font" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				</TD>
			</TR>
		</TABLE>
	</DIV>	
	
	<!-- Label Alignment Menu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.headeralign.htmlId" bundle="${controlIdBundle}"/>'
		PARENTID='<fmt:message key="contextmenu.submenu.header.htmlId" bundle="${controlIdBundle}"/>'
		STYLE="display:none;position:absolute;z-index:310">
	
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.headerAlignLeft" bundle="${ controlIdBundle }"/>'
				 		eventName="HEADER_ALIGN_LEFT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Align_left' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.align.left" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.headerAlignCenter" bundle="${ controlIdBundle }"/>'
				 		eventName="HEADER_ALIGN_CENTER" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Align_center' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.align.center" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.headerAlignRight" bundle="${ controlIdBundle }"/>'
				 		eventName="HEADER_ALIGN_RIGHT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Align_right' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.align.right" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				</TD>
			</TR>
		</TABLE>
	</DIV>	


	<!-- Filter sub menu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.filter.htmlId" bundle="${controlIdBundle}"/>'
		PARENTID='<fmt:message key="contextmenu.submenu.main.htmlId" bundle="${controlIdBundle}"/>'
	 	STYLE="display:none;position:absolute;z-index:310">
	
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.filter" bundle="${ controlIdBundle }"/>'
				 		eventName="Filter" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.filter" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>

				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.topbottomn" bundle="${ controlIdBundle }"/>'
				 		eventName="TOPBOTTOMN" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.topbottomn" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				</TD>
			</TR>
		</TABLE>
	</DIV>
	
	
	<!-- Group sub menu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.group.htmlId" bundle="${controlIdBundle}"/>'
		PARENTID='<fmt:message key="contextmenu.submenu.main.htmlId" bundle="${controlIdBundle}"/>'
	 	STYLE="display:none;position:absolute;z-index:310">
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>
					<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.addGroup" bundle="${ controlIdBundle }"/>'
						eventName="QUERY_GROUP_DETAIL" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.addgroup" bundle="${controlBundle}"/></LABEL>
						
					</DIV>
					<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.deleteGroup" bundle="${ controlIdBundle }"/>'
						eventName="DELETE_GROUP" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.deletegroup" bundle="${controlBundle}"/></LABEL>
						
					</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.pageBreak" bundle="${ controlIdBundle }"/>'
				 		eventName="QUERY_PAGE_BREAK" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.pagebreak" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.hideDetail" bundle="${ controlIdBundle }"/>'
				 		eventName="HIDEDETAIL" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.hideDetail" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.showDetail" bundle="${ controlIdBundle }"/>'
				 		eventName="SHOWDETAIL" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.showDetail" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				</TD>
			</TR>
		</TABLE>
	</DIV>
	
	
	<!-- Sort sub menu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.sort.htmlId" bundle="${controlIdBundle}"/>'
		PARENTID='<fmt:message key="contextmenu.submenu.main.htmlId" bundle="${controlIdBundle}"/>'
	 	STYLE="display:none;position:absolute;z-index:310">
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>
					<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.sortAsc" bundle="${ controlIdBundle }"/>'
						eventName="SORTASC" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Sort_ascending' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.sortasc" bundle="${controlBundle}"/></LABEL>
						
					</DIV>
					<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.sortDsc" bundle="${ controlIdBundle }"/>'
						eventName="SORTDESC" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Sort_descending' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.sortdesc" bundle="${controlBundle}"/></LABEL>
						
					</DIV>
										
				 	<DIV CLASS="ContextMenuHorizontalRule"></DIV>
					
					<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.advancedSort" bundle="${ controlIdBundle }"/>'
						eventName="SORTADVANCED" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.sortadvanced" bundle="${controlBundle}"/></LABEL>
						
					</DIV>
				</TD>
			</TR>
		</TABLE>
	</DIV>
	
	
	<!-- Column sub menu -->
	<DIV ID='<fmt:message key="contextmenu.submenu.column.htmlId" bundle="${controlIdBundle}"/>'
		PARENTID='<fmt:message key="contextmenu.submenu.main.htmlId" bundle="${controlIdBundle}"/>'
	 	STYLE="display:none;position:absolute;z-index:310">
		<TABLE CLASS='ContextMenuDiv' cellspacing="0" cellpadding="0">
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>
					<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.hideColumn" bundle="${ controlIdBundle }"/>'
						eventName="HIDE_COLUMN" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.hidecolumn" bundle="${controlBundle}"/></LABEL>
						
					</DIV>
					<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.showColumns" bundle="${ controlIdBundle }"/>'
						eventName="QUERY_HIDDEN_COLUMN" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.showcolumn" bundle="${controlBundle}"/></LABEL>
						
					</DIV>
					<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.deleteColumn" bundle="${ controlIdBundle }"/>'
						eventName="DELETE_COLUMN" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Delete' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.deletecolumn" bundle="${controlBundle}"/></LABEL>
						
					</DIV>
					<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.calculation" bundle="${ controlIdBundle }"/>'
				 		eventName="CALCULATION" >						
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.addCalculation" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.editCalculation" bundle="${ controlIdBundle }"/>'
				 		eventName="EDIT_CALCULATION" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.editCalculation" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
					
				 	
				 	<DIV CLASS="ContextMenuHorizontalRule"></DIV>
				 	
				 	
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.moveToLeft" bundle="${controlIdBundle}"/>'
				 		eventName="MOVE_TO_LEFT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.movetoleft" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.moveToRight" bundle="${controlIdBundle}"/>'
				 		eventName="MOVE_TO_RIGHT" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.movetoright" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.reorderColumns" bundle="${ controlIdBundle }"/>'
				 		eventName="QUERY_MANAGETABLECOLUMN" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.managecolumn" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				 	
				 	
				 	<DIV CLASS="ContextMenuHorizontalRule"></DIV>						
				 	
				 	
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.suppressDuplicates" bundle="${controlIdBundle}"/>'
				 		eventName="REPEAT_VALUE" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.notSuppressDuplicates" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.notSuppressDuplicates" bundle="${controlIdBundle}"/>'
				 		eventName="NO_REPEAT_VALUE" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.suppressDuplicates" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.moveToGroup" bundle="${controlIdBundle}"/>'
				 		eventName="QUERY_GROUP" >
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon' />
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.movetogroup" bundle="${controlBundle}"/></LABEL>
						
				 	</DIV>
				</TD>
			</TR>
		</TABLE>
	</DIV>
	
</DIV>	