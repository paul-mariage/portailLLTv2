<%@ page contentType="text/javascript;charset=utf-8" %>
<%@ page import="com.actuate.reportcast.utils.StaticFuncs" %>
<%@ page session="false" buffer="none" %>
<jsp:include page="../../common/jslib/js/jslibapi.js"></jsp:include>
<jsp:include page="./actuateAPI.js"></jsp:include>
<%
   /**
	 * actual url						: http://localhost:8080/iportal/test.jsp;jsessionid=0000pokVGU8O2IQbBbgXnm_QU-6:-1
	 * request.getRequestedSessionId( ) : pokVGU8O2IQbBbgXnm_QU-6
	 * request.getrequestURI()			: /iportal/test.jsp
	 * request.getRequestURL()			: /iportal/test.jsp;jsessionid=0000pokVGU8O2IQbBbgXnm_QU-6:-1
	 * request.getSession().getId()		: pokVGU8O2IQbBbgXnm_QU-6
	 * 
	 * With tomcat, getRequestURL call does not include the jsessionid whereas in WAS, it does.
	 * getRequestedSessionID: 	WAS truncates the value
	 * getSession().getId():	WAS truncates the value  
	 * 
	 * Since WAS sends over the jsessionid from getRequestURL call, we first attempt to look there before
	 * using the getSession().getId() call. 
	 */
	String jsid = null;
	String nonXssJsid = "";
	if( request.isRequestedSessionIdFromURL(  ) )
	{
			java.lang.StringBuffer buf = request.getRequestURL();
			String baseURL = buf.toString();
			
			String sessionIdSegment = ";jsessionid="; //$NON-NLS-1$
			int idx = baseURL.indexOf(sessionIdSegment);
			// Since WAS sends over the jsessionid from getRequestURL call, we first attempt to look there before
	 		// using the  getRequestedSessionId call
			if ( idx > 0 )
			{
				jsid = baseURL.substring(idx + sessionIdSegment.length());
			}
			// In Tomcat, jsessionid is not being included in getRequestURL call.
   			// This is the backup to get an http session id.
			else
			{
				jsid = request.getRequestedSessionId( );
			}
			// prevention of xss injection attack
			String nonXSSValue = "";
			if( StaticFuncs.isCrossSite( jsid ) )
			{ 
				jsid = null;
			}
	}
	if( jsid != null )
	{
		nonXssJsid = StaticFuncs.jsEncodeNonXSS( jsid, "" );
	}
%>	
 	actuate.jsessionId = "<%= nonXssJsid %>";	 






