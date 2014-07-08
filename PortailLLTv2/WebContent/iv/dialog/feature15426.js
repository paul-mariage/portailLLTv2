actuate.util.Package.define("actuate.dialog.impl.helper.format");actuate.dialog.impl.helper.format.DateTimeFormattingDialog=actuate.Class.create();actuate.dialog.impl.helper.format.DateTimeFormattingDialog.superclass=actuate.dialog.impl.helper.AbstractIVDialog.prototype;actuate.dialog.impl.helper.format.DateTimeFormattingDialog.prototype=actuate.Class.extend(new actuate.dialog.impl.helper.AbstractIVDialog(),{_classname:"actuate.dialog.format.DateTimeFormattingDialog",_height:107,_width:410,_htmlElements:{"_category":null,"_locale":null,"_customeCode":null,"_customePattern":null,"_customPatternInput":null,"_localeDIV":null,"_helpFormat.dayDateYear":null,"_helpFormat.time":null,"_helpFormat.dateTimeTimeZone":null,"_helpFormat.timeWithText":null,"_helpCode.dayDateYear":null,"_helpCode.time":null,"_helpCode.dateTimeTimeZone":null,"_helpCode.timeWithText":null,"_helpResult.dayDateYear":null,"_helpResult.time":null,"_helpResult.dateTimeTimeZone":null,"_helpResult.timeWithText":null,"_customePatternHelp":null},__resultSetName:null,__formatPattern:"",__dataFormat:null,_showLocale:false,initialize:function(){var A=this._getId(this._classname);this._applyHtmlElementsNames(A);actuate.dialog.impl.helper.format.DateTimeFormattingDialog.superclass.initialize.call(this,A);this._initTemplates();this.categoryMenuDiv=document.getElementById(this._htmlElements["_category"]);this.localeMenuDiv=document.getElementById(this._htmlElements["_locale"]);this.locale=document.getElementById(this._htmlElements["_localeDIV"]);this.customCode=document.getElementById(this._htmlElements["_customeCode"]);this.customPattern=document.getElementById(this._htmlElements["_customePattern"]);this.customPatternInput=new actuate.uiadapter.TextField({cls:"valueTextBox "+actuate.dialog.impl.constant.CSS_INPUTBOX,name:"customPattern",width:200});this.customPatternInput.render(this._htmlElements["_customPatternInput"]);this.categoryMenu=new actuate.uiadapter.ComboBox({editable:false,width:200});this.categoryMenu.render(this.categoryMenuDiv);this.localeMenu=new actuate.uiadapter.ComboBox({editable:false,width:200,valueField:"value",displayField:"text"});this.localeMenu.render(this.localeMenuDiv);this.__local_installEventHandlers(A);},_initTemplates:function(){var E=document.createElement("div");var A=new actuate.uiadapter.Template('<TABLE style="margin-top:1ex;" WIDTH="100%">'+'	<TR CLASS="helpHeader"> '+"		<TD>{0}</TD>"+'		<td style="width:10px"/>'+"		<TD>{1}</TD>"+'		<td style="width:10px"/>'+"		<TD>{2}</TD>"+"	</TR>"+'	<TR style="height:3px;"></TR>'+"	<TR>"+'		<TD><DIV id="actuate_dialog_format_DateTimeFormattingDialog_helpFormat.dayDateYear"></TD>'+'		<td style="width:10px"/>'+'		<TD><DIV id="actuate_dialog_format_DateTimeFormattingDialog_helpCode.dayDateYear"></TD>'+'		<td style="width:10px"/>'+'		<TD><DIV id="actuate_dialog_format_DateTimeFormattingDialog_helpResult.dayDateYear"></DIV></TD>'+"	</TR>"+'	<TR style="height:3px;"></TR>'+"	<TR>"+'		<TD><DIV id="actuate_dialog_format_DateTimeFormattingDialog_helpFormat.time"></TD>'+'		<td style="width:10px"/>'+'		<TD><DIV id="actuate_dialog_format_DateTimeFormattingDialog_helpCode.time"></TD>'+'		<td style="width:10px"/>'+'		<TD><DIV id="actuate_dialog_format_DateTimeFormattingDialog_helpResult.time"></DIV></TD>'+"	</TR>"+'	<TR style="height:3px;"></TR>'+"	<TR>"+'		<TD><DIV id="actuate_dialog_format_DateTimeFormattingDialog_helpFormat.dateTimeTimeZone"></TD>'+'		<td style="width:10px"/>'+'		<TD><DIV id="actuate_dialog_format_DateTimeFormattingDialog_helpCode.dateTimeTimeZone"></TD>'+'		<td style="width:10px"/>'+'		<TD><DIV id="actuate_dialog_format_DateTimeFormattingDialog_helpResult.dateTimeTimeZone"></DIV></TD>'+"	</TR>"+'	<TR style="height:3px;"></TR>'+"	<TR>"+'		<TD><DIV id="actuate_dialog_format_DateTimeFormattingDialog_helpFormat.timeWithText"></TD>'+'		<td style="width:10px"/>'+'		<TD><DIV id="actuate_dialog_format_DateTimeFormattingDialog_helpCode.timeWithText"></TD>'+'		<td style="width:10px"/>'+'		<TD><DIV id="actuate_dialog_format_DateTimeFormattingDialog_helpResult.timeWithText"></DIV></TD>'+"	</TR>"+"</TABLE>");var D=[actuate.util.Utility.getLocalizedString("formattingDialog.helpHeader.format"),actuate.util.Utility.getLocalizedString("formattingDialog.helpHeader.code"),actuate.util.Utility.getLocalizedString("formattingDialog.helpHeader.result")];var C=A._append(E,D,true);var B=new actuate.uiadapter.FieldSet({checkboxToggle:false,title:actuate.util.Utility.getLocalizedString("formattingDialog.helpHeader.codeExamples"),autoHeight:true,defaultType:"textfield",bodyStyle:"padding:0px 0px 0",contentEl:E});B.render(this._htmlElements["_customePatternHelp"]);},__local_installEventHandlers:function(A){this.__neh_categoryMenuChange_c=actuate.Method.bindAsEventListener(this.__neh_categoryMenuChange,this);this.__neh_localeMenuChange_c=actuate.Method.bindAsEventListener(this.__neh_localeMenuChange,this);this.categoryMenu.registerEventHandler("select",this.__neh_categoryMenuChange_c);this.localeMenu.registerEventHandler("select",this.__neh_localeMenuChange_c);},__neh_categoryMenuChange:function(A){if(this.categoryMenu.getValue()==this.categoryMenu.getValueAt(this.categoryMenu.getLength()-1)){this.showCustom();}else{this.hideCustom();}},__neh_localeMenuChange:function(D){var A=actuate.dialog.locales[this.localeMenu.getValue()];var B=A.categorys;var C=A.helpValues;this.__dataFormat=null;if(!B||!C){this._requestDateTimeFormats(A.country,A.language);return ;}this._refreshCategorysAndHelpValues(B,C);this.adjustSize();},hideCustom:function(){this.customCode.style.display="none";this.customPattern.style.display="none";this.adjustSize();},showCustom:function(){this.customCode.style.display="block";this.customPattern.style.display="block";this.adjustSize();},_propagateCategory:function(C){if(!C){return ;}else{if(C.language==null){C.language="";}if(C.country==null){C.country="";}}var A=actuate.dialog.locales;if(A){for(var B in A){if(A[B].language==null){A[B].language="";}if(A[B].country==null){A[B].country="";}if(C.language==A[B].language&&C.country==A[B].country){A[B].categorys=C.categorys;A[B].helpValues=C.helpValues;break;}}}this._refreshCategorysAndHelpValues(C.categorys,C.helpValues);this.adjustSize();return ;},_localBind:function(D){if(!D){return true;}if(D.categorys){this._propagateCategory(D);return ;}this._showLocale=D.showLocale;if(this._showLocale){this.locale.style.display="block";}else{this.locale.style.display="none";}this.hideCustom();this.customPatternInput.setValue("");if(!D){return ;}var G;if(!D.targetMd){this.__resultSetName=D.selectedBinding?D.selectedBinding.name:null;this.__dataFormat=D.selectedElement?D.selectedElement.dataFormat:null;}else{this.__resultSetName=D.targetMd.binding.name;this.__dataFormat=D.targetMd.dataFormat;}if(D.total){this.total=D.total;this.targetMd=D.targetMd;}else{delete this.total;this.targetMd;}var C=actuate.dialog.locales;if(C&&this.localeMenu.getLength()<1){this.localeMenu.setStore(actuate.util.Utility.getLocaleStore());}var E=0;if(C&&this.__dataFormat&&this.__dataFormat.locale){var F=this.__dataFormat.locale;for(var I in C){if(C[I].country==F.country&&C[I].language==F.language){E=I;break;}}}this.localeMenu.setSelectedIndex(E);var B=actuate.dialog.locales[E];var H=B.helpValues;var A=B.categorys;if(!A||!H){this._requestDateTimeFormats(B.country,B.language);return ;}this._refreshCategorysAndHelpValues(A,H);},_okPress:function(){var A=this.customPatternInput.getValue();if(!A){A=this.__formatPattern;}if("Custom"==this.categoryMenu.getValue()&&!actuate.dialog.impl.Utility.validateCustomPatternInput(A,actuate.Constant.DataType.DATETIME)){actuate.dialog.impl.helper.format.DateTimeFormattingDialog.superclass.__showError.call(this,actuate.util.Utility.getLocalizedString("common.error.invalidCustomFormatPattern"));}else{actuate.dialog.impl.helper.format.DateTimeFormattingDialog.superclass._okPress.call(this);}},__getHelpTopic:function(){return"iv_datetime_formatting";},createJsonNode:function(){var B={};var E={};var A={};A.category=this.categoryMenu.getValue();var C=actuate.dialog.locales[this.localeMenu.getValue()];if(C&&C.country&&C.language){A.localeInfo=C;}var D=this.customPatternInput.getValue();if(!D){D=this.__formatPattern;}if("Custom"==this.categoryMenu.getValue()&&!actuate.dialog.impl.Utility.validateCustomPatternInput(D,actuate.Constant.DataType.DATETIME)){actuate.dialog.impl.helper.format.TimeFormattingDialog.superclass.__showError.call(this,actuate.util.Utility.getLocalizedString("common.error.invalidCustomFormatPattern"));return false;}if(D){A.pattern=D;}B.resultSetDataType="Datetime";if(this.__resultSetName||this.__resultSetName==""){B.resultSetName=this.__resultSetName;}E.categoryChoice=A;B[actuate.Constant.tag.DATETIMEFORMAT]=E;return{dataFormat:B};},createSoapNode:function(){var A=actuate.util.XmlDom.createXMLDom(actuate.util.Constants.soap.NAMESPACE_ACTUATE10,actuate.Constant.tag.ColumnDefFormat);var K=actuate.util.XmlDom.createElement(A,actuate.Constant.tag.DATETIMEFORMAT);A.documentElement.appendChild(K);var C=actuate.util.XmlDom.createElement(A,actuate.Constant.tag.CATEGORYCHOICE);K.appendChild(C);var I=actuate.util.XmlDom.createElement(A,actuate.Constant.tag.CATEGORY);C.appendChild(I);var F=A.createTextNode(this.categoryMenu.getValue());I.appendChild(F);var D=actuate.dialog.locales[this.localeMenu.getValue()];if(D&&D.country&&D.language){var E=actuate.util.XmlDom.createElement(A,actuate.Constant.tag.LOCALEINFO);var L=actuate.util.XmlDom.createElement(A,actuate.Constant.tag.COUNTRY);var B=actuate.util.XmlDom.createElement(A,actuate.Constant.tag.LANGUAGE);L.appendChild(A.createTextNode(D.country));B.appendChild(A.createTextNode(D.language));E.appendChild(L);E.appendChild(B);C.appendChild(E);}var M=this.customPatternInput.getValue();if(!M){M=this.__formatPattern;}if(M){var O=actuate.util.XmlDom.createElement(A,actuate.Constant.tag.PATTERN);C.appendChild(O);var F=A.createTextNode(M);O.appendChild(F);}var H=actuate.util.XmlDom.createElement(A,"ResultSetDataType");A.documentElement.appendChild(H);var N=A.createTextNode("Datetime");H.appendChild(N);if(this.__resultSetName||this.__resultSetName==""){var G=actuate.util.XmlDom.createElement(A,"ResultSetName");A.documentElement.appendChild(G);var J=A.createTextNode(this.__resultSetName);G.appendChild(J);}return A.documentElement;},_requestDateTimeFormats:function(D,F){var A={name:"country",value:D};var E={name:"language",value:F};var C={name:"target",value:this._classname};var B=[A,E,C];if(this._callbacks&&this._callbacks.changeLocaleCallback){this._callbacks.changeLocaleCallback(B);}else{if(this._helpee){this._helpee.fireEvent(actuate.dialog.EventConstants.ON_DIALOG_CHANGE_LOCALE,B);}}},_refreshCategorysAndHelpValues:function(C,F){var D=this.categoryMenu.getValue();if(this.__dataFormat){D=this.__dataFormat.category;}if(C){var E=[["Unformatted",C.unformatted],["General Date",C.generalDate],["Long Date",C.longDate],["Medium Date",C.mediumDate],["Short Date",C.shortDate],["Long Time",C.longTime],["Medium Time",C.mediumTime],["Short Time",C.shortTime],["Custom",C.custom]];this.categoryMenu.setStore(E);if(D&&this.categoryMenu.containsKey(D)){this.categoryMenu.setValue(D);if(D==this.categoryMenu.getValueAt(this.categoryMenu.getLength()-1)){this.showCustom();}}else{this.categoryMenu.setValue(this.categoryMenu.getValueAt(0));}}this._updateNode("helpFormat",F.helpFormat);this._updateNode("helpCode",F.helpCode);this._updateNode("helpResult",F.helpResult);if(this.__dataFormat){var B=this.__dataFormat.pattern;var A=this.__dataFormat.locale;var G=null;if(D==this.categoryMenu.getValueAt(this.categoryMenu.getLength()-1)){this.customPatternInput.setValue(B==null?"":B);}else{B="";}this.__formatPattern=B==null?"":B;}this.__neh_categoryMenuChange();},_updateNode:function(C,B){var A=document.getElementById(this._htmlElements["_"+C+".dayDateYear"]);var E=document.getElementById(this._htmlElements["_"+C+".time"]);var F=document.getElementById(this._htmlElements["_"+C+".dateTimeTimeZone"]);var D=document.getElementById(this._htmlElements["_"+C+".timeWithText"]);actuate.util.XmlDom.setTextContent(A,B.dayDateYear);actuate.util.XmlDom.setTextContent(E,B.time);actuate.util.XmlDom.setTextContent(F,B.dateTimeTimeZone);actuate.util.XmlDom.setTextContent(D,B.timeWithText);}});