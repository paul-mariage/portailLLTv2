actuate.util.Package.define("actuate.dialog.impl.helper.flexcomponentbuilder");actuate.dialog.impl.helper.flexcomponentbuilder.FlexCrosstabFormatTab=actuate.Class.create();actuate.dialog.impl.helper.flexcomponentbuilder.FlexCrosstabFormatTab.prototype=actuate.Class.extend(new actuate.dialog.impl.helper.flexcomponentbuilder.FlexComponentFormatTab(),{_classname:"actuate.dialog.impl.helper.flexcomponentbuilder.FlexCrosstabFormatTab",_FLEXCOMPONENTTYPE:"Flex Crosstab",_AUTO:"Auto",_FONTFAMILY_DEFAULT:"Verdana",_GENERALPROP_FONTSIZE_DEFAULT:12,_HORIZONTAL_ALIGNMENT_DEFAULT:"left",_WORDWRAP_DEFAULT:false,_TOOLTIP_DEFAULT:false,_GENERALPROP_BOLD_DEFAULT:false,_GENERALPROP_ITALICS_DEFAULT:false,_GENERALPROP_UNDERLINE_DEFAULT:false,_VISIBLE_DEFAULT:true,_DROPSHADOW_DEFAULT:true,_HORIZONTALGRIDLINE_DEFAULT:false,_VERTICALGRIDLINE_DEFAULT:true,_SINGLECOLOR_DEFAULT:false,_ALTERNATINGCOLOR_DEFAULT:true,initialize:function(){this.id=this._getId(this._classname);this._title=actuate.util.Utility.getLocalizedString("tableBuilder.format");actuate.dialog.impl.helper.flexcomponentbuilder.FlexComponentFormatTab.prototype.initialize.call(this);this._defineObjects();},_initContent:function(){this._componentArray=[];var D=this._setColumnHeader(actuate.util.Utility.getLocalizedString("FlexComponentBuilderDialog.columnHeader"),this.id+"_columnHeader");this._componentArray.push(D);var C=navigator.userAgent;if(/MSIE 7.(\d+);/.test(C)){var A=this._setDataRows(actuate.util.Utility.getLocalizedString("FlexComponentBuilderDialog.dataRow"),this.id+"_dataRow",true);this._componentArray.push(A);var B=this._setGeneralProperties(actuate.util.Utility.getLocalizedString("FlexComponentBuilderDialog.generalProperties"),this.id+"_generalProp",true);this._componentArray.push(B);}else{var A=this._setDataRows(actuate.util.Utility.getLocalizedString("FlexComponentBuilderDialog.dataRow"),this.id+"_dataRow",false);this._componentArray.push(A);var B=this._setGeneralProperties(actuate.util.Utility.getLocalizedString("FlexComponentBuilderDialog.generalProperties"),this.id+"_generalProp",false);this._componentArray.push(B);}},_defineObjects:function(){this._columnHeaderBgColor1=actuate.widget.ComponentMgr.get(this.id+"_columnHeaderBgColor1");this._columnHeaderWordwrap=actuate.widget.ComponentMgr.get(this.id+"_columnHeaderWordwrap");this._dataRowBgColor1=actuate.widget.ComponentMgr.get(this.id+"_dataRowBgColor1");this._dataRowBgColor2=actuate.widget.ComponentMgr.get(this.id+"_dataRowBgColor2");this._dataRowWordwrap=actuate.widget.ComponentMgr.get(this.id+"_dataRowWordwrap");this._dataRowSingleColorRadioButton=actuate.widget.ComponentMgr.get(this.id+"_dataRowSingleColorRadioButton");this._dataRowAlternatingColorRadioButton=actuate.widget.ComponentMgr.get(this.id+"_dataRowAlternatingColorRadioButton");this._generalPropBorderColor=actuate.widget.ComponentMgr.get(this.id+"_generalPropBorderColor");this._generalPropBorderColorHGL=actuate.widget.ComponentMgr.get(this.id+"_generalPropBorderColorHGL");this._generalPropBorderColorVGL=actuate.widget.ComponentMgr.get(this.id+"_generalPropBorderColorVGL");this._generalPropVisible=actuate.widget.ComponentMgr.get(this.id+"_generalPropVisible");this._generalPropDropShadow=actuate.widget.ComponentMgr.get(this.id+"_generalPropDropShadow");this._generalPropHGLCheckBox=actuate.widget.ComponentMgr.get(this.id+"_generalPropHGLCheckBox");this._generalPropVGLCheckBox=actuate.widget.ComponentMgr.get(this.id+"_generalPropVGLCheckBox");this._generalPropShowTooltip=actuate.widget.ComponentMgr.get(this.id+"_generalPropShowTooltip");this._generalPropFontType=actuate.widget.ComponentMgr.get(this.id+"_generalPropFontType");this._generalPropFontSize=actuate.widget.ComponentMgr.get(this.id+"_generalPropFontSize");this._generalPropFontColor=actuate.widget.ComponentMgr.get(this.id+"_generalPropFontColor");this._generalPropBold=actuate.widget.ComponentMgr.get(this.id+"_generalPropBold");this._generalPropItalic=actuate.widget.ComponentMgr.get(this.id+"_generalPropItalic");this._generalPropUnderline=actuate.widget.ComponentMgr.get(this.id+"_generalPropUnderline");this._generalPropLeft=actuate.widget.ComponentMgr.get(this.id+"_generalPropLeft");this._generalPropRight=actuate.widget.ComponentMgr.get(this.id+"_generalPropRight");this._generalPropCenter=actuate.widget.ComponentMgr.get(this.id+"_generalPropCenter");this._addCrosstabHandlers();},_addCrosstabHandlers:function(){this._onChangeCheckBox_c=actuate.Method.bind(this._onChangeCheckBox,this);if(this._generalPropVisible){this._generalPropVisible.registerEventHandler("check",this._onChangeCheckBox_c);}if(this._generalPropDropShadow){this._generalPropDropShadow.registerEventHandler("check",this._onChangeCheckBox_c);}if(this._generalPropHGLCheckBox){this._generalPropHGLCheckBox.registerEventHandler("check",this._onChangeCheckBox_c);}if(this._generalPropVGLCheckBox){this._generalPropVGLCheckBox.registerEventHandler("check",this._onChangeCheckBox_c);}if(this._generalPropShowTooltip){this._generalPropShowTooltip.registerEventHandler("check",this._onChangeCheckBox_c);}if(this._dataRowWordwrap){this._dataRowWordwrap.registerEventHandler("check",this._onChangeCheckBox_c);}if(this._columnHeaderWordwrap){this._columnHeaderWordwrap.registerEventHandler("check",this._onChangeCheckBox_c);}this._eh_toggleButton_c=actuate.Method.bind(this._eh_toggleButton,this);if(this._generalPropBold){this._generalPropBold.registerEventHandler("click",this._eh_toggleButton_c);}if(this._generalPropItalic){this._generalPropItalic.registerEventHandler("click",this._eh_toggleButton_c);}if(this._generalPropUnderline){this._generalPropUnderline.registerEventHandler("click",this._eh_toggleButton_c);}this._eh_setAlignment_c=actuate.Method.bind(this._eh_setAlignment,this);if(this._generalPropLeft){this._generalPropLeft.registerEventHandler("click",this._eh_setAlignment_c);}if(this._generalPropCenter){this._generalPropCenter.registerEventHandler("click",this._eh_setAlignment_c);}if(this._generalPropRight){this._generalPropRight.registerEventHandler("click",this._eh_setAlignment_c);}},_setColumnHeader:function(D,C){var A=this;var B={xtype:"fieldset",title:D,checkboxToggle:false,collapsible:true,defaults:{border:false,layout:"form",width:480,bodyStyle:"padding:1px 4px 2px 4px"},listeners:{collapse:function(){if(A._parentDialog&&A._parentDialog.adjustSize){A._parentDialog.adjustSize();}},expand:function(){if(A._parentDialog&&A._parentDialog.adjustSize){A._parentDialog.adjustSize();}}},items:[{layout:"column",items:[{width:105,text:actuate.util.Utility.getLocalizedString("tableBuilder.background"),xtype:"label"},{id:C+"BgColor1",width:142,value:"Auto",editable:false,xtype:"colorfield"}]},{layout:"column",items:[{columnWidth:0.3,id:C+"Wordwrap",xtype:"checkbox",checked:false,boxLabel:actuate.util.Utility.getLocalizedString("FlexComponentBuilderDialog.wordWrap")}]}]};return B;},_setDataRows:function(E,C,D){var A=this;var B={xtype:"fieldset",title:E,checkboxToggle:false,collapsible:true,defaults:{border:false,layout:"form",width:480,bodyStyle:"padding:1px 4px 2px 4px"},listeners:{collapse:function(){if(A._parentDialog&&A._parentDialog.adjustSize){A._parentDialog.adjustSize();}},expand:function(){if(A._parentDialog&&A._parentDialog.adjustSize){A._parentDialog.adjustSize();}}},items:[{layout:"column",items:[{width:105,text:actuate.util.Utility.getLocalizedString("tableBuilder.background"),xtype:"label"},{id:C+"SingleColorRadioButton",xtype:"radio",checked:true,boxLabel:actuate.util.Utility.getLocalizedString("FlexComponentBuilderDialog.single"),handler:function(H){var G=actuate.widget.ComponentMgr.get(C+"AlternatingColorRadioButton");var F=actuate.widget.ComponentMgr.get(C+"SingleColorRadioButton");var I=actuate.widget.ComponentMgr.get(C+"BgColor2");if(H.checked){G.setValue(false);F.setValue(true);I.setDisabled(true);}}},{columnWidth:0.03,xtype:"label",style:"height:1px"},{id:C+"AlternatingColorRadioButton",xtype:"radio",checked:false,boxLabel:actuate.util.Utility.getLocalizedString("FlexComponentBuilderDialog.alternating"),handler:function(H){var G=actuate.widget.ComponentMgr.get(C+"AlternatingColorRadioButton");var F=actuate.widget.ComponentMgr.get(C+"SingleColorRadioButton");var I=actuate.widget.ComponentMgr.get(C+"BgColor2");if(H.checked){F.setValue(false);G.setValue(true);I.setDisabled(false);}}}]},{layout:"column",items:[{width:105,text:" ",xtype:"label",hidden:D},{width:105,xtype:"label",style:"height:1px"},{id:C+"BgColor1",width:142,value:"Auto",editable:false,xtype:"colorfield"},{width:7,xtype:"label",style:"height:1px"},{id:C+"BgColor2",width:142,value:"Auto",editable:false,xtype:"colorfield"}]},{layout:"column",items:[{columnWidth:0.3,id:C+"Wordwrap",xtype:"checkbox",checked:false,boxLabel:actuate.util.Utility.getLocalizedString("FlexComponentBuilderDialog.wordWrap")}]}]};return B;},_setGeneralProperties:function(E,C,D){var B=this;var A={xtype:"fieldset",autoHeight:true,title:E,checkboxToggle:false,collapsible:true,defaults:{border:false,header:false,layout:"column",bodyStyle:"padding:2px 4px 2px 4px"},listeners:{collapse:function(){if(B._parentDialog&&B._parentDialog.adjustSize){B._parentDialog.adjustSize();}},expand:function(){if(B._parentDialog&&B._parentDialog.adjustSize){B._parentDialog.adjustSize();}}},items:[{layout:"column",items:[{xtype:"label",text:actuate.util.Utility.getLocalizedString("tableBuilder.font"),width:105},{id:C+"FontType",width:100,xtype:"combo",editable:false,forceSelection:true,store:this._fontOptionsStore},{id:C+"FontSize",width:35,xtype:"combo",editable:true,style:"margin-left:5px;margin-right: 5px;",forceSelection:true,store:this._fontSizeStore},{width:2,xtype:"label",style:"height:1px"},{id:C+"Bold",icon:"dashboard/images/gadgets/table/text_bold_off.png",cls:"actuate_table_builder_format_buttons",xtype:"button"},{id:C+"Italic",icon:"dashboard/images/gadgets/table/text_italic_off.png",cls:"actuate_table_builder_format_buttons",xtype:"button"},{id:C+"Underline",icon:"dashboard/images/gadgets/table/text_underline_off.png",cls:"actuate_table_builder_format_buttons",xtype:"button"}]},{layout:"column",items:[{xtype:"label",text:actuate.util.Utility.getLocalizedString("tableBuilder.fontColor"),width:105},{id:C+"FontColor",width:142,value:"Auto",editable:false,xtype:"colorfield"}]},{layout:"column",items:[{xtype:"label",text:actuate.util.Utility.getLocalizedString("tableBuilder.alignment"),width:105},{id:C+"Left",icon:"dashboard/images/gadgets/table/alignment_left_on.png",cls:"actuate_table_builder_format_buttons",xtype:"button"},{id:C+"Center",icon:"dashboard/images/gadgets/table/alignment_center_off.png",cls:"actuate_table_builder_format_buttons",xtype:"button"},{id:C+"Right",icon:"dashboard/images/gadgets/table/alignment_right_off.png",cls:"actuate_table_builder_format_buttons",xtype:"button"}]},{layout:"column",items:[{width:105,xtype:"label",text:actuate.util.Utility.getLocalizedString("tableBuilder.border")},{id:C+"Visible",xtype:"checkbox",width:75,checked:true,boxLabel:actuate.util.Utility.getLocalizedString("FlexComponentBuilderDialog.visible"),handler:function(){var F=actuate.widget.ComponentMgr.get(C+"BorderColor");if(this.checked){F.setDisabled(false);}else{F.setDisabled(true);}}},{width:5,xtype:"label",style:"height:1px"},{id:C+"BorderColor",fieldLabel:actuate.util.Utility.getLocalizedString("tableBuilder.border"),width:124,value:"Auto",editable:false,xtype:"colorfield"},{width:7,xtype:"label",style:"height:1px"},{id:C+"DropShadow",xtype:"checkbox",width:80,checked:false,boxLabel:actuate.util.Utility.getLocalizedString("FlexComponentBuilderDialog.dropShadow")}]},{layout:"column",items:[{width:105,xtype:"label",text:actuate.util.Utility.getLocalizedString("FlexComponentBuilderDialog.gridLines")},{id:C+"HGLCheckBox",xtype:"checkbox",width:75,checked:true,boxLabel:actuate.util.Utility.getLocalizedString("FlexComponentBuilderDialog.horizontalGridLines"),handler:function(){var F=actuate.widget.ComponentMgr.get(C+"BorderColorHGL");if(this.checked){F.setDisabled(false);}else{F.setDisabled(true);}}},{width:5,xtype:"label",style:"height:1px"},{id:C+"BorderColorHGL",width:124,fieldLabel:actuate.util.Utility.getLocalizedString("tableBuilder.border"),value:"Auto",editable:false,xtype:"colorfield"}]},{layout:"column",items:[{width:105,text:" ",xtype:"label",hidden:D},{width:105,xtype:"label",style:"height:1px"},{id:C+"VGLCheckBox",xtype:"checkbox",width:75,checked:true,boxLabel:actuate.util.Utility.getLocalizedString("FlexComponentBuilderDialog.verticalGridLines"),handler:function(){var F=actuate.widget.ComponentMgr.get(C+"BorderColorVGL");if(this.checked){F.setDisabled(false);}else{F.setDisabled(true);}}},{width:5,xtype:"label",style:"height:1px"},{id:C+"BorderColorVGL",width:124,fieldLabel:actuate.util.Utility.getLocalizedString("tableBuilder.border"),value:"Auto",editable:false,xtype:"colorfield"}]},{layout:"column",items:[{columnWidth:0.3,id:C+"ShowTooltip",xtype:"checkbox",checked:false,boxLabel:actuate.util.Utility.getLocalizedString("FlexComponentBuilderDialog.tooltip")}]}]};return A;},loadData:function(A){if(A.Format){if(A.Format.width){this._width=A.Format.width.measure+A.Format.width.units;}if(A.Format.height){this._height=A.Format.height.measure+A.Format.height.units;}if(this._updateColumnHeader){this._updateColumnHeader(A);}if(this._updateDataRow){this._updateDataRow(A);}if(this._updateGeneralProperties){this._updateGeneralProperties(A);}}else{if(A.operationData&&A.operationData.gadgetAttr){this._updateSize(A.operationData.gadgetAttr);}this._updateMenuOptions();}},_setMenuOptions:function(){this._generalPropFontType.setStore(this._fontOptionsStore);this._generalPropFontSize.setStore(this._fontSizeStore);},_reset:function(){this._columnHeaderBgColor1.setValue(this._AUTO);this._columnHeaderWordwrap.setValue(this._WORDWRAP_DEFAULT);this._dataRowBgColor1.setValue(this._AUTO);this._dataRowBgColor2.setValue(this._AUTO);this._dataRowWordwrap.setValue(this._WORDWRAP_DEFAULT);this._dataRowSingleColorRadioButton.setValue(this._SINGLECOLOR_DEFAULT);this._dataRowAlternatingColorRadioButton.setValue(this._ALTERNATINGCOLOR_DEFAULT);this._generalPropBorderColor.setValue(this._AUTO);this._generalPropBorderColorHGL.setValue(this._AUTO);this._generalPropBorderColorVGL.setValue(this._AUTO);this._generalPropVisible.setValue(this._VISIBLE_DEFAULT);this._generalPropDropShadow.setValue(this._DROPSHADOW_DEFAULT);this._generalPropHGLCheckBox.setValue(this._HORIZONTALGRIDLINE_DEFAULT);this._generalPropVGLCheckBox.setValue(this._VERTICALGRIDLINE_DEFAULT);this._generalPropShowTooltip.setValue(this._TOOLTIP_DEFAULT);this._generalPropFontType.setValue(this._FONTFAMILY_DEFAULT);this._generalPropFontSize.setValue(this._GENERALPROP_FONTSIZE_DEFAULT);this._generalPropFontColor.setValue(this._AUTO);if(this._generalPropLeft._ele!=null){this._generalPropLeft.setIcon("dashboard/images/gadgets/table/alignment_left_on.png");}if(this._generalPropRight._ele!=null){this._generalPropRight.setIcon("dashboard/images/gadgets/table/alignment_right_off.png");}if(this._generalPropCenter._ele!=null){this._generalPropCenter.setIcon("dashboard/images/gadgets/table/alignment_center_off.png");}if(this._generalPropBold._ele!=null){this._generalPropBold.setIcon("dashboard/images/gadgets/table/text_bold_off.png");}if(this._generalPropItalic._ele!=null){this._generalPropItalic.setIcon("dashboard/images/gadgets/table/text_italic_off.png");}if(this._generalPropUnderline._ele!=null){this._generalPropUnderline.setIcon("dashboard/images/gadgets/table/text_underline_off.png");}},_updateColumnHeader:function(A){if(A.Format){if(A.Format.HeaderBackgroundColor){this._columnHeaderBgColor1.setValue(A.Format.HeaderBackgroundColor);}if(A.Format.HeaderWordwrap){this._columnHeaderWordwrap.setValue(!this._WORDWRAP_DEFAULT);}}},_updateDataRow:function(A){if(A.Format){if(A.Format.RowBackgroundColor1){this._dataRowBgColor1.setValue(A.Format.RowBackgroundColor1);}if(A.Format.RowBackgroundColor2){this._dataRowBgColor2.setValue(A.Format.RowBackgroundColor2);}if(A.Format.RowWordwrap){this._dataRowWordwrap.setValue(!this._WORDWRAP_DEFAULT);}if(A.Format.Single){this._dataRowAlternatingColorRadioButton.setValue(!this._ALTERNATINGCOLOR_DEFAULT);this._dataRowSingleColorRadioButton.setValue(!this._SINGLECOLOR_DEFAULT);}}},_updateGeneralProperties:function(A){if(A.Format){if(A.Format.Visible){this._generalPropVisible.setValue(!this._VISIBLE_DEFAULT);}if(A.Format.DropShadow){this._generalPropDropShadow.setValue(!this._DROPSHADOW_DEFAULT);}if(A.Format.HGL){this._generalPropHGLCheckBox.setValue(!this._HORIZONTALGRIDLINE_DEFAULT);}else{this._generalPropHGLCheckBox.setValue(this._HORIZONTALGRIDLINE_DEFAULT);}if(A.Format.VGL){this._generalPropVGLCheckBox.setValue(!this._VERTICALGRIDLINE_DEFAULT);}else{this._generalPropVGLCheckBox.setValue(this._VERTICALGRIDLINE_DEFAULT);}if(A.Format.Tooltip){this._generalPropShowTooltip.setValue(!this._TOOLTIP_DEFAULT);}if(A.Format.BorderColor){this._generalPropBorderColor.setValue(A.Format.BorderColor);}if(A.Format.HGLBorderColor){this._generalPropBorderColorHGL.setValue(A.Format.HGLBorderColor);}if(A.Format.VGLBorderColor){this._generalPropBorderColorVGL.setValue(A.Format.VGLBorderColor);}if(A.Format.GeneralPropFontFamily){this._generalPropFontType.setValue(A.Format.GeneralPropFontFamily);}if(A.Format.GeneralPropFontColor){this._generalPropFontColor.setValue(A.Format.GeneralPropFontColor);}if(A.Format.GeneralPropFontSize){this._generalPropFontSize.setValue(A.Format.GeneralPropFontSize);}if(A.Format.GeneralPropBold){this._generalPropBold.setIcon("dashboard/images/gadgets/table/text_bold_on.png");}else{this._generalPropBold.setIcon("dashboard/images/gadgets/table/text_bold_off.png");}if(A.Format.GeneralPropItalic){this._generalPropItalic.setIcon("dashboard/images/gadgets/table/text_italic_on.png");}else{this._generalPropItalic.setIcon("dashboard/images/gadgets/table/text_italic_off.png");}if(A.Format.GeneralPropUnderline){this._generalPropUnderline.setIcon("dashboard/images/gadgets/table/text_underline_on.png");}else{this._generalPropUnderline.setIcon("dashboard/images/gadgets/table/text_underline_off.png");}if(A.Format.GeneralPropHorizontalAlignment=="center"){this._generalPropLeft.setIcon("dashboard/images/gadgets/table/alignment_left_off.png");this._generalPropCenter.setIcon("dashboard/images/gadgets/table/alignment_center_on.png");}else{if(A.Format.GeneralPropHorizontalAlignment=="right"){this._generalPropLeft.setIcon("dashboard/images/gadgets/table/alignment_left_off.png");this._generalPropRight.setIcon("dashboard/images/gadgets/table/alignment_right_on.png");}}}},createSoapNode:function(B,C){if(C){this._JSON=actuate.util.Json;this._json=",";if(B.childNodes.length==0){this._json="{";}var A={};A.value=this._width;this._json=this._json+"width"+":";this._json+=this._JSON.makeMap(A);this._makeJsonRecord("height",this._height);if(this._columnHeaderBgColor1.getValue().toUpperCase()!=(this._AUTO).toUpperCase()){this._makeJsonRecord("HeaderBackgroundColor",this._columnHeaderBgColor1.getHexValue());}if(this._columnHeaderWordwrap.getValue()){this._makeJsonRecord("HeaderWordwrap",(!this._WORDWRAP_DEFAULT).toString());}if(this._dataRowBgColor1.getValue().toUpperCase()!=(this._AUTO).toUpperCase()){this._makeJsonRecord("RowBackgroundColor1",this._dataRowBgColor1.getHexValue());}if(this._dataRowBgColor2.getValue().toUpperCase()!=(this._AUTO).toUpperCase()){this._makeJsonRecord("RowBackgroundColor2",this._dataRowBgColor2.getHexValue());}if(this._dataRowWordwrap.getValue()){this._makeJsonRecord("RowWordwrap",(!this._WORDWRAP_DEFAULT).toString());}if(this._dataRowSingleColorRadioButton.getValue()){this._makeJsonRecord("Single",(!this._SINGLECOLOR_DEFAULT).toString());}if(!this._generalPropVisible.getValue()){this._makeJsonRecord("Visible",(!this._VISIBLE_DEFAULT).toString());}if(!this._generalPropDropShadow.getValue()){this._makeJsonRecord("DropShadow",(!this._DROPSHADOW_DEFAULT).toString());}if(this._generalPropHGLCheckBox.getValue()){this._makeJsonRecord("HGL",(!this._HORIZONTALGRIDLINE_DEFAULT).toString());}if(!this._generalPropVGLCheckBox.getValue()){this._makeJsonRecord("VGL",(!this._VERTICALGRIDLINE_DEFAULT).toString());}if(this._generalPropShowTooltip.getValue()){this._makeJsonRecord("Tooltip",(!this._TOOLTIP_DEFAULT).toString());}if(this._generalPropBorderColor.getValue().toUpperCase()!=(this._AUTO).toUpperCase()){this._makeJsonRecord("BorderColor",this._generalPropBorderColor.getHexValue());}if(this._generalPropBorderColorHGL.getValue().toUpperCase()!=(this._AUTO).toUpperCase()){this._makeJsonRecord("HGLBorderColor",this._generalPropBorderColorHGL.getHexValue());}if(this._generalPropBorderColorVGL.getValue().toUpperCase()!=(this._AUTO).toUpperCase()){this._makeJsonRecord("VGLBorderColor",this._generalPropBorderColorVGL.getHexValue());}if(this._generalPropFontColor.getValue().toUpperCase()!=(this._AUTO).toUpperCase()){this._makeJsonRecord("GeneralPropFontColor",this._generalPropFontColor.getHexValue());}if(this._generalPropFontType.getValue()!=this._FONTFAMILY_DEFAULT){this._makeJsonRecord("GeneralPropFontFamily",this._generalPropFontType.getValue());}if(this._generalPropFontSize.getValue()!=this._GENERALPROP_FONTSIZE_DEFAULT){this._makeJsonRecord("GeneralPropFontSize",this._generalPropFontSize.getValue().toString());}if(this._getButtonValue(this._generalPropBold)){this._makeJsonRecord("GeneralPropBold",(!this._GENERALPROP_BOLD_DEFAULT).toString());}if(this._getButtonValue(this._generalPropItalic)){this._makeJsonRecord("GeneralPropItalic",(!this._GENERALPROP_ITALICS_DEFAULT),toString());}if(this._getButtonValue(this._generalPropUnderline)){this._makeJsonRecord("GeneralPropUnderline",(!this._GENERALPROP_UNDERLINE_DEFAULT).toString());}if(this._getGeneralPropAlignment()!=this._HORIZONTAL_ALIGNMENT_DEFAULT){this._makeJsonRecord("GeneralPropAlignment",this._getGeneralPropAlignment());}this._makeJsonRecord("FlexComponentType",this._FLEXCOMPONENTTYPE);this._json+="}";var D=C.createTextNode(this._json);B.appendChild(D);}},_makeJsonRecord:function(B,C){var A={};A.value=C;this._json=this._json+","+B+":";this._json+=this._JSON.makeMap(A);},_getGeneralPropAlignment:function(){if(this._generalPropLeft.icon.indexOf("_on.png")>-1){return"left";}else{if(this._generalPropCenter.icon.indexOf("_on.png")>-1){return"center";}else{if(this._generalPropRight.icon.indexOf("_on.png")>-1){return"right";}}}}});