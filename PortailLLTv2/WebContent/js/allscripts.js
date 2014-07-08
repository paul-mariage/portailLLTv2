/*
 *	@author 	Actuate Corporation
 *				Copyright (C) 2001 Actuate Corporation. All rights reserved.
 *	@version	1.0
 */

function NumToHex(iNum) // ACCEPTS UPTO 64k
{
	if (iNum > 255)
	{
		iQuo = iNum / 256;
		iRem = iNum % 256;
		iQuo = iQuo - (iRem / 256);
		return NumToHex(iQuo) + NumToHex(iRem);
	}
	base = iNum / 16;
	rem = iNum % 16;
	base = base - (rem / 16);
	baseS = MakeHex(base);
	remS = MakeHex(rem);
	return baseS + '' + remS;
}

function MakeHex(x)
{
	if((x >= 0) && (x <= 9))
	return x;
	else {
	switch(x) {
	case 10: return "A";
	case 11: return "B";
	case 12: return "C";
	case 13: return "D";
	case 14: return "E";
	case 15: return "F";
		  }
	   }
}


function debugText(sText)
{
	s = "";
	for (i = 0; i < sText.length; i++)
	{
		c = sText.charCodeAt(i);
		s += "[" + NumToHex(c) + "]";
	}
	return s;
}

// EXTERNALIZED RESOURCES USED IN JAVASCRIPT METHODS; INITIALLY DEFINED AS MISSING RESOURCES; UPDATED BY JSP
var QUESTION_DELETE_FILE = "Internal Error\nQUESTION_DELETE_FILE: Missing Resource";
var MSG_FAIL_TAB_CHANGE = "Internal Error\nMSG_FAIL_TAB_CHANGE: Missing Resource";
var ERRMSG_IGNORE_CHANFILTER_ACTION = "Internal Error\nERRMSG_IGNORE_CHANFILTER_ACTION: Missing Resource";
var ERRMSG_MISSING_JOB_NAME = "Internal Error\nERRMSG_MISSING_JOB_NAME: Missing Resource";
var ERRMSG_INVALID_RECURRING_TIME = "Internal Error\nERRMSG_INVALID_RECURRING_TIME: Missing Resource";
var ERRMSG_INVALID_ONCE_DATE = "Internal Error\nERRMSG_INVALID_ONCE_DATE: Missing Resource";
var ERRMSG_INVALID_ONCE_TIME = "Internal Error\nERRMSG_INVALID_ONCE_TIME: Missing Resource";
var ERRMSG_EMPTY_OUTPUT_DOC = "Internal Error\nERRMSG_EMPTY_OUTPUT_DOC: Missing Resource";
var ERRMSG_WRONG_EXISTING_PASSWORD = "Internal Error\nERRMSG_WRONG_EXISTING_PASSWORD: Missing Resource";
var ERRMSG_WRONG_REENTERED_PASSWORD = "Internal Error\nERRMSG_WRONG_REENTERED_PASSWORD: Missing Resource";
var ERRMSG_KEEP_NUMBER_INVALID = "Internal Error\nERRMSG_KEEP_NUMBER_INVALID: Missing Resource";
var ERRMSG_INVALID_OUTPUT_FOLDER = "Internal Error\nERRMSG_INVALID_OUTPUT_FOLDER: Missing Resource";
var ERRMSG_INVALID_START_CHAR = "Internal Error\nERRMSG_INVALID_START_CHAR: Missing Resource";
var ERRMSG_INVALID_PRIORITY_VALUE = "Internal Error\nERRMSG_INVALID_PRIORITY_VALUE: Missing Resource";
var ERRMSG_INVALID_PRIORITY_RANGE = "Internal Error\nERRMSG_INVALID_PRIORITY_RANGE: Missing Resource";


// GLOBALS
var TZ_OFFSET = 0;
var BUFFER_STATUS = false;
var SCH_DT_FORMAT = "M/d/yy"; // HARDCODED DEFAULTS; WILL BE OVERRIDDEN BY PARENT JSP PAGE
var SCH_TM_FORMAT = "h:mm a"; // HARDCODED DEFAULTS; WILL BE OVERRIDDEN BY PARENT JSP PAGE
var LOCALIZED_AM = "AM";
var LOCALIZED_PM = "PM";
var slink = ""; // NS4 HELP LINK

/**
 * NS4 HELP LINK UPDATE
 */
function changeSrc()
{
	if (document.layers)
	{
		for (i=0;i<document.links.length;i++)
		{
			isHelpLink = (-1 != document.links[i].href.indexOf("help"));
			if (isHelpLink)
				document.links[i].href = slink;
		}
	}
}

function getLocalePath(locale)
{
	var localePath = locale == null? "": trim(locale);
	localePath = localePath.toLowerCase();
	localePath = localePath.length == 0?"": "/" + localePath;

	return localePath;
}

/*
 * helpDocBase is the base location of the help path: e.g., http://www.actuate.com/documentation/R11/aic/help
 * is the help base path for iportal 11.
 * customizedHelpPath is a customized path that will be appended to helpDocBase.  If 
 * it is null or empty string, "/wwhelp.htm" will be appended to helpDocBase.
 * locale is the locale string.  It has the same format as what java's  Locale.toString() returns.
 * bOpenHelpWindow decides whether a window will be popped up for help page or not.
 */
function attachHelpPage(helpDocBase, sTopic, helpContext, customizedHelpPath, locale, bOpenHelpWindow, helpElementId)
{
	//if (helpDocBase.indexOf('?') > 0) {
		sLink = helpDocBase;
//	}
//	else {
//		var appendedPath = "/wwhelp.htm";
//		if (customizedHelpPath && customizedHelpPath.length > 0)
//		{
//			appendedPath = customizedHelpPath;
//		}
//		
//		sLink = helpDocBase + appendedPath + "?single=true";
//	
//		sLink = (helpContext != null)? sLink + "&context=" + helpContext : sLink;
//	
		sLink = (sTopic != null)? sLink + "/" + sTopic + "/index.html" : sLink;
//	}
	attachHelpLink(sLink, bOpenHelpWindow, helpElementId);
	return sLink;
}
	
function attachHelpLink(sLink, bOpenHelpWindow, helpElementId)
{
	if (bOpenHelpWindow == true)
	{
		window.open(sLink);
	}
	else
	{
		
		var elementId = "helpHyperlink";
		if(typeof(helpElementId)!="undefined" && helpElementId.length > 0 )
		{
			elementId = helpElementId;
		}
		var helpElement = null;
		if (document.getElementById)
		{
			helpElement = document.getElementById(elementId);
			if (helpElement != null)
			{
				helpElement.href = sLink;
			}
		}
		else if (document.layers)
		{
			slink = sLink;
		}
		var dashboardHelpLink  = null;
		if( isIE() )
		{
			var outerMostParentIframe = getOutermostiFrame();
			dashboardHelpLink = outerMostParentIframe.document.getElementById("dashboardHelpLink");
		}else
			dashboardHelpLink = top.document.getElementById("dashboardHelpLink");
		
		if (dashboardHelpLink != null) 
		{
			dashboardHelpLink.href = sLink;		
		}
	}
}

//This function woudl return the outermost iFrame in a nested iFrame environment
function getOutermostiFrame()
{
	var currentFrame = self;
	try{
		while( currentFrame.parent.document 
				&& currentFrame != currentFrame.parent )
		{
			currentFrame = currentFrame.parent;
		}
	}catch(e)
	{
		//do nothing
	}
	return currentFrame;
}

//checks if the browser is IE or not.
function isIE ()
{
	var userAgent = navigator.userAgent.toLowerCase();
	if(userAgent.indexOf('msie') > -1)
		return true;
	else
		return false;
}

/**
 *
 */
function gotoFolder(doc, workingFolder, childFolder, sFilter, sOnlyLatest, 
	sShowFolders, sShowDocuments, sShowExecutables, sServerURL, sVolume)
{
	if (workingFolder == "/") workingFolder = "";
	sFolder = workingFolder + "/" + childFolder;
	sURL = "../../../filesfolders/index.jsp?folder="+encode(sFolder);
	if (sFilter != null && sFilter != "") sURL += "&filter=" + encode(sFilter);
	if (sOnlyLatest != null && sOnlyLatest != "") sURL += "&onlyLatest=" + sOnlyLatest;
	if (sShowFolders != null && sShowFolders != "") sURL += "&showFolders=" + sShowFolders;
	if (sShowDocuments != null && sShowDocuments != "") sURL += "&showDocuments=" + sShowDocuments;
	if (sShowExecutables != null && sShowExecutables != "") sURL += "&showExecutables=" + sShowExecutables;
	if (sServerURL != null && sServerURL != "") sURL += "&serverURL=" + encode(sServerURL);
	if (sVolume != null && sVolume != "") sURL += "&volume=" + encode(sVolume);
	window.location.href = sURL;
}

/**
 *
 */
function returnToFilesFolders(doc, workingFolder, sServerURL, sVolume)
{
	if (workingFolder == "/") workingFolder = "";
	sURL = "../../../filesfolders/index.jsp?folder="+encode(workingFolder);
	if (sServerURL != null) sURL += "&serverURL=" + encode(sServerURL);
	if (sVolume != null) sURL += "&volume=" + encode(sVolume);
	window.location.href = sURL;
}


/**
 *
 */
function workInProgress()
{
	alert("Not yet implemented");
}

/**
 *
 */
function updateFilter(sServerURL, sVolume, frmList, sFolder)
{
	sURI = "../../../filesfolders/index.jsp?serverURL=" + encode(sServerURL) + "&volume=" + encode(sVolume)
	     + "&folder=" + encode(sFolder) + "&filter=" + encode(frmList.filter.value)
		 + "&showFolders=" + frmList.showFolders.checked
		 + "&showDocuments=" + frmList.showDocuments.checked
		 + "&showExecutables=" + frmList.showExecutables.checked
		 + "&onlyLatest=" + frmList.onlyLatest.checked
		 + "&applyFilter=true";

	window.location.href = sURI;
}

/**
 *
 */
function restoreFilter(sServerURL, sVolume, frmList, sFolder)
{

	sURI = "../../../filesfolders/index.jsp?serverURL=" + encode(sServerURL) + "&volume=" + encode(sVolume)
	     + "&folder=" + encode(sFolder)
		 + "&resetFilter=true";

	window.location.href = sURI;
}

/**
 *
 */
function viewFileDetail(sFQFileName, sServerURL, sVolume)
{
	sURI = "index.jsp?subpage=_detail&name=" + encode(sFQFileName)
	     + "&serverURL=" + encode(sServerURL) + "&volume=" + encode(sVolume);

	window.location.href = sURI;
}

/**
 *
 */
function viewJobDetail(sJobID, sServerURL, sVolume, sOptionalAdditionalParams)
{

	sURI = "../../../requests/detail.jsp?jobID="+sJobID + "&serverURL=" + encode(sServerURL) + "&volume=" + encode(sVolume);
	if (sOptionalAdditionalParams != null && sOptionalAdditionalParams.length > 0)
	{
		iEqual = sOptionalAdditionalParams.indexOf("=");
		if (iEqual == -1)
		{
			sURI += "&" + encode(sOptionalAdditionalParams);
		}
		else
		{
			sURI += "&" + sOptionalAdditionalParams.substring(0, iEqual) + "=" + encode(sOptionalAdditionalParams.substring(iEqual + 1));
		}
	}
	window.location.href = sURI;
}

/**
 *
 */
