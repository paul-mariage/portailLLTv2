<%-- 
	This file contains common hidden parameter for a html form  -------------
 	To include this file, caller needs to include initCommonParam.jsp. 
--%>
<%@ page import="com.actuate.iportal.common.IPortalConsts,
				com.actuate.reportcast.utils.StaticFuncs,				
				com.actuate.reportcast.common.AcConstants" %>
				

<%
if (volumeProfile != null)
{
%>
<INPUT type="hidden" name="<%= IPortalConsts.VOLUME_PROFILE %>" 
	value="<%= StaticFuncs.formValueEncode(volumeProfile) %>">

<%
if ( vpsessionid != null )
{
%>
<INPUT type="hidden" name="vpsessionid" 
	value="<%= StaticFuncs.formValueEncode(vpsessionid) %>">
<%
} 
if (volumeName != null && volumeName.length() > 0)
{
%>
<INPUT type="hidden" name="volume" value="<%= StaticFuncs.formValueEncode(volumeName) %>">
<%    
}
%>

<%
}
else
{
%>

	<%
	if (iportalId != null && iportalId.length() > 0)
	{
	%>
<INPUT type="hidden" name="iportalId" value="<%= StaticFuncs.formValueEncode(iportalId) %>">
<%
}
%>

	<%
	if (userid != null && userid.length() > 0)
	{
	%>
<input type="hidden" name="userid" value="<%= StaticFuncs.formValueEncode(userid) %>">
<%
}
%>
	
<%
	if (! useDefaultServerUrl)
	{ 
%>
		<INPUT type="hidden" name="serverUrl" value="<%= StaticFuncs.formValueEncode(userinfobean.getServerurl()) %>">
<%
	}
	if (! useDefaultVolume)
	{
%>
		<INPUT type="hidden" name="volume" value="<%= StaticFuncs.formValueEncode(userinfobean.getVolume()) %>">
<% 
	} 
	if (! useDefaultRepositoryType)
	{
%>		
		<INPUT type="hidden" name="repositoryType" value="<%= StaticFuncs.formValueEncode(userinfobean.getRepositoryType()) %>">
<% 
	} 
%>
<%
}
%>
<%
if (fromDashboard != null && fromDashboard.length() > 0)
{
%>
<INPUT type="hidden" name="<%=AcConstants.FROM_DASHBOARD %>" value="<%= fromDashboard %>">
<%
}
%>
<%
if (showBanner != null && showBanner.length() > 0)
{
%>
<INPUT type="hidden" name="<%=AcConstants.SHOW_BANNER %>" value="<%= showBanner %>">
<%
}
%>
<%
if (showSideBar != null && showSideBar.length() > 0)
{
%>
<INPUT type="hidden" name="<%=AcConstants.SHOW_SIDEBAR %>" value="<%= showSideBar %>">
<%
}
%>
<%
if (showBreadCrumb != null && showBreadCrumb.length() > 0)
{
%>
<INPUT type="hidden" name="<%=AcConstants.SHOW_BREADCRUMB %>" value="<%= showBreadCrumb %>">
<%
}
%>	
<%
if (redirect != null && redirect.length() > 0)
{
%>
<INPUT type="hidden" name="<%=AcConstants.COMMON_PARA_TIMEOUT_REDIRECT %>" value="<%= redirect %>">
<%
}
%>