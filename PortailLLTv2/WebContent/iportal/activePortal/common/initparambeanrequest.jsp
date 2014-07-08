<%--
	Instantiate the parameter handler and the cookie handler beans.

	@author 	Actuate Corporation
				Copyright (C) 2003 Actuate Corporation. All rights reserved.
	@version	1.0
--%>

<%@ page import="java.util.*" %>

<%-- --------------------------------------------------------------------------
	Expected JavaBeans:
	Java beans that can be used for processing, gathering parameters from http servlet request
-------------------------------------------------------------------------- --%>
<jsp:useBean id="paramBean" scope="request" class="com.actuate.reportcast.utils.ParamHandlerBean" />

<jsp:setProperty name="paramBean" property="request" value="<%= request %>" />	