function viewDocument(sFQFileName, sServerURL, sVolume, sViewNewBrowserWindow, sFileID, bVerifiedROV)
{

	var sUrl = "";
	var sBrowserNewWindowName = "";
	if (sViewNewBrowserWindow == null) sViewNewBrowserWindow = "false";
	sFileExtension = getFileExtension(sFQFileName);

	sDecompose = (sFileExtension.toUpperCase() == "ROW"
			   || sFileExtension.toUpperCase() == "RPW"
			   || sFileExtension.toUpperCase() == "SQW")
		? "&returnContents=true" : ""; // HARDCODED LIST OF COMPOUND DOCS

	if (sFileExtension.toUpperCase() != "ROI") // DOWNLOAD ANYTHING THAT'S NOT AN ROI
	{
		sObjectReference = (sFileID == null) ? "name=" + encode(sFQFileName) : "fileid=" + encode(sFileID);
		if (sViewNewBrowserWindow == 'true')
		{
			sBrowserNewWindowName = "__view" + (new Date()).getUTCMilliseconds();
			sUrl = "../servlet/DownloadFile?" + sObjectReference + "&serverURL=" + encode(sServerURL) + "&volume=" + encode(sVolume) + sDecompose;
			openNewDefaultWindow(sUrl, sBrowserNewWindowName);
		} else
		{
			window.location.href = "../servlet/DownloadFile?" + sObjectReference + "&serverURL=" + encode(sServerURL) + "&volume=" + encode(sVolume) + sDecompose;
		}
	}
	else // VIEW ROI'S IN DHTML VIEWING FRAMEWORK
	{
		sObjectReference = (sFileID == null) ? "name=" + encode(sFQFileName) : "id=" + encode(sFileID);
		if(sViewNewBrowserWindow == 'true')
		{
			sBrowserNewWindowName = "__view" + (new Date()).getUTCMilliseconds();
			sUrl = "../viewer/viewframeset.jsp?" + sObjectReference + "&serverURL=" + encode(sServerURL) + "&volume=" + encode(sVolume) + sDecompose + "&closex=true";
			openNewDefaultWindow(sUrl, sBrowserNewWindowName);
		}
		else
		{
			window.location.href = "../viewer/viewframeset.jsp?" + sObjectReference + "&serverURL=" + encode(sServerURL) + "&volume=" + encode(sVolume) + sDecompose;
		}
	}
}

/**
 *
 */
function deleteFile(sFQFileName, sServerURL, sVolume)
{

	sConfirmMessage = messageFormat(QUESTION_DELETE_FILE, new Array(sFQFileName));
	if (confirm(sConfirmMessage))
		window.location.href = "../../../filesfolders/do_drop.jsp?name=" + encode(sFQFileName) + "&serverURL=" + encode(sServerURL) + "&volume=" + encode(sVolume);
}

/**
* Replace the extension of the file to lower case.
*/
function replaceExtToLowerCase(sFQFileName)
{
	if (sFQFileName == null) return null;
	iDot = sFQFileName.lastIndexOf(".");
	if (iDot == -1) return "";
	iSemiColon = sFQFileName.lastIndexOf(";");
	if (iSemiColon == -1) iSemiColon = sFQFileName.length;
	orgExt = sFQFileName.substring(iDot + 1, iSemiColon);
	modFQFileName = sFQFileName.substring(0, iDot + 1) + orgExt.toLowerCase() + sFQFileName.substring(iSemiColon, sFQFileName.length);
	
	return modFQFileName;

}

/**
 *
 */
function getFileExtension(sFQFileName)
{
	if (sFQFileName == null) return null;
	iDot = sFQFileName.lastIndexOf(".");
	if (iDot == -1) return "";
	iSemiColon = sFQFileName.lastIndexOf(";");
	if (iSemiColon == -1) iSemiColon = sFQFileName.length;
	return sFQFileName.substring(iDot + 1, iSemiColon);
}

function stripExtension(sFQFileName)
{
	if (sFQFileName == null) return null;
	iDot = sFQFileName.lastIndexOf(".");
	if (iDot == -1) return sFQFileName;
	return sFQFileName.substring(0, iDot);
}

function stripFolder(sFQFileName)
{
	if (sFQFileName == null) return null;
	iSlash = sFQFileName.lastIndexOf("/");
	if (iSlash == -1) return sFQFileName;
	return sFQFileName.substring(iSlash + 1);
}

function stripVersion(sFQFileName)
{
	if (sFQFileName == null) return null;
	iSemiColon = sFQFileName.lastIndexOf(";");
	if (iSemiColon == -1) return sFQFileName;
	return sFQFileName.substring(0, iSemiColon);
}

/**
 *
 */
function viewActiveRequests(sJobState, sServerURL, sVolume)
{

	window.location.href = "index.jsp?serverURL=" + encode(sServerURL)
	 + "&volume=" + encode(sVolume)
	 + "&subpage=_" + encode(sJobState);
}

/**
 *
 */
function deleteJobCompletionNotice(sServerURL, sVolume, sJobID, sJobState, sAdditionalParams)
{

	sURI = "../../../requests/do_deletestatus.jsp"
	 + "?serverURL=" + encode(sServerURL)
	 + "&volume=" + encode(sVolume)
	 + "&jobID=" + sJobID
	 + "&jobState=" + sJobState;

	if (sAdditionalParams != null)
	{
		iEqual = sAdditionalParams.indexOf("=");
		if (iEqual == -1)
		{
			sURI += "&" + encode(sAdditionalParams);
		}
		else
		{
			sURI += "&" + sAdditionalParams.substring(0, iEqual) + "=" + encode(sAdditionalParams.substring(iEqual + 1));
		}
	}

	window.location.href = sURI;
}

/**
 *
 */
function deleteJob(sServerURL, sVolume, sJobID, sJobState)
{

	sURI = "../../../requests/do_deletejob.jsp"
	 + "?serverURL=" + encode(sServerURL)
	 + "&volume=" + encode(sVolume)
	 + "&jobID=" + sJobID
	 + "&jobState=" + sJobState;

	window.location.href = sURI;
}

/**
 *
 */
function cancelRequest(sServerURL, sVolume, sJobID, sJobState)
{

	sURI = "../../../requests/do_drop.jsp"
	 + "?serverURL=" + encode(sServerURL)
	 + "&volume=" + encode(sVolume)
	 + "&jobID=" + sJobID
	 + "&jobState=" + sJobState;
	window.location.href = sURI;
}

/**
 *
 */
function asyncRequest(sFQExecName, sServerURL, sVolume, bVerifiedROV)
{
	sObjectReference = "name=" + encode(sFQExecName);
	sFileExtension = getFileExtension(sFQExecName).toUpperCase();
	sURI = "";

	// PERFORM A PRE-CHECK ON ROV DEPENDENCIES
	if ((sFileExtension == "ROV" && !bVerifiedROV) || sFileExtension == "ROI")
	{
		sURI = "../../../filesfolders/do_dependencycheck.jsp?" + sObjectReference
		                     + "&serverURL=" + encode(sServerURL)
							 + "&volume=" + encode(sVolume)
							 + "&type=asyncRequest"; // THE JAVASCRIPT METHOD NAME
	}
	else
	{
		sURI = "../../../newrequest/index.jsp?__requestType=scheduled&__executableName=" + encode(sFQExecName)
			 + "&serverURL=" + encode(sServerURL)
			 + "&volume=" + encode(sVolume);
	}

	window.location.href = sURI;
}

/**
 *
 */
function syncRequest(sFQExecName, sServerURL, sVolume, bVerifiedROV)
{

	sObjectReference = "name=" + encode(sFQExecName);
	sFileExtension = getFileExtension(sFQExecName).toUpperCase();
	sURI = "";

	// PERFORM A PRE-CHECK ON ROV DEPENDENCIES
	if ((sFileExtension == "ROV" && !bVerifiedROV) || sFileExtension == "ROI")
	{
		sURI = "../../../filesfolders/do_dependencycheck.jsp?" + sObjectReference
		                     + "&serverURL=" + encode(sServerURL)
							 + "&volume=" + encode(sVolume)
							 + "&type=syncRequest"; // THE JAVASCRIPT METHOD NAME
	}
	else
	{
		sURI = "../../../newrequest/index.jsp?__requestType=immediate&__executableName=" + encode(sFQExecName)
			 + "&serverURL=" + encode(sServerURL)
			 + "&volume=" + encode(sVolume);
	}

	window.location.href = sURI;
}

/**
 *
 */
function clearFilter(tf)
{
	tf.value = "";
}


/**
 *
 */
function getRadioValue(radioElements)
{
	for (i = 0; i < radioElements.length; i++)
	{
		if (radioElements[i].checked)
			return radioElements[i].value;
	}
	return null;
}


/**
 *
 */
function getRadioGroupByName(radioGroupName)
{
	var radioElements = document.getElementsByName(radioGroupName);
	if (radioElements.length == 0)
	{
		return null;
	}
	
	return radioElements;
}


/**
 *
 */
function clearCompletedRequestFilter(frmCompleted)
{
	frmCompleted.filter.value = "";
	frmCompleted.cbSuccess.value = "CHECKED";
	frmCompleted.cbFail.value = "CHECKED";
}

/**
 *
 */
function changeRequestTab(sServerURL, sVolume, sSubPage, sFilter, sSuccess, sFail)
{

	sURI = "../../../requests/index.jsp?serverURL=" + encode(sServerURL) + "&volume=" + encode(sVolume)
		 + "&subpage=_" + encode(sSubPage) + "&filter=" + encode(sFilter)
		 + "&cbSuccess=" + encode(sSuccess) + "&cbFail=" + encode(sFail);

	window.location.href = sURI;
}


/**
 *
 * Feature: Options (General Tab)
 */
function buffer_general(frmGeneral, frmDispatch)
{
	frmDispatch.email.value = frmGeneral.email.value;
	frmDispatch.oldKey.value = frmGeneral.oldKey.value;
	frmDispatch.newKey.value = frmGeneral.newKey.value;
	frmDispatch.confirmKey.value = frmGeneral.confirmKey.value;
	frmDispatch.docChanFilters.value = "" + frmGeneral.docChanFilters.checked;
	frmDispatch.requestFilters.value = "" + frmGeneral.requestFilters.checked;
	frmDispatch.channelIcons.value = "" + frmGeneral.channelIcons.checked;
	frmDispatch.viewNewBrowserWindow.value = "" + frmGeneral.viewNewBrowserWindow.checked;
	frmDispatch.newLocale.value = frmGeneral.newLocale.options[frmGeneral.newLocale.selectedIndex].value;
	frmDispatch.newTimeZone.value = frmGeneral.newTimeZone.options[frmGeneral.newTimeZone.selectedIndex].value;
	BUFFER_STATUS = true;
	return "";
}

/**
 *
 * Feature: Options (Notification Tab)
 */
function buffer_notification(frmNotification, frmDispatch)
{
	frmDispatch.succEmail.value = "" + frmNotification.succEmail.checked;
	frmDispatch.succComp.value = "" + frmNotification.succComp.checked;
	frmDispatch.failEmail.value = "" + frmNotification.failEmail.checked;
	frmDispatch.failComp.value = "" + frmNotification.failComp.checked;
	BUFFER_STATUS = true;
	return "";
}

/**
 *
 * Feature: Options (Channels Tab)
 */
function buffer_channels(frmChannels, frmDispatch)
{
	bAnySubscriptions = false;
	sSuffix = "";
	for (i = 0; i < frmChannels.elements.length; i++)
	{
		sChanName = frmChannels.elements[i].name;
		if (sChanName == "channels")
		{
			if (frmChannels.elements[i].type == "hidden" || frmChannels.elements[i].checked)
			{
				sSuffix += "channels=" + encode(frmChannels.elements[i].value) + "&";
				bAnySubscriptions = true;
			}
		}
	}
	if (!bAnySubscriptions) sSuffix += "channels=__none&";

	BUFFER_STATUS = true;
	return sSuffix;
}

/**
 *
 */
function updateChannelOptionsFilterByKey(event, frmChannels, frmDispatch, sAction)
{
	if (!event)
	{
		if (window.event.keyCode == 13)
			updateChannelOptionsFilter(frmChannels, frmDispatch, sAction);
	}
	else
	{
		event.cancelBubble=true;
		if (event.keyCode == 13)
			updateChannelOptionsFilter(frmChannels, frmDispatch, sAction);
	}
	return false;
}

