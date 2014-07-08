/*
 *	@author 	Actuate Corporation
 *				Copyright (C) 2001 Actuate Corporation. All rights reserved.
 *	@version	1.0
 */

var MSG_DISABLED_CALENDAR = "Internal Error\nMSG_DISABLED_CALENDAR: Missing Resource";

var ppcDF = "d/M/yy";
var MONTH_NAMES = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre");
var ppcWN = new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
var ppcER = new Array(4);
ppcER[0] = "Required DHTML functions are not supported in this browser.";
ppcER[1] = "Target form field is not assigned or not accessible.";
ppcER[2] = "Sorry, the chosen date is not acceptable. Please read instructions on the page.";
ppcER[3] = "Unknown error occurred while executing this script.";

var ppcUC = false;
var ppcUX = 4;
var ppcUY = 4;
var ppcHT = 0;

var ns4 = (document.layers) ? true:false;
var ppcIE=(navigator.appName == "Microsoft Internet Explorer");
var ppcIE9=(navigator.appVersion.indexOf("MSIE 9.0") != -1);
var ppcNN=((navigator.appName == "Netscape")&&(document.layers));
var ppcTT="<table id=\"calendar\" width=\"240\" cellspacing=\"0\" cellpadding=\"2\" border=\"0\" bordercolor=\"#000000\">\n";
var ppcCD=ppcTT;var ppcFT="<font id=\"fntCalendarDayOfMonth\">";var ppcFC=true;
var ppcTI=false;var ppcSV=null;var ppcRL=null;var ppcXC=null;var ppcYC=null;
var ppcML=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
var ppcWE=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
var ppcNow=new Date();var ppcPtr=new Date();

//	SCR 48958
var blockHide = false;
//	SCR 49110
var ppcWD = null;
var CALENDAR_WEEKDAYS = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");

/**
 *
 */
if (ns4) 
{
	window.captureEvents(Event.RESIZE);
	window.onresize = restoreLayers;
	document.captureEvents(Event.MOUSEDOWN|Event.MOUSEUP);
	document.onmousedown = recordXY;
	document.onmouseup = confirmXY;
}

/**
 *
 */
function restoreLayers(e) 
{
	if (ns4) 
	{
		with (window.document) 
		{
			open("text/html");
			write("<html><head><title>Restoring the layer structure...</title></head>");
			write("<body bgcolor=\"#FFFFFF\" onLoad=\"history.go(-1)\">");
			write("</body></html>");
			close();
		}
	}
}

/**
 *
 */
function recordXY(e) 
{
	if (ns4) 
	{
		ppcXC = e.x;
		ppcYC = e.y;
		document.routeEvent(e);
	}
}

/**
 *
 */
function confirmXY(e) 
{
	if (ns4) 
	{
		ppcXC = (ppcXC == e.x) ? e.x : null;
		ppcYC = (ppcYC == e.y) ? e.y : null;
		document.routeEvent(e);
	}
}

/**
 *
 */
function getCalendarFor(event, target, dateformat,
	jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec,dummy) 
{
	if (target == null || target.disabled)
	{
		alert(MSG_DISABLED_CALENDAR);
		return false;
	}
	MONTH_NAMES[0]=jan; MONTH_NAMES[1]=feb; MONTH_NAMES[2]=mar; MONTH_NAMES[3]=apr;
	MONTH_NAMES[4]=may; MONTH_NAMES[5]=jun; MONTH_NAMES[6]=jul; MONTH_NAMES[7]=aug;
	MONTH_NAMES[8]=sep; MONTH_NAMES[9]=oct; MONTH_NAMES[10]=nov; MONTH_NAMES[11]=dec;

	ppcDF = dateformat;
	ppcSV = target;
	if (ppcFC && (target.value == null)) { 
		setCalendar(); 
		ppcFC = false; 
	} else {
		ppcPtr = parseDateOrDefault(target.value, dateformat);
		setCalendar(ppcPtr.getFullYear(), ppcPtr.getMonth(), ppcPtr.getDate());
		ppcFC = false;
	}

	if ((ppcSV != null) && (ppcSV)) 
	{
		if (ns4) 
		{
			var obj = document.layers['PopUpCalendar'];
			obj.left = ppcXC;
			obj.top  = ppcYC;
			obj.visibility = "show";
		}
		else
		{
			var obj = document.getElementById('PopUpCalendar');
			var objFrm = document.getElementById('PopUpCalendarFrm');
 			
 			var navSelector= document.getElementById('navSelector');

			if(document.all)
			{
				obj.style.left = parseInt( document.body.scrollLeft || "0" ) + parseInt( event.clientX || "0" ) + 'px';
				obj.style.top  = parseInt( document.body.scrollTop || "0" ) + parseInt( event.clientY || "0" ) + 'px';
				objFrm.style.left = parseInt( document.body.scrollLeft || "0" ) + parseInt( event.clientX || "0" ) + 'px';
				objFrm.style.top  = parseInt( document.body.scrollTop || "0" ) + parseInt( event.clientY || "0" ) + 'px';
				
			}
			else
			{
				obj.style.left = parseInt( event.clientX || "0" ) + 'px';
				obj.style.top  = parseInt( event.clientY || "0" ) + 'px';				
			}

			var monthDays = document.getElementById('monthDays');
			monthDays.style.visibility = "visible";
			
			
 			navSelector.style.visibility = "visible";
 			
 			obj.style.visibility = "visible";
 			
 			
		}
	}
	else 
	{ 
		showError(ppcER[1]);
	}
}

