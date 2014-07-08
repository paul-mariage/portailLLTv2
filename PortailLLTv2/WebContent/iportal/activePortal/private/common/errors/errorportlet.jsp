<%--
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.
	
	Description: Displays the error detail.
	
--%>

<%@ page language="java" %>
<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/common" prefix="common" %>

<META http-equiv="Content-Type" content="text/html; charset=unicode">
<%
	com.actuate.reportcast.utils.beans.message.MessageItem __error_message_item = 
	(com.actuate.reportcast.utils.beans.message.MessageItem)
	request.getAttribute("__ERROR__MESSAGE");
%>

<html>
<head>
<title></title>
</head>
<body>

		<table width="100%" border="0" cellspacing="0" cellpadding="5">
				<tr>
					<td>
					<%
					if ( __error_message_item != null )
					{
					%>
							<%= __error_message_item.getMessage()%>
					<%
					}	
					%>
					</td>
				</tr>
		</table>
</body>
</html>