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
<%@ page import="com.actuate.iv.utility.IVParameterAccessor,
				com.actuate.iv.resource.IVResources,
				com.actuate.iv.IIVConstants" %>
<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%-----------------------------------------------------------------------------
	Print dialog fragment
--%>

<TABLE CELLPADDING='0px' CELLSPACING='0px'  CLASS="dialog_content_table" STYLE="width: 100%;">
	<TR>
		<TD>
			<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_PRINT_DIALOG_JS)%>_Format" />
		</TD>
	</TR>
	<TR>
		<TD>
			<DIV ID="<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_PRINT_DIALOG_JS)%>_PagesDiv" />
		</TD>
	</TR>
</TABLE>
