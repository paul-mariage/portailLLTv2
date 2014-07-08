<%-- --------------------------------------------------------------------------
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.
	
	Description:
		the small included jsp page, it's the buttons in the bottom
	
	Supported URL parameters:
		
-------------------------------------------------------------------------- --%>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="com.actuate.reportcast.utils.*, 
				com.actuate.iportal.utils.Utility,
				com.actuate.reportcast.common.AcConstants,
				com.actuate.activeportal.forms.SubmitJobActionForm,
				com.actuate.iportal.session.iPortalRepository,
				com.actuate.schemas.*" %>



<%-- TAG LIBRARIES ------------------------------------------------------- --%>
<%@ taglib uri="/struts-bean" prefix="bean" %>
<%@ taglib uri="/struts-html" prefix="html" %>
<%@ taglib uri="/struts-logic" prefix="logic" %>
<%@ include file="/iportal/activePortal/common/initCommonParam.jsp" %>

<%-- --------------------------------------------------------------------------
	Save the form name into the request.  This is a workaround for the 
	"No getter method for property name of bean org.apache.struts.taglib.html.FORM"
-------------------------------------------------------------------------- --%>
<%
	request.setAttribute("currentFormName", "AcSubmitJobActionForm");

	SubmitJobActionForm form = (SubmitJobActionForm)session.getAttribute("AcSubmitJobActionForm");
	String selectedTab = form.getSelectedTab();
	
	boolean backDisabled = selectedTab.equals("0");
	boolean nextDisabled = false;
	if(Integer.parseInt(selectedTab) == (form.getTotalTabs() - 1))
		nextDisabled = true;
		
	String conversionJob = (String) request.getAttribute("conversion");
	
	String fileType = form.getExecutableFileType();
	boolean isDataMartFile = StaticFuncs.isDataMartFile(fileType);
	String resourceFolder = form.getResourceFolder();
	boolean openInNewWindow = userinfobean.isViewInNewBrowserWindow();
	
	String sUserEnv = paramBean.getParameter("__userenv");
	
%>
<SCRIPT>

// Checks if "select-multiple" elements have something selected. 
// If not, asks user if that's intended.
function validateSelectMultiple(doc)
{

<%
//TED3340 and SCR97768.  validate multi-value only for conversion job
if ("true".equalsIgnoreCase(conversionJob))
{
%>
	var obj = doc.getElementsByTagName('select');
	var defaultName = "<bean:message bundle='iportalResources' key='validation.default.listbox'  locale='<%=AcConstants.CURRENT_JAVA_LOCALE %>' />";
	var warnMsg = "<bean:message bundle='iportalResources' key='validation.message.warning' locale='<%=AcConstants.CURRENT_JAVA_LOCALE %>' />";

	// No select element is found in the document.
	if ( !obj || !obj[0] ) return true;

	var outputFormat = obj[0].value;
	
	var shouldHaveMultipleSelect = ( outputFormat == "CSV" || outputFormat == "TSV" || outputFormat == "PSV");
	var foundMultiSelectControl = false;

	for (i=0; i<obj.length; i++)
	{
		var elem = obj[i];
		// Process only select-multiple elements
		if(elem.type == "select-multiple")
		{
			var selected = false;
			foundMultiSelectControl = true;
			for (j=0; j<elem.options.length; j++)
			{
				if(elem.options[j].selected)
				{
					selected = true;
					break; // We got what we wanted to know.
				}
			}
			if(selected == false)
			{
				var name = elem.title;
				
				if(typeof(name) == "undefined" || name == "")
					name = defaultName; // To maintain compatibility with select-multiple elements without "title"
				if(confirm( name + warnMsg))
					return true; // User doesn't want anything selected.
				else
					return false; // User wants to fix things...
			}
		}		
	}
	if( shouldHaveMultipleSelect == true && foundMultiSelectControl == false)
	{
		var noColumnWarnMsg = "<bean:message bundle='iportalResources' key='validation.noColumn.warning' locale='<%=AcConstants.CURRENT_JAVA_LOCALE %>' />";
		if(confirm( noColumnWarnMsg ))
			return true; // User doesn't want anything selected.
		else
			return false; // User wants to fix things...
	}
<%
}
%>
	return true; // Everything's fine...
}

