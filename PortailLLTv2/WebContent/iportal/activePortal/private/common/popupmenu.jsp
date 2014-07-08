<%@ page import="java.util.*,
				com.actuate.reportcast.utils.*,
				com.actuate.activeportal.beans.FeatureOptionsBean,
				com.actuate.iportal.session.iPortalRepository,
				com.actuate.iportal.utils.Utility" %>

<%@ taglib uri="/struts-html" prefix="html" %>
<%@ taglib uri="/struts-bean" prefix="bean" %>
<%@ taglib uri="/struts-logic" prefix="logic" %>
<%@ include file="/iportal/activePortal/common/initCommonParam.jsp" %>


<logic:equal name="userinfobean" property="userAgent.NS4" value="false">
	<%
		String popUpWindowName = StaticFuncs.jsEncode("AcWizardWindowForJSP"
							+ String.valueOf(Math.abs(request.getSession().getId().hashCode())));
	
		FeatureOptionsBean featureOptionsBean = userinfobean.getFeatureOptionsBean();
		boolean isBRSEnabled = featureOptionsBean != null ? featureOptionsBean.birtReportStudioOptionEnabled() : false;
		boolean isDashboardEditAllowed = userinfobean.isShareDashboard();
		boolean isQueryEnabled = featureOptionsBean != null ? featureOptionsBean.actuateQueryOptionEnabled() : false;

		com.actuate.common.util.DocumentConversionManager dcm = com.actuate.common.util.DocumentConversionManager.instance();
		com.actuate.common.util.DocumentConversions dc = dcm.getConversionOptions(request, response, false, null);

		java.util.Map viewingFormatList = new java.util.HashMap();
		String[] supportedViewingMenu = new String[] { "SOX", "SOI", "VTF", "VTX", "VTS" };

		if (dc != null) 
				viewingFormatList = dc.getViewFormatList(supportedViewingMenu);

		String[] supportedFileMenus = new String[6];
		int fileMenuIndex = 0;
		if (isBRSEnabled)
		{
		    supportedFileMenus[fileMenuIndex] = "createDesign";
		    fileMenuIndex++;
		}
		if (isQueryEnabled)
		{
		    supportedFileMenus[fileMenuIndex] = "createQuery";
		    fileMenuIndex++;
		}
		
	    supportedFileMenus[fileMenuIndex++] = "download";
	    supportedFileMenus[fileMenuIndex++] = "share";
	    supportedFileMenus[fileMenuIndex++] = "details";
	    supportedFileMenus[fileMenuIndex++] = "delete";


		String contextPath = request.getContextPath();
		boolean viewInNewWindow = userinfobean.isViewInNewBrowserWindow();
		String repositoryType = userinfobean.getRepositoryType();
		commonQueryString = commonQueryString == null ? ""	: commonQueryString;

		//create IC base URL if the proxy base URL is not set
		String partialPortalURL = null;
		boolean isICBehindProxy = false;
		String proxyBaseURL = StaticFuncs.getProxyBaseURL();
		String proxyURL = null;
		//check if the proxy URL is set in web.xml. 
		//If the PROXY_BASE property is set, then it means IC is behind proxy and use PROXY_BASE as the proxy URL to load JSAPI resources
		//If PROXY_BASE is set then requester page won't work as expected if used using standalone URL.
		//To use IC as standlone clear the PROXY_BASE property in web.xml
		if (proxyBaseURL != null && proxyBaseURL.length() > 0) 
		{
			isICBehindProxy = true;
			proxyURL = proxyBaseURL;
		} 
		else 
		{
			String serverName = request.getServerName();
			int port = request.getServerPort();
			partialPortalURL = "://" + serverName + ":" + Integer.toString(port) + contextPath;
		}
		
		String icAdvPageValue = "userid=" +userinfobean.getUserid() + "&fromportal=yes&"+commonQueryString;
	%>
	<SCRIPT language="javascript" src="<html:rewrite page="/js/popupmenu.js" />"></SCRIPT>
	<SCRIPT language="javascript" src="<html:rewrite page="/js/contextmenu.js" />"></SCRIPT>

	<Script language="javascript">
		var repositoryType = '<%=repositoryType%>';
		var isMyPortlet = <%= new Boolean((String)request.getAttribute("myPortlet")).booleanValue()%>;
		var commonParam = "<%=commonQueryString%>";
		var fromDashboard = "<%=fromDashboard%>";
		
		function doAction(fileId, itemName, selectedMenuItemId, description, parentName, version, fileType, from)
		{
			var itemId = fileId;
			var paramObjectID		= "objectId=";
			var paramid				= "id=";
			var param__executableId	= "__executableId=";
			if ( repositoryType.toUpperCase() == "<%= iPortalRepository.REPOSITORY_STANDALONE.toUpperCase() %>" )
			{
				itemId = parentName + itemName;
				paramObjectID		= "name=";
				paramid				= "name=";
				param__executableId	= "__executableName=";
			}
			else {
				if( fileId == null )
				{
					itemId = parentName;
					//enterprise mode, if file id is null
					//add itemName to itemId if itemName is not null
					itemId = (itemName != null && itemName != '/') ? itemId + itemName : itemId;
					
					paramObjectID		= "name=";
					paramid				= "name=";
					param__executableId	= "__executableName=";
				}
			}
			paramObjectID		+= itemId;
			paramid				+= itemId;
			param__executableId	+= itemId;
			fileType				= fileType + "";
			
			var itemNameWithVersion = (version != null && version != "") ? (itemName + ";" + version) : itemName; 
			if(selectedMenuItemId == "openFolder")
			{
				openFolder(itemId);
			}
			else if(selectedMenuItemId == "openApplication")
			{
				openApplication(itemName);
			}
			else if(selectedMenuItemId == "openDocument" || selectedMenuItemId == "openFile")
			{
				var documentPath = parentName + itemNameWithVersion;
				var documentID = itemId;
				if ( repositoryType.toUpperCase() == "<%= iPortalRepository.REPOSITORY_STANDALONE.toUpperCase() %>" )
				{
					documentID = null;
				}
				var lowerCaseFileType = fileType.toLowerCase();
				if ( fromDashboard != null && fromDashboard.toLowerCase() == "true" &&
						(lowerCaseFileType == "dashboard" || lowerCaseFileType == "gadget"))
				{
						openDashboardFile('<%=contextPath%>', commonParam, documentPath);
						
				}
				else
				{
				struts_viewDocument(
						repositoryType, 
						'<%=contextPath%>', 
						documentPath, 
						<%=viewInNewWindow%>, 
						documentID, 
						'', 
						fileType, 
						from,
						commonParam
						);
				}
			}
			else if(selectedMenuItemId == "viewXLS")
			{
				viewQuery(itemId, itemNameWithVersion, <%=viewInNewWindow%>, 'ExcelDataDump');
			}
			else if(selectedMenuItemId == "viewPDF")
			{
				viewQuery(itemId, itemNameWithVersion, <%=viewInNewWindow%>, 'PDF');
			}
			else if(selectedMenuItemId == "viewAnalysis")
			{
				viewQuery(itemId, itemNameWithVersion, <%=viewInNewWindow%>, 'analysis');
			}
			else if(selectedMenuItemId == "createDesign")
			{
				var designPath = parentName + itemNameWithVersion;
				createReportDesignFromIO('<%=contextPath%>', designPath, commonParam );
			}
			else if(selectedMenuItemId == "editDashboard" || selectedMenuItemId == "editDesign")
			{
				var designPath = parentName + itemName;
				if ( repositoryType.toUpperCase() == "<%= iPortalRepository.REPOSITORY_ENCYCLOPEDIA.toUpperCase() %>" )
				{
					designPath = designPath + ";" + version;
				}

				if ( "dashboard" == fileType.toLowerCase() )
				{
					editDashboard('<%=contextPath%>', designPath, commonParam );
				}
				else
				{
					editDesignUsingBizStudio('<%=contextPath%>', designPath, commonParam );
				}
			}
			else if(selectedMenuItemId == "createQuery" || selectedMenuItemId == "editQuery")
			{
				createQueryById(itemId);
			}
			else if(selectedMenuItemId == "executeQuery")
			{
				executeQueryById(itemId);
			}
			else if(selectedMenuItemId == "scheduleQuery")
			{
				scheduleQueryById(itemId);
			}
			else if(selectedMenuItemId == "newBackgroundJob")
			{
				//	WinName is not necessary
				//var sBrowserNewWindowName = "__view" + (new Date()).getUTCMilliseconds();
				window.open("<html:rewrite page="/submitjob.do" />?__requesttype=scheduled&" + param__executableId
											+ "&" + commonParam, "ParameterRequesterDlg", "height=700, width=900, status=yes, scrollbars=yes, resizable=no, location=yes");
				if(isMyPortlet)
				{
					<%request.removeAttribute("myPortlet");%> 
				}
			}
			else if(selectedMenuItemId == "newImmediateJob")
			{
				//	WinName is not necessary
				//var sBrowserNewWindowName = "__view" + (new Date()).getUTCMilliseconds();
				var url = '<html:rewrite page="/executereport.do" />' + "?__requesttype=immediate&" + param__executableId				
										+ "&" + commonParam + "&__saveOutput=false" + "&fromlink=yes";
				var optionalParam = fileType;
				openRequesterPageWindow(url, "ParameterRequesterDlg", optionalParam, true);			
				if(isMyPortlet)
				{
					<%request.removeAttribute("myPortlet");%> 
				}
			}
			else if(selectedMenuItemId == "newSyncPersistJob")
			{
				//	WinName is not necessary
				//var sBrowserNewWindowName = "__view" + (new Date()).getUTCMilliseconds();
				//pass the executable name because saveas.jsp needs it to decided to load outputformat dropdown box
				var url = '<html:rewrite page="/executereport.do" />' + "?__requesttype=immediate&" + param__executableId
											+ "&" + commonParam +"&__saveOutput=true" + "&fromlink=yes";
				var optionalParam = fileType;
				openRequesterPageWindow(url, "ParameterRequesterDlg", optionalParam, true);			

				if(isMyPortlet)
				{
					<%request.removeAttribute("myPortlet");%> 
				}
			}
			else if(selectedMenuItemId == "createParameterValueFile")
			{
					var url = '<%=StaticFuncs.getMCContext()%>' + "/filesfolders/files/parametervaluesfile.jsp?" + '<%=icAdvPageValue%>' + '&fileorFolderName='+ parentName+itemName + '&fileorFolderID='+fileId+'&fileType='+fileType;				
					openPopupWindow(url,'createParameterValueFile', 1100, 700,'status=yes, scrollbars=yes, resizable=yes' );
			}
			else if(selectedMenuItemId == "archive")
			{
					var url = '<%=StaticFuncs.getMCContext()%>';		
					if ("directory" == fileType.toLowerCase()) {
						url += "/filesfolders/folders/properties.jsp?";
					} else {
						url += "/filesfolders/files/properties.jsp?";
					}
					url +=  '<%=icAdvPageValue%>' + '&fileorFolderName='+ parentName+itemName + '&fileorFolderID='+fileId+'&fileType='+fileType;
					openPopupWindow(url,'archive', 800, 700,'status=yes, scrollbars=yes, resizable=yes' );
			}			
			else if(selectedMenuItemId == "share" || selectedMenuItemId == "viewFileMenu_share")
			{
				window.location.href = "<html:rewrite page="/filefoldersprivilege.do" />?" + paramid
											+ "&" + commonParam;
			}
			else if(selectedMenuItemId == "delete" || selectedMenuItemId == "viewFileMenu_delete")
			{
				if ("directory" == fileType.toLowerCase())
				{
					sConfirmMsg = '<%=Utility.getJsMessage(pageContext,
								"QUESTION_DELETE_FOLDER", null)%>';
				}
				else
				{
					sConfirmMsg = '<%=Utility.getJsMessage(pageContext,
								"QUESTION_DELETE_FILE", null)%>';
				}
				sConfirmMsg = messageFormat(sConfirmMsg,new Array(itemName));
				if (confirm(sConfirmMsg))
				{
					window.location.href = "<html:rewrite page="/deletefile.do" />?" + paramid
											+ "&parentname=" + encode(parentName)
											+ "&refresh=true"
											+ "&" + commonParam;
				}
			}
			else if(selectedMenuItemId == "details" || selectedMenuItemId == "viewFileMenu_details")
			{				
				window.location.href = "<html:rewrite page="/getfiledetails.do" />?" + paramObjectID
											+ "&" + commonParam;
			}
			else if( selectedMenuItemId == "download" || selectedMenuItemId == "viewFileMenu_download")
			{
				var queryString = "dummyparameter=dummyvalue";
				var fullPath = "";
				if ("directory" == fileType.toLowerCase()) {
					if (itemName == "/" && parentName == "/") {
						fullPath = "/";
					}
					else {
						if (itemName.lastIndexOf('/') < itemName.length -1) {
							itemName += "/";
						}
						fullPath = parentName + itemName;
					}					
					queryString += fullPath + "&fileType=directory";
				}
				else {
					fullPath = parentName + itemNameWithVersion;
					queryString += fullPath;
				}
				document.downloadForm.name.value = fullPath;
				var oriAction = document.downloadForm.action;
				document.downloadForm.action += "?" + queryString;
				document.downloadForm.submit();
				//need to reset action because after submit, the page will not be refreshed.
				//if user wants to download again, the action has to be the original 
				document.downloadForm.action = oriAction;
			}
			else if(selectedMenuItemId == "facebookComments")
			{
				 var useProxyURL = <%=isICBehindProxy%>;
					var baseURL = null;
					//if probase url is set then use that as the base URL else create one using HTTP request
					if( useProxyURL )
					{
						baseURL = '<%=proxyURL%>';
					}
					else
					{
						var URL = location.href;
						var index = URL.indexOf("://");
						var protocol = URL.substring(0,index);
						baseURL = protocol+'<%=partialPortalURL%>';
					}
				var fbURL = baseURL+'/iportal/activePortal/private/filesfolders/facebookcomments.jsp?__executableName='+parentName+itemName;
				openPopupWindow(fbURL, 'FacebookCommentWindow', 500, 500, 'status=yes, scrollbars=yes, resizable=yes, toolbar=no, location=no, status=no, menubar=no');
			}
			else if(selectedMenuItemId == "copy" || selectedMenuItemId == "move")
			{
				window.location.href = "<html:rewrite page="/movefilefolder.do" />?" + paramid
				+ "&command=" + selectedMenuItemId + "&name=" + itemName + "&fileType=" + fileType ;
				
			}
			else if(selectedMenuItemId == "rename")
			{
				window.location.href = "<html:rewrite page="/renamefolder.do" />?" + paramid
				+ "&command=" + selectedMenuItemId + "&name=" + itemName ;
				
			}
		}
		
		function processVolumeSelection( volumeName )
		{
			// This selection list is shown from a frameset.  Need to update the main iframe or parent of this frameset to udpate the entire tree view.
			var volumeURL = "<html:rewrite page="/getfolderitems.do" />?" + "__vp=" + volumeName + "&doFrame=true&fromLogin=true";
			if ( window.self === window.top )
			{
				window.location.href = volumeURL;				
			}
			else
			{	
				// this page inside an iFrame so update the parent iframe
				window.parent.location.href = volumeURL;
			}
		}
		
		function processEssReport(itemId, itemName, selectedMenuItemId, description, parentName, version, fileType, viewFormat)
		{
			var paramObjectID		= "objectId=" + itemId;
			var paramid				= "id=" + itemId;
			var param__executableId	= "__executableId=" + itemId;
			fileType				= fileType + "";

			if ( parentName )
			{
				var ver = "";
				if ( repositoryType.toUpperCase() == "<%= iPortalRepository.REPOSITORY_ENCYCLOPEDIA.toUpperCase() %>" )
				{
					if ( version )
					{
						ver = ";"+version;
					}
				}
				
				if ( itemName )
				{
					paramid				= "name="  + parentName + itemName + ver;
					param__executableId = "__executableName="  + parentName + itemName + ver;
				}
			}
			
			var optionalParam = fileType;

			var sUrl = '<html:rewrite page="/executereport.do" />' + "?__requesttype=immediate&" + param__executableId				
								+ "&" + commonParam + "&__saveOutput=false" + "&__format=" + viewFormat+ "&fromlink=yes";
			var	sBrowserNewWindowName = "ParameterRequesterDlg";
			
			if ( "SOI" == fileType.toUpperCase() )
			{
				sUrl = '<html:rewrite page="/viewsoi.do" />' + "?" + param__executableId + "&__format=" + viewFormat + "&" + commonParam;
				sBrowserNewWindowName = "__view" + (new Date()).getUTCMilliseconds();
			
			}
			openRequesterPageWindow(sUrl, sBrowserNewWindowName, optionalParam);
		}

		function openFolder(folderId)
		{
			var folderParamName = "id";
			if ( repositoryType.toUpperCase() == "<%= iPortalRepository.REPOSITORY_STANDALONE.toUpperCase() %>" )
			{
				folderParamName = "folder";
			}
			window.location.href = "<html:rewrite page="/getfolderitems.do" />?" + folderParamName + "=" + folderId
											+ "&" + commonParam;
		}
		
		function openApplication(appName)
		{
			var url = '<html:rewrite page="/apps/" />'+appName+'/';
			var sBrowserNewWindowName = "BIRTApp" + (new Date()).getUTCMilliseconds();
			window.open(url, sBrowserNewWindowName);
		}
		
		function viewQuery(fileId, fileName, newWindow, format)
		{
			//	WinName is not necessary
			var winName = 'ViewFrame' + '<%=StaticFuncs.encode(userid, '_')%>';
			var winURL = "";
		
			if ('analysis' == format)
				winURL = "<html:rewrite page="/servlet/DownloadSearchResult" />?id=" + fileId + "&name=" + encode(fileName) + "&format="+format
											+ "&" + commonParam;
			else if ('ExcelDataDump' == format)
				winURL = "<html:rewrite page="/servlet/GetReportData" />?id=" + fileId + "&name=" + encode(fileName) + "&format="+format
											+ "&" + commonParam;
			else if ('PDF' == format)
				winURL = "<html:rewrite page="/servlet/GetReportData" />?id=" + fileId + "&name=" + encode(fileName) + "&format="+format
											+ "&" + commonParam;
			else
				winURL = g_viewFramesetURL + "?id=" + fileId + "&name=" + encode(fileName) + "&format="+format
											+ "&" + commonParam;
		
			if (newWindow)
				window.open(winURL, winName);
			else
				window.location.href = winURL;
		}

		function createReportDesignFromIO(context, IOName, url)
		{
			var fullURL = context + "/wr?__ioName=" + IOName + "&" + url;
			openNewDefaultWindow(fullURL, '<%=popUpWindowName%>');
		}
				
		function editDesignUsingBizStudio(context, reportName, url)
		{
			var fullURL = context + "/wr?__report=" + encode(reportName) + "&" + url + "&fromlink=yes&activity=edit";
			openNewDefaultWindow(fullURL, '<%=popUpWindowName%>');
		}

		function editDashboard(context, reportName, url)
		{
			var fullURL = context + "/dashboard?__design=" + encode(reportName) + "&__launchDesigner=true" + "&" + url + "&fromlink=yes&activity=edit";
			openNewDefaultWindow(fullURL, 'dashboard');
		}
		
		function createQueryById(queryId)
		{
			var tokenParameter = "__token="+Math.random();
			var url = "<html:rewrite page="/query/create.do" />?__executableID="+queryId+"&"+tokenParameter
											+ "&" + commonParam;
			return openPopupWindow(url,'<%=popUpWindowName%>',700,565,'status=yes, scrollbars=yes, resizable=yes' );
		}
		
		function executeQueryById(queryId)
		{
			var tokenParameter = "__token="+Math.random();
			var url = "<html:rewrite page="/query/execute.do" />?__executableId="+queryId+"&"+tokenParameter
											+ "&" + commonParam;
			return openPopupWindow(url,'<%=popUpWindowName%>',700,565,'status=yes, scrollbars=yes, resizable=yes' );
		}
		
		function scheduleQueryById(queryId)
		{
			var tokenParameter = "__token="+Math.random();
			var url = "<html:rewrite page="/query/submit.do" />?__executableId="+queryId+"&"+tokenParameter
											+ "&" + commonParam;
			return openPopupWindow(url,'<%=popUpWindowName%>',700,565,'status=yes, scrollbars=yes, resizable=yes' );
		}
	</Script>
	<DIV id="popup" style="display:none;" class="popupMenu" onMouseOver="enterMenu()" onMouseOut="leaveContextMenu(event, true, 'popup')">
		<Table cellspacing="0" cellpadding="0">
			<TR id="openApplication" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
				<TD nowrap="nowrap" style="padding-left:15px">
					<i class="icon-ygg-forward" align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.openApplication"/>" ></i>				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">				
					<bean:message bundle="iportalResources" key="files.popupmenu.label.openApplication" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>
			</TR>
			<TR id="openFolder" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
				<TD nowrap="nowrap" style="padding-left:15px">
					<i class="icon-ygg-folder-open" align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.openFolder"/>" ></i>				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">				
					<bean:message bundle="iportalResources" key="files.popupmenu.label.openFolder" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>
			</TR>
			<TR id="openFile" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this, 'filelist')">
				<TD nowrap="nowrap" style="padding-left:15px">
					<i class="icon-ygg-file" align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.openFile"/>" ></i>				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">				
					<bean:message bundle="iportalResources" key="files.popupmenu.label.openFile" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>
			</TR>
			<TR id="openDocument" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this, 'filelist')">
				<TD nowrap="nowrap" style="padding-left:15px">
					<i class="icon-ygg-file" align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.viewDocument"/>" ></i>				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">				
					<bean:message bundle="iportalResources" key="files.popupmenu.label.viewDocument" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>
			</TR>
			<TR id="essOpenDocument" class="popupMenuItem" onMouseOver="scheduleSubMenu(this, 'viewFormatSubMenu')" onMouseOut="highlightItem(this, false, 'viewFormatSubMenu')">
				<TD nowrap="nowrap" style="padding-left:15px">
					<i class="icon-ygg-file"  align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.viewDocument"/>" ></i>
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">
					<bean:message bundle="iportalResources" key="files.popupmenu.label.viewDocument" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<INPUT TYPE="image" src="<%=contextPath%>/iportal/common/images/arrow__r.gif" />
				</TD>
			</TR>
			<TR id="viewXLS" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
				<TD nowrap="nowrap" style="padding-left:15px">
					<img src="<html:rewrite page="/iportal/activePortal/images/view-xls.gif"/>" align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.viewExcel"/>" >				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">				
					<bean:message bundle="iportalResources" key="files.popupmenu.label.viewExcel" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>
			</TR>
			<TR id="viewPDF" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
				<TD nowrap="nowrap" style="padding-left:15px">
					<img src="<html:rewrite page="/iportal/activePortal/images/view-pdf.gif"/>" align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.viewPDF>"/>" >				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">				
					<bean:message bundle="iportalResources" key="files.popupmenu.label.viewPDF" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>
			</TR>
			<logic:equal name="userinfobean" property="eanalysisOptionEnabled" value="true">
				<TR id="viewAnalysis" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
					<TD nowrap="nowrap" style="padding-left:15px">
						<img src="<html:rewrite page="/iportal/activePortal/images/viewAnalysisIcon.gif"/>" align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.viewAnalysis"/>" >					
					</TD>
					<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">					
						<bean:message bundle="iportalResources" key="files.popupmenu.label.viewAnalysis" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</TD>
				</TR>
			</logic:equal>
			
			<% if ( isDashboardEditAllowed )
			{
						%>
			<TR id="editDashboard" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
				<TD nowrap="nowrap" style="padding-left:15px">
					<i class="icon-ygg-edit" align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.editDashboard"/>" ></i>				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">				
					<bean:message bundle="iportalResources" key="files.popupmenu.label.editDashboard" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>				
			</TR>
			<%
			}
			%>			
			<% if ( isBRSEnabled ) 
			{
			%>
			<TR id="createDesign" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
				<TD nowrap="nowrap" style="padding-left:15px">
					<i class="icon-ygg-new-report" align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.createdesign"/>" ></i>				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">
					<bean:message bundle="iportalResources" key="files.popupmenu.label.createdesign" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>
			</TR>
			
			<TR id="editDesign" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
				<TD nowrap="nowrap" style="padding-left:15px">
					<i class="icon-ygg-edit" align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.editDesign"/>" ></i></TD>
				<TD nowrap="nowrap" style="padding:5px" style="padding:5px; font-family: 'Source Sans Pro'">
					<bean:message bundle="iportalResources" key="files.popupmenu.label.editDesign" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>
			</TR>
			<%
				}
			%>
			
			<% if ( isQueryEnabled ) 
			{
			%>
			<TR id="createQuery" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
				<TD nowrap="nowrap" style="padding-left:15px">
					<img src="<html:rewrite page="/iportal/activePortal/images/createQueryIcon.gif"/>" align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.createquery"/>" >				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">
					<bean:message bundle="iportalResources" key="files.popupmenu.label.createquery" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>
			</TR>
			<TR id="editQuery" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
				<TD nowrap="nowrap" style="padding-left:15px">
					<i class="icon-ygg-edit" align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.editQuery"/>" ></i>				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">
					<bean:message bundle="iportalResources" key="files.popupmenu.label.editQuery" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>
			</TR>
			<TR id="executeQuery" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
				<TD nowrap="nowrap" style="padding-left:15px">
					<i class=" icon-ygg-play"  align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.executeQuery"/>" ></i>				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">
					<bean:message bundle="iportalResources" key="files.popupmenu.label.executeQuery" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>
			</TR>
			<TR id="scheduleQuery" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
				<TD nowrap="nowrap" style="padding-left:15px">
					<i class=" icon-ygg-calendar"  align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.scheduleQuery"/>" ></i>				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">
					<bean:message bundle="iportalResources" key="files.popupmenu.label.scheduleQuery" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>
			</TR>
			<%
			}
			%>
			<TR id="newImmediateJob" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
				<TD nowrap="nowrap" style="padding-left:15px">
					<i class=" icon-ygg-play" align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.newImmediateJob"/>" ></i>				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">
					<bean:message bundle="iportalResources" key="files.popupmenu.label.newImmediateJob" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>
			</TR>

			<TR id="newEssImmediateJob" class="popupMenuItem" onMouseOver="scheduleSubMenu(this, 'viewFormatSubMenu')" onMouseOut="highlightItem(this, false, 'viewFormatSubMenu')">
				<TD nowrap="nowrap" style="padding-left:15px">
					<i class=" icon-ygg-play" align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.newEssImmediateJob"/>" ></i>				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">
					<bean:message bundle="iportalResources" key="files.popupmenu.label.newEssImmediateJob" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<INPUT TYPE="image" src="<%=contextPath%>/iportal/common/images/arrow__r.gif" />
				</TD>
			</TR>

			<TR id="newSyncPersistJob" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
				<TD nowrap="nowrap" style="padding-left:15px">
					<i class="icon-ygg-preview" align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.newSyncPersistJob"/>" ></i>				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">
					<bean:message bundle="iportalResources" key="files.popupmenu.label.newSyncPersistJob" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>
			</TR> 
						
			<TR id="newBackgroundJob" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
				<TD nowrap="nowrap" style="padding-left:15px">
					<i class=" icon-ygg-calendar"  align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.newBackgroundJob"/>" ></i>				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">
					<bean:message bundle="iportalResources" key="files.popupmenu.label.newBackgroundJob" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>
			</TR>
			<TR id="createParameterValueFile" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
				<TD nowrap="nowrap" style="padding-left:15px">
					<i class="icon-ygg-file-parameter"  align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.createParameterValueFile"/>" ></i>				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">
					<bean:message bundle="iportalResources" key="files.popupmenu.label.createParameterValueFile" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>
			</TR>
			<logic:equal name="userinfobean" property="featureOptionsBean.downloadFileSubfeature" value="true">
				<TR id="download" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
					<TD nowrap="nowrap" style="padding-left:15px">
						<i class="icon-ygg-download" align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.download"/>" ></i>					
					</TD>
					<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">
						<bean:message bundle="iportalResources" key="files.popupmenu.label.download" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</TD>
				</TR>
			</logic:equal>
			<logic:equal name="userinfobean" property="featureOptionsBean.shareFileSubfeature" value="true">
				<TR id="share" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
					<TD nowrap="nowrap" style="padding-left:15px">
						<i class="icon-ygg-share" align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.share"/>" ></i>					
					</TD>
					<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">
						<bean:message bundle="iportalResources" key="files.popupmenu.label.share" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</TD>
				</TR>
			</logic:equal>
			<TR id="details" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
				<TD nowrap="nowrap" style="padding-left:15px">
					<i class="icon-ygg-details" align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.details"/>" ></i>				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">
					<bean:message bundle="iportalResources" key="files.popupmenu.label.details" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>
			</TR>
			<TR id="move" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
				<TD nowrap="nowrap" style="padding-left:15px">
					<i class="icon-ygg-move" align="top" alt="move" ></i>				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">
					<bean:message bundle="iportalResources" key="files.popupmenu.label.move" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>
			</TR>
			<TR id="copy" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
				<TD nowrap="nowrap" style="padding-left:15px">
					<i class=" icon-ygg-copy" align="top" alt="Copy" ></i>				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">
					<bean:message bundle="iportalResources" key="files.popupmenu.label.copy" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>
			</TR>
			<TR id="rename" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
				<TD nowrap="nowrap" style="padding-left:15px">
					<i class=" icon-ygg-rename" align="top" alt="Copy" ></i>				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">
					<bean:message bundle="iportalResources" key="files.popupmenu.label.rename" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>
			</TR>
			<TR id="archive" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
				<TD nowrap="nowrap" style="padding-left:15px">
					<i class="icon-ygg-auto-archive"  align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.autoarchive"/>" ></i>				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family: 'Source Sans Pro'">
					<bean:message bundle="iportalResources" key="files.popupmenu.label.autoarchive" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>
			</TR>
			<TR id="delete" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
				<TD nowrap="nowrap" style="padding-left:15px">
					<i class="icon-ygg-close-circle red" align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.delete"/>" ></i>				
				</TD>
				<TD nowrap="nowrap" style="padding:5px; font-family:'Source Sans Pro'" >
					<bean:message bundle="iportalResources" key="files.popupmenu.label.delete" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</TD>
			</TR>
			
			<%
				if (StaticFuncs.enableFacebook() != null
							&& StaticFuncs.enableFacebook().equalsIgnoreCase("true")) 
				{
			%>
				<TR id="facebookComments" class="popupMenuItem" onMouseOver="highlightItem(this, true)" onMouseOut="highlightItem(this, false)" onClick="performAction(this)">
					<TD nowrap="nowrap" style="padding-left:15px">
						<img src="<html:rewrite page="/iportal/activePortal/private/skins/treeview/images/facebook_enable.gif"/>" align="top" alt="<bean:message bundle="iportalResources" key="files.popupmenu.label.facebookComments"/>" >					
					</TD>
					<TD nowrap="nowrap"style="padding:5px; font-family: 'Source Sans Pro'">					
						<bean:message bundle="iportalResources" key="files.popupmenu.label.facebookComments" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</TD>
				</TR>
			<%
				}
			%>
	</Table>	
	</DIV>

	<!-- "viewFormatSubMenu" id is being referenced internally.  Do not change the menu id without changing the code that is referencing this(ie: js/contextmenu.js) -->
	<DIV id="viewFormatSubMenu" style="display:none;" class="popupMenu" 
			onMouseOver="enterContextMenu(false)" 
			onMouseOut="leaveContextMenu(event, false, 'viewFormatSubMenu')">
		<table>
			<%
				for ( int i = 0; i < supportedViewingMenu.length; i++ )
				{
					String[] viewingFormat = (String[])viewingFormatList.get(supportedViewingMenu[i]);
					if ( viewingFormat == null ) continue;
					for ( int formatIdx = 0; formatIdx < viewingFormat.length; formatIdx++ )
					{
							String fileType = supportedViewingMenu[i];
							String format = viewingFormat[formatIdx].toUpperCase();
							String formatKey = "output.document.format." + format;
						boolean isLocalized = StaticFuncs.isLocalizedFileType(format);
			%>
						<tr id="viewFormat_<%= fileType %>_<%= format %>" 
							class="popupMenuItem" 
							onMouseOver="highlightItem(this, true)" 
							onMouseOut="highlightItem(this, false)" 
							onClick="performeSSSubMenuAction(this, '<%= format %>', 'viewFormatSubMenu')">
								<td nowrap="nowrap" style="padding:5px">
									<%
									if(isLocalized)
									{
									%>
										<bean:message bundle="iportalResources" key="<%= formatKey %>" />
									<%
									}
									else
									{
									%>
										<%=format%>
									<%
										}
									%>
								</td>
						</tr>
					<%
						}
							}
					%>	
		</table>
	</DIV>

	<DIV id="viewFormatMenu" style="display:none;" class="popupMenu" 
			onMouseOver="enterContextMenu(true)" 
			onMouseOut="leaveContextMenu(event, true, 'viewFormatMenu')">
		<table>
			<%
				for ( int i = 0; i < supportedViewingMenu.length; i++ )
				{
					String[] viewingFormat = (String[])viewingFormatList.get(supportedViewingMenu[i]);
					if ( viewingFormat == null ) continue;
					for ( int formatIdx = 0; formatIdx < viewingFormat.length; formatIdx++ )
					{
						String fileType = supportedViewingMenu[i];
						String format = viewingFormat[formatIdx].toUpperCase();
						String formatKey = "output.document.format." + format;
						boolean isLocalized = StaticFuncs.isLocalizedFileType(format);
			%>
						<tr id="viewFormat_<%= fileType %>_<%= format %>" 
							class="popupMenuItem" 
							onMouseOver="highlightItem(this, true)" 
							onMouseOut="highlightItem(this, false)" 
							onClick="performeSSAction(this, '<%= format %>', 'viewFormatMenu')">
								<td nowrap="nowrap" style="padding:5px">
									<%
									if(isLocalized)
									{
									%>
										<bean:message bundle="iportalResources" key="<%= formatKey %>" />
									<%
									}
									else
									{
									%>
										<%=format%>
									<%
										}
									%>
								</td>
						</tr>
					<%
						}
							}
					%>	
		</table>
	</DIV>
	
	<DIV id="viewFileMenu" style="display:none;" class="popupMenu" 
			onMouseOver="enterContextMenu(true)" 
			onMouseOut="leaveContextMenu(event, true, 'viewFileMenu')" >
		<table>
			<%
				for (int i = 0; i < supportedFileMenus.length; i++) {
						String menu = supportedFileMenus[i];
						if (menu == null || (menu != null && menu.length() == 0))
						{
						    continue;
						}
						String formatKey = "files.popupmenu.label."
								+ menu.toLowerCase();
			%>
				<tr id="viewFileMenu_<%=menu%>"
					class="popupMenuItem" 
					onMouseOver="selectFileMenuItem(this, true)"
					onMouseOut="selectFileMenuItem(this, false)"
					onClick="performFileMenuAction(this, '<%=menu%>', 'viewFileMenu')">
					<td nowrap="nowrap" style="padding:5px">
						<% 
						if( "createDesign".equalsIgnoreCase(menu) )
						{ 
						%>
							<i class="icon-ygg-new-report"
								align="top"
								alt='<bean:message bundle="iportalResources" key="<%= formatKey %>"/>' ></i>
						<%
						}
						else if( "createQuery".equalsIgnoreCase(menu) )
						{ 
						%>
							<img src='<html:rewrite page="/iportal/activePortal/images/filetypes/query_def16x16.gif" />'
								align="top"
								alt='<bean:message bundle="iportalResources" key="<%= formatKey %>"/>' >
						<%
						}
						else if( "download".equalsIgnoreCase(menu) )
						{ 
						%>
							<i class="icon-ygg-download"
								align="top"
								alt="<bean:message bundle="iportalResources" key="<%= formatKey %>"/>" ></i>
						<%
						}
						else if( "share".equalsIgnoreCase(menu) )
						{ 
						%>
							<i class="icon-ygg-share"
								align="top"
								alt="<bean:message bundle="iportalResources" key="<%= formatKey %>"/>" ></i>
						<%
						}
						else if( "details".equalsIgnoreCase(menu) )
						{ 
						%>
							<i class="icon-ygg-details"
								align="top"
								alt="<bean:message bundle="iportalResources" key="<%= formatKey %>"/>" ></i>
						<%
						}
						else if( "delete".equalsIgnoreCase(menu) )
						{ 
						%>
							<i class="icon-ygg-close-circle red"
								align="top"
								alt="<bean:message bundle="iportalResources" key="<%= formatKey %>"/>" ></i>
						<%
						} 
						%>					
					</td>
					<td nowrap="nowrap" style="padding:5px">
							<bean:message bundle="iportalResources" key="<%= formatKey %>" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</td>
				</tr>
			<%
				}
			%>
		</table>
	</DIV>

	<!-- "viewVolumeListMenu" id is being referenced internally.  Do not change the menu id without changing the code that is referencing this(ie: js/contextmenu.js) -->
	<DIV id="viewVolumeListMenu" style="display:none;" class="popupMenu" 
			onMouseOver="enterContextMenu(true)" 
			onMouseOut="leaveContextMenu(event, true, 'viewVolumeListMenu')">
		<table>
			<%
					String[] viewVolumeList = (String[])com.actuate.iportal.utils.Utility.getVolumeNames( request, userinfobean );
			
					if ( viewVolumeList != null ) {
					
						for ( int viewVolumeListIdx = 0; viewVolumeListIdx < viewVolumeList.length; viewVolumeListIdx++ )
						{
								String viewVolumeName = StaticFuncs.jsEncode( viewVolumeList[viewVolumeListIdx] );
			%>
							<tr id="viewVolume_<%= viewVolumeName %>" 
								class="popupMenuItem" 
								onMouseOver="highlightItem(this, true)" 
								onMouseOut="highlightItem(this, false)" 
								onClick="performViewVolumeListMenuAction(this, '<%= viewVolumeName %>', 'viewVolumeListMenu')">
									<td nowrap="nowrap" style="padding:5px">
										<%=viewVolumeName%>
									</td>
							</tr>
						<%
						}
					}
					%>	
		</table>
	</DIV>
</logic:equal>
