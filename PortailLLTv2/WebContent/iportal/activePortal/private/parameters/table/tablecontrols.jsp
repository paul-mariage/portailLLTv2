<%-- Custom controls --%>
	<logic:present name="definition" property="fieldControlType">
<%-- ControlListAllowNew (Combo Box)  ------------------------------------------------- --%>
	
		<logic:equal name="definition" property="fieldControlType"
			value="ControlListAllowNew">
		
			<%
				int browserType = 1;		// 1 is NS4.7
				if (userinfobean.getUserAgent().isIE())
					browserType = 2;
				else if (userinfobean.getUserAgent().isNS6())
					browserType = 3;
					
				String controlIdInput = controlId;
				String controlIdDropdown = controlId + "_Dropdown";
				String javaScriptDropdown = "javascript:updateInput(\'" + controlIdInput + "\', this)";
				String javaScriptInput = "javascript:updateDropdown(\'" + controlIdDropdown + "\', this)";
				String javaScriptDropdownUpdate = "javascript:updateDropdownBySelf(\'" + controlIdInput + "\', this)";

				String javaScriptDropdownNS4 = "javascript:updateInputNS4(this.form, \'" + controlValue + "\', this)";
				String javaScriptDropdownUpdateNS4 = "javascript:updateDropdownBySelfNS4(this.form, \'" + controlValue + "\', this)";
				String javaScriptInputNS4 = "javascript:updateDropdownNS4(this.form, \'" + controlIdDropdown + "\', this)";
				String styleInputBox = "parameterInputBox";
				String styleDropdown = "parameterDropdown";
				String inputBoxValue = actualControlValue;
				
				if (browserType == 3)
				{
					styleInputBox = "parameterInputBoxNS6";
					styleDropdown = "parameterDropdownNS6";
				}							
			%>
								
			<logic:equal name="userinfobean" property="userAgent.NS4" value="false">
				<%-- NON NS4 --%>
					<SELECT size="1" class="<%= styleDropdown %>" id="<%= controlIdDropdown %>" 
						onchange="<%= javaScriptDropdown %>" onfocus="<%= javaScriptDropdownUpdate %>">
						<logic:present name="definition" property="selectValueList">
							<logic:iterate indexId="valueIndex"
								id="selectValue" name="definition"
								property="selectValueList.string"
								type="java.lang.String">
								<% if (selectValue.indexOf(inputBoxValue) != -1) {%>
									<OPTION value="<%= selectValue %>" selected="selected"><%= selectValue %></OPTION>
								<% }else{ %>
									<OPTION value="<%= selectValue %>"><%= selectValue %></OPTION>
								<% } %>
							</logic:iterate>
						</logic:present>
					</SELECT>
					<INPUT type="text" name="<%= controlValue %>" value="<%= inputBoxValue %>"
						class="<%= styleInputBox %>" id="<%= controlIdInput %>"
							onblur="<%= javaScriptInput %>">
			</logic:equal>
			<logic:equal name="userinfobean" property="userAgent.NS4" value="true">
				<%-- NS4 --%>
					<table>	
					<tr>
						<td width="25%">
							<INPUT type="text" size=10 value="<%= inputBoxValue %>" name="<%= controlValue %>" onblur="<%= javaScriptInputNS4 %>">
						</td>
						<td width="40%">or select from list:</td>
						<td width="35%" align="right">
							<select name="<%= controlIdDropdown %>" size="1" onchange="<%= javaScriptDropdownNS4 %>" 
									onfocus="<%= javaScriptDropdownUpdateNS4 %>">
								<logic:present name="definition" property="selectValueList">
									<logic:iterate indexId="valueIndex"
										id="selectValue" name="definition"
										property="selectValueList.string"
										type="java.lang.String">
										<% if (selectValue.indexOf(inputBoxValue) != -1) {%>
											<OPTION value="<%= selectValue %>" selected="selected"><%= selectValue %></OPTION>
										<% }else{ %>
											<OPTION value="<%= selectValue %>"><%= selectValue %></OPTION>
										<% } %>
									</logic:iterate>
								</logic:present>
							</select>
						</td>
					</tr>
				</table>
			</logic:equal>
		</logic:equal>

