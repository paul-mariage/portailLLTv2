<!--  Copyright 1994-2005, Actuate Software Corp., All rights reserved.--> 

<%@ page contentType="text/html; charset=utf-8" %>
<%@ page session="false" buffer="none" %>
<%@ page import="com.actuate.iv.context.bean.IVPresentationBean" %>

<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="presentationBean" type="com.actuate.iv.context.bean.IVPresentationBean" scope="request" />

<DIV ID='actuate_iv_ui_app_contextmenu_ivDrillUpMenu' CLASS='contextMenu'>

	<!-- Main menu -->
	<DIV ID='<fmt:message key="drillupcontextmenu.submenu.main.htmlId" bundle="${controlIdBundle}"/>'
		ROOT='true'
		STYLE="display:none;position:absolute;z-index:310">
		<TABLE CLASS='ContextMenuDiv'>
			<TR>
				<TD CLASS='ContextMenuCell' NOWRAP>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillUpFromCategories" bundle="${controlIdBundle}"/>'
				 		eventName="DRILLUP_FROM_CATEGORIES" >
						<!--
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Switch_view' />
						-->
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillUpFromCategories" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				 	<DIV CLASS='ContextMenuItem'
						OPT='<fmt:message key="operation.drillUpFromSeries" bundle="${controlIdBundle}"/>'
				 		eventName="DRILLUP_FROM_SERIES" >
						<!--
						<INPUT TYPE="button" CLASS='ContextMenuItemIcon actuateCSSSprite_selection actuateIV_Switch_view' />
						-->
						<LABEL CLASS="ContextMenuLeafLabel"><fmt:message key="contextmenu.drillUpFromSeries" bundle="${controlBundle}"/></LABEL>
				 	</DIV>
				</TD>
			</TR>
		</TABLE>
		
		<!-- shade -->
		<DIV CLASS="contextMenu_shade" ID="<fmt:message key="drillupcontextmenu.submenu.main.htmlId" bundle="${ controlIdBundle }"/>_SHADOW_DIV">
			<IMG src='<jsp:getProperty name='presentationBean' property='baseUrl' />iv/images/bgimages/Container_shade_whole.png'
				STYLE='width:100%;'
				ID="<fmt:message key="drillupcontextmenu.submenu.main.htmlId" bundle="${ controlIdBundle }"/>_SHADOW"/>
		</DIV>
	</DIV>
</DIV>	