function validateFolder(folder)
{
<%
if (isDataMartFile)
{
    String msgWrongFolder = Utility.getJsMessage(pageContext, "ERR_WRONG_FOLDER_SCHEDULE_DATADESIGN", null);
%>
	var isFolderValid = true;
<%--	var resourceFolder = '<%= StaticFuncs.jsEncode(resourceFolder) %>';
	var parentFolderLength = resourceFolder.length;
	//folder has to be under '/Resources' folder
	if (folder == null)
	{
		isFolderValid = false;
	}
	else
	{
		folder = trim(folder);
		var lowerCaseFolder = folder.toLowerCase();		
		var index = lowerCaseFolder.indexOf(resourceFolder.toLowerCase()); 
		if (index != 0)
		{
			//folder path has to start with '/Resources'
			isFolderValid = false;
		}
		else 
		{
			if (lowerCaseFolder.length > parentFolderLength)
			{
				//it is valid to have a subfolder under '/Resources'.
				//For example, '/Resources/' and '/Resources/re' are valid folders 
				//it is not valid if the folder is like '/Resources123'
				var subFolder = lowerCaseFolder.substring(parentFolderLength);
				index = subFolder.indexOf('/');
				if (index != 0)
				{
					isFolderValid = false;
				}
			}

		}
	}
	if (isFolderValid == false)
	{
		alert('<%= msgWrongFolder %>');
	} --%>
	return isFolderValid;

<%
}	
%>
}

function validateVersion()
{
	var form = document.AcSubmitJobActionForm;
	if (form.exeVersionOption){
		if (form.exeVersionOption[1].checked == true) {		
			if (form.txtVersion){
				
				var version = form.txtVersion.value
				if (isNaN(version) || version < 1) {
					alert( "<bean:message bundle="iportalResources" key="ERROR_VERSION_NO" locale="<%= AcConstants.CURRENT_JAVA_LOCALE %>" />" );
					form.txtVersion.focus();
					form.txtVersion.select();
					return false;
				}
			}
		}
	}
	return true;
}

function changeTabs(curTab, totalTabs, command)
{
	var form = document.AcSubmitJobActionForm;
	/**if (form.absFolder)
	{
		var isFolderValid = validateFolder(form.absFolder.value);
		if (isFolderValid == false)
		{
			return;
		}
	}**/

	if (validateVersion() == false) {
		return;
	}
	/*
	if (form.txtVersion){
		
		var version = form.txtVersion.value
		if (isNaN(version) || version < 1) {
			alert( "<bean:message bundle="iportalResources" key="ERROR_VERSION_NO" locale="<%= AcConstants.CURRENT_JAVA_LOCALE %>" />" );
			form.txtVersion.focus();
			return;
		}
	}
	*/
	if(command == "next")
	{
	//check if the current tab is not the last tab
		if(curTab <= (totalTabs-2))
		{
			form.selectedTab.value = Number(curTab) + 1
			struts_submitJob(document, false);
		}
	}
	else if(command == "back")
	{
	//check if the current tab is not the first tab
		if(curTab != 0)
		{
			form.selectedTab.value = Number(curTab) - 1
			struts_submitJob(document, false);
		}
	}
	else if(command == "finish")
	{
		// Check for select-multiple validity before submitting job
		var openInNewWindow = "<%= openInNewWindow %>";
		var formName = "AcSubmitJobActionForm";
		setOrCreateHiddenField(formName, "<%= IPortalConsts.HTTP_REQ_PARAM_NEW_WINDOW %>", openInNewWindow);
		setOrCreateHiddenField(formName, "__userenv", "<%= sUserEnv %>" );
		if(validateSelectMultiple(document)) {
			struts_submitJob(document, true);
		}
	}
}
</SCRIPT>


<%-- --------------------------------------------------------------------------
	HTML
