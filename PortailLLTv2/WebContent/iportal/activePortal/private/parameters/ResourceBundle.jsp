<%@ page contentType="text/javascript;charset=utf-8" %>
<%@ page session="false" buffer="none" %>

<%@ page import="java.util.Calendar,
				 com.actuate.reportcast.utils.*,
				 com.actuate.common.util.AcLocale,
	 			 java.util.GregorianCalendar,
				 java.text.NumberFormat,
				 com.actuate.activeportal.beans.UserInfoBean,
				 com.actuate.iportal.utils.Utility"
%>
<%
	// The list of keys for localized messages that will be accessible by the JSAPI parameter component
	String[] msgKeys = { "LBL_REQUIRED", "MSG_REPORT_NO_PARAMS" , "LBL_REQUIRED_WITHPARAMTYPE","LBL_REQUIRED_NOPARAMTYPE", "MSG_NO_SUGGESTION",
	        "LBL_NULL_VALUE", "LBL_REQUIREDTEXT", "MSG_REQ_PARAM_MISSING", "MSG_REQ_PARAM_NOVALUE",
	        "MSG_PARAM_MISSING", "ERRMSG_INVALID_PARAMETER_VALUE"};

	//get the correct locale from the session
	AcRequestHandlerBean reqParaHandler = new AcRequestHandlerBean();
	reqParaHandler.setRequest(request);
	UserInfoBean userInfoBean = reqParaHandler.getUserInfoBeanFromSession();
	AcLocale acLocale = reqParaHandler.getAcLocale();

	// Setup the calendar related classes for loading localized calendar info
	Calendar cNow = new GregorianCalendar(acLocale.getJavaLocale());
	NumberFormat nfNumbers = NumberFormat.getInstance(acLocale.getJavaLocale());
	nfNumbers.setMaximumFractionDigits(0);
	nfNumbers.setMinimumFractionDigits(0);
	nfNumbers.setGroupingUsed(false);

	final int[] iaDOW =
	{
		Calendar.SUNDAY,
		Calendar.MONDAY,
		Calendar.TUESDAY,
		Calendar.WEDNESDAY,
		Calendar.THURSDAY,
		Calendar.FRIDAY,
		Calendar.SATURDAY
	};
	String[] sa = acLocale.getDaysOfWeek(AcLocale.SHORT);
%>

actuate.util.Package.define("actuate.parameter");
/**
 * Static class to access localized messages.  This class is not exposed to the user directly.
 * @class ResourceBundle
 * @visibility default
 */
 
