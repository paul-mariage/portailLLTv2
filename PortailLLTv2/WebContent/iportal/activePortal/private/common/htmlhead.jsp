<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="com.actuate.reportcast.common.AcConstants" %>

<%@ taglib uri="/struts-bean" prefix="bean" %>
<%@ taglib uri="/struts-logic" prefix="logic" %>
<%@ taglib uri="/struts-html" prefix="html" %>
<%@ taglib uri="/struts-tiles" prefix="template" %>
<%@ taglib uri="/actabpanel" prefix="ap" %>
<%@ include file="/iportal/activePortal/common/initCommonParam.jsp" %>

<TITLE>
	<template:get name="title" flush="true"/>	
</TITLE>

<META http-equiv="Content-Type" content="text/html; charset=unicode">

<META http-equiv="Cache-Control" content="no-cache">
<META http-equiv="Pragma" content="no-cache">
<META http-equiv="Expires" content="-1">

<logic:equal name="userinfobean" property="userAgent.NS4" value="false">
	<LINK href="<html:rewrite page="/common/jslib/themes/default/yggdrasil.css"/>" type="text/css" rel="stylesheet" >
	<LINK href="<html:rewrite page="/common/jslib/themes/default/ihub.css"/>" type="text/css" rel="stylesheet" >
	<LINK href="<html:rewrite page="/common/jslib/themes/default/actuate-component-icon-font.css"/>" type="text/css" rel="stylesheet" >
	<LINK href="<html:rewrite page="/css/allstyles.css"/>" type="text/css" rel="stylesheet" >
	<LINK href="<ap:skinResource resource="/css/skinstyles.css" />" type="text/css" rel="stylesheet" >
	<STYLE>
		<%= userinfobean.getSkinConfig().getCssCodeWithContextPath( request.getContextPath() ) %>
	</STYLE>
</logic:equal>
<logic:equal name="userinfobean" property="userAgent.NS4" value="true">
	<LINK href="<html:rewrite page="/css/allstylesns4.css"/>" type="text/css" rel="stylesheet">
</logic:equal>

<script type="text/javascript" src="<html:rewrite page="/jsapi"/>"></script>
<SCRIPT language="javascript" src="<html:rewrite page="/js/allscripts.js"/>"></SCRIPT>
<SCRIPT language="javascript" src="<html:rewrite page="/js/browsertype.js"/>"></SCRIPT>
<SCRIPT language="javascript" src="<html:rewrite page="/js/query.js"/>"></SCRIPT>
<SCRIPT language="javascript" src="<html:rewrite page="/js/strutscommon.js"/>"></SCRIPT>
<SCRIPT language="javascript" src="<html:rewrite page="/js/encoder.js"/>"></SCRIPT>
<SCRIPT language="javascript" src="<html:rewrite page="/js/cookie.js"/>"></SCRIPT>

<SCRIPT>
	// init strutscommon.js variables
	g_cancelJobURL = '<html:rewrite forward="canceljob" />';
	g_requesterCancelJobURL = '<html:rewrite forward="requestercanceljob" />';
	g_deleteFileURL = '<html:rewrite forward="deletefile" />';
	g_deleteJobNoticeURL = '<html:rewrite forward="deletejobnotice" />';
	g_deleteJobURL = '<html:rewrite forward="deletejob" />';
	g_deleteJobScheduleURL = '<html:rewrite forward="deletejobschedule" />';
	g_requesterDeleteJobURL = '<html:rewrite forward="requesterdeletejob" />';
	g_requesterDeleteJobScheduleURL = '<html:rewrite forward="requesterdeletejobschedule" />';	
	g_downloadFileURL = '<html:rewrite forward="downloadfile" />';
	g_executeDocumentURL = '<html:rewrite forward="executedocument" />';
	g_executeReportURL = '<html:rewrite forward="executereport" />';
	g_getJobDetailsURL = '<html:rewrite forward="getjobdetails" />';
	g_getFileDetailsURL = '<html:rewrite page="/getfiledetails.do" />';
	g_getRequesterJobDetailsURL = '<html:rewrite forward="getrequesterjobdetails" />';
	g_viewFramesetURL = '<html:rewrite forward="viewframeset" />';
	g_viewrptdocumentURL = '<html:rewrite forward="iv" />';
	g_viewrptTemplateURL = '<html:rewrite forward="wr" />';
	g_viewdataURL = '<html:rewrite forward="da" />';
	g_viewsoiURL = '<html:rewrite forward="viewsoi" />';
	g_viewPageURL = '<html:rewrite forward="viewpage" />';
	g_cubeViewingURL = '<html:rewrite forward="viewcube" />';
	g_createQueryURL = '<html:rewrite forward="createquery" />';
	g_submitQueryURL = '<html:rewrite forward="submitquery" />';
	g_executeQueryURL = '<html:rewrite forward="executequery" />';
	g_getSavedSearchURL = '<html:rewrite forward="getsavedsearch" />';
	g_viewReportURL = '<html:rewrite page="/viewer/viewreport.jsp" />';
	g_openDashboardURL = '<html:rewrite forward="dashboard" />';
	
	// init cookie.js variables
	g_cookieWritingEnabled = <%= com.actuate.reportcast.utils.CookieHandlerBean.isCookieWritingEnabled() %>;
	g_cookieSecure = <%= com.actuate.reportcast.utils.CookieHandlerBean.isCookieSecure() %>;
		
	function gotoFolder(parentFolder,folderName)
	{
		document.getFolderItemsForm.folder.value = parentFolder+folderName;
		document.getFolderItemsForm.submit();
	}
	
</SCRIPT>
