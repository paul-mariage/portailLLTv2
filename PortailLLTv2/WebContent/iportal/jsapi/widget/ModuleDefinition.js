// This file is build time generated. Please don't modify. 
actuate.resource.module.define("actuate.widget",
{
_jsPath :  "iportal/jsapi/widget",
_jsFiles : new Array( "widget.js" ),
	_imagePath : "iportal/jsapi/actuate/widget/images/",	
_cssPath : "iportal/jsapi/actuate/widget/styles/",
_cssFiles : new Array( "widget.css" ),
	_publicClasses:
	{
		"noClass":null 
	},
	_onLoad : function()
	{	    
	    this._fixCssImages();
	},
	_localizedStringServlet : "ivresource",
	_localizedString : true,
	_fixCssImages : function()
	{
		var basePath = actuate.getDefaultIportalUrl() + "iportal/jsapi/actuate/widget/images/";
		var css = ""; 
		css += ".actuate-combo-list-hd, .actuate-list-hd {background-image: url(" + basePath + "panel-title-light-bg.gif);} "; 
		css += ".actuate-form-check {background-image: url(" + basePath + "checkbox.gif);} "; 
		css += ".actuate-form-radio {background-image: url(" + basePath + "radio.gif);} "; 
		css += "ul.actuate-tab-strip-top {background-image: url(" + basePath + "tabs/tab-strip-bg.gif);} ";
		css += ".actuate-tab-strip-top .actuate-tab-right {background-image: url(" + basePath + "tabs/tabs-sprite.gif);} ";
		css += ".actuate-tab-strip-top .actuate-tab-left {background-image: url(" + basePath + "tabs/tabs-sprite.gif);} ";
		css += ".actuate-tab-strip-top .actuate-tab-strip-inner {background-image: url(" + basePath + "tabs/tabs-sprite.gif);} ";
		css += ".actuate-tab-strip .actuate-tab-strip-closable a.actuate-tab-strip-close {background-image: url(" + basePath + "tabs/tab-close.gif);} ";
		css += ".actuate-tab-strip .actuate-tab-strip-closable a.actuate-tab-strip-close:hover {background-image: url(" + basePath + "tabs/tab-close.gif);} ";
		css += ".actuate-tab-scroller-left {background-image: url(" + basePath + "tabs/icon-tab-arrow-left.png);} ";
		css += ".actuate-tab-scroller-right {background-image: url(" + basePath + "tabs/icon-tab-arrow-right.png);} ";
		css += ".actuate-tree-node-expanded .actuate-tree-node-icon {background-image: url(" + basePath + "tree/folder-open.png);} ";
		css += ".actuate-tree-node-collapsed .actuate-tree-node-icon {background-image: url(" + basePath + "tree/folder.png);} ";
		css += ".actuate-tree-lines .actuate-tree-elbow {background-image: url(" + basePath + "tree/elbow.gif);} ";
		css += ".actuate-tree-lines .actuate-tree-elbow-plus {background-image: url(" + basePath + "tree/elbow-plus.gif);} ";
		css += ".actuate-tree-lines .actuate-tree-elbow-minus {background-image: url(" + basePath + "tree/elbow-minus.gif);} ";
		css += ".actuate-tree-lines .actuate-tree-elbow-end {background-image: url(" + basePath + "tree/elbow-end.gif);} ";
		css += ".actuate-tree-lines .actuate-tree-elbow-end-plus {background-image: url(" + basePath + "tree/elbow-end-plus.gif);} ";
		css += ".actuate-tree-lines .actuate-tree-elbow-end-minus {background-image: url(" + basePath + "tree/elbow-end-minus.gif);} ";
		css += ".actuate-tree-lines .actuate-tree-elbow-line {background-image: url(" + basePath + "tree/elbow-line.gif);} ";
		css += ".actuate-tree-no-lines .actuate-tree-elbow-plus {background-image: url(" + basePath + "tree/elbow-plus-nl.gif);} ";
		css += ".actuate-tree-no-lines .actuate-tree-elbow-minus {background-image: url(" + basePath + "tree/elbow-minus-nl.gif);} ";
		css += ".actuate-tree-no-lines .actuate-tree-elbow-end-plus {background-image: url(" + basePath + "tree/elbow-end-plus-nl.gif);} ";
		css += ".actuate-tree-no-lines .actuate-tree-elbow-end-minus {background-image: url(" + basePath + "tree/elbow-end-minus-nl.gif);} ";
		css += ".actuate-tree-drop-ok-append .actuate-dd-drop-icon {background-image: url(" + basePath + "tree/drop-add.gif);} ";
		css += ".actuate-tree-drop-ok-above .actuate-dd-drop-icon {background-image: url(" + basePath + "tree/drop-over.gif);} ";
		css += ".actuate-tree-drop-ok-below .actuate-dd-drop-icon {background-image: url(" + basePath + "tree/drop-under.gif);} ";
		css += ".actuate-tree-drop-ok-between .actuate-dd-drop-icon {background-image: url(" + basePath + "tree/drop-between.gif);} ";
		css += ".actuate-tree-arrows .actuate-tree-elbow-plus, .actuate-tree-arrows .actuate-tree-elbow-minus, " +
				".actuate-tree-arrows .actuate-tree-elbow-end-plus, .actuate-tree-arrows .actuate-tree-elbow-end-minus " +
				"{background-image: url(" + basePath + "tree/arrows.gif);} ";
		css += ".actuate-dd-drop-nodrop .actuate-dd-drop-icon {background:-image url(" + basePath + "dd/drop-no.gif)} ";
		css += ".actuate-dd-drop-ok .actuate-dd-drop-icon {background:-image url(" + basePath + "dd/drop-yes.gif)} ";
		css += ".actuate-dd-drop-ok-add .actuate-dd-drop-icon {background:-image url(" + basePath + "dd/drop-add.gif)} ";
		css += ".actuate-widget-html-editor-tb .actuate-widget-btn-text {background:transparent url(" + basePath + "editor/tb-sprite.gif) no-repeat;}";
		actuate.util.Style.addStyleSheet(css);
	    actuate.widget.BLANK_IMAGE_URL = basePath + "s.gif";
	},
_noComma : null
});
