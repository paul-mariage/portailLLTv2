<%--
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.
	
	Description: Closes the current window if it is a new window
	
--%>

<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="com.actuate.reportcast.common.AcConstants" %>
<%@ include file="/iportal/activePortal/common/initparambeanrequest.jsp" %>

<%@ taglib uri="/struts-logic" prefix="logic" %>

<%
	com.actuate.reportcast.utils.beans.message.MessageItem __error_message_item = 		(com.actuate.reportcast.utils.beans.message.MessageItem)pageContext.getAttribute("__ERROR__MESSAGE", pageContext.REQUEST_SCOPE);
	if( __error_message_item != null )
	{
		__error_message_item.setStayInThisPage(true);
		pageContext.setAttribute("__ERROR__MESSAGE", __error_message_item, pageContext.REQUEST_SCOPE);

	boolean bShowErrorOnPage = new Boolean(paramBean.getParameter(AcConstants.SHOWERRORONPAGE)).booleanValue();
%>

	<jsp:include page="/iportal/activePortal/private/common/errors/error.jsp" flush="true">
		<jsp:param name="showerroronpage" value="<%= bShowErrorOnPage%>" />
	</jsp:include>

<%
		if(!bShowErrorOnPage)
		{
		    String fromWhere = paramBean.getParameter( "fromwhere" );
		    boolean isFromWait = "wait".equalsIgnoreCase( fromWhere );
%>

		<script>
			var curHistoryLength = parent.history.length;	
			var isFromWait = <%= isFromWait %>;
			// If the DHTML Client frameset is embedded in another frame, then we are trying to go back using
			// that frame's history list. Otherwise, close window because this window is a popup window from this application
			if (curHistoryLength <= 1) {
				// IE has history length 0 and FireFox has history length 1 when there are no waitforexecution involved
				// it must comes from viewFrameSet so close window when error happens.
				// we may need to check whether it is an IE or Firefox if history length is 1.  
				parent.window.close();
			}
			else if (curHistoryLength == 2) {
				if (isFromWait == true){
					//history length is 2 and request is from wait page.
					//history urls must be viewFrameSet and waitForExecution
					//close window because error happens
					parent.window.close();					
				}
				else {
					//history length is 2 and request is not from waitForExecution
					//history urls (topmost first) must be: viewFrameset and orignal url.
					//go back to original url
					var goBack = -1;
					parent.history.go( goBack );					
				}
			}
			else {
				if (isFromWait == true){
					//history length is greater than 2 and request is from wait page.
					//history urls (topmost first) must be: viewFrameSet, waitForExecution, original urls
					//goback 2 to its original url
					var goBack = -2;
					parent.history.go( goBack );										
				}
				else {
				//history urls (topmost first) must be: viewFrameSet, original urls
				//go back to original url
					var goBack = -1;
					parent.history.go( goBack );															
				}
			}
		</script>
<%
		}
	}
%>
