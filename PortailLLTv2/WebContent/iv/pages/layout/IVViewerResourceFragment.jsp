<%-----------------------------------------------------------------------------
	Copyright (c) 2004 Actuate Corporation and others.
	All rights reserved. This program and the accompanying materials 
	are made available under the terms of the Eclipse Public License v1.0
	which accompanies this distribution, and is available at
	http://www.eclipse.org/legal/epl-v10.html
	
	Contributors:
		Actuate Corporation - Initial implementation.
--%>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ page session="false" buffer="none" %>
				 
<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c_rt" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="/actabpanel" prefix="ap" %>

<%-----------------------------------------------------------------------------
	Expected java beans
--%>
<jsp:useBean id="fragment" type="com.actuate.iv.presentation.aggregation.IFragment" scope="request" />

<%-----------------------------------------------------------------------------
	Viewer root fragment
--%>
<DIV ID='viewerresource' style='height:100%;width:100%;display:none'>

<%
	if ( fragment != null )
	{
		fragment.callBack( request, response );
	}
%>
</DIV>	