/**
 *
 */
function parseDateOrDefault(sDate, sDateFormat)
{
	if (sDate == null) return new Date();
	iDateInMillis = parseDate(trim(sDate), sDateFormat);
	if (iDateInMillis == 0)
		return new Date();
	else
		return new Date(iDateInMillis);
}

/**
 *
 */
function moveMonth(dir) 
{
	var objM = null, objY = null;
	var limit = false;
	var dptrYear, dptrMonth;

	if (ns4) 
	{
		objM = document.layers['PopUpCalendar'].document.layers['navSelector'].document.ppcNavBar.sMonth;
		objY = document.layers['PopUpCalendar'].document.layers['navSelector'].document.ppcNavBar.sYear;
	}
	else
	{ 
		objM = document.ppcNavBar.sMonth; 
		objY = document.ppcNavBar.sYear; 
	}

	if (objM != null && objY != null) 
	{
		if ((dir.toLowerCase() == "back") && (objM.selectedIndex > 0 || objY.selectedIndex > 0)) 
		{ 
			if (objM.selectedIndex > 0)
			{
				objM.selectedIndex--; 
			}
			else
			{
				objM.selectedIndex = 11;
				objY.selectedIndex--;
			}
		}
		else if ((dir.toLowerCase() == "forward") && ((objM.selectedIndex < 11) || (objY.selectedIndex+1 < objY.options.length))) 
		{
			if (objM.selectedIndex < 11)
				objM.selectedIndex++;
			else
			{
				objM.selectedIndex = 0;
				objY.selectedIndex++;
			}
		}
		else { limit = true; }
	}

	if (!limit) 
	{
		dptrYear  = objY.options[objY.selectedIndex].value;
		dptrMonth = objM.options[objM.selectedIndex].value;
		setCalendar(dptrYear,dptrMonth);
	}
	else 
	{
		if (!ns4) 
		{
			objM.style.backgroundColor = "#FF0000";
			objY.style.backgroundColor = "#FF0000";
			window.setTimeout("document.ppcNavBar.sMonth.style.backgroundColor = '#FFFFFF'", 50);
			window.setTimeout("document.ppcNavBar.sYear.style.backgroundColor = '#FFFFFF'", 50);
		}
	}
}

/**
 *
 */
function selectDate(param) 
{
	var arr   = param.split("|");
	var year  = arr[0];
	var month = arr[1];
	var date  = arr[2];
	var ptr = parseInt(date);
	ppcPtr.setDate(ptr);

	if ((ppcSV != null) && (ppcSV)) 
	{
		if (validDate(date)) 
		{
			ppcSV.value = dateFormat(year,month,date);
			ppcSV.focus(); // cheat so onFocus can be used
			hideCalendar();
		}
		else 
		{
			showError(ppcER[2]);
			if (ppcTI) 
			{
				clearTimeout(ppcTI);
				ppcTI = false;
			}
		}
	}
	else 
	{
		showError(ppcER[1]);
		hideCalendar();
	}
}

/**
 *
 */
function setCalendar(year, month, date) 
{
	if (year  == null) {year = getFullYear(ppcNow);}
	if (month == null) {month = ppcNow.getMonth();}
	if (month == 1) {ppcML[1]  = (isLeap(year)) ? 29 : 28;}
	if (date == null) {date = "1";}
	ppcPtr.setYear(year);
	ppcPtr.setMonth(month);
	ppcPtr.setDate(date);
	ppcPtr.setMonth(month);
	setSelectList(year,month);
	updateContent();
}
 
/**
 *
 */
