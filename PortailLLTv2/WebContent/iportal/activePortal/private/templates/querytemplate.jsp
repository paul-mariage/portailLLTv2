<%-- --------------------------------------------------------------------------
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.
		
	Description:	
		This is the master template page that loads the skinned template
		page.
-------------------------------------------------------------------------- --%>
<%@ page contentType="text/html; charset=utf-8" %>



<%
	com.actuate.reportcast.utils.AcRequestHandlerBean
		requestHandlerBean = new 
		com.actuate.reportcast.utils.AcRequestHandlerBean();
	requestHandlerBean.setRequest(request);
	com.actuate.activeportal.beans.UserInfoBean
		userinfobean = requestHandlerBean.getUserInfoBeanFromSession();

	String templatePage = "/templates/querytemplate.jsp";
	String skinTemplatePage = userinfobean.getSkinConfig().
		getURIPath(templatePage);
	pageContext.include(skinTemplatePage);
%>
