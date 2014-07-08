<%-- --------------------------------------------------------------------------
	Actuate Corporation
	Copyright (C) 2003 Actuate Corporation. All rights reserved.
		
	Description:
		Very Simple Popup
-------------------------------------------------------------------------- --%>
<%--
	EXAMPLE USAGE:
	
	<HEAD>
		<%@ include file="popup.jsp" %>
	</HEAD>
	
	<TABLE id="popupMessage" border="0">
		<TR>
			<TD width="160"><DIV id="popupText"></DIV></TD>
		</TR>
	</TABLE>
	
	<IMG SRC="your popup handle image"
		onmouseover="showPopup(this,'popupMessage',event,'Bottom')"
		onmouseout="hidePopup('popupMessage')">
		;
	}
}
--%>

<!-- BEGIN POPUP TEXT -->

<SCRIPT>
	
	function sumOffsetTop(element) 
	{
		offsetTop = 0;
		while (element != null) 
		{
			offsetTop += element.offsetTop;
	      	element = element.offsetParent;
		}
		return offsetTop;
	}
	    
	function sumOffsetLeft(element) 
	{
		offsetLeft = 0;
		while (element != null) 
		{
			offsetLeft += element.offsetLeft;
	      	element = element.offsetParent;
		}
		return offsetLeft;
	}
	    
	function showPopup(source,popupId,event,alignment)
	{
		var popup = document.getElementById(popupId);
		popup.style.position = 'absolute';
		
		// begin set location logic
		var align = 'Top';
		if (typeof(alignment) != 'undefined')
			align = alignment;
		popup.style.left = sumOffsetLeft(source);
		popup.style.top = sumOffsetTop(source);
		if (align.indexOf('Top') != -1) {
			popup.style.top = parseInt(popup.style.top) - popup.offsetHeight;
		} 
		if (align.indexOf('Bottom') != -1) {
			popup.style.top = parseInt(popup.style.top) + source.offsetHeight;
		} 
		if (align.indexOf('Left') != -1) {
			popup.style.left = parseInt(popup.style.left) - popup.offsetWidth;
		}
		if (align.indexOf('Right') != -1) {
			popup.style.left = parseInt(popup.style.left) + source.offsetWidth;
		}
		if (align.indexOf('Scroll') != -1) {
			popup.style.left = document.body.scrollLeft;
		}
		// end set location logic
	
		popup.style.visibility = 'visible';
	}
	
	function hidePopup(popupId)
	{
		var popup = document.getElementById(popupId);
		popup.style.visibility = 'hidden';
	}

</SCRIPT>
	
<STYLE>
	#popupMessage
	{
		color: black;
		font-family: 'Tahoma';
		font-size: 8pt;
		border: 1 solid black;
		background: rgb(255,255,225);
		visibility: hidden;
		position: absolute;
	}
</STYLE>
	
<!-- END   POPUP TEXT -->