<%-- Control List --%>
		<logic:equal name="definition" property="fieldControlType"
			value="ControlList">

			<html:select property="<%= controlValue %>" size="1"
				styleClass="parameterInput" styleId="<%= controlId %>">
				<logic:equal name="definition" property="defaultValue" value="">
					<html:option value=""/>
				</logic:equal>
				<logic:present name="definition" property="selectValueList">
					<html:options name="definition" property="selectValueList.string"/>
				</logic:present>
			</html:select>
		</logic:equal>
	</logic:present>
	<logic:notPresent name="definition" property="fieldControlType">

<%-- Date Time / Normal Input Text Box ----------------------------------- --%>
	
		<logic:equal name="definition" property="dataType"
			value="<%= com.actuate.schemas.ScalarDataType.Date.toString() %>">
			<%
				String dateValue = "";
				String timeValue = "";
				String dateTimeValue = "";
				Calendar calendar = new GregorianCalendar();
				if(actualControlValue != null && actualControlValue.equalsIgnoreCase("null"))
				{
					dateValue = actualControlValue;
					dateTimeValue = actualControlValue;
				}
				else
				{
					int timeStyle = Parameter.parseDate(actualControlValue,calendar,acLocale);
					boolean isDateSet = calendar.isSet(Calendar.DATE);
					boolean isTimeSet = calendar.isSet(Calendar.HOUR);
					if (isDateSet)
						dateValue = acLocale.getDateInstance(AcLocale.SHORT).format(calendar.getTime());
					dateTimeValue = dateValue;
					if (isTimeSet)	{
						SimpleDateFormat simpleDateFormat =
							(SimpleDateFormat) acLocale.getTimeInstance(AcLocale.LONG);
						simpleDateFormat.setDateFormatSymbols(acLocale.getDateFormatSymbols());
							timeValue = simpleDateFormat .format(calendar.getTime());
						dateTimeValue += " " + timeValue;
					}
				}
			%>
				
			<input type="text" maxlength="12" 
				size="13"
				style="width: 100pt;"
				name="<%= controlId %>.date"
				value="<%= dateValue %>"
				id="<%= controlId %>.date"
				onFocus="updateDateTime(this.form.elements['<%= controlId %>.date'],
						this.form.elements['<%= controlId %>.time'],
						this.form.elements['<%= controlValue %>']);"
				onChange="updateDateTime(this.form.elements['<%= controlId %>.date'],
						this.form.elements['<%= controlId %>.time'],
						this.form.elements['<%= controlValue %>']);">

			<A	href="javascript:myvoid();" name="calOnceDate" style="text-decoration: none"
				onclick="javascript:
					clickLocalizedCalendar(event, document.forms[0].elements['<%= controlId %>.date']);">
				<IMG src="<html:rewrite page="/iportal/activePortal/images/calendar.png"/>" border="0">
			</A>
			<logic:equal name="userinfobean" property="userAgent.NS4" value="true">
			&nbsp;
			</logic:equal>

			<input type="text" maxlength="12"
				style="width: 99pt;"
				name="<%= controlId %>.time"
				value="<%= timeValue %>"
				id="<%= controlId %>.time"
				onchange="updateDateTime(this.form.elements['<%= controlId %>.date'],
						this.form.elements['<%= controlId %>.time'],
						this.form.elements['<%= controlValue %>']);">
					
			<input type="hidden"
				name="<%= controlValue %>"
				id="<%= controlId %>"
				value="<%= dateTimeValue %>" />
		</logic:equal>

<%-- Non  Date = Normal Input Text Box ----------------------------------- --%>

		<logic:notEqual name="definition" property="dataType"
			value="<%= DataType.Date.toString() %>">

<%-- Regular  Text Box --------------------------------------------------- --%>
				<html:text property="<%= controlValue %>" size="40"
					styleClass="parameterInput" styleId="<%= controlId %>"/>

		</logic:notEqual>
	</logic:notPresent>
