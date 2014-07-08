/**
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.

 */

// url rewrite variables, note tomcat and oracle needs relative or contextpath
// when you set the url rewrite with context path, don't pass contextpath again
// when calling struts_x functions
var g_cancelJobURL = '/canceljob.do';
var g_requesterCancelJobURL = '/requestercanceljob.do';
var	g_deleteFileURL = '/deletefile.do';
var g_deleteJobNoticeURL = '/deletejobnotice.do';
var g_deleteJobURL = '/deletejob.do';
var g_deleteJobScheduleURL = '/deletejobschedule.do';
var g_requesterDeleteJobURL = '/requesterdeletejob.do';
var g_requesterDeleteJobScheduleURL = '/requesterdeletejobschedule.do';
var g_downloadFileURL = '/servlet/DownloadFile';
var g_viewReportURL = '/viewer/viewreport.jsp';
var g_executeDocumentURL = '/executedocument.do';
var g_executeReportURL = '/executereport.do'; 
var g_getJobDetailsURL = '/getjobdetails.do';
var g_getFileDetailsURL = '/getfiledetails.do';
var g_getRequesterJobDetailsURL = '/getrequesterjobdetails.do';
var g_viewFramesetURL = '/iportal/activePortal/viewer/viewframeset.jsp';
var g_viewrptdocumentURL = '/iv';
var g_viewrptTemplateURL = '/wr';
var g_viewdataURL = '/da';
var g_viewsoiURL = '/viewsoi.do';
var g_viewPageURL = '/servlet/ViewPage';
var g_cubeViewingURL = '/viewcube.do';
var g_createQueryURL = '/query/create.do';
var g_submitQueryURL = '/query/submit.do';
var g_executeQueryURL = '/query/execute.do';
var g_getSavedSearchURL = '/viewer/getsavedsearch.do';
var g_openDashboardURL = '/dashboard';

function isWRFileType(sFileExtension)
{
	if ( sFileExtension.toUpperCase() == "RPTTEMPLATE" ) 
	{
		return true;
	}
	return false;
}

function isIVFileType(sFileExtension)
{
	if ( sFileExtension.toUpperCase() == "RPTDOCUMENT"  ||
		 sFileExtension.toUpperCase() == "BIZDOCUMENT" )
	{
		return true;
	} 
	return false;
}

function isSOIFileType(sFileExtension)
{
	if ( sFileExtension.toUpperCase() == "SOI"  )
	{
		return true;
	} 
	return false;
}

function isDashboardFileType(sFileExtension)
{
	var lowerCaseFileType = sFileExtension.toLowerCase();
	var isDashboardFile = false;
	if ( lowerCaseFileType == "dashboard" || lowerCaseFileType == "gadget" )
	{
		isDashboardFile = true;
	} 
	return isDashboardFile;
}

function isDataFiletype()
{
	if ( sFileExtension.toUpperCase() == "DATA"  )
	{
		return true;
	} 
	return false;
}

function isCubeViewFiletype()
{
	if ( sFileExtension.toUpperCase() == "CUBEVIEW"  )
	{
		return true;
	} 
	return false;
}

function hasNativeViewer(sRepositoryType, sFileExtension)
{
	// DOWNLOAD ANYTHING THAT has no native viewer support
	if ((sFileExtension.toUpperCase() == "ROI") ||
		(sFileExtension.toUpperCase() == "DOI") || 
		(sFileExtension.toUpperCase() == "CB4") ||
		(sFileExtension.toUpperCase() == "CVW") || 
		(sFileExtension.toUpperCase() == "ROS") || 
		(sFileExtension.toUpperCase() == "ODP") ||
		(sFileExtension.toUpperCase() == "SOI") ||
		(isWRFileType(sFileExtension) == true) || 
		(isIVFileType(sFileExtension) == true) ||
		(isCubeViewFiletype(sFileExtension) == true) || 
		(isDataFiletype(sFileExtension) == true) )
	{
		// If it is not sv, wr or enterprise mode, then
		// there is no workgroup mode support for the native viewer.
		if ((sRepositoryType.toUpperCase() != "ENTERPRISE") &&
			(!isWRFileType(sFileExtension)) && 
			(!isSOIFileType(sFileExtension)) &&
			(!isIVFileType(sFileExtension)) &&
			(!isCubeViewFiletype(sFileExtension)) &&
			(!isDataFiletype(sFileExtension))
			)
		{
			return false;			
		}
		return true;
	}
	return false;
}