/**
 *
 */
function updateChannelOptionsFilter(frmChannels, frmDispatch, sAction)
{
	if (sAction == "apply")
	{
		frmDispatch.channelListFilter.value = frmChannels.__filter.value;
		changeOptionsTab(frmDispatch, "channels", buffer_channels(frmChannels, frmDispatch));
	}
	else if (sAction == "clear")
	{
		clearFilter(frmDispatch.channelListFilter);
		changeOptionsTab(frmDispatch, "channels", buffer_channels(frmChannels, frmDispatch));
	}
	else
	{
		alert(ERRMSG_IGNORE_CHANFILTER_ACTION);
	}
}

/**
 *
 */
function buffer_about(frmAbout, frmDispatch)
{
	// Er ... Nothing needs to be buffered here
	BUFFER_STATUS = true;
	return "";
}

/**
 *
 * Feature: NewRequest (Scheduled & Immediate)
 * ARR_EXCLUSION_LIST array is initialized in parameters.jsp
 */
function buffer_parameters(frmParameters, frmDispatch)
{
	if (!validateReportParameters(frmParameters)) return; // DEFINED IN parameters.jsp
	for (var i=0; i < frmParameters.elements.length; i++)
	{
		var sParamName = frmParameters.elements[i].name;
		var isExcluded = false;
		for (var j = 0; j < ARR_EXCLUSION_LIST.length; j++)
		{
			if (sParamName.toUpperCase() == ARR_EXCLUSION_LIST[j].toUpperCase())
			{
				isExcluded = true;
				break;
			}
		}
		if (!isExcluded)
			frmDispatch.elements[sParamName].value = frmParameters.elements[i].value;
	}
	BUFFER_STATUS = true;
	return;
}

/**
 * Sets default date/time format patterns to be used in javascript validation.
 * Also sets the timezone offset to be used in internal calculations.
 */
function setDefaultFormats(dtFormat, tmFormat, tzOffset)
{
	SCH_DT_FORMAT = dtFormat;
	SCH_TM_FORMAT = tmFormat;
	TZ_OFFSET = tzOffset;
}

/**
 *
 * Feature: NewRequest (Scheduled)
 */
function buffer_schedule(frmSchedule, frmDispatch)
{
	// RETRIEVE LIVE VALUES FROM FORM
	var sJobName = frmSchedule.jobName.value;
	var sScheduleType = getRadioValue(frmSchedule.scheduleType);
	var sOnceDate = ""; 
	var sOnceTime = "";
	var sRecurringDay = ""; 
	var sRecurringTime = ""; 
	var sStartDate = ""; 
	var sUseStartDateTime = "";
	var sEndDate = ""; 
	var sUseEndDateTime = "";

	if (trim(sJobName) == "")
	{
		alert(ERRMSG_MISSING_JOB_NAME);
		BUFFER_STATUS = false;
		requestFocus(frmSchedule.jobName);
		return;
	}

	if (sScheduleType == "recurring")
	{
		// VALIDATE 'RECURRING' TIME
		sRecurringDay = frmSchedule.recurringDay.value;
		sRecurringTime = frmSchedule.recurringTime.value;
		if (isDateValid(sRecurringTime, SCH_TM_FORMAT) == false)
		{
			alert(messageFormat(ERRMSG_INVALID_RECURRING_TIME, new Array(sRecurringTime, SCH_TM_FORMAT)));
			BUFFER_STATUS = false;
			requestFocus(frmSchedule.recurringTime);
			return;
		}
		
		if (frmSchedule.useStartDateTime.checked)
		{
			sStartDate = frmSchedule.startDate.value;
			if (isDateValid(sStartDate, SCH_DT_FORMAT) == false)
			{
				alert(messageFormat(ERRMSG_INVALID_START_DATE, new Array(sStartDate, SCH_DT_FORMAT)));
				BUFFER_STATUS = false;
				requestFocus(frmSchedule.startDate);
				return;
			}
		}
		
		sUseStartDateTime = "" + frmSchedule.useStartDateTime.checked;

		if (frmSchedule.useEndDateTime.checked)
		{
			// VALIDATE 'RECURRING' END DATE
			sEndDate = frmSchedule.endDate.value;
			if (isDateValid(sEndDate, SCH_DT_FORMAT) == false)
			{
				alert(messageFormat(ERRMSG_INVALID_END_DATE, new Array(sEndDate, SCH_DT_FORMAT)));
				BUFFER_STATUS = false;
				requestFocus(frmSchedule.endDate);
				return;
			}
		}

		sUseEndDateTime = "" + frmSchedule.useEndDateTime.checked;
	}

	if (sScheduleType == "once")
	{
		// VALIDATE 'ONCE' DATE
		sOnceDate = frmSchedule.onceDate.value;
		if (isDateValid(sOnceDate, SCH_DT_FORMAT) == false)
		{
			alert(messageFormat(ERRMSG_INVALID_ONCE_DATE, new Array(sOnceDate, SCH_DT_FORMAT)));
			BUFFER_STATUS = false;
			requestFocus(frmSchedule.onceDate);
			return;
		}

		// VALIDATE 'ONCE' TIME
		sOnceTime = frmSchedule.onceTime.value;
		if (isDateValid(sOnceTime, SCH_TM_FORMAT) == false)
		{
			alert(messageFormat(ERRMSG_INVALID_ONCE_TIME, new Array(sOnceTime, SCH_TM_FORMAT)));
			BUFFER_STATUS = false;
			requestFocus(frmSchedule.onceTime);
			return;
		}
	}

	// ALL VALIDATION SUCCESSFUL; UPDATE DISPATCHER FORM
	if (frmDispatch != null)
	{
		frmDispatch.__jobName.value = sJobName;
		frmDispatch.__scheduleType.value = sScheduleType;
		frmDispatch.__recurringDay.value = sRecurringDay;
		frmDispatch.__recurringTime.value = sRecurringTime;
		frmDispatch.__onceDate.value = sOnceDate;
		frmDispatch.__onceTime.value = sOnceTime;
		frmDispatch.__startDate.value = sStartDate;
		frmDispatch.__useStartDateTime.value = sUseStartDateTime;
		frmDispatch.__endDate.value = sEndDate;
		frmDispatch.__useEndDateTime.value = sUseEndDateTime;
		
		
		BUFFER_STATUS = true;
		return;
	}

	BUFFER_STATUS = false;
}

function struts_buffer_schedule(frmSchedule, frmDispatch)
{
	// RETRIEVE LIVE VALUES FROM FORM
	var sJobName = frmSchedule.jobName.value;
	var sScheduleType = getRadioValue(frmSchedule.scheduleType);
	var sOnceDate = ""; 
	var sOnceTime = "";
	var sRecurringDay = ""; 
	var sRecurringTime = ""; 
	var sStartDate = ""; 
	var sUseStartDateTime = "";
	var sEndDate = ""; 
	var sUseEndDateTime = "";
	var sPriority = "";

	if (trim(sJobName) == "")
	{
		alert(ERRMSG_MISSING_JOB_NAME);
		BUFFER_STATUS = false;
		requestFocus(frmSchedule.jobName);
		return;
	}

	if (sScheduleType == "recurring")
	{
		// VALIDATE 'RECURRING' TIME
		sRecurringDay = frmSchedule.recurringDay.value;
		sRecurringTime = frmSchedule.recurringTime.value;
		if (isDateValid(sRecurringTime, SCH_TM_FORMAT) == false)
		{
			alert(messageFormat(ERRMSG_INVALID_RECURRING_TIME, new Array(sRecurringTime, SCH_TM_FORMAT)));
			BUFFER_STATUS = false;
			requestFocus(frmSchedule.recurringTime);
			return;
		}
		
		if (frmSchedule.useStartDateTime.checked)
		{
			sStartDate = frmSchedule.startDate.value;
			if (isDateValid(sStartDate, SCH_DT_FORMAT) == false)
			{
				alert(messageFormat(ERRMSG_INVALID_START_DATE, new Array(sStartDate, SCH_DT_FORMAT)));
				BUFFER_STATUS = false;
				requestFocus(frmSchedule.startDate);
				return;
			}

			// SCR 69654
			if (isDateNotOld(sStartDate, SCH_DT_FORMAT) == false)
			{
				alert(messageFormat(ERRMSG_INVALID_START_DATE_TOO_OLD, new Array(sStartDate)));
				BUFFER_STATUS = false;
				requestFocus(frmSchedule.startDate);
				return;
			}
		}
		
		sUseStartDateTime = "" + frmSchedule.useStartDateTime.checked;

		if (frmSchedule.useEndDateTime.checked)
		{
			// VALIDATE 'RECURRING' END DATE
			sEndDate = frmSchedule.endDate.value;
			if (isDateValid(sEndDate, SCH_DT_FORMAT) == false)
			{
				alert(messageFormat(ERRMSG_INVALID_END_DATE, new Array(sEndDate, SCH_DT_FORMAT)));
				BUFFER_STATUS = false;
				requestFocus(frmSchedule.endDate);
				return;
			}

			// SCR 69654
			if (isDateNotOld(sEndDate, SCH_DT_FORMAT) == false)
			{
				alert(messageFormat(ERRMSG_INVALID_END_DATE_TO_OLD, new Array(sEndDate, SCH_DT_FORMAT)));
				BUFFER_STATUS = false;
				requestFocus(frmSchedule.endDate);
				return;
			}
		}

		sUseEndDateTime = "" + frmSchedule.useEndDateTime.checked;
	}

	if (sScheduleType == "once")
	{
		// VALIDATE 'ONCE' DATE
		sOnceDate = frmSchedule.onceDate.value;
		if (isDateValid(sOnceDate, SCH_DT_FORMAT) == false)
		{
			alert(messageFormat(ERRMSG_INVALID_ONCE_DATE, new Array(sOnceDate, SCH_DT_FORMAT)));
			BUFFER_STATUS = false;
			requestFocus(frmSchedule.onceDate);
			return;
		}

		// SCR 69654
		if (isDateNotOld(sOnceDate, SCH_DT_FORMAT) == false)
		{
			alert(messageFormat(ERRMSG_INVALID_ONCE_DATE_TO_OLD, new Array(sOnceDate, SCH_DT_FORMAT)));
			BUFFER_STATUS = false;
			requestFocus(frmSchedule.onceDate);
			return;
		}

		// VALIDATE 'ONCE' TIME
		sOnceTime = frmSchedule.onceTime.value;
		if (isDateValid(sOnceTime, SCH_TM_FORMAT) == false)
		{
			alert(messageFormat(ERRMSG_INVALID_ONCE_TIME, new Array(sOnceTime, SCH_TM_FORMAT)));
			BUFFER_STATUS = false;
			requestFocus(frmSchedule.onceTime);
			return;
		}
	}

	// For users with very low priority, no priority radio buttons are displayed

	var priorityRadios = frmSchedule.priorityRadioValue;
	if (priorityRadios == null || getRadioValue(priorityRadios) == "-1")
	{
		// VALIDATE 'OTHER' PRIORITY (TEXT BOX)
		sPriority = frmSchedule.otherPriorityValue.value;			
		if (!validateInteger(sPriority) || trim(sPriority) == "")
		{
			 alert(messageFormat(ERRMSG_INVALID_PRIORITY_VALUE, new Array(sPriority)));
			 BUFFER_STATUS = false;
			 requestFocus(frmSchedule.otherPriorityValue);
			 return;
		}

		var maxJobPriority = frmSchedule.maxJobPriority.value;

		sPriority = parseInt(sPriority);
		if (sPriority < 1 || sPriority > maxJobPriority)
		{
			 alert(messageFormat(ERRMSG_INVALID_PRIORITY_RANGE, new Array(sPriority , maxJobPriority)));
			 BUFFER_STATUS = false;
			 requestFocus(frmSchedule.otherPriorityValue);
			 return;
		}
	}
	else
	{
		sPriority = getRadioValue(priorityRadios);
	}


	// ALL VALIDATION SUCCESSFUL; UPDATE DISPATCHER FORM
	if (frmDispatch != null)
	{
		frmDispatch.__jobName.value = sJobName;
		frmDispatch.__scheduleType.value = sScheduleType;
		frmDispatch.__recurringDay.value = sRecurringDay;
		frmDispatch.__recurringTime.value = sRecurringTime;
		frmDispatch.__onceDate.value = sOnceDate;
		frmDispatch.__onceTime.value = sOnceTime;
		frmDispatch.__startDate.value = sStartDate;
		frmDispatch.__useStartDateTime.value = sUseStartDateTime;
		frmDispatch.__endDate.value = sEndDate;
		frmDispatch.__useEndDateTime.value = sUseEndDateTime;
		frmDispatch.__priority.value = sPriority;
		
		BUFFER_STATUS = true;
		return;
	}

	BUFFER_STATUS = true;
}

