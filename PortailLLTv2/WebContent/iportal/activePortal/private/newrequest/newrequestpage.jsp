<%-- --------------------------------------------------------------------------
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.
	
	Description:	
		The edit sync/async job page
	
	Supported URL parameters:
		selectedTab, used by ap:tabPanel as selectedTabParameter
		jobType=sync/async
-------------------------------------------------------------------------- --%>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="com.actuate.reportcast.utils.*, 
				com.actuate.iportal.session.iPortalRepository,
				com.actuate.schemas.*" %>

<%@ include file="/iportal/activePortal/common/initCommonParam.jsp" %>

<%-- TAG LIBRARIES ------------------------------------------------------- --%>

<%@ taglib uri="/struts-bean" prefix="bean" %>
<%@ taglib uri="/struts-html" prefix="html" %>
<%@ taglib uri="/struts-logic" prefix="logic" %>
<%@ taglib uri="/actabpanel" prefix="ap" %>

<%-- --------------------------------------------------------------------------
	Save the form name into the request.  This is a workaround for the 
	"No getter method for property name of bean org.apache.struts.taglib.html.FORM"
-------------------------------------------------------------------------- --%>
<%
	request.setAttribute("currentFormName", "AcSubmitJobActionForm");
%>

<%-- --------------------------------------------------------------------------
	Expected JavaBeans:
-------------------------------------------------------------------------- --%>
<%@page import="com.actuate.activeportal.forms.SubmitJobActionForm"%>
<%@page import="com.actuate.iportal.utils.Utility"%>

<%


	boolean isWorkgroupMode = !iPortalRepository.REPOSITORY_ENCYCLOPEDIA.equalsIgnoreCase(userinfobean.getRepositoryType());

	String jobType = paramBean.getParameter("jobType");
	if ( jobType == null )
	{
		jobType = (String)request.getAttribute("jobType");
	}
	String fName = paramBean.getParameter("__executableName");
	String windowName = paramBean.getParameter("windowName");
	String saveOutput = paramBean.getParameter("__saveOutput");
	String docId = paramBean.getParameter("__docId");
	if (docId == null || docId.trim().length() == 0){
		docId = paramBean.getParameter("__executableId");
	}
	
	if ( saveOutput == null )
	{
		saveOutput = (String)request.getAttribute("__saveOutput");
	}
	if(saveOutput == null)
		saveOutput = (String) request.getAttribute("saveOutput");

	boolean bSOI= false;
	
	String fextension = null;
	fextension = paramBean.getParameter("__filetype");

	if (fName == null)
		fName = paramBean.getParameter(AcConstants.INPUTFILE);

	if (fName != null && fextension == null)				
		fextension = StaticFuncs.getFileExtension(fName);
		
		
	if (fextension != null && fextension.compareToIgnoreCase("soi")==0 ) 
		{ 
			bSOI = true;
			// jobType can be null when soi is being viewed instead of being scheduled for
			// a conversion job.
			if ( jobType == null )
			{
				jobType = "sync";
			}
		}	
	if (jobType != null)
		pageContext.setAttribute("jobType", jobType, pageContext.SESSION_SCOPE);	// needed from the action class
	else {
		jobType = (String)pageContext.getAttribute("jobType", pageContext.SESSION_SCOPE);
		if (jobType == null) {
			jobType = "sync";
			pageContext.setAttribute("jobType",jobType,pageContext.SESSION_SCOPE);	// needed from the action class
		}
	}
	if (saveOutput != null)
	{
		pageContext.setAttribute("__saveOutput", saveOutput, pageContext.REQUEST_SCOPE);	// needed from the action class
	}
	else {
		saveOutput = (String)pageContext.getAttribute("__saveOutput", pageContext.REQUEST_SCOPE);
		//check for async job type also to prevent save as tab from showing when requester page refreshes 
		//when user selects cascading parameters while running report
		if (saveOutput == null ) {
			saveOutput = "false";
			pageContext.setAttribute("__saveOutput",saveOutput,pageContext.REQUEST_SCOPE);	// needed from the action class
		}
	}
	
	String target = "submitjob";
	String syncTarget = bSOI ? "viewsoi" : "executereport";
	
	//Check if the report has parameters
	SubmitJobActionForm form = (SubmitJobActionForm)
				session.getAttribute("AcSubmitJobActionForm");
	boolean hasParameters = false;
	boolean hasHiddenParametersOnly = false;
	if (null != form) 
	{
		//if executablename is still not found in the request then use the inputfilename from form
		//this is required so that isAlreadyRetrievedParameter() flag is set correctly from the action class.
		if( fName == null )
		{
			fName = form.getInputfile();
		}
		ParameterDefinition [] parameterDefinitions = form.getParameterDefinitions();
		ParameterValue [] parameterValues =	form.getParameters();
		if ((null != parameterDefinitions) && (null != parameterValues))
		{
			hasParameters = true;
			hasHiddenParametersOnly = Utility.checkIfOnlyHiddenParameters(parameterDefinitions);
		}
	}
	if(jobType != null && jobType.equalsIgnoreCase("sync"))
	{
		
		if(hasParameters && !hasHiddenParametersOnly)
		{
			if(saveOutput.equalsIgnoreCase("true"))
				form.setTotalTabs(2);
			else
				form.setTotalTabs(1);
		}
		else if(saveOutput.equalsIgnoreCase("true"))
		{
			form.setTotalTabs(1);
		}
			
	}
	else if(jobType != null && jobType.equalsIgnoreCase("async"))
	{
		if(hasParameters && !hasHiddenParametersOnly)
			form.setTotalTabs(3);
		else
			form.setTotalTabs(2);
	}	
		
	String advSchedulePage = "fileorFolderName="+ StaticFuncs.encode(fName) + "&fileorFolderID=" + StaticFuncs.jsEncodeNonXSS(docId, "") +"&fileType=" + fextension +"&userid=" +userinfobean.getUserid() + "&fromportal=yes&"+commonQueryString;
