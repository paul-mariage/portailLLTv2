actuate.util.Package.define("actuate.dialog.impl.helper.selectorbuilder");actuate.dialog.impl.helper.selectorbuilder.SelectorDataVersionTab=actuate.Class.extendClass(actuate.dialog.impl.helper.AbstractDataTabDialog,{_dialogName:"selectorBuilder.dataVersionTab",_classname:"actuate.dialog.SelectorDataVersionTab",_versionCombo:null,_versionStore:null,_dataMartVersions:null,initialize:function(){actuate.dialog.impl.helper.selectorbuilder.SelectorDataVersionTab.superclass.initialize.apply(this,arguments);var A=this._getId(this._classname);this._panel=new actuate.widget.panel.Panel(this._initPanel());this.on("versionsloaded",actuate.Method.bind(this._loadVersions,this));},_initPanel:function(){this.__initDataSourceCombo();this._versionStore=new actuate.widget.data.SimpleStore({fields:["value","displayValue"]});this._versionCombo=new actuate.widget.form.ComboBox({fieldLabel:actuate.util.Utility.getLocalizedString("selectorBuilder.dataTab.defaultVersion"),editable:false,forceSelection:true,store:this._versionStore,value:null,valueField:"value",displayField:"displayValue"});var A={title:actuate.util.Utility.getLocalizedString("selectorBuilder.dataTab.data"),header:false,style:"background:transparent",border:false,layout:"column",items:[{border:false,layout:"form",labelWidth:140,defaults:{width:235},items:[this.__dataSourceCombo,this._versionCombo]}]};return A;},__onSelectDataSource:function(){actuate.dialog.impl.helper.selectorbuilder.SelectorDataVersionTab.superclass.__onSelectDataSource.call(this);this._showDataMartVersions();},_showDataMartVersions:function(){var D=this.__dataSourceCombo.getValue();this._versionCombo.clear();if(D&&this._dataMartVersions){var A=this._dataMartVersions[D.id];if(A){for(var C=0;C<A.length;C++){var B=A[C];if(B){this._versionStore.add(new this._versionStore.recordType({value:B[0],displayValue:B[1]}));}}}this._versionCombo.setValue(D.version?D.version:-1);}},_loadVersions:function(A){if(!this._dataMartVersions){this._dataMartVersions=A;}else{if(A){for(var B in A){this._dataMartVersions[B]=A[B];}}}this._showDataMartVersions();},loadData:function(A){if(A){if(A.DataMarts){this._data=A;this.__dataSourceCombo.clear();this._hasNewDatamart=false;this.__showAllDataSources();}if(A.Base){this.__selectDataSource(A.Base);}}},__selectDataSource:function(C){if(C&&C.dataMart&&this.__dataSourceCombo){var D=C.dataMart;var G=D.fileName;var F=D.extension;if(G&&F){var E=G+"."+F;var A=this._data?this._data.DataMarts:null;if(A){for(var B=0;B<A.length;B++){if(A[B]&&A[B].id==E&&!A[B].allowVersionSelector){A[B].allowVersionSelector=true;this.__dataSourceCombo.clear();actuate.dialog.impl.helper.selectorbuilder.SelectorDataVersionTab.superclass.__showAllDataSources.call(this);break;}}}this.__dataSourceCombo.setValueById(E);}}},__showAllDataSources:function(B,A){var C;if(A){C=A;}else{if(this._data){C=this._data.DataMarts;}}if(C&&C.length>0){this._parentDialog._consumer._eventDispatcher.broadcastEvent(actuate.builder.impl.event.__E_QUERY_DATAMART_VERSIONS,C);}this.__dataSourceCombo.collapse();actuate.dialog.impl.helper.selectorbuilder.SelectorDataVersionTab.superclass.__showAllDataSources.call(this,B,A);},__getDefaultSelectionID:function(C){var D=C;if(!D||D.length<=0){D=this._data?this._data.DataMarts:null;}if(D){for(var B=0;B<D.length;B++){var E=D[B];if(E&&E.allowVersionSelector){var A=this.__createDataSourceRecord(E,"datamart");if(A){return A.id;}}}}},__createDataSourceRecord:function(C,B,D){if(C&&C.accessType!=actuate.dialog.impl.constant.DataMartAccessType.TRANSIENT){var A=actuate.dialog.impl.helper.selectorbuilder.SelectorDataVersionTab.superclass.__createDataSourceRecord.call(this,C,B,D);A.disabled=!C.allowVersionSelector;return A;}},__canSelect:function(B,A){if(A&&A.data&&A.data.value){if(A.data.value.allowVersionSelector){return true;}}return false;},getDataSelection:function(){var A={};var B=this.__dataSourceCombo.getValue();if(B){A.dataSourceName=B.title;}A.type="version";return A;},createJsonData:function(){var C=this.__dataSourceCombo.getValue();var A=this._versionCombo.getValue();var D=C?C.fileName:null;var B=(A>0)?actuate.dialog.impl.constant.DataMartAccessType.SPECIFIC:actuate.dialog.impl.constant.DataMartAccessType.LATEST;return{Data:{fileName:D,version:A,accessType:B}};},validate:function(){if(this.__dataSourceCombo&&this._versionCombo){return this.__dataSourceCombo.getValue()&&this._versionCombo.getValue();}return true;}});