actuate.util.Package.define("actuate.dialog.impl.helper.font");actuate.dialog.impl.helper.font.StylePreviewView=function(A){this.previewTextId=A;};actuate.dialog.impl.helper.font.StylePreviewView.prototype={showPreview:function(B){var A=document.getElementById(this.previewTextId);this.prepareText(A,B);this.setStyles(A,B);},prepareText:function(A,B){if(B.isDefault()){A.innerHTML=actuate.util.Utility.getLocalizedString("conditionFormatDialog.text.noFormatRule");}else{A.innerHTML=actuate.util.Utility.getLocalizedString("conditionFormatDialog.text.displayText");}},setStyles:function(A,C){A.style.fontFamily=C.getFontFamily();var E=C.getFontSize();if(E.toLowerCase()==C.fontSizeDefault){A.style.fontSize="";}else{if(actuate.util.Utility.isNumeric(E)){E=E+C.getFontSizeUnit();}A.style.fontSize=E;}var D=C.getBackgroundColor();if(D&&D.toLowerCase()==C.backgroundColorDefault){A.parentNode.style.backgroundColor="";}else{A.parentNode.style.backgroundColor=actuate.util.Utility.encodeColor(D);}var B=C.getColor();if(B&&B.toLowerCase()==C.colorDefault){A.parentNode.style.color="";}else{A.parentNode.style.color=actuate.util.Utility.encodeColor(B);}A.style.fontWeight=C.getIsBold()?"bold":"";A.style.fontStyle=C.getIsItalic()?"italic":"";A.style.textDecoration=C.getIsUnderline()?"underline":"";if(C.getAlignment&&C.getAlignment()){A.parentNode.style.textAlign=C.getAlignment();}else{A.parentNode.style.textAlign="center";}},isInColorOptions:function(A){var D=actuate.dialog.FontOptions.fontColors;if(D){for(var B=0;B<D.length;B++){for(var C in D[B]){if(A.toLowerCase()==D[B][C]){return true;}}}}}};