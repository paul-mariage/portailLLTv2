<!--  Copyright 1994-2005, Actuate Software Corp., All rights reserved.--> 

<%@ page contentType="text/html; charset=utf-8" %>
<%@ page session="false" buffer="none" %>
<%@ page import="com.actuate.iv.presentation.aggregation.IFragment,
				org.eclipse.birt.report.model.api.elements.DesignChoiceConstants,
				com.actuate.iv.context.bean.IVPresentationBean,
				com.actuate.iv.utility.IVParameterAccessor,
				com.actuate.iv.IIVConstants" %>
<%-----------------------------------------------------------------------------
	Taglib
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<jsp:useBean id="fragment" type="com.actuate.iv.presentation.aggregation.IFragment" scope="request" />
<jsp:useBean id="presentationBean" type="com.actuate.iv.context.bean.IVPresentationBean" scope="request" />

<%-----------------------------------------------------------------------------
	AvailableDataItemDialogFragment
--%>

		<TABLE CELLPADDING='0px' CELLSPACING='0px'  CLASS="dialog_content_table" STYLE="width: 100%;">
			<tr>
				<td colspan="2" style="height:5px;width=300px" NOWRAP>
					<fmt:message key="columnDataTypeDialog.label" bundle="${dialogBundle}"/>
				</td>
			</tr>
			<tr>
				<td colspan="2" style="height:7px;width=300px">
				</td>
			</tr>
			<tr>
				<td  NOWRAP>
					<fmt:message key="columnDataTypeDialog.datatype" bundle="${dialogBundle}"/>
				</td>
				<td style="align:left;">
					<DIV style="width:120px" id='<%=IVParameterAccessor.getHtmlId(IIVConstants.IV_COLUMNDATATYPE_DIALOG_JS)%>_dataTypes' CLASS="select">
					</DIV>
				</td>
			</tr>
		</table>
