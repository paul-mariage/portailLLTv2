<%--
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.
	
--%>
<%@ page contentType="text/html; charset=utf-8" import="com.actuate.reportcast.utils.StaticFuncs" %>

<%-- TAG LIBRARIES ------------------------------------------------------- --%>
<%@ taglib uri="/struts-bean" prefix="bean" %>
<%@ taglib uri="/struts-html" prefix="html" %>
<%@ taglib uri="/struts-logic" prefix="logic" %>
<%@ taglib uri="/struts-tiles" prefix="template" %>

<%@ include file="/iportal/activePortal/common/initparambeanrequest.jsp" %>

<HTML>

	<HEAD>

	<META http-equiv="Content-Type" content="text/html; charset=unicode">
	
	<META http-equiv="Cache-Control" content="no-cache">
	<META http-equiv="Pragma" content="no-cache">
	<META http-equiv="Expires" content="-1">

		<SCRIPT language="javascript" src="<html:rewrite page="/js/allscripts.js"/>"></SCRIPT>
		<SCRIPT>
			function bodyOnLoad()
			{
				<logic:present parameter="redirectPath">
					/* process redirect if we get the redirect parameter
					 This should start after the context and not include the context
					 */
					 
					  <%
					      String redirectPath = paramBean.getParameter("redirectPath");
					      if ( request.getQueryString() != null )
   					      {
						      redirectPath = StaticFuncs.appendRequiredDataToBasePath(redirectPath);
						  }    
					  %>
<%					  
					 String redirectParams = (String)request.getAttribute("redirectParams");
					 if(redirectParams  == null)
					 {
					     //do not add "redirectPath" which should only be used by processredicrect.jsp
					     Vector vIgnore = new Vector();
					     vIgnore.add( "redirectpath" );
					     redirectParams = paramBean.createQueryString(vIgnore, "");
					 }
%>
					 window.location.replace('<html:rewrite page="<%= redirectPath %>" /><%= redirectParams %>');
				</logic:present>
				<logic:present name="redirectPath" scope="request">
					/* process redirect if we get the redirect parameter
					 This should start after the context and not include the context
					 */
					 
					  <%
					      String redirectPath = (String)request.getAttribute("redirectPath");
   					      if ( request.getQueryString() != null )
   					      {
						      redirectPath = StaticFuncs.appendRequiredDataToBasePath(redirectPath);
						  }
					      String redirectParams = (String)request.getAttribute("redirectParams");
					      String sFinalUrl = StaticFuncs.jsEncode(request.getContextPath() + response.encodeURL(redirectPath));
					      String sFinalParameters = (redirectParams == null )?paramBean.createQueryString(null, ""):redirectParams ;

						  // Remove an extra "?" SCR - 72715
						  if ( sFinalUrl.endsWith("?")  && sFinalParameters.startsWith("?") )
					      {
								sFinalParameters = sFinalParameters.substring(1);
					      }
					      if ( sFinalUrl.endsWith("?") )
					      {
      					      	if ( sFinalParameters != null && sFinalParameters.trim().length() > 0 )
      					      	{
						      		sFinalUrl = sFinalUrl + sFinalParameters;
						      	}
					      }
					      else if ( sFinalUrl.indexOf('?') == -1)
					      {
					      	if ( sFinalParameters != null && sFinalParameters.trim().length() > 0 )
					      	{
					      		// Add the ? only if there are any parameters
						      	sFinalUrl = sFinalUrl + "?" + sFinalParameters;
						    } 
					      }
					  %>
					 //location.replace('<%= StaticFuncs.jsEncode(request.getContextPath() + response.encodeURL(redirectPath)) %><%= (redirectParams == null )?paramBean.createQueryString(null, ""):redirectParams %>');
					 location.replace('<%=sFinalUrl%>');
				</logic:present>
			}
		</SCRIPT>
	</HEAD>

	<BODY onLoad="javascript:bodyOnLoad()" class="<%=com.actuate.web.jslib.Utility.CSS_WRAPPER_CLASS%>">
	</BODY>
</HTML>