/**
 *
 * Feature: NewRequest (Scheduled)
 */
function buffer_output(frmOutput, frmDispatch)
{
	sHeadline = frmOutput.headline.value;
	sOutputFolderType = getRadioValue(frmOutput.folderType);
	sOutputFolder = trim(frmOutput.absFolder.value);
	if (sOutputFolderType == "absolute")
	{
		if (!validateHomeFolder(sOutputFolder))
		{
			requestFocus(frmOutput.absFolder);
			BUFFER_STATUS = false;
			return;
		}
	}
	sOutputName = frmOutput.outputName.value;
	if (trim(sOutputName) == "")
	{
		alert(ERRMSG_EMPTY_OUTPUT_DOC);
		requestFocus(frmOutput.outputName);
		BUFFER_STATUS = false;
		return;
	}
	sOutputName = getFullyQualifiedName(sOutputFolder, sOutputName);

	sVersionName = frmOutput.versionName.value;
	sIfExists = getRadioValue(frmOutput.ifExists);
	if (frmOutput.keep.checked)
	{
		frmOutput.nVersions.value = trim(frmOutput.nVersions.value);
		if (!validateInteger(frmOutput.nVersions.value) || trim(frmOutput.nVersions.value) == "")
		{
			alert(ERRMSG_KEEP_NUMBER_INVALID);
			requestFocus(frmOutput.nVersions);
			BUFFER_STATUS = false;
			return;
		}
		sIfExists += frmOutput.nVersions.value;
	}

	// ALL VALIDATION SUCCESSFUL; UPDATE DISPATCHER FORM
	if (frmDispatch != null)
	{
		frmDispatch.__headline.value = sHeadline;
		frmDispatch.__outputFolderType.value = sOutputFolderType;
		frmDispatch.__outputName.value = sOutputName;
		frmDispatch.__versionName.value = sVersionName;
		frmDispatch.__ifExists.value = sIfExists;
		BUFFER_STATUS = true;
		return;
	}

	BUFFER_STATUS = false;
}

function struts_buffer_output(frmOutput, frmDispatch)
{
	sHeadline = frmOutput.headline.value;
	sOutputFolderType = getRadioValue(frmOutput.folderType);
	sOutputFolder = trim(frmOutput.absFolder.value);
	if (sOutputFolderType == "absolute")
	{
		if (!validateHomeFolder(sOutputFolder))
		{
			requestFocus(frmOutput.absFolder);
			BUFFER_STATUS = false;
			return;
		}
	}
	sOutputName = frmOutput.outputName.value;
	if (trim(sOutputName) == "")
	{
		alert(ERRMSG_EMPTY_OUTPUT_DOC);
		requestFocus(frmOutput.outputName);
		BUFFER_STATUS = false;
		return;
	}
	sOutputName = getFullyQualifiedName(sOutputFolder, sOutputName);

	sVersionName = frmOutput.versionName.value;
	sIfExists = getRadioValue(frmOutput.ifExists);
	if (frmOutput.keep.checked)
	{
		frmOutput.numVersions.value = trim(frmOutput.numVersions.value);
		if (!validateInteger(frmOutput.numVersions.value) || trim(frmOutput.numVersions.value) == "")
		{
			alert(ERRMSG_KEEP_NUMBER_INVALID);
			requestFocus(frmOutput.numVersions);
			BUFFER_STATUS = false;
			return;
		}
		sIfExists += frmOutput.numVersions.value;
	}

	// ALL VALIDATION SUCCESSFUL; UPDATE DISPATCHER FORM
	if (frmDispatch != null)
	{
		frmDispatch.__headline.value = sHeadline;
		frmDispatch.__outputFolderType.value = sOutputFolderType;
		frmDispatch.__outputName.value = sOutputName;
		frmDispatch.__versionName.value = sVersionName;
		frmDispatch.__ifExists.value = sIfExists;
		BUFFER_STATUS = true;
		return;
	}

	BUFFER_STATUS = true;
}

/**
 *
 * Feature: NewRequest (Immediate)
 */
function buffer_save_as(frmSaveAs, frmDispatch)
{
	sSaveOutput = "" + true;
	sOutputFolderType = getRadioValue(frmSaveAs.folderType);
	sOutputFolder = trim(frmSaveAs.absFolder.value);
	sOutputName = frmSaveAs.outputName.value;

	if (sOutputFolderType == "absolute")
	{
		if (!validateHomeFolder(sOutputFolder))
		{
			requestFocus(frmSaveAs.absFolder);
			BUFFER_STATUS = false;
			return;
		}
	}

	if (trim(sOutputName) == "")
	{
		alert(ERRMSG_EMPTY_OUTPUT_DOC);
		requestFocus(frmSaveAs.outputName);
		BUFFER_STATUS = false;
		return;
	}
	sOutputName = getFullyQualifiedName(sOutputFolder, sOutputName);

	sVersionName = frmSaveAs.versionName.value;
	sIfExists = getRadioValue(frmSaveAs.ifExists);
	if (frmSaveAs.keep.checked)
	{
		frmSaveAs.nVersions.value = trim(frmSaveAs.nVersions.value);
		if (!validateInteger(frmSaveAs.nVersions.value) || trim(frmSaveAs.nVersions.value) == "")
		{
			alert(ERRMSG_KEEP_NUMBER_INVALID);
			requestFocus(frmSaveAs.nVersions);
			BUFFER_STATUS = false;
			return;
		}
		sIfExists += frmSaveAs.nVersions.value;
	}

	// ALL VALIDATION SUCCESSFUL; UPDATE DISPATCHER FORM
	if (frmDispatch != null)
	{
		frmDispatch.__saveOutput.value = sSaveOutput;
		frmDispatch.__outputFolderType.value = sOutputFolderType;
		frmDispatch.__outputName.value = sOutputName;
		frmDispatch.__versionName.value = sVersionName;
		frmDispatch.__ifExists.value = sIfExists;
		BUFFER_STATUS = true;
		return;
	}

	BUFFER_STATUS = false;
}

function struts_buffer_save_as(frmSaveAs, frmDispatch)
{
	sSaveOutput = "" + true;
	sOutputFolderType = getRadioValue(frmSaveAs.folderType);
	sOutputFolder = trim(frmSaveAs.absFolder.value);
	sOutputName = frmSaveAs.outputName.value;

	if (sOutputFolderType == "absolute")
	{
		if (!validateHomeFolder(sOutputFolder))
		{
			requestFocus(frmSaveAs.absFolder);
			BUFFER_STATUS = false;
			return;
		}
	}

	if (trim(sOutputName) == "")
	{
		alert(ERRMSG_EMPTY_OUTPUT_DOC);
		requestFocus(frmSaveAs.outputName);
		BUFFER_STATUS = false;
		return;
	}
	sOutputName = getFullyQualifiedName(sOutputFolder, sOutputName);

	sVersionName = frmSaveAs.versionName.value;
	sIfExists = getRadioValue(frmSaveAs.ifExists);
	if (frmSaveAs.keep.checked)
	{
		frmSaveAs.numVersions.value = trim(frmSaveAs.numVersions.value);
		if (!validateInteger(frmSaveAs.numVersions.value) || trim(frmSaveAs.numVersions.value) == "")
		{
			alert(ERRMSG_KEEP_NUMBER_INVALID);
			requestFocus(frmSaveAs.numVersions);
			BUFFER_STATUS = false;
			return;
		}
		sIfExists += frmSaveAs.numVersions.value;
	}

	// ALL VALIDATION SUCCESSFUL; UPDATE DISPATCHER FORM
	if (frmDispatch != null)
	{
		frmDispatch.__saveOutput.value = sSaveOutput;
		frmDispatch.__outputFolderType.value = sOutputFolderType;
		frmDispatch.__outputName.value = sOutputName;
		frmDispatch.__versionName.value = sVersionName;
		frmDispatch.__ifExists.value = sIfExists;
		BUFFER_STATUS = true;
		return;
	}

	BUFFER_STATUS = true;
}


/**
 *
 */

function submitJob(doc, frmDispatch, sFQExecName, sServerURL, sVolume, bNewWindow)
{

	if (!BUFFER_STATUS) return;
	
	if (frmDispatch.name == "frmDispatch_immediate")
	{
		sRequestURI = "../servlet";
		
		if ((sFQExecName.length > 0) && (sFQExecName.charAt(0) != '/')) 
		{
			sRequestURI += "/";
		}
		
		sRequestURI += encode_Except_Dot_Slash_Semicolon_Underscore(sFQExecName);

		if (bNewWindow)
		{
			frmDispatch.target = "__syncview" + (new Date()).getUTCMilliseconds();
		}
		
		frmDispatch.action = sRequestURI;
		frmDispatch.submit();
		
		if (bNewWindow)
		{
			window.location.href = "../../../filesfolders/index.jsp?serverURL=" + encode(sServerURL) + "&volume=" + encode(sVolume);
		}
	}
	else
	{
		frmDispatch.submit();
	}
}


/**
 *	SubmitJob JS has been modified for struts restructure
 *	
 */
function struts_submitJob(doc, invoke)
{
	// parameter validation
	if (typeof(validateParameters) != 'undefined')
	{
		error = validateParameters();
		if (null != error)
		{
			alert(error);
			return;
		}
	}
	
	//validate values of required and non-required parameters before submitting the report
	if( invoke )
	{
		if( typeof(validateReqNonReqParams) != 'undefined')
		{
			error =	validateReqNonReqParams();
			if( null != error)
			{
				alert(error);
				return;
			}
		}
	}
	
	// Special logic when we are on jsapiparameters.jsp page
	if( typeof(populateChangedPDsInForm) == 'function' )
	{
		populateChangedPDsInForm( doc, invoke, submitForm ); //populate the changes parameters value from the Web 2.0 parameter page into the submit form
	}
	else
	{
		submitForm(doc, invoke)
	}

}

 //submit the form for execution
function submitForm( doc, invoke )
{
	//	Field validation for different sections
	if(doc.AcSubmitJobActionForm.jobType.value == "async")
	{
		if(typeof(doc.AcSubmitJobActionForm.jobName) != "undefined")
		{
			struts_buffer_schedule(doc.AcSubmitJobActionForm, null);
		}
		else if(typeof(doc.AcSubmitJobActionForm.headline) != "undefined")
		{
			struts_buffer_output(doc.AcSubmitJobActionForm, null);
		}
		else
		{
			BUFFER_STATUS = true;
		}
	}
	else if(doc.AcSubmitJobActionForm.jobType.value == "sync")
	{
		if(typeof(doc.AcSubmitJobActionForm.saveOutput) != "undefined")
		{
			struts_buffer_save_as(doc.AcSubmitJobActionForm, null);
		}
		else if(typeof(doc.AcSubmitJobActionForm.stringSaveOutput) != "undefined")
		{
			struts_buffer_save_as(doc.AcSubmitJobActionForm, null);
		}
		else
		{
			BUFFER_STATUS = true;
		}
	}

	//	Submit the form
	if (!BUFFER_STATUS) return;

	if(invoke)
	{
		doc.AcSubmitJobActionForm.invokeSubmit.value = "true";
	}
	else
	{
		doc.AcSubmitJobActionForm.invokeSubmit.value = "";
	}	
	doc.AcSubmitJobActionForm.submit();
}

 function subscription_submit( doc, form )
 {
	// Special logic when we are on jsapiparameters.jsp page
		if( typeof(populateChangedPDsInSubscriptionForm) == 'function' )
		{
			populateChangedPDsInSubscriptionForm( doc, form ); //populate the changes parameters value from the Web 2.0 parameter page into the submit form
		}
		else
		{
			form.submit();
		}
 }
 
 