function isOpenNewBrowser(openNewBrowser)
{
	if (openNewBrowser == null) return false;
	
	if (typeof openNewBrowser == "boolean" ) return openNewBrowser;
	
	if (openNewBrowser.toUpperCase() == "TRUE") return true;

	return false;
}

function struts_viewRequesterJobDetail(sContext, sJobID, optionalParam, commonQueryString)
{

	sURI = sContext + g_getRequesterJobDetailsURL + "?jobID="+sJobID;
	
	if (optionalParam != null && optionalParam.length > 0)
	{
		iEqual = optionalParam.indexOf("=");
		if (iEqual == -1)
		{
			sURI += "&" + encode(optionalParam);
		}
		else
		{
			sURI += "&" + optionalParam.substring(0, iEqual) + "=" + encode(optionalParam.substring(iEqual + 1));
		}
	}

	sURI = (commonQueryString != null && commonQueryString.length > 0)? (sURI + "&" + commonQueryString):sURI;

	window.location.href = sURI;
}
/**
 *
 */
function struts_cancelRequest(sContext, sJobID, sJobState, commonQueryString)
{

	sURI = sContext + g_cancelJobURL
	 + "?jobID=" + sJobID
	 + "&jobState=" + sJobState;
	sURI = (commonQueryString != null && commonQueryString.length > 0)? (sURI + "&" + commonQueryString):sURI;
	 
	window.location.href = sURI;
}


function struts_requesterCancelRequest(sContext, sJobID, sJobState, commonQueryString)
{

	sURI = sContext + g_requesterCancelJobURL
			+ "?jobID=" + sJobID
			+ "&jobState=" + sJobState;
	sURI = (commonQueryString != null && commonQueryString.length > 0)? (sURI + "&" + commonQueryString):sURI;

	window.location.href = sURI;
}


function struts_executeReport(sReqContext, sFQFileName, newWindow, sFileID, commonQueryString)
{
	var sBrowserNewWindowName = "";
	if ( isOpenNewBrowser(newWindow) )
	{
		newWindow = 'true';
	}
		
	// SCR#90509 AcSubmitJobActionForm will send GetFileDetails SOAP call if we don't give it executableName
	sObjectReference = "&__executablename=" + encode(sFQFileName); 
	if ( sFileID !=null && sFileID.length > 0)
	{
		sObjectReference += "&__executableId=" + encode(sFileID);
	}
	var sUrl = sReqContext + "/executereport.do?__requesttype=immediate" + sObjectReference
			+ "&__from=requestPage";
	
	sUrl = (commonQueryString != null && commonQueryString.length > 0)? (sUrl + "&" + commonQueryString):sUrl;

	if(newWindow == 'true')
	{
		var spec = 'status=yes, scrollbars=yes, resizable=yes, location=yes';
		var height = 700;
		var width = 1200;
		sBrowserNewWindowName = "__view" + (new Date()).getUTCMilliseconds();
		//Action class needs the windowname to set and get the values set in the session to reload the requester page 
		//after the report is submitted and opened in the new window
		sUrl += "&windowName=" + sBrowserNewWindowName;
		openPopupWindow(sUrl, "ParameterRequesterDlg", '','', '' );
	}
	else
	{
		window.top.location.replace(sUrl);
	}
}

/**
 *
 */
function struts_viewDocument(sRepository, sReqContext, sFQFileName, 
						sViewNewBrowserWindow, sFileID, bVerifiedROV, sFileType, from, 
						commonQueryString)
{
	viewDocumentURL(sRepository, "", sFQFileName,  
						sViewNewBrowserWindow, sFileID, bVerifiedROV, sFileType, from, 
						commonQueryString);
}

function parse_jsessionid( baseUrl )
{
	var requestURL = {orgBaseURL: baseUrl, newBaseURL: baseUrl, jsessionid:null};
	iDot = baseUrl.lastIndexOf(";");
	if (iDot == -1) return requestURL;
	
	var jsessionid = baseUrl.substring(iDot + 1);
	var newBaseURL = baseUrl.substring(0, iDot);

	requestURL.newBaseURL = newBaseURL;
	requestURL.jsessionid = jsessionid
	
	return requestURL;
}

