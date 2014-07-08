actuate.util.Package.define("actuate.dialog.impl.helper");actuate.dialog.impl.helper.TopBottomNDialog=actuate.Class.create();actuate.dialog.impl.helper.TopBottomNDialog.superclass=actuate.dialog.impl.helper.AbstractIVDialog.prototype;actuate.dialog.impl.helper.TopBottomNDialog.prototype=actuate.Class.extend(new actuate.dialog.impl.helper.AbstractIVDialog(),{_classname:"actuate.dialog.TopBottomNDialog",_height:169,_width:280,_htmlElements:{"_filterByRow1":null,"_filterByRow2":null,"_filterBy":null,"_valueElement":null,"_filterOptionElement":null,"_selectbox":null,"_recalculateTotalsDiv":null},initialize:function(){var B=this._getId(this._classname);this._applyHtmlElementsNames(B);actuate.dialog.impl.helper.AbstractIVDialog.prototype.initialize.call(this,B);this.idFilterByDiv=document.getElementById(this._htmlElements["_filterBy"]);this._filterByRow1=document.getElementById(this._htmlElements["_filterByRow1"]);this._filterByRow2=document.getElementById(this._htmlElements["_filterByRow2"]);this.idFilterBy=new actuate.uiadapter.ComboBox({editable:false,width:120});this.idFilterBy.render(this.idFilterByDiv);this.__neh_FilterByChange_c=actuate.Method.bind(this.__neh_FilterByChange,this);this.idFilterBy.registerEventHandler("select",this.__neh_FilterByChange_c);this.valueElement=new actuate.uiadapter.TextField({cls:"filterValueInput "+actuate.iv.constant.CSS_INPUTBOX});this.valueElement.render(this._htmlElements["_valueElement"]);var A=document.getElementById(this._htmlElements["_filterOptionElement"]);this.clearFilterFlag=false;this._filterOptionList=new actuate.uiadapter.ListBox({width:120,height:100,renderTo:A});this._addConditions();this._filterOptionList.registerEventHandler("select",actuate.Method.bind(this.__neh_changeCondition,this));this.recalculateTotals=new actuate.uiadapter.Checkbox({cls:actuate.dialog.impl.constant.CSS_INPUTBOX,boxLabel:actuate.util.Utility.getLocalizedString("filterDialog.text.recalculateTotals"),checked:true});this.recalculateTotals.render(this._htmlElements["_recalculateTotalsDiv"]);this.resetValue();},__neh_FilterByChange:function(A){this.resetValue();this.displayFilters();this.adjustSize();},_addConditions:function(){var A=[];A.push(["clear",actuate.util.Utility.getLocalizedString("filterDialog.text.NoFilterCondition")]);A.push([actuate.Constant.DesignChoice.FILTER_OPERATOR_TOP_N,actuate.util.Utility.getLocalizedString("filterDialog.text.Topn")]);A.push([actuate.Constant.DesignChoice.FILTER_OPERATOR_BOTTOM_N,actuate.util.Utility.getLocalizedString("filterDialog.text.Bottomn")]);A.push([actuate.Constant.DesignChoice.FILTER_OPERATOR_TOP_PERCENT,actuate.util.Utility.getLocalizedString("filterDialog.text.Toppercent")]);A.push([actuate.Constant.DesignChoice.FILTER_OPERATOR_BOTTOM_PERCENT,actuate.util.Utility.getLocalizedString("filterDialog.text.Bottompercent")]);this._filterOptionList.setStore(A);this._filterOptionList.setSelectedIndex(0);},_localBind:function(B,C){if(!B){return ;}var A=B[actuate.model.Constant.MetadataType.ELEMENT];if(A&&A.type){if(A.type==actuate.Constant.element.SUMMARYTABLE||A.type==actuate.Constant.element.TABLE||A.type==actuate.Constant.element.DATAITEM){this.recalculateTotals.show();}else{this.recalculateTotals.hide();}}if(!this.setData(B)){return true;}},_preHide:function(){actuate.dialog.impl.helper.TopBottomNDialog.superclass._preHide.call(this);this.resetValue();},_okPress:function(){if(this.idFilterBy.getValue()==null){this._consumer._eventDispatcher.broadcastEvent(actuate.iv.core.iVEvent.__E_WARN,actuate.util.Utility.getLocalizedString("filterDialog.text.NoColumnBindings"));return ;}var B=this._filterOptionList.getSelectedValue();if(B=="clear"){this._consumer._eventDispatcher.fireEvent(actuate.iv.core.iVEvent.__E_CLEARTOPBOTTOMN);this.valueElement.setValue("");this._filterOptionList.setSelectedIndex(0);this.clearFilterFlag="true";this._hide();}else{if(this.valueElement.getValue()==""){var A=actuate.util.Utility.getLocalizedString("filterDialog.text.MsgNoBlankValue");this._consumer._eventDispatcher.broadcastEvent(actuate.iv.core.iVEvent.__E_WARN,A);return ;}this.filterOption=B;this.filterValue=this.valueElement.getValue();this._consumer._eventDispatcher.fireEvent(actuate.iv.core.iVEvent.__E_APPLYTOPBOTTOMN,this.htmlId);this._hide();}},__getHelpTopic:function(){return"iv_top_bottom_n";},createRequest:function(D){var B=new actuate.iv.data.IVBoundDataColumn();if(this.selectedName){B.setName(this.selectedName);}else{B.setName(this.idFilterBy.getValue());}var C=new actuate.iv.data.IVTableColumnDefinition();C.setBoundDataColumn(B);var A=new actuate.iv.data.IVColumnDefinitionGroup();A.addTableColumnDefinition(C);return this.ivData.getColumnDefinitionGroup(D,A);},createTopBottomNRequest:function(){var I=actuate.util.XmlDom.createXMLDom(actuate.util.Constants.soap.NAMESPACE_ACTUATE10,actuate.Constant.tag.Data);var Q;var G=actuate.util.XmlDom.createElement(I,actuate.Constant.tag.Filter);var D=actuate.util.XmlDom.createElement(I,actuate.Constant.tag.Type);var K=actuate.util.XmlDom.createElement(I,actuate.Constant.tag.Expression);var S=I.createTextNode(actuate.Constant.tag.Simple);D.appendChild(S);var P=actuate.util.XmlDom.createElement(I,actuate.Constant.tag.Clause);var B=actuate.util.XmlDom.createElement(I,"ColumnName");var N=actuate.util.XmlDom.createElement(I,actuate.Constant.tag.NAME);B.appendChild(N);var C;if(this.selectedName){C=this.selectedName;}else{C=this.idFilterBy.getValue();}var A=I.createTextNode(C);N.appendChild(A);P.appendChild(B);var M=actuate.util.XmlDom.createElement(I,actuate.Constant.tag.FilterOp);var T=this._filterOptionList.getSelectedValue();var H=I.createTextNode(T);M.appendChild(H);P.appendChild(M);K.appendChild(P);var J=new Array();var F=actuate.util.XmlDom.createElement(I,actuate.Constant.tag.Operand);var E=this.valueElement.getValue();J.push(E);J=actuate.util.Json.makeArray(J);var R=I.createTextNode(J);F.appendChild(R);P.appendChild(F);G.appendChild(D);G.appendChild(K);var L=I.createTextNode(this.recalculateTotals.getValue()?"true":"false");var O=actuate.util.XmlDom.createElement(I,actuate.Constant.tag.UpdateAggregation);O.appendChild(L);G.appendChild(O);I.documentElement.appendChild(G);return I;},setData:function(E){var G=E.selectedBinding;if(G){this._filterByRow1.style.display="none";this._filterByRow2.style.display="none";this.resetValue();this.selectedName=G.name;var F=E[actuate.model.Constant.MetadataType.FILTER];var D=F.getTopBottomFilter(this.selectedName);if(D){var B=D.operator;var C=this._filterOptionList.getIndexOf(B);if(C!=null&&C>=0){this._filterOptionList.setSelectedIndex(C);var A=D.values[0];this.filterValue=A;this.valueElement.setValue(A);this.valueElement.show();}this.recalculateTotals.setCheckedFlag(D.updateAggregation);}}else{this._showFilters(E);}return true;},_showFilters:function(F){this._filterByRow1.style.display="";this._filterByRow2.style.display="";this.boundDataColsList=[];var B=[];var H=F[actuate.model.Constant.MetadataType.BINDING];for(var D in H){var G=H[D];var A=G.displayName||G.name;if(G.isViewableBinding){if(G.dataType&&actuate.util.Utility.isNumber(G.dataType)){B.push([D,G.displayName.replace(/\"/ig,"")]);}}this.boundDataColsList.push(G);}this.idFilterBy.setStore(B);this.idFilterBy.setSelectedIndex(0);this.filters=[];var E=F[actuate.model.Constant.MetadataType.FILTER].topBottomFilter;for(var C=0;C<E.length;C++){this.filters.push(E[C]);}if(this.filters.length>0){this.idFilterBy.setValue(this.filters[0].bindingName);}this.displayFilters();},displayFilters:function(){if(this.filters.length>0){for(var C=0;C<this.filters.length;C++){var F=this.filters[C];if(F!=null){var E=F.bindingName;if(E==this.idFilterBy.getValue()){this.idFilterBy.setValue(this.filters[C].bindingName);var F=this.filters[C];var B=F.operator;var D=this._filterOptionList.getIndexOf(B);if(D!=null&&D>=0){this._filterOptionList.setSelectedIndex(D);var A=F.values[0];this.filterValue=A;this.valueElement.setValue(A);this.valueElement.show();}}}}}},getFilterValue:function(){return this.filterValue==""?"0":this.filterValue;},getFilterOption:function(){return this.filterOption;},resetValue:function(){this._filterOptionList.setSelectedIndex(0);this.filterOption=this._filterOptionList.getSelectedValue();this.valueElement.setValue("");this.valueElement.hide();this.selectedName=null;this.recalculateTotals.setCheckedFlag(true);},__neh_clearFilterLink:function(){this.valueElement.hide();this._filterOptionList.setSelectedValue("clear");this.adjustSize();},__neh_changeCondition:function(){var A=this._filterOptionList.getSelectedValue();if(A=="clear"){this.valueElement.hide();}else{this.valueElement.show();}this.adjustSize();}});