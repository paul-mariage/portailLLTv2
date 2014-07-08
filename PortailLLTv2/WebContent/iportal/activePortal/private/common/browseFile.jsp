<%-- --------------------------------------------------------------------------
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.
	
	Description:
		included by browse.jsp
-------------------------------------------------------------------------- --%>

<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="com.actuate.reportcast.utils.*,
				 com.actuate.iportal.utils.Utility,
				 org.apache.struts.taglib.TagUtils,
				 com.actuate.activeportal.forms.BrowseFileActionForm,
				 org.apache.struts.Globals" %>
<%@ page import="java.util.StringTokenizer" %>

<%-- TAG LIBRARIES ------------------------------------------------------- --%>
<%@ taglib uri="/struts-bean" prefix="bean" %>
<%@ taglib uri="/struts-html" prefix="html" %>
<%@ taglib uri="/struts-logic" prefix="logic" %>
<%@ taglib uri="/actabpanel" prefix="ap" %>

<%-- --------------------------------------------------------------------------
	Expected JavaBeans:
-------------------------------------------------------------------------- --%>
<%@ include file="/iportal/activePortal/common/initCommonParam.jsp" %>

<jsp:useBean id="browseFileActionForm" 
	class="com.actuate.activeportal.forms.BrowseFileActionForm" 
	scope="request"/>
<jsp:useBean id="listOfFolders" class="java.util.Vector" scope="request"/>
<jsp:useBean id="listOfFiles" class="java.util.Vector" scope="request"/>


<bean:size id="folderCount" name="listOfFolders"/>
<bean:size id="fileCount" name="listOfFiles"/>

<%
	IPortalFileTypeManager ftm = IPortalFileTypeManager.instance();
	String searchTypeOfFile = paramBean.getParameter("searchTypeOfFile");
	searchTypeOfFile = searchTypeOfFile == null? "": searchTypeOfFile;
	String browseType =  StaticFuncs.jsEncodeNonXSS(browseFileActionForm.getBrowseType(), null);
	String from =  StaticFuncs.jsEncodeNonXSS(browseFileActionForm.getFrom(), null);
	
	String selectedItem = StaticFuncs.jsEncodeNonXSS(browseFileActionForm.getFileName(), null);
	boolean isDataMartFile = StaticFuncs.isDataMartFile(browseFileActionForm.getFileType());
	boolean useFileNameOnly = browseFileActionForm.isBrowseFileOnly() && isDataMartFile && AcConstants.REQUESTPAGE.equalsIgnoreCase(from);
	if (useFileNameOnly)
	{
	    //datamart gui from requester page does not need to show folder name
		selectedItem = "";
	}
	  
	String currentWorkingFolder = StaticFuncs.jsEncodeNonXSS(browseFileActionForm.getWorkingFolder(), "");