/**
 *
 */
 function viewDocumentURL(sRepository, sContext, sFQFileName,  
			sViewNewBrowserWindow, sFileID, bVerifiedROV, sFileType, from, 
			commonQueryString)
{
	var sUrl = "";
	var sBrowserNewWindowName = "";
	if ( isOpenNewBrowser(sViewNewBrowserWindow) )
	{
		sViewNewBrowserWindow = 'true';
	}
	
	sFileExtension = sFileType;
	if ( _isEmpty(sFileExtension) )
	{
		sFileExtension = getFileExtension(sFQFileName);	   
        //if sFileType is empty or undefined, store the file extension as file type
		sFileType = sFileExtension;
	}
	
	if ( _isEmpty(sFileID) )
	{
		sFileID = null;
	}
	
	var isDashboard = isDashboardFileType(sFileExtension);
	IsExcelReport = false;
	if ( sFileExtension.toUpperCase() == "XLS" || sFileExtension.toUpperCase() == "XLSX")
	{
		sFQFileName = replaceExtToLowerCase(sFQFileName);
		IsExcelReport  = true;
	}

	sDecompose = (sFileExtension.toUpperCase() == "ROW"
			   || sFileExtension.toUpperCase() == "RPW"
			   || sFileExtension.toUpperCase() == "SQW")
		? "&returnContents=true" : ""; // HARDCODED LIST OF COMPOUND DOCS
	// DOWNLOAD ANYTHING THAT'S NOT AN ROI, DOI, CB4, CVW
	if (isDashboard)
	{
		sObjectReference = (sFQFileName == null) ? encode(sFileID) : encode(sFQFileName);		
		if( sFileExtension.toLowerCase() == 'gadget' )
		{
			sUrl = sContext+ g_getFileDetailsURL + '?name=' + sObjectReference + '&' + commonQueryString;
		}
		else
		{
			sViewNewBrowserWindow = 'true'; 
			if (typeof (parent.DashboardEventDispatcher) == "function")
			{
				parent.DashboardEventDispatcher.fire(DashboardEvents.ADD_SHARED_TAB, sObjectReference);
			}
			else
			{
				sUrl = sContext + g_openDashboardURL + "?conf=" + sObjectReference + "&filetype=" + sFileExtension;
			}
		}
	}	
	else if (!hasNativeViewer(sRepository, sFileExtension))
	{
		sViewNewBrowserWindow = 'true';		
		if ( sRepository.toUpperCase() == "WORKGROUP" )
		{
			sFileID = null;
		}
		
		sObjectReference = (sFileID == null) ? "name=" + encode(sFQFileName) : "fileid=" + encode(sFileID);
		justName = stripVersion(stripFolder(sFQFileName));

		index = sFQFileName.indexOf("/");
		if (IsExcelReport)
		{	
			sUrl = sContext + g_viewReportURL + "?outputFileType="+sFileType+ "&fromwhere=struts_viewDocument" ;
			if (sFQFileName != null && sFQFileName.length > 0)
			{
				sUrl += "&outputName=" + encode(sFQFileName); 
			}
			if (sFileID != null && sFileID.length > 0)
			{
				sUrl += "&id=" + encode(sFileID); 
			}
			if (from && "filelist" == from.toLowerCase())
			{
				if (g_viewXlsInRequester == true)
				{
					//RA303071.  ignore the setting in iPortal Options - "Document Viewing - open a new browser.
					//Need to open a new browser (sViewNewBrowserWindow = true)
					//for IE Internet access of Excel files directly from filefolder list of iportal
					//Do not pop up another browser within the newly popped new browser (newWindow=false)
					sUrl += "&newWindow=false"; 
					sViewNewBrowserWindow = 'true';					
				}
			}
		}

		else
		{
			var downloadFileURL = g_downloadFileURL;
			var urlRequest = parse_jsessionid( g_downloadFileURL );
			var jsessionidParam = "";
			if ( urlRequest.jsessionid )
			{
				jsessionidParam = ";" + urlRequest.jsessionid;
				downloadFileURL = urlRequest.newBaseURL;
			}
			
			sUrl = sContext + downloadFileURL + "/" + encode(justName) + jsessionidParam + "?" + sObjectReference + sDecompose
			+ "&fileExtension="+sFileExtension; // 58371
		}
	}
	// View cubes and cube views in the analytics cube viewer
	else if ((sFileExtension.toUpperCase() == "CB4") || 
			 (sFileExtension.toUpperCase() == "CVW") || 
			 (sFileExtension.toUpperCase() == "ODP") )
	{
		sObjectReference = "";
		
		// use the name first
		if ( sFQFileName != null )
		{
			sObjectReference += "name=" + encode(sFQFileName);
			if ( sFileID != null )
			{
				sObjectReference += "&id=" + encode(sFileID);
			}
		}
		else if ( sFileID != null && sFileExtension.toUpperCase() == "CB4")
		{
			// try the id only if the name is null and for CB4 files.
			// file id for CVW and ODP files are not supported
			sObjectReference += "id=" + encode(sFileID);
		}
				
		if(sViewNewBrowserWindow == 'true')
		{
			sUrl = sContext + g_cubeViewingURL + "?" + sObjectReference + sDecompose + "&closex=true";
		}
		else
		{
			sUrl = sContext + g_cubeViewingURL + "?" + sObjectReference + sDecompose;
		}

	}
	// View ROS file
	else if (sFileExtension.toUpperCase() == "ROS")
	{
		sObjectReference = (sFileID == null) ? "rosfilename=" + encode(sFQFileName) : "rosfileid=" + encode(sFileID);
		sFileExtension = "&fileExtension="+sFileExtension;
		if (sViewNewBrowserWindow == 'true')
		{
			sUrl = sContext + g_getSavedSearchURL + "?" + sObjectReference + sDecompose
				+ sFileExtension;
		} else
		{
			sUrl = sContext + g_getSavedSearchURL + "?" + sObjectReference + sDecompose
				+ sFileExtension;
		}
	}
	// View rptdocument, BIZDOCUMENT
	else if (isIVFileType(sFileExtension))
	{
		sObjectReference = "__report=" + encode(sFQFileName);		
		sViewNewBrowserWindow = 'true';
		sUrl = sContext + g_viewrptdocumentURL + "?" + sObjectReference + sDecompose + "&closex=true";
	}

	// View rpttemplate
	else if (isWRFileType(sFileExtension))
	{
		sObjectReference = "__report=" + encode(sFQFileName);		
		sViewNewBrowserWindow ='true';
		sUrl = sContext + g_viewrptTemplateURL + "?" + sObjectReference + sDecompose + "&closex=true";
	}

	// View Data file
	else if ( isDataFiletype(sFileExtension) )
	{
		sObjectReference = "__data=" + encode(sFQFileName);		
		sViewNewBrowserWindow ='true';
		sUrl = sContext + g_viewdataURL + "?" + sObjectReference + sDecompose;
	}
	
	// View CubeView file
	else if ( isCubeViewFiletype(sFileExtension) )
	{
		sObjectReference = "__report=" + encode(sFQFileName);		
		sViewNewBrowserWindow ='true';
		sUrl = sContext + g_viewdataURL + "?" + sObjectReference + sDecompose;
	}
	
	// View soi
	else if (isSOIFileType(sFileExtension))
	{
		sObjectReference = (sFileID == null) ? "inputfile=" + encode(sFQFileName) : "__executableid=" + encode(sFileID);					
		sViewNewBrowserWindow = 'false'; // Do not launch soi in a new window. Treat it as if it is an executable
		sUrl = sContext + g_viewsoiURL + "?" + sObjectReference + sDecompose + "&__filetype=soi";
	}

	// VIEW ROI'S IN DHTML VIEWING FRAMEWORK
	else 
	{
		sObjectReference = "";
		if ( sFileID != null )
		{
			sObjectReference += "id=" + encode(sFileID);
			if ( sFQFileName != null )
				sObjectReference += "&name=" + encode(sFQFileName);		
		}
		else
		{
			sObjectReference += "name=" + encode(sFQFileName);		
		}
		
		
		if(sViewNewBrowserWindow == 'true')
		{
			sUrl = sContext + g_viewFramesetURL + "?" + sObjectReference + sDecompose + "&closex=true";
		}
		else
		{
			sUrl = sContext + g_viewFramesetURL + "?" + sObjectReference + sDecompose;
		}
	}
	
	if ( sUrl != null && sUrl.length > 0 )
	{
		var sStartParam = "?";
		if ( sUrl.indexOf("?") != -1 ) 
		{
			sStartParam = "&";
		}
		
		var sCommonParam = sStartParam + "fromlink=yes&activity=view&" + commonQueryString  ;	
		sUrl += sCommonParam;
		if(isSOIFileType(sFileExtension))
		{
			sBrowserNewWindowName = "__view" + (new Date()).getUTCMilliseconds();
			var optionalParam = sFileExtension;
			openRequesterPageWindow(sUrl, sBrowserNewWindowName, optionalParam);
			
		}
		else if(sViewNewBrowserWindow == 'true')
		{
			sBrowserNewWindowName = "__view" + (new Date()).getUTCMilliseconds();
			openNewDefaultWindow(sUrl, sBrowserNewWindowName);
		}
		else
		{
			window.location.href = sUrl;
		}
	}
}

