<%--
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.
	
	Description: Closes the current window if it is a new window
	
--%>

<%@ page contentType="text/html; charset=utf-8" %>

<%@ taglib uri="/struts-logic" prefix="logic" %>

<%
	com.actuate.reportcast.utils.beans.message.MessageItem __error_message_item = 		(com.actuate.reportcast.utils.beans.message.MessageItem)pageContext.getAttribute("__ERROR__MESSAGE", pageContext.REQUEST_SCOPE);
	if( __error_message_item != null )
	{
		__error_message_item.setStayInThisPage(true);
		pageContext.setAttribute("__ERROR__MESSAGE", __error_message_item, pageContext.REQUEST_SCOPE);

%>

		<jsp:include page="/iportal/activePortal/private/common/errors/error.jsp" flush="true"/>
<%
	}
%>

<logic:present name="javaScriptCommands">
	<%= request.getAttribute("javaScriptCommands") %>
</logic:present>


	<script>
		window.close();
	</script>