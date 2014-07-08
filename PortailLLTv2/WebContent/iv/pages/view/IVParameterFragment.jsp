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
<%@ page import="com.actuate.iv.presentation.aggregation.IFragment" %>

<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%-----------------------------------------------------------------------------
	Expected java beans
--%>
<jsp:useBean id="fragment" type="com.actuate.iv.presentation.aggregation.IFragment" scope="request" />
<jsp:useBean id="presentationBean" type="com.actuate.iv.context.bean.IVPresentationBean" scope="request" />

<%-----------------------------------------------------------------------------
	TOC fragment
--%>
<DIV ID="ParameterPanel" STYLE="display:none;" CLASS='parameter'>
	<DIV ID="actuate_iv_ui_view_ivParameter_parameterHeader" CLASS='paneHeader'>
		<LABEL ALIGN="left" CLASS="ivViewLabel"><fmt:message key="toolbar.parameter" bundle="${controlBundle}"/></LABEL>
		<SPAN CLASS="parameterToolbar">
		<DIV id="actuate_iv_ui_view_ivParameter_runBtn" CLASS="parameterToolbar_buttonStyleDisabled">
		<INPUT id="actuate_iv_ui_view_ivParameter_runBtnImage" type="button" CLASS="actuateCSSSprite_view actuateIV_parameterrun_disabled parameterRunBtn"
		       TITLE="<fmt:message key="parameter.button.run" bundle="${controlBundle}"/>" disabled="disabled"></INPUT>
		<span style="margin-left: 5px"><fmt:message key="parameter.button.run" bundle="${controlBundle}"/></span>
		</DIV>
		</SPAN>
		<INPUT id="actuate_iv_ui_view_ivParameter_closeBtn" type="button" CLASS="closeButton actuateCSSSprite_view actuateIV_tocclose"
		       TITLE="<fmt:message key="parameter.button.close" bundle="${controlBundle}"/>"></INPUT>
	</DIV>
	<DIV CLASS="parameterContent">
	</DIV>
</DIV>
