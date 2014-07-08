actuate.util.Package.define("actuate.iv.ui.dialog.exportReport");actuate.iv.ui.dialog.exportReport.IVRenderOptionGroup=actuate.Class.create();actuate.iv.ui.dialog.exportReport.IVRenderOptionGroup.prototype={_classname:"actuate.iv.ui.dialog.exportReport.IVRenderOptionGroup",_parent:null,_formatName:null,_formatDisplayName:null,renderOptionsList:null,initialize:function(D,B,A,E,C){this._parent=D;this._formatName=B;this._formatdisplayName=A;this._renderOptionGroupEnclouse=this._init_htmlContent(C);this.renderOptionsList=this._setRenderParameterDefinitions(E);this.disableGroupRenderOptions(true);},_init_htmlContent:function(A){if(A){var B=document.createElement("DIV");A.appendChild(B);return B;}},disableGroupRenderOptions:function(A,C){if(A){this._renderOptionGroupEnclouse.style.display="none";this._renderOptionGroupEnclouse.style.visibility="hidden";}else{this._renderOptionGroupEnclouse.style.display="block";this._renderOptionGroupEnclouse.style.visibility="visible";for(var B=0;B<this.renderOptionsList.length;B++){if(this.renderOptionsList[B]){this.renderOptionsList[B].render((C?false:true));}}}},_setRenderParameterDefinitions:function(D){var E=[];var H=D.parameterDefinition||[];for(var C=0;C<H.length;C++){var G=H[C];var B=G.name;if(actuate.util.browser.useMobile()&&B.indexOf("PageRange")<=-1){continue;}var A=G.controlType;var I=null;var F=[];switch(A){case"ControlList":I=actuate.iv.ui.dialog.exportReport.IVSelectionRenderOption;break;case"ControlCheckBox":I=actuate.iv.ui.dialog.exportReport.IVCheckboxRenderOption;break;case"ControlRadioButton":I=actuate.iv.ui.dialog.exportReport.IVRadiobuttonRenderOption;break;case"ControlListAllowNew":I=actuate.iv.ui.dialog.exportReport.IVComboboxRenderOption;break;default:I=actuate.iv.ui.dialog.exportReport.IVTextboxRenderOption;}E[C]=new I(this._renderOptionGroupEnclouse,G,this._parent);}return E;},getRenderOptions:function(){return this.renderOptionsList;},getObjectArray:function(){var B=[];for(var A=0;A<this.renderOptionsList.length;A++){if(this.renderOptionsList[A]){B.push({name:this.renderOptionsList[A].getName(),value:this.renderOptionsList[A].getData()});}}return B;},getFormatName:function(){return this._formatName;},getFormatDisplayName:function(){return this._formatdisplayName;}};