actuate.util.Package.define("actuate.dialog.impl.helper.hyperlinkBuilder");actuate.dialog.impl.helper.hyperlinkBuilder.HyperlinkBuilderDialog=actuate.Class.create();actuate.dialog.impl.helper.hyperlinkBuilder.HyperlinkBuilderDialog=actuate.Class.extendClass(actuate.dialog.impl.helper.BaseDialog,{_width:560,docName:null,connectionHandle:null,_dialogName:"hyperlinkBuilderDialog",_height:300,hasFooter:true,_classname:"actuate.dialog.HyperlinkBuilderDialog",_nolinkRadio:null,_urlRadio:null,_bookmarkRadio:null,_drillThroughRadio:null,_urlBlock:null,_bookmarkBlock:null,_drillThroughBlock:null,_urlLocation:null,_urlTarget:null,_urlTooltip:null,_typeCode:null,_hyperlinkDefinition:null,_fileName:null,_repositoryType:null,_serverUrl:null,_volume:null,_locale:null,_hyperlinkCache:null,_moreBlock:null,urlLocationText:null,urlTooltipText:null,urlTargetValue:null,bookmarksTooltipText:null,drillThroughReportName:null,moreTargetValue:null,moreFormatValue:null,moreTooltipText:null,moreBookmarksText:null,bookmarksText:null,_isPickerSelect:false,_onDrillEdit:false,reportParameters:null,_parameterIndex:-1,_parameterStore:[],_Value_ColumnBinding_Prefix:"[",_Value_ColumnBinding_Suffix:"]",_QUOTE:'"',_isForChart:false,initialize:function(B,C){actuate.dialog.impl.helper.hyperlinkBuilder.HyperlinkBuilderDialog.superclass.initialize.call(this,B,this._width,false);var A=actuate.getDefaultRequestOptions();this._repositoryType=A.getRepositoryType();this._serverUrl=A.getIServerUrl();this._volume=A.getVolume();this._locale=A.getLocale();},__initComponents:function(){actuate.dialog.impl.helper.hyperlinkBuilder.HyperlinkBuilderDialog.superclass.__initComponents.apply(this,arguments);this.setTitle(actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.title"));this._initPanel();},__initListeners:function(){actuate.dialog.impl.helper.hyperlinkBuilder.HyperlinkBuilderDialog.superclass.__initListeners.apply(this,arguments);this._install_eventHandler();},_initPanel:function(){var G=[];var J=this;this._targetComboStore=new actuate.widget.data.SimpleStore({fields:["value","text"]});var A=new this._targetComboStore.recordType({value:"0",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.targetOptionText0")});this._targetComboStore.add(A);var A=new this._targetComboStore.recordType({value:"1",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.targetOptionText1")});this._targetComboStore.add(A);this._formatComboStore=new actuate.widget.data.SimpleStore({fields:["value","text"]});var F=new this._formatComboStore.recordType({value:"",text:""});this._formatComboStore.add(F);var F=new this._formatComboStore.recordType({value:"afp",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.afpText")});this._formatComboStore.add(F);var F=new this._formatComboStore.recordType({value:"xls",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.xlsText")});this._formatComboStore.add(F);var F=new this._formatComboStore.recordType({value:"xlsx",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.xlsxText")});this._formatComboStore.add(F);var F=new this._formatComboStore.recordType({value:"xhtml",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.xhtmlText")});this._formatComboStore.add(F);var F=new this._formatComboStore.recordType({value:"pdf",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.pdfText")});this._formatComboStore.add(F);var F=new this._formatComboStore.recordType({value:"postscript",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.postscriptText")});this._formatComboStore.add(F);var F=new this._formatComboStore.recordType({value:"doc",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.docText")});this._formatComboStore.add(F);var F=new this._formatComboStore.recordType({value:"docx",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.docxText")});this._formatComboStore.add(F);var F=new this._formatComboStore.recordType({value:"html",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.htmlText")});this._formatComboStore.add(F);var F=new this._formatComboStore.recordType({value:"ppt",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.pptText")});this._formatComboStore.add(F);var F=new this._formatComboStore.recordType({value:"pptx",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.pptxText")});this._formatComboStore.add(F);this._bookmarkComboStore=new actuate.widget.data.SimpleStore({fields:["value","text"],sortInfo:{field:"value",direction:"ASC"}});this._moreBookmarkComboStore=new actuate.widget.data.SimpleStore({fields:["value","text"],sortInfo:{field:"value",direction:"ASC"}});this._parametersGridStore=new actuate.widget.data.SimpleStore({fields:["parameterDisplayName","parameterName","parameterValue","edit"]});var I={header:false,collapsible:true,border:false,autoHeight:true,title:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.radioTitleText"),checkboxToggle:false,layout:"column",items:[{xtype:"label",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.radioTypeText"),columnWidth:0.26,style:"margin: 7px 5px 5px 16px"},{xtype:"panel",columnWidth:0.7,header:false,collapsible:true,border:false,autoHeight:true,layout:"column",items:[{id:"actuate_dialog_hyperlink_nolinkRadio",xtype:"radio",columnWidth:0.99,name:this._classname+"nolinkRadio",boxLabel:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.noLinkRadioText"),checked:false,style:"margin: 5px 5px 5px 0"},{id:"actuate_dialog_hyperlink_urlRadio",xtype:"radio",columnWidth:0.99,name:this._classname+"urlRadio",boxLabel:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.urlRadioText"),checked:true,style:"margin: 5px 5px 5px 0"},{id:"actuate_dialog_hyperlink_bookmarkRadio",xtype:"radio",columnWidth:0.99,name:this.__classname+"bookmarkRadio",boxLabel:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.bookmarkRadioText"),checked:false,style:"margin: 5px 5px 5px 0"},{id:"actuate_dialog_hyperlink_drillThroughRadio",xtype:"radio",columnWidth:0.99,name:this._classname+"drillThroughRadio",boxLabel:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.drillThroughRadioText"),checked:false,style:"margin: 5px 5px 5px 0"}]}]};var B={xtype:"fieldset",id:"actuate_dialog_hyperlink_urlBlock",header:false,border:false,autoHeight:true,layout:"form",items:[{xtype:"panel",columnWidth:0.99,header:false,border:false,style:"padding-bottom:10px",autoHeight:true,layout:"column",items:[{xtype:"label",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.urlLocationLable"),width:92,style:"margin-top:4px"},{id:"actuate_dialog_hyperlink_urlLocation",xtype:"textfield",width:300},{xtype:"button",style:"margin-left:5px",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.ezScriptBtn"),tooltip:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.ezScriptBtn"),tooltipType:"title",id:"actuate_dialog_hyperlink_ezscriptlauncher_type1"}]},{xtype:"panel",columnWidth:0.99,header:false,border:false,style:"padding-bottom:10px",autoHeight:true,layout:"column",items:[{xtype:"label",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.urlTargetLabel"),width:92,style:"margin-top:4px"},{id:"actuate_dialog_hyperlink_urlTarget",xtype:"combo",width:300,value:0,forceSelection:true,valueField:"value",editable:false,displayField:"text",store:this._targetComboStore,editable:false}]},{xtype:"panel",columnWidth:0.99,header:false,border:false,style:"padding-bottom:10px",autoHeight:true,layout:"column",items:[{id:"actuate_dialog_hyperlink_urlTooltip_label",xtype:"label",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.urlTooltipLabel"),width:92,style:"margin-top:4px"},{id:"actuate_dialog_hyperlink_urlTooltip",xtype:"textfield",width:300}]}]};var C={xtype:"fieldset",id:"actuate_dialog_hyperlink_bookmarkBlock",header:false,border:false,autoHeight:true,layout:"form",items:[{xtype:"panel",columnWidth:0.99,header:false,border:false,style:"padding-bottom:10px",autoHeight:true,layout:"column",items:[{xtype:"label",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.reportBookmarkLabel"),width:92,style:"margin-top:4px"},{id:"actuate_dialog_hyperlink_reportBookmark",xtype:"combo",width:300,forceSelection:true,valueField:"value",displayField:"text",store:this._bookmarkComboStore,style:"cursor: pointer",showTooltip:true,editable:false},{xtype:"button",style:"margin-left:5px",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.ezScriptBtn"),tooltip:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.ezScriptBtn"),tooltipType:"title",id:"actuate_dialog_hyperlink_ezscriptlauncher_type2"}]},{xtype:"panel",columnWidth:0.99,header:false,border:false,style:"padding-bottom:10px",autoHeight:true,layout:"column",items:[{id:"actuate_dialog_hyperlink_bookmarkTooltip_label",xtype:"label",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.bookmarkTooltipLabel"),width:92,style:"margin-top:4px"},{id:"actuate_dialog_hyperlink_bookmarkTooltip",xtype:"textfield",width:300}]}]};var L={xtype:"fieldset",id:"actuate_dialog_hyperlink_drillThroughBlock",header:false,border:false,autoHeight:true,layout:"column",checkboxToggle:false,items:[{xtype:"panel",columnWidth:0.99,header:false,border:false,autoHeight:true,layout:"column",items:[{xtype:"panel",columnWidth:0.99,header:false,border:false,style:"padding-bottom:10px",autoHeight:true,layout:"column",items:[{xtype:"label",columnWidth:0.26,text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.drillThroughReportLabelText")},{xtype:"textfield",columnWidth:0.7,fieldLabel:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.drillThroughReportFieldText"),readOnly:true,showTooltip:true,width:300,id:"actuate_dialog_hyperlink_report"},{xtype:"button",style:"margin-left:5px",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.browseBtn"),tooltip:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.browseBtn"),tooltipType:"title",id:"actuate_dialog_hyperlink_picker"}]},{xtype:"panel",columnWidth:0.99,header:false,border:false,id:"actuate_dialog_hyperlink_parameterList",style:"margin:0 0 10px 104px",autoHeight:true},{xtype:"label",style:"margin:0 0 10px 104px",id:"actuate_dialog_hyperlink_noParameter",columnWidth:0.99,text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.noParameterText")},{xtype:"label",style:"margin:0 0 10px 104px;color:red",id:"actuate_dialog_hyperlink_errorReport",columnWidth:0.99,text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.errorReport")}]},{xtype:"fieldset",columnWidth:1,header:false,collapsible:true,border:false,autoHeight:true,layout:"table",cls:"actuate-hyperlink-moreBlock",id:"actuate_hyperlink_moreBlock",layoutConfig:{columns:3,tableAttr:{style:"width: 100%"}},title:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.moreText"),style:"white-space:nowrap",listeners:{collapse:function(){J.adjustSize();},expand:function(){J.adjustSize();}},items:[{style:"width:94px",border:false,html:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.moreBookmarkText")},{id:"actuate_dialog_hyperlink_moreBookmark",xtype:"combo",store:this._moreBookmarkComboStore,valueField:"value",displayField:"text",editable:false,showTooltip:true,width:305},{xtype:"button",text:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.ezScriptBtn"),tooltip:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.ezScriptBtn"),tooltipType:"title",id:"actuate_dialog_hyperlink_ezscriptlauncher_type3"},{border:false,html:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.moreTargetText")},{id:"actuate_dialog_hyperlink_moreTarget",xtype:"combo",width:305,value:0,forceSelection:true,valueField:"value",displayField:"text",store:this._targetComboStore,editable:false},{style:"width:0px",html:""},{border:false,html:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.moreFileFormatText")},{id:"actuate_dialog_hyperlink_moreFileformat",xtype:"combo",width:305,store:this._formatComboStore,forceSelection:true,valueField:"value",displayField:"text",editable:false},{style:"width:0px",html:""},{id:"actuate_dialog_hyperlink_moreTooltip_label",border:false,html:actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.moreTooltipText")},{id:"actuate_dialog_hyperlink_moreTooltip",xtype:"textfield",width:305},{style:"width:0px",html:""}]}]};G.push(I);G.push(B);G.push(C);G.push(L);this._panel=new actuate.widget.panel.Panel({renderTo:actuate.widget.DomHelper.append(this._instance,{"id":"actuate_hyperlinkDialog_id","cls":""},true),header:false,border:false,autoHeight:true,items:G});this._nolinkRadio=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_nolinkRadio");this._urlRadio=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_urlRadio");this._bookmarkRadio=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_bookmarkRadio");this._drillThroughRadio=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_drillThroughRadio");this._urlBlock=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_urlBlock");this._bookmarkBlock=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_bookmarkBlock");this._drillThroughBlock=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_drillThroughBlock");this._urlLocation=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_urlLocation");this._urlTarget=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_urlTarget");this._urlTooltip=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_urlTooltip");this._urlTooltip_label=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_urlTooltip_label");this._reportBookmarks=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_reportBookmark");this._bookmarkTooltip=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_bookmarkTooltip");this._bookmarkTooltip_label=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_bookmarkTooltip_label");this._userReport=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_report");this._parameterList=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_parameterList");this._noParameter=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_noParameter");this._errorReport=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_errorReport");this._moreBookmark=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_moreBookmark");this._moreTarget=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_moreTarget");this._moreFileformat=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_moreFileformat");this._moreTooltip=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_moreTooltip");this._moreTooltip_label=actuate.widget.ComponentMgr.get("actuate_dialog_hyperlink_moreTooltip_label");this._moreBlock=J._drillThroughBlock.items.items[1];this._moreBlock.header.first().applyStyles({"margin-left":"1px"});this._moreBlock.header.last().applyStyles({"margin-left":"1px"});this._moreBlock.header.applyStyles({"margin-bottom":"3px"});this._filepicker=document.getElementById("actuate_dialog_hyperlink_picker");this._type1_URL_ezscriptlauncher=document.getElementById("actuate_dialog_hyperlink_ezscriptlauncher_type1");this._type2_Bookmark_ezscriptlauncher=document.getElementById("actuate_dialog_hyperlink_ezscriptlauncher_type2");this._type3_Bookmark_ezscriptlauncher=document.getElementById("actuate_dialog_hyperlink_ezscriptlauncher_type3");var H=actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.parameterNameText");var E=actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.parameterValueText");var D=actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.editValueText");var J=this;this._parametersGrid=new actuate.widget.grid.EditorGridPanel({renderTo:"actuate_dialog_hyperlink_parameterList",height:130,width:300,header:false,enableHdMenu:false,enableDragDrop:false,stripeRows:true,clicksToEdit:1,columns:[{header:H,dataIndex:"parameterDisplayName",width:120,sortable:true},{header:E,dataIndex:"parameterValue",editor:new actuate.widget.form.TextField({showTooltip:true}),width:120,sortable:true},{header:D,dataIndex:"edit",width:60,sortable:false}],listeners:{cellclick:function(N,O,M){if(M==2){J._sendEZScriptRequest(N,O,M);}}},viewConfig:{forceFit:true,showTooltip:true,scrollOffset:0},store:this._parametersGridStore});var K=this._parametersGrid.getView();if(K){K.focusCell=function(N,M){};}},_install_eventHandler:function(){this._nolinkRadio.registerEventHandler("check",actuate.Method.bind(this._nolinkUpdate,this),false);this._urlRadio.registerEventHandler("check",actuate.Method.bind(this._urlUpdate,this),false);this._bookmarkRadio.registerEventHandler("check",actuate.Method.bind(this._bookmarkUpdate,this),false);this._drillThroughRadio.registerEventHandler("check",actuate.Method.bind(this._drillThroughUpdate,this),false);actuate.util.Event.observe(this._filepicker,"click",actuate.Method.bind(this._launchPicker,this),false);actuate.util.Event.observe(this._type1_URL_ezscriptlauncher,"click",actuate.Method.bind(this._sendEZScriptRequest,this),false);actuate.util.Event.observe(this._type2_Bookmark_ezscriptlauncher,"click",actuate.Method.bind(this._sendEZScriptRequest,this),false);actuate.util.Event.observe(this._type3_Bookmark_ezscriptlauncher,"click",actuate.Method.bind(this._sendEZScriptRequest,this),false);},_nolinkUpdate:function(){this._reset();this._nolinkRadio.setValue(true,true);this._typeCode=0;this.adjustSize();},_urlUpdate:function(){this._reset();this._urlRadio.setValue(true,true);this._urlLocation.setValue(this.addQuoteToConstantEZScriptExpression(this.urlLocationText));this._urlTooltip.setValue(this.urlTooltipText?this.urlTooltipText:"");if(_isForChart){this._urlTooltip.hide();this._urlTooltip_label.hide();}else{this._urlTooltip.show();this._urlTooltip_label.show();}this.urlTargetValue?this._urlTarget.setValue(this.urlTargetValue):this._urlTarget.setSelectedIndex(0,true);this._urlBlock.show();this._typeCode=1;this.adjustSize();},_bookmarkUpdate:function(){this._reset();var A=this._hyperlinkCache;this._bookmarkRadio.setValue(true,true);if(this.bookmarksTooltipText){this._bookmarkTooltip.setValue(this.bookmarksTooltipText);}else{this._bookmarkTooltip.setValue();}if(_isForChart){this._bookmarkTooltip.hide();this._bookmarkTooltip_label.hide();}else{this._bookmarkTooltip.show();this._bookmarkTooltip_label.show();}this._typeCode=2;if(A===null||!A.reportBookmarks){var B={};var C;C=actuate.util.Json.makeMap({fileName:this.docName,connectionHandle:this.connectionHandle});B[actuate.dialog.impl.EventConstants.__E_GET_BOOKMARKS]=C;this.__sendJson(B,actuate.Method.bind(this.refresh,this));}else{this._bookmarkBlock.show();this.adjustSize();}},_drillThroughUpdate:function(){this._reset();this._drillThroughRadio.setValue(true,true);this._typeCode=3;this._userReport.setValue(this.drillThroughReportName);this.moreTargetValue?this._moreTarget.setValue(this.moreTargetValue):this._moreTarget.setSelectedIndex(0,true);this._moreFileformat.setValue(this.moreFormatValue?this.moreFormatValue:"");this._moreTooltip.setValue(this.moreTooltipText);if(_isForChart){this._moreTooltip.hide();this._moreTooltip_label.hide();}else{this._moreTooltip.show();this._moreTooltip_label.show();}this._moreBookmarkComboStore.removeAll();this._moreBookmark.setValue(this.moreBookmarksText?this.moreBookmarksText:"");this._updateDrillThroughData(this.drillThroughReportName);this._drillThroughBlock.show();this.adjustSize();},_updateDrillThroughData:function(C){if(C){this._moreBlock._expand();var A={};var B;B=actuate.util.Json.makeMap({fileName:this.drillThroughReportName,connectionHandle:this.connectionHandle});A[actuate.dialog.impl.EventConstants.__E_GET_PARAMETERS]=B;A[actuate.dialog.impl.EventConstants.__E_GET_BOOKMARKS]=B;this.__sendJson(A,actuate.Method.bind(this.refresh,this),actuate.Method.bind(this.errorCallback,this));}else{this._moreBlock._collapse();}},errorCallback:function(){this._parameterList.hide();this._noParameter.hide();this._errorReport.show();this._okBtn._onDisable();this.adjustSize();},_launchPicker:function(){actuate.resource.module.feature.require([{module:"actuate.dialog",feature:"FILEPICKER_DIALOG"}],actuate.Method.bind(this._loadFilePicker,this));},_loadFilePicker:function(){var A=actuate.dialog.FilePickerDialog.getInstance();var C=actuate.Method.bind(this._filePickerCallback,this);var B="*.rptdesign,*.rptdocument,*.bizdesign,*.bizdocument";var D=actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.filepicker.filterDescription");A.registerEventHandler(actuate.dialog.impl.EventConstants.ON_DIALOG_OK,C);A.setFileFilters([{"filter":B,"description":D}]);A.setDialogType(A.OPEN_DIALOG);A.setHelpContext(this._helpContext);A.setTitle(actuate.util.Utility.getLocalizedString("filePickerDialog.selectFileTitle"));A.show();},_filePickerCallback:function(B,A){this._fileName=A[0];this._userReport.setValue(this._fileName);this._loadParameters(this._fileName);},_loadParameters:function(A){this._parameterList.hide();this._noParameter.hide();this._errorReport.hide();this._moreTooltip.setValue();this._moreFileformat.setValue();this._isPickerSelect=true;this.drillThroughReportName=A;this._updateDrillThroughData(A);},_setReportDocument:function(A,B){this.docName=A;this.connectionHandle=B;},_reset:function(){this._nolinkRadio.setValue(false,true);this._urlRadio.setValue(false,true);this._bookmarkRadio.setValue(false,true);this._drillThroughRadio.setValue(false,true);this._urlBlock.hide();this._bookmarkBlock.hide();this._drillThroughBlock.hide();this._parameterList.hide();this._noParameter.hide();this._errorReport.hide();this._okBtn._onEnable();},_bindData:function(B){if(!B){this._nolinkUpdate();return ;}this._hyperlinkDefinition=null;var A=parseInt(B.hyperlinkType);_isForChart=B.bindingName==undefined;switch(A){case 0:this._nolinkUpdate();break;case 1:this.urlLocationText=B.hyperlinkDefinition.location;this.urlTooltipText=B.hyperlinkDefinition.tooltip;this.urlTargetValue=B.hyperlinkDefinition.target;this._urlUpdate();break;case 2:this.bookmarksTooltipText=B.hyperlinkDefinition.tooltip;this.bookmarksText=B.hyperlinkDefinition.bookmarks;this._bookmarkUpdate();break;case 3:this.drillThroughReportName=B.hyperlinkDefinition.report;this.moreTargetValue=B.hyperlinkDefinition.target;this.moreFormatValue=B.hyperlinkDefinition.format;this.moreTooltipText=B.hyperlinkDefinition.tooltip;this.moreBookmarksText=B.hyperlinkDefinition.bookmarks;this.reportParameters=B.hyperlinkDefinition.parameters;this._onDrillEdit=true;this._drillThroughUpdate();break;default:this._urlUpdate();}this._okBtn._onEnable();this.showDialog();},refresh:function(G){if(G==null){return ;}if(!this._hyperlinkCache){this._hyperlinkCache={};}if(this._typeCode==2){var C=[];if(G.bookmarks){if(G.bookmarks.length>0){C=[""];}for(var D=0;D<G.bookmarks.length;D++){var E=this.addQuoteToConstantEZScriptExpression(G.bookmarks[D].Bookmark);if(E.indexOf("row[")==0){E=E.replace('row["',"[");E=E.replace('"]',"]");}C.push([E,E]);}}this._bookmarkComboStore.loadData(C);if(this.bookmarksText){this._reportBookmarks.setValue(this.bookmarksText);}else{this._reportBookmarks.setValue("");}if(C.length>0){this._reportBookmarks.setDisabled(false);}else{this._reportBookmarks.setDisabled(true);}this._bookmarkBlock.show();this._hyperlinkCache.reportBookmarks=G.bookmarks;}else{if(this._typeCode==3){this._okBtn._onEnable();if(G.parameters){var C=[];for(parameterName in G.parameters){for(parameterDisplayName in G.parameterNamePairs){if(parameterName==parameterDisplayName){if(this.reportParameters){var F=this.reportParameters[G.parameterNamePairs[parameterName]];var B=F;var A=G.parameters[parameterName];if(!G.parameterProps[parameterName].isRequired){B=this._handleNoValue(F);A=this._handleNoValue(A);}B=this.addQuoteToConstantEZScriptExpression(B);A=this.addQuoteToConstantEZScriptExpression(A);C.push([parameterDisplayName,G.parameterNamePairs[parameterDisplayName],F?B:A,"..."]);}else{var B=G.parameters[parameterName];if(!G.parameterProps[parameterName].isRequired){B=this._handleNoValue(B);}var A=this.addQuoteToConstantEZScriptExpression(B);C.push([parameterDisplayName,G.parameterNamePairs[parameterDisplayName],A,"..."]);}}}}this._parametersStore=C;this._parametersGridStore.loadData(C);this._parametersGrid.render();this._parameterList.show();}else{this._noParameter.show();}if(G.bookmarks){var C=[];if(G.bookmarks.length>0){C=[""];}for(var D=0;D<G.bookmarks.length;D++){var E=this.addQuoteToConstantEZScriptExpression(G.bookmarks[D].Bookmark);if(E.indexOf("row[")==0){E=E.replace('row["',"[");E=E.replace('"]',"]");}C.push([E,E]);}this._moreBookmarkComboStore.loadData(C);if(this._isPickerSelect){this._moreBookmark.setValue("");}if(C.length>0){this._moreBookmark.setDisabled(false);}else{this._moreBookmark.setDisabled(true);}}else{this._moreBookmarkComboStore.removeAll();if(!this.moreBookmarksText){this._moreBookmark.setValue("");}this._moreBookmark.setDisabled(true);}this._isPickerSelect=false;}}actuate.dialog.impl.helper.hyperlinkBuilder.HyperlinkBuilderDialog.superclass.refresh.apply(this,arguments);},_handleNoValue:function(A){if(!A||A.length==0){A="-No Value-";}else{if(A.indexOf("Null")!=-1){A=A.replace("Null","-No Value-");}else{if(A.indexOf("null")!=-1){A=A.replace("null","-No Value-");}else{if(A.indexOf("NULL")!=-1){A=A.replace("NULL","-No Value-");}}}}return A;},__getHelpTopic:function(){return"hyperlink";},__validate:function(){var B=actuate.dialog.impl.helper.hyperlinkBuilder.HyperlinkBuilderDialog.superclass.__validate.apply(this.arguments);var A;if(this._okBtn.isDisabled()){B=false;}else{if(B){switch(this._typeCode){case 1:B=this._urlLocation.getValue().length>0;if(!B){A=actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.invalidURL");}break;case 2:B=this._isReportBookmarkNotEmpty(this._reportBookmarks.getValue());if(!B){A=actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.emptyReportBookmark");}break;case 3:B=this._isDrillThroughReportNotEmpty(this._userReport.getValue());if(!B){A=actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.emptyDrillThroughReport");}break;default:break;}}if(!B){this.__popupErrorDialog(A);}}return B;},_isURL:function(A){var B="^((https|http|ftp|rtsp|mms)?://)"+"+(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?"+"(([0-9]{1,3}.){3}[0-9]{1,3}"+"|"+"([0-9a-z_!~*'()-]+.)*"+"([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]."+"[a-z]{2,6})"+"(:[0-9]{1,4})?"+"((/?)|"+"(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";return new RegExp(B).test(A);},_isReportBookmarkNotEmpty:function(A){if(!A){return false;}return true;},_isDrillThroughReportNotEmpty:function(A){if(!A){return false;}return true;},__createResult:function(){var A=actuate.util.XmlDom.createXMLDom(actuate.util.Constants.soap.NAMESPACE_ACTUATE10,actuate.Constant.tag.Data);this._createJsonData(A);return A.documentElement;},_createJsonData:function(G){switch(this._typeCode){case 1:this._hyperlinkDefinition={"location":this._urlLocation.getValue(),"target":this._urlTarget.getValue(),"tooltip":this._urlTooltip.getValue()};break;case 2:this._hyperlinkDefinition={"bookmarks":this._reportBookmarks.getValue(),"tooltip":this._bookmarkTooltip.getValue()};break;case 3:var B=this._parametersGridStore.data.items;var D={};for(var E=0;E<B.length;E++){if(B[E].data.parameterValue){var F=B[E].data.parameterValue;if(F.indexOf("-No Value")!=-1){if(F.indexOf("|")!=-1){F=F.replace("-No Value-","Null");}else{F="";}}D[B[E].data.parameterName]=F;}}this._hyperlinkDefinition={"report":this._userReport.getValue(),"parameters":D,"bookmarks":this._moreBookmark.getValue(),"target":parseInt(this._moreTarget.getValue()),"format":this._moreFileformat.getValue(),"tooltip":this._moreTooltip.getValue()};break;default:this._hyperlinkDefinition=null;break;}var A={"hyperlinkType":this._typeCode,"hyperlinkDefinition":this._hyperlinkDefinition};var C=actuate.util.XmlDom.createElement(G,actuate.Constant.tag.Json);var H=G.createTextNode(actuate.util.Json.makeObject(A));C.appendChild(H);G.documentElement.appendChild(C);return G;},_clearAll:function(){this.urlLocationText=null;this.urlTooltipText=null;this.urlTargetValue=null;this.bookmarksTooltipText=null;this.drillThroughReportName=null;this.moreTargetValue=null;this.moreFormatValue=null;this.moreTooltipText=null;this.moreBookmarksText=null;this.reportParameters=null;this._onDrillEdit=false;this._hyperlinkCache=null;this.bookmarksText=null;},_sendEZScriptRequest:function(C,F,B){if(this._consumer&&this._consumer._eventDispatcher){var E;var D;switch(this._typeCode){case 1:E=this._urlLocation.getValue();break;case 2:E=this.addQuoteToConstantEZScriptExpression(this._reportBookmarks.getValue());this._reportBookmarks.collapse(true);if(this._bookmarkComboStore.data.items.length==0){D=actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.noReportBookmark");}break;case 3:if(B){var A=this._parametersGridStore.data.items;E=this._parametersGridStore.data.items[F].data.parameterValue;this._parameterIndex=F;}else{E=this.addQuoteToConstantEZScriptExpression(this._moreBookmark.getValue());this._moreBookmark.collapse(true);if(this._moreBookmarkComboStore.data.items.length==0){D=actuate.util.Utility.getLocalizedString("hyperlinkBuilderDialog.noReportBookmark");}}break;default:E="";}if(D){this.__popupInformationDialog(D);}else{this._consumer._eventDispatcher.broadcastEvent(actuate.builder.impl.event.__E_LAUNCH_EZSCRIPT_BUILDER,E);}}},_updateExpression:function(A){switch(this._typeCode){case 1:this._urlLocation.setValue(A);break;case 2:this._reportBookmarks.setValue(A);break;case 3:if(this._parameterIndex!=-1){this._parametersStore[this._parameterIndex][2]=A;this._parametersGridStore.loadData(this._parametersStore);this._parametersGrid.render();this._parameterIndex=-1;}else{this._moreBookmark.setValue(A);}break;default:return ;}},addQuoteToConstantEZScriptExpression:function(A){if(!A||A.length==0){return"";}if(this.isColumnBindingInExpression(A)){return A;}if(this.isExpressionQuoted(A)){return A;}return this._QUOTE+A+this._QUOTE;},isColumnBindingInExpression:function(A){return A.indexOf(this._Value_ColumnBinding_Prefix)!=-1&&A.indexOf(this._Value_ColumnBinding_Suffix)!=-1;},isExpressionQuoted:function(A){return A.indexOf(this._QUOTE)==0&&A.slice(-this._QUOTE.length)==this._QUOTE;},_noComma:null});