%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<head>
	<title>
		<%= com.actuate.reportcast.utils.StaticFuncs.htmlEncode(com.actuate.iportal.utils.Utility.getCustomTitle( pageContext, null, "TTL_FOLDER_BROWSER",  null )) %>
	</title>

	<META http-equiv="Content-Type" content="text/html; charset=unicode">
	<LINK href="<html:rewrite page="/common/jslib/themes/default/yggdrasil.css"/>" type="text/css" rel="stylesheet" >
	<LINK href="<html:rewrite page="/common/jslib/themes/default/jslibapi.css"/>" type="text/css" rel="stylesheet" >
	<logic:equal name="userinfobean" property="userAgent.NS4" value="false">
		<LINK href="<html:rewrite page="/css/allstyles.css"/>" type="text/css" rel="stylesheet">
		<LINK href="<ap:skinResource resource="/css/skinstyles.css" />" type="text/css" rel="stylesheet" >
		<STYLE>
			<bean:write name="userinfobean" property="skinConfig.cssCode" />
		</STYLE>
	</logic:equal>
	<logic:equal name="userinfobean" property="userAgent.NS4" value="true">
		<LINK href="<html:rewrite page="/css/allstylesns4.css"/>" type="text/css" rel="stylesheet">
	</logic:equal>	
	<script language="JavaScript" src="js/encoder.js"></script>
	<script language="javascript" src="js/allscripts.js"></script>

	<script>
		function clearFilter()
		{
			var theForm = document.forms['browseFileActionForm'];
			if (!window.opener.closed)
			{
				if(document.layers)
				{
					theForm.elements[0].value = '';
				}
				else
				{
					theForm.filter.value = '';
				}
				
				theForm.submit();
			}
			else
			{
				window.close();
			}
		}
		<%
		String noFileSelectedMsg = Utility.getJsMessage(pageContext, "ERR_NO_FILE_SELECTED", null);
		String noFolderSelectedMsg = Utility.getJsMessage(pageContext, "ERR_NO_FOLDER_SELECTED", null);

		%>

		function updateFileName()
		{
			var theForm = document.forms['browseFileActionForm'];
			var useFileNameOnly = <%= useFileNameOnly %>;
			if (!window.opener.closed)
			{
				var fName = theForm.fileName.value;
				var fType = theForm.selectedItemType.value;
				if ( ( theForm.searchTypeOfFile.value != "<%= BrowseFileActionForm.TYPE_DIRECTORY %>" ) && 
				     ( fType == "<%= BrowseFileActionForm.TYPE_DIRECTORY %>" ) )
				{
					alert("<%= noFileSelectedMsg %>");	
				}
				else if( fName == "")
				{
					alert("<%= noFolderSelectedMsg %>");
				}
				else
				{
					if (useFileNameOnly)
					{
						//need to strip file type and version
						fName = stripExtension(fName);
					}
					parent.opener.updateSelect(fName, theForm.targetFormName.value, '<%= browseType %>');
					window.close();
				}
			}
			else
			{
				window.close();
			}
		}
		
		function UpdateSelectedFile(selectedItem)
		{
			var theForm = document.forms['browseFileActionForm'];
			var useFileNameOnly = <%= useFileNameOnly %>;
			theForm.selectedItem.value = selectedItem;
			var fileName = selectedItem;
			if (useFileNameOnly == false)
			{
				var basePath = theForm.workingFolder.value;
	
				// Check if the last character of the base path contains a slash. If not, add one.
				if ( basePath.charAt(basePath.length - 1) != '/' )
				{
					basePath += "/";
				}
				fileName = basePath + theForm.selectedItem.value;
			}	
			theForm.fileName.value = fileName;
			theForm.selectedItemType.value = "<%= BrowseFileActionForm.TYPE_FILE %>";
		}
		
		function browseFolder(selectedItem)
		{
			var theForm = document.forms['browseFileActionForm'];
			theForm.selectedItem.value = selectedItem;
			var basePath = theForm.workingFolder.value;

			// Check if the last character of the base path contains a slash. If not, add one.
			if ( basePath.charAt(basePath.length - 1) != '/' )
			{
				basePath += "/";
			}

			theForm.fileName.value = basePath + theForm.selectedItem.value;
			
			theForm.selectedItemType.value = "<%= BrowseFileActionForm.TYPE_DIRECTORY %>";		
			theForm.submit();
		}

	</script>
	<style>
		.ac select,
		.ac textarea,
		.ac input[type="text"],
		.ac input[type="password"],
		.ac input[type="datetime"],
		.ac input[type="datetime-local"],
		.ac input[type="date"],
		.ac input[type="month"],
		.ac input[type="time"],
		.ac input[type="week"],
		.ac input[type="number"],
		.ac input[type="email"],
		.ac input[type="url"],
		.ac input[type="search"],
		.ac input[type="tel"],
		.ac input[type="color"],
		.ac .uneditable-input {
		  margin-bottom : 0px
		}
	</style>
</head>


