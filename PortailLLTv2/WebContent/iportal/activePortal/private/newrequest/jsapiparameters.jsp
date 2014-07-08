<%-- --------------------------------------------------------------------------
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.
	
	
	Description:
		create actuate query page
	
	Supported URL parameters:
		selectedTab, used by ui:tabPanel as selectedTabParameter	
-------------------------------------------------------------------------- --%>
<%@ page
	import="com.actuate.schemas.*,
	com.actuate.activeportal.forms.SubmitJobActionForm,
	com.actuate.reportcast.utils.StaticFuncs,
	com.actuate.iportal.utils.Utility,
	com.actuate.iportal.VolumeProfileManager,
	com.actuate.activeportal.utils.Parameter"%>
<%-- --------------------------------------------------------------------------
	Expected JavaBeans:
-------------------------------------------------------------------------- --%>

<%-- TAG LIBRARIES ------------------------------------------------------- --%>
<%@ taglib uri="/struts-bean" prefix="bean"%>
<%@ taglib uri="/struts-html" prefix="html"%>
<%@ taglib uri="/struts-logic" prefix="logic"%>

<%@ include file="/iportal/activePortal/common/initCommonParam.jsp" %>

<%-- --------------------------------------------------------------------------
	Expected JavaBeans:
-------------------------------------------------------------------------- --%>
<jsp:useBean id="userAgentBean" class="com.actuate.activeportal.beans.UserAgentBean" scope="request" />
<jsp:setProperty name="userAgentBean" property="request" value="<%= request %>" />
<script type="text/javascript"
	src="<%=request.getContextPath() %>/jsapi"></script>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />	
<%
	boolean mobileDevice = userAgentBean.isMobileDevice();

	String fName = paramBean.getParameter("__executableName");	
	boolean bSOI= false;
	String fextension = null;
	fextension = paramBean.getParameter("__filetype");

	if (fName == null)
		fName = paramBean.getParameter("inputfile");
	
	if(fName == null)
		fName = (String)request.getAttribute("__executableName");

	if (fName != null && fextension == null)				
		fextension = StaticFuncs.getFileExtension(fName);
		
	if (fextension != null && fextension.compareToIgnoreCase("soi")==0 ) 
	{ 
		bSOI = true;	
	}
	
	String serverURL = userinfobean.getServerurl();
	String repositoryType = userinfobean.getRepositoryType();
	String volume = userinfobean.getVolume();
    VolumeProfileManager volumeProfileManager = VolumeProfileManager.getInstance( null, null, null, null );
    if (volumeProfile == null)
    {
        if (serverURL != null || volume != null || repositoryType != null)
        {
            volumeProfile = volumeProfileManager.getProfileName( serverURL, volume, repositoryType );
        }                
    }
    if (volumeProfile == null || 
            (volumeProfile != null && volumeProfile.trim().length() == 0))
    {
        volumeProfile = volumeProfileManager.getDefaultProfileName();       
    }


	//create IC base URL if the proxy base URL is not set
	String partialPortalURL= null;
	boolean isICBehindProxy = false;
	String proxyBaseURL = StaticFuncs.getProxyBaseURL();
	String proxyURL = null;
	//check if the proxy URL is set in web.xml. 
	//If the PROXY_BASE property is set, then it means IC is behind proxy and use PROXY_BASE as the proxy URL to load JSAPI resources
	//If PROXY_BASE is set then requester page won't work as expected if used using standalone URL.
	//To use IC as standlone clear the PROXY_BASE property in web.xml
	if( proxyBaseURL != null && proxyBaseURL.length() > 0 )
	{
		isICBehindProxy = true;
		proxyURL= proxyBaseURL;
	}
	else
	{
		String serverName = request.getServerName();
		int port = request.getServerPort();
		String contextPath = request.getContextPath();
		partialPortalURL = "://"+serverName+":"+Integer.toString(port)+contextPath;
	}
	//Check if the report has parameters
	SubmitJobActionForm form = (SubmitJobActionForm) session.getAttribute("AcSubmitJobActionForm");
	ParameterDefinition[] parameterDefinitions = null;
	ParameterValue[] parameterValues = null;
	String[] expandedGroups = null;
	
	boolean isEmpty = true;
	int numOfParam = 0;
	if(form != null)
	{
		//set the flag in the form so that the action class doesn't call the method to fix the UTF8 encoding
		form.setIsUsingJSAPIParameterPage(true);
		
		parameterDefinitions = form.getParameterDefinitions();
		parameterValues = form.getParameters();

		if ((null != parameterDefinitions) && (null != parameterValues))
		{
			numOfParam= parameterDefinitions.length;
			for (int i=0;i<parameterDefinitions.length;i++) 
			{
				ParameterValue parameterValue = parameterValues[i];
				if (parameterDefinitions[i] != null && !parameterDefinitions[i].getIsHidden().booleanValue())
				{
					isEmpty = false;
				}
			}
		}
		//action class needs it to handle displaying the user set parameters after the report is submitted from requester page.
		form.setRequesterPageShown(true);
		//check if there are any expanded parameter group nodes for collapsible layout
		expandedGroups = form.getExpandedGroups();
	}
