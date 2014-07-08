<%--
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved. 
	
	Forward request from Active Portal 6.0 URL to
	Struts Active Portal 7.0
	Used when publishing from Management Console.
--%>

<%@ page import="com.actuate.activeportal.beans.UserInfoBean" %>
<%@ page import="com.actuate.reportcast.utils.AcRequestHandlerBean" %>
<%@ page import="com.actuate.reportcast.utils.StaticFuncs" %>;

<HTML>
  <SCRIPT>
    var doFrame ;
	if (parent.frames.length != 0)
	{

		// loaded in frames
		var sideWindow = top.frames['side'].window;
		if ( sideWindow != null )
		{
		   doFrame = false;
		}
	}
	else 
	{

		doFrame = true;
	}

if ( ! doFrame )
{
	<jsp:forward page="/executereport.do" >
		<jsp:param name="jobType"  value="sync"/>
		<jsp:param name="postback" value="false"/>
		<jsp:param name="invokeSubmit" value="true"/>
		<jsp:param name="dummy" value="true"/>
	</jsp:forward>

}
else
{

<jsp:forward page="/executereport.do" >
	<jsp:param name="jobType"  value="sync"/>
	<jsp:param name="postback" value="false"/>
	<jsp:param name="invokeSubmit" value="true"/>
	<jsp:param name="doframe" value="true"/>
</jsp:forward>
}
</SCRIPT>
</HTML>

