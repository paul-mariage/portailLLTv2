actuate.util.Package.define("actuate.dialog.impl.helper.selectorbuilder");actuate.dialog.impl.helper.selectorbuilder.SelectorDataTab=actuate.Class.extendClass(actuate.dialog.impl.helper.AbstractDataTabDialog,{_dialogName:"selectorBuilder.dataTab",_classname:"actuate.dialog.SelectorDataTab",_type:null,_dataType:null,_dataFormat:null,_data:null,_dataText:null,_displayText:null,_sortText:null,_sortDirectionCombo:null,_operator:null,_operatorCombo:null,_operatorComboStore:null,_dataSets:null,_cubes:null,_noBindingChkBox:null,_filter:null,_parameterBasedSelector:false,_dataManagerSoap:null,_arbitraryValues:false,_multiValues:true,initialize:function(){actuate.dialog.impl.helper.selectorbuilder.SelectorDataTab.superclass.initialize.apply(this,arguments);var A=this._getId(this._classname);this._initContent();this._panel=new actuate.widget.panel.Panel(this._initPanel());this._multiValues=true;this._noBindingClick_c=actuate.Method.bind(this._noBindingClick,this);this._noBindingChkBox.registerEventHandler("check",this._noBindingClick_c);this._operator=null;},_initializeControlStatus:function(){this._validateControlArray=[];this._validateControlArray.push(this._dataText);},_initPanel:function(){var B=actuate.util.Utility;this._reportText=new actuate.widget.form.TextField({readOnly:true,disabled:true,fieldLabel:actuate.util.Utility.getLocalizedString("selectorBuilder.dataTab.report")});this._parameterText=new actuate.widget.form.TextField({readOnly:true,disabled:true,fieldLabel:actuate.util.Utility.getLocalizedString("selectorBuilder.dataTab.reportParameter")});this._noBindingChkBox=new actuate.widget.form.Checkbox({fieldLabel:B.getLocalizedString("selectorBuilder.dataTab.bindingOption"),hideLabel:false,checked:false,valueText:"noBinding",boxLabel:actuate.util.Utility.getLocalizedString("selectorBuilder.dataTab.noBinding")});this._dataTextStore=new actuate.widget.custom.TreeCombo.TreeComboStore(new actuate.widget.data.SimpleStore({fields:["object","text","title"]}));this._dataText=new actuate.widget.custom.TreeCombo.TreeComboBox({fieldLabel:actuate.util.Utility.getLocalizedString("selectorBuilder.dataTab.field"),editable:false,forceSelection:true,valueField:"object",displayField:"text",titleField:"title",autoExpand:true,icons:this.__icons,showTooltip:true,store:this._dataTextStore});this._dataText.registerEventHandler("select",actuate.Method.bind(this._eh_changeDataTree,this));this._dataText.registerEventHandler("beforeselect",actuate.Method.bind(this._eh_onBeforeSelect,this));this._displayTextStore=new actuate.widget.custom.TreeCombo.TreeComboStore(new actuate.widget.data.SimpleStore({fields:["object","text","title"]}));this._displayText=new actuate.widget.custom.TreeCombo.TreeComboBox({fieldLabel:actuate.util.Utility.getLocalizedString("selectorBuilder.dataTab.displayField"),editable:false,forceSelection:true,valueField:"object",displayField:"text",titleField:"title",autoExpand:true,icons:this.__icons,showTooltip:true,store:this._displayTextStore});this._displayText.registerEventHandler("select",actuate.Method.bind(this._eh_changeDataTree,this));this._displayText.registerEventHandler("beforeselect",actuate.Method.bind(this.__eh_onBeforeSelect,this));this._sortDirectionStore=new actuate.widget.data.SimpleStore({fields:["value","text"],data:[["none",actuate.util.Utility.getLocalizedString("common.dataTab.sort.none")],["asc",actuate.util.Utility.getLocalizedString("common.dataTab.sort.ascending")],["desc",actuate.util.Utility.getLocalizedString("common.dataTab.sort.descending")]]});this._sortDirectionCombo=new actuate.widget.form.ComboBox({fieldLabel:B.getLocalizedString("common.dataTab.sortDirection"),editable:false,forceSelection:true,store:this._sortDirectionStore,value:"none",valueField:"value",displayField:"text"});this.__initDataSourceCombo();this._operatorStore=new actuate.widget.data.SimpleStore({fields:["operator","displayText"],data:[]});this._operatorCombo=new actuate.widget.form.ComboBox({fieldLabel:B.getLocalizedString("common.dataTab.operator"),editable:false,forceSelection:true,store:this._operatorStore,value:null,valueField:"operator",displayField:"displayText"});var A={title:actuate.util.Utility.getLocalizedString("selectorBuilder.dataTab.data"),header:false,style:"background:transparent",border:false,layout:"column",items:[{border:false,layout:"form",defaults:{width:235},labelWidth:150,items:[this._reportText,this._parameterText,this._noBindingChkBox,this.__dataSourceCombo,this._dataText,this._displayText,this._sortDirectionCombo,this._operatorCombo]}]};return A;},_initOperatorStore:function(){var J=this._type;var I=this._dataType;var B=this._multiValues;this._operatorStore.removeAll();var H=actuate.util.Utility;if(!I){I="string";}if(I=="string"&&J=="slider"){this._multiValues=B=false;}var E=["Eq"];if((J=="list"&&B)||J=="checkBox"){E=["In"];}else{if(J=="slider"&&B){E=["Between"];}}var C=this._operatorStore.recordType;for(var F=0;F<E.length;F++){var A=E[F];var G=new C({operator:A.toLowerCase(),displayText:H.getLocalizedString("filterDialog.text."+A)});this._operatorStore.add(G);}var D=false;if(this._operator){D=this._operatorCombo.setValue(this._operator);}if(!D){this._operatorCombo.setSelectedIndex(0);}if(E.length>1){this._operatorCombo.show();}else{this._operatorCombo.hide();}},_initButtons:function(){var A=actuate.util.Utility;var B=[];this._okBtn=new actuate.uiadapter.Button({text:A.getLocalizedString("baseDialog.button.ok")});this._cancelBtn=new actuate.uiadapter.Button({text:A.getLocalizedString("baseDialog.button.cancel")});B.push(this._okBtn);B.push(this._cancelBtn);return B;},_eh_changeDataTree:function(A,D){if(!D||!D.data||!D.data.object){return ;}var C=D.data.object.text;var B=D.data.object.realId;var E=D.data.object.pattern;this._dataFormat=D.data.object.format;if(A==this._displayText){this._setFieldValue(this._displayText,{text:C,id:B,pattern:E,format:this._dataFormat});}else{this._setFieldValue(this._dataText,{text:C,id:B,pattern:E,format:this._dataFormat});if(D.data.value&&D.data.value.dataType){this._dataType=D.data.value.dataType;}this._setFieldValue(this._displayText,{text:C,id:B,pattern:E,format:this._dataFormat});this._initOperatorStore();}this._parentDialog._fixDropShadow();this.__selectionChangedHandler();},__onSelectDataSource:function(){this.__clearFilter();this._clearFieldsAndDisplay();this._updateTree();actuate.dialog.impl.helper.selectorbuilder.SelectorDataTab.superclass.__onSelectDataSource.call(this);},_clearFieldsAndDisplay:function(){if(this._dataText){this._setFieldValue(this._dataText,null);}if(this._displayText){this._setFieldValue(this._displayText,null);}},_preHide:function(){this.__clearFilter();this._type=null;this._datamartName=null;this._operatorStore.removeAll();this._multiValues=true;},_updateNoBindingChkBox:function(A){A=A||this._type;if(actuate.util.Utility.isIE7&&(!actuate.util.Utility.isIE8Compat)){this._noBindingChkBox._ele.dom.style.position="absolute";this._noBindingChkBox._ele.dom.style.left="0px";}else{this._noBindingChkBox._ele.dom.style.position="";this._noBindingChkBox._ele.dom.style.left="";}if((this._type!="slider"&&this._type!="calendar")||this._parameterBasedSelector){this._noBindingChkBox.setValue(false,true);this._noBindingClick();this._noBindingChkBox.hide();}else{this._noBindingChkBox.show();this._noBindingClick();}},_updateControls:function(){this._updateNoBindingChkBox();if(this._parameterBasedSelector){this._reportText.show();this._parameterText.show();this._operatorCombo.hide();this.__dataSourceCombo.hide();this._dataText.hide();this._displayText.hide();this._sortDirectionCombo.hide();}else{this._reportText.hide();this._parameterText.hide();if(this._operatorStore&&this._operatorStore.data&&this._operatorStore.data.items&&this._operatorStore.data.items.length>1){this._operatorCombo.show();}else{this._operatorCombo.hide();}this.__dataSourceCombo.show();this._dataText.show();this._displayText.show();this._sortDirectionCombo.show();}},_updateTree:function(){var D=this.__dataSourceCombo.getValue();var A=D.dimensions||D.measures;var B=this._dataText.getValue();var C=this._displayText.getValue();if(D){this._dataTextStore.removeAll();this.__setTreeStoreValues(this._dataTextStore,D);}this._dataText.expandDeep=this._isDataModelSelected()?1:null;this._dataText.refresh();this._dataText.setValueById(B.id);if(A){this._displayText.disable();}else{this._displayTextStore.removeAll();if(D){this.__setTreeStoreValues(this._displayTextStore,D);}this._displayText.enable();this._displayText.expandDeep=this._isDataModelSelected()?1:null;this._displayText.refresh();this._displayText.setValueById(C.id);}this._parentDialog._fixDropShadow();return D;},__addDataIntoTreeStore:function(B,A){if(A&&B&&!(B.value&&B.value.dataType=="blob")){if(!B.format&&B.value){B.format={value:{dataType:B.value.dataType,category:"Unformatted"}};}B.object=B;B.title=this._getTooltip(B);B.disabled=this._isDisabled(B,A);A.add(new A.recordType(B,B.id));}},_isDisabled:function(B){if(actuate.dialog.impl.helper.selectorbuilder.SelectorDataTab.superclass._isDisabled.apply(this,arguments)){return true;}if(B&&(B.type=="measure"||B.type=="measures")){return true;}var A={"slider":["float","decimal","integer","currency"],"calendar":["date","date-time"]}[this._type];if(B&&B.value&&B.value.dataType){return B.value.dataType=="blob"||(A&&actuate.util.Utility.arrayIndexOf(A,B.value.dataType.toLowerCase())<0);}return false;},_loadParameter:function(C){this._clearControls();var H="";var A="";var G="";if(C.parameter){H=C.parameter.dashboardFile;A=C.parameter.parameterName;G=C.parameter.cascadingGroupName||null;this._dataType=C.parameter.dataType;this._controlType=C.parameter.controlType;this._datamartName=C.parameter.datamartName;this._supportNoValue=C.parameter.isNoValueSupported;}else{H=C.Base.dashboardFile;A=C.Base.binding;G=C.Base.cascadingGroupName||null;this._dataType=C.Base.dataType;this._controlType=C.Base.controlType;this._datamartName=C.Base.datamartName;}if(G){A=G+"/"+A;}var F=actuate.util.Utility.getFileExtension(H).toLowerCase();var B="";var E="";if(F=="datadesign"){B=actuate.util.Utility.getLocalizedString("selectorBuilder.dataTab.dataDesign");E=actuate.util.Utility.getLocalizedString("selectorBuilder.dataTab.dataDesignParameter");}else{B=actuate.util.Utility.getLocalizedString("selectorBuilder.dataTab.report");E=actuate.util.Utility.getLocalizedString("selectorBuilder.dataTab.reportParameter");}this._reportText.setLabel(B);this._parameterText.setLabel(E);this._reportText.setValue(H);this._parameterText.setValue(A);var D={value:{dataType:this._dataType,category:"Unformatted",controlType:this._controlType}};this.fireEvent("fieldchanged",{format:D});},_loadReportData:function(A){this._hasNewDatamart=false;this._data=A;this._clearControls();this.__showAllDataSources();this._updateTree();if(A.Filter){this._filter=A.Filter;}},_loadSelectorData:function(D){if(!(D&&D.Base)){return ;}this.setType(D.Base.type,false);var K=D.Base.bindings;this._binding=K&&K.length>0?(K[0]?K[0].binding:null):null;if(!this._binding&&(this._type=="slider"||this._type=="calendar")){this._noBindingChkBox.setValue(true,true);this._noBindingClick();return ;}this._dataType=D.Base.dataType;var A=D.Base.dataObjectType;if(!A){return ;}this._operator=D.Base.operator;this._initOperatorStore();var H=null;var G=false;if(A=="cube"){G=true;}if(D.DataSet&&D.DataSet.dataMart){this.__selectDataSource(D.DataSet,"dataset");this.__onSelectDataSource();}else{if(D.Cube&&D.Cube.dataMart){this.__selectDataSource(D.Cube,"cube");this.__onSelectDataSource();}}this._updateTree();H=null;var B=K&&K.length>0?(K[0]?K[0].displayColumn:null):null;var E=D.Base.pattern;this._dataFormat=D.Base.dataFormat;var J=2;for(var C=0;C<this._dataTextStore.getCount();C++){var F=this._dataTextStore.getAt(C);var H=F.id;if(this._binding==H){var I=F.displayName||F.name||H;this._setFieldValue(this._dataText,{text:I,id:H,pattern:E,format:this._dataFormat,treeId:F.id});if(G||!B){this._setFieldValue(this._displayText,{text:I,id:H,pattern:E,format:this._dataFormat,treeId:F.id});break;}if(--J<=0){break;}}if(!G&&B==H){var I=F.displayName||F.name||H;this._setFieldValue(this._displayText,{text:I,id:H,pattern:E,format:this._dataFormat,treeId:F.id});if(--J<=0){break;}}}if(D.Filter){this._filter=D.Filter;}this._sortDirectionCombo.setValue(D.Base.sortDirection||"none");},_isParameterBasedSelector:function(A){if(A&&A.parameter){return true;}if(A&&A.Base&&A.Base.parameterName){return true;}return false;},loadData:function(A){this._parameterBasedSelector=this._isParameterBasedSelector(A);if(this._parameterBasedSelector){this._loadParameter(A);}else{if(A&&A.DataMarts){this._loadReportData(A);}else{if(A&&A.Base){this._loadSelectorData(A);}}}if(A.isNew){this._initOperatorStore();}this._updateControls();},_getData:function(E,A,C){if(E&&A&&C){var D;switch(C){case"dataset":D=E.dataSets;break;case"cube":D=E.cubes;break;case"parameter":D={name:this.getLocalizedString("parameters"),parameters:E.parameters};break;}if(D){for(var B=0;B<D.length;B++){D[B].datamart=E;A.push(D[B]);}}}},_clearControls:function(){if(this.__dataSourceCombo){this.__dataSourceCombo.clear();}if(this._dataText){this._setFieldValue(this._dataText,null);}if(this._displayText){this._setFieldValue(this._displayText,null);}this._sortDirectionCombo.setValue("none");this._filterSoap=null;this._measureFilterSoap=null;this._filter=null;this._dataManagerSoap=null;},_changeFilterPanel:function(B){if(this._parentDialog._filterPanel){var C={};var A=this.__getSelectedDataSourceInfo();if(A){C.dataObject=[A[1],A[4],A[3]];C.dataObjectSoap=this.createDataSetSoap(A);C.dataMartSoap=this._dataManagerSoap;C.clearFilterUI=this._clearFilterUI;C.target="Selector";}if(this._filter){C.Filter=this._filter;}this._parentDialog._filterPanel.loadData(C);}},createDataSetSoap:function(){var I=actuate.util.XmlDom.createXMLDom(actuate.util.Constants.soap.NAMESPACE_ACTUATE10,actuate.Constant.tag.Data);var C=this.__dataSourceCombo.getValue();var E=this._isDataCubeSelected();var N=this._isDataSetSelected();var H=this._parameterBasedSelector;var F=C.dataSourceName;F=F?F:"";var L=C?C.name:null;var J=C.dataMartName;if(E){G=actuate.util.XmlDom.createElement(I,"Cube");var B=actuate.util.XmlDom.createElement(I,"Name");var D=I.createTextNode(L);B.appendChild(D);G.appendChild(B);}else{if(N){var G=actuate.util.XmlDom.createElement(I,"DataSetDef");var B=actuate.util.XmlDom.createElement(I,"Name");var D=I.createTextNode(L);B.appendChild(D);G.appendChild(B);}}var A=actuate.util.XmlDom.createElement(I,"DataSource");var M=actuate.util.XmlDom.createElement(I,"DisplayName");D=I.createTextNode(F);M.appendChild(D);A.appendChild(M);if(J!=null){var K=actuate.util.XmlDom.createElement(I,"DataMartName");D=I.createTextNode(J);K.appendChild(D);A.appendChild(K);}G.appendChild(A);return G;},getDataSelection:function(){var A={};if(this._parameterBasedSelector){var C=this._reportText.getValue();var B=actuate.util.Utility.getFileExtension(C).toLowerCase();if(B=="datadesign"){A.type="datamartParameter";A.datamartName=C;}else{A.type="reportParameter";A.reportName=C;}A.parameterName=this._parameterText.getValue();}else{if(this._isDataSetSelected()){A.type="dataset";A.dataSourceName=this.__dataSourceCombo.getValue().name;A.columnName=this._dataText.getRawValue();}else{if(this._isDataCubeSelected()){A.type="cube";A.dataSourceName=this.__dataSourceCombo.getValue().name;A.levelName=this._dataText.realId;}}}A.dataType=this._dataType;return A;},createSoapNode:function(H,G){if(G){var Z=this._isDataCubeSelected();var X=this._isDataSetSelected();var F=this._parameterBasedSelector;var M=actuate.util.XmlDom.createElement(G,"Name");var R;var A=this._noBindingChkBox.getValue();if(A){return ;}else{if(F){R=actuate.util.XmlDom.createElement(G,"Parameter");M.appendChild(G.createTextNode(this._parameterText.getValue()));R.appendChild(M);if(this._dataType){var D=actuate.util.XmlDom.createElement(G,"DefaultOp");D.appendChild(G.createTextNode(this._dataType));R.appendChild(D);}if(this._controlType){var D=actuate.util.XmlDom.createElement(G,"DisplayType");D.appendChild(G.createTextNode(this._controlType));R.appendChild(D);}}else{if(X||Z){var S=this._sortDirectionCombo.getValue();if((!this._sortDirectionCombo.disabled)&&S&&S!="none"){var L=actuate.util.XmlDom.createElement(G,"SortDefinitionList");var K=actuate.util.XmlDom.createElement(G,"SortDefinition");var P=actuate.util.XmlDom.createElement(G,"SortDir");P.appendChild(G.createTextNode(S));K.appendChild(P);L.appendChild(K);G.documentElement.appendChild(L);}var C=actuate.util.XmlDom.createElement(G,"BoundDataColumnList");var a=[];a.push(this._dataText.realId);if(!Z){a.push(this._displayText.realId);}else{a.push(this._dataText.realId);}for(var T=0;T<a.length;T++){var Y=actuate.util.XmlDom.createElement(G,"BoundDataColumn");var M=actuate.util.XmlDom.createElement(G,"Name");if(a[T]){M.appendChild(G.createTextNode(a[T]));}Y.appendChild(M);C.appendChild(Y);}G.documentElement.appendChild(C);this.__addFilterSoap(G.documentElement);if(X){R=actuate.util.XmlDom.createElement(G,"DataSetDef");}else{if(Z){R=actuate.util.XmlDom.createElement(G,"Cube");}}if(R){var U=actuate.util.XmlDom.createElement(G,"Name");var I=this.__dataSourceCombo.getValue();var b=I?I.name:null;U.appendChild(G.createTextNode(b));R.appendChild(U);}}}}if(R){var Q=actuate.util.XmlDom.createElement(G,"DataSource");var I=this.__dataSourceCombo.getValue();var B="";if(F){B=this._reportText.getValue();if(this._datamartName){var W=actuate.util.XmlDom.createElement(G,"DataMartName");W.appendChild(G.createTextNode(this._datamartName));Q.appendChild(W);}}else{if(I){B=I.dataSourceName;B=B?B:"";var W=actuate.util.XmlDom.createElement(G,"DataMartName");W.appendChild(G.createTextNode(I.dataMartName));Q.appendChild(W);var N=this.__getSelectedDataSourceInfo();var J=N[4];if(J){var O=(J.toLowerCase()=="data")?actuate.dialog.impl.constant.DataMartAccessType.LATEST:actuate.dialog.impl.constant.DataMartAccessType.TRANSIENT;var E=actuate.util.XmlDom.createElement(G,"Type");E.appendChild(G.createTextNode(O));Q.appendChild(E);}}}if(B){var V=actuate.util.XmlDom.createElement(G,"Name");V.appendChild(G.createTextNode(B));Q.appendChild(V);}R.appendChild(Q);G.documentElement.appendChild(R);}}actuate.dialog.impl.helper.selectorbuilder.SelectorDataTab.superclass.createSoapNode.apply(this,arguments);},createJsonData:function(){return{Data:{operator:this._operatorCombo.getValue(),isNoValueSupported:this._supportNoValue}};},validate:function(){if(this._parameterBasedSelector){return true;}var A=this._noBindingChkBox.getValue();if(A){return true;}var C=this._isDataCubeSelected();var D=this._isDataSetSelected();var B=null;if(!(C||D)){B=actuate.util.Utility.getLocalizedString("common.dataTab.noDataSourceError");}else{if(!(this._dataText&&this._dataText.realId)){B=actuate.util.Utility.getLocalizedString("selectorBuilder.dataTab.field.errorMessage");}}if(B){actuate.widget.MessageBox.show({title:actuate.util.Utility.getLocalizedString("selectorDialog.alertTitle"),msg:B,buttons:actuate.widget.MessageBox.OK});return false;}return true;},setType:function(A,B){this._type=A;this._arbitraryValues=(A=="slider"||A=="calendar");if(B){this._updateTree();}this._initOperatorStore();this._updateNoBindingChkBox(A);if(this._sortDirectionCombo){this._sortDirectionCombo.setValue(this._arbitraryValues?"asc":"none");this._sortDirectionCombo.setDisabled(this._arbitraryValues);}},getType:function(){return this._type;},setMultiValues:function(A){if(A!=this._multiValues){this._multiValues=A;this._initOperatorStore();}},getSelectedDataType:function(){return this._dataType;},_setFieldValue:function(F,D){var G=null;var H=null;var C=null;var E=null;if(D){H=D.id;C=D.pattern;E=D.format?D.format:{value:{}};}G=this._getTextFromId(H);F.setValueById(H);F.realId=H;if(E&&E.value){if(!E.value.dataType){E.value.dataType=this._dataType;}if(!E.value.category){E.value.category="Unformatted";}}var A;if(F==this._dataText){A=this._dataText;}else{if(F==this._displayText){A=this._displayText;}}if(A&&D&&D.treeId){var B=A.getValueAt(D.treeId);if(B!=null){B.enable();B.select(false,true);B.ensureVisible();}}this.fireEvent("fieldchanged",{binding:H,pattern:C,format:E});},_getTextFromId:function(G){if(!G){return null;}var C=this.__dataSourceCombo.getValue();var B=[C.columns,C.dimensions,C.measures,C.parameters];for(var A=0;A<B.length;A++){var F=this._getTextFromArray(B[A],G);if(F){return F;}if(B[A]&&actuate.util.Utility.isArray(B[A])){var E=B[A];for(k=0;k<E.length;k++){var D=[E[k].levels,E[k].measures];for(j=0;j<D.length;j++){var F=this._getTextFromArray(D[j],G);if(F!=null){return F;}}}}}},_getTextFromArray:function(B,E){if(!B){return null;}for(var C=0;C<B.length;C++){var D=this._getTextFromArray(B[C].attributes,E);if(D!=null){return D;}var A=B[C].fullName||B[C].name;D=B[C].fullDisplayName||B[C].fullName||B[C].displayName||B[C].name;if(A==E){return D;}}return null;},_noBindingClick:function(){if(!this._noBindingChkBox||!this._noBindingChkBox.isVisible()){return ;}var D=this._noBindingChkBox.getValue();var A=[this._operatorCombo,this.__dataSourceCombo,this._dataText,this._displayText];for(var B=0;B<A.length;B++){A[B].setDisabled(D);}if(!D){this._updateTree();}this._parentDialog._fixDropShadow();this.fireEvent("fieldchanged",{noBinding:D,format:(D?{value:{category:"Unformatted"}}:null)});if(D){this.fireEvent("datachanged",{type:""});if(this._parentDialog._filterPanel){this._parentDialog._filterPanel.getPanel().setDisabled(true);}}else{var C=this.getDataSelection();if(C&&C.dataSourceName&&this._parentDialog._filterPanel){this._parentDialog._filterPanel.getPanel().setDisabled(false);}else{this._parentDialog._filterPanel.getPanel().setDisabled(true);}}},_eh_onBeforeSelect:function(A,B){if(B&&B.attributes&&B.attributes.type=="measure"){return false;}return actuate.dialog.impl.helper.selectorbuilder.SelectorDataTab.superclass._eh_onBeforeSelect.apply(this,arguments);},__isGroupDisabled:function(A){return A=="measures";}});