%>

<logic:equal name="jobType" value="sync">
	<% target = syncTarget;%>
</logic:equal>

<SCRIPT>
// function used specific to this page
var enterPressed = false;

function onSubmitValidate()
{
	if (enterPressed)
	{
		enterPressed = false;
		return false;
	}
	return true;
}

if (window.attachHelpPage)
{
	var helpDocBase = "<%= helpDocBase %>";
	var helpTopic = "NewRequest_schedule";
	var helpContext = "<%= pageContext.getAttribute("com.actuate.help.context", PageContext.APPLICATION_SCOPE) %>";
	var customizedHelpPath = "";
	var locale = "<%= javaLocale %>";
	var bOpenHelpWindow = false;
	attachHelpPage(helpDocBase, helpTopic, helpContext, customizedHelpPath, locale, bOpenHelpWindow);
}
function openAdvanceSchedule()
{
	var url = '<%=StaticFuncs.getMCContext()%>' + "/jobs/newjobs/properties.jsp?" + '<%=advSchedulePage%>';				
	window.resizeTo(1100,1100);
	window.location.href = url;
}

</SCRIPT>

<html:form action="<%=target%>" onsubmit="javascript:submitParamForm(event);"
	method="post">
<%@ include file="/iportal/activePortal/private/common/commonParam.jsp" %>


<html:hidden property="postback"/>

<html:hidden property="jobType"/>
<html:hidden property="selectedTab"/>
<html:hidden property="invokeSubmit"/>
<html:hidden property="<%= AcConstants.INPUTFILE %>"/>
<html:hidden property="changedParamterName"/>
<html:hidden property="changedConversionOptions"/>
<html:hidden property="windowName" value="<%= windowName %>"/>
<html:hidden property="__from" value="requestPage"/>
<html:hidden property="locale" value="<%= javaLocale %>" />

<%
if (docId != null)
{
%>
<html:hidden property="__executableId" value="<%= docId %>"/>
<%
}
%>

<%
if (fName != null)
{
%>
	<html:hidden property="__executableName" value="<%= fName %>"/>	
<%
}
%>

<logic:present parameter="__previewMode">
<html:hidden property="__previewMode" value="true"/>
</logic:present>
<logic:equal name="userinfobean" property="skinName" value="treeview">
	<html:hidden property="doframe" value="false"/>
</logic:equal>

