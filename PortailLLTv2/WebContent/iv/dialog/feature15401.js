actuate.util.Package.define("actuate.dialog.impl.helper");actuate.dialog.impl.helper.ChartCategoriesDialog=actuate.Class.create();actuate.dialog.impl.helper.ChartCategoriesDialog.prototype=actuate.Class.extend(new actuate.dialog.impl.helper.AbstractIVDialog(),{_classname:"actuate.dialog.ChartCategoriesDialog",_width:368,_htmlElements:{"_category":null},initialize:function(){var A=this._getId(this._classname);this._applyHtmlElementsNames(A);actuate.dialog.impl.helper.AbstractIVDialog.prototype.initialize.call(this,A);this.idCategoryDiv=document.getElementById(this._htmlElements["_category"]);this.idCategory=new actuate.uiadapter.ComboBox({editable:false,width:220});this.idCategory.render(this.idCategoryDiv);this.__neh_CategoryChange_c=actuate.Method.bind(this.__neh_CategoryChange,this);this.idCategory.registerEventHandler("select",this.__neh_CategoryChange_c);this.filterList=new actuate.data.FilterLists();this.ivFilter=new actuate.data.Filters();},_localBind:function(A,B){if(!A){return ;}this.data=A;this._showCategories(A);this.adjustSize();},_okPress:function(){var A=this._getSelectedValue();if(A==null){this._consumer._eventDispatcher.broadcastEvent(actuate.iv.core.iVEvent.__E_WARN,actuate.util.Utility.getLocalizedString("filterDialog.text.NoColumnBindings"));return ;}this._hide();this._consumer._eventDispatcher.fireEvent(actuate.iv.core.iVEvent.__E_DRILLDOWN_FROM_CATEGORIES,{categoryData:A});},__getHelpTopic:function(){return"iv_chart_categories";},_preHide:function(){this.idCategory.collapse();},_neh_cancel:function(){this._hide();},_showCategories:function(C){var E=C[actuate.model.Constant.MetadataType.CATEGORIES];var A=[];if(E){for(var B=0;B<E.length;B++){var D=E[B];A.push([D,D]);}}this.idCategory.setStore(A);this.idCategory.setSelectedIndex(0);},__neh_CategoryChange:function(A){this.adjustSize();},_getSelectedValue:function(){return this.idCategory.getValue();}});