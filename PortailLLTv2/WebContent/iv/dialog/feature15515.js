actuate.util.Package.define("actuate.dialog.impl.helper.selectorbuilder");actuate.dialog.impl.helper.selectorbuilder.MultiSelectorFormatTab=actuate.Class.extendClass(actuate.dialog.impl.helper.selectorbuilder.SelectorFormatTab,{_classname:"actuate.dialog.MultiSelectorFormatTab",ORIENTATIONS:["horizontal","vertical"],_orientation:null,_dataFormat:null,_initPanel:function(){var E=this;var F=[];var B={xtype:"fieldset",collapsible:true,autoHeight:true,title:actuate.util.Utility.getLocalizedString("selectorBuilder.formatTab.orientation"),checkboxToggle:false,defaults:{border:false,header:false,layout:"column",bodyStyle:"padding:2px 4px 2px 4px"},listeners:{collapse:function(){if(E._parentDialog&&E._parentDialog.adjustSize){E._parentDialog.adjustSize();}},expand:function(){if(E._parentDialog&&E._parentDialog.adjustSize){E._parentDialog.adjustSize();}}},items:[{items:[{width:232,id:"actuate_dialog_multiselectorFormatTab_Orientation_"+this.ORIENTATIONS[0],xtype:"radio",name:"orientationRadio",boxLabel:actuate.util.Utility.getLocalizedString("selectorBuilder.formatTab.orientationHorizontal"),valueText:"Horizontal"},{width:232,id:"actuate_dialog_multiselectorFormatTab_Orientation_"+this.ORIENTATIONS[1],xtype:"radio",name:"orientationRadio",boxLabel:actuate.util.Utility.getLocalizedString("selectorBuilder.formatTab.orientationVertical"),valueText:"Vertical"}]}]};F.push(B);var A={xtype:"fieldset",collapsible:true,autoHeight:true,title:actuate.util.Utility.getLocalizedString("selectorBuilder.formatTab.values"),checkboxToggle:false,defaults:{border:false,header:false,layout:"column",bodyStyle:"padding:2px 4px 2px 4px"},listeners:{collapse:function(){if(E._parentDialog&&E._parentDialog.adjustSize){E._parentDialog.adjustSize();}},expand:function(){if(E._parentDialog&&E._parentDialog.adjustSize){E._parentDialog.adjustSize();}}},items:[{layout:"form",items:[{id:"actuate_dialog_MultiSelectorFormatTab_values_allowMulti",xtype:"checkbox",hideLabel:true,boxLabel:actuate.util.Utility.getLocalizedString("selectorBuilder.formatTab.allowMultiSel"),checked:true},{id:"actuate_dialog_MultiSelectorFormatTab_values_enable",xtype:"checkbox",hideLabel:true,boxLabel:actuate.util.Utility.getLocalizedString("selectorBuilder.formatTab.enableSearch")}]},{items:[{id:"actuate_dialog_MultiSelectorFormatTab_values_limit_label",width:100,xtype:"label",text:actuate.util.Utility.getLocalizedString("selectorBuilder.formatTab.limit")},{id:"actuate_dialog_MultiSelectorFormatTab_values_limit",width:249,xtype:"textfield",value:"1000"},{id:"actuate_dialog_MultiSelectorFormatTab_values_label",width:100,xtype:"label",text:actuate.util.Utility.getLocalizedString("selectorBuilder.formatTab.values"),style:{padding:"2px 2px 0px 2px"}}]},{layout:"form",id:"multiselector_format_table",items:[{layout:"column",border:false,items:[{width:205,xtype:"label",style:"text-color:black;font-weight:bold;border:1px solid #CCCCCC;text-align:left;line-height: 20px;background:none repeat scroll 0 0 #EFF1F2;padding-left:5px;height:23px;",text:actuate.util.Utility.getLocalizedString("selectorBuilder.multidataTab.displayField")},{width:150,style:"border:1px solid #CCCCCC;border-left:none;text-align:left;background:none repeat scroll 0 0 #EFF1F2;padding-left:5px;height:23px;",xtype:"label"}]}]}]};F.push(A);this._panel=new actuate.widget.panel.Panel({header:false,plain:true,border:false,title:actuate.util.Utility.getLocalizedString("selectorBuilder.formatTab.format"),autoHeight:true,items:F});this._txtValueLimit=actuate.widget.ComponentMgr.get("actuate_dialog_MultiSelectorFormatTab_values_limit");this._chkAllowMulti=actuate.widget.ComponentMgr.get("actuate_dialog_MultiSelectorFormatTab_values_allowMulti");this._chkEnable=actuate.widget.ComponentMgr.get("actuate_dialog_MultiSelectorFormatTab_values_enable");this._formatChanged_c=actuate.Method.bind(this._formatChanged,this);this._chkAllowMulti.on("check",this._formatChanged_c);this._radios=[];for(var D=0;D<this.ORIENTATIONS.length;D++){var C=actuate.widget.ComponentMgr.get("actuate_dialog_multiselectorFormatTab_Orientation_"+this.ORIENTATIONS[D]);this._radios.push(C);C.registerEventHandler("check",actuate.Method.bind(this._radioSelected,this),false);}this._radios[0].setValue(true,true);this._orientation=this.ORIENTATIONS[0];},_initializeControlStatus:function(){this._validateControlArray=[];this._validateControlArray.push(this._txtValueLimit);},__diableItemsForVersion:function(){actuate.dialog.impl.helper.selectorbuilder.MultiSelectorFormatTab.superclass.__diableItemsForVersion.apply(this,arguments);var C=actuate.widget.ComponentMgr.get("actuate_dialog_MultiSelectorFormatTab_values_defaultValue_label");var A=actuate.widget.ComponentMgr.get("actuate_dialog_MultiSelectorFormatTab_values_limit_label");var B=actuate.widget.ComponentMgr.get("actuate_dialog_MultiSelectorFormatTab_values_label");if(C){C.disable();}if(A){A.disable();}if(B){B.disable();}if(this._txtValueLimit){this._txtValueLimit.disable();}if(this._chkAllowMulti){this._chkAllowMulti.setValue(false,true);this._chkAllowMulti.disable();}if(this._chkEnable){this._chkEnable.setValue(false,true);this._chkEnable.disable();}if(this._panel){this._panel.disable();}},_radioSelected:function(B){var A=B;this._orientation=A.getGroupValue();},__resetStatus:function(){var E=actuate.widget.ComponentMgr.get("actuate_dialog_MultiSelectorFormatTab_values_defaultValue_label");var B=actuate.widget.ComponentMgr.get("actuate_dialog_MultiSelectorFormatTab_values_limit_label");var D=actuate.widget.ComponentMgr.get("actuate_dialog_MultiSelectorFormatTab_values_label");if(E){E.enable();}if(B){B.enable();}if(D){D.enable();}if(this._txtValueLimit){this._txtValueLimit.enable();}if(this._chkAllowMulti){this._chkAllowMulti.setValue(true,true);this._chkAllowMulti.enable();}if(this._chkEnable){this._chkEnable.setValue(false,true);this._chkEnable.enable();}if(this._panel){this._panel.enable();}var C=actuate.widget.ComponentMgr.get("multiselector_format_table");for(var A=0;A<C.items.items.length;A++){C.remove(C.items.items[A+1],true);}},_formatChanged:function(){this.fireEvent("change",this);},validate:function(){var B=null;var A=actuate.util.String.trim(this._txtValueLimit.getValue());if(!A){B=actuate.util.Utility.getLocalizedString("selectorBuilder.formatTab.limit.errorMessage1");}else{if((!actuate.util.Utility.isNumeric(A))||parseInt(A)<=0){B=actuate.util.Utility.getLocalizedString("selectorBuilder.formatTab.limit.errorMessage2");}}if(B!=null){actuate.widget.MessageBox.alert(actuate.util.Utility.getLocalizedString("selectorDialog.alertTitle"),B);return false;}return true;},loadData:function(C){actuate.dialog.impl.helper.selectorbuilder.MultiSelectorFormatTab.superclass.loadData.apply(this,arguments);if(this._parameterBased){this._chkAllowMulti.hide();}else{this._chkAllowMulti.show();}this._radios[0].setValue(true,true);this._orientation=this.ORIENTATIONS[0];var F=(C&&C.Base&&C.Base.type=="dropdownGroup");if(F==true){this._chkAllowMulti.setValue(false,true);this._chkAllowMulti.hide();this._chkEnable.setValue(false,true);this._chkEnable.hide();}else{this._chkAllowMulti.setValue(true,true);this._chkAllowMulti.show();this._chkEnable.setValue(false,true);this._chkEnable.show();}if(!C||!C.Base||(C.Base.type!="listGroup"&&C.Base.type!="dropdownGroup")){return ;}var E=C.Format;if(!E){this._setDefaultValues();return ;}this._txtValueLimit.setValue(E.listLimit);var A=E.allowMulti;if(!A){this._chkAllowMulti.setValue(false,true);}else{this._chkAllowMulti.setValue(true,true);}var D=E.enableSearch;if(!D){this._chkEnable.setValue(false,true);}else{this._chkEnable.setValue(true,true);}if(E.orientation){for(var B=0;B<this.ORIENTATIONS.length;B++){if(E.orientation==this.ORIENTATIONS[B]){this._radios[B].setValue(true,true);this._orientation=this.ORIENTATIONS[B];}}}},_clearFormatSetting:function(A){if(this._dataFormatNode){this._dataFormatNode[A]=undefined;}if(this._dataFormat){this._dataFormat[A]=undefined;}if(this._formatType){this._formatType[A]=undefined;}if(this._formatAsButton[A]){this._formatAsButton[A].setDisabled(true);}},createSoapNode:function(C,D){if(D&&this._dataFormatNode){if(actuate.util.Utility.isSafari||actuate.util.Utility.isChrome){var B=(this._dataFormatNode.nodeType==Node.DOCUMENT_NODE)?this._dataFormatNode:this._dataFormatNode.ownerDocument;this.copyNodes(D.documentElement,B);}else{for(var A=0;A<this._dataFormatNode.length;A++){if(this._dataFormatNode[A]&&!this._dataFormatNode[A].dataFormat){D.documentElement.appendChild(this._dataFormatNode[A]);}}}}return this._dataFormatNode;},__fieldChangedHandler:function(A){},_dataFormatHandler:function(A){this._clearFormatSetting(A.index);if(A&&A.value&&this._formatAsButton[A.index]){this._dataFormat[A.index]=A.value;this._formatType[A.index]=A.type;if(!this._formatType[A.index]){switch(this._dataFormat.dataType){case"string":this._formatType[A.index]="stringformat";break;case"integer":case"float":case"double":case"decimal":this._formatType[A.index]="numberformat";break;case"date":this._formatType[A.index]="dateformat";break;case"time":this._formatType[A.index]="timeformat";break;case"datetime":case"date-time":this._formatType[A.index]="datetimeformat";break;default:this._formatType[A.index]=null;break;}}if(this._formatType[A.index]){this._formatAsButton[A.index].setDisabled(false);}}},_openDataFormattingDialog:function(B){for(var A=0;A<8;A++){if(B.id==this._classname+"_"+A+"_formatAs_button"){this._openDataFormatting(A);break;}}},_openDataFormatting:function(B){if(this._dataFormat[B]&&this._formatType[B]){var G;var D=B;var F=actuate.Method.bind(this._changeLocaleCallback,this);var A=actuate.Method.bind(this._errorCallback,this);var E={okCallback:actuate.Method.bind(function(I,H){if(I){this._dataFormatHandler({index:D,type:this._formatType[D],value:actuate.dialog.impl.helper.selectorbuilder.SelectorFormatTab.prototype._convertToFormat.call(this,I)});if(!this._dataFormatNode){this._dataFormatNode=[];}this._dataFormatNode[D]=H;}},this),changeLocaleCallback:F,errorCallback:A};switch(this._formatType[B]){case"stringformat":G="actuate.dialog.format.StringFormattingDialog";break;case"numberformat":G="actuate.dialog.format.NumberFormattingDialog";break;case"dateformat":G="actuate.dialog.format.DateFormattingDialog";break;case"timeformat":G="actuate.dialog.format.TimeFormattingDialog";break;case"datetimeformat":G="actuate.dialog.format.DateTimeFormattingDialog";break;default:break;}var C=actuate.dialog.Factory.getDialog(null,G,E);if(C){C.setConsumer(this._parentDialog._consumer);if(!this._dataFormat[B].dataType){this._dataFormat[B].dataType="decimal";}C.show({selectedBinding:{dataType:this._dataFormat[B].dataType},selectedElement:{dataFormat:this._dataFormat[B]}});}}},_adjuctUIAfterActivate:function(){if(!this._formatAsButton){this._formatAsButton=[];}for(var A=0;A<8;A++){this._formatAsButton[A]=actuate.widget.ComponentMgr.get(this._classname+"_"+A+"_formatAs_button");if(this._formatAsButton[A]){openDataFormattingDialog=actuate.Method.bind(this._openDataFormattingDialog,this);this._formatAsButton[A].registerEventHandler("click",openDataFormattingDialog);}}},_removeFormatRecord:function(A){if(A>=0){var B=actuate.widget.ComponentMgr.get("multiselector_format_table");B.remove(B.items.items[A+1],true);this._clearFormatSetting(A);}},_updateFormatRecord:function(B,I,G,D){var J=B+1;var H=actuate.widget.ComponentMgr.get("multiselector_format_table");if(H.items.getCount()>J){H.remove(H.items.items[J],true);}if(!G.type&&G.value){switch(G.value.dataType){case"string":G.type="stringformat";break;case"integer":case"float":case"double":case"decimal":G.type="numberformat";break;case"date":G.type="dateformat";break;case"time":G.type="timeformat";break;case"datetime":case"date-time":G.type="datetimeformat";break;default:G.type=null;break;}}H.insert(J,{layout:"column",border:false,items:[{xtype:"label",width:205,style:"border:1px solid #CCCCCC;border-top:none;text-align:left;padding-left:5px;height:23px;line-height: 20px;",text:(I?(typeof I=="string"?I:(typeof I=="object"?(D?I.realId:I.text):"")):"")},{style:"border:1px solid #CCCCCC;border-top:none;border-left:none;height:23px;",width:150,border:false,items:[{id:this._classname+"_"+B+"_formatAs_button",style:"height:19px;",width:145,cls:"multiSelection-format-icon",xtype:"button",text:actuate.util.Utility.getLocalizedString("selectorBuilder.formatTab.formatAs"),object:G}]}]});if(!this._dataFormat){this._dataFormat=[];}this._dataFormat[B]=G?G.value:null;if(!this._formatType){this._formatType=[];}this._formatType[B]=G?G.type:null;if(G&&G.value&&I&&I.value&&G.value.category&&G.value.category!="Unformatted"){var C;var E;var A;switch(I.value.dataType){case"string":C="StringFormat";E="String";var F=G.value;F.categoryChoice=new Object();F.categoryChoice.category=F.category;F.categoryChoice.pattern=F.pattern;A=F;break;case"integer":C="NumberFormat";E="Integer";var F=G.value;F.categoryChoice=new Object();F.categoryChoice.category=F.category;F.categoryChoice.pattern=F.pattern;A={"numberCategoryChoice":F};break;case"float":C="NumberFormat";E="Float";var F=G.value;F.categoryChoice=new Object();F.categoryChoice.category=F.category;F.categoryChoice.pattern=F.pattern;A={"numberCategoryChoice":F};break;case"double":C="NumberFormat";E="Double";var F=G.value;F.categoryChoice=new Object();F.categoryChoice.category=F.category;F.categoryChoice.pattern=F.pattern;A={"numberCategoryChoice":F};break;case"decimal":C="NumberFormat";E="Decimal";var F=G.value;F.categoryChoice=new Object();F.categoryChoice.category=F.category;F.categoryChoice.pattern=F.pattern;A={"numberCategoryChoice":F};break;case"date":C="DateTimeFormat";E="Date";var F=G.value;F.categoryChoice=new Object();F.categoryChoice.category=F.category;F.categoryChoice.pattern=F.pattern;A=F;break;case"time":C="DateTimeFormat";E="Time";var F=G.value;F.categoryChoice=new Object();F.categoryChoice.category=F.category;F.categoryChoice.pattern=F.pattern;A=F;break;case"datetime":case"date-time":C="DateTimeFormat";E="Datetime";var F=G.value;F.categoryChoice=new Object();F.categoryChoice.category=F.category;F.categoryChoice.pattern=F.pattern;A=F;break;default:C=null;break;}if(!this._dataFormatNode){this._dataFormatNode=new Array();}this._dataFormatNode[B]=new Object();this._dataFormatNode[B].dataFormat=new Object();this._dataFormatNode[B].dataFormat[C]=A;this._dataFormatNode[B].dataFormat.resultSetDataType=E;}},_setDefaultValues:function(){this._txtValueLimit.setValue(1000);this._chkAllowMulti.setValue(true,true);this._chkEnable.setValue(false,true);},isMultiValues:function(){return this._chkAllowMulti.getValue();},_updateControlVisibility:function(A){if(this._parameterBased){if(this._chkAllowMulti.isVisible()){this._chkAllowMulti.setValue(false,true);this._chkAllowMulti.hide();}}else{if(!this._chkAllowMulti.isVisible()){this._chkAllowMulti.show();}}},setParameterBased:function(A){this._parameterBased=A;this._updateControlVisibility();},createJsonData:function(){var A={};A.listLimit=actuate.util.String.trim(this._txtValueLimit.getValue());A.allowMulti=this._chkAllowMulti.getValue();A.enableSearch=this._chkEnable.getValue();A.orientation=this._orientation;var C={};if(this._dataFormatNode){for(var B=0;B<this._dataFormatNode.length;B++){if(this._dataFormatNode[B]&&this._dataFormatNode[B].dataFormat){C[B]=this._dataFormatNode[B].dataFormat;}}}A.dataFormat=C;return{Format:A};},setControlType:function(A){},setType:function(A){var B=(A=="dropdown");if(B==true){this._chkAllowMulti.setValue(false,true);this._chkAllowMulti.hide();this._chkEnable.setValue(false,true);this._chkEnable.hide();}else{this._chkAllowMulti.setValue(true,true);this._chkAllowMulti.show();this._chkEnable.setValue(false,true);this._chkEnable.show();}}});