/*
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.
	
	- ENHANCED PARAMETER PAGES FUNCTIONS
	- OTHER HTML CONTROL FUNCTIONS
	- ONLY FOR MANAGEMENT CONSOLE 
	- Functions being used just by ASP
	
 */

/******************************************************************************
	ENHANCED PARAMETER PAGES FUNCTIONS
******************************************************************************/
var menuRef = null;
var inputBox = null;
var dropBox = null;
var lastItemString = "<Edit Last Item>";
var layerId = "";
var origBgColor = "#CCCCCC";

function setCheckboxValue(selectID, checkbox)
{
		menu = document.getElementById(selectID);
		if(menu)
		{
			if(checkbox.checked)
			{
				menu.value="True";
			}
			else if(!checkbox.checked)
			{
				menu.value="False";
			}
		}
		
}
function updateDropdown(selectID, inputbox)
{
	menu = document.getElementById(selectID);
	if (menu)
	{
		for ( i = 0; i < menu.length; i++)
		{
			if (menu[i].value == inputbox.value)
			{
				menu.selectedIndex = i;
				return;
			}
		}	
	}
	menu.selectedIndex = -1;
}

function updateDropdownDisplayName(selectID, inputboxName, inputboxValueID )
{
	menu = document.getElementById(selectID);
	inputboxValue = document.getElementById(inputboxValueID);
	if (menu)
	{
		for ( i = 0; i < menu.length; i++)
		{
			if (menu[i].text == inputboxName.value)
			{			
				menu.selectedIndex = i;
				inputboxValue.value = menu[i].value;
				return;
			}
		}	
	}
	menu.selectedIndex = -1;
	inputboxValue.value = inputboxName.value;
}

function updateDropdownBySelf(selectID, menu)
{
	inputbox = document.getElementById(selectID);
	if (menu)
	{
		for ( i = 0; i < menu.length; i++)
		{
			if (menu[i].value == inputbox.value)
			{
				menu.selectedIndex = i;
				return;
			}
		}	
	}
	menu.selectedIndex = -1;
}

function updateDropdownBySelfDisplayName(inputValueID, inputNameID, menu)
{
	inputboxValue = document.getElementById(inputValueID);
	inputboxName = document.getElementById(inputNameID);
	
	if (menu)
	{
		for ( i = 0; i < menu.length; i++)
		{
			if (menu[i].text == inputboxName.value)
			{
				menu.selectedIndex = i;
				inputboxValue.value = menu[i].value;			
				return;
			}
		}	
	}
	menu.selectedIndex = -1;
	inputboxValue.value = inputboxName.value;
}

function updateDropdownNS4(aForm, selectID, inputbox)
{
	var menu = aForm.elements[selectID];
	if (menu)
	{
		for ( i = 0; i < menu.length; i++)
		{
			if (menu[i].value == inputbox.value)
			{
				menu.selectedIndex = i;
				return;
			}
		}	
	}
	menu.selectedIndex = -1;
}

function updateDropdownBySelfNS4(aForm, selectID, menu)
{
	var inputbox = aForm.elements[selectID];
	if (menu)
	{
		for ( i = 0; i < menu.length; i++)
		{
			if (menu[i].value == inputbox.value)
			{
				if (menu.selectedIndex != i)
					menu.selectedIndex = i;
				return;
			}
		}	
	}
	menu.selectedIndex = -1;
}

function updateInput(selectID, menu)
{
	inputbox = document.getElementById(selectID);
	if (inputbox)
	{
		if (menu.selectedIndex >= 0 &&  menu.selectedIndex < menu.length)
			inputbox.value = menu[menu.selectedIndex].text;
	}
}

function updateInputDisplayName(inputValueID, inputNameID, menu)
{
	inputboxValue = document.getElementById(inputValueID);
	inputboxName = document.getElementById(inputNameID);
		
	if (inputboxName)
	{
		if (menu.selectedIndex >= 0 &&  menu.selectedIndex < menu.length)
		{
			inputboxName.value = menu[menu.selectedIndex].text;
			inputboxValue.value = menu[menu.selectedIndex].value;
		}
	}
}

function updateInputNS4(aForm, selectID, menu)
{
	var inputbox = aForm.elements[selectID];
	if (inputbox)
	{
		if (menu.selectedIndex >= 0 &&  menu.selectedIndex < menu.length)
			inputbox.value = menu[menu.selectedIndex].value;
	}
}

function reposition(from, to, offset)
{
	repositionxy(from, to, offset, 0, 0);
}

