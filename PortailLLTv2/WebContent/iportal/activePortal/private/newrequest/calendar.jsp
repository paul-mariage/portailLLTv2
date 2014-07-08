<%-- --------------------------------------------------------------------------
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.
		
	Description:
	
		CAUTION: This page has one form which will affect document.forms[0]
		Requires UTF-8 encoding
			allscript.js for parseDate and 
			browsertype.js for elementLocate
	
	Supported URL parameters:
		
-------------------------------------------------------------------------- --%>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="java.util.Calendar,
				java.util.GregorianCalendar,
				 java.text.SimpleDateFormat,
				 java.text.NumberFormat,
				 org.apache.struts.taglib.TagUtils, 
				 org.apache.struts.Globals,
				 com.actuate.reportcast.utils.*"
%>

<%-- TAG LIBRARIES ------------------------------------------------------- --%>
<%@ taglib uri="/struts-bean" prefix="bean" %>
<%@ taglib uri="/struts-html" prefix="html" %>
<%@ taglib uri="/struts-logic" prefix="logic" %>
<%@ include file="/iportal/activePortal/common/initCommonParam.jsp" %>

<%-- --------------------------------------------------------------------------
	Expected JavaBeans:
-------------------------------------------------------------------------- --%>

<%
	//SCR 88371 - Instead of Calendar.getInstance, we have to use GregorianCalendar for date-times. 
	//Calendar cNow = Calendar.getInstance(acLocale.getJavaLocale());
	Calendar cNow = new GregorianCalendar(acLocale.getJavaLocale());
	final String[] monthNames = acLocale.getMonthsOfYear(AcLocale.FULL);
	final String[] dayOfWeekNames = new String[7];
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

	for (int i = 0; i < 7; i++)
	{
		dayOfWeekNames[i] = sa[iaDOW[i]];
	}
	
	NumberFormat nfNumbers = NumberFormat.getInstance(acLocale.getJavaLocale());
	nfNumbers.setMaximumFractionDigits(0);
	nfNumbers.setMinimumFractionDigits(0);
	nfNumbers.setGroupingUsed(false);
	String contextRoot = request.getContextPath();
%>



<SCRIPT language="javascript" src="<html:rewrite page="/js/calendarlayer.js"/>"></SCRIPT>


<SCRIPT>
var MSG_NOCOLUMNS = "<%= StaticFuncs.jsEncode(TagUtils.getInstance().message(pageContext, "iportalResources", javaLocale, "query.create.content.popup.nocolumn", null)) %>";
var ERRMSG_MISSING_JOB_NAME = '<%= StaticFuncs.jsEncode(TagUtils.getInstance().message(pageContext, "iportalResources", javaLocale, "ERRMSG_MISSING_JOB_NAME",  null)) %>';
var ERRMSG_INVALID_RECURRING_TIME = '<%= StaticFuncs.jsEncode(TagUtils.getInstance().message(pageContext, "iportalResources", javaLocale, "ERRMSG_INVALID_RECURRING_TIME",  null)) %>';
var ERRMSG_INVALID_ONCE_TIME = '<%= StaticFuncs.jsEncode(TagUtils.getInstance().message(pageContext, "iportalResources", javaLocale, "ERRMSG_INVALID_ONCE_TIME",  null)) %>';
var ERRMSG_INVALID_ONCE_DATE = '<%= StaticFuncs.jsEncode(TagUtils.getInstance().message(pageContext, "iportalResources", javaLocale, "ERRMSG_INVALID_ONCE_DATE",  null)) %>';
var ERRMSG_INVALID_ONCE_DATE_TO_OLD = '<%= StaticFuncs.jsEncode(TagUtils.getInstance().message(pageContext, "iportalResources", javaLocale, "ERRMSG_INVALID_ONCE_DATE_TO_OLD",  null)) %>';
var ERRMSG_INVALID_START_DATE = '<%= StaticFuncs.jsEncode(TagUtils.getInstance().message(pageContext, "iportalResources", javaLocale, "ERRMSG_INVALID_START_DATE",  null)) %>';
var ERRMSG_INVALID_START_DATE_TOO_OLD = '<%= StaticFuncs.jsEncode(TagUtils.getInstance().message(pageContext, "iportalResources", javaLocale, "ERRMSG_INVALID_START_DATE_TOO_OLD",  null)) %>';
var ERRMSG_INVALID_END_DATE = '<%= StaticFuncs.jsEncode(TagUtils.getInstance().message(pageContext, "iportalResources", javaLocale, "ERRMSG_INVALID_END_DATE",  null)) %>';
var ERRMSG_INVALID_END_DATE_TO_OLD = '<%= StaticFuncs.jsEncode(TagUtils.getInstance().message(pageContext, "iportalResources", javaLocale, "ERRMSG_INVALID_END_DATE_TO_OLD",  null)) %>';
var ERRMSG_INVALID_PRIORITY_VALUE = '<%= StaticFuncs.jsEncode(TagUtils.getInstance().message(pageContext, "iportalResources", javaLocale, "ERRMSG_INVALID_PRIORITY_VALUE",  null)) %>';
var ERRMSG_INVALID_PRIORITY_RANGE = '<%= StaticFuncs.jsEncode(TagUtils.getInstance().message(pageContext, "iportalResources", javaLocale, "ERRMSG_INVALID_PRIORITY_RANGE",  null)) %>';
var MSG_DISABLED_CALENDAR = "<%= StaticFuncs.jsEncode(TagUtils.getInstance().message(pageContext, "iportalResources", javaLocale, "MSG_DISABLED_CALENDAR",  null)) %>";
var SCH_DT_FORMAT = "<%= acLocale.getDatePattern(AcLocale.SHORT) %>";
var SCH_TM_FORMAT = "<%= acLocale.getTimePattern(AcLocale.SHORT) %>";
// UPDATE AM/PM STRINGS FOR LOCALE SENSITIVE DATE GENERATION/PARSING
var LOCALIZED_AM = "<%= StaticFuncs.jsEncode(acLocale.getDateFormatSymbols().getAmPmStrings()[0]) %>";
var LOCALIZED_PM = "<%= StaticFuncs.jsEncode(acLocale.getDateFormatSymbols().getAmPmStrings()[1]) %>";

