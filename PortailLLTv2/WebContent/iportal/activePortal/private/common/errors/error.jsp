<%--
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.
	
	Description: Displays the error detail.
	
--%>
<%@ page errorPage="genericError.jsp" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="com.actuate.reportcast.common.AcConstants" %>

<%@ taglib uri="/common" prefix="common" %>

<%@ include file="/iportal/activePortal/common/initparambeanrequest.jsp" %>

<%
{
	//Do not try to use jsp:usebean here since it creates a bean if not present
	//We need to use it only if it is present if not we should not cretae a user info bean here.
	com.actuate.activeportal.beans.UserInfoBean userinfobean =
		(com.actuate.activeportal.beans.UserInfoBean)
		session.getAttribute("userinfobean");

	com.actuate.reportcast.utils.beans.message.MessageItem __error_message_item = 
		(com.actuate.reportcast.utils.beans.message.MessageItem)
		request.getAttribute("__ERROR__MESSAGE");
	
	if (__error_message_item != null) {
		if(userinfobean != null) {
			__error_message_item.setLocale(userinfobean.getLocale());
		}

	boolean bisPortlet = new Boolean(paramBean.getParameter("isPortlet")).booleanValue();
	boolean bisDashboard = new Boolean(paramBean.getParameter("fromDashboard")).booleanValue();
	String message = com.actuate.reportcast.utils.beans.message.MessageBean.getMessage("com.actuate.iportal.portlet.bundle.Messages", __error_message_item);
	String encodedMessage = com.actuate.reportcast.utils.StaticFuncs.htmlEncode( message );
	String userenv = paramBean.getParameter( "__userenv" );
	
	String sShowErrorPage = paramBean.getParameter(AcConstants.SHOWERRORONPAGE);
	if (sShowErrorPage == null)
	{
	    sShowErrorPage = (String) request.getAttribute( AcConstants.SHOWERRORONPAGE );
	    request.removeAttribute( AcConstants.SHOWERRORONPAGE );
	}
	boolean bShowErrorOnPage = false;
	if (sShowErrorPage == null || (sShowErrorPage != null && sShowErrorPage.trim().length() == 0))
	{
		if ( bisDashboard )
		{
		    sShowErrorPage = "true";
		}
	}

	bShowErrorOnPage = Boolean.parseBoolean(sShowErrorPage);
	boolean bShowAlert = bShowErrorOnPage? false : true;
	

	// If showing in popup, disable other mechanisms.
	boolean bShowErrorInPopup = new Boolean((String)request.getAttribute("showerrorinpopup")).booleanValue();
	if(bShowErrorInPopup) {
		bShowAlert = false;
		bShowErrorOnPage = false;
		request.getSession().setAttribute("message",__error_message_item.getMessage());
	}
	if ( "tabletapp".equalsIgnoreCase( userenv ) ) {
%>
		<SCRIPT Language="JavaScript">
			window.location = "error://message=" + "<%= encodedMessage %>" + "&fallback=landing";
		</SCRIPT>
<%
	}
		if(!bShowErrorOnPage)
		{

%>
		<SCRIPT Language="JavaScript">
			redirectURL = "<%= (__error_message_item.getRedirectURL() == null)?"":__error_message_item.getRedirectURL() %>";
			bRefreshTop = "<%= __error_message_item.getRefreshTopFrame() %>";
			bStayInThisPage = "<%= __error_message_item.isStayInThisPage() %>";
<%		}
			
		if ( bisPortlet && __error_message_item != null ) 
		{
			if ( message != null && message.length() > 0 )
			{
                pageContext.getOut().write( encodedMessage );
				return;
			}
%>

<%
		}
		if(bShowErrorInPopup)
		{
%>
			openModalPopupWindow("<%= request.getContextPath() %>/iportal/activePortal/errors/licensingerror.jsp","LicenseError","600","400");
<%
		}
		else 
		{	// Regular mechanism. 
		    if ( !"tabletapp".equalsIgnoreCase( paramBean.getParameter( "__userenv" ) ) ) {
%>
				<common:message id="msg1" baseName="com.actuate.reportcast.resources.ErrorMessages" messageItem="<%= __error_message_item %>" showAlert="<%= bShowAlert %>" />
<%
				if( msg1.getMessage() == null )
				{
%>
				<common:message baseName="com.actuate.activeportal.resources.ActivePortalResources" messageItem="<%= __error_message_item %>" showAlert="<%= bShowAlert %>" />
<%	
				}
		    }
		    else
		    {
		        
		    }
		}

		if(!bShowErrorOnPage)
		{
%>

			if ("false" == bStayInThisPage)
			{
				if(redirectURL != "")
				{
					if(bRefreshTop == "true")
					{
						top.location.href= redirectURL;
					}
					else
					{
						window.location.href = redirectURL;
					}	
				}
				else
				{
					if(window.history.length > 0)
					{
						top.history.back();
					}
					else
					{
						parent.window.close();
					}
				}
			}
	</SCRIPT>
<%
		}
	}
}
%>
