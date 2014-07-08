<%--
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved. 
	
	Forward request from Active Portal 6.0 URL to
	Struts Active Portal 7.0
	Used when publishing from Management Console.
--%>

<jsp:forward page="/submitjob.do" >
	<jsp:param name="jobType"  value="async"/>
	<jsp:param name="postback" value="false"/>
	<jsp:param name="invokeSubmit" value="true"/>
	<jsp:param name="doframe" value="false"/>
</jsp:forward>



