<%-- --------------------------------------------------------------------------
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.
-------------------------------------------------------------------------- --%>
<%@ page contentType="text/html; charset=utf-8" %>

<%-- TAG LIBRARIES ------------------------------------------------------- --%>
<%@ taglib uri="/struts-logic" prefix="logic" %>
<%@ taglib uri="/struts-bean" prefix="bean" %>
<%@ taglib uri="/struts-html" prefix="html" %>

<%@ include file="/iportal/activePortal/common/initparambeanrequest.jsp" %>
<%@page import="com.actuate.iportal.common.IPortalConsts,
				com.actuate.reportcast.utils.StaticFuncs,
				com.actuate.reportcast.common.AcConstants"%>

<%-- currentFormName is being passed from the caller such as
	private\filesfolders\filefolderlistcontent.jsp
	private\channels\channelnoticelistcontent.jsp
	private\channels\channelsubscribecontent.jsp
	private\jobs\selectjobscontent.jsp
	
	This should be the form name used to submit.
--%>

<%
	String subpage = paramBean.getParameter("subpage");
	String doframe= paramBean.getParameter("doframe");
	if( doframe == null )
		doframe = "false";
	
	String fromDashboard = paramBean.getParameter(AcConstants.FROM_DASHBOARD);
	String showBanner = paramBean.getParameter(AcConstants.SHOW_BANNER);
	String vp = paramBean.getParameter(IPortalConsts.VOLUME_PROFILE);
	
	String contextPath = request.getContextPath();
	String currentFormSrc = paramBean.getParameter("currentFormSrc");
	String filterAction = contextPath+"/" +  currentFormSrc + ".do?__vp="+ StaticFuncs.jsEncode( vp ) 
									+ "&doframe=" + StaticFuncs.jsEncode( doframe )
									+ "&fromDashboard=" + StaticFuncs.jsEncode( fromDashboard )
									+ "&showBanner=" + StaticFuncs.jsEncode( showBanner );
%>

<INPUT type="hidden" name="showFilters" value="<bean:write name="userinfobean" property="showFilters" />" />

<SCRIPT>
	function toggleFilter()
	{
		var formName = '<%= paramBean.getParameter("currentFormName")%>';
		var theform = document.forms[formName];
		theform.showFilters.value = !<bean:write name="userinfobean" property="showFilters" />;
		theform.action='<%= filterAction %>';
		theform.submit();
	}
</SCRIPT>

<TABLE id="filterToolbar" width="100%" cellspacing="0" cellpadding="2" style="font-size:14px">
	<TR>
		<TD class="toolbartext" nowrap="nowrap">
			<bean:message bundle="iportalResources" key="LBL_FILTER" /> 
		</TD>
		
		<TD nowrap="nowrap">
			<logic:equal name="userinfobean" property="showFilters" value="true">
				<A class="toolbarboldtext">
			</logic:equal>
			<logic:equal name="userinfobean" property="showFilters" value="false">
				<A href="javascript: toggleFilter();"
					class="toolbarlink">
			</logic:equal>
					<bean:message bundle="iportalResources" key="toolbar.label.filter.on" />
				</A>
		</TD>
		<TD class="toolbartext">
				|
		</TD>
		<TD nowrap="nowrap">
			<logic:equal name="userinfobean" property="showFilters" value="false">
				<A class="toolbarboldtext">
			</logic:equal>
			<logic:equal name="userinfobean" property="showFilters" value="true">
				<A href="javascript: toggleFilter();"
					class="toolbarlink">
			</logic:equal>
					<bean:message bundle="iportalResources" key="toolbar.label.filter.off" />
				</A>
		</TD>

		<TD width="100%">&nbsp</TD>
		<logic:equal name="userinfobean" property="userAgent.NS4" value="false">
			<logic:present parameter="showviews">
			<logic:equal parameter="showviews" value="true">
				<TD class="toolbartext" align="right" nowrap="nowrap">
					<bean:message bundle="iportalResources" key="options.label.view" />
				</TD>		
				<TD align="right">
						<html:select name="userinfobean" property="view" onchange="submitForm();" 
							styleClass="toolbartext" style="color: #003063">
							<html:option value="Categories" key="options.label.views.categories" />
							<html:option value="Details" key="options.label.views.details" />
							<html:option value="Icons" key="options.label.views.icons" />
							<html:option value="List" key="options.label.views.list" />
						</html:select>
				</TD>
			</logic:equal>
			</logic:present>
		</logic:equal>
	</TR>
</TABLE>
