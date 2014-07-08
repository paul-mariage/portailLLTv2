actuate.util.Package.define("actuate.iv.ui.view");actuate.iv.ui.view.IVToc=actuate.Class.create();actuate.iv.ui.view.IVToc.prototype=actuate.Class.extend(new actuate.iv.ui.view.IVView(),{_tocRoot:null,_closeButton:null,_currentTocNode:null,width:250,_selectedNode:null,_tocleafClassName:"tocItems actuateCSSSprite_view actuateIV_tocleaf",_tocleaf_activeClassName:"tocItems actuateCSSSprite_view actuateIV_tocleaf_active",initialize:function(I){actuate.iv.ui.view.IVView.prototype.initialize.call(this,I);var A=document.createElement("DIV");A.id="TOCPanel";A.style.display="none";A.className="toc";var G=document.createElement("DIV");G.className="paneHeader";A.appendChild(G);var F=document.createElement("LABEL");F.style.align="left";F.className="ivViewLabel";var C=document.createTextNode(actuate.util.Utility.getLocalizedString("toc.toolbar.displayname"));F.appendChild(C);G.appendChild(F);var J=document.createElement("INPUT");J.type="BUTTON";J.className="closeButton actuate-widget-tool actuate-widget-tool-left";J.title=actuate.util.Utility.getLocalizedString("toc.close");G.appendChild(J);var B=document.createElement("DIV");B.id="display0";B.className="tocContent";A.appendChild(B);var E=actuate.iv.utility.ivUtility.getElementByClassName(I.container,"content");if(E){E.appendChild(A);}this.instance=A;this.instance.style.display="";this.instance.style.width=this.width+"px";var H=this.instance.getElementsByTagName("div");this._tocRoot=H[1];var D=H[0].getElementsByTagName("input");this._closeButton=D[0];this._beh_toc_data_closure=actuate.Method.bind(this._beh_toc_data,this);this._neh_img_click_closure=actuate.Method.bindAsEventListener(this._neh_img_click,this);this._eh_resize_closure=actuate.Method.bindAsEventListener(this._eh_resize,this);this.__neh_item_mouse_over_closure=actuate.Method.bindAsEventListener(this._neh_mousemove,this);this.__neh_item_mouse_out_closure=actuate.Method.bindAsEventListener(this._neh_mouseout,this);this.__neh_item_click_closure=actuate.Method.bindAsEventListener(this._neh_text_click,this);this._headerHeight=G.offsetHeight;this._cb_installEventHandlers(this.instance.id);if(actuate.util.Utility.isIE8){J.buttonFixType=2;actuate.util.Utility.fixIE8ImageButtons(this.instance);}},_cb_installEventHandlers:function(A){actuate.util.Event.observe(this._closeButton,"click",actuate.Method.bindAsEventListener(this._neh_click,this),false);this._viewer.eventDispatcher.registerEventHandler(actuate.iv.core.iVEvent.__E_TOC_DATA,A,this._beh_toc_data_closure);this._viewer.eventDispatcher.registerEventHandler(actuate.iv.core.iVEvent.__E_RESIZE,A,this._eh_resize_closure);},_neh_mousemove:function(A){var B=actuate.util.Event.element(A);this._highlightNode(B);},_highlightNode:function(B){if(B){if(!B.getAttribute("background-Color")){B.setAttribute("background-Color",B.style.backgroundColor);B.setAttribute("color",B.style.color);}B.style.backgroundColor="#2298fb";B.style.color="#FFFFFF";if(B.parentNode&&B.parentNode.tagName=="TD"&&B.parentNode.className=="actuateIV_tocleaf_td"){var A=B.parentNode.getElementsByClassName(this._tocleafClassName);if(A&&A.length>0){A[0].className=this._tocleaf_activeClassName;}if(!B.parentNode.getAttribute("background-Color")){B.parentNode.setAttribute("background-Color",B.parentNode.style.backgroundColor);B.parentNode.setAttribute("color",B.parentNode.style.color);}B.parentNode.style.backgroundColor="#2298fb";B.parentNode.style.color="#FFFFFF";}}},_reSetNodecolor:function(B){if(B){B.style.backgroundColor=B.getAttribute("background-Color");B.style.color=B.getAttribute("color");if(B.parentNode&&B.parentNode.tagName=="TD"&&B.parentNode.className=="actuateIV_tocleaf_td"){var A=B.parentNode.getElementsByClassName(this._tocleaf_activeClassName);if(A&&A.length>0){A[0].className=this._tocleafClassName;}B.parentNode.style.backgroundColor="";B.parentNode.style.color="";}}},_neh_mouseout:function(A){var B=actuate.util.Event.element(A);if(!this._selectedNode||this._selectedNode!=B){this._reSetNodecolor(B);}},_neh_click:function(A){this._viewer.eventDispatcher.broadcastEvent(actuate.iv.core.iVEvent.__E_BLUR_CONTEXTMENU);this.close();},_clearTocRoot:function(){this._tocRoot.innerHTML="";var A=this._tocRoot;while(A.firstChild){A.removeChild(A.firstChild);}this._currentTocNode=null;},_resetCurrentNode:function(){this._currentTocNode=null;},processBind:function(E,b){this.instance.style.display="";this.instance.style.width=this.width+"px";this._viewer.eventDispatcher.broadcastEvent(actuate.iv.core.iVEvent.__E_RESIZE);var C=this._viewer.getBaseUrl();var V=b.getElementsByTagName("Child");var d=true;var T=b.getElementsByTagName("Json");if(T.length>0){if(actuate.util.Utility.parseJson(T[0]).Operator=="GetToc"){d=false;}}if(d){this._clearTocRoot();}var U=V.length;if(U==0){this._clearTocRoot();}else{var D=document.createElement("table");D.border="0";D.cellspacing="0";D.cellpadding="0";var B=document.createElement("tbody");for(var S=0;S<U;S++){var N=null;if(this._currentTocNode==null){N="0"+"_"+S;}else{N=this._currentTocNode.id+"_"+S;}var Z=document.createElement("tr");var G=document.createElement("td");G.valign="top";G.id="td"+N;var W=V[S];var Q=W.getElementsByTagName("IsLeaf");var c=document.createElement("input");c.type="button";c.plusMinus="+";c.id=N;c.style.verticalAlign="middle";if(Q[0].firstChild.data=="false"){c.className="tocItems actuateCSSSprite_view actuateIV_tocexpand";c.style.cursor="pointer";actuate.util.Event.observe(c,"click",this._neh_img_click_closure,false);}else{c.className=this._tocleafClassName;c.style.cursor="default";G.className="actuateIV_tocleaf_td";}var R=W.getElementsByTagName("Id");c.nodeId=R[0].firstChild.data;var H=W.getElementsByTagName("Bookmark");c.bookmark=H[0].firstChild.data;G.appendChild(c);G.appendChild(document.createTextNode(" "));var J=document.createElement("input");var Y=W.getElementsByTagName("DisplayName");var A=Y[0].firstChild;var O=W.getElementsByTagName("Id");var M=O[0].firstChild;var K=(!A)?M.data:A.data;J.type="button";J.value=K;J.title=K;J.id="span_"+N;var a="color: #646464; padding-left: 0px;cursor:pointer;background-color:#e9e9e9;border:0px;overflow:visible;vertical-align:middle;";if(actuate.util.browser.isFirefox){a+="display:table-cell;";}var I=W.getElementsByTagName("Style");if(I&&I.length>0){if(I[0].firstChild){J.style.cssText=a+I[0].firstChild.data;}else{J.style.cssText=a;}}G.appendChild(J);G.setAttribute("nowrap","true");Z.appendChild(G);var X=document.createElement("tr");var F=document.createElement("td");F.id="display"+N;F.style.paddingLeft="10px";F.style.display="none";X.appendChild(F);B.appendChild(Z);B.appendChild(X);actuate.util.Event.observe(J,"mouseover",this.__neh_item_mouse_over_closure,false);actuate.util.Event.observe(J,"mouseout",this.__neh_item_mouse_out_closure,false);actuate.util.Event.observe(J,"click",this.__neh_item_click_closure,false);}D.appendChild(B);var L=null;if(this._currentTocNode==null){var L=this._tocRoot;}else{L=this._currentTocNode.parentNode.parentNode.nextSibling.firstChild;}var P=L.childNodes.length;if(P==0){L.appendChild(D);}else{L.replaceChild(D,L.childNodes[0]);}}this._updateSize();},processAction:function(B,A){if("Close"==A){this._showPVMessage();}},_neh_text_click:function(B){this._viewer.eventDispatcher.broadcastEvent(actuate.iv.core.iVEvent.__E_BLUR_CONTEXTMENU);var A=actuate.util.Event.element(B);var C=A.parentNode.firstChild;this._viewer.eventDispatcher.broadcastEvent(actuate.iv.core.iVEvent.__E_GETPAGE,{name:"bookmark",value:C.bookmark});var D=actuate.util.Event.element(B);this._reSetNodecolor(this._selectedNode);this._selectedNode=D;},_neh_img_click:function(C){this._viewer.eventDispatcher.broadcastEvent(actuate.iv.core.iVEvent.__E_BLUR_CONTEXTMENU);var B=this._viewer.getBaseUrl();var D=actuate.util.Event.element(C);D.className=(D.plusMinus=="+")?"tocItems actuateCSSSprite_view actuateIV_toccollapse":"tocItems actuateCSSSprite_view actuateIV_tocexpand";D.plusMinus=(D.plusMinus=="+")?"-":((D.plusMinus=="-")?"+":"0");var A=D.parentNode.parentNode.nextSibling.firstChild;A.style.display=(D.plusMinus=="+")?"none":"";if(!D.dataLoaded){D.dataLoaded="true";this._currentTocNode=D;this._viewer.eventDispatcher.broadcastEvent(actuate.iv.core.iVEvent.__E_TOC_DATA,D.nodeId);}},_eh_resize:function(){this._updateSize();},_updateSize:function(){var A=this._viewer.height;if(this._viewer._parameterPanel&&this._viewer._parameterPanel.isVisible()){var B=(this._viewer.contentPanel&&this._viewer.contentPanel.getNavbarHeight)?this._viewer.contentPanel.getNavbarHeight():0;A=A-this._viewer._parameterPanel.getPanelHeight()-B;}else{A-=this._viewer.navbar.height;}this.instance.style.height=A+"px";var C=this._tocRoot.getElementsByTagName("table");this._tocRoot.style.height=A-this._headerHeight+"px";},_beh_toc_data:function(C,B,A){B.addOperation(actuate.Constant.tag.documentId,actuate.Constant.tag.Document,"GetToc",[null,[{name:"realId",value:A}]]);return true;},_showPVMessage:function(){if(this.isVisible()){this._clearTocRoot();this._tocRoot.innerHTML=actuate.util.Utility.getLocalizedString("toc.reportinPV");}},close:function(){if(this.isVisible()){this._clearTocRoot();this.instance.style.display="none";this._viewer.eventDispatcher.broadcastEvent(actuate.iv.core.iVEvent.__E_RESIZE);}}});