%>

<SCRIPT language="javascript">
	var isMobileDevice = <%= mobileDevice %>;
	var parameterObj = null;
	var submitDoc = null;
	var invokeSubmit = false;
	var resultConsumer = null;
	//initialize the Web2.0 parameter page.
	function initApi()
	{		
		//In IE compatibility viewer,scroll bar in parameter page cann't be drag freely,so set the overflow to scroll.TED 66980
		if( actuate.util.browser.isIEFlag )
		{
			document.getElementsByTagName("HTML")[0].style.overflow = "scroll";
		}
		//fix ted 68885,change the background from transparent.
		if( actuate.util.browser.isMobile )
		{
			document.getElementsByTagName("body")[0].style.background = "none repeat scroll 0 0 white";
		}
		actuate.load("parameter");
		username 	= '<%= 	StaticFuncs.jsEncode(userinfobean.getUserid()) %>';
		var requestOpts = new actuate.RequestOptions();
		<%
		if (volumeProfile != null)
		{
		%>
			requestOpts.setVolumeProfile( "<%= StaticFuncs.jsEncode(volumeProfile) %>" );
		<%
            if ( userinfobean.isAddVolumeToUrl() )
            {               
        %>
				requestOpts.setVolume( "<%= StaticFuncs.jsEncode(volume) %>" );
		<%
            }
		}
		else
		{
			if ( IPortalConsts.ENTERPRISE.equalsIgnoreCase(repositoryType) )
			{
		%>
			    
			    requestOpts.setIServerUrl( "<%= StaticFuncs.jsEncode(serverURL) %>" );
				requestOpts.setVolume( "<%= StaticFuncs.jsEncode(volume) %>" );
		<%
			}		    
		}
		%>
		requestOpts.setLocale( '<%= javaLocale %>' );
		requestOpts.setRepositoryType( '<%= repositoryType %>' );
		
		var useProxyURL = <%= isICBehindProxy %>;
		var baseURL = null;
		//if probase url is set then use that as the base URL else create one using HTTP request
		if( useProxyURL )
		{
			baseURL = '<%= proxyURL %>';
		}
		else
		{
			var URL = location.href;
			var index = URL.indexOf("://");
			var protocol = URL.substring(0,index);
			baseURL = protocol+'<%= StaticFuncs.jsEncode(partialPortalURL) %>';
		}

		actuate.initialize( baseURL, requestOpts, username, null, initializeParamContainer );
	}

	//render the parameters and load the localized resources
	function initializeParamContainer()
	{
		parameterObj = new actuate.Parameter( 'containerParameter' );
				
        //check if there are any expanded group nodes for the collapsible layout
        var arrayExpandedGroups = null;
        <%
        if( expandedGroups != null && expandedGroups.length > 0)
        {
        %>
        	arrayExpandedGroups = new Array();
        	<%
        	for (int i = 0; i < expandedGroups.length ; i++)
        	{
        	%>
        		arrayExpandedGroups.push('<%= StaticFuncs.jsEncodeNonXSS(expandedGroups[i], "") %>');
        	<%
        	}
        }
        %>
        if( arrayExpandedGroups != null)
        {
        	parameterObj.setExpandedGroups( arrayExpandedGroups );
        }
		parameterObj.setReportName( '<%= StaticFuncs.jsEncodeNonXSS(fName, "") %>' );
		parameterObj.registerEventHandler( actuate.parameter.EventConstants.ON_EXCEPTION, onRenderException );
		parameterObj.registerEventHandler( actuate.parameter.EventConstants.ON_TEXT_ENTER_KEY, onTextEnterKey );
		parameterObj.setAutoScale( true );
		
		actuate.parameter.Utility.setUpdateForm(true);
		SendSOAPForCustomParamDefs();
	}
			
	//render the parameter definitions
	function SendSOAPForCustomParamDefs()
	{ 
		var xmlEncodedFileName = '<%= StaticFuncs.jsEncodeNonXSS(fName, "") %>';
		sendJSAPISOAP( xmlEncodedFileName );
	}

	function onRenderException( errorObj )
	{
		alert( errorObj.getMessage());
	}
	
	function onTextEnterKey()
	{
		submitParamForm();
	}
	
	//populate the changed parameter value from the mashup javascript to HTML AcSubmitJobActionForm
	function populateChangedPDsInForm( doc, invoke, callback )
	{
		submitDoc = doc;
		invokeSubmit = invoke;
		resultConsumer = callback;
		if(parameterObj != null)
		{
			var theForm = document.forms['AcSubmitJobActionForm'];
			createHiddenParam("numOfParam", <%= numOfParam%>, theForm, "numOfParam");
			//traverse through all elements in form and parse the JSAPI components
			downloadJSAPIParameterValues( );
		}
	}

	//validate the date parameters and that they are in correct format depending on the locale
	function validateDateParameter(parameterName, isStructure, dataType)
	{
		errorMessage = '<%= Utility.getJsMessage(pageContext,"ERRMSG_INVALID_DATETIME_PARAM",new String[] {"{0}","{1}","{2}"}) %>';

		var dateElementId = parameterObj.getParameterContainer().createUniqueControlID( parameterName );  
		if( dateElementId)
		{
			theForm = document.forms['AcSubmitJobActionForm'];
			
			var nullValueElementId = '__isnull' + dateElementId.substring(0, dateElementId.indexOf('.date'));
			var nullValueElement = theForm.elements[nullValueElementId];
			if (nullValueElement != null && nullValueElement.checked == true)
			{
				//value is null so do not need to validate the value
				return null;
			}
			
			var dateElement = theForm.elements[dateElementId];
			var dateValue = dateElement.value;
			if (dateElement.valueIsHint == true)
			{
				dateValue = "";
			}
			var format = '<%= acLocale.getDatePattern(AcLocale.SHORT) %>';
			//remove the leading and trailing blank spaces.
			var value = trim( dateValue );
			isValidFormat( value, isStructure, format );
			
			// validare the Time component only when the parameter of "date" ( date & time) data type.
			// do not validate time for "DateOnly" data type
			if( dataType.toLowerCase() == "date" )
			{
				var timeElementId = dateElementId.substring(0, dateElementId.indexOf('.date'))+'.time';
				var timeElement = theForm.elements[timeElementId];
				var timeValue = timeElement.value;
				if (timeElement.valueIsHint == true)
				{
					timeValue = "";
				}
				//check if time value is in valid format
				format = '<%= acLocale.getTimePattern(AcLocale.LONG) %>';
				value = trim(timeValue);
				isValidFormat( value, isStructure, format);
			}
		}
		return null;
	}
	
	function validateParameters()
	{
		<logic:present name="AcSubmitJobActionForm" property="parameterDefinitions">
			<logic:iterate id="parameterDefinition" type="com.actuate.schemas.ParameterDefinition"
				indexId="index"
				name="AcSubmitJobActionForm" 
				property="parameterDefinitions">
				<%
				if( parameterDefinition.getControlType() == null )
				{
				%>
					<logic:equal name="parameterDefinition" property="isHidden" value="false">
						<%
						if( parameterDefinition.getDataType() == DataType.Date || parameterDefinition.getDataType() == DataType.DateOnly )
						{
							String parameterName = parameterDefinition.getName();
						%>
							error = validateDateParameter('<%= parameterName %>', <%= Utility.getIsStructure(request.getSession(), parameterDefinition.getGroup(), true) %>, '<%= parameterDefinition.getDataType() %>');
							if (null != error)
								return error;
						<%}%>
					</logic:equal>
				<%
				}
				%>
			</logic:iterate>
		</logic:present>
	}
	
	function validateReqNonReqParams()
	{
		//Validate the required and non required parameters values before populating it in the form.
		var errorMessage = parameterObj.validateParameters();	
		if (null != errorMessage)
		{
			return errorMessage;
		}
			
		return null;
	}
