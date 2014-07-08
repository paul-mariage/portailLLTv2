actuate.util.Package.define("actuate.dialog.impl.helper.chartbuilder");actuate.dialog.impl.helper.chartbuilder.PieChartFormatTab=actuate.Class.extendClass(actuate.dialog.impl.helper.chartbuilder.BaseChartFormatTab,{_classname:"actuate.dialog.impl.helper.chartbuilder.PieChartFormatTab",initialize:function(){this.id=this._getId(this._classname);this._title=actuate.util.Utility.getLocalizedString("chartBuilder.format");actuate.dialog.impl.helper.chartbuilder.BaseChartFormatTab.prototype.initialize.call(this);this._initUnitMap();this._control_theme=actuate.widget.ComponentMgr.get(this.id+"_theme");this._control_themeRow=actuate.widget.ComponentMgr.get(this.id+"_themeRow");this._control_width=actuate.widget.ComponentMgr.get(this.id+"_width");this._control_widthUnit=actuate.widget.ComponentMgr.get(this.id+"_widthUnit");this._control_height=actuate.widget.ComponentMgr.get(this.id+"_height");this._control_heightUnit=actuate.widget.ComponentMgr.get(this.id+"_heightUnit");this._control_dimension=actuate.widget.ComponentMgr.get(this.id+"_dimension");this._control_dimensionRow=actuate.widget.ComponentMgr.get(this.id+"_dimensionRow");this._control_radiusRow=actuate.widget.ComponentMgr.get(this.id+"_radiusRow");this._control_isAutoRadius=actuate.widget.ComponentMgr.get(this.id+"_isAutoRadius");this._control_radius=actuate.widget.ComponentMgr.get(this.id+"_radius");this._control_rotationRow=actuate.widget.ComponentMgr.get(this.id+"_rotationRow");this._control_rotation=actuate.widget.ComponentMgr.get(this.id+"_rotation");this._initializeControlStatus();},_initializeControlStatus:function(){this._validateControlArray=[];this._validateControlArray.push(this._control_width);this._validateControlArray.push(this._control_height);this._validateControlArray.push(this._control_radius);},_initContent:function(){this._initSizeUnit();this._initChartBaseFontContent();this._componentArray=[];this._componentArray.push(this._initChartTitle());var C=this;this._dimensionStore=new actuate.widget.data.SimpleStore({fields:["value","text"]});var A=new this._dimensionStore.recordType({value:"0",text:actuate.util.Utility.getLocalizedString("chartBuilder.2d")});this._dimensionStore.add(A);var A=new this._dimensionStore.recordType({value:"1",text:actuate.util.Utility.getLocalizedString("chartBuilder.2dwithDepth")});this._dimensionStore.add(A);this._themeStore=new actuate.widget.data.SimpleStore({fields:["value","text"]});var B={xtype:"fieldset",collapsible:true,autoHeight:true,title:actuate.util.Utility.getLocalizedString("chartBuilder.chart"),checkboxToggle:false,defaults:{border:false,header:false,layout:"column",bodyStyle:"padding:2px 4px 2px 4px"},listeners:{collapse:function(){if(C._parentDialog&&C._parentDialog.adjustSize){C._parentDialog.adjustSize();}},expand:function(){if(C._parentDialog&&C._parentDialog.adjustSize){C._parentDialog.adjustSize();}}},items:[{id:this.id+"_themeRow",items:[{columnWidth:0.3,xtype:"label",text:actuate.util.Utility.getLocalizedString("chartBuilder.theme")},{columnWidth:0.42,id:this.id+"_theme",xtype:"combo",editable:false,forceSelection:true,valueField:"value",displayField:"text",store:this._themeStore}]},{items:[{columnWidth:0.3,xtype:"label",text:actuate.util.Utility.getLocalizedString("chartBuilder.width")},{columnWidth:0.2,id:this.id+"_width",value:"7",xtype:"textfield",allowBlank:false,validator:function(E){var D=actuate.dialog.impl.Utility.validatePositiveWithoutPlus(E);if(!D){return actuate.util.Utility.getLocalizedString("chartBuilder.numericpositive.errorMessage");}return true;}},{columnWidth:0.02,xtype:"label",style:"height:1px"},{columnWidth:0.2,id:this.id+"_widthUnit",xtype:"combo",editable:false,forceSelection:true,value:actuate.dialog.impl.constant.DesignChoice.UNITS_IN,valueField:"value",displayField:"text",store:this._sizeStore}]},{items:[{columnWidth:0.3,xtype:"label",text:actuate.util.Utility.getLocalizedString("chartBuilder.height")},{columnWidth:0.2,id:this.id+"_height",value:"3",xtype:"textfield",allowBlank:false,validator:function(E){var D=actuate.dialog.impl.Utility.validatePositiveWithoutPlus(E);if(!D){return actuate.util.Utility.getLocalizedString("chartBuilder.numericpositive.errorMessage");}return true;}},{columnWidth:0.02,xtype:"label",style:"height:1px"},{columnWidth:0.2,id:this.id+"_heightUnit",xtype:"combo",editable:false,forceSelection:true,value:actuate.dialog.impl.constant.DesignChoice.UNITS_IN,valueField:"value",displayField:"text",store:this._sizeStore}]},{id:this.id+"_dimensionRow",items:[{columnWidth:0.3,xtype:"label",text:actuate.util.Utility.getLocalizedString("chartBuilder.dimension")},{columnWidth:0.3,id:this.id+"_dimension",xtype:"combo",editable:false,forceSelection:true,value:"0",valueField:"value",displayField:"text",store:this._dimensionStore},{columnWidth:0.02,xtype:"label",style:"height:1px"},{columnWidth:0.2,xtype:"label",style:"height:1px"}]},{id:this.id+"_rotationRow",items:[{columnWidth:0.3,xtype:"label",text:actuate.util.Utility.getLocalizedString("chartBuilder.rotation")},{columnWidth:0.3,id:this.id+"_rotation",width:180,xtype:"slider",showValue:true,increment:10,value:0,minValue:0,maxValue:359}]},{id:this.id+"_radiusRow",items:[{columnWidth:0.3,id:this.id+"_isAutoRadius",xtype:"checkbox",checked:true,boxLabel:actuate.util.Utility.getLocalizedString("chartBuilder.autoRadius"),handler:function(){var D=actuate.widget.ComponentMgr.get(C.id+"_radius");D.setDisabled(this.checked?true:false);}},{columnWidth:0.3,id:this.id+"_radius",xtype:"spinner",value:50,disabled:true,strategy:new actuate.widget.custom.Spinner.NumberStrategy({minValue:1}),validator:function(E){if(this.disabled){return true;}var D=actuate.dialog.impl.Utility.validatePositiveIntegerWithoutPlus(E);if(!D){return actuate.util.Utility.getLocalizedString("chartBuilder.positiveinteger.errorMessage");}return true;}},{columnWidth:0.02,xtype:"label",style:"height:1px"},{columnWidth:0.1,xtype:"label",text:actuate.util.Utility.getLocalizedString("chartBuilder.pixel"),style:{padding:"2px 2px 0px 2px"}}]}]};if(this._chartBaseFont){B.items.push(this._chartBaseFont);}if(this._chartTooltipFont){B.items.push(this._chartTooltipFont);}this._componentArray.push(B);this._componentArray.push(this._initChartLegend());},_clearControls:function(){actuate.dialog.impl.helper.chartbuilder.PieChartFormatTab.superclass._clearControls.apply(this,arguments);this._control_dimension.setSelectedIndex(0);this._control_rotation.setValue(0);this._control_isAutoRadius.setValue(true);this._control_radius.setDisabled(true);this._control_radius.setValue(50);this._control_width.setValue("7");this._control_widthUnit.setValue(actuate.dialog.impl.constant.DesignChoice.UNITS_IN);this._control_height.setValue("3");this._control_heightUnit.setValue(actuate.dialog.impl.constant.DesignChoice.UNITS_IN);this._control_theme.setSelectedIndex(0);if(this._themeStore){for(var A=0;A<this._themeStore.getCount();A++){if(this._themeStore.getAt(A)&&this._themeStore.getAt(A).get("value")=="ThemesReportItems.Modern"){this._control_theme.setValue("ThemesReportItems.Modern");break;}}}},loadData:function(E){actuate.dialog.impl.helper.chartbuilder.PieChartFormatTab.superclass.loadData.apply(this,arguments);if(this._isFlashChart==true){this._control_themeRow.hide();this._control_dimensionRow.show();this._control_legendTitleRow.show();this._control_rotationRow.show();this._control_radiusRow.show();}else{if(this._isFlashChart==false){this._control_themeRow.show();this._control_dimensionRow.hide();this._control_legendTitleRow.hide();this._control_rotationRow.hide();this._control_radiusRow.hide();var H=E[actuate.model.Constant.MetadataType.THEMES];if(H&&H.length>0){this._themeStore.removeAll();for(var F=0;F<H.length;F++){var K=new this._themeStore.recordType({value:H[F],text:H[F].replace("ThemesReportItems.","")});this._themeStore.add(K);}}this._control_theme.setSelectedIndex(0);if(this._themeStore){for(var D=0;D<this._themeStore.getCount();D++){if(this._themeStore.getAt(D)&&this._themeStore.getAt(D).get("value")=="ThemesReportItems.Modern"){this._control_theme.setValue("ThemesReportItems.Modern");break;}}}}}if(this.chart&&(this.chart.type=="FLASHCHART"||this.chart.type=="CHART")){this.chartSubType=this.chart.chartSubType;var C=this.chart.dimension;this._control_dimension.setValue(C);var A=this.chart.pieRadius;if(!A||A==0){this._control_isAutoRadius.setValue(true);this._control_radius.setValue(50);this._control_radius.setDisabled(true);}else{this._control_isAutoRadius.setValue(false);this._control_radius.setValue(A);this._control_radius.setDisabled(false);}var B=this.chart.pieRotation;this._control_rotation.setValue(B);var G=this.chart.width;var J=this.getUnit(G);var I=G.split(J)[0];this._control_width.setValue(I);this._control_widthUnit.setValue(J);var G=this.chart.height;var J=this.getUnit(G);var I=G.split(J)[0];this._control_height.setValue(I);this._control_heightUnit.setValue(J);if(this._isFlashChart==false){if(this.chart.theme){this._control_theme.setValue(this.chart.theme);}}if(this._updateLegend){this._updateLegend();}}else{if(E.gadgetAttr){this._udpateSizeFromGadgetContainer(E.gadgetAttr);}}if(!this.hidden){this._enableType();}},_adjuctUIAfterActivate:function(){if(this._control_rotation.syncThumb){this._control_rotation.syncThumb();}},_initUnitMap:function(){this._allUnitMap=new Array();this._allUnitMap[actuate.dialog.impl.constant.DesignChoice.UNITS_PT]="chartFormatDialog.Unit.PT";this._allUnitMap[actuate.dialog.impl.constant.DesignChoice.UNITS_PC]="chartFormatDialog.Unit.PC";this._allUnitMap[actuate.dialog.impl.constant.DesignChoice.UNITS_PERCENTAGE]="chartFormatDialog.Unit.Percentage";this._allUnitMap[actuate.dialog.impl.constant.DesignChoice.UNITS_CM]="chartFormatDialog.Unit.CM";this._allUnitMap[actuate.dialog.impl.constant.DesignChoice.UNITS_MM]="chartFormatDialog.Unit.MM";this._allUnitMap[actuate.dialog.impl.constant.DesignChoice.UNITS_IN]="chartFormatDialog.Unit.IN";this._allUnitMap[actuate.dialog.impl.constant.DesignChoice.UNITS_EM]="chartFormatDialog.Unit.EM";this._allUnitMap[actuate.dialog.impl.constant.DesignChoice.UNITS_EX]="chartFormatDialog.Unit.EX";this._allUnitMap[actuate.dialog.impl.constant.DesignChoice.UNITS_PX]="chartFormatDialog.Unit.PX";},getUnit:function(C){var B=actuate.dialog.impl.constant.DesignChoice.UNITS_IN;for(var A in this._allUnitMap){if(C.indexOf(A)>-1){B=A;break;}}return B;},_enableType:function(){var A=this._parentDialog.getPanel("actuate_dialog_impl_helper_chartbuilder_chartTypeTab");if(A&&!A.hidden){A.updateType("Pie Chart");}},createSoapNode:function(A,B){this.createTypeNode(B,A);A.appendChild(this.createAppearanceNode(B,A));A.appendChild(this.createLabelsNode(B));},createTypeNode:function(F,E){var D;var C=E.getElementsByTagName(actuate.Constant.tag.ChartType);if(C==null||C.length==0){D=actuate.util.XmlDom.createElement(F,actuate.Constant.tag.ChartType);E.appendChild(D);}else{D=C[0];}var A=actuate.util.XmlDom.createElement(F,actuate.Constant.tag.ChartSubType);var B=F.createTextNode("standard");A.appendChild(B);D.appendChild(A);},createAppearanceNode:function(D,H){var M;var O=H.getElementsByTagName(actuate.Constant.tag.Apperance);if(O==null||O.length==0){M=actuate.util.XmlDom.createElement(D,actuate.Constant.tag.Apperance);H.appendChild(M);}else{M=O[0];}if(this._isFlashChart==false){var I=actuate.util.XmlDom.createElement(D,actuate.Constant.tag.Theme);var C=actuate.util.String.trim(this._control_theme.getValue());var F=D.createTextNode(C);I.appendChild(F);M.appendChild(I);}var J=actuate.util.Utility.getNumberFormatter();var Q=actuate.util.XmlDom.createElement(D,actuate.Constant.tag.ChartWidth);var X;var V=actuate.util.String.trim(this._control_width.getValue());if(V==""){X=D.createTextNode("");}else{X=D.createTextNode(J.parse(this._control_width.getValue())+this._control_widthUnit.getValue());}Q.appendChild(X);M.appendChild(Q);var S=actuate.util.XmlDom.createElement(D,actuate.Constant.tag.ChartHeight);var R;var L=actuate.util.String.trim(this._control_height.getValue());if(L==""){R=D.createTextNode("");}else{R=D.createTextNode(J.parse(this._control_height.getValue())+this._control_heightUnit.getValue());}S.appendChild(R);M.appendChild(S);var T=actuate.util.XmlDom.createElement(D,actuate.Constant.tag.Dimention);var W=D.createTextNode(this._control_dimension.getValue());T.appendChild(W);M.appendChild(T);var K=this._control_rotation.getValue();if(K==null||K.length==0){K="0.0";}var A=actuate.util.XmlDom.createElement(D,actuate.Constant.tag.Rotation);var Z=D.createTextNode(K);A.appendChild(Z);M.appendChild(A);var E=actuate.widget.ComponentMgr.get(this.id+"_radius");var P=this._control_isAutoRadius.checked?"0":E.getValue();var Y=actuate.util.XmlDom.createElement(D,actuate.Constant.tag.PieRadius);var N=D.createTextNode(P);Y.appendChild(N);M.appendChild(Y);var U;var G=M.getElementsByTagName("YAxes");if(G==null||G.length==0){U=actuate.util.XmlDom.createElement(D,"YAxes");M.appendChild(U);}else{U=G[0];}var B;var a=U.getElementsByTagName("YAxis");if(a==null||a.length==0){B=actuate.util.XmlDom.createElement(D,"YAxis");U.appendChild(B);}this._addChartLegendToResponse(D,M);return M;},_okPress:function(){this._helpee.fireEvent(actuate.dialog.EventConstants.ON_DIALOG_OK,this.createFilterRequest());},_addChartNavigationToResponse:function(B,A){},_updateChartNavigation:function(){this._showHideTimeLine(false);this._navigationScrollBarCheckBox.hide();this._navigationScrollBarCheckBox.setValue(false);}});