function repositionxy(from, to, offset, yoffset, mode)
{
	if (document.layers) 
	{
		from.left = to.x + offset;
		from.top = to.y + yoffset;
	}
	else
	{
		var left = to.offsetLeft;
		var top = to.offsetTop;
		var oP = to.offsetParent;
		while (oP != null) 
		{
			left = left + oP.offsetLeft;
			top = top + oP.offsetTop;
			oP = oP.offsetParent;
		}

		from.style.left = left + offset;
		from.style.top = top + yoffset;	
		if (mode == 1)
		{	
		    if(typeof(window.innerHeight) == 'number') 
		    {
				// Non-IE browsers
				//alert("Top=" + top + ", pageYOffset=" + window.pageYOffset + ", window.innerHeight=" + window.innerHeight + ", from.clientHeight=" + from.height);
				if (top > (window.pageYOffset + window.innerHeight) * 3 / 5)
					from.style.top = top + yoffset - 190;
			}
		    else if(document.documentElement && document.documentElement.clientHeight && document.documentElement.scrollTop) 
		    {
				//IE 6+ browsers in 'standards compliant mode'
				//alert("Top=" + top + ", pageYOffset=" + document.body.scrollTop + ", window.innerHeight=" + document.body.clientHeight);
				if (top > (document.documentElement.scrollTop + document.documentElement.clientHeight) * 3 / 5)
					from.style.top = top + yoffset - from.clientHeight;
			}
		    else if(document.body && document.body.clientHeight) 
		    {
				//IE 4 compatible browsers
				//alert("Top=" + top + ", pageYOffset=" + document.body.scrollTop + ", window.innerHeight=" + document.body.clientHeight);
				if (top > (document.body.scrollTop + document.body.clientHeight) * 3 / 5)
					from.style.top = top + yoffset - from.clientHeight;
			}
		}
	}
}

var popup = null;
var inputRef = null;
var activeState = true;
var menuShowTimer = null;
var enableOnClick = false;

function enableClick(forceSet, keypressed)
{
	if (forceSet)
	{
		enableOnClick = true;
	}
	else if (getEventKeyCode(keypressed)==13) 
	{
		// if ENTER pressed on this button, enable onclick event.
		enableOnClick = true;
	}
}

function activatePopup(item, id, aFormNS, inputIdNS4)
{
	if (!document.layers)
	{		
		if (enableOnClick == false)
		{
			item.blur();
			return false;
		}
		window.clearTimeout(menuShowTimer);
		inputRef = document.getElementById(id);
		if (popup == null)
			popup = document.getElementById("AdHocMenu");
		repositionxy(popup, item, 18, 0, 1);
		popup.style.visibility = "visible";
		popup.style.backgroundColor = "#CCCCCC";
		popup.style.borderWidth = "2";
		popup.style.borderStyle = "Outset";
	}
	else
	{
		window.clearTimeout(menuShowTimer);
		inputRef = aFormNS.elements[inputIdNS4];
		var anchor = document.anchors[id];
		yoffset = 0;
		for (i = 0; i < 12; i++)
		{
			popup = document.layers["AdHocMenu" + i];
			if (popup)
			{
				repositionxy(popup, anchor, 18, yoffset, 0);
				yoffset += 20;
				popup.visibility = "visible";
				popup.bgColor = "#CCCCCC";
			}
		}
	}
	activeState = false;
	menuShowTimer = window.setTimeout("hidePopUp();", 8000);
}

function deactivatePopup()
{
	enableOnClick = false;
	activeState = false;
	window.clearTimeout(menuShowTimer);	
	menuShowTimer = window.setTimeout("hidePopUp();", 350);		
}

function hidePopUp() 
{
	if (document.layers)
	{
		for (i = 0; i < 12; i++)
		{
			popup = document.layers["AdHocMenu" + i];
			if (popup)
				popup.visibility = "hidden";
		}
	}
	else if (activeState == false && popup != null)
	{
			popup.style.visibility = "hidden";
	}

	enableOnClick = false;		
}

function onItem(item)
{
	activeState = true;
	window.clearTimeout(menuShowTimer);	
	if (document.layers)
	{
		origBgColor = item.bgColor;
		item.bgColor = "gray";	
		layerId = item.id;
	}
	else
	{
		origBgColor = item.style.backgroundColor;
		item.style.backgroundColor = "gray";
	}
}

function offItem(item)
{
	activeState = false;
	if (document.layers)
		item.bgColor = origBgColor;
	else
		item.style.backgroundColor = origBgColor;
	deactivatePopup();
}

