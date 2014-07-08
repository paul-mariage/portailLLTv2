<%--
	Instantiate the parameter handler and the cookie handler beans.

	@author 	Actuate Corporation
				Copyright (C) 2003 Actuate Corporation. All rights reserved.
	@version	1.0
--%>


<%@ include file="/iportal/activePortal/common/initCommonParam.jsp" %>
<%

String targetUrl = (String) session.getAttribute(IPortalConsts.OPTIONS_TARGET_URL);
if (targetUrl == null)
{
    targetUrl = "";
}
else
{
    session.removeAttribute(IPortalConsts.OPTIONS_TARGET_URL);  
}

String skinChanged = paramBean.getParameter("skinChanged");
boolean bSkinChanged = "true".equalsIgnoreCase(skinChanged)? true : false;

Boolean viewChanged = (Boolean) session.getAttribute(IPortalConsts.OPTIONS_VIEW_CHANGED);
boolean bViewChanged = false;
if (viewChanged != null)
{
    bViewChanged = viewChanged.booleanValue();
    session.removeAttribute(IPortalConsts.OPTIONS_VIEW_CHANGED);
}

Boolean showFilterChanged = (Boolean) session.getAttribute(IPortalConsts.OPTIONS_SHOWFILTER_CHANGED);
boolean bShowFilterChanged = false;
if ( showFilterChanged != null )
{
	bShowFilterChanged = showFilterChanged.booleanValue();
	session.removeAttribute( IPortalConsts.OPTIONS_SHOWFILTER_CHANGED );
}

Boolean resetDashboardDone = (Boolean) session.getAttribute(IPortalConsts.RESET_DASHBOARD_DONE);
boolean bResetDashboardDone = false;
if (resetDashboardDone != null)
{
    session.removeAttribute(IPortalConsts.RESET_DASHBOARD_DONE);
    bResetDashboardDone = resetDashboardDone.booleanValue();

}



%>