<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean"%> 
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html"%> 

<html:submit property="save">
	<bean:message bundle="iportalResources" key="parameters.tables.button.ok"/>
</html:submit>
 &nbsp;
<html:button property="discard" onclick="javascript:cancel()">
	<bean:message bundle="iportalResources" key="parameters.tables.button.cancel"/>
</html:button>
