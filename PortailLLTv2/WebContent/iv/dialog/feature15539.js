actuate.util.Package.define("actuate.dialog.impl.helper.summarytablebuilder");actuate.dialog.impl.helper.summarytablebuilder.SummaryTableBuilder=actuate.Class.extendClass(actuate.dialog.impl.helper.DataViewBuilderDialog,{_classname:"actuate.dialog.SummaryTableBuilderDialog",_height:null,_width:647,_tabPanel:null,initialize:function(A,B){var C=this._getId(this._classname);this._applyHtmlElementsNames(C);actuate.dialog.impl.helper.BaseBuilderDialog.prototype.initialize.call(this,C,actuate.util.Utility.getLocalizedString("tableBuilder.title"),[this._height,this._width],B);},_localBind:function(E){if(E){var D=E[actuate.model.Constant.MetadataType.ELEMENT];var B=this.getPanel("actuate_dialog_impl_helper_summarytablebuilder_summaryTableDataTab");if(B){B.loadData(E,"SUMMARYTABLE"==D.type);this._tabPanel.setActiveTab(B.getPanel());}B=this.getPanel("actuate_dialog_impl_helper_summarytablebuilder_summaryTableFormatTab");if(B){B.loadData(E);}var A=this.getPanel("actuate_dialog_impl_helper_genericPropsTab");if(A&&!A.hidden){this._genericPropsPanel=A;var C=actuate.Constant.element.TABLE;if(actuate.Constant.element.SUMMARYTABLE==D.type){C=actuate.Constant.element.SUMMARYTABLE;}A.loadData(E.operationData,C);}}},_bind:function(B){var A=this.getPanel("actuate_dialog_impl_helper_summarytablebuilder_summaryTableDataTab");if(A){A.loadData(B);}A=this.getPanel("actuate_dialog_impl_helper_summarytablebuilder_summaryTableFormatTab");if(A){A.loadData(B);}},_preHide:function(){var A=this.getPanel("actuate_dialog_impl_helper_summarytablebuilder_summaryTableDataTab");if(A){A._preHide();}A=this.getPanel("actuate_dialog_impl_helper_summarytablebuilder_summaryTableFormatTab");if(A){A._preHide();}if(this._genericPropsPanel&&this._genericPropsPanel._preHide){this._genericPropsPanel._preHide();}},_afterHide:function(){if(this._filterPanel&&this._filterPanel._afterHide){this._filterPanel._afterHide();}},_createBaseSoapNode:function(B){var A=actuate.util.XmlDom.createElement(B,actuate.Constant.tag.Json);B.documentElement.appendChild(A);return A;},__getDataPanel:function(){return this.getPanel("actuate_dialog_impl_helper_summarytablebuilder_summaryTableDataTab");},__getGadgetTypeName:function(){return this.__getDataPanel().isSummarize()?"SummaryTable":"Table";},__getHelpTopic:function(){return"EditTableGadget";}});