/**
 *	SCR 64608, handle special case for channel.
 */
function struts_channel_viewDocument(sContext, sFQFileName,
						 sViewNewBrowserWindow, sFileID, bVerifiedROV, sFileType, from, 
						 sRepository, commonQueryString)
{

	// channel always only comes from Enterprise.
	viewDocumentURL(sRepository, sContext, sFQFileName,  
			sViewNewBrowserWindow, sFileID, bVerifiedROV, sFileType, from, 
			commonQueryString);
				
}

/**
 *
 */
function struts_deleteJobCompletionNotice(sContext, sJobID, sJobState, sAdditionalParams, commonQueryString)
{

	sURI = sContext + g_deleteJobNoticeURL
	 + "?jobID=" + sJobID
	 + "&jobState=" + sJobState;

	if (sAdditionalParams != null && sAdditionalParams.length > 0)
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
	sURI = (commonQueryString != null && commonQueryString.length > 0)? (sURI + "&" + commonQueryString):sURI;


	window.location.href = sURI;
}


/**
 *
 */
function struts_deleteJob(sContext, sJobID, sJobState,commonQueryString)
{

	sURI = sContext + g_deleteJobURL
	 + "?jobID=" + sJobID
	 + "&jobState=" + sJobState;
	sURI = (commonQueryString != null && commonQueryString.length > 0)? (sURI + "&" + commonQueryString):sURI;

	window.location.href = sURI;
}

 /**
 *
 */