function clickLocalizedCalendar(event,control)
{
	if (control.disabled)
		return false;
	return getCalendarFor(event,control,SCH_DT_FORMAT,
		<%
			for (int i=0;i<12;i++) 
			{ 
		%>
			"<%= StaticFuncs.jsEncode(acLocale.getMonthsOfYear(AcLocale.FULL)[i]) %>",
		<%
			}
		%>
	"");
}
</script>

<%-- IFRAME on same position as div to prevent select control to overlap the div (IE 5/6 bug) --%>
<iframe id="PopUpCalendarFrm" src="<%= contextRoot %>/viewer/blanknav.html" frameBorder="0" name="PopUpCalendarFrm" style="position:absolute; left:0px; top:0px;  width:240; height:152;  overflow: visible; visibility: hidden; "  ></iframe>
		
<div id="PopUpCalendar" name="PopUpCalendar" style="border-color:gray; border-width:1px;border-style:solid; position:absolute; left:0px; top:0px; z-index:250;  visibility: hidden; background-color: #FFFFFF;  onMouseOver="if (ppcTI) { clearTimeout(ppcTI); ppcTI=false; }" >


	<div id="navSelector" name="navSelector" style=" z-index:9;  overflow: visible; visibility:inherit">

<TABLE  cellspacing="0" border="0" bgcolor="#DDDDDD" cellpadding="2" width="240" vspace="0" hspace="0" >

	<form name="ppcNavBar">
		<tr>
			<td align="center">
				<a href='javascript:moveMonth("Back")' onMouseOver='window.status="<bean:message bundle="iportalResources" key="STATUS_MSG_PREVIOUS_MONTH" locale="<%= AcConstants.CURRENT_JAVA_LOCALE %>" />"; return true;'>
					<img src="<html:rewrite page="/iportal/activePortal/images/ltarrow.gif"/>" border="0" valign="bottom"></a>

					<select name="sMonth" onBlur="blockHide=false;" onFocus="blockHide=true;" 
						onChange="setCalendar(sYear.options[sYear.selectedIndex].value, this.options[this.selectedIndex].value);"
						class="fntCalendarMonth" style="background-color: white;">
					<% for (int i = 0; i < 12; i++) { %>
						<option value="<%= i %>"><%= monthNames[i] %></option>
					<% } %>
					</select>

				
					<select name="sYear" onBlur="blockHide=false;" onFocus="blockHide=true;" 
						onChange="setCalendar(this.options[this.selectedIndex].value, sMonth.options[sMonth.selectedIndex].value)"
						class="fntCalendarYear" style="background-color: white;">
						<%
							int iYear = cNow.get(Calendar.YEAR);
							for (int i = iYear - 100; i < iYear + 100; i++)
							{
								%><option value="<%= i %>"><%= nfNumbers.format(i) %></option><% 
							} 
						%>
					</select>

				<a href='javascript:moveMonth("Forward")' onMouseOver='window.status="<bean:message bundle="iportalResources" key="STATUS_MSG_NEXT_MONTH" locale="<%= AcConstants.CURRENT_JAVA_LOCALE %>" />"; return true;'>
					<img src="<html:rewrite page="/iportal/activePortal/images/rtarrow.gif"/>" border="0" valign="bottom"></a>
				<a href="javascript: hideCalendar();">
					<img src="<html:rewrite page="/iportal/activePortal/images/cross.gif"/>" border="0" valign="bottom"></a>
			</td>
		</tr>
	</form>
</TABLE>



</div>
<div id="monthDays" name="monthDays" style="z-index:8; width:200px;  overflow: visible; visibility:inherit; background-color: #FFFFFF; "> </div>

</div>
<script>
	<%	for (int i = 0; i < 7; i++) { %>
		CALENDAR_WEEKDAYS[<%= i %>] = "<%= dayOfWeekNames[i] %>";
	<%	} %>
</script>


<noscript>
	<p><font color="#FF0000"><b>JavaScript is not activated</b></font></p>
</noscript>
