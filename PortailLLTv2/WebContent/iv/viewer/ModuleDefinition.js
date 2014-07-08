// This file is build time generated. Please don't modify. 
actuate.resource.module.define("actuate.viewer",
{
_jsPath :  "iv/viewer",
_jsFiles : new Array( "viewer.js" ),
_cssPath : "iv/styles/",
_cssFiles : new Array( "viewer.css" ),
_desktopCssFiles : new Array( "viewer_desktop.css" ),
_mobileCssPath : "iv/styles/",
_mobileCssFiles : new Array( "viewer_mobile.css" ),
	_localizedStringServlet : "ivresource",
	_localizedString : true,
	_htmlResourcesUri : "ivresource",
	_onAfterHtmlResourcesLoaded : function( )
	{
		actuate.iv.utility.ivZIndex =  new actuate.iv.utility.IVZIndex( );
		actuate.iv.ui.app.ivMask =  new actuate.iv.ui.app.IVMask( );
		actuate.iv.ui.app.ivProgressMask =  new actuate.iv.ui.app.IVProgressMask( );
		var resourcesContainer = document.getElementById(
				actuate.resource.module.getResourcesContainerId(
						this._moduleName
						)
				);
		if( resourcesContainer != null )
		{	
			resourcesContainer.style.display = "inline";
		}	
	},
	_publicClasses:
	{
		"actuate.Viewer":"actuate.viewer.impl.Viewer",
		"actuate.viewer.EventConstants":"actuate.viewer.impl.EventConstants",
		"actuate.viewer.PageContent": "actuate.viewer.impl.PageContent",
		"actuate.viewer.SelectedContent": "actuate.viewer.impl.SelectedContent",
		"actuate.viewer.ViewerException": "actuate.viewer.impl.ViewerException",
		"actuate.viewer.UIOptions":"actuate.viewer.impl.UIOptions",
		"actuate.viewer.ScrollPanel": "actuate.viewer.impl.ScrollPanel",
		"actuate.viewer.BrowserPanel": "actuate.viewer.impl.BrowserPanel",
		"actuate.viewer.UIConfig": "actuate.viewer.impl.UIConfig",	
		"actuate.viewer.RenderOptions":"actuate.viewer.impl.RenderOptions",
		"actuate.viewer.HTMLControl":"actuate.viewer.impl.HTMLControl",
		"actuate.viewer.ParameterValue":"actuate.viewer.impl.ParameterValue",
		"actuate.DataService":"actuate.data.impl.DataService",
		"actuate.data.Filter":"actuate.data.impl.Filter",
		"actuate.data.Request":"actuate.data.impl.Request",
		"actuate.data.ResultSet":"actuate.data.impl.ResultSet",
		"actuate.data.Sorter": "actuate.data.impl.Sorter",
		"actuate.data.ReportContent": "actuate.data.impl.ReportContent",	
		"actuate.report.Chart": "actuate.report.impl.Chart",
		"actuate.report.Crosstab": "actuate.report.impl.Crosstab",
		"actuate.report.DataItem": "actuate.report.impl.DataItem",
		"actuate.report.FlashObject": "actuate.report.impl.FlashObject",
		"actuate.report.Gadget": "actuate.report.impl.Gadget",
		"actuate.report.Label": "actuate.report.impl.Label",
		"actuate.report.Table": "actuate.report.impl.Table",
		"actuate.report.TextItem": "actuate.report.impl.TextItem",
		"actuate.viewer.Chart": "actuate.report.impl.Chart",
		"actuate.viewer.DataItem": "actuate.report.impl.DataItem",
		"actuate.viewer.FlashObject": "actuate.report.impl.FlashObject",
		"actuate.viewer.Gadget": "actuate.report.impl.Gadget",
		"actuate.viewer.Label": "actuate.report.impl.Label",
		"actuate.viewer.Table": "actuate.report.impl.Table",
		"actuate.viewer.TextItem": "actuate.report.impl.TextItem",
		"noClass":null 
	},
_noComma : null
});