function updateContent() 
{
	generateWeekDay();
	generateContent();

	if (ns4) 
	{
		with (document.layers['PopUpCalendar'].document.layers['monthDays'].document) {
		open("text/html");
		write("<html>\n<head>\n<title>DynDoc</title>\n</head>\n<body bgcolor=\"#FFFFFF\">\n");
		write(ppcCD);
		write("</body>\n</html>");
		close();}
	}
	else 
	{
	    elementLocate(document,'monthDays').innerHTML = ppcCD;
	}
	ppcCD = ppcWD + ppcTT;
	
	// Adjust frame height
	var frm = document.getElementById("PopUpCalendarFrm");
	var	obj0 = document.getElementById("navSelector");
	var	obj1 = document.getElementById("monthDays");
	frm.style.height= obj0.offsetHeight  + obj1.offsetHeight + 2;
}

/**
 *
 */
function generateWeekDay() 
{
	if(ppcWD == null)
	{
		ppcWD = "<table border=\"0\" style=\"border-bottom-style:solid;border-bottom-width:1;\" cellspacing=\"0\" cellpadding=\"2\" bordercolor=\"#000000\" width=\"240\" vspace=\"0\" hspace=\"0\">";
		ppcWD += "<tr border=\"0\" align=\"center\" bgcolor=\"#DDDDDD\">";
		for (i = 0; i < 7; i++)
		{
			ppcWD += '<td width="30" align="center" style="font-family: \'Arial Unicode MS\'; font-size: 8pt;"><B>';
			
			ppcWD += CALENDAR_WEEKDAYS[i];
			ppcWD += "</B></td>";
		}
		ppcWD += "</tr></table>";
	}
	ppcCD = ppcWD + ppcTT;
}

function generateContent()
{
	var year  = getFullYear(ppcPtr);
 
	var month = ppcPtr.getMonth();
	var date  = 1;
 
	var temp = ppcPtr.getDate();
	ppcPtr.setDate(date);
	var day   = ppcPtr.getDay();
	ppcPtr.setDate(temp);
 
	var len   = ppcML[month];
	var bgr,cnt,tmp = "";
	var j,i = 0;
	ppcHT = 0;
	for (j = 0; j < 7; ++j)
	{
		if (date > len)
		{
			break;
		}
		for (i = 0; i < 7; ++i)
		{
			bgr = ((i == 0)||(i == 6)) ? "#9ccfff" : "#ffffff";
			if (((j == 0)&&(i < day))||(date > len))
			{
				tmp  += makeCell(bgr,year,month,0);
			}
			else
			{
				tmp  += makeCell(bgr,year,month,date);
				++date;
			}
		}
		ppcCD += "<tr align=\"center\">\n" + tmp + "</tr>\n";
		tmp = "";
		ppcHT+=20;
	}
	ppcCD += "</table>\n";
}

function makeCell(bgr, year, month, date) 
{
	var param = "\'"+year+"|"+month+"|"+date+"\'";
	var td1 = "<td height=\"20\" width=\"30\" bgcolor=\""+bgr+"\" ";
	var td2 = (!ns4) ? "</font></span></td>\n" : "</font></a></td>\n";
	var evt = "onMouseOver=\"this.style.backgroundColor=\'#F5ED7E\'\" onMouseOut=\"this.style.backgroundColor=\'"+bgr+"\'\" onMouseUp=\"selectDate("+param+")\" ";
	var ext = "<span Style=\"cursor: pointer;\">";
	var lck = "<span Style=\"cursor: default\">";
	var lnk = "<a href=\"javascript:selectDate("+param+")\" onMouseOver=\"window.status=\' \';return true;\">";
	
	var cellValue = (date != 0) ? date+"" : "&nbsp;";

	if ((ppcPtr.getDate() == date)&&(ppcPtr.getMonth() == month)&&(getFullYear(ppcPtr) == year))
	{
		cellValue = "<b>"+cellValue+"</b>";
	}
	
	var cellCode = "";
	if (date == 0) 
	{
		if (ns4) 
		{
			cellCode = td1+">"+ppcFT+cellValue+td2;
		}
		else		
		{
			cellCode = td1+"Style=\"cursor: default\">"+lck+ppcFT+cellValue+td2;
		}
	}
	else 
	{
		if (ns4) 
		{
			if (date < 10) 
			{
				cellValue = "&nbsp;" + cellValue + "&nbsp;";
			}
			cellCode = td1+">"+lnk+ppcFT+cellValue+td2;
		}
		else
		{
			cellCode = td1+evt+"Style=\"cursor: pointer\">"+ext+ppcFT+cellValue+td2;
		}
	}
	return cellCode;
}