<BODY class="<%=com.actuate.web.jslib.Utility.CSS_WRAPPER_CLASS%>" style="background: none">

	<html:form action="/browsefile" method="post">
		<%@ include file="/iportal/activePortal/private/common/commonParam.jsp" %>

		<html:hidden property="selectedItem"/>
		<html:hidden property="workingFolder"/>
		<html:hidden property="searchTypeOfFile"/>
		<html:hidden property="selectedItemType"/>
		<html:hidden property="targetFormName"/>
	
		<TABLE width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">
		
			<TR>
				<TD valign="top" height="15%">
					<TABLE class="breadcrumbs" border="0" width="100%" cellspacing="0" cellpadding="5">
						<TR>
							<TD class="breadcrumb" style="background: none">
								<DIV class="hyperlink">
									<logic:iterate id="breadcrumb" indexId="index" type="com.actuate.activeportal.beans.LinkBean"
										name="breadcrumbs">				
										<logic:greaterThan name="index" value="0">
											<span class="divider">
												<i class="icon-ygg-chevron-right"></i>
											</span>
										</logic:greaterThan>
										<%= breadcrumb %>
									</logic:iterate>
								</DIV>
							</TD>
						</TR>
					</TABLE>
	
	
					<table border="0" width="100%" cellspacing="0" cellpadding="8" class="panel">
						<tr>
							<td nowrap="nowrap">
								<table border="0" cellspacing="0" cellpadding="0" >
									<tr>
										<td class="filterLabel">
												<bean:message bundle="iportalResources" key="LBL_FILTER"/>
										</td>
										<td style="padding-left: 2pt;">
											<html:text size="17" property="filter"/>
										</td>				

										<td  style="padding-left: 4pt;">
											<html:button property="fntFilterElements" styleClass="btn" onclick="javascript:clearFilter()">
												&nbsp;&nbsp;<bean:message bundle="iportalResources" key="BTN_CLEAR"/>&nbsp;&nbsp;
											</html:button>
										</td>

                                        <td style="padding-left: 10pt;">
                                            <html:submit property="fntFilterElements" styleClass="btn btn-primary">
                                                &nbsp;&nbsp;<bean:message bundle="iportalResources" key="BTN_APPLY"/>&nbsp;&nbsp;
                                            </html:submit>
                                        </td>										
									</tr>
								</table>
							</td>
						</tr>
					</table>
	
				</TD>
			</TR>
		
			<TR>
				<TD valign="top" height="70%">
	
	
					<table border="0" width="100%" cellspacing="0" cellpadding="3">
						<logic:greaterThan name="folderCount" value="0">
							<tr valign="top">
								<td>
									<%	int nColumns = 3;
										int colWidth = 100 / nColumns;
									 %>
									<table width="100%" border="0">
										<logic:iterate id="folder" type="com.actuate.schemas.File" indexId="index" collection="<%= listOfFolders %>">
											<% if (0 == (index.intValue()%nColumns)) out.println("<tr valign=top>"); %>
												<td width="<%=colWidth%>%" nowrap="nowrap">
													<img src="<html:rewrite page="/iportal/activePortal/images/foldericon.png"/>" width="15" height="13">
													<a href="javascript: browseFolder('<%= StaticFuncs.jsEncode(folder.getName()) %>');" 
														class="hyperlink">
														<bean:write name="folder" property="name"/>
													</a>
												</td>
											<% if ((nColumns - 1) == (index.intValue() % nColumns)) out.println("</tr>"); %>
										</logic:iterate>
										<% if ((folderCount.intValue()%nColumns) > 0 ) out.println("</tr>"); %>
									</table>
								</td>
							</tr>
						</logic:greaterThan>
		

						<logic:greaterThan name="fileCount" value="0">
							<tr valign="top">
								<td>
									<%	int nColumns = 3;
										int colWidth = 100 / nColumns;
									 %>
									<table width="100%" border="0">
										<logic:iterate id="fileItem" type="com.actuate.schemas.File" indexId="indexfileCount" collection="<%= listOfFiles %>">
									  		<% String smallIconURL = ftm.getFileTypeSmallIconURL(acLocale,userinfobean.getServerurl(),
											userinfobean.getVolume(), fileItem.getFileType(), userinfobean.getAuthid());
											
											String fileName = fileItem.getName();
											if ( "ENTERPRISE".equalsIgnoreCase(userinfobean.getRepositoryType()))
											{
												fileName += ";"+String.valueOf(fileItem.getVersion());
											}
											%>			
											<% if (0 == (indexfileCount.intValue()%nColumns)) out.println("<tr valign=top>"); %>
												<td width="<%=colWidth%>%" nowrap="nowrap">
													<img src="<html:rewrite page="<%= smallIconURL %>"/>" border="0" align="down" style="height: 24px;">
													<a href="javascript: UpdateSelectedFile('<%= StaticFuncs.jsEncode(fileName) %>');" class="hyperlink">
														<bean:write name="fileItem" property="name" />
														<% if ( "ENTERPRISE".equalsIgnoreCase(userinfobean.getRepositoryType()))
														{ %>
														(<bean:message bundle="iportalResources" key="file.list.label.version" />
														<bean:write name="fileItem" property="version" />)
														<% } %>
													</a>
												</td>
											<% if ((nColumns - 1) == (indexfileCount.intValue() % nColumns)) out.println("</tr>"); %>
										</logic:iterate>
										<% if ((fileCount.intValue()%nColumns) > 0 ) out.println("</tr>"); %>
									</table>
								</td>
							</tr>
						</logic:greaterThan>

						<logic:lessEqual name="folderCount" value="0">
							<logic:lessEqual name="fileCount" value="0">
								<tr>
									<td valign="top">
										<table border="0" width="100%" cellspacing="7" cellpadding="7" >
											<tr>
												<td>
												<bean:message bundle="iportalResources" key="LBL_NO_SUBFOLDERS" arg0="<%= currentWorkingFolder %>"/>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</logic:lessEqual>
						</logic:lessEqual>
					</table>
	
	
				</TD>
			</TR>
			<TR>
				<TD valign="top" height="10%">
					<table border="0" width="100%" cellspacing="0" cellpadding="8" class="panel">
						<tr>
							<td nowrap="nowrap">
								<table border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td class="filterLabel" nowrap="nowrap">
											<bean:message bundle="iportalResources" key="LBL_SELECTED_ITEM" />
										</td>
										<td style="padding-left: 2pt;">
											<input type="text" name="fileName" value="<%= StaticFuncs.formValueEncode(selectedItem) %>" readonly="readonly" size="35"/>
										</td>
										
                                        <td style="padding-left: 4pt;" >
                                            <html:button property="fntFilterElements" styleClass="btn" onclick="window.close()">
                                                &nbsp;&nbsp;<bean:message bundle="iportalResources" key="BTN_CANCEL"/>&nbsp;&nbsp;
                                            </html:button>
                                        </td>
                                        										
										<td style="padding-left: 10pt;">
											<html:button property="fntFilterElements" styleClass="btn btn-primary" onclick="updateFileName()">
												&nbsp;&nbsp;<bean:message bundle="iportalResources" key="BTN_OK"/>&nbsp;&nbsp;
											</html:button>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</TD>
			</TR>
	
		</TABLE>
	
	</html:form>

	</body>
</html>

