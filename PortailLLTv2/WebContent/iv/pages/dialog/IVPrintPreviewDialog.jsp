<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="java.net.URLDecoder,
 				 com.actuate.reportcast.utils.StaticFuncs, 
 				 java.util.Set, 
 				 java.util.HashSet" %>
<jsp:useBean id="useragentbean" class="com.actuate.activeportal.beans.UserAgentBean" scope="request" />
<%
	
	useragentbean.setRequest(request);
	boolean isIE = useragentbean.isIE();
	String sURL = null;
	String printUrl = "";
	String format = null;
	Set<String> excludeParams = new HashSet<String>();
	excludeParams.add("connectionHandle"); //$NON-NLS-1$
	excludeParams.add("__vp"); //$NON-NLS-1$
	excludeParams.add("__ivsessionid"); //$NON-NLS-1$
	excludeParams.add("volume"); //$NON-NLS-1$
	excludeParams.add("__report"); //$NON-NLS-1$
	// try to get url from iv print dialog
	sURL = request.getParameter( "printUrl" ); //$NON-NLS-1$
	// try to get format from 'printUrl' which is send out by hidden form
	if( sURL != null )
	{
		if( sURL.toLowerCase(  ).indexOf( "__format=pdf" ) > -1 )
		{
			format = "pdf";
		}
	}
	// try to get format from url which is typed in by user
	else
	{
		format = request.getParameter( "__format" ); //$NON-NLS-1$
	}
			
	
	boolean isPdfPrint = false;
	if( "pdf".equalsIgnoreCase( format ) ) //$NON-NLS-1$
	{
		isPdfPrint = true;
	}
			
	// print is from url 		
	if( sURL == null )
	{
		if( Boolean.valueOf( request.getParameter( "__printsilent" ) ).booleanValue(  ) == true ) //$NON-NLS-1$
		{
				
				int pos = request.getRequestURL( ).indexOf( request.getContextPath(  ) );
				sURL =  request.getRequestURL( ).substring( 0, pos );
				sURL += request.getContextPath(  );
				sURL += "/iv?"; //$NON-NLS-1$
				String queryString = request.getQueryString(  ); //$NON-NLS-1$
				queryString = URLDecoder.decode( queryString );
				// remove the "__printsilent" parameter from url
				pos = queryString.indexOf( "__printsilent" );
				if( pos >= 0 )
				{
					sURL += queryString.substring( 0, pos-1 ) + queryString.substring( pos+18 );
				}
				// if it is html print, indicator inject 'window.print' code into outputstream on server 
				if( !isPdfPrint )
				{
					sURL += "&" + "__popupprintdialog" + "=true"; //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$ 
				}
				// in firefox, explicitly tell firefox to open the pdf on browser
				if( !isIE )
				{
					sURL += "&" + "__asattachment" + "=false"; //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$ 
				}
		}
		// prevention of xss injection attack
		String nonXSSValue = "";
		if( StaticFuncs.isCrossSite( sURL ) )
		{ 
			sURL = null;
		}
	}
	if( sURL != null )
	{
		// MCIP team don't want to fix the root cause and also refuse
		// others to modify their jsEncodeNonXSS method, so I have to 
		// workaround here
		String[] parts = sURL.split("&");//$NON-NLS-1$
		StringBuffer encodeUrl = new StringBuffer();
		encodeUrl.append( parts[0] );
		for( int i = 1; i < parts.length; i++ )
		{
			encodeUrl.append( "&" ); //$NON-NLS-1$
			String[] pair = parts[i].split( "=" ); //$NON-NLS-1$
			if( !excludeParams.contains( pair[0] ) )
			{
				encodeUrl.append( StaticFuncs.jsEncodeNonXSS( parts[i], "" ) ); //$NON-NLS-1$
			}
			else
			{
				encodeUrl.append( parts[i] );
			}
		}
		printUrl =  encodeUrl.toString(); 
	}
