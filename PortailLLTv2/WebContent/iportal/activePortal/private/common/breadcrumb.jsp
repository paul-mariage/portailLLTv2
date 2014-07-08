<%-- --------------------------------------------------------------------------
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.

	Description:
		Breadcrumbs
		Generate the link from root to current folder
		
-------------------------------------------------------------------------- --%>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="com.actuate.reportcast.utils.StaticFuncs,
				com.actuate.reportcast.utils.ParamHandlerBean,
				com.actuate.activeportal.beans.FeatureOptionsBean,
				com.actuate.activeportal.beans.LinkBean,
				com.actuate.iportal.session.iPortalRepository,
				com.actuate.iportal.utils.Utility, 
				java.io.File,
				com.actuate.reportcast.common.AcConstants,
				com.actuate.data.oda.birt360plus.util.Birt360PlusTokenEncoder" 
%>
<%-- TAG LIBRARIES ------------------------------------------------------- --%>
<%@ taglib uri="/struts-bean" prefix="bean" %>
<%@ taglib uri="/struts-html" prefix="html" %>
<%@ taglib uri="/struts-logic" prefix="logic" %>
<%@ taglib uri="/actabpanel" prefix="ap" %>


<%-- --------------------------------------------------------------------------
	Expected JavaBeans: breadcrumbs please set in action class
-------------------------------------------------------------------------- --%>
<%@ include file="/iportal/activePortal/common/initCommonParam.jsp" %>
<jsp:include page="/iportal/activePortal/private/common/popupmenu.jsp" flush="true"/>
<jsp:useBean id="breadcrumbs" class="java.util.Vector" scope="request"/>

<%
	String userAgentDesc = request.getHeader( "user-agent" );
	
	if (breadcrumbs.size() == 0) {
		breadcrumbs.add(new com.actuate.activeportal.beans.LinkBean("",com.actuate.iportal.utils.Utility.getVolumeProfileLabel( userinfobean )));
	}
	String homefolder = com.actuate.reportcast.utils.StaticFuncs.jsEncode(
		userinfobean.getHomefolder());
	
	boolean isBRSEnabled = userinfobean.getFeatureOptionsBean() != null ? userinfobean.getFeatureOptionsBean().birtReportStudioOptionEnabled() : false;
	String contextPath = request.getContextPath();
	String brsURL = contextPath + "/wr?" + commonQueryString;
	String isTabView = request.getParameter("isTabView");
	String menu = StaticFuncs.jsEncodeNonXSS(request.getParameter("menu"), "");
	String currentFolder = userinfobean.getCurrentfolder();
	String parentFolder = currentFolder == null ? "/" : currentFolder;
	if (parentFolder.length() >1)
	{
	    if (parentFolder.endsWith( "/" ))
	    {
	        //remove ending "/" 
	        parentFolder = parentFolder.substring( 0, parentFolder.length() - 1 );
	    }
		parentFolder = StaticFuncs.stripFileFromPath( parentFolder );
		//add "/" so that javascript does not need to append "/" when it needs to add file name
		if (!parentFolder.endsWith( "/" ))
		{
			parentFolder += "/";
		}
	}
	
	String sBIRT360PlusUrl = StaticFuncs.getBIRT360PlusURL();
	String beanVolume = volumeName != null && volumeName.length() > 0? volumeName : userinfobean.getVolume();
	if( sBIRT360PlusUrl != null && sBIRT360PlusUrl.length() > 0)
	{
		if( !sBIRT360PlusUrl.endsWith("/") )
			sBIRT360PlusUrl += "/";
	}
	//create IC base URL if the proxy base URL is not set
	String partialPortalURL = null;
	boolean isICBehindProxy = false;
	String proxyBaseURL = StaticFuncs.getProxyBaseURL();
	String proxyURL = null;
	//check if the proxy URL is set in web.xml. 
	//If the PROXY_BASE property is set, then it means IC is behind proxy and use PROXY_BASE as the proxy URL to load JSAPI resources
	//If PROXY_BASE is set then requester page won't work as expected if used using standalone URL.
	//To use IC as standlone clear the PROXY_BASE property in web.xml
	if (proxyBaseURL != null && proxyBaseURL.length() > 0) {
		isICBehindProxy = true;
		proxyURL = proxyBaseURL;
	} else {
		String serverName = request.getServerName();
		int port = request.getServerPort();
		partialPortalURL = "://" + serverName + ":"
				+ Integer.toString(port) + contextPath;
	}
	
  	boolean isEnterpriseRepository = userinfobean.isEnterpriseRepository(  );
	String disabledFileMenuItems = "createDesign,createQuery,openFolder";
  	if ( !isEnterpriseRepository )
  		disabledFileMenuItems += ",share";
  	
	FeatureOptionsBean featureOptionsBean = userinfobean.getFeatureOptionsBean();
  	if( featureOptionsBean  != null )
  	{
  		if( !featureOptionsBean.isDeleteFileSubfeature() )
  			disabledFileMenuItems += ",delete";
  		if( !featureOptionsBean.isShareFileSubfeature() )
  			disabledFileMenuItems += ",share"; 		
  		if( !featureOptionsBean.isDownloadFileSubfeature() )
  			disabledFileMenuItems += ",download"; 		
  	}
