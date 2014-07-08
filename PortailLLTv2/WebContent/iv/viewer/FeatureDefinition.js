/******************************************************************************
 *	Copyright (c) 2004 Actuate Corporation and others.
 *	All rights reserved. This program and the accompanying materials 
 *	are made available under the terms of the Eclipse Public License v1.0
 *	which accompanies this distribution, and is available at
 *		http://www.eclipse.org/legal/epl-v10.html
 *	
 *	@fileoverview This file defines class actuate.iv.constant
 *	@author Actuate Corporation - IV Team
 *	@version 10.0
 *****************************************************************************/
actuate.util.Package.define( "actuate.iv" ); 

/**
 * Constant class serves as resource definition class for IV lazy loading use
 * @class This class serves as the resource definition class for IV lazy loading use.
 * @name actuate.iv.FeatureDefinition
 */

actuate.resource.module.feature.define( actuate.util.Constants.MODULE_NAME_VIEWER,
{
	/**
	 * Javascript resource definition which can be used by differenct feartures.
	 */
	javaScriptAlias : 
{
"PageBreakDialog" : "/feature54744.js",
"HideShowItemDialog" : "/feature54745.js",
"AggregationBlock" : "/feature54746.js",
"ColumnAggregationDialog" : "/feature54747.js",
"AggregationAccordionDialog" : "/feature54748.js",
"ShowColumnDialog" : "/feature54749.js",
"ArrangeColumnDialog" : "/feature54750.js",
"SimpleExportDataDialog" : "/feature54751.js",
"ExportReportDialog" : "/feature54752.js",
"SelectionRenderOption" : "/feature54753.js",
"CheckboxRenderOption" : "/feature54754.js",
"TextboxRenderOption" : "/feature54755.js",
"RadiobuttonRenderOption" : "/feature54756.js",
"ComboboxRenderOption" : "/feature54757.js",
"ListRenderOption" : "/feature54758.js",
"RenderOptionGroup" : "/feature54759.js",
"File" : "/feature54760.js",
"FileBrowsingDialogBase" : "/feature54761.js",
"FileBrowsingDialogModel" : "/feature54762.js",
"SaveFileDialogModel" : "/feature54763.js",
"SaveFileDialog" : "/feature54764.js",
"SaveDocumentDialog" : "/feature54765.js",
"MoveToGroupDialog" : "/feature54766.js",
"AdvancedSortDialog" : "/feature54767.js",
"GroupDetailDialog" : "/feature54768.js",
"ValueDialog" : "/feature54769.js",
"ConditionalFormattingDialog" : "/feature54770.js",
"LinkToThisPageDialog" : "/feature54771.js",
"PrintDialog" : "/feature54772.js",
"ChartSubTypeDialog" : "/feature54773.js",
"FlashGadgetTypeDialog" : "/feature54774.js",
"ColumnDataTypeDialog" : "/feature54775.js",
"AvailableDataItemDialog" : "/feature54776.js",
"ChartFormatDialog" : "/feature54777.js",
"WarningDialog" : "/feature54778.js",
"ExceptionDialog" : "/feature54779.js",
"StylePreviewView" : "/feature54780.js",
"StyleModel" : "/feature54781.js",
"StyleMenus" : "/feature54782.js",
"ConditionModel" : "/feature54783.js",
"ConditionSelectionView" : "/feature54784.js",
"ConditionalFormattingOperator" : "/feature54785.js",
"FormattingRule" : "/feature54786.js",
"Toc" : "/feature54787.js",
"Parameter" : "/feature54788.js",
"DataAnalyzerDialog" : "/feature54789.js",
"FacebookCommentPanel" : "/feature54790.js"
	}, 
	
	/**
	 * Feature defintions for on demand loading use
	 */
	AVAILABLE_FEATURES : 
	{		

		PAGE_BREAK_DIALOG :
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"PageBreakDialog" 
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "PageBreakDialog" ],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_localizedString : [ "pageBreakDialog" ],
					
			_cssFiles 			: new Array(
									"pageBreakDialog.css"
									),
  			_mobileCssFiles		: new Array(
									"pageBreakDialog_mobile.css"
									),
			
			/**
			 * Class instance to be created
			 * @type {Array}
			 */
			_classInstance : [ 
					"actuate.iv.ui.dialog.IVPageBreakDialog"
					]
		}, 
		
		HIDESHOW_ITEM_DIALOG :
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"HideShowItemDialog" 
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "HideShowItemDialog" ],
					
			_cssFiles 			: new Array(
									"hideShowItemDialog.css"
									),
									
  			_mobileCssFiles		: new Array(
									"hideShowItemDialog_mobile.css"
									),
			
			/**
			 * Class instance to be created
			 * @type {Array}
			 */
			_classInstance : [ 
					"actuate.iv.ui.dialog.group.IVHideShowItemDialog"
					]
		}, 
		
		AGGREGATION_DIALOG :
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"AggregationBlock",
					"AggregationAccordionDialog",
					"ColumnAggregationDialog",
					"StyleModel"
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [
					"ColumnAggregationDialog",
					"AggregationAccordionDialog"
					 ],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_localizedString : [ "columnAggregationDialog" ],
					
			_cssFiles 			: new Array(
									"columnAggregationDialog.css"
									),
  			_mobileCssFiles		: new Array(
									"columnAggregationDialog_mobile.css"
									),
			
			/**
			 * Class instance to be created
			 * @type {Array}
			 */
			_classInstance : [ 
			    	"actuate.iv.ui.dialog.aggregation.IVColumnAggregationDialog",
			    	"actuate.iv.ui.dialog.aggregation.IVAggregationAccordionDialog"
					]
		}, 
		
		SHOW_COLUMN_DIALOG :
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"ShowColumnDialog"
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "ShowColumnDialog" ],
					
			_cssFiles 			: new Array(
									"showColumnDialog.css"
									),
			
			/**
			 * Class instance to be created
			 * @type {Array}
			 */
			_classInstance : [ 
					"actuate.iv.ui.dialog.column.IVShowColumnDialog"
					]
		}, 
		
		MANAGETABLECOLUMN_DIALOG :
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"ArrangeColumnDialog"
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "ArrangeColumnDialog" ],
			
			_cssFiles 			: new Array(
									"arrangeColumnDialog.css"
									),
									
  			_mobileCssFiles		: new Array(
									"arrangeColumnDialog_mobile.css"
									),
			
			/**
			 * Class instance to be created
			 * @type {Array}
			 */
			_classInstance : [ 
					"actuate.iv.ui.dialog.column.IVArrangeColumnDialog"
					]
		}, 
	
		EXPORT_DIALOG :
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"SimpleExportDataDialog"
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "SimpleExportDataDialog" ],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_localizedString : [ "SimpleExportDataDialog" ],		
			
			_cssFiles 			: new Array(
									"simpleExportDataDialog.css"
									),
									
  			_mobileCssFiles		: new Array(
									"simpleExportDataDialog_mobile.css"
									),
			
			/**
			 * Class instance to be created
			 * @type {Array}
			 */
			_classInstance : [ 
					"actuate.iv.ui.dialog.IVSimpleExportDataDialog"
					]
		}, 
		
		EXPORTREPORT_DIALOG :
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"ExportReportDialog",
					"SelectionRenderOption",
					"CheckboxRenderOption",
					"TextboxRenderOption",
					"RadiobuttonRenderOption",
					"ComboboxRenderOption",
					"ListRenderOption",
					"RenderOptionGroup"
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "ExportReportDialog" ],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_localizedString : [ "exportReportDialog" ],			
			
			_cssFiles 			: new Array(
									"exportReportDialog.css"
									),
  			_mobileCssFiles		: new Array(
									"exportReportDialog_mobile.css"
									),
			
			/**
			 * Class instance to be created
			 * @type {Array}
			 */
			_classInstance : [ 
					"actuate.iv.ui.dialog.exportReport.IVExportReportDialog"
					]
		}, 
		
		SAVE__DIALOG :
		{	 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"File",
					"FileBrowsingDialogBase",
					"FileBrowsingDialogModel",
					"SaveFileDialogModel",
					"SaveFileDialog",
					"SaveDocumentDialog"
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "SaveDialog" ],

			_localizedString : [ "saveViewDialog", "saveDocumentDialog" ],			
			
			_cssFiles 			: new Array(
									"saveFileDialog.css"
									),
									
  			_mobileCssFiles		: new Array(
									"saveFileDialog_mobile.css"
									),
			
			/**
			 * Class instance to be created
			 * @type {Array}
			 */
			_classInstance : [
					"actuate.iv.ui.dialog.file.IVFileBrowsingDialogBase",
			 		"actuate.iv.ui.dialog.file.IVSaveFileDialog",
			 		"actuate.iv.ui.dialog.file.IVSaveDocumentDialog"
					]
		}, 
		
		GROUP_DIALOG :
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"MoveToGroupDialog"
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "MoveToGroupDialog" ],			
			
			_cssFiles 			: new Array(
									"moveToGroupDialog.css"
									),
			
			/**
			 * Class instance to be created
			 * @type {Array}
			 */
			_classInstance : [ 
					"actuate.iv.ui.dialog.column.IVMoveToGroupDialog"
					]
		}, 
		
		ADVANCED_SORT_DIALOG :
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"AdvancedSortDialog" 
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "AdvancedSortDialog" ],
			
			/**
			 * Localized string to be loaded
			 * @type {String}
			 */
			_localizedString : [ "advancedSortDialog" ],		
			
			_cssFiles 			: new Array(
									"advancedSortDialog.css"
									),
			
			
			/**
			 * Class instance to be created
			 * @type {Array}
			 */
			_classInstance : [ 
					"actuate.iv.ui.dialog.IVAdvancedSortDialog"
					]
		}, 
		
		GROUP_DETAIL_DIALOG :
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"GroupDetailDialog"
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "GroupDetailDialog" ],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_localizedString : [ "groupDetailDialog" ],		
			
			_cssFiles 			: new Array(
									"groupDetailDialog.css"
									),
									
  			_mobileCssFiles		: new Array(
									"groupDetailDialog_mobile.css"
									),
			
			/**
			 * Class instance to be created
			 * @type {Array}
			 */
			_classInstance : [ 
					"actuate.iv.ui.dialog.group.IVGroupDetailDialog"
					]
		},
		
		VALUE_DIALOG :
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"ValueDialog"
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "ValueDialog" ],

			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_localizedString : [ "valueDialog" ],	
			
			_cssFiles 			: new Array(
									"valueDialog.css"
									),
  			_mobileCssFiles		: new Array(
									"valueDialog_mobile.css"
									),
			
			/**
			 * Class instance to be created
			 * @type {Array}
			 */
			_classInstance : [ 
	  				"actuate.iv.ui.dialog.style.IVValueDialog"
					]
		},
		
		CONDITIONALFORMATTING_DIALOG :
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"ConditionModel", 
					"ConditionalFormattingOperator",
					"ConditionSelectionView",
					"StyleMenus",
					"StyleModel",
					"StylePreviewView",
					"FormattingRule",
					"ConditionalFormattingDialog"
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "ConditionalFormattingDialog" ],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_localizedString : [ "conditionFormatDialog" ],	
			
			_cssFiles 			: new Array(
									"conditionFormatDialog.css"
									),
  			_mobileCssFiles		: new Array(
									"conditionFormatDialog_mobile.css"
									),
			/**
			 * Class instance to be created
			 * @type {Array}
			 */
			_classInstance : [ 
	  				"actuate.iv.ui.dialog.style.IVConditionalFormattingDialog"
					]
		},
		
		LINKTOTHISPAGE_DIALOG :
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"LinkToThisPageDialog"
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "LinkToThisPageDialog" ],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_localizedString : [ "linkToThisPageDialog" ],
			
			_cssFiles 			: new Array(
									"linkToThisPageDialog.css"
									),
			
			/**
			 * Class instance to be created
			 * @type {Array}
			 */
			_classInstance : [ 
	  				"actuate.iv.ui.dialog.IVLinkToThisPageDialog"
					]
		},
		
		PRINT_DIALOG :
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"PrintDialog"
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "PrintDialog" ],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_localizedString : [ "printDialog" ],
			
			_cssFiles 			: new Array(
									"printDialog.css"
									),
			
			/**
			 * Class instance to be created
			 * @type {Array}
			 */
			_classInstance : [ 
	  				"actuate.iv.ui.dialog.IVPrintDialog"
					]
		}, 
		
		FACEBOOK_COMMENTS_PANEL:
		{
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"FacebookCommentPanel"
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "FacebookCommentPanel" ],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_localizedString : [ "facebookCommentPanel" ],
			
			/**
			 * Class instance to be created
			 * @type {Array}
			 */
			_classInstance : [ 
	  				"actuate.iv.ui.view.IVFacebookComments"
					]
		},
		
		CHART_TYPE_DIALOG :
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"ChartSubTypeDialog",
					"FlashGadgetTypeDialog"
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "ChartTypeDialog" ],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_localizedString : [ 
					"chartSettingsDialog", 
					"flashGadgetTypeDialog" 
					],
			
			_cssFiles 			: new Array(
									"chartSubTypeDialog.css",
									"flashGadgetTypeDialog.css"
									),
			
			/**
			 * Class instance to be created
			 * @type {Array}
			 */
			_classInstance : [ 
					"actuate.iv.ui.dialog.chart.IVChartSubTypeDialog",
					"actuate.iv.ui.dialog.chart.IVFlashGadgetTypeDialog"
					]
		}, 
		
		CHART_CATEGORIES_DIALOG :
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"ChartCategoriesDialog"
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "ChartCategoriesDialog" ],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_localizedString : [ 
					"chartCategoriesDialog" 
					],
			
			/**
			 * Class instance to be created
			 * @type {Array}
			 */
			_classInstance : [ 
					"actuate.dialog.impl.helper.ChartCategoriesDialog"
					]
		}, 
		
		CHART_SERIES_DIALOG :
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"ChartSeriesDialog"
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "ChartSeriesDialog" ],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_localizedString : [ 
					"chartSeriesDialog" 
					],
			
			/**
			 * Class instance to be created
			 * @type {Array}
			 */
			_classInstance : [ 
					"actuate.dialog.impl.helper.ChartSeriesDialog"
					]
		}, 
		
		CHART_FORMAT_DIALOG :
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"StyleMenus",
					"StyleModel",
					"ChartFormatDialog"
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "ChartFormatDialog" ],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_localizedString : [ 
					"chartFormatDialog"
					],
					
			_cssFiles 			: new Array(
									"chartFormatDialog.css"
									),
									
  			_mobileCssFiles		: new Array(
									"chartFormatDialog_mobile.css"
									),
			
			/**
			 * Class instance to be created
			 * @type {Array}
			 */
			_classInstance : [ 
					"actuate.iv.ui.dialog.chart.IVChartFormatDialog"
					]
		},
		
		WARN_DIALOG :
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"WarningDialog"
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "WarningDialog" ],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_localizedString : [ "warningDialog" ],
			
			/**
			 * Class instance to be created
			 * @type {Array}
			 */
			_classInstance : [ 
					"actuate.iv.ui.dialog.IVWarningDialog"
					]
		},
		
		EXCEPTION_DIALOG : 
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"ExceptionDialog"
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "ExceptionDialog" ],
			
			_cssFiles 			: new Array(
									"exceptionDialog.css"
									),
			
			/**
			 * Class instance to be created
			 * @type {Array}
			 */
			_classInstance : [ 
					"actuate.iv.ui.dialog.IVExceptionDialog"
					]
		},
		
		TOC : 
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"Toc"
					],
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_localizedString : [ "toc" ]
		}, 
		
		PARAMETER : 
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"Parameter"
					],
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_localizedString : [ "parameter" ]
		},
		
		COLUMN_DATATYPE_DIALOG : 
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"ColumnDataTypeDialog"
					],
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "ColumnDataTypeDialog" ],
			
			_cssFiles 			: new Array(
									"columnDataTypeDialog.css"
									),
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_localizedString : [ "columnDataTypeDialog" ]
		},
		
		AVAILABLE_DATAITEM_DIALOG : 
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"AvailableDataItemDialog"
					],
			
			_cssFiles 			: new Array(
									"availableDataItemDialog.css"
									),
			
			/**
			 * HTML feature to be loaded
			 * @type {String}
			 */
			_html : [ "AvailableDataItemDialog" ]
		},

		DATA_ANALYZER_DIALOG : 
		{		 
			/**
			 * JS file list to be loaded
			 * @type {Array}
			 */
			_javaScript : [ 
					"DataAnalyzerDialog"
					]
		}
		
	}
});