function appendText(text)
{
	if (!document.layers)
		popup.style.visibility = "hidden";
	else
	{
		for (i = 0; i < 12; i++)
		{
			popup = document.layers["AdHocMenu" + i];
			if (popup)
				popup.visibility = "hidden";
		}
	}
	activeState = false;
	inputRef.focus();
	inputRef.value = inputRef.value + text;
}

function doClickNS4(ev)
{
	var index;
	if (layerId.length == 10 || layerId.length == 11)
	{
		index = layerId.charAt(layerId.length-1) - '0';
		if (index < 0 || index > 10)
			return;
		if (layerId.length == 11)
			index += 10;
		switch (index)
		{
		case 0:
			appendText('>'); break;
		case 1:
			appendText('<'); break;
		case 2:
			appendText('>='); break;
		case 3:
			appendText('<='); break;
		case 4:
			appendText('|'); break;
		case 5:
			appendText('&'); break;
		case 6:
			appendText('!'); break;
		case 7:
			appendText('_'); break;
		case 8:
			appendText('%'); break;
		case 9:
			appendText('[]'); break;
		case 10:
			appendText('-'); break;
		case 11:
			appendText('\\'); break;
		default:
			appendText(''); break;
		}
	}
}

function hookupEventsNS4(el) 
{
	el.document.captureEvents(Event.MOUSEUP);
	el.document.onmouseup = doClickNS4;
}

function changeBGColor(item, color)
{
	item.style.backgroundColor = color;
}


function updateDateTime(dateControl,timeControl,dateTimeControl)
{
	var dateControlValue = "";
	var timeControlValue = "";
	if ( _isEmpty(dateControl) == false )
	{
		dateControlValue = dateControl.value;
	}
	if ( _isEmpty(timeControl) == false )
	{
		timeControlValue = timeControl.value;
	}
	
	var dateTimeString = dateControlValue + " " + timeControlValue;
	var ch = dateTimeString.substring(0, 1);
	// Trimming the leading spaces
	while (ch  == " ")
	{
      		dateTimeString  = dateTimeString.substring(1, dateTimeString.length);
      		ch = dateTimeString.substring(0, 1);
   	}
   	
   	//Trim trailing spaces
	ch = dateTimeString.substring(dateTimeString.length -1, dateTimeString.length);
   	while(ch == " ")
   	{
   		dateTimeString = dateTimeString.substring(0, dateTimeString.length -1);
		ch = dateTimeString.substring(dateTimeString.length -1, dateTimeString.length);
   	}
   	
   	if ( _isEmpty(dateTimeControl) == false )
   	{
		dateTimeControl.value = dateTimeString;
	}
}




/******************************************************************************
	OTHER HTML CONTROL FUNCTIONS
******************************************************************************/

/*
	open a window with size and style for actuate query wizard
*/
function openJSPQueryWindow(url)
{
	window.open(url,'AcWizardWindow',
		'height=700,height=565, status, scrollbars, resizable').focus();
}

/* 
	Disable / enable html controls such as input text box, etc.
 */
function setControlDisabled(control,value)
{
	control.disabled = value;

	if (control.style)
	{
		if (true == value)
			control.style.backgroundColor = "threedface";	// fail on NETSCAPE4.7
		else
			control.style.backgroundColor = "white";
	}
	else
	{
		// NS4.7 cheat
		if (!control.onfocus)
			control.onfocus = control.blur;
	}
}
// The difference is this one doesn't set color
function setControlDisabled2(control,value)
{
	if (control.style)
	{
		control.disabled = value;
	}
	else
	{
		// NS4.7 cheat
		if (!control.onfocus)
			control.onfocus = control.blur;
	}
}

/*
	Submit a given form and when the 
	the select control's selection is not the last one
	For example:
	<select onchange="chooseOption(this.form,this)>	
 */
function chooseOption(form,selectControl)
{
	if (selectControl.selectedIndex+1 < selectControl.length)
	{
		form.submit();
	}
}

function submitOnFirstOption(form,selectControl)
{
	if (selectControl.selectedIndex == 0)
	{
		form.submit();
	}
}

function submitOnLastOption(form,selectControl)
{
	if (selectControl.selectedIndex+1 == selectControl.length)
	{
		form.submit();
	}
}