//================================= JSAPI parameter related functions ==========================================================
 function sendJSAPISOAP ( encodedFileName )
 {
 	parameterObj.showProgressIndicator();
 	var xmlEscapedFileName = actuate.parameter.Utility.xmlEscape(encodedFileName);
 	var sBody = "<GetCustomParameterDefinitions><ReportName>" + xmlEscapedFileName + "</ReportName></GetCustomParameterDefinitions>";
 	var ajaxConn = new actuate.parameter.util.AjaxForWsservlet();
 	actuate.parameter.Utility.sendSoapMessage( ajaxConn, sBody, parseResponseAndRenderPD , null, true);	
 }

 //parse the XMLdata to get ArrayOfPds to render
 function parseResponseAndRenderPD( response )
 {
  	var xmlData = response.getResponseXml();
  	var paramParser = new actuate.parameter.ParameterParser();
  	paramParser.parseParameterDefinition(xmlData );
 	var arrayOfPds = paramParser.getParameterDefinitions();	
    //clear progress bar before rendering the parameters
 	//do not set focus on the first element when its mobile device as it may trigger 
 	//onclick action on that control when user clicks anywhere
 	if (isMobileDevice == true)
 		parameterObj.renderContent( arrayOfPds );
 	else
 		parameterObj.renderContent( arrayOfPds, setFocusOnFirstElement );
 }

 //set focus on the first report element
 function setFocusOnFirstElement( )
 { 
 	var masterContainer = parameterObj.getParameterContainer();
 	var PDs = masterContainer.getParameterDefinitions();
 	if(PDs != null && PDs.length > 0)
 	{
		if ( PDs[0].getDefaultValueIsNull() )
			return;
 		var HTMLControlID = masterContainer.createUniqueControlID(PDs[0].getName());
 		var belongsToAGroup = (PDs[0].getGroup() != null && PDs[0].getGroup() != "");
 		var layout = parameterObj.getLayout();
 		var parameterIsCollapsed = (belongsToAGroup && layout == actuate.parameter.Constants.LAYOUT_COLLAPSIBLE);
 		//the default layout is "collapsible" layout. If the first control is  group parameter then the group
 		//would be collapsed by default. Hence there is no need to set the focus.
 		if( HTMLControlID != null && !parameterIsCollapsed )
 		{
 			var firstElem = document.getElementById(HTMLControlID);
 			if( firstElem  && firstElem.disabled == false)
 			{
 				if(firstElem.tagName.toUpperCase() == "FIELDSET" )
 				{
 					//IE Bug- IE returns first element as FIELDSET when used getElementsByName()
 					//Then set focus on the next element which is the first radio button in the list.
 					if(document.getElementsByName(HTMLControlID)[0].tagName.toUpperCase() == "FIELDSET")
 					{
 						document.getElementsByName(HTMLControlID)[1].focus();
 					}else
 					{
 						document.getElementsByName(HTMLControlID)[0].focus();
 					}
 				}else
 				{
 					firstElem.focus();
 				}
 			}
 		}
 	}
 }	

/**
 * Download the parameter values from JSAPI component so that the final values are all encoded in correct format
 * the call the functin to process all the form elements to be submitted to the struts java form
 */
 function downloadJSAPIParameterValues ( )
 {
	 var pvs = parameterObj.downloadParameterValues( processFormElements )
 }
 
 /**
  * Process all the elements in the submit form to separate out JSAPI parameters and 
  * then call the call back function which will pass these values to the struts java form for execution.
  * 
  * @param {ParameterValue} - array of parameter values
  * @return void
  */
 function processFormElements( pvs )
 {
	 	var theForm = document.forms['AcSubmitJobActionForm'];
		var container = parameterObj.getParameterContainer();
		var PDs = container.getParameterDefinitions();
		if(container != null && PDs != null && pvs != null && pvs.length > 0)
		{
			var parameterIndex = 0;
			for( var i = 0; i < pvs.length; i++ )
			{
				var parameterName = pvs[i].getName();
				var parameterValue = pvs[i].getValue();
				var parameterValueIsNull = pvs[i].getValueIsNull();
				if( !actuate.parameter.Utility.isNoValueSupported( PDs[i], parameterObj.getReportName(), false ) )
					parameterValueIsNull = false;
				
				createHiddenParam("parametersname"+parameterIndex, encodeURIComponent( parameterName ), theForm, "parameters["+parameterIndex+"].name");
				createHiddenParam("parametersvalue"+parameterIndex, encodeURIComponent( parameterValue ), theForm, "parameters["+parameterIndex+"].value");
				createHiddenParam("parametersvalueIsNull"+parameterIndex, parameterValueIsNull, theForm, "parameters["+parameterIndex+"].valueIsNull");
				parameterIndex++;
			}
		}

		//check for collapsible parameter groups
		var collapsibleGroups = actuate.util.Utility.getElementsByClassName("groupDisplayName");
		if( collapsibleGroups )
		{
			var groupIndex=0;
			for( var groupLen = 0; groupLen < collapsibleGroups.length; groupLen++ )
			{
				var group = collapsibleGroups[groupLen];
				var imageItem = group.childNodes[0];
				if(imageItem && imageItem.expanded == true)
				{
					createHiddenParam("expandedGroupNames"+groupIndex, imageItem.groupName, theForm, "expandedGroupNames");
					groupIndex++;
				}
			}
		}
	
		if( resultConsumer )
			resultConsumer( submitDoc, invokeSubmit );
 }
  
 /**
  *  Gets the value of the dynamic filter parameter from the array of parameter values
  *  
  * @param { Array } pvs - Array of parameter values
  * @param {String} name - name of the dynamic filter parameter
  * @return{String} value - value of the dynamic filter parameter
  */
  function getFilterValue( pvs, name )
 {
	 var value = null;
	 if( pvs )
	 {
		 for ( var len = 0; len < pvs.length; len++ )
		 {
			 var pv = pvs[len];
			 if( name == pv.getName() )
			 {
				 value = pv.getValue();
				 break;
			 }
		 }
	 }
	 return value;
 }
//check if the element name starts with the unique string
//which represents that the element is the report parameter from the Web2.0 parameter page
function startsWithContainerName(elementName)
{
	var checkString = "maincontainerparametergroupid0parameterid";
	var subSection = elementName.substring(0,checkString.length).toLowerCase();
	var answer = (subSection == checkString.toLowerCase());
	return answer;
}

//add the value entered by the user in the text field to the drop down list of the combobox
function appendChangedValueToOptions( selectControl, txtControl, container)
{
	var changedValue = txtControl.value;
	var controlID = selectControl.id;
	var elOptNew = document.createElement('option');
	elOptNew.title = changedValue;
	elOptNew.value = changedValue;
	elOptNew.selected = true;
	var txtNode = document.createTextNode( changedValue );
	elOptNew.appendChild( txtNode );
	selectControl.appendChild( elOptNew );
}

//create hidden field to store the pipe seperated value for the select-multiple control (multilist control)
function createHiddenParam( elementId, controlValue, submitForm, elementName)
{
	var element = document.getElementById(elementId);
	if (element == null)
	{
		element = document.createElement('input');
		element.type = "hidden";
		element.name = elementName;
		element.id = elementId;
		submitForm.appendChild(element);
	}

	element.value = controlValue;
}

function AddIsNullElementsIntoArray(array, controlID)
{
	var nullControlID = getHiddenIsNullID(controlID);
	var nullControl = document.getElementById(nullControlID);
	if( nullControl )
	{
		array.push(nullControlID);
	}
}
	
function create__isNullParameter (valueIsNull, container, form, controlID, savedValue)
{
	if (valueIsNull)
	{	
		var paramDef = container.getParamDefFromControlID(controlID);
							
		if (paramDef != undefined)
		{
		// For parameter type dateTime,  if controlid is controlID.time then paramDef is undefined.

			var paramName = paramDef.getName();
			var hiddenID = getHiddenIsNullID(controlID);
			createHiddenParam(hiddenID, paramName, form, "__isnull");
			var name = "__isnull_" + paramName;
			createHiddenParam(name,  savedValue, form, name);
		}	
	}
}

 function isValidFormat( value, isStructure, format )
{
	if (value != null && value.length >= 0)
	{
		if(isStructure && value.toLowerCase() == "null")
		{
			return null;
		}
		if (!isDateValid( value, format ))
		{
			errorMessage = messageFormat(errorMessage, new Array( parameterName, value, format));
			return errorMessage;
		}
	}
	return null;
}

 //set the default value list into the parameter definition of the respective multi select control
function setDefaultValueListForMultilist( defaultValueList, paramName, arrayOfPds)
{
	if( arrayOfPds != null)
	{
		for ( var i = 0; i < arrayOfPds.length; i++)
		{
			if( arrayOfPds[i].getName().toUpperCase() == paramName.toUpperCase())
			{
				arrayOfPds[i].setDefaultValueList(defaultValueList);
				break;
			}
		}
	}
	return arrayOfPds;
}


function getHiddenIsNullID( controlID )
{
	return "__hiddenisnull" + controlID;
}

//function will remove the invalid hidden no value elements
//when null value is unchecked then the form should not have the hidden element corresponding
//to the "no value" checkbox. This happens more often in FF because of cache
function remove__isNullParameter( array )
{
	if( array.length >0)
	{
		for(var j=0; j<array.length; j++)
		{
			var nullControl = document.getElementById(array[j]);
			if( nullControl )
			{
				var parent = nullControl.parentNode;
				parent.removeChild( nullControl );
			}
		}
	}
} 

//================================= END JSAPI parameter related functions ==========================================================

/**
 *
 */
function saveOptions(doc, frm, sSuffix)
{
	sOK = frm.oldKey.value;
	sNK = frm.newKey.value;
	sCK = frm.confirmKey.value;
	sK = frm.pwd.value;

	if (sOK != "" || sNK != "" || sCK != "")
	{
		if (sK != sOK)
		{
			alert(ERRMSG_WRONG_EXISTING_PASSWORD);
			BUFFER_STATUS = false;
		}
		else if (sNK != sCK)
		{
			alert(ERRMSG_WRONG_REENTERED_PASSWORD);
			BUFFER_STATUS = false;
		}
	}

	if (!BUFFER_STATUS) return;

	if (sSuffix == null || sSuffix == "")
	{
		// REGULAR HANDLING FOR GENERAL AND NOTIFICATION TABS
		frm.__submit.value = "true";
		frm.submit();
	}
	else
	{
		// SPECIAL HANDLING FOR SWITCHING OUT OF THE CHANNEL TAB
		frm.action = "do_update.jsp?" + sSuffix;
		frm.__submit.value = "true";
		frm.submit();

		//IF ALL THE ELEMENTS ARE ADDED TO THE URL PASSWORD IS ALSO VISSIBLE TO THE USER IN URL - BOSE
		/*for (i = 0; i < frm.elements.length; i++)
		{
			sParamName = frm.elements[i].name;
			sParamValue = frm.elements[i].value;
			if (sParamName.toUpperCase() == "__SUBMIT") sParamValue = "true";
			sSuffix += sParamName + "=" + encode(sParamValue) + "&";
		}
		sSuffix = sSuffix.substring(0, sSuffix.length - 1);
		window.location.href = "do_update.jsp" + sSuffix;*/
	}
}

