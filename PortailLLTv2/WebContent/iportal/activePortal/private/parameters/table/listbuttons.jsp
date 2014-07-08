<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean"%> 
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html"%> 

<html:button property="insert" onclick="javascript:insertRow()">
	<bean:message bundle="iportalResources" key="parameters.tables.button.insert"/>
</html:button>&nbsp;
<html:submit property="save">
	<bean:message bundle="iportalResources" key="parameters.tables.button.ok"/>
</html:submit>
<html:button property="discard" onclick="javascript:discardChanges();">
	<bean:message bundle="iportalResources" key="parameters.tables.button.cancel"/>
</html:button>
&nbsp;
