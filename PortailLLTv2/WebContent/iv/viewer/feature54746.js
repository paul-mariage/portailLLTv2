actuate.util.Package.define("actuate.iv.ui.dialog.aggregation");actuate.iv.ui.dialog.aggregation.IVAggregationBlock=actuate.Class.create();actuate.iv.ui.dialog.aggregation.IVAggregationBlock.prototype={rendered:false,_template:null,_htmlElmentsIds:[],_containerId:null,blockIndex:null,selectedColumn:null,manager:null,isShared:null,initialize:function(A,B){this.manager=A;this.selectedColumn=B;this.columns=new Array();this.groups=new Array();this._prepareBindings(this.manager.element.bindingsMap);this._prepareGroups(this.manager.element.getGroupsArray());this.styleModel=new actuate.iv.ui.dialog.StyleModel();this.labelFont=[];this.handleLabelFont_c=actuate.Method.bind(this._handleLabelFont,this);},_onRender:function(B){if(!this._template){var A=new actuate.uiadapter.Template('<div id="{0}">'+'	<div class="delete">'+'   	<a id="{1}" class="iv_dialog_link_enabled">{17}</a>'+"	</div>"+'	<div class="section1">'+'		<div style="clear:both;"></div>'+'			<div class="section1_left">'+'				<TABLE CELLSPACING="4px;">'+"					<TR>"+'						<TD ID="selecFunctionLabel">{18}</TD>'+'						<TD><DIV id="{2}"></DIV></TD>'+"					</TR>"+"				</TABLE>"+'				<TABLE  id="{3}">'+"					<TR>"+"						<TD>{19}</TD>"+'						<TD><DIV id="{4}"></DIV></TD>'+"					</TR>"+"				</TABLE>"+'				<TABLE id="{5}">'+"					<TR>"+"						<TD>{20}</TD>"+'						<TD><DIV id="{6}"></DIV></TD>'+"					</TR>"+"				</TABLE>"+"			</div>"+'			<div class="section1_right">'+'				<TABLE CELLSPACING="4px;">'+"					<TR>"+'						<TD ID="sortDirectionLabel">'+"							{21}"+"						</TD>"+"						<TD>"+'							<DIV id="{7}">'+"							</DIV>"+"						</TD>"+"					</TR>"+"				</TABLE>"+"			</div>"+'			<div style="clear:both;"></div>'+"		</div>"+'		<div class="section2">'+'			<div style="clear:both;"></div>'+"				<TABLE>"+"					<TR>"+"						<TD>"+'							<div class="aggregate_on_label">{22}</div>'+"						</TD>"+"					</TR>"+"					<TR>"+"						<TD>"+'							<DIV class="aggregation_level" >'+'								<TABLE CELLPADDING="0px" CELLSPACING="0px">'+"									<TR>"+"										<TD>"+'											<SPAN id="{8}"></SPAN>'+"										</TD>"+"									</TR>"+"								</TABLE>"+'								<TABLE CELLPADDING="0px" CELLSPACING="0px">'+"									<TR>"+"										<TD>"+'											<SPAN id="{9}"></SPAN>'+"										</TD>"+"										<TD>"+'											<DIV id="{10}"</DIV>'+"										</TD>"+"									</TR>"+"								</TABLE>"+"							</DIV>"+"						</TD>"+"						<TD>"+'							<div class="aggregation_level">'+'								<TABLE CELLPADDING="0px" CELLSPACING="0px">'+"									<TR>"+"										<TD>"+'											<SPAN id="{11}"></SPAN>'+"										</TD>"+"										<TD>"+'											<SPAN id="{12}"></SPAN>'+"										</TD>"+"									</TR>"+"								</TABLE>"+'								<TABLE CELLPADDING="0px" CELLSPACING="0px">'+"									<TR>"+"										<TD>"+'											<SPAN id="{13}"></SPAN>'+"										</TD>"+"										<TD>"+'											<SPAN id="{14}"></SPAN>'+"										</TD>"+"									</TR>"+"								</TABLE>"+"							</div>"+"						</TD>"+"					</TR>"+'				<div style="clear:both;"></div>'+"			</TABLE>"+"		</div>"+'		<div class="section3">'+'			<table width="100%">'+"				<tr>"+'					<td width="40%" align="left"><div><label id="{15}">EXPR</label></div>'+"					</td>"+'					<td width="60%" align="left">'+"						<div>"+"							<table>"+"								<tr>"+"									<td>"+"										<span>{23}</span>"+"									</td>"+"									<td>"+'										<span type="text" id="{16}"></span>'+"									</td>"+"                                   <td>"+'                                   <span class="iv_dialog_link_enabled" id="{24}">{25}</span>'+"                                   </td>"+"								</tr>"+"							</table>"+"						</div>"+"					</td>"+"				</tr>"+"			</table>"+"		</div>"+"	</div>");this._template=A;}this._htmlElmentsIdsArray();this._containerId=B;var C=this._template._append(B,this._htmlElmentsIds,true);this.getHtmlElmentsId();this._initAggrBlock();},render:function(A){if(!this.rendered){this.container=document.getElementById(A);this.rendered=true;this._onRender(this.container);this._populateSelectFunctionElement();this._populateSelectSortElement();this._populateSelectGroupNameElement();this._populateWeightSelectOptions();this._populateQuartSelectOptions();this._updateDefinition();}return this;},_htmlElmentsIdsArray:function(){actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID+=1;this._htmlElmentsIds=["_AggregationBlock"+actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID,"_delete"+actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID,"_selectFunctionElement"+actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID,"_selectWeight"+actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID,"_selectWeightElement"+actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID,"_selectQuart"+actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID,"_selectQuartElement"+actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID,"_selectSort"+actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID,"_aggregateAtTableLevelElement"+actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID,"_aggregateAtGroupLevelElement"+actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID,"_selectGroupName"+actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID,"_aggregateInTableHeaderElement"+actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID,"_aggregateInTableFooterElement"+actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID,"_aggregateInGroupHeaderElement"+actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID,"_aggregateInGroupFooterElement"+actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID,"_aggrDefn"+actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID,"_aggrDefnLabelInput"+actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID,actuate.util.Utility.getLocalizedString("columnAggregationDialog.deleteAggrDefnElement"),actuate.util.Utility.getLocalizedString("columnAggregationDialog.selectFunctionLabel"),actuate.util.Utility.getLocalizedString("columnAggregationDialog.selectWeightLabel"),actuate.util.Utility.getLocalizedString("columnAggregationDialog.quartileLabel"),actuate.util.Utility.getLocalizedString("columnAggregationDialog.sortLabel"),actuate.util.Utility.getLocalizedString("columnAggregationDialog.aggregateOnLabel"),actuate.util.Utility.getLocalizedString("columnAggregationDialog.aggregationLabel"),"_formatBtn"+actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID,actuate.util.Utility.getLocalizedString("columnAggregationDialog.format")];},getHtmlElmentsId:function(){this.aggrBlock=document.getElementById(this._htmlElmentsIds[0]);var A=document.getElementById(this._htmlElmentsIds[2]);this.selectFunction=new actuate.uiadapter.ComboBox({editable:false,width:100,hideMode:"visibility"});this.selectFunction.render(A);var K=document.getElementById(this._htmlElmentsIds[10]);this.groupName=new actuate.uiadapter.ComboBox({editable:false,width:100,hideMode:"visibility"});this.groupName.render(K);this.def=document.getElementById(this._htmlElmentsIds[15]);var D=this._htmlElmentsIds[16];this.selectWeightContainerDiv=document.getElementById(this._htmlElmentsIds[3]);var J=document.getElementById(this._htmlElmentsIds[4]);this.selectWeight=new actuate.uiadapter.ComboBox({editable:false,width:100,hideMode:"visibility"});this.selectWeight.render(J);this.selectQuartContainerDiv=document.getElementById(this._htmlElmentsIds[5]);var C=document.getElementById(this._htmlElmentsIds[6]);this.selectQuart=new actuate.uiadapter.ComboBox({editable:false,width:100,hideMode:"visibility"});this.selectQuart.render(C);var H=document.getElementById(this._htmlElmentsIds[7]);this.selectSort=new actuate.uiadapter.ComboBox({editable:false,width:100,hideMode:"visibility"});this.selectSort.render(H);this.deleteLink=document.getElementById(this._htmlElmentsIds[1]);this.tableLevel=new actuate.uiadapter.Checkbox({cls:actuate.iv.constant.CSS_INPUTBOX,boxLabel:actuate.util.Utility.getLocalizedString("columnAggregationDialog.aggregateAtTableLevelLabel")});this.groupLevel=new actuate.uiadapter.Checkbox({cls:actuate.iv.constant.CSS_INPUTBOX,boxLabel:actuate.util.Utility.getLocalizedString("columnAggregationDialog.aggregatAtGroupLevelofLabel")});actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID++;this.tableHeader=new actuate.uiadapter.Radio({cls:actuate.iv.constant.CSS_INPUTBOX,name:"radiogroupTableLevel"+actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID,valueText:"showInTableHeader",boxLabel:actuate.util.Utility.getLocalizedString("columnAggregationDialog.aggregateInTableHeaderLabel")});this.tableFooter=new actuate.uiadapter.Radio({cls:actuate.iv.constant.CSS_INPUTBOX,name:"radiogroupTableLevel"+actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID,valueText:"showInTableFooter",checked:true,boxLabel:actuate.util.Utility.getLocalizedString("columnAggregationDialog.aggregateInTableFooterLabel")});this.groupHeader=new actuate.uiadapter.Radio({cls:actuate.iv.constant.CSS_INPUTBOX,name:"radiogroupGroupLevel"+actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID,valueText:"showInGroupHeader",boxLabel:actuate.util.Utility.getLocalizedString("columnAggregationDialog.aggregateInGroupHeaderLabel")});this.groupFooter=new actuate.uiadapter.Radio({cls:actuate.iv.constant.CSS_INPUTBOX,name:"radiogroupGroupLevel"+actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID,valueText:"showInGroupFooter",boxLabel:actuate.util.Utility.getLocalizedString("columnAggregationDialog.aggregateInGroupFooterLabel")});var F=this._htmlElmentsIds[8];var I=this._htmlElmentsIds[9];var B=this._htmlElmentsIds[11];var L=this._htmlElmentsIds[12];var G=this._htmlElmentsIds[13];var E=this._htmlElmentsIds[14];this.tableLevel.render(F);this.groupLevel.render(I);this.tableHeader.render(B);this.tableFooter.render(L);this.groupHeader.render(G);this.groupFooter.render(E);this.labelInputbox=new actuate.uiadapter.TextField({cls:"aggregation_dialog_label_input "+actuate.iv.constant.CSS_INPUTBOX});this.labelInputbox.render(D);this.formatButton=document.getElementById(this._htmlElmentsIds[24]);},_initAggrBlock:function(){this.selectFunction.registerEventHandler("select",actuate.Method.bindAsEventListener(this._eh_functionChange,this));this.selectWeight.registerEventHandler("select",actuate.Method.bindAsEventListener(this._eh_weightFunctionChange,this));this.selectQuart.registerEventHandler("select",actuate.Method.bindAsEventListener(this._eh_quartFunctionChange,this));this.selectSort.registerEventHandler("select",actuate.Method.bindAsEventListener(this._eh_sortFunctionChange,this));this.tableLevel.registerEventHandler("check",actuate.Method.bindAsEventListener(this._eh_tableLevelClick,this));this.groupLevel.registerEventHandler("check",actuate.Method.bindAsEventListener(this._eh_groupLevelClick,this));this.tableHeader.registerEventHandler("check",actuate.Method.bindAsEventListener(this._eh_tableHeaderClick,this));this.tableFooter.registerEventHandler("check",actuate.Method.bindAsEventListener(this._eh_tableFooterClick,this));this.groupHeader.registerEventHandler("check",actuate.Method.bindAsEventListener(this._eh_groupHeaderClick,this));this.groupFooter.registerEventHandler("check",actuate.Method.bindAsEventListener(this._eh_groupFooterClick,this));this._eh_deleteAggregation_c=actuate.Method.bindAsEventListener(this._eh_deleteAggregation,this);actuate.util.Event.observe(this.deleteLink,"click",this._eh_deleteAggregation_c,false);actuate.iv.utility.ivUtility.addWordWrap(this.def);actuate.util.Event.observe(this.formatButton,"click",actuate.Method.bindAsEventListener(this._neh_formatClick,this),false);},_neh_formatClick:function(){this.styleModel.setRollbackState();this._requestFontDialog(this.labelFont);},_requestFontDialog:function(A){if(A){this.styleModel.setFont(A);}else{this.styleModel.reset();}var B=this;actuate.resource.module.feature.require([{module:"actuate.dialog",feature:"FONT_DIALOG"}],function(){var C=actuate.dialog.FontDialog.getInstance();C.setStyleModel(B.styleModel);C.registerEventHandler(actuate.dialog.impl.EventConstants.ON_DIALOG_OK,B.handleLabelFont_c);C.show();});},_handleLabelFont:function(B,A){this.labelFont=A;},_eh_deleteAggregation:function(A){actuate.util.Event.stop(A);if(this.isShared){actuate.uiadapter.MessageBox.show({title:"warning",msg:actuate.util.Utility.getLocalizedString("columnAggregationDialog.removeForbidden"),buttons:actuate.uiadapter.MessageBox.getOK(),icon:actuate.uiadapter.MessageBox.getWARNING()});}else{this.manager.deleteAggrBlocks(this.blockIndex,this.columnIndex);this.manager.filterFunctionValue(this.blockIndex,this.columnIndex);this.manager.sortFunctionChange(this.blockIndex,this.columnIndex);this.manager.adjustSize();}},_eh_functionChange:function(B){var C=this.selectFunction.getValue();var A=this.selectFunction.getRecordByValue(C);functionValue=A.data.value;this.funcParam=null;this.func=functionValue;this.manager.filterFunctionValue(this.blockIndex,this.columnIndex);this._setWeightValue();this._setQuartValue();this._setFunctionValue(C);this.manager.adjustSize();},_eh_weightFunctionChange:function(A){this.funcParam=this.selectWeight.getValue();this._updateDefinition();},_eh_quartFunctionChange:function(A){this.funcParam=this.selectQuart.getValue();this._updateDefinition();},_eh_sortFunctionChange:function(A){this.manager.sortFunctionChange(this.blockIndex,this.columnIndex);},_enableGroupLevelRadioButtons:function(){this.groupFooter.enable();this.groupHeader.enable();this.groupName.setDisabled(false);this.selectSort.setDisabled(this.manager.isGroupSorted(this.blockIndex));},_disableGroupLevelRadioButtons:function(){this.groupFooter.disable();this.groupHeader.disable();this.groupName.setDisabled(true);if(this.sortDir){}else{this.selectSort.setValue("none");}this.selectSort.setDisabled(true);},_eh_groupLevelClick:function(){if(this.groupLevel.getValue()){this.aggrAtGroupLevel=true;this._enableGroupLevelRadioButtons();if(this.groupName.getSelectedIndex()<=0&&this.groupName.getLength()>0){this.groupName.setSelectedIndex(0,true);}this.manager.sortFunctionChange(this.blockIndex,this.columnIndex);}else{this.aggrAtGroupLevel=false;this._disableGroupLevelRadioButtons();this.manager.sortFunctionChange(this.blockIndex,this.columnIndex);}},_eh_groupHeaderClick:function(){this.showInGroupFooter=this.groupFooter.getValue();},_eh_groupFooterClick:function(){this.showInGroupFooter=this.groupFooter.getValue();},_eh_tableLevelClick:function(){this.aggrAtTableLevel=this.tableLevel.getValue()!=null?this.tableLevel.getValue():false;this._enableTableLevelRadioButtons(this.aggrAtTableLevel);},_enableTableLevelRadioButtons:function(A){if(A){this.tableFooter.enable();this.tableHeader.enable();}else{this.tableFooter.disable();this.tableHeader.disable();}},_eh_tableHeaderClick:function(){this.showInTableFooter=this.tableFooter.getValue();},_eh_tableFooterClick:function(){this.showInTableFooter=this.tableFooter.getValue();},_updateDefinition:function(){this.def.innerHTML=this._toString();},_reset:function(A){this.funcParam=null;this.aggrAtGroupLevel=false;this.showInGroupFooter=true;this.showInTableFooter=true;if(A){this.aggrAtTableLevel=false;this.aggrAtGroupLevel=true;}else{this.aggrAtTableLevel=true;}this._disableTableLevelAggr(A);this.groupNameValue=null;this.selectSort.setValue("none");this.labelInputbox.setValue("");this.labelFont=null;this._populateSelectFunctionElement();this._populateSelectSortElement();this._populateWeightSelectOptions();this._populateQuartSelectOptions();this.selectWeight.setValue("");this.selectQuart.setValue("");this._hideWeight();this._hideQuart();this._setAggregateAtTableLevel(this.aggrAtTableLevel);this._setAggregateInTableFooter(this.showInTableFooter);this._setAggregateAtGroupLevel(this.aggrAtGroupLevel);this._setAggregateInGroupFooter(this.showInGroupFooter);this._populateSelectGroupNameElement();},_getAggregateAtGroupLevel:function(){if(this.aggrAtGroupLevel){return"true";}return"false";},_getAggregateAtTableLevel:function(){if(this.aggrAtTableLevel){return"true";}return"false";},_getShowInGroupFooter:function(){if(this.showInGroupFooter!=null){return this.showInGroupFooter?true:false;}},_getShowInTableFooter:function(){if(this.showInTableFooter!=null){return this.showInTableFooter?true:false;}},_setAggregateInTableFooter:function(A){this.tableFooter.setValue(A==null?false:A);this.tableHeader.setValue(A==null?false:!A);this.showInTableFooter=A;},_setAggregateAtTableLevel:function(A){this.tableLevel.setValue(A);this._enableTableLevelRadioButtons(A);},_setAggregateAtGroupLevel:function(A){this.groupLevel.setValue(A);if(A){this._enableGroupLevelRadioButtons();}else{this._disableGroupLevelRadioButtons();}},_setAggregateInGroupFooter:function(A){this.groupFooter.setValue(A==null?false:A);this.groupHeader.setValue(A==null?false:!A);this.showInGroupFooter=A;},_setWeightValue:function(){if(this.func!="WEIGHTEDAVE"){return ;}this.selectWeight.setValue(this.funcParam);},setAggrBlockColumnIndex:function(A){this.columnIndex=A;},getAggrBlockColumnIndex:function(){return this.columnIndex;},isVisible:function(){return(this.aggrBlock.style.display!="none"&&this.aggrBlock.style.display.length!=0);},_setVisible:function(A){this.aggrBlock.style.display=A?"block":"none";this.manager.aggregationBlockNumbersChanged(this.columnIndex);},hide:function(){this._setVisible(false);this._showSelectControls(false);this._hideQuart();this._hideWeight();},show:function(){this._setVisible(true);this._updateDefinition();this._showSelectControls(true);},_showSelectControls:function(A){this.selectWeight.setVisibility(A);this.selectQuart.setVisibility(A);this.selectSort.setVisibility(A);this.selectFunction.setVisibility(A);this.groupName.setVisibility(A);this.labelInputbox.setVisibility(A);},_populateWeightSelectOptions:function(){var A=this._getAllColumnNameAndIndex();this._populateSelectOptions(this.selectWeight,A,true,true);},_populateQuartSelectOptions:function(){var A=this._getQuartileParamArray();this._populateSelectOptions(this.selectQuart,A,false,false);},_populateSelectOptions:function(F,E,H,G){var C,D;var A=[];for(var B=0;B<E.length;B++){if(!H||actuate.util.Utility.isNumericalType(E[B].dataType)){if(G){if(E[B].value.indexOf("aggr")==-1){A.push([E[B].value,E[B].name]);}}else{A.push([E[B].value,E[B].name]);}}}F.setStore(A);},_populateSelectGroupNameElement:function(){var A=this._getGroupNames();if(A!=null&&A.length>0){var D=this.groupName;var B=[];if(A.length>1){B.push(["__aggregate_on_all_groups",actuate.util.Utility.getLocalizedString("columnAggregationDialog.allGroupsText")]);}for(var C=0;C<A.length;C++){B.push([A[C],A[C]]);}this.groupName.setStore(B);this.groupName.setSelectedIndex(0);this.groupLevel.enable();}else{this.groupLevel.disable();}},_populateSelectFunctionElement:function(){var C=[];var A=[];if(this.manager.isFunctionValueUsed(this.func,this.blockIndex,this.columnIndex)){this.func="";this.selectFunction.setValue(this.func);}if((!this.selectedColumn)||!actuate.util.Utility.isNumericalType(this.selectedColumn.dataType)){funcNum=actuate.util.Utility.getLocalizedString("columnAggregationDialog.functionItem.StringFunctionCount");for(var F=0;F<funcNum;F++){var D=this.manager.functionList[F].value;if(!this.manager.isFunctionValueUsed(D,this.blockIndex,this.columnIndex)){C.push([D,this.manager.functionList[F].name]);A.push({"value":D,"text":this.manager.functionList[F].name});}}}else{for(var F=0;F<this.manager.functionList.length;F++){var D=this.manager.functionList[F].value;if(!this.manager.isFunctionValueUsed(D,this.blockIndex,this.columnIndex)){C.push([D,this.manager.functionList[F].name]);A.push({"value":D,"text":this.manager.functionList[F].name});}}}var E=new actuate.uiadapter.SimpleStore({"id":0,fields:["value","text"],data:C,model:"AggregationSelecteFunctions",mobilefields:[{name:"value",type:"string"},{name:"text",type:"string"}],mobileData:A});if(this.blockIndex==0){if(this.columnIndex>=0){this.manager.functionStore[this.columnIndex]=E;}else{this.manager.functionStore=E;}}var B=E.query("text",this._getDefaultFunction());if(B.item&&B.items.length>0){B=B.item(0);this.func=B.data.value;}this.selectFunction.setStore(C);this.selectFunction.displayField="text";if(this.blockIndex>0){}else{this.selectFunction.setSelectedIndex(this._getDefaultFunctionIndex());}this.manager.filterFunctionValue(this.blockIndex,this.columnIndex);},cloneFunctionStore:function(G){var E=[];var C=G>=0?this.manager.functionStore[G]:this.manager.functionStore;C.each(function(I){E.push(I.copy());});var H=C.recordType;var D=new actuate.uiadapter.Store({recordType:H,model:"AggregationFunctions",mobilefields:[{name:"value",type:"string"},{name:"text",type:"string"}],mobileData:E});var A=actuate.util.browser&&actuate.util.browser.useMobile();if(!A){for(var F=0;F<E.length;F++){var B=new C._store.recordType({value:E[F].value,text:E[F].text});D.add(B);}}return D;},_populateSelectSortElement:function(){var A=[];A.push(["none",actuate.util.Utility.getLocalizedString("columnAggregationDialog.sortValue.NONE")]);A.push(["asc",actuate.util.Utility.getLocalizedString("columnAggregationDialog.sortValue.ASC")]);A.push(["desc",actuate.util.Utility.getLocalizedString("columnAggregationDialog.sortValue.DESC")]);this.selectSort.setStore(A);this.selectSort.setValue("none");},_getDefaultFunction:function(){var A=this._getDefaultFunctionIndex();if(A!=0){return this.manager.functionList[A].name;}return"";},_getDefaultFunctionIndex:function(){var A=this.selectedColumn.dataType;if(actuate.util.Utility.isNumericalType(A)){return 6;}else{if(this._isStringType(A)){return 2;}else{if(actuate.util.Utility.isDateTime(A)){return 2;}else{if(actuate.util.Utility.isDateTime(A)){return 2;}}}}return 0;},_isStringType:function(A){return A==actuate.Constant.DataType.STRING;},setData:function(C,M){this._reset(M);if(C==null){return ;}var N=C.functionName;var F=this.selectFunction.getRecordByValue(N);if(F==null){return ;}var B=null;var H=null;var D=null;var J=null;var G=null;var I=null;var L=null;if(C.functionParameter){B=C.functionParameter;}if(C.subTotal){var A=C.subTotal;H=A.enable;D=A.showInFooter;G=A.groupName;J=C.sortOrder;}if(!M){if(C.grandTotal){I=C.grandTotal.enable;L=C.grandTotal.showInFooter;}}else{I=false;}this.func=N;this.funcParam=B;this._setFunctionValue(this.func);var K=C.inputLabel;if(K==null){this.labelInputbox.disable();}else{this.labelInputbox.enable();this.labelInputbox.setValue(K);}this.labelFont=C.labelFont;this.aggrAtGroupLevel=H==null?false:H;this.aggrAtTableLevel=I==null?true:I;this.showInGroupFooter=D;this.showInTableFooter=L;this._setAggregateAtTableLevel(this.aggrAtTableLevel);this._setAggregateInTableFooter(this.showInTableFooter);this._setAggregateAtGroupLevel(this.aggrAtGroupLevel);this._setAggregateInGroupFooter(this.showInGroupFooter);this._disableTableLevelAggr(M);if(G&&G!=""){this.groupName.setValue(G);}else{this.groupName.setSelectedIndex(0);}if(C.isShared){this.isShared=true;this.selectFunction.disable();this.groupName.disable();this.tableLevel.disable();this.groupLevel.disable();}else{this.isShared=false;this.selectFunction.enable();if(this.aggrAtGroupLevel){this.groupName.enable();this.groupLevel.enable();}this.tableLevel.enable();}var E=(J==null||J=="")?"none":J;this.sortDir=E;this.selectSort.setValue(E);},_disableTableLevelAggr:function(A){if(A){this.tableLevel.disable();}else{this.tableLevel.enable();}},copyData:function(D){var C=(D.selectSort.getValue()==null||D.selectSort.getValue()=="")?"none":D.selectSort.getValue();this.selectSort.setValue(C);this.func=D.func;var A=D.selectFunction.getRecordByValue(D.func);this.funcParam=D.funcParam;this._setFunctionValue(this.func);var B=D.labelInputbox.getValue()==null?"":D.labelInputbox.getValue();this.labelInputbox.setValue(B);this.aggrAtGroupLevel=D.aggrAtGroupLevel==null?false:D.aggrAtGroupLevel;this.showInGroupFooter=(D.showInGroupFooter==null||!this.aggrAtGroupLevel)?true:D.showInGroupFooter;this.aggrAtTableLevel=D.aggrAtTableLevel==null?true:D.aggrAtTableLevel;this.showInTableFooter=(D.showInTableFooter==null||!this.aggrAtTableLevel)?true:D.showInTableFooter;this._setAggregateAtTableLevel(this.aggrAtTableLevel);this._setAggregateInTableFooter(this.showInTableFooter);this._setAggregateAtGroupLevel(this.aggrAtGroupLevel);this._setAggregateInGroupFooter(this.showInGroupFooter);this.groupName.setValue(D.groupName.getValue());},setFunctionToDefault:function(C){if(C){this._setFunctionValue(this._getDefaultFunction());var A=this.selectFunction.getRecordByText(this._getDefaultFunction());this.func=!!A?A.data.value:"";}else{this.func="";this._setFunctionValue("");}this._setAggregateAtTableLevel(this.aggrAtTableLevel);this._setAggregateInTableFooter(this.showInTableFooter);this._setAggregateAtGroupLevel(this.aggrAtGroupLevel);this._setAggregateInGroupFooter(this.showInGroupFooter);if(this.groupNameValue&&this.groupNameValue!=""){this.groupName.setValue(this.groupNameValue);}else{this.groupName.setSelectedIndex(0);}this._setWeightValue();this._setQuartValue();var B=(this.sortDir==null||this.sortDir==="")?"none":this.sortDir;this.selectSort.setValue(B);},_setFunctionValue:function(C){this.selectFunction.setValue(C);this.manager.filterFunctionValue(this.blockIndex,this.columnIndex);this.selectWeight.setValue("");this.selectQuart.setValue("");this._hideWeight();this._hideQuart();var A=this.selectFunction.getRecordByValue(C);var B=null;if(A){B=A.data.value;}if(B=="WEIGHTEDAVE"){this._setWeightValue();this._showWeight();}else{if(B=="QUARTILE"){this._setQuartValue();this._showQuart();}}this._updateDefinition();},_setQuartValue:function(){if(this.func!="QUARTILE"){return ;}this.selectQuart.setValue(this.funcParam);},_hideWeight:function(){this.selectWeightContainerDiv.style.display="none";this.selectWeightContainerDiv.style.visibility="hidden";this.selectWeight.hide();},_showWeight:function(){this.selectWeightContainerDiv.style.display="block";this.selectWeightContainerDiv.style.visibility="visible";this.selectWeight.show();},_hideQuart:function(){this.selectQuartContainerDiv.style.display="none";this.selectQuartContainerDiv.style.visibility="hidden";this.selectQuart.hide();},_showQuart:function(){this.selectQuartContainerDiv.style.display="block";this.selectQuartContainerDiv.style.visibility="visible";this.selectQuart.show();},_toString:function(){var E=null;var D=this.selectFunction.getValue();var B=this.selectFunction.getRecordByText(D);var C=null;if(B){C=B.data.value;}if(C=="WEIGHTEDAVE"){if(this._getColumnName(this.funcParam)&&this._getColumnName(this.funcParam)!=""){E="<br />"+this._getColumnName(this.funcParam);}}else{if(C=="QUARTILE"){E=this.funcParam;}}var A="";if(this.manager.isMultipleSelection){if(!this.manager.isMultipleSelection()&&this.selectedColumn&&D!=null&D!=""){A=D+"("+this.selectedColumn.displayName;if(E!=null){A+=","+E;}A+=")";}else{A=D;}}else{if(this.selectedColumn&&D!=null&D!=""){A=D+"("+this.selectedColumn.name;if(E!=null){A+=","+E;}A+=")";}}return A;},_getColumnName:function(A){if(!A){return"";}var C=this.columns;for(var B=0;B<C.length;B++){var D=C[B];if(D.value==A){return D.name;}}return"";},createBoundDataColumnNode:function(D,B){var A=actuate.util.XmlDom.createElement(D,actuate.Constant.tag.BOUNDDATACOLUMN);var C=actuate.util.XmlDom.createElement(D,actuate.Constant.tag.NAME);A.appendChild(C);var E=D.createTextNode(B.name);C.appendChild(E);return A;},createAggrElement:function(F,K){if(!this.isValid()){return null;}var E=actuate.util.XmlDom.createElement(F,actuate.Constant.tag.Aggregate);var H=actuate.util.XmlDom.createElement(F,actuate.Constant.tag.Func);var T=F.createTextNode(this.func);H.appendChild(T);E.appendChild(H);var M=actuate.util.XmlDom.createElement(F,"UIPosition");var b=F.createTextNode(K);M.appendChild(b);E.appendChild(M);if(this.funcParam!=null){var I=actuate.util.XmlDom.createElement(F,"FunctionParameter");var L=F.createTextNode(this.funcParam);I.appendChild(L);E.appendChild(I);}var Q=actuate.util.XmlDom.createElement(F,actuate.Constant.tag.SubTotal);var a=actuate.util.XmlDom.createElement(F,actuate.Constant.tag.Enable);var c=F.createTextNode(this._getAggregateAtGroupLevel());a.appendChild(c);var R=this._getShowInGroupFooter();if(R!=null){var V=actuate.util.XmlDom.createElement(F,actuate.Constant.tag.ShowInFooter);var C=F.createTextNode(R+"");V.appendChild(C);Q.appendChild(V);}Q.appendChild(a);var P="";if(this.groupName.getValue()!=null){P=this.groupName.getValue();}var Z=actuate.util.XmlDom.createElement(F,"GroupName");var J=F.createTextNode(P);Z.appendChild(J);Q.appendChild(Z);E.appendChild(Q);var W=actuate.util.XmlDom.createElement(F,actuate.Constant.tag.GrandTotal);var B=actuate.util.XmlDom.createElement(F,actuate.Constant.tag.Enable);var D=F.createTextNode(this._getAggregateAtTableLevel());B.appendChild(D);var O=this._getShowInTableFooter();if(O!=null){var N=actuate.util.XmlDom.createElement(F,actuate.Constant.tag.ShowInFooter);var G=F.createTextNode(O+"");N.appendChild(G);W.appendChild(N);}W.appendChild(B);E.appendChild(W);var U=actuate.util.XmlDom.createElement(F,actuate.Constant.tag.SortDir);var A=F.createTextNode(this.selectSort.getValue());U.appendChild(A);E.appendChild(U);var S=actuate.util.XmlDom.createElement(F,actuate.Constant.tag.Label);var Y=F.createTextNode(this.labelInputbox.getValue());S.appendChild(Y);E.appendChild(S);if(this.labelFont){var X=actuate.util.XmlDom.createElement(F,actuate.Constant.tag.LabelFont);this._parseFontInfo(F,X,this.labelFont);E.appendChild(X);}return E;},_parseFontInfo:function(I,F,D){if(D.family&&(D.family!=this.styleModel.fontFamilyDefault)){var G=actuate.util.XmlDom.createElement(I,actuate.Constant.tag.FAMILY);var C=I.createTextNode(D.family);G.appendChild(C);F.appendChild(G);}if(D.size&&(D.size!=this.styleModel.fontSizeDefault)){var J=actuate.util.XmlDom.createElement(I,actuate.Constant.tag.SIZE);var E=I.createTextNode(D.size);J.appendChild(E);F.appendChild(J);}if(D.color&&(D.color!=this.styleModel.colorDefault)){var B=actuate.util.XmlDom.createElement(I,actuate.Constant.tag.Color);var M=I.createTextNode(D.color);B.appendChild(M);F.appendChild(B);}if(D.backgroundColor&&(D.backgroundColor!=this.styleModel.backgroundColorDefault)){var A=actuate.util.XmlDom.createElement(I,actuate.Constant.tag.BackgroundColor);var L=I.createTextNode(D.backgroundColor);A.appendChild(L);F.appendChild(A);}if(D.bold){var H=actuate.util.XmlDom.createElement(I,actuate.Constant.tag.Bold);boldText=I.createTextNode(this.styleModel.getIsBold()+"");H.appendChild(boldText);F.appendChild(H);}if(D.italic){var K=actuate.util.XmlDom.createElement(I,actuate.Constant.tag.Italic);italicText=I.createTextNode(this.styleModel.getIsItalic()+"");K.appendChild(italicText);F.appendChild(K);}if(D.underline){var N=actuate.util.XmlDom.createElement(I,actuate.Constant.tag.Underline);underlineText=I.createTextNode(this.styleModel.getIsUnderline()+"");N.appendChild(underlineText);F.appendChild(N);}return I;},_prepareBindings:function(D){this.columns=[];for(var C in D){var B=D[C];if(!B.isAggregation){var A=new Object();A.name=B.displayName||"-";A.value=C;A.dataType=B.dataType;this.columns.push(A);}}},_prepareGroups:function(A){this.groups=new Array();for(var B=0;B<A.length;B++){var C=new Object();C.name=A[B].name;this.groups.push(C);}},_getAllColumnNameAndIndex:function(){var A=new Array();for(var B=0;B<this.columns.length;B++){var C=new Object();C.name=this.columns[B].name;C.value=this.columns[B].value;C.dataType=this.columns[B].dataType;A.push(C);}return A;},_getGroupNames:function(){var A=new Array();this._prepareGroups(this.manager.element.getGroupsArray());for(var B=0;B<this.groups.length;B++){A.push(this.groups[B].name);}return A;},_getQuartileParamArray:function(){var A=new Array({name:actuate.util.Utility.getLocalizedString("columnAggregationDialog.quartLabel.FIRST"),value:"1"},{name:actuate.util.Utility.getLocalizedString("columnAggregationDialog.quartLabel.SECOND"),value:"2"},{name:actuate.util.Utility.getLocalizedString("columnAggregationDialog.quartLabel.THIRD"),value:"3"},{name:actuate.util.Utility.getLocalizedString("columnAggregationDialog.quartLabel.FORTH"),value:"4"});return A;},isValid:function(){if(!this.func){return false;}if(this.func=="WEIGHTEDAVE"||this.func=="QUARTILE"){if(!this.funcParam){return false;}}return true;}};actuate.iv.ui.dialog.aggregation.IVAggregationBlock.AUTO_ID=1000;