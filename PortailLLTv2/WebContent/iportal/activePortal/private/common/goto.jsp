
<%--
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.
	This is a global redirect entry point. It is exptected that the TargetURL has been set in the request scope. 

	PARAMETERS :
	targeturl: the target URL to redirect to.

--%>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="java.util.*,
   		com.actuate.reportcast.utils.*,
   		com.actuate.reportcast.common.AcConstants,
		com.actuate.reportcast.utils.beans.message.MessageItem,
   		com.actuate.activeportal.utils.ApplicationConfig,
   		com.actuate.iportal.common.IPortalConsts" 
%>

<jsp:useBean id="paramBean" scope="request" class="com.actuate.reportcast.utils.AcRequestHandlerBean" />
<jsp:setProperty name="paramBean" property="request" value="<%= request %>" />
<jsp:useBean
	id="userInfoBean"
	class="com.actuate.activeportal.beans.UserInfoBean"
	scope="request"/>
<%@ taglib uri="/struts-bean" prefix="bean" %>

<% 
	String targeturl = (String) request.getAttribute(AcConstants.SESSION_ATTRIB_TARGETURL);
	String isforward = (String) request.getAttribute(IPortalConsts.HTTP_REQ_PARAM_IS_FORWARD);
	String launchnewbrowser = "false";
	String fromPage = (String) request.getAttribute("__from");
	if( fromPage == null )
	{
		fromPage = (String) request.getParameter("__from");
	}
%>
<script>
function openNewDefaultWindow(url, windowName)
{
	var retCode = true;
	
	var window_handle = window.open( url, windowName);
	if (window_handle==null || (typeof(window_handle)=="undefined") 
		|| (typeof(window_handle.location.hash)!="string")) 
	{
		retCode = false;
	}
	else 
	{
		window_handle.focus();
	}
	return retCode;
}
</script>

<%
	// Handle null condition TED 52387
	targeturl = targeturl == null? "" : targeturl;
	MessageItem errorObj = null;
	if (targeturl.length() > 0)
	{
		String resources = "com.actuate.activeportal.resources.ActivePortalResources";
		String errorMsgKey = "ERR_MSG_LINK_DESTINATION_ERROR";
		String errorKey = "ERROR_LINK_DESTINATION";
		errorObj = StaticFuncs.validateUrlDomain( request, userInfoBean.getLocale(), targeturl, resources, errorKey, errorMsgKey );
		if (errorObj != null)
		{
		    //to simplify the processing just forward error page and show error on page.
			request.setAttribute("__ERROR__MESSAGE", errorObj);	
            request.setAttribute(AcConstants.SHOWERRORONPAGE, "true");
			targeturl="/iportal/activePortal/private/common/errors/errorpage.jsp";
			isforward = "true";
		}

	}
	if ( "true".equalsIgnoreCase(isforward))
	{
	%>
		<jsp:forward page="<%=targeturl%>" />
	<%
	}
	else	
	{
		launchnewbrowser = (String) paramBean.getParameter(IPortalConsts.HTTP_REQ_PARAM_NEW_WINDOW);
		String closeWindow = (String) request.getAttribute("__closeWindow");	

        boolean viewXlsInRequester = StaticFuncs.getViewXlsInRequester();

		if ( viewXlsInRequester )
		{
			String targetFile = targeturl;
			int index =  targetFile.indexOf("?");
			if (index != -1)
			{
		    	targetFile = targeturl.substring(0, index);
			}
			String targetUrlFileType = StaticFuncs.getFileExtension(targetFile);
			if ("xls".equalsIgnoreCase(targetUrlFileType))
			{		    
			    launchnewbrowser = "false";
			}
		}
		else
		{
			if ( launchnewbrowser == null )
			{
				launchnewbrowser = (String) request.getAttribute(IPortalConsts.HTTP_REQ_PARAM_NEW_WINDOW);
			}
		}
		// If the request is coming from the portlet level, do not launch a 
		// new browser since the content will be shown in the portlet's view mode.
		String isPortlet = (String) paramBean.getParameter(IPortalConsts.HTTP_REQ_PARAM_IS_PORTLET);
		if ( isPortlet != null && isPortlet.equalsIgnoreCase("true") )
		{
			launchnewbrowser = "false";
		}
		
		if ( "true".equalsIgnoreCase(launchnewbrowser) )
		{
			if (!"requestPage".equalsIgnoreCase(fromPage))
			{
				closeWindow = "false";
			}
		%>
		<script>
			url = "<%= targeturl %>";
			var windowName = "__view" + (new Date()).getUTCMilliseconds();
			var success = openNewDefaultWindow( url, windowName);
			<%
			if ("true".equalsIgnoreCase(closeWindow))
			{ %>
				if (success == true)
				{
					parent.window.close();
				}
				else
				{
					alert("<bean:message bundle="iportalResources" key="MSG_POPUP_BLOCKER_DETECTED_CLOSE"/>");
				}
		<%	} 
			else 
			{ 
			%>
				if (success == true)
				{
					top.history.back();
				}
				else
				{
					alert("<bean:message bundle="iportalResources" key="MSG_POPUP_BLOCKER_DETECTED_GO_BACK"/>");
				}
		<%	
		} 
		%>
		</script>
		<%
		} 
		else 
		{
		    //use context parameter ENABLE_CLIENT_SIDE_REDIRECT defined in web.xml to decide
		    //whether we use client redirect or server side redirect.
	        if(ApplicationConfig.getEnableClientSideRedirect().booleanValue())
	        {
		%>
			<%-- 
				TED50603.  eclipse embedded IE browser disables javascript tag if user clicks drill through link.
				Because of that, we removed javascript tag and use body onload to workaround the issue.
				I also tried to use localhost from BIRT Designer and it did not solve the javascript tag issue.
				We may need to find a different solution if BIRT Designer Pro needs to launch a new browser 
				( code segment for if ( "true".equalsIgnoreCase(launchnewbrowser) ) .  
			  --%>
			<body onload='location.replace("<%= targeturl %>");'>
			
			</body>

		<%
	        }
	        else
	        {
				response.sendRedirect(targeturl); 		
	        }
		}
	}
		
%>

	