%>
<HTML>
	<HEAD>
		<title>pdf print</title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" >
			<%-- SET THE PAGE ENCODING --%>
		<SCRIPT language="JavaScript">
		
		function printIENow()
		{
			//alert("hello");
			var obj = document.getElementById("PDF");
			var pdfContainer = document.getElementById("pdfcontainer");
			
			var pluginVersion = getIEPDFVersion();
			if ( pluginVersion )
			{
				if ( pdfcontainer )
				{
					pdfcontainer.style.visibility = 'visible';
				}
				if ( pluginVersion >= 7 )
					obj.printWithDialog( );
				else
				{
					obj.print( );
				}	
			}
			else
			{
				try
				{
					if( obj && obj.printWithDialog )
					{
						obj.printWithDialog( );
					}
					else if( obj && obj.print )
					{
						obj.print( );	
					}
				}
				catch( exception )
				{
					// DO Nothing
				}
				
			}
		}
		
		function printFirefoxNow(  )
		{
			try
			{
				//setTimeout( "window.print();", 1000 );
				window.setTimeout( function(){ window.frames["printableFrame"].print( ); }, 1000 );
				
			}
			catch( e )
			{
				// do nothing
			}
		}
		
		function getIEPDFVersion() {
			if (hasActiveXObject('AcroPDF.PDF.1')) {
				return 7;
			} 
			if (hasActiveXObject('PDF.PdfCtrl.1')) {
				return 4;
			} 
			for (var i=2; i<10; i++) {
				if (hasActiveXObject('PDF.PdfCtrl.' + i)) {
					return i;
				}
			}
			return null;
		}

		function hasActiveXObject(name)
		{
			try {
				activeXObject = new ActiveXObject(name);
				if (activeXObject != null) {
					return true;
				}
			} catch (e) {
				return false;
			}
			
			return false;
		}
		function printHtmlNow(  )
		{
			var dialogContent = document.body;
			var hiddenDiv = document.createElement( 'div' );
			hiddenDiv.style.display = 'none';

			var hiddenForm = document.createElement( 'form' );
			hiddenForm.target = "_self";
			hiddenForm.action = "<%= printUrl %>";		
			hiddenForm.method = 'post';
			hiddenDiv.appendChild( hiddenForm );
			dialogContent.appendChild( hiddenDiv );
			
			hiddenForm.submit();
			dialogContent.removeChild( hiddenDiv );
		}
		function resize( needPrint )
		{
			if( needPrint )
			{
				setTimeout( function(){printIENow()}, 500 );
			}
			var oDiv = document.getElementById('pdfcontainer'); 
			if( document.documentElement.clientHeight > 0 )
			{
				oDiv.style.height=document.documentElement.clientHeight + "px";
			}
			else if( document.getElementsByTagName('body')[0].clientHeight > 0 )
			{
				oDiv.style.height = document.getElementsByTagName('body')[0].clientHeight + "px";
			}
			else if( window.innerHeight > 0 )
			{
				oDiv.style.height = window.innerHeight + "px";
			}
			else
			{
				oDiv.style.height = "100%";
			}
			
		}
	</SCRIPT>
	</HEAD>
	<% if( isPdfPrint ){ %>
	<% if( isIE ){ %>
	<BODY onLoad="resize(true)" onresize="resize(false)">
			<div id="pdfcontainer" style="visibility:hidden;">
				<OBJECT ID="PDF" CLASSID="clsid:CA8A9780-280D-11CF-A24D-444553540000" WIDTH="100%" HEIGHT="100%">
			 		<PARAM NAME="SRC" VALUE="<%= printUrl %>">
				</OBJECT>
			</div>
	</BODY>
	<% } else {%>
		<FRAMESET ROWS="0,*" onLoad="printFirefoxNow()">
		<FRAME NAME="ns4patch" src="blanknav.html">
		<FRAME NAME="printableFrame"  SRC="<%= sURL %>">
		<NOFRAMES>
			<BODY>
				Your browser doesn't support frames
			</BODY>
		</NOFRAMES>
		</FRAMESET>
	<% } %>
	<% } else { %>
	<BODY onLoad=" printHtmlNow( );">
	</BODY>
	<% }%>
</HTML>