// Simulate a click button if the event is ENTER pressed
// Use with:
// <INPUT type="text" onkeypress="clickOnEnter(event,this.form.theButtonName)"
function clickOnEnter(event,button)
{
	if (event.keyCode == 13)
	{
		button.focus();
		button.click();
		
		event.cancelBubble = true;
		event.returnValue = false;

		//event.stopPropagation works only in Firefox.
		if (event.stopPropagation) {
			event.stopPropagation();
			event.preventDefault();
		}
		return false;
	}
}

/******************************************************************************
	ONLY FOR MANAGEMENT CONSOLE 
******************************************************************************/

/*
	function setRadioValue(radioControl,checkedValue)
	given a radioControl
		<INPUT type="radio" name="radioName" value="value0">
		<INPUT type="radio" name="radioName" value="value1">
	set the value checked to checkedValue
 */
function setRadioValue(radioControl,checkedValue)
{
	for (radioIndex=0;radioIndex<radioControl.length;radioIndex++) {
		if (radioControl[radioIndex].value == checkedValue) {
			radioControl[radioIndex].checked = true;
		}
	}
}

function getRadioValue(radioControl)
{
	for (radioIndex=0;radioIndex<radioControl.length;radioIndex++)
		if (radioControl[radioIndex].checked)
			return radioControl[radioIndex].value;
}

function getSelectValue(selectControl)
{
	index = selectControl.selectedIndex;
	return selectControl.options[index].value;
}

function setSelectValue(selectControl,value)
{
	for (selectIndex=0;selectIndex<selectControl.length;selectIndex++) {
		if (selectControl.options[selectIndex].value == value) {
			selectControl.selectedIndex = selectIndex;
		}
	}
}

/******************************************************************************
// Functions being used just by ASP
******************************************************************************/

function SaveOutputFileCilcked(   SaveOutputChk,
								  DocumentNameTxt,
								  DocumentVersionName,
								  PersonalFolderRdBtn,
								  AbsoluteFolderRdBtn,
								  AbsoluteFolderTxt,
								  BrowseFolderBtn,
								  CreateRdBtn,
								  ReplaceRdBtn,
								  HomeFolderExists,
								  DefOutputFolder ,
								  OutputFolder,
								  AbsFolder)
 {
	
	if ( document.forms[0].elements[SaveOutputChk] == null || document.forms[0].elements[SaveOutputChk].checked )
	{
	
		document.forms[0].elements[DocumentNameTxt].disabled = false;
		document.forms[0].elements[DocumentVersionName].disabled = false;
		

		if ( HomeFolderExists.toLowerCase() == "true" )
		{
			document.forms[0].elements[PersonalFolderRdBtn].disabled = false;
		}
		else
		{
			document.forms[0].elements[PersonalFolderRdBtn].disabled = true;
		}
			
		document.forms[0].elements[AbsoluteFolderRdBtn].disabled = false;
		
		if ( document.forms[0].elements[AbsoluteFolderRdBtn].checked )
		{
			document.forms[0].elements[AbsoluteFolderTxt].disabled = false;
			document.forms[0].elements[BrowseFolderBtn].disabled = false;
			
			if ( document.forms[0].elements[AbsoluteFolderTxt].value == "")
				document.forms[0].elements[AbsoluteFolderTxt].value = DefOutputFolder;
			
		}
		else
		{
			document.forms[0].elements[AbsoluteFolderTxt].disabled = true;
			document.forms[0].elements[BrowseFolderBtn].disabled = true;
		}

		document.forms[0].elements[CreateRdBtn].disabled = false;
		document.forms[0].elements[ReplaceRdBtn].disabled = false;
	
	}
	else
	{
	   
		if ( document.forms[0].elements[AbsoluteFolderRdBtn].checked )
		{
		 	AbsoluteFolderRdBtnClicked( PersonalFolderRdBtn,
									  AbsoluteFolderTxt,
									  DefOutputFolder,
									  BrowseFolderBtn ,
									  OutputFolder,
									  AbsFolder);
		
		}
		document.forms[0].elements[DocumentNameTxt].disabled = true;
		document.forms[0].elements[DocumentVersionName].disabled = true;
		document.forms[0].elements[PersonalFolderRdBtn].disabled = true;
		document.forms[0].elements[AbsoluteFolderRdBtn].disabled = true;
		document.forms[0].elements[BrowseFolderBtn].disabled = true;
		document.forms[0].elements[CreateRdBtn].disabled = true;
		document.forms[0].elements[ReplaceRdBtn].disabled = true;
		document.forms[0].elements[AbsoluteFolderTxt].disabled = true;
	
	}
			
}