/**
 *
 */
function changeOptionsTab(frm, sSubPage, sSuffix)
{
	if (frm == null)
	{
		alert(MSG_FAIL_TAB_CHANGE);
		return;
	}

	if (!BUFFER_STATUS) return;

	if (sSuffix == null || sSuffix == "")
	{
		// REGULAR HANDLING FOR GENERAL AND NOTIFICATION TABS
		frm.__subpage.value = sSubPage;
		frm.action = "index.jsp";
		frm.submit();
	}
	else
	{
		// SPECIAL HANDLING FOR SWITCHING OUT OF THE CHANNEL TAB
		sSuffix = "?" + sSuffix;
		for (i = 0; i < frm.elements.length; i++)
		{
			sParamName = frm.elements[i].name;
			sParamValue = frm.elements[i].value;
			if (sParamName == "__subpage") sParamValue = sSubPage;
			sSuffix += sParamName + "=" + encode(sParamValue) + "&";
		}
		sSuffix = sSuffix.substring(0, sSuffix.length - 1);
		window.location.href = "index.jsp" + sSuffix;
	}
}

/**
 *
 */
function changeNewRequestTab(doc, frm, sSubPage, sJobType, sFQExecName)
{
	if (frm == null)
	{
		alert(MSG_FAIL_TAB_CHANGE);
		return;
	}

	if (!BUFFER_STATUS)
	{
		return;
	}

	frm.__subpage.value = sSubPage;
	frm.action = "index.jsp";
	frm.submit();
}

/**
* Checks if the string is set to non-empty string or not
*/
function _isEmpty(myString)
{
	if ( myString == null || myString == undefined )
	{
		return true;
	}
	
	if ( typeof myString != 'object' )
	{
		if ( myString.charAt(0) == '' || myString == "" )
		{
			return true;
		}
	}	
	return false;
}

/**
 * Returns true if date string matches format of format string and
 * is a valid date. Else returns false.
 *
 * It is recommended that you trim whitespace around the value before
 * passing it to this function, as whitespace is NOT ignored!
 */
function isDateValid(dtString, expectedFormat)
{
	var dt = parseDate(dtString, expectedFormat);
	if (dt == 0) return false;
	return true;
}

/**
 * Date can not be old for schedule. This is true for once Date, start date, and
 * end date.
 */
function isDateNotOld(dtString, expectedFormat)
{
	var dt = parseDate(dtString, expectedFormat);
	var curDt = new Date();
	curDt.setHours(0);
	curDt.setMinutes(0);
	curDt.setSeconds(0);
	return !(dt < curDt);
}

/**
 * Returns a date in the output format specified.
 */
function formatDate(date, format)
{
	format = format+"";
	var result = "";
	var i_format = 0;
	var c = "";
	var token = "";
	var y = date.getYear() + "";
	var M = date.getMonth() + 1;
	var d = date.getDate();
	var H = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();
	var yyyy, yy, MMM, MM, dd, hh, h, mm, ss, ampm, HH, H, KK, K, kk, k;
	if (y.length < 4) y = y-0+1900;
	y = "" + y;
	yyyy = y;
	yy = y.substring(2,4);

	// Month
	if (M < 10) MM = "0" + M; else MM = M;
	MMM = MONTH_NAMES[M-1];

	// Date
	if (d < 10) dd = "0"+d; else dd = d;

	// Hour
	h = H; K = H; k = H + 1;
	if (h > 12) { h-=12; }
	if (h == 0) { h=12; }
	if (h < 10) { hh = "0"+h; } else { hh = h; }
	if (H < 10) { HH = "0"+K; } else { HH = H; }
	if (K > 11) { K-=12; }
	if (K < 10) { KK = "0"+K; } else { KK = K; }
	if (k < 10) { kk = "0"+k; } else { kk = k; }
	if (H > 11) { ampm = LOCALIZED_PM; } else { ampm = LOCALIZED_AM; }
	if (m < 10) { mm = "0"+m; } else { mm = m; }
	if (s < 10) { ss = "0"+s; } else { ss = s; }

	var value = new Object();
	value["yyyy"] = yyyy;	value["yy"] = yy;	value["y"] = y;
	value["MMM"] = MMM;		value["MM"] = MM;	value["M"] = M;
	value["dd"] = dd;		value["d"] = d;
	value["hh"] = hh;		value["h"] = h;
	value["HH"] = HH;		value["H"] = H;
	value["KK"] = KK;		value["K"] = K;
	value["kk"] = kk;		value["k"] = k;
	value["mm"] = mm;		value["m"] = m;
	value["ss"] = ss;		value["s"] = s;
	value["a"] = ampm;

	bQuote = false;
	while (i_format < format.length)
	{
		// Get next token from format string
		c = format.charAt(i_format);
		token = "";
		bQuote = (c == '\'' || c == '"');
		if (bQuote) i_format++; // SKIP QUOTE LITERAL

		while ((format.charAt(i_format) == c || bQuote) && (i_format < format.length))
		{
			if (format.charAt(i_format) == '\'' || format.charAt(i_format) == '"')
			{
				bQuote = false;
				i_format++;
				break;
			}
			token += format.charAt(i_format);
			i_format++;
		}

		if (value[token] != null)
		{
			result = result + value[token];
		}
		else
		{
			if (token.length > 0)
			{
				cStart = token[0];
				cEnd = token[token.length - 1];
				if ((cStart == '"' && cEnd == '"') || (cStart == '\'' && cEnd == '\''))
					token = token.substring(1, token.length - 1);
			}
			result = result + token;
		}
	}
	return result;
}

// INTERNALLY USED
function _isInteger(sValue, bChkSymbol, cPosSymbol, cNegSymbol)
{
	var digits = "0123456789";
	nLen = sValue.length;

	for (i = 0; i < nLen; i++)
	{
		c = sValue.charAt(i);
		if (digits.indexOf(c) == -1)
		{
			if (c == 'e' || c == 'E') // VALIDATE 3.5E+1
			{
				if (i >= nLen - 1) return false; // IF NO MORE CHARS EXIST, FAIL
				cSymbol = sValue.charAt(i + 1); // NEXT CHAR MUST BE A DIGIT, '+' OR A '-'
				if (cSymbol != cPosSymbol && cSymbol != cNegSymbol && cSymbol != '+' && cSymbol != '-' && digits.indexOf(cSymbol) == -1)
					return false;
				else
				{
					bStart = (digits.indexOf(cSymbol) != -1);
					for (k = i + 2; k < nLen; k++) // THIS/NEXT CHAR ONWARDS MUST BE DIGITS
					{
						c = sValue.charAt(k);
						if (digits.indexOf(c) == -1) return false;
						else bStart = true;
					}
					return bStart;
				}
			}
			else if (bChkSymbol)
			{
				if (c != cPosSymbol && c != cNegSymbol) return false;
				if (i > 0) return false;
				continue; // CONTINUE VALIDATION OF NEXT CHARACTER
			}
			return false;
		}
	}
	return true;
}

// INTERNALLY USED
function _getInt(str, i, minlength, maxlength)
{
	for (x = maxlength; x >= minlength; x--)
	{
		var token = str.substring(i, i + x);
		if (token.length < minlength) return null;
		if (_isInteger(token)) return token;
	}
	return null;
}

/**
 * Converts the given date into UTC after applying the timezone difference
 */
function getDateUTC(dt, tzOffset)
{
	dt.setTime(dt.getTime() - tzOffset);
	sYear = "" + dt.getYear();
	sMonth = "" + (dt.getMonth() + 1); // UTC REQUIRES MONTHS = 1 to 12
	sDate = "" + (dt.getDate());
	while (sMonth.length < 2) sMonth = "0" + sMonth;
	while (sDate.length < 2) sDate = "0" + sDate;
	return sYear + "-" + sMonth + "-" + sDate;
}

/**
 * Converts the given time into UTC after applying the timezone difference
 */
function getTimeUTC(dt, tzOffset)
{
	dt.setTime(dt.getTime() - tzOffset);
	sHour = "" + dt.getHours();
	sMinute = "" + dt.getMinutes()
	sSecond = "" + dt.getSeconds();
	while (sHour.length < 2) sHour = "0" + sHour;
	while (sMinute.length < 2) sMinute = "0" + sMinute;
	while (sSecond.length < 2) sSecond = "0" + sSecond;
	return sHour + ":" + sMinute + ":" + sSecond;
}

/**
 * Converts the given date/time into UTC after applying the timezone difference
 */
function getDateTimeUTC(dt, tzOffset)
{
	dtUTC = new Date(dt.getTime());
	sDate = getDateUTC(dtUTC, tzOffset);
	dtUTC = new Date(dt.getTime());
	sTime = getTimeUTC(dtUTC, tzOffset);
	return sDate + "T" + sTime;
}

/**
 * Parses a date string for a given format string
 */
