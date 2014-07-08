actuate.util.Package.define("actuate.iv.ui.dialog.style");actuate.iv.ui.dialog.style.IVValueDialog=actuate.Class.create();actuate.iv.ui.dialog.style.IVValueDialog.superclass=actuate.iv.ui.dialog.AbstractIVDialog.prototype;actuate.iv.ui.dialog.style.IVValueDialog.prototype=actuate.Class.extend(new actuate.iv.ui.dialog.AbstractIVDialog(),{_classname:"actuate.iv.ui.dialog.style.IVValueDialog",_width:400,_htmlElements:{"_radioByValue":null,"_radioByColumn":null,"_value1":null,"_value1InputDiv":null,"_value1Text":null,"_DateImg1":null,"_SelectValuesLink1":null,"_SelectValuesDiv":null,"_FilterText":null,"_FindButton":null,"_ValuesList":null,"_Calendar":null,"_FormatHintMessage":null,"_bindingsContainer":null,"_bindingsDropdown":null,"_FindRow":null,"_previous":null,"_next":null},initialize:function(){var B=this._getId(this._classname);this._applyHtmlElementsNames(B);actuate.iv.ui.dialog.AbstractIVDialog.prototype.initialize.call(this,B);this.bindingName=null;this.columnDataTypeCode=null;this.valuesLoadedFlag="false";this.idRadioColumn=new actuate.uiadapter.Radio({cls:actuate.iv.constant.CSS_INPUTBOX,name:"valueValuePickerGroup1",labelWidth:190,valueText:"By Column",boxLabel:actuate.util.Utility.getLocalizedString("valueDialog.text.radioByColumn")});this.idRadioValue=new actuate.uiadapter.Radio({cls:actuate.iv.constant.CSS_INPUTBOX,name:"valueValuePickerGroup1",labelWidth:160,valueText:"By Value",boxLabel:actuate.util.Utility.getLocalizedString("valueDialog.text.radioByValue"),checked:true});this.idRadioColumn.render(this._htmlElements["_radioByColumn"]);this.idRadioColumnContainer=document.getElementById(this._htmlElements["_radioByColumn"]);this.idRadioValue.render(this._htmlElements["_radioByValue"]);this.clearFilterFlag="false";this.idRadioColumn.registerEventHandler("check",actuate.Method.bind(this.__neh_filterValuePickerGroupClick,this));this.idRadioValue.registerEventHandler("check",actuate.Method.bind(this.__neh_filterValuePickerGroupClick,this));this.idValuesContainer=document.getElementById(this._htmlElements["_value1"]);this.idBindingsContainer=document.getElementById(this._htmlElements["_bindingsContainer"]);this._bindings=new actuate.uiadapter.ComboBox({editable:false,width:250,forceSelection:true});var A=actuate.Class.extendClass(actuate.uiadapter.TextField,{getValue:function(){if(!this._isMobile){if(actuate.util.Utility.isArray(this.textfield.value)){return this.textfield.value;}}return this.textfield.getValue();}});this.idValueInput=new A({cls:"inputText "+actuate.iv.constant.CSS_INPUTBOX,name:"filterValue",renderTo:this._htmlElements["_value1InputDiv"]});this.idMoreValueEnableLink=document.getElementById(this._htmlElements["_SelectValuesLink1"]);actuate.util.Event.observe(document.getElementById(this._htmlElements["_SelectValuesLink1"]),"click",actuate.Method.bind(this._neh_SelectValuesLink1,this),false);this.idFormatHintMessage=document.getElementById(this._htmlElements["_FormatHintMessage"]);this.idCalendar=document.getElementById(this._htmlElements["_Calendar"]);this.cal=document.getElementById("outerCalendarDiv");this.idDateImg=[];this.idDateImg.push(this._htmlElements["_DateImg1"]);this.idDateImg.push("valueDialog_idDateImg2");this.__neh_CalendarClick1_c=actuate.Method.bind(this.__neh_CalendarClick1,this);actuate.util.Event.observe(document.getElementById(this.idDateImg[0]),"click",this.__neh_CalendarClick1_c,false);this.resultSetNameLabel=document.getElementById("idfilterBy");this.idSelectValuesDiv=document.getElementById(this._htmlElements["_SelectValuesDiv"]);this.idFindRow=document.getElementById(this._htmlElements["_FindRow"]);this.idFilterText=new actuate.uiadapter.TextField({cls:"findValueInputText "+actuate.iv.constant.CSS_INPUTBOX,name:"filterText"});this.idFindButton=new actuate.uiadapter.Button({text:actuate.util.Utility.getLocalizedString("valueDialog.text.find")});this.idFilterText.render(this._htmlElements["_FilterText"]);this.idFindButton.render(this._htmlElements["_FindButton"]);this.idValuesList=document.getElementById(this._htmlElements["_ValuesList"]);this.__neh_ListClick_c=actuate.Method.bind(this.__neh_ListClick,this);this.__neh_ValuesListKeyPress_c=actuate.Method.bind(this.__neh_ValuesListKeyPress,this);this._idValuesList=new actuate.uiadapter.ListBox({cls:"valueListWidth",width:250,height:100,renderTo:this.idValuesList});this._idValuesList.registerEventHandler("select",this.__neh_ListClick_c);this.__neh_FindClick_c=actuate.Method.bind(this.__neh_FindClick,this);this.idFindButton.registerEventHandler("click",this.__neh_FindClick_c,false);this.__neh_FilterTextChange_c=actuate.Method.bind(this.__neh_FilterTextChange,this);this.idFilterText.registerEventHandler("keypress",this.__neh_FilterTextChange_c,false);this.idSelectValuesDiv.style.display="none";this.idPrevious=document.getElementById(this._htmlElements["_previous"]);this.idNext=document.getElementById(this._htmlElements["_next"]);this._previousClick_c=actuate.Method.bind(this._previousClick,this);actuate.util.Event.observe(this.idPrevious,"click",this._previousClick_c,false);this._nextClick_c=actuate.Method.bind(this._nextClick,this);actuate.util.Event.observe(this.idNext,"click",this._nextClick_c,false);this._rowCount=0;this._prevCursor=-1;this._currCursor=-1;this._endOfResultset=false;},_bind:function(A){this.showData(A);},_localBind:function(E){var A=E.operationData;var F=E[actuate.model.Constant.MetadataType.ELEMENT];this.bindingName=A.bindingName;this.columnDataTypeCode=A.dataType;this.ivBoundDataColumnList=F.getBindingsArray();var D=A.inputLiteral;var B=A.isPotentialBinding;var I=A.bindingLiteral;this.idValueInput.setValue(D?D:"");this.prepareColumnSelectionList();var C="";if(this.columnDataTypeCode==actuate.Constant.DataType.DATE){document.getElementById(this.idDateImg[0]).style.display="";C=actuate.util.Utility.getLocalizedString("valueDialog.text.dateFormatMsg")+" "+actuate.util.Utility.toDate(new Date());}else{if(this.columnDataTypeCode==actuate.Constant.DataType.DATETIME){document.getElementById(this.idDateImg[0]).style.display="";C=actuate.util.Utility.getLocalizedString("valueDialog.text.dateTimeFormatMsg")+" "+actuate.util.Utility.toDateTime(new Date());}else{if(this.columnDataTypeCode==actuate.Constant.DataType.TIME){document.getElementById(this.idDateImg[0]).style.display="none";C=actuate.util.Utility.getLocalizedString("valueDialog.text.timeFormatMsg")+" "+actuate.util.Utility.toTime(new Date());}else{document.getElementById(this.idDateImg[0]).style.display="none";}}}this.idFormatHintMessage.innerHTML=C;if(B){var G=I.match(/(?!^\[).+(?=\]$)/)[0];if(this._bindings.containsKey(G)){this.idRadioColumn.setValue(true);this.idBindingsContainer.style.display="block";this.idValuesContainer.style.display="none";this._bindings.setValue(G);this.idValueInput.setValue("");}else{this.idValueInput.setValue(I);}}var H=A.conditionOperator;if(H==actuate.Constant.DesignChoice.FILTER_OPERATOR_TOP_N||H==actuate.Constant.DesignChoice.FILTER_OPERATOR_BOTTOM_N||H==actuate.Constant.DesignChoice.FILTER_OPERATOR_TOP_PERCENT||H==actuate.Constant.DesignChoice.FILTER_OPERATOR_BOTTOM_PERCENT){this.idRadioColumnContainer.style.display="none";}else{this.idRadioColumnContainer.style.display="inline-block";}this._show();},_showHideFindRow:function(){if(this.columnDataTypeCode!=actuate.Constant.DataType.STRING){this.idFindRow.style.display="none";}else{if(actuate.util.browser.isIE()){this.idFindRow.style.display="";}else{this.idFindRow.style.display="table-row";}}},prepareColumnSelectionList:function(){this._bindings.clear();var A=[];for(var B=0;B<this.ivBoundDataColumnList.length;B++){var C=this.ivBoundDataColumnList[B];if(this.matchDataType(C.dataType,this.columnDataTypeCode)){A.push([C.name,C.displayName]);}}this._bindings.setStore(A);},matchDataType:function(B,A){if(A==actuate.Constant.DataType.DATETIME||A==actuate.Constant.DataType.DATE||A==actuate.Constant.DataType.TIME||A==actuate.Constant.DataType.STRING){return B==A;}else{return B==actuate.Constant.DataType.INTEGER||B==actuate.Constant.DataType.FLOAT||B==actuate.Constant.DataType.DECIMAL||B==actuate.Constant.DataType.BOOLEAN;}},_okPress:function(){var A=[];if(this.idValuesContainer.style.display!="none"){A[0]=this.idValueInput.getValue();}else{var B=this._bindings.getValue();A[0]=null;A[1]=B;}actuate.iv.core.ClassLoader.getInstance().forName("actuate.iv.ui.dialog.style.IVConditionalFormattingDialog").applyValueDialogChanges(A);this._hide();},__getHelpTopic:function(){return"iv_value";},_preHide:function(){this._idValuesList.clear();this.idFilterText.getValue("");this.valuesLoadedFlag="false";this.clearFilterFlag="false";this.idFormatHintMessage.innerHTML="";this.idSelectValuesDiv.style.display="block";this.enableSelectValuesButton(true);this.idRadioValue.setValue(true);this.idBindingsContainer.style.display="none";this.idValuesContainer.style.display="block";this.idSelectValuesDiv.style.display="none";},__neh_filterValuePickerGroupClick:function(){if(this.idRadioValue.getValue()){this.idBindingsContainer.style.display="none";this.idValuesContainer.style.display="block";}else{this.idBindingsContainer.style.display="block";if(!this._bindings.rendered){this._bindings.render(this._htmlElements["_bindingsDropdown"]);}if(this._bindings.getValue()==""){this._bindings.setSelectedIndex(0);}this.idValuesContainer.style.display="none";this.hideSelectValues();}this._handleDialogResize();},_neh_SelectValuesLink1:function(A){this._handleClickSelectValueLink();},hideSelectValues:function(){this.idSelectValuesDiv.style.display="none";this.enableSelectValuesButton(true);},_handleClickSelectValueLink:function(){if(this.idMoreValueEnableLink.className=="iv_dialog_link_enabled"){this.enableSelectValuesButton(false);this.idSelectValuesDiv.style.display="block";if(this.valuesLoadedFlag=="false"){var A=new Object();A.name="FilterText";A.value="";var D=new Object();D.name="target";D.value=this._classname;var E=new Object();E.mane="currCursor";E.value=-1;var B=this.createGetMoreValuesSoapNode(this.bindingName);var C=[this.htmlId,A,B,D,E];this._viewer.eventDispatcher.fireEvent(actuate.iv.core.iVEvent.__E_CF_MOREVALUES_FILTER,C);this.valuesLoadedFlag="true";}this._idValuesList.focus();this._showHideFindRow();this._handleDialogResize();}},_handleDialogResize:function(){this.adjustSize();},__neh_CalendarClick1:function(A){this._handleClickCalendar(A,0);},_handleClickCalendar:function(B){var A={};if(this.columnDataTypeCode==actuate.Constant.DataType.DATE){A.isDateTime=false;}else{A.isDateTime=true;}A.target=this.idValueInput;var C={};C.cache=A;this._viewer.eventDispatcher.fireEvent(actuate.iv.core.iVEvent.__E_CALENDAR,C);this.idSelectValuesDiv.style.display="none";this.enableSelectValuesButton(true);this._handleDialogResize();},enableSelectValuesButton:function(A){if(A){this.idMoreValueEnableLink.className="iv_dialog_link_enabled";}else{this.idMoreValueEnableLink.className="iv_dialog_link_disabled";}},createShowDialogRequest:function(D){var E=actuate.util.XmlDom.createXMLDom(actuate.util.Constants.soap.NAMESPACE_ACTUATE10,actuate.Constant.tag.Data);var A=actuate.util.XmlDom.createElement(E,actuate.Constant.tag.COLUMNDEFS);E.documentElement.appendChild(A);var C;var B,F;C=actuate.util.XmlDom.createElement(E,actuate.Constant.tag.ColumnDef);B=actuate.util.XmlDom.createElement(E,actuate.Constant.tag.Iid);F=E.createTextNode(D);B.appendChild(F);C.appendChild(B);A.appendChild(C);return E;},createGetMoreValuesSoapNode:function(F){var D=actuate.util.XmlDom.createXMLDom(actuate.util.Constants.soap.NAMESPACE_ACTUATE10,actuate.Constant.tag.Data);var A=actuate.util.XmlDom.createElement(D,actuate.Constant.tag.COLUMNDEFS);D.documentElement.appendChild(A);var C;var B,E;C=actuate.util.XmlDom.createElement(D,actuate.Constant.tag.ColumnDef);B=actuate.util.XmlDom.createElement(D,actuate.Constant.tag.BOUNDDATACOLUMN);nameNode=actuate.util.XmlDom.createElement(D,actuate.Constant.tag.NAME);E=D.createTextNode(F);nameNode.appendChild(E);B.appendChild(nameNode);C.appendChild(B);A.appendChild(C);return D;},showData:function(F){var B=[];if(F["resultSetData"]){this._prevCursor=F["prevCursor"];this._currCursor=F["currCursor"];var D=new actuate.iv.data.IVResultSetData(F["resultSetData"]);var E=D.getRows();this._rowCount=parseInt(D.getRowCount());this._endOfResultset=D.getEndOfResultSet();this._enableLink(this.idNext,false);this._enableLink(this.idPrevious,false);if(!this._endOfResultset){this._enableLink(this.idNext,true);}if(this._prevCursor>0){this._enableLink(this.idPrevious,true);}if(E.length>0){for(var A=0;A<E.length;A++){if(E[A]!=null){var H=0;var G=0;if(E[A].length>1){G=1;}var C=E[A][G];if(C==null){C="";}if(C!='""'&&!actuate.util.Utility.isArray(C)){C=C.replace(/\\"/g,"");}B.push([E[A][H],C]);}}this._idValuesList.focus();}}this._idValuesList.setStore(B);},__neh_ListClick:function(A){this.fillTextBox(true);},__neh_FindClick:function(C){actuate.util.Event.stop(C);this._idValuesList.clear();var A=new Object();A.name="FilterText";A.value=this.idFilterText.getValue();if(A.value==""&&C.target&&C.target.value!=""){A.value=C.target.value;}var E=new Object();E.name="target";E.value=this._classname;var F=new Object();F.mane="currCursor";F.value=-1;var B=this.createGetMoreValuesSoapNode(this.bindingName);var D=[this.htmlId,A,B,E,F];this._viewer.eventDispatcher.fireEvent(actuate.iv.core.iVEvent.__E_CF_MOREVALUES_FILTER,D);},__neh_FilterTextChange:function(A){if(A.keyCode==13){this.__neh_FindClick(A);}},_enter_key:function(A,B){if(!this.__preventEnterKey){var C=B==null?null:B.getTarget();if(C&&C.name&&C.name.toLowerCase()=="filtertext"){this.__neh_FilterTextChange(B);}else{actuate.iv.ui.dialog.style.IVValueDialog.superclass._enter_key.apply(this,arguments);}}},fillTextBox:function(B){var A="";if(this._idValuesList.getSelectedIndex()!=null&&this._idValuesList.getLength()>0){A=this._idValuesList.getSelectedValue();}if(B){this.idValueInput.setValue(A);}},__neh_ValuesListKeyPress:function(A){if(A.keyCode==38||A.keyCode==40){this.fillTextBox(false);}},_cancelPress:function(){actuate.iv.core.ClassLoader.getInstance().forName("actuate.iv.ui.dialog.style.IVConditionalFormattingDialog").cancelValueDialog();},_previousClick:function(){if(this.idPrevious.className=="link_disabled"){return ;}if(this._prevCursor>0){if(this._filterText!=undefined&&this.idFilterText.getValue()!=this._filterText){this.__neh_FindClick(null);return ;}var A={name:"FilterText",value:this.idFilterText.getValue()};var D={name:"target",value:this._classname};var E={name:"prevCursor",value:this._prevCursor};var B=this.createGetMoreValuesSoapNode(this.bindingName);var C=[this.htmlId,A,B,D,E];this._showHideFindRow();this._consumer._eventDispatcher.fireEvent(actuate.iv.core.iVEvent.__E_CF_MOREVALUES_FILTER,C);}},_nextClick:function(){if(this.idNext.className=="link_disabled"){return ;}if(this._filterText!=undefined&&this.idFilterText.getValue()!=this._filterText){this.__neh_FindClick(null);return ;}var A={name:"FilterText",value:this.idFilterText.getValue()};var D={name:"target",value:this._classname};var E={name:"currCursor",value:this._currCursor};var B=this.createGetMoreValuesSoapNode(this.bindingName);var C=[this.htmlId,A,B,D,E];this._showHideFindRow();this._consumer._eventDispatcher.fireEvent(actuate.iv.core.iVEvent.__E_CF_MOREVALUES_FILTER,C);},_enableLink:function(B,A){if(A){B.className="iv_dialog_link_enabled";}else{B.className="iv_dialog_link_disabled";}}});