-------------------------------------------------------------------------- --%>
<TABLE border="0" width="20%" cellspacing="0" cellpadding="0" class="actuateButtonContainer">
	<TR>
		<TD width="5%" style="padding-left: 13px;">	
			<table class="ICButton_On NewRequestButton_On" cellspacing="0px" cellpadding="0px" border="0px">
				<tr>
					<td>
					<%
					if( "tabletapp".equals(sUserEnv) )
					{
					%>
						<html:button styleClass="btn" onclick="window.location = 'removeRecent://removeRecent';" property="Cancel">
							<bean:message bundle="iportalResources" key="query.create.button.cancel" locale="<%= AcConstants.CURRENT_JAVA_LOCALE %>" />
						</html:button>
					<%
					}
					else if( "tablet".equals(sUserEnv) )
					{
					%>
						<html:button styleClass="btn" onclick="window.history.back();" property="Cancel">
							<bean:message bundle="iportalResources" key="query.create.button.cancel" locale="<%= AcConstants.CURRENT_JAVA_LOCALE %>" />
						</html:button>
					<%
					}
					else
					{
					%>	
						<html:button styleClass="btn" onclick="window.close()" property="Cancel">
							<bean:message bundle="iportalResources" key="query.create.button.cancel" locale="<%= AcConstants.CURRENT_JAVA_LOCALE %>" />
						</html:button>			
					<%
					}
					%>	
					</td>
				</tr>
			</table>		
		</TD>
		<TD width="5%" style="padding-left: 10px;">
			<%
				String changingTabsBack = "javascript:changeTabs('" + Integer.parseInt(selectedTab) + "', '" + form.getTotalTabs()+ "', '" + "back" + "');";
			%>
		
			<%
				if(backDisabled) {
			%>
				<table class="ICButton_Off NewRequestButton_Off" cellspacing="0px" cellpadding="0px" border="0px">
					<tr>
						<td>
							<html:button styleClass="btn disabled" disabled="disabled" property="Back">
								<bean:message bundle="iportalResources" key="query.create.button.back" locale="<%= AcConstants.CURRENT_JAVA_LOCALE %>"  />
							</html:button>
						</td>
					</tr>
				</table>
			<%
				} else {
			%>
		 		<table class="ICButton_On NewRequestButton_On" cellspacing="0px" cellpadding="0px" border="0px">
					<tr>
						<td>
							<html:button styleClass="btn" onclick="<%= changingTabsBack %>" property="Back">
								<bean:message bundle="iportalResources" key="query.create.button.back" locale="<%= AcConstants.CURRENT_JAVA_LOCALE %>"  />
							</html:button>
						</td>
					</tr>
				</table>
			<%
				}
			%>
		</TD>

		<TD width="5%" style="padding-left: 10px;">
			<%
			String changingTabsNext = "javascript:changeTabs('" + Integer.parseInt(selectedTab) + "', '" + form.getTotalTabs()+ "', '" + "next" + "');";
			%>
			<%
				if(nextDisabled) {
			%>
				<table class="ICButton_Off NewRequestButton_Off" cellspacing="0px" cellpadding="0px" border="0px">
					<tr>
						 <td>
							<html:button styleClass="btn disabled"  disabled="disabled" property="Next">
								<bean:message bundle="iportalResources" key="query.create.button.next" locale="<%= AcConstants.CURRENT_JAVA_LOCALE %>" />
							</html:button>
						</td>
					</tr>
				</table>
			<%
				} else {
			%>
		 		<table class="ICButton_On NewRequestButton_On " cellspacing="0px" cellpadding="0px" border="0px">
					<tr>
						<td>
							<html:button styleClass="btn btn-primary" onclick="<%= changingTabsNext %>" property="Next">
								<bean:message bundle="iportalResources" key="query.create.button.next" locale="<%= AcConstants.CURRENT_JAVA_LOCALE %>" />
							</html:button>
						</td>
					</tr>
				</table>
			<%
				}
			%>			
		</TD>
		<TD width="5%" style="padding-left: 10px;">
			<%
			String changingTabsFinish = "javascript:changeTabs('" + Integer.parseInt(selectedTab) + "', '" + form.getTotalTabs()+ "', '" + "finish" + "');";
			String highlightFinish = request.getParameter("highlightFinish");
			if (highlightFinish == null || "false".equals(highlightFinish)) 
			{
			%>
		 		<table class="ICButton_On NewRequestButton_On" cellspacing="0px" cellpadding="0px" border="0px">
					<tr>
						<td>
							<html:button styleClass="btn" onclick="<%= changingTabsFinish %>" property="Finish">
								<bean:message bundle="iportalResources" key="query.create.button.finish" locale="<%= AcConstants.CURRENT_JAVA_LOCALE %>" />
							</html:button>
						</td>
					</tr>
				</table>
			<%
			}
			else 
			{
				%>
		 		<table class="ICButton_On NewRequestButton_On" cellspacing="0px" cellpadding="0px" border="0px">
					<tr>
						<td>
							<html:button styleClass="btn btn-primary" onclick="<%= changingTabsFinish %>" property="Finish">
								<bean:message bundle="iportalResources" key="query.create.button.finish" locale="<%= AcConstants.CURRENT_JAVA_LOCALE %>" />
							</html:button>
						</td>
					</tr>
				</table>
			<%	
			}
			%>
		</TD>
	</TR>
</TABLE>