actuate.parameter.ResourceBundle =
{
	_msgMap : null, // For storing localized strings for the keys above
	_patternMap : null, // For storing localized patterns (eg: TIME_SHORT, DATE_LONG, etc)
	_calendarMap : null, // For storing all calendar related info
	_iportalUrl : null, // Url to iportal (has slash at the end)
	_adHocParamMap : null, // To hold the symbol -> localizedName info for adhoc params
	_dynamicFilterMap : null, //map to hold the localized Operator list for dynamic filter parameter
	_jsapi_fetch_size : <%= com.actuate.iportal.utils.Utility.getJSAPIFetchSize() %>,
	_jsapi_list_size : <%= com.actuate.iportal.utils.Utility.getJSAPIListSize() %>,	
	_jsapi_autosuggest_delay : <%= com.actuate.iportal.utils.Utility.getJSAPIAutoSuggestDelay() %>,
	
	initialize : function ()
	{
		this._initMessages();
		this._initPatterns();
		this._initCalendar();
		this._initAdHocMap();
		this._initFilterMap();
	},

	// Setup Message map
	_initMessages : function( )
	{
			this._msgMap = new Object();
<%
		for( int i = 0; i < msgKeys.length; i++ )
		{
			String localizedMsg = Utility.getLocalizedMessage( msgKeys[i], acLocale );
%>
			this._msgMap["<%= msgKeys[i] %>"] = "<%= StaticFuncs.jsEncode(localizedMsg) %>";						
<%
		}
%>
	},
	
	// Setup the calendar related resources
	_initCalendar : function()
	{
			this._calendarMap = new Object();
			this._calendarMap["DAYS_OF_WEEK"] = new Array();
			this._calendarMap["MONTHS"] = new Array();
			this._calendarMap["YEARS"] = new Array();
			this._calendarMap["YEAR_BASE"] = null;
			
<%		for (int i = 0; i < 7; i++)	
		{ 
%>
			this._calendarMap["DAYS_OF_WEEK"].push("<%= StaticFuncs.jsEncode(sa[iaDOW[i]]) %>");
<%		
		} 
		for (int i=0;i<12;i++) 
		{ 
%>
			this._calendarMap["MONTHS"].push("<%= StaticFuncs.jsEncode(acLocale.getMonthsOfYear(AcLocale.FULL)[i]) %>");
<%
		}
		int iYear = cNow.get(Calendar.YEAR);
%>		
			this._calendarMap["YEAR_BASE"] = <%= iYear - 100 %>;
<%
		for (int i = iYear - 100; i < iYear + 100; i++)
		{
%>
			this._calendarMap["YEARS"].push(<%= nfNumbers.format(i) %>);
<%
		} 
%>

	},
	
	// Setup the patterns
	_initPatterns : function()
	{
		this._patternMap = new Object();
		
		this._patternMap["DATE_SHORT"] = "<%= acLocale.getDatePattern(AcLocale.SHORT) %>";
		this._patternMap["DATE_LONG"] = "<%= acLocale.getDatePattern(AcLocale.LONG) %>";		
		
		this._patternMap["TIME_SHORT"] = "<%= acLocale.getTimePattern(AcLocale.SHORT) %>";
		this._patternMap["TIME_LONG"] = "<%= acLocale.getTimePattern(AcLocale.LONG) %>";
		
		this._patternMap["AM"] = "<%= StaticFuncs.jsEncode(acLocale.getDateFormatSymbols().getAmPmStrings()[0]) %>";
		this._patternMap["PM"] = "<%= StaticFuncs.jsEncode(acLocale.getDateFormatSymbols().getAmPmStrings()[1]) %>";
	},
	
	//Setup adhoc symbols
	_initAdHocMap : function()
	{
		this._adHocParamMap = new Object();
		
		this._adHocParamMap["<%= StaticFuncs.jsEncode(">") %>"] = "<%= StaticFuncs.htmlEncode(Utility.getLocalizedMessage("parameter.expressionbuilder.gt", acLocale)) %>";
		this._adHocParamMap["<%= StaticFuncs.jsEncode(">=") %>"] = "<%= StaticFuncs.htmlEncode(Utility.getLocalizedMessage("parameter.expressionbuilder.ge", acLocale)) %>";
		this._adHocParamMap["<%= StaticFuncs.jsEncode("<=") %>"] = "<%= StaticFuncs.htmlEncode(Utility.getLocalizedMessage("parameter.expressionbuilder.le", acLocale)) %>";
		this._adHocParamMap["<%= StaticFuncs.jsEncode("|") %>"] = "<%= StaticFuncs.htmlEncode(Utility.getLocalizedMessage("parameter.expressionbuilder.or", acLocale)) %>";
		this._adHocParamMap["<%= StaticFuncs.jsEncode("&") %>"] = "<%= StaticFuncs.htmlEncode(Utility.getLocalizedMessage("parameter.expressionbuilder.and", acLocale)) %>";
		this._adHocParamMap["<%= StaticFuncs.jsEncode("!") %>"] = "<%= StaticFuncs.htmlEncode(Utility.getLocalizedMessage("parameter.expressionbuilder.not", acLocale)) %>";
		this._adHocParamMap["<%= StaticFuncs.jsEncode("_") %>"] = "<%= StaticFuncs.htmlEncode(Utility.getLocalizedMessage("parameter.expressionbuilder.match1char", acLocale)) %>";
		this._adHocParamMap["<%= StaticFuncs.jsEncode("%") %>"] = "<%= StaticFuncs.htmlEncode(Utility.getLocalizedMessage("parameter.expressionbuilder.match0ormore", acLocale)) %>";
		this._adHocParamMap["<%= StaticFuncs.jsEncode("[]") %>"] = "<%= StaticFuncs.htmlEncode(Utility.getLocalizedMessage("parameter.expressionbuilder.match1ormore", acLocale)) %>";
		this._adHocParamMap["<%= StaticFuncs.jsEncode("-") %>"] = "<%= StaticFuncs.htmlEncode(Utility.getLocalizedMessage("parameter.expressionbuilder.rangeofvalues", acLocale)) %>";
		this._adHocParamMap["<%= StaticFuncs.jsEncode("\\") %>"] = "<%= StaticFuncs.htmlEncode(Utility.getLocalizedMessage("parameter.expressionbuilder.escape", acLocale)) %>";	
	},
	   
    //setup operator list for Simple Filter type parameters
	_initFilterMap : function()
	{
		this._dynamicFilterMap = new Object();

		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.NoCondition", acLocale)) %>";
		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("eq") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.eq", acLocale)) %>";
		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("ne") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.ne", acLocale)) %>";
		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("lt") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.lt", acLocale)) %>";
		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("le") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.le", acLocale)) %>";
		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("gt") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.gt", acLocale)) %>";
		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("ge") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.ge", acLocale)) %>";
		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("between") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.between", acLocale)) %>";
		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("not-between") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.not-between", acLocale)) %>";
		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("is-null") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.is-null", acLocale)) %>";
		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("is-not-null") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.is-not-null", acLocale)) %>";
		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("in") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.in", acLocale)) %>";
		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("not-in") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.not-in", acLocale)) %>";
		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("like") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.like", acLocale)) %>";
		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("not-like") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.not-like", acLocale)) %>";
		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("is-top-n") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.is-top-n", acLocale)) %>";
		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("is-bottom-n") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.is-bottom-n", acLocale)) %>";
		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("is-top-percent") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.is-top-percent", acLocale)) %>";
		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("is-bottom-percent") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.is-bottom-percent", acLocale)) %>";
		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("match") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.match", acLocale)) %>";
		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("not-match") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.not-match", acLocale)) %>";
		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("is-true") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.is-true", acLocale)) %>";
		this._dynamicFilterMap["<%= StaticFuncs.jsEncode("is-false") %>"] = "<%= StaticFuncs.jsEncode(Utility.getLocalizedMessage("filter.operator.is-false", acLocale)) %>";
	},
	
	/**
	 * Get localized string for <key>. Replace placeholders with <args>
	 * @param key - Key to localized resource
	 * @param args - What to replace placeholders with
	 */
	getMessage : function( key, args )
	{
		var msg = this._msgMap[key];
		if( typeof( msg ) == "string" )
		{
			// If there are arguments
			if( args != null && args.length > 0)
			{
				for( var i=0; i<args.length; i++ )
				{
					var regex = new RegExp( "\\{"+i+"\\}", "g" );
					msg = msg.replace(regex,args[i]);	
				}
			}
			return msg;
		}
		else
		{
			return "Localized string not available for " + key;
		}
	},
	
	// Similar to getMessage, except that this deals with _patternMap
	getPattern : function( key )
	{
		var pattern = this._patternMap[key];
		if( typeof( pattern ) != "string" )
			pattern = "Localized pattern not available for " + key;
		return pattern;
	},
	
	// Get localized calendar resource (MONTHS, YEARS, DAYS_OF_WEEK, etc)
	getCalendarResource : function ( key )
	{
		return this._calendarMap[key];
	},
	
	setIportalUrl : function (url)
	{
		this._iportalUrl = ( url.charAt( url.length - 1) != "/" ) ? url + "/" : url; // keep slash at end
	},
	
	// get iportal url used by this component
	getIportalUrl : function ()
	{
		return this._iportalUrl;
	},
	
	/**
	 * Returns the default entry found in iPortal's web.xml for AUTOSUGGEST_FETCH_SIZE
	 * @return {Integer}
	 */
	getDefaultAutoSuggestFetchSize : function()
	{
		return this._jsapi_fetch_size;
	},

	/**
	 * Returns the default entry found in iPortal's web.xml for AUTOSUGGEST_LIST_SIZE
	 * @return {Integer}
	 */
	getDefaultAutoSuggestListSize : function()
	{
		return this._jsapi_list_size;
	},
	
	/**
	 * Returns the entry found in iPortal's web.xml for AUTOSUGGEST_DELAY
	 * @return {Integer}
	 */
	getDefaultAutoSuggestDelay : function()
	{
		return this._jsapi_autosuggest_delay;
	},
	
	// Get Adhoc patterns map
	getAdHocParamMap : function()
	{
		return this._adHocParamMap;
	},

	// Get localized filter operator map
	getFilterOperatorsMap : function ()
	{
		return this._dynamicFilterMap;
	}
	
}	
actuate.parameter.ResourceBundle.initialize(); // Someone has to do this...