<ap:tabPanel selectedTabParameter="selectedTab">
	
	<ap:tabBegin>
		<script>
			function changeTab(selectedTab)
			{
				var form = document.AcSubmitJobActionForm;
				if (form.absFolder)
				{
					var isFolderValid = validateFolder(form.absFolder.value);
					if (isFolderValid == false)
					{
						return;
					}
				}
				if (form.txtVersion){
					if (validateVersion() == false) {
						return;
					}
				}
				form.selectedTab.value = selectedTab;
				struts_submitJob(document, false);
			}

			function changeJobType(jobType)
			{
				oldJobType = document.AcSubmitJobActionForm.jobType.value;
				document.AcSubmitJobActionForm.jobType.value = jobType;
				document.AcSubmitJobActionForm.selectedTab.value = "0";
				struts_submitJob(document, false);

				//if it comes here then the page is not submitted
				document.AcSubmitJobActionForm.jobType.value = oldJobType;
			}

			function setDisabled(control,value)
			{
				setControlDisabled2(control,value);
			}
			
			function submitParamForm( e )
			{
				stopEvent( e );
				// Check for select-multiple validity before submitting job
				if(validateSelectMultiple(document)) {
					struts_submitJob(document, true);
				}
			}
			
		</script>
	</ap:tabBegin>

	<ap:tabMiddle>
		<LI class="">
				<A href="javascript:changeTab(''{1}'');">
				{0}
				</A>
		</LI>
	</ap:tabMiddle>
	<ap:tabMiddleSelected>			
				<LI class="active">
					<A href="#">
						{0}
						</A>
				</LI>
	</ap:tabMiddleSelected>

	<% if ( !isWorkgroupMode ) 
	{
	%>
	<logic:equal name="jobType" value="async">
		<ap:tab><bean:message bundle="iportalResources" key="TAB_SCHEDULE" locale="<%= AcConstants.CURRENT_JAVA_LOCALE %>" /></ap:tab>
		<ap:content page="schedule.jsp"/>
	</logic:equal>
	<%
	} // scheduling is not supported in workgroup mode
	if(hasParameters && !hasHiddenParametersOnly)
	{
	%>
	
	<ap:tab><bean:message bundle="iportalResources" key="TAB_PARAMETERS" locale="<%= AcConstants.CURRENT_JAVA_LOCALE %>" /></ap:tab>
		<%if(StaticFuncs.getUseJSAPIParameterPage() != null && StaticFuncs.getUseJSAPIParameterPage().equalsIgnoreCase("true")) 
		{
		%>
			<ap:content page="jsapiparameters.jsp"/>
		<%
		}
		else
		{
		%>
			<ap:content page="parameters.jsp"/>
		<%
		} 
		%>
	<% 
	}
	%>
	<%
	if (!isWorkgroupMode && saveOutput.equalsIgnoreCase("true")) 
	{
	%>
	<logic:equal name="jobType" value="sync">
		<logic:notPresent parameter="__previewMode">
			<ap:tab><bean:message bundle="iportalResources" key="TAB_SAVE_AS" locale="<%= AcConstants.CURRENT_JAVA_LOCALE %>" /></ap:tab>
			<ap:content page="saveas.jsp"/>			
		</logic:notPresent>
	</logic:equal>
	<%
	} // Save as from requester dialog box is not supported under workgroup mode
	%>
	
	<logic:equal name="jobType" value="async">
		<ap:tab><bean:message bundle="iportalResources" key="TAB_OUTPUT" locale="<%= AcConstants.CURRENT_JAVA_LOCALE %>" /></ap:tab>
		<ap:content page="output.jsp"/>
	</logic:equal>
	
</ap:tabPanel>

<%-- Don't use style as display:none for the hidden submit button because IE would ignore it --%>
<input type="submit" style="width: 0px; height: 0px; position: absolute; left: -50px; top: -50px;" >

</html:form>
<%
	if(StaticFuncs.getUseJSAPIParameterPage() == null || StaticFuncs.getUseJSAPIParameterPage().equalsIgnoreCase("false")) {
%>
		<jsp:include page="/iportal/activePortal/private/query/parameteradhocmenu.jsp" flush="true"/>
<%  } %>
<jsp:include page="calendar.jsp" flush="true"/>
<logic:present name="executeForm">
	<jsp:include page="servletexecute.jsp" flush="true" />
</logic:present>