function setSelectList(year,month) 
{

	var iY = year - ppcNow.getFullYear() + 100;
	
	var i = 0;
	var objM = null, objY = null;
	if (ns4) 
	{
		objM = document.layers['PopUpCalendar'].document.layers['navSelector'].document.ppcNavBar.sMonth;
		objY = document.layers['PopUpCalendar'].document.layers['navSelector'].document.ppcNavBar.sYear;
	}
	else
	{
		objM = document.ppcNavBar.sMonth;
		objY = document.ppcNavBar.sYear;
	}
	objY.selectedIndex = parseInt(iY, 10);
	objM.selectedIndex = parseInt(month, 10);
	
}

function hideCalendar() 
{
	if (ns4) 
	{
		document.layers['PopUpCalendar'].visibility = "hide";
		window.status = " ";
	}
	else
	{
		var popup = document.getElementById('PopUpCalendar');
		popup.style.visibility = "hidden";
		var popupFrm = document.getElementById('PopUpCalendarFrm' );
		popupFrm.style.visibility = "hidden";
		var monthDays = document.getElementById('monthDays');
		monthDays.style.visibility = "hidden";
		var navSelector= document.getElementById('navSelector');
		navSelector.style.visibility = "hidden";
	}

	ppcTI = false;
	ppcSV = null;
}

function showError(message) 
{
 window.alert("[ PopUp Calendar ]\n\n" + message);
}

function isLeap(year) {
 if ((year%400==0)||((year%4==0)&&(year%100!=0))) {return true;}
 else {return false;}}

function getFullYear(obj) {
	return obj.getFullYear();
}

function validDate(date) {
 var reply = true;
 if (ppcRL == null) {/* NOP */}
 else {
  var arr = ppcRL.split(":");
  var mode = arr[0];
  var arg  = arr[1];
  var key  = arr[2].charAt(0).toLowerCase();
  if (key != "d") {
   var day = ppcPtr.getDay();
   var orn = isEvenOrOdd(date);
   reply = (mode == "[^]") ? !((day == arg)&&((orn == key)||(key == "a"))) : ((day == arg)&&((orn == key)||(key == "a")));}
  else {reply = (mode == "[^]") ? (date != arg) : (date == arg);}}
 return reply;}

function isEvenOrOdd(date) {
 if (date - 21 > 0) {return "e";}
 else if (date - 14 > 0) {return "o";}
 else if (date - 7 > 0) {return "e";}
 else {return "o";}}

function dateFormat(year,month,date) 
{
 
 if(ns4 || (!document.all))
 	 dt = new Date(year, month, date);
 else
	dt = new Date(year, month, date);
 return formatDate(dt, ppcDF);
}

function checkMousePos(event)
{
	var cal, obj0, obj1, left, top, width, 
	 tbl_ht, total_ht, right, bottom, x, y;
	
	if (ns4) {
		obj0 = document.layers['PopUpCalendar'];
		obj1 = document.layers['PopUpCalendar'].document.layers['navSelector'];
		
		left = parseInt(obj0.left);
		top = parseInt(obj0.top);
		x = ppcXC;
		y = ppcYC;
		if ( ppcXC == -1 || ppcYC == -1)
		{
			return;
		}
	}
	else {
		cal = document.getElementById("calendar");
		if(!cal) return;
		obj0 = document.getElementById("PopUpCalendar");
		obj1 = document.getElementById("navSelector");

		left = parseInt(obj0.style.left);
		top = parseInt(obj0.style.top);

		if(document.all)
		{
			if ( event.clientX <= -1 || event.clientY <= -1)
			{
				return;
			}
			x = document.body.scrollLeft + event.clientX;
			y = document.body.scrollTop + event.clientY;
		}
		else
		{
			if ( event.clientX <= -1 || event.clientY <= -1)
			{
				alert("return 2");
				return;
			}
			
			x = event.pageX;
			y = event.pageY;
		}
	}

	if(ns4)
	{
		document.layers['PopUpCalendar'].document.layers['monthDays'].document.tags.table.width="240";
		width = document.layers['PopUpCalendar'].document.layers['monthDays'].document.tags.table.width;
	}
	else
		width = parseInt(cal.width);
	
	tbl_ht = parseInt(ppcHT);
	if(ns4)
	{
		total_ht = tbl_ht + parseInt(obj0.height) + parseInt(obj1.height);
	}
	else
		total_ht = tbl_ht + parseInt(obj0.style.height) + parseInt(obj1.style.height);
	right = left + width;
	bottom = top + total_ht;

	
	
	if (!(x >= left && x <= right && y >= top && y <= bottom))
	{
		if (document.all)
		{
			hideCalendar();
		}
		else
		{
			if(!blockHide)
			{
				hideCalendar();
			}
		}
	}
}


/////////////////////////////////

function myvoid()
{
}
