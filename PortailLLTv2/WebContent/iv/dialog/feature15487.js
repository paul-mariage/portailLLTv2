actuate.util.Package.define("actuate.dialog.impl.helper.chartbuilder");actuate.dialog.impl.helper.chartbuilder.GanttChartFormatTab=actuate.Class.extendClass(actuate.dialog.impl.helper.chartbuilder.ParentChartFormatTab,{_classname:"actuate.dialog.impl.helper.chartbuilder.GanttChartFormatTab",initialize:function(){this.id=this._getId(this._classname);this._title=actuate.util.Utility.getLocalizedString("chartBuilder.format");this._stepUnitStore=new actuate.widget.data.SimpleStore({fields:["value","text"]});var A=new this._stepUnitStore.recordType({value:"Years",text:actuate.util.Utility.getLocalizedString("chartBuilder.dialog.intervalType.year")});this._stepUnitStore.add(A);var A=new this._stepUnitStore.recordType({value:"Quarters",text:actuate.util.Utility.getLocalizedString("chartBuilder.dialog.intervalType.quarter")});this._stepUnitStore.add(A);var A=new this._stepUnitStore.recordType({value:"Months",text:actuate.util.Utility.getLocalizedString("chartBuilder.dialog.intervalType.month")});this._stepUnitStore.add(A);var A=new this._stepUnitStore.recordType({value:"Weeks",text:actuate.util.Utility.getLocalizedString("chartBuilder.dialog.intervalType.week")});this._stepUnitStore.add(A);var A=new this._stepUnitStore.recordType({value:"Days",text:actuate.util.Utility.getLocalizedString("chartBuilder.dialog.intervalType.day")});this._stepUnitStore.add(A);var A=new this._stepUnitStore.recordType({value:"Hours",text:actuate.util.Utility.getLocalizedString("chartBuilder.dialog.intervalType.hour")});this._stepUnitStore.add(A);var A=new this._stepUnitStore.recordType({value:"Minutes",text:actuate.util.Utility.getLocalizedString("chartBuilder.dialog.intervalType.minute")});this._stepUnitStore.add(A);var A=new this._stepUnitStore.recordType({value:"Seconds",text:actuate.util.Utility.getLocalizedString("chartBuilder.dialog.intervalType.second")});this._stepUnitStore.add(A);actuate.dialog.impl.helper.chartbuilder.GanttChartFormatTab.superclass.initialize.call(this);},_enableType:function(){var A=this._parentDialog.getPanel("actuate_dialog_impl_helper_chartbuilder_chartTypeTab");if(A&&!A.hidden){A.updateType("Gantt Chart");}},loadData:function(B){actuate.dialog.impl.helper.chartbuilder.GanttChartFormatTab.superclass.loadData.apply(this,arguments);if(this.chart&&this.chart.yAxis&&this.chart.yAxis[0]){var A=this.chart.yAxis[0].categoryLabels;if(A&&A.stagger){this._control_staggerCategoryLabelCheckbox.setValue(A.stagger);this._control_categoryLabelInterval.setValue(A.interval?A.interval:1);}else{if(A&&A.interval&&A.interval>1){this._control_categoryLabelInterval.setValue(A.interval);}}}},_initContent:function(){this._subTypeComboStore=new actuate.widget.data.SimpleStore({fields:["value","text"]});var A=new this._subTypeComboStore.recordType({value:"Standard",text:actuate.util.Utility.getLocalizedString("chartBuilder.standard")});this._subTypeComboStore.add(A);actuate.dialog.impl.helper.chartbuilder.GanttChartFormatTab.superclass._initContent.call(this);},_addChartNavigationToResponse:function(B,A){},_updateChartNavigation:function(){this._showHideTimeLine(false);this._navigationScrollBarCheckBox.hide();this._navigationScrollBarCheckBox.setValue(false);},_initValuesFieldSet:function(){var A=this;var B={id:this.id+"_valuesFieldSet",xtype:"fieldset",collapsed:true,collapsible:true,autoHeight:true,title:actuate.util.Utility.getLocalizedString("chartBuilder.value"),checkboxToggle:false,defaults:{border:false,header:false,layout:"column",bodyStyle:"padding:2px 4px 2px 4px"},listeners:{collapse:function(){if(A._parentDialog&&A._parentDialog.adjustSize){A._parentDialog.adjustSize();}},expand:function(C){if(C&&C._doLayout){C._doLayout();}if(A._parentDialog&&A._parentDialog.adjustSize){A._parentDialog.adjustSize();}}},items:[{items:[{columnWidth:0.3,xtype:"label",text:actuate.util.Utility.getLocalizedString("chartBuilder.title")},{columnWidth:0.5,id:this.id+"_yTitle",value:"",xtype:"textfield"},{columnWidth:0.1,id:this.id+"_yTitleFont",xtype:"label",text:actuate.util.Utility.getLocalizedString("chartBuilder.titleFont"),style:"text-decoration:underline;color:blue;cursor:pointer;white-space:nowrap;margin:3px",cls:"chartbuilder_selectFontLink",listeners:{render:function(){A._control_yTitleFontEl=document.getElementById(A.id+"_yTitleFont");actuate.util.Event.observe(A._control_yTitleFontEl,"click",A.__handleFontSelection_c,false);}}}]},{items:[{columnWidth:0.3,id:this.id+"_yshowCategoryLabelCheckbox",xtype:"checkbox",checked:true,boxLabel:actuate.util.Utility.getLocalizedString("chartBuilder.showLabels")},{columnWidth:0.1,id:this.id+"_yLabelFont",xtype:"label",text:actuate.util.Utility.getLocalizedString("chartBuilder.labelFont"),style:"text-decoration:underline;color:blue;cursor:pointer;white-space:nowrap;margin:3px",cls:"chartbuilder_selectFontLink",listeners:{render:function(){A._control_yLabelFontEl=document.getElementById(A.id+"_yLabelFont");actuate.util.Event.observe(A._control_yLabelFontEl,"click",A.__handleFontSelection_c,false);}}}]},{items:[{columnWidth:0.3,id:this.id+"_staggerCategoryLabelCheckbox",xtype:"checkbox",checked:false,boxLabel:actuate.util.Utility.getLocalizedString("chartBuilder.staggerLabels"),handler:function(){A._control_categoryLabelInterval.setDisabled(this.checked?false:true);if(!this.checked){A._control_categoryLabelInterval.setValue("1");}}}]},{items:[{columnWidth:0.3,xtype:"label",text:actuate.util.Utility.getLocalizedString("chartBuilder.labelsInterval")},{columnWidth:0.1,id:this.id+"_categoryLabelInterval",value:"1",xtype:"textfield",disabled:true,validator:function(D){var C=actuate.dialog.impl.Utility.validatePositiveIntegerWithoutPlus(D);if(!C){return actuate.util.Utility.getLocalizedString("chartBuilder.positiveinteger.errorMessage");}return true;}}]},{items:[{columnWidth:0.3,xtype:"label",text:actuate.util.Utility.getLocalizedString("chartBuilder.minValue")},{columnWidth:0.3,id:this.id+"_yScaleMinLiteralID",xtype:"datefield",format:actuate.util.Utility.getLocalizedString("dateFormat.shortDate"),readOnly:true}]},{items:[{columnWidth:0.3,xtype:"label",text:actuate.util.Utility.getLocalizedString("chartBuilder.maxValue")},{columnWidth:0.3,id:this.id+"_yScaleMaxLiteralID",xtype:"datefield",format:actuate.util.Utility.getLocalizedString("dateFormat.shortDate"),readOnly:true}]},{items:[{columnWidth:0.3,id:this.id+"_autoStep",xtype:"checkbox",checked:true,boxLabel:actuate.util.Utility.getLocalizedString("chartBuilder.autoStep"),handler:function(){var C=actuate.widget.ComponentMgr.get(A.id+"_step");C.setDisabled(this.checked?true:false);var D=actuate.widget.ComponentMgr.get(A.id+"_stepIntervalID");this._control_stepUnit=actuate.widget.ComponentMgr.get(A.id+"_stepUnit");if(this._control_stepUnit){this._control_stepUnit.setDisabled(this.checked?true:false);}D.setDisabled(this.checked?true:false);}}]},{id:this.id+"_stepIntervalRow",items:[{columnWidth:0.3,xtype:"label",text:actuate.util.Utility.getLocalizedString("chartBuilder.stepInterval")},{columnWidth:0.2,id:this.id+"_stepIntervalID",xtype:"textfield",disabled:true,validator:function(D){var C=actuate.util.Utility.isNumber(typeof D)||actuate.util.Utility.isNumeric(D);if(!C){return actuate.util.Utility.getLocalizedString("chartBuilder.numeric.errorMessage");}return true;}},{columnWidth:0.02,xtype:"label",style:"height:1px"},{columnWidth:0.2,id:this.id+"_stepUnit",xtype:"combo",editable:false,forceSelection:true,value:"Seconds",valueField:"value",displayField:"text",store:this._stepUnitStore}]},{id:this.id+"_stepNumbersRow",items:[{columnWidth:0.3,xtype:"label",text:actuate.util.Utility.getLocalizedString("chartBuilder.stepNumber")},{columnWidth:0.3,id:this.id+"_step",xtype:"spinner",value:1,disabled:true,strategy:new actuate.widget.custom.Spinner.NumberStrategy({minValue:1}),validator:function(D){var C=actuate.dialog.impl.Utility.validatePositiveIntegerWithoutPlus(D);if(!C){return actuate.util.Utility.getLocalizedString("chartBuilder.positiveinteger.errorMessage");}return true;}}]},{items:[{columnWidth:0.3,xtype:"label",id:this.id+"_ycategoryLabelRotateLabel",text:actuate.util.Utility.getLocalizedString("chartBuilder.labelsAngle")},{columnWidth:0.3,id:this.id+"_ycategoryLabelRotateInput",xtype:"combo",editable:false,forceSelection:true,value:"0",store:[["0","0"],["45","45"],["90","90"]]}]}]};return B;},validate:function(){if(!actuate.dialog.impl.helper.chartbuilder.GanttChartFormatTab.superclass.validate.apply(this,arguments)){return false;}var B=this._control_yScaleMinLiteralID.getValue();var A=this._control_yScaleMaxLiteralID.getValue();if(B&&A&&B.getTime()>=A.getTime()){actuate.widget.MessageBox.alert(actuate.util.Utility.getLocalizedString("chartBuilder.alertTitle"),actuate.util.Utility.getLocalizedString("chartBuilder.maxLessThanMin"));return false;}return true;},_initCategoriesFieldSet:function(){var A=this;var B={id:this.id+"_categoriesFieldSet",xtype:"fieldset",collapsed:true,collapsible:true,autoHeight:true,title:actuate.util.Utility.getLocalizedString("chartBuilder.category"),checkboxToggle:false,defaults:{border:false,header:false,layout:"column",bodyStyle:"padding:2px 4px 2px 4px"},listeners:{collapse:function(){if(A._parentDialog&&A._parentDialog.adjustSize){A._parentDialog.adjustSize();}},expand:function(C){if(C&&C._doLayout){C._doLayout();}if(A._parentDialog&&A._parentDialog.adjustSize){A._parentDialog.adjustSize();}}},items:[{items:[{columnWidth:0.3,xtype:"label",text:actuate.util.Utility.getLocalizedString("chartBuilder.title")},{columnWidth:0.5,id:this.id+"_xTitle",value:"",xtype:"textfield"},{columnWidth:0.1,id:this.id+"_xTitleFont",xtype:"label",text:actuate.util.Utility.getLocalizedString("chartBuilder.titleFont"),style:"text-decoration:underline;color:blue;cursor:pointer;white-space:nowrap;margin:3px",cls:"chartbuilder_selectFontLink",listeners:{render:function(){A._control_xTitleFontEl=document.getElementById(A.id+"_xTitleFont");actuate.util.Event.observe(A._control_xTitleFontEl,"click",A.__handleFontSelection_c,false);}}}]},{items:[{columnWidth:0.3,id:this.id+"_xshowCategoryLabelCheckbox",xtype:"checkbox",checked:true,boxLabel:actuate.util.Utility.getLocalizedString("chartBuilder.showLabels"),handler:function(){A._control_xcategoryLabelRotateInput.setDisabled(this.checked?false:true);A._control_staggerCategoryLabelCheckbox.setDisabled(this.checked?false:true);if(!this.checked){A._control_staggerCategoryLabelCheckbox.setValue(false);A._control_xcategoryLabelRotateInput.setValue("0");}}},{columnWidth:0.1,id:this.id+"_xLabelFont",xtype:"label",text:actuate.util.Utility.getLocalizedString("chartBuilder.labelFont"),style:"text-decoration:underline;color:blue;cursor:pointer;white-space:nowrap;margin:3px",cls:"chartbuilder_selectFontLink",listeners:{render:function(){A._control_xLabelFontEl=document.getElementById(A.id+"_xLabelFont");actuate.util.Event.observe(A._control_xLabelFontEl,"click",A.__handleFontSelection_c,false);}}}]},{items:[{columnWidth:0.3,xtype:"label",text:actuate.util.Utility.getLocalizedString("chartBuilder.labelsAngle")},{columnWidth:0.3,id:this.id+"_xcategoryLabelRotateInput",xtype:"combo",editable:false,forceSelection:true,value:"0",store:[["0","0"],["45","45"],["90","90"]]}]}]};return B;}});