actuate.util.Package.define("actuate.iv.ui.dialog.exportReport");actuate.iv.ui.dialog.exportReport.IVSelectionRenderOption=actuate.Class.create();actuate.iv.ui.dialog.exportReport.IVSelectionRenderOption.prototype=actuate.Class.extend(new actuate.iv.ui.dialog.exportReport.IVAbstractRenderOption(),{_selectInstance:null,_parent:null,initialize:function(B,A,C){this._parent=C;actuate.iv.ui.dialog.exportReport.IVAbstractRenderOption.prototype.initialize.call(this,A,B);},_init_htmlContent:function(D){var F=document.createElement("TABLE");F.className="tableWidth";var H=F.insertRow(-1);var B=H.insertCell(-1);B.className="labelCell";var C=document.createTextNode(this._displayName);B.appendChild(C);D.appendChild(F);var E=H.insertCell(-1);E.className="inputCell";var G=document.createElement("DIV");E.appendChild(G);var A=document.createElement("DIV");G.appendChild(A);this._selectInstance=new actuate.uiadapter.ComboBox({editable:false,width:135,margin:3});this._selectInstance.render(A);this._updateSelectList();},_updateSelectList:function(){var A=[];if(this._nameValuePair){for(var C=0;C<this._nameValuePair.length;C++){var D=this._nameValuePair[C].value;if(!D){continue;}var B=this._nameValuePair[C].name;B=B?B:D;A.push([D,B]);}}this._selectInstance.setStore(A);},setDefaultValue:function(){var A=0;if(this._nameValuePair&&this._defaultValue){for(var B=0;B<this._nameValuePair.length;B++){var C=this._nameValuePair[B].value;if(C==this._defaultValue){A=B;break;}}}this._selectInstance.setSelectedIndex(A);},getData:function(){return this._selectInstance.getValue();}});