function struts_deleteJobSchedule(sContext, sJobID, sJobState,commonQueryString)
{

	sURI = sContext + g_deleteJobScheduleURL
	 + "?jobID=" + sJobID
	 + "&jobState=" + sJobState;
	sURI = (commonQueryString != null && commonQueryString.length > 0)? (sURI + "&" + commonQueryString):sURI;

	window.location.href = sURI;
} 
 
function struts_requesterDeleteJob(sContext, sJobID, sJobState, commonQueryString)
{

	sURI = sContext + g_requesterDeleteJobURL
	 + "?jobID=" + sJobID
	 + "&jobState=" + sJobState;
	sURI = (commonQueryString != null && commonQueryString.length > 0)? (sURI + "&" + commonQueryString):sURI;

	window.location.href = sURI;
}

function struts_requesterDeleteJobSchedule(sContext, sJobID, sJobState, commonQueryString)
{

	sURI = sContext + g_requesterDeleteJobScheduleURL
	 + "?jobID=" + sJobID
	 + "&jobState=" + sJobState;
	sURI = (commonQueryString != null && commonQueryString.length > 0)? (sURI + "&" + commonQueryString):sURI;

	window.location.href = sURI;
}

function initializeSE(forwardLocation)
{
	//this function is not needed any more.  A lot of files use this function so keep it.

}

function openDashboardFile( sContext, commonQueryString, sFQFileName)
{
	var dashboard = parent.parent.dashboard;
	if (dashboard != null)
	{
		//need userid for acsso to work properly
		var winName = createUniqueControlID( );
		var queryString = "__design=" + encode(sFQFileName) + "&showBannerLinks=false" + "&fromlink=yes&activity=view";
		var sURI = sContext+"/dashboard?" + queryString;
		sURI = (commonQueryString != null && commonQueryString.length > 0)? (sURI + "&" + commonQueryString):sURI;
		var specs = 'status=yes,scrollbars=yes,resizable=yes';
		window.open(sURI, winName, specs);
	}
}

function createUniqueControlID()
{
	var uniqueID = (this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4()).toUpperCase();
	return uniqueID;
}

function S4()
{
	var random = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	return random;
}