function PersonalFolderRdBtnClicked( AbsoluteFolderRdBtn ,
									 AbsoluteFolderTxt,
									 BrowseFolderRdBtn ,
									 OutputFolder,
									 AbsFolder)
 {
	document.forms[0].elements[AbsoluteFolderRdBtn].checked = false;
	document.forms[0].elements[AbsoluteFolderTxt].disabled = true;
	document.forms[0].elements[AbsoluteFolderTxt].value = "";
	document.forms[0].elements[BrowseFolderRdBtn].disabled = true;
	document.forms[0].elements[OutputFolder].value = "personal";
	document.forms[0].elements[AbsFolder].value = "";
	
}
 
 function AbsoluteFolderRdBtnClicked( PersonalFolderRdBtn,
									  AbsoluteFolderTxt,
									  DefOutputFolder,
									  BrowseBtn ,
									  OutputFolder,
									  AbsFolder)
 {
	document.forms[0].elements[PersonalFolderRdBtn].checked = false;
	document.forms[0].elements[AbsoluteFolderTxt].disabled = false;
	
	if ( document.forms[0].elements[AbsoluteFolderTxt].value == "" )
	{
		document.forms[0].elements[AbsoluteFolderTxt].value = DefOutputFolder;
	}
	
	document.forms[0].elements[BrowseBtn].disabled = false;
	document.forms[0].elements[OutputFolder].value = "absolute";
	document.forms[0].elements[AbsFolder].value = 
		document.forms[0].elements[AbsoluteFolderTxt].value;
 }
 
 
 function CreateRdBtnClicked( ReplaceRdBtn , ReplaceAction)
 {
 	document.forms[0].elements[ReplaceRdBtn].checked = false;
	document.forms[0].elements[ReplaceAction].value = "create";
 }
 
 function ReplaceRdBtnClicked( CreateRdBtn, ReplaceAction  )
 {
	document.forms[0].elements[CreateRdBtn].checked = false;
	document.forms[0].elements[ReplaceAction].value = "replace";

}

function AbsoluteFolderTxtChanged( AbsoluteFolderTxt,  AbsFolderHidden )
{
	document.forms[0].elements[AbsFolderHidden].value = 
			document.forms[0].elements[AbsoluteFolderTxt].value;
}


// The functions for the editable list modified for the ASP
var hiddenTxt = null;
var parameterName = null;

function startEditingList(menu, parameter, IdHiddenTxt)
{
    if (menu.selectedIndex == menu.length-1)
	{
		menuRef = menu;
		hiddenTxt  = document.forms[0].elements[IdHiddenTxt];
		parameterName = parameter;
		
		if (inputBox == null)
			inputBox = document.getElementById("dropdownInput");
		if (dropBox == null)
			dropBox = document.getElementById("dropdownShadow");
		inputBox.value = menu[menu.selectedIndex].text;
		
		var offset = inputBox.offsetWidth - dropBox.offsetWidth;
		reposition(dropBox, menu, offset);
		reposition(inputBox, menu, 0);
		
		
		menu.style.visibility = "hidden";
		dropBox.style.visibility = "visible";
		inputBox.style.visibility = "visible";
		inputBox.focus();
	}
}
	
function finishEditingList()
{
	menuRef[menuRef.length-1].text = inputBox.value;
	menuRef[menuRef.length-1].value = inputBox.value;

	updateEditableParamValue();	
	menuRef.style.visibility = "visible";
	inputBox.style.visibility = "hidden";
	dropBox.style.visibility = "hidden";
	
	inputBox.blur();
//	menuRef.focus();
}


function updateEditableParamValue()
{
// Store the name and value of the editable list item in the 
	// hidden field. 
	if ( hiddenTxt )
	{
			// Check if the value already contains the name
			// If So overwrite the previous value
			
			var formattedValue = hiddenTxt.value.split(';');
			var newValue = "";

		   if ( formattedValue != null &&
		        formattedValue != "")
		   {
			   for ( var i=0; i < formattedValue.length ; i++ )
			   {

				   var param = formattedValue[i];
				   var index = param.indexOf("=");
				   if ( index != - 1)
				   {

				      var paramName = param.substring( 0, index );
				      var paramValue = param.substring( index + 1);
				      
				      if ( paramName == parameterName )
				      {
				          paramValue = inputBox.value;

				      }
				       
				 	newValue += parameterName + "=" + paramValue + ";";

				   }
			   }
			   
			   hiddenTxt.value = newValue;	   
		   }
		   else
		   {
		   
				
				hiddenTxt.value +=  parameterName + "=" + inputBox.value + ";" ;		
		   }
		   

	}
}