%>

<script>
		function gotoBRS()
		{
			var sBrowserNewWindowName = "__view" + (new Date()).getUTCMilliseconds();
			openNewDefaultWindow('<%=brsURL%>', sBrowserNewWindowName);
		}
		
		function gotoBIRT360Plus()
		{
			var sBrowserNewWindowName = "__BIRT360Plus" + (new Date()).getUTCMilliseconds();
			openNewDefaultWindow('<%=sBIRT360PlusUrl+"index.aspx?m=BIRT360Plus&t="+Birt360PlusTokenEncoder.create(beanVolume, userid, userAgentDesc)%>', sBrowserNewWindowName);
		}
</script>
		<logic:present name="displayDetail" >
			<html:form action="/getfiledetails.do" style="margin:0px;">
				<INPUT type="hidden" name="name" value="<bean:write name="userinfobean" property="currentfolder" />">
				<%@ include file="/iportal/activePortal/private/common/commonParam.jsp" %>
				<%
				if ("true".equalsIgnoreCase(fromDashboard))
				{
				%>
				
				<input type="hidden" name="doframe" value="false" />
				<%
				}
				%>							
			</html:form>
		</logic:present>

<TABLE width="100%"  cellspacing="0" cellpadding="0" border="0" class="breadcrumbs">
	<TR ALIGN="left" VALIGN="top">

		<%-- BREAD CRUMB --%>
		
		<TD width="100%" class="breadcrumb" valign="top">
		
			<logic:iterate id="breadcrumb" indexId="index" type="com.actuate.activeportal.beans.LinkBean"
				name="breadcrumbs">				
				<logic:greaterThan name="index" value="0">
					<span class="divider">
						<i class="icon-ygg-chevron-right"></i>
					</span>
				</logic:greaterThan>
				
				<FONT style="white-space:nowrap" class="breadcrumb"><%= breadcrumb %></FONT>
			</logic:iterate>
		
			<logic:present name="displayDetail" >
				<%
				LinkBean folderNameLink = (LinkBean)breadcrumbs.get(breadcrumbs.size()-1);
				String folderName = folderNameLink.getText();
				if ("/".equalsIgnoreCase( currentFolder ))
				{
					//folder name will be used later when user click menu item.
					//when current folder is root folder, folder retrieved from breadcrumbs object is
					//volume name which is not the real folder name.
					//adjust folderName to root folder "/" if the folder is root folder 
					folderName = "/";
					
					//iServer will return error if user send request to delete root folder.
					//just remove the menu item so that iportal cannot even send the request to delete root folder from GUI.
					//This behavior matches treebrowser.jsp
					disabledFileMenuItems += ",delete";
				}
				
				
				String version = "";
				String breadcrumbMenu = "scheduleShowMenu(this, 'Directory', 'false','', '"+ StaticFuncs.jsEncode(folderName) +"', '"+ 
									disabledFileMenuItems +"', '', '"+ StaticFuncs.jsEncode(parentFolder) +"', '" + version + "', '"+
									isEnterpriseRepository +"')"; 
				%>
					<i class="icon-large icon-ygg-caret-down"
					alt="<bean:message bundle="iportalResources" key="TTIP_FOLDER_DETAIL"/>" 
					title="<bean:message bundle="iportalResources" key="TTIP_FOLDER_DETAIL"/>" 
					style="margin-bottom: -5px;cursor: default;"
					onclick="<%= breadcrumbMenu%>"></i>
			</logic:present>
			
		</TD>
	</TR>
</TABLE>