function parseDate(dtString, format)
{
	if (dtString == null) return null;
	val = trim(dtString.toUpperCase());
	format = format+"";
	var i_val = 0;
	var i_format = 0;
	var c = "";
	var token = "";
	var token2= "";
	var x,y;
	var now   = new Date();
	var year  = now.getYear();
	var month = now.getMonth()+1;
	var date  = now.getDate();
	var hh    = now.getHours();
	var mm    = now.getMinutes();
	var ss    = now.getSeconds();
	var ampm  = "";

	while (i_format < format.length)
	{
		// Get next token from format string
		c = format.charAt(i_format);
		token = "";
		bQuote = (c == '\'' || c == '"');
		if (bQuote) i_format++; // SKIP QUOTE LITERAL

		while ((format.charAt(i_format) == c || bQuote) && (i_format < format.length))
		{
			if (format.charAt(i_format) == '\'' || format.charAt(i_format) == '"')
			{
				bQuote = false;
				i_format++;
				break;
			}
			token += format.charAt(i_format);
			i_format++;
		}

		// Extract contents of value based on format token
		if (token=="yyyy" || token=="yy" || token=="y")
		{
			if (token=="yyyy") { x=4;y=4; }// 4-digit year
			if (token=="yy")   { x=2;y=2; }// 2-digit year
			if (token=="y")    { x=2;y=4; }// 2-or-4-digit year
			year = _getInt(val,i_val,x,y);
			if (year == null) { return 0; }
			i_val += year.length;
			if (year.length == 2)
			{
				if (year > 70)
				{
					year = 1900+(year-0);
				}
				else
				{
					year = 2000+(year-0);
				}
			}
		}
		else if (token=="MMM") // Month name
		{
			month = 0;
			for (var i=0; i<MONTH_NAMES.length; i++)
			{
				var month_name = MONTH_NAMES[i];
				if (val.substring(i_val,i_val+month_name.length).toLowerCase() == month_name.toLowerCase())
				{
					month = i+1;
					if (month>12) { month -= 12; }
					i_val += month_name.length;
					break;
				}
			}
			if (month == 0) { return 0; }
			if ((month < 1) || (month>12)) { return 0; }
		}
		else if (token=="MM" || token=="M")
		{
			x=1; y=2;
			month = _getInt(val,i_val,x,y);
			if (month == null) { return 0; }
			if ((month < 1) || (month > 12)) { return 0; }
			i_val += month.length;
		}
		else if (token=="dd" || token=="d")
		{
			x=1; y=2;
			date = _getInt(val,i_val,x,y);
			if (date == null) { return 0; }
			if ((date < 1) || (date>31)) { return 0; }
			i_val += date.length;
		}
		else if (token=="hh" || token=="h")
		{
			x=1; y=2;
			hh = _getInt(val,i_val,x,y);
			if (hh == null) { return 0; }
			if ((hh < 1) || (hh > 12)) { return 0; }
			i_val += hh.length;
			hh--;
		}
		else if (token=="HH" || token=="H")
		{
			x=1; y=2;
			hh = _getInt(val,i_val,x,y);
			if (hh == null) { return 0; }
			if ((hh < 0) || (hh > 23)) { return 0; }
			i_val += hh.length;
		}
		else if (token=="KK" || token=="K")
		{
			x=1; y=2;
			hh = _getInt(val,i_val,x,y);
			if (hh == null) { return 0; }
			if ((hh < 0) || (hh > 11)) { return 0; }
			i_val += hh.length;
		}
		else if (token=="kk" || token=="k")
		{
			x=1; y=2;
			hh = _getInt(val,i_val,x,y);
			if (hh == null) { return 0; }
			if ((hh < 1) || (hh > 24)) { return 0; }
			i_val += hh.length;
			h--;
		}
		else if (token=="mm" || token=="m")
		{
			x=1; y=2;
			mm = _getInt(val,i_val,x,y);
			if (mm == null) { return 0; }
			if ((mm < 0) || (mm > 59)) { return 0; }
			i_val += mm.length;
		}
		else if (token=="ss" || token=="s")
		{
			x = 1; y = 2;
			ss = _getInt(val, i_val, x, y);
			if (ss == null) { return 0; }
			if ((ss < 0) || (ss > 59)) { return 0; }
			i_val += ss.length;
		}
		else if (token=="a")
		{
			nLenAM = LOCALIZED_AM.length;
			nLenPM = LOCALIZED_PM.length;
			if (val.substring(i_val, i_val + nLenAM) == LOCALIZED_AM.toUpperCase())
			{
				ampm = LOCALIZED_AM.toUpperCase();
				i_val += nLenAM;
			}
			else if (val.substring(i_val, i_val + nLenPM) == LOCALIZED_PM.toUpperCase())
			{
				ampm = LOCALIZED_PM.toUpperCase();
				i_val += nLenPM;
			}
			else
			{
				return 0;
			}
		}
		else
		{
			sUnknownPattern = val.substring(i_val, i_val + token.length);
			if (sUnknownPattern != token.toUpperCase())
			{
				return 0;
			}
			else
			{
				i_val += token.length;
			}
		}
	}

	//	Extra characters
	if (i_val != dtString.length )
	{
		return 0;
	}
	
	// Is date valid for month?
	if (month == 2)
	{
		if (((year % 4 == 0) && (year % 100 != 0) ) || (year % 400 == 0)) // leap year
		{
			if (date > 29) { return false; }
		}
		else
		{
			if (date > 28) { return false; }
		}
	}
	if ((month == 4) || (month == 6) || (month == 9) || (month == 11))
	{
		if (date > 30) { return false; }
	}
	if (hh < 12 && ampm == LOCALIZED_PM.toUpperCase())
	{
		hh += 12;
	}
	else if (hh > 11 && ampm == LOCALIZED_AM.toUpperCase())
	{
		hh -= 12;
	}
	dt = new Date(year, month - 1, date, hh, mm, ss);
	return dt.getTime();
}

/**
 *
 */
function ltrim(str)
{
	for (var i=0; str.charAt(i)==" "; i++);
	return str.substring(i,str.length);
}

/**
 *
 */
function rtrim(str)
{
	for (var i=str.length-1; str.charAt(i)==" "; i--);
	return str.substring(0,i+1);
}

/**
 *
 */
function trim(str)
{
	return ltrim(rtrim(str));
}

/**
 *
 */
function requestFocus(obj)
{
	obj.select();
	obj.focus();
}

/**
 * Returns the name of a file object as a fully qualified name as required by most API/URL Parameters, etc.
 * NOTE: sVersion is optional; the method may be called using only 2 arguments.
 */
function getFullyQualifiedName(sFolder, sFileName, sVersion)
{
	if (sFolder != null && sFolder.length > 0 && sFolder.charAt(sFolder.length - 1) != "/") sFolder += "/";
	sFQName = sFolder + sFileName;
	if (sVersion != null && sVersion.length > 0) sFQName += ";" + sVersion;
	return sFQName;
}

/**
 * Quick lookup table for converting 8BIT to HEX
 */
var hex = new Array(
	"%00", "%01", "%02", "%03", "%04", "%05", "%06", "%07",
	"%08", "%09", "%0a", "%0b", "%0c", "%0d", "%0e", "%0f",
	"%10", "%11", "%12", "%13", "%14", "%15", "%16", "%17",
	"%18", "%19", "%1a", "%1b", "%1c", "%1d", "%1e", "%1f",
	"%20", "%21", "%22", "%23", "%24", "%25", "%26", "%27",
	"%28", "%29", "%2a", "%2b", "%2c", "%2d", "%2e", "%2f",
	"%30", "%31", "%32", "%33", "%34", "%35", "%36", "%37",
	"%38", "%39", "%3a", "%3b", "%3c", "%3d", "%3e", "%3f",
	"%40", "%41", "%42", "%43", "%44", "%45", "%46", "%47",
	"%48", "%49", "%4a", "%4b", "%4c", "%4d", "%4e", "%4f",
	"%50", "%51", "%52", "%53", "%54", "%55", "%56", "%57",
	"%58", "%59", "%5a", "%5b", "%5c", "%5d", "%5e", "%5f",
	"%60", "%61", "%62", "%63", "%64", "%65", "%66", "%67",
	"%68", "%69", "%6a", "%6b", "%6c", "%6d", "%6e", "%6f",
	"%70", "%71", "%72", "%73", "%74", "%75", "%76", "%77",
	"%78", "%79", "%7a", "%7b", "%7c", "%7d", "%7e", "%7f",
	"%80", "%81", "%82", "%83", "%84", "%85", "%86", "%87",
	"%88", "%89", "%8a", "%8b", "%8c", "%8d", "%8e", "%8f",
	"%90", "%91", "%92", "%93", "%94", "%95", "%96", "%97",
	"%98", "%99", "%9a", "%9b", "%9c", "%9d", "%9e", "%9f",
	"%a0", "%a1", "%a2", "%a3", "%a4", "%a5", "%a6", "%a7",
	"%a8", "%a9", "%aa", "%ab", "%ac", "%ad", "%ae", "%af",
	"%b0", "%b1", "%b2", "%b3", "%b4", "%b5", "%b6", "%b7",
	"%b8", "%b9", "%ba", "%bb", "%bc", "%bd", "%be", "%bf",
	"%c0", "%c1", "%c2", "%c3", "%c4", "%c5", "%c6", "%c7",
	"%c8", "%c9", "%ca", "%cb", "%cc", "%cd", "%ce", "%cf",
	"%d0", "%d1", "%d2", "%d3", "%d4", "%d5", "%d6", "%d7",
	"%d8", "%d9", "%da", "%db", "%dc", "%dd", "%de", "%df",
	"%e0", "%e1", "%e2", "%e3", "%e4", "%e5", "%e6", "%e7",
	"%e8", "%e9", "%ea", "%eb", "%ec", "%ed", "%ee", "%ef",
	"%f0", "%f1", "%f2", "%f3", "%f4", "%f5", "%f6", "%f7",
	"%f8", "%f9", "%fa", "%fb", "%fc", "%fd", "%fe", "%ff"
);

/**
 * Encode a string to the "x-www-form-urlencoded" form, enhanced
 * with the UTF-8-in-URL proposal. This is what happens:
 *
 * <ul>
 * <li><p>The ASCII characters 'a' through 'z', 'A' through 'Z',
 *        and '0' through '9' remain the same.
 *
 * <li><p>The unreserved characters - _ . ! ~ * ' ( ) remain the same.
 *
 * <li><p>The space character ' ' is converted into a plus sign '+'.
 *
 * <li><p>All other ASCII characters are converted into the
 *        3-character string "%xy", where xy is
 *        the two-digit hexadecimal representation of the character
 *        code
 *
 * <li><p>All non-ASCII characters are encoded in two steps: first
 *        to a sequence of 2 or 3 bytes, using the UTF-8 algorithm;
 *        secondly each of these bytes is encoded as "%xx".
 * </ul>
 *
 * @param s The string to be encoded
 * @return The encoded string
 */

function encode(s)
{
	var sbuf = new String("");
	var len = s.length;
	for (var i = 0; i < len; i++)
	{
		var ch = s.charAt(i);
		var chCode = s.charCodeAt(i);

		if (('A' <= ch && ch <= 'Z')  // UPPERCASE LATIN-1
		 || ('a' <= ch && ch <= 'z')  // LOWERCASE LATIN-1
		 || ('0' <= ch && ch <= '9')) // NUMERICAL DIGITS
		{
			sbuf += ch;
		}
		else if (chCode <= 0x007f)	// RANGE (00 - 7f)
		{
			sbuf += hex[chCode];
		}
		else if (chCode <= 0x07ff) // RANGE (007f - 07ff)
		{
			sbuf += (hex[0xc0 | (chCode >> 6)]);
			sbuf += (hex[0x80 | (chCode & 0x3F)]);
		}
		else // RANGE (07ff - ffff)
		{
			sbuf += (hex[0xe0 | (chCode >> 12)]);
			sbuf += (hex[0x80 | ((chCode >> 6) & 0x3f)]);
			sbuf += (hex[0x80 | (chCode & 0x3f)]);
		}
	}
	return sbuf;
}


/**
 *
 */
function switchToSimpleRequest(frmBJ, frmSR)
{
	if (!BUFFER_STATUS) return;

	// COPY PARAMETERS ACROSS
	for (i = 0; i < frmBJ.elements.length; i++)
	{
		sParamName = frmBJ.elements[i].name;
		frmSR.elements[sParamName].value = frmBJ.elements[i].value;
	}

	frmSR.action = "index.jsp";
	frmSR.__requestType.value = "immediate";
	frmSR.__subpage.value = "parameters";
	frmSR.submit();
}


/**
 *
 */
function switchToBackgroundJob(frmSR, frmBJ)
{
	if (!BUFFER_STATUS) return;

	// COPY PARAMETERS ACROSS
	for (i = 0; i < frmSR.elements.length; i++)
	{
		sParamName = frmSR.elements[i].name;
		frmBJ.elements[sParamName].value = frmSR.elements[i].value;
	}

	frmBJ.action = "index.jsp";
	frmBJ.__requestType.value = "scheduled";
	frmBJ.__subpage.value = "schedule";
	frmBJ.submit();
}

/**
 *
 */
function validateDecimal(val, sep, cPlusSign, cMinusSign)
{
	val = trim('' + val); // cast val to string
	if (!sep) sep = '.'; // if separator isn't specified, hardcode as decimal point '.'

	if (val.indexOf(sep) > -1)
	{
		pre = val.substring(0, val.indexOf(sep));
		post = val.substring(val.indexOf(sep) + 1);
		if (!validateInteger(pre, true, cPlusSign, cMinusSign) || !validateInteger(post, false, cPlusSign, cMinusSign)) return false;
	}
	else
	{
		return validateInteger(val, true, cPlusSign, cMinusSign);
	}

	return true;
}

/**
 *
 */
function validateInteger(val, b, c1, c2)
{
	return _isInteger(val, b, c1, c2);
}

/**
 *
 */
function validateBoolean(val)
{
	val = trim('' + val);
	val = val.toUpperCase();
	return (val == "FALSE" || val == "TRUE");
}

/**
 *
 * bAsPrefix = true = PREFIX
 * bAsPrefix = false = SUFFIX
 */
function validateCurrency(sym, bAsPrefix, val, sep)
{
	return true;
}

/**
 * Provides a subset of functionality similar to MessageFormat.format(String, Object[])
 */
