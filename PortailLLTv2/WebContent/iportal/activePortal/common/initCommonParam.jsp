<%--
	Instantiate the parameter handler and the cookie handler beans.

	@author 	Actuate Corporation
				Copyright (C) 2003 Actuate Corporation. All rights reserved.
	@version	1.0
--%>

<%@ page import="java.util.*,
				com.actuate.iportal.common.IPortalConsts,
				com.actuate.common.util.AcLocale,
				com.actuate.reportcast.utils.StaticFuncs,
				com.actuate.iportal.IPortalInfoBean,
				com.actuate.iportal.VolumeProfileBean,
				com.actuate.reportcast.common.AcConstants" 
%>
<%-- --------------------------------------------------------------------------
	Expected JavaBeans:
	Java beans that can be used for processing, gathering parameters from http servlet request
-------------------------------------------------------------------------- --%>
<jsp:useBean id="paramBean" scope="request" class="com.actuate.reportcast.utils.AcRequestHandlerBean" />
<jsp:setProperty name="paramBean" property="request" value="<%= request %>" />

<jsp:useBean
	id="userinfobean"
	class="com.actuate.activeportal.beans.UserInfoBean"
	scope="request"/>	
<%

boolean useDefaultServerUrl = userinfobean.isDefaultServerUrl();
boolean useDefaultVolume = userinfobean.isDefaultVolume();
boolean useDefaultRepositoryType = userinfobean.isDefaultRepositoryType();
String userid = userinfobean.getUserid();
String iportalId = userinfobean.getIportalid();

String vpsessionid = null;
String volumeProfile = userinfobean.getVolumeProfile();
String volumeName = paramBean.getParameter(IPortalConsts.HTTP_REQ_PARAM_VOLUME);
if ( volumeProfile == null )
{
	volumeProfile = paramBean.getParameter(IPortalConsts.VOLUME_PROFILE);
}

if ( volumeProfile != null )
{
	IPortalInfoBean portalInfoBean = (IPortalInfoBean) session.getAttribute( IPortalConsts.PORTALINFOBEAN_KEY );
	if ( portalInfoBean != null )
	{
	    String beanVolume = volumeName != null && volumeName.length() > 0? volumeName : userinfobean.getVolume();
		VolumeProfileBean vp = portalInfoBean.getVolumeProfileBean(volumeProfile, beanVolume, iportalId);
		if ( vp != null )
		{
			vpsessionid = vp.getVolumeProfileSessionID();
		}
	}
}

//javaLocale does not include variant so construct it and do not use locale.toString()
AcLocale acLocale = paramBean.getAcLocale();
String javaLocale = paramBean.getJavaLocaleId();
if ( javaLocale != null )
{
	javaLocale  = StaticFuncs.encodeEx(javaLocale, '%', "_".toCharArray());
}

String fromDashboard = paramBean.getParameter(AcConstants.FROM_DASHBOARD);
fromDashboard = fromDashboard == null? "" : fromDashboard;
fromDashboard = fromDashboard.trim().length() == 0 ? "" : Boolean.valueOf(fromDashboard).toString();

String showBanner = paramBean.getParameter(AcConstants.SHOW_BANNER);
showBanner = showBanner == null? "": showBanner;
showBanner = showBanner.trim().length() == 0? "" : Boolean.valueOf(showBanner).toString();

String showSideBar = paramBean.getParameter(AcConstants.SHOW_SIDEBAR);
showSideBar = showSideBar == null? "": showSideBar;
showSideBar = showSideBar.trim().length() == 0? "" : Boolean.valueOf(showSideBar).toString();

String showBreadCrumb = paramBean.getParameter(AcConstants.SHOW_BREADCRUMB);
showBreadCrumb = showBreadCrumb == null? "": showBreadCrumb;
showBreadCrumb = showBreadCrumb.trim().length() == 0? "" : Boolean.valueOf(showBreadCrumb).toString();

StringBuffer commonConfigParam = com.actuate.iportal.utils.Utility.getCommonConfigureParam(userinfobean);

String commonQueryString = com.actuate.iportal.utils.Utility.getQueryString( commonConfigParam, showBanner, fromDashboard, showSideBar,
        showBreadCrumb ).toString();
commonQueryString += "&locale=" + javaLocale;

String redirect = paramBean.getParameter(AcConstants.COMMON_PARA_TIMEOUT_REDIRECT);

if (redirect != null) {
	commonQueryString += "&__tredirect=" + redirect;
}
String helpLocaleDocBase = com.actuate.web.extension.helper.webxml.HelpDocBaseUtil.getHelpLocaleDocBase( userinfobean.getLocale(), request ); 
String helpDocBase = helpLocaleDocBase;
String gettingStartedLink = "http://developer.actuate.com/community";
String learnMoreLink = "http://developer.actuate.com/community";
%>