<%-- HELP LINK JAVASCRIPT ------------------------------------------------ --%>
	if (window.attachHelpPage)
	{
		var helpDocBase = "<%= helpDocBase %>";
		var helpTopic = "NewRequest_parameters";
		var helpContext = "<%= pageContext.getAttribute("com.actuate.help.context", PageContext.APPLICATION_SCOPE) %>";
		var customizedHelpPath = "";
		var locale = "<%= javaLocale %>";
		var bOpenHelpWindow = false;
		attachHelpPage(helpDocBase, helpTopic, helpContext, customizedHelpPath, locale, bOpenHelpWindow);

	}

<%-- --------------------------------------------------------------------- --%>
//initialize the Web2.0 parameter page everytime the parametre tab is rendered
	window.onload = function()
	{
		initApi();
		if ( typeof(bodyOnload == 'function') )
		{
			bodyOnload();
		}
	}
</SCRIPT>

<table width="100%" border="0" cellspacing="0" cellpadding="2">
	<tr>
		<td style="padding:5px">
		<table border="0" cellspacing="0" cellpadding="2" width="100%">
			<tr>
				<td>
				<div id="containerParameter"></div>
				</td>
			</tr>
			<% if (isEmpty) { %>
			<tr>
				<td>
					&nbsp;
						<% if ( bSOI )
						{%>
							<bean:message bundle="iportalResources" key="MSG_REPORT_NO_PARAMS" locale="<%= AcConstants.CURRENT_JAVA_LOCALE %>" />
							
						<%}
						else 
						{%>
							<bean:message bundle="iportalResources" key="MSG_NO_PARAMS" locale="<%= AcConstants.CURRENT_JAVA_LOCALE %>" />
						<%}%>
				</td>
			</tr>
			<% } %>
		
			<tr height="100%"><td>&nbsp;</td></tr> <!-- EMPTY SPACE -->
			<tr>
				<td>
					<%
						int selectedTab = Integer.parseInt(form.getSelectedTab());//index start from 0
						int totalTab = form.getTotalTabs();
						if(selectedTab == totalTab -1){//this tab is the last tab
					%>
					<jsp:include page="buttons.jsp" flush="true">
						<jsp:param value="true" name="highlightFinish"/>
					</jsp:include>
					<%
						}
						else{
					%>
					<jsp:include page="buttons.jsp" flush="true"/>
					<%
						}
					%>				
				</td>
			</tr>
		</table>
		</td>
	</tr>
</table>