function messageFormat(sBase, oaInserts)
{
	if (sBase == null) return null; // NPE PROTECTION - 1
	if (oaInserts == null) return sBase; // NPE PROTECTION - 2
	nInserts = oaInserts.length; // NUMBER OF INSERTS IN THE STRING
	for (i = 0; i < nInserts; i++)
	{
		sTag = "{" + i + "}"; // THE TAG TO SEARCH FOR
		iTag = sBase.indexOf(sTag); // THE LOCATION OF THE TAG IN THE STRING
		if (iTag == -1) continue; // NPE PROTECTION - 3
		if (oaInserts[i] != null) // NPE PROTECTION - 4
		{
			sPrefix = sBase.substring(0, iTag); // BEFORE THE TAG
			sSuffix = sBase.substring(iTag + 3); // AFTER THE TAG
			sBase = sPrefix + oaInserts[i] + sSuffix; // REBUILD THE BASE
		}
	}
	return sBase;
}

/**
 * validates the home folder to find if it has any invalid characters
 */
function validateHomeFolder(homeFolder)
{
	if (homeFolder.length == 0)
	{
		alert(ERRMSG_INVALID_OUTPUT_FOLDER);
		return false;
	}
	if (homeFolder.length > 0 && homeFolder.charAt(0) != "/" && homeFolder.charAt(0) != "~")
	{
		alert(ERRMSG_INVALID_START_CHAR);
		return false;
	}

	var i;
	var invalidCharsArray = new Array("?", "\\", ";", "*", "<", ">", "\"");
	for (i = 0; i<homeFolder.length; i++)
	{
		if (homeFolder.charAt(i) == "/" && i < (homeFolder.length - 1) && homeFolder.charAt(i+1) == "/")
		{
			alert(ERRMSG_INVALID_OUTPUT_FOLDER);
			return false;
		}
		for (var j=0; j < invalidCharsArray.length; j++)
		{
			if (homeFolder.charAt(i) == invalidCharsArray[j])
			{
				alert(ERRMSG_INVALID_OUTPUT_FOLDER);
				return false;
			}
		}
	}
	return true;
}

/**
 * Encode a URL string to the "x-www-form-urlencoded" form, enhanced
 * with the UTF-8-in-URL proposal. This function is similar to encode( )
 * except that the characters dot(.), slash(/), semicolon(;) and underscore(_)
 * are not encoded and remain the same.
 * 
 * 		The encoding is as follows :-
 *
 * <ul>
 * <li><p>The ASCII characters 'a' through 'z', 'A' through 'Z',
 *        and '0' through '9' remain the same.
 *
 * <li><p>The characters - _ . / ; remain the same.
 *
 * <li><p>All other ASCII characters are converted into the
 *        3-character string "%xy", where xy is
 *        the two-digit hexadecimal representation of the character
 *        code
 *
 * <li><p>All non-ASCII characters are encoded in two steps: first
 *        to a sequence of 2 or 3 bytes, using the UTF-8 algorithm;
 *        secondly each of these bytes is encoded as "%xx".
 * </ul>
 *
 * @param s The string to be encoded
 * @return The encoded string
 */
function encode_Except_Dot_Slash_Semicolon_Underscore(s)
{
	var sbuf = new String("");
	var len = s.length;
	for (var i = 0; i < len; i++)
	{
		var ch = s.charAt(i);
		var chCode = s.charCodeAt(i);

		if (('A' <= ch && ch <= 'Z')	// UPPERCASE LATIN-1
		 || ('a' <= ch && ch <= 'z')	// LOWERCASE LATIN-1
		 || ('0' <= ch && ch <= '9')	// NUMERICAL DIGITS
		 || (ch == '.')					// DOT
		 || (ch == '/')					// SLASH
		 || (ch == ';')					// SEMICOLON
		 || (ch == '_'))				// UNDERSCORE
		{
			sbuf += ch;
		}
		else if (chCode <= 0x007f)	// RANGE (00 - 7f)
		{
			sbuf += hex[chCode];
		}
		else if (chCode <= 0x07ff) // RANGE (007f - 07ff)
		{
			sbuf += (hex[0xc0 | (chCode >> 6)]);
			sbuf += (hex[0x80 | (chCode & 0x3F)]);
		}
		else // RANGE (07ff - ffff)
		{
			sbuf += (hex[0xe0 | (chCode >> 12)]);
			sbuf += (hex[0x80 | ((chCode >> 6) & 0x3f)]);
			sbuf += (hex[0x80 | (chCode & 0x3f)]);
		}
	}
	return sbuf;
}

function maskFileName(e)
{
	var iKeyCode = getEventKeyCode(e);
	var invalidCharacters = ';*/\\<>?"';
	for (i=0;i<invalidCharacters.length;i++) {
		if (iKeyCode == invalidCharacters.charCodeAt(i))
			return false;
	}
	return true;
}


/**
 * if the hidden field is present, sets the value,
 * else creates the field and sets the value.
 * @param frmName name of the form. This form should be present in the scope of the
 *		document where this js file is included.
 * @param fldName the hidden field object
 * @param value value for the hidden field
 */
function setOrCreateHiddenField(frmName, fldName, value)
{
	var fldObject = eval("document."+frmName+"."+fldName);
	var frmObject = eval("document."+frmName);

	if (fldObject == null)
	{
		fldObject = document.createElement("input");
		fldObject.setAttribute("type", "hidden");
		fldObject.setAttribute("name", fldName);
		frmObject.appendChild(fldObject);
	}

	fldObject.setAttribute("value", value + ""); // work around for IE9 setAttribute bug
}

 /**
 * same as removeParams() at viewer.js
 */
function removeParamsFromUrl(sObjURL, sParam)
{
	var words = sObjURL.split("?");
	// If there are parameters in url, there will always be only 2 words
	if( words.length == 2 )
	{
		var paramString = "&" + words[1]; // For easier regex, make all parameters start with an &
		var pattern = "&" + sParam + "=[^&]*";
		var regExp = new RegExp( pattern, "ig"); // case insensitive and global search
		paramString = paramString.replace( regExp, "");
		
		// Add parameter string if there's any parameters left
		if( paramString != "" ) sObjURL = words[0] + "?" + paramString.substring(1,paramString.length); // Make sure to remove leading &
		else sObjURL = words[0];
	}
	return sObjURL;
}

/*
 * udpated these parameters from url: iportalid, serverurl, volume, and repositorytype.
 * commonParam is the querystring that contains iportalid, serverurl, volume, and repositorytype
 * serverurl, volume, and repositorytype are not included in commonParam if their values are
 * the same as what are defined in web.xml.
 */
function updateUrl(url, commonParam)
{
	if (url == null || (url != null && url.length == 0))
	{
		return url;
	}
	if ( url.lastIndexOf( '?' ) > -1 )
	{
		//remove these parameters from query string.  They will be added below
		url = removeParamsFromUrl(url, "iportalid");
		url = removeParamsFromUrl(url, "serverurl");
		url = removeParamsFromUrl(url, "volume");
		url = removeParamsFromUrl(url, "repositorytype");
		url = removeParamsFromUrl(url, "showBanner");
		url = removeParamsFromUrl(url, "showSideBar");
		url = removeParamsFromUrl(url, "fromDashboard");
		url = removeParamsFromUrl(url, "showBreadcrumb");
		url = removeParamsFromUrl(url, "__vp");
	}
	//original url may have only uri and 
	//method removeParamsFromUrl() may return only uri, ie., there are no "?"
	var index = url.indexOf("?");
	if (commonParam != null && commonParam.length > 0)
	{
		if (index < 0)
		{
			url += "?";
		}
		else
		{
			if (index < (url.length -1))
			{
				url += "&";
			}
		}
		url += commonParam;
	}
	return url;
}

function updateDashboardTab( targetUrl )
{
	var opener = window.top.opener;
	if (targetUrl != "" && opener.actuate 
		&& opener.actuate.dashboard 
		&& opener.actuate.dashboard.Utility.updateFileExplorer != null)
	{
		//update "My Document" tab first 
		var updated = opener.actuate.dashboard.Utility.updateFileExplorer(targetUrl);
		if (!updated)
		{
			//My Document tab does not exist, try to update system tab
			opener.dashboard.refreshSystemTabs( );
		}							
	}
}

function reorderICTabs() {
	var ICTabs = document.getElementById( "ICTabs" );
	if ( ICTabs ) {
		var tabElements = ICTabs.getElementsByTagName( "td" );
		for ( var j = 0; j < tabElements.length; j++ ) {
			if ( j == 0 ) {
				tabElements[j].style.cssText = "padding: 0px;";
			} else {
				if ( tabElements[j].className == "leftCellActiveTab" ||
					 tabElements[j].className == "rightCellActiveTab" ) {
					tabElements[j].style.cssText = "padding-left:3px;" + 
												   "padding-right:3px;";
				}
				if ( tabElements[j].className == "leftCellInactiveTab" ) {
					if ( tabElements[j-1].className != "rightCellActiveTab" ) {
						tabElements[j].style.cssText = "padding-left:1px;" + 
													   "padding-right:1px;";
					} else {
						tabElements[j].style.cssText = "padding:0px;";
					}
				}
			}
		}
	}
}

function reloadTop()
{
	window.setTimeout( "doReloadTop();", 100 );
}
function doReloadTop()
{
	if(top.frames.topBanner != null)
	{
		// Non Dashboard
		top.frames.topBanner.location.reload(true);
	}
	if (top.frames.side != null) 
	{
		top.frames.side.location = top.frames.side.location;
	}
	else if ( parent.side )
	{
		parent.side.location.reload(true);
	}
	if (top.frames.footer != null)
	{
		top.frames.footer.location.reload(true);
	} 
	// For refreshing left frame(tree browser) of dashboard treeview 

	//document.location.href='customize.do' + '?' + (new Date()).getTime();
	//perhaps we can figure out a way to reload all the images too

}

/**
 * This Function is called when Esc key is pressed
 * to close the pop up window.
 * @ param the window event of the page.
 */
function onEscClosePopupWindow(event)
{
	if (!event)
	{
		if (window.event.keyCode == 27)
		{
			window.close();
		}
	}
	else
	{
		event.cancelBubble=true;
		if (event.keyCode == 27)
		{
			window.close();
		}
	}
}


/*
 * This function is used to detect click jacking/cross site framing.
 * @ return true if cross site framing /click jacking is detected 
 */	
function crossSiteFrameDetection() {
	var topHostName;
	var selfHostName;
	var cxfDetected = false;
	try
	{
		topHostName = top.location.hostname;
		selfHostName = self.location.hostname;
		}
		catch (err) {
			//cross site frame detected.  
			//If it is from corss site, browser will not allow javascript to get any information from top.location
			cxfDetected = true;
			return cxfDetected;
		}
		if (topHostName.toLowerCase() == selfHostName.toLowerCase()) {
			cxfDetected = false;
		}
		else {
			cxfDetected = true;
		}
		return cxfDetected;
			
}

function stopEvent( event ) 
{
	if ( !event ) return;
	
	if ( event.preventDefault )
	{
		event.preventDefault( );
		event.stopPropagation( );
	}
	else
	{
		event.returnValue = false;
		event.cancelBubble = true;
	}
}


function openDashboard(context, popUpWindowName, commonQueryString)
{	
	var fullURL = context + "/dashboard?" + "__launchDesigner=true&usePersonalDashboard=false&"+commonQueryString;
	openNewDefaultWindow(fullURL, popUpWindowName + 'dashboard');
}

function openStudio(context, popUpWindowName, commonQueryString)
{	
	var fullURL = context + "/wr?" + commonQueryString;
	openNewDefaultWindow(fullURL, popUpWindowName + 'report');
}

function dashboardOpenWindow (windowName, url)
{
	var width = 800;
    var height = 580;
	var top = 0;
	var left = 0;
	var specs = 'status=yes,scrollbars=yes,resizable=yes';
	specs += ',top='+top+',left='+left+',';
	openPopupWindow(url, windowName,width,height, specs );
}
function sendClickToParent(){
	if(window && window.parent && window.parent.parent && window.parent.parent.document)
		var el =  window.parent.parent.document.getElementById("dashboardContainer");
		if(el) el.click();
	}