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
actuate.util.Package.define( "actuate.dialog" ); 

/**
 * Constant class serves as resource definition class for IV lazy loading use
 * @class This class serves as the resource definition class for IV lazy loading use.
 * @name actuate.iv.FeatureDefinition
 */

actuate.resource.module.feature.define( "actuate.dialog",
{
	/**
	 * JavaScript resource alias definition which can be used by difference features.
	 */
	javaScriptAlias : 
{
"LoginDialog"							: "/feature15389.js",
"alias_js_loginDialog"					: "/feature15390.js",

"CalendarDialog"                        : "/feature15391.js",
"alias_js_calendarDialog"				: "/feature15392.js",

"AdvancedFilterDialog"					: "/feature15393.js",
"GadgetBuilderFilterTab"				: "/feature15394.js",
"FilterManager"							: "/feature15395.js",
"SelectedFilterDialog"					: "/feature15396.js",
"TopBottomNDialog" 						: "/feature15397.js",
"ChartFilterDialog"						: "/feature15398.js",
"CalculationDialog"						: "/feature15399.js",
"FilePickerDialog"						: "/feature15400.js",
"ChartCategoriesDialog"					: "/feature15401.js",
"ChartSeriesDialog"						: "/feature15402.js",
"alias_StylePreviewView"				: "/feature15403.js",
"alias_StyleModel"						: "/feature15404.js",
"alias_StyleMenus"						: "/feature15405.js",
"StyleSelectionView"					: "/feature15406.js",
"FontDialog"							: "/feature15407.js",
"alias_js_fontDialog"					: "/feature15408.js",
"FontDialogEx"							: "/feature15409.js",
"alias_js_fontDialogEx"					: "/feature15410.js",
"alias_js_advancedFilterDialog"			: "/feature15411.js",
"alias_js_gadgetBuilderFilterDialog"	: "/feature15412.js",
"alias_js_selectedFilterDialog"			: "/feature15413.js",
"alias_js_topBottomNDialog"				: "/feature15414.js",
"alias_js_chartFilterDialog"			: "/feature15415.js",
"alias_js_chartCategoriesDialog"		: "/feature15416.js",
"alias_js_calculationDialog"			: "/feature15417.js",
"alias_js_filePickerDialog"				: "/feature15418.js",
"alias_js_chartSeriesDialog"			: "/feature15419.js",
"alias_stringFormattingDialog"			: "/feature15420.js",
"alias_js_stringFormattingDialog"		: "/feature15421.js",
"alias_numberFormattingDialog"			: "/feature15422.js",
"alias_js_numberFormattingDialog"		: "/feature15423.js",
"alias_dateFormattingDialog"			: "/feature15424.js",
"alias_js_dateFormattingDialog"			: "/feature15425.js",
"alias_dateTimeFormattingDialog"		: "/feature15426.js",
"alias_js_dateTimeFormattingDialog"		: "/feature15427.js",
"alias_timeFormattingDialog"			: "/feature15428.js",
"alias_js_timeFormattingDialog"			: "/feature15429.js",
"alias_booleanFormattingDialog"			: "/feature15430.js",
"alias_js_booleanFormattingDialog"		: "/feature15431.js",
"ChartBuilderDialog" 					: "/feature15432.js",
"alias_js_chartBuilderDialog"			: "/feature15433.js",

"MeterFormatTab" 						: "/feature15434.js",
"alias_js_meterFormatDialog"	  		: "/feature15435.js",
"MeterDataTab" 			           		: "/feature15436.js",
"alias_js_meterDataDialog"	  			: "/feature15437.js",
"BulletDataTab" 			           	: "/feature15438.js",
"SparkLineDataTab" 			           	: "/feature15439.js",
"alias_js_bulletDataDialog"	  			: "/feature15440.js",
"alias_js_sparkLineDataDialog"	  		: "/feature15441.js",
"LinearGaugeFormatTab" 			        : "/feature15442.js",
"alias_js_linearGaugeFormatDialog"	    : "/feature15443.js",
"SparkLineFormatTab" 			        : "/feature15444.js",
"alias_js_sparkLineFormatDialog"	    : "/feature15445.js",
"BulletFormatTab" 			        	: "/feature15446.js",
"alias_js_bulletFormatDialog"	    	: "/feature15447.js",
"CylinderFormatTab" 			        : "/feature15448.js",
"alias_js_cylinderFormatDialog"	    	: "/feature15449.js",
"ThermometerFormatTab" 			        : "/feature15450.js",
"alias_js_thermometerFormatDialog"	    : "/feature15451.js",
"FlashGadgetTypeTab" 			    	: "/feature15452.js",
"alias_js_flashGadgetTypeDialog"		: "/feature15453.js",
"FlashGadgetBuilder" 					: "/feature15454.js",
"alias_js_flashGadgetBuilderDialog"		: "/feature15455.js",

"ChartTypeTab"							: "/feature15456.js",
"alias_js_chartTypeDialog"				: "/feature15457.js",
"ChartWithAxisDataTab"					: "/feature15458.js",
"alias_js_chartWithAxisDataTab"			: "/feature15459.js",
"ChartWoAxisDataTab"					: "/feature15460.js",
"alias_js_chartWoAxisDataTab"			: "/feature15461.js",

"ParentChartWithAxisDataTab"			:"/feature15462.js",

"BubbleChartWithAxisDataTab"	     	: "/feature15463.js",
"alias_js_bubbleChartWithAxisDataTab" 	: "/feature15464.js",

"DifferenceChartWithAxisDataTab"	     : "/feature15465.js",
"alias_js_differenceChartWithAxisDataTab": "/feature15466.js",

"GanttChartWithAxisDataTab"	     		: "/feature15467.js",
"alias_js_ganttChartWithAxisDataTab" 	: "/feature15468.js",

"StockChartWithAxisDataTab"	     	    : "/feature15469.js",
"alias_js_stockChartWithAxisDataTab" 	: "/feature15470.js",

"RadarChartWoAxisDataTab"	     		: "/feature15471.js",
"alias_js_radarChartWoAxisDataTab" 		: "/feature15472.js",

"ColumnChartFormatTab"					: "/feature15473.js",
"alias_js_columnChartFormatDialog"		: "/feature15474.js",
"ScatterChartFormatTab"					: "/feature15475.js",
"alias_js_scatterChartFormatDialog"		: "/feature15476.js",
"AreaChartFormatTab"					: "/feature15477.js",
"alias_js_areaChartFormatDialog"		: "/feature15478.js",

"BubbleChartFormatTab"					: "/feature15479.js",
"alias_js_bubbleChartFormatDialog"		: "/feature15480.js",
"ApplyButtonBuilder" 					: "/feature15481.js",
"alias_js_applyButtonDialog"			: "/feature15482.js",
"ApplyButtonFormatTab"					: "/feature15483.js",
"alias_js_applyButtonFormatDialog"		: "/feature15484.js",

"DifferenceChartFormatTab"				: "/feature15485.js",
"alias_js_differenceChartFormatDialog"	: "/feature15486.js",
"GanttChartFormatTab"					: "/feature15487.js",
"alias_js_ganttChartFormatDialog"		: "/feature15488.js",
"StockChartFormatTab"					: "/feature15489.js",
"alias_js_stockChartFormatDialog"		: "/feature15490.js",
"PyramidChartFormatTab"					: "/feature15491.js",
"alias_js_pyramidChartFormatDialog"		: "/feature15492.js",
"RadarChartFormatTab"					: "/feature15493.js",
"alias_js_radarChartFormatDialog"		: "/feature15494.js",
"MeterChartFormatTab"					: "/feature15495.js",
"alias_js_meterChartFormatDialog"		: "/feature15496.js",


"SelectorBuilder" 					    : "/feature15497.js",
"ReportLibraryBuilder"				    : "/feature15498.js",
"alias_js_selectorDialog"				: "/feature15499.js",
"alias_js_reportLibraryDialog"			: "/feature15500.js",
"SelectorDataTab" 					    : "/feature15501.js",
"alias_js_selectorDataDialog"			: "/feature15502.js",
"MultiSelectorDataTab" 				    : "/feature15503.js",
"alias_js_multiSelectorDataDialog"		: "/feature15504.js",
"SelectorDataVersionTab" 			    : "/feature15505.js",
"alias_js_selectorDataVersionDialog"	: "/feature15506.js",
"ReportLibraryDataTab"	 			    : "/feature15507.js",
"alias_js_reportLibraryDataDialog"		: "/feature15508.js",
"SelectorTypeTab" 					    : "/feature15509.js",
"MultiSelectorTypeTab" 				    : "/feature15510.js",
"alias_js_selectorTypeDialog"			: "/feature15511.js",
"alias_js_multiSelectorTypeDialog"		: "/feature15512.js",

"SelectorSliderFormatTab" 			    : "/feature15513.js",
"alias_js_selectorSliderFormatDialog"	: "/feature15514.js",
"MultiSelectorFormatTab" 			    : "/feature15515.js",
"alias_js_multiSelectorFormatDialog"	: "/feature15516.js",
"SelectorListFormatTab" 			    : "/feature15517.js",
"alias_js_selectorListFormatDialog"		: "/feature15518.js",
"SelectorDropdownFormatTab" 			: "/feature15519.js",
"alias_js_selectorDropdownFormatDialog"	: "/feature15520.js",
"SelectorCheckboxFormatTab" 			: "/feature15521.js",
"alias_js_selectorCheckboxFormatDialog"	: "/feature15522.js",
"SelectorRadioFormatTab" 			    : "/feature15523.js",
"alias_js_selectorRadioFormatDialog"	: "/feature15524.js",
"SelectorCalendarFormatTab" 			: "/feature15525.js",
"alias_js_selectorCalendarFormatDialog"	: "/feature15526.js",

"PieChartFormatTab"						: "/feature15527.js",
"alias_js_pieChartFormatDialog"			: "/feature15528.js",
"LineChartFormatTab"					: "/feature15529.js",
"alias_js_lineChartFormatDialog"		: "/feature15530.js",
"BarChartFormatTab"						: "/feature15531.js",
"alias_js_barChartFormatDialog"			: "/feature15532.js",
"DoughnutChartFormatTab"				: "/feature15533.js",
"alias_js_doughnutChartFormatDialog"	: "/feature15534.js",

"SummaryTableDataTab" 			       	: "/feature15535.js",
"SummaryTableFormatTab" 			   	: "/feature15536.js",
"alias_js_summaryTableDataDialog"	  	: "/feature15537.js",
"alias_js_summaryTableFormatDialog"	  	: "/feature15538.js",
"SummaryTableBuilder" 					: "/feature15539.js",
"alias_js_summaryTableBuilderDialog"	: "/feature15540.js",


"CrosstabDataTab" 			       		: "/feature15541.js",
"alias_js_crosstabDataDialog"  			: "/feature15542.js",
"CrosstabFormatTab"			      	 	: "/feature15543.js",
"alias_js_crosstabFormatDialog"			: "/feature15544.js",
"CrosstabBuilder" 						: "/feature15545.js",
"alias_js_crosstabBuilderDialog"		: "/feature15546.js",
"CrosstabDateGroupingDialog"			: "/feature15547.js",

"ManageDataDialog" 						: "/feature15548.js",
"alias_js_ManageDataDialog"				: "/feature15549.js",
"DetailsDialog"							: "/feature15550.js",

"ColumnListDialog"						: "/feature15551.js",
"alias_js_columnListDialog"				: "/feature15552.js",

"FlashGadgetFormatDialog"				: "/feature15553.js",
"alias_js_flashGadgetFormatDialog"		: "/feature15554.js",

"GenericPropsTab"						: "/feature15555.js",
"alias_js_genericPropsDialog"			: "/feature15556.js",

"FlexComponentBuilder"					: "/feature15557.js",
"alias_js_flexcomponentBuilderDialog"	: "/feature15558.js",
"FlexTableFormatTab"			    	: "/feature15559.js",
"alias_js_flexTableFormatDialog"		: "/feature15560.js",
"FlexComponentDataTab"		       		: "/feature15561.js",
"alias_js_flexcomponentDataDialog" 		: "/feature15562.js",
"FlexCrosstabFormatTab"			    	: "/feature15563.js",
"alias_js_flexCrosstabFormatDialog"		: "/feature15564.js",
"FlexCrosstabDataTab"			    	: "/feature15565.js",
"alias_js_flexCrosstabDataDialog"		: "/feature15566.js",

"HyperlinkBuilderDialog"				: "/feature15567.js",
"alias_js_hyperlinkBuilderDialog"		: "/feature15568.js"
}, 
	
	/**
	 * Feature defintions for on demand loading use
	 */
	AVAILABLE_FEATURES : 
	{
		/**
		 * Feature definition for login dialog.
		 */	
		LOGIN_DIALOG : 
		{		 
			_javaScript			: ["LoginDialog", "alias_js_loginDialog"],
			_localizedString	: ["loginDialog", "baseDialog"],
 			_classInstance		: ["actuate.dialog.impl.helper.LoginDialog", "actuate.dialog.LoginDialog"],
			_publicClasses		:
			{
				"actuate.dialog.LoginDialog" : "actuate.dialog.impl.LoginDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for font dialog.
		 */	
		FONT_DIALOG : 
		{		 
			_javaScript			: ["alias_StyleMenus", "alias_StyleModel", "alias_StylePreviewView", "StyleSelectionView", "FontDialog", "alias_js_fontDialog"],
			_localizedString	: ["conditionFormatDialog", "fontDialog"],
 			_classInstance		: ["actuate.dialog.impl.helper.font.FontDialog", "actuate.dialog.FontDialog"],
  			_staticFunctions 	: [ "getInstance" ],
  			_cssFiles 			: new Array( "fontDialog.css" ),
  			_mobileCssFiles		: new Array( "fontDialog_mobile.css" ),
			_publicClasses		:
			{
				"actuate.dialog.FontDialog" : "actuate.dialog.impl.FontDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for column list dialog.
		 */	
		COLUMNLIST_DIALOG : 
		{		 
			_javaScript			: ["ColumnListDialog", "alias_js_columnListDialog"],
			_localizedString	: ["columnListDialog"],
 			_classInstance		: ["actuate.dialog.impl.helper.ColumnListDialog", "actuate.dialog.ColumnListDialog"],
  			_entryPoint			: "actuate.dialog.ColumnListDialog",									
  			_mobileCssFiles		: new Array(
									"columnListDialog_mobile.css"
									),
			_publicClasses		:
			{
				"actuate.dialog.ColumnListDialog" : "actuate.dialog.impl.ColumnListDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for flash gadget format dialog
		 */
		FLASHGADGET_FORMAT_DIALOG : 
		{		 
			_javaScript			: ["FlashGadgetFormatDialog", "alias_js_flashGadgetFormatDialog"],
			_localizedString	: ["FlashGadgetFormatDialog"],
 			_classInstance		: ["actuate.dialog.impl.helper.flashgadget.FlashGadgetFormatDialog", "actuate.dialog.FlashGadgetFormatDialog"],
  			_entryPoint			: "actuate.dialog.FlashGadgetFormatDialog",
			_publicClasses		:
			{
				"actuate.dialog.FlashGadgetFormatDialog" : "actuate.dialog.impl.flashgadget.FlashGadgetFormatDialog",
				"noClass" : null
			}
		},
		

		/**
		 * Feature definition for advanced font dialog.
		 */	
		FONT_DIALOG_EX : 
		{		 
			_javaScript			: ["alias_StyleMenus", "alias_StyleModel", "alias_StylePreviewView", "StyleSelectionView", "FontDialogEx", "alias_js_fontDialogEx"],
			_html				: ["FontDialogEx"],
			_localizedString	: ["conditionFormatDialog", "fontDialog"],
 			_classInstance		: ["actuate.dialog.impl.helper.font.FontDialogEx", "actuate.dialog.font.FontDialogEx"],
  			_entryPoint			: "actuate.dialog.font.FontDialogEx",
  			_cssFiles 			: new Array(
  										"fontDialogEx.css"
								),					
			_publicClasses		:
			{
				"actuate.dialog.font.FontDialogEx" : "actuate.dialog.impl.font.FontDialogEx",
				"noClass" : null
			}
		},
		
		CHART_DATA_TAB_WITHAXIS_DIALOG:
		{		
			_javaScript 		: [ "ChartWithAxisDataTab", "alias_js_chartWithAxisDataTab" ],
			_localizedString 	: [ "chartBuilder", "common.dataTab" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.chartbuilder.ChartWithAxisDataTab" ],
			_publicClasses		:
			{
				"actuate.dialog.ChartWithAxisDataDialog":"actuate.dialog.impl.chartbuilder.ChartWithAxisDataDialog",
				"noClass" : null
			}
		},
		
		BUBBLE_CHART_DATA_TAB_WITHAXIS_DIALOG:
		{		
			_javaScript 		: [ "ParentChartWithAxisDataTab", "BubbleChartWithAxisDataTab", "alias_js_bubbleChartWithAxisDataTab" ],
			_localizedString 	: [ "chartBuilder", "common.dataTab" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.chartbuilder.BubbleChartWithAxisDataTab" ],
			_publicClasses		:
			{
				"actuate.dialog.BubbleChartWithAxisDataDialog":"actuate.dialog.impl.chartbuilder.BubbleChartWithAxisDataDialog",
				"noClass" : null
			},
			_hasDependency      : true
		},
		
		DIFFERENCE_CHART_DATA_TAB_WITHAXIS_DIALOG:
		{		
			_javaScript 		: [ "ParentChartWithAxisDataTab", "DifferenceChartWithAxisDataTab", "alias_js_differenceChartWithAxisDataTab" ],
			_localizedString 	: [ "chartBuilder", "common.dataTab" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.chartbuilder.DifferenceChartWithAxisDataTab" ],
			_publicClasses		:
			{
				"actuate.dialog.DifferenceChartWithAxisDataDialog":"actuate.dialog.impl.chartbuilder.DifferenceChartWithAxisDataDialog",
				"noClass" : null
			},
			_hasDependency      : true
		},
		
		GANTT_CHART_DATA_TAB_WITHAXIS_DIALOG:
		{		
			_javaScript 		: [ "ParentChartWithAxisDataTab", "GanttChartWithAxisDataTab", "alias_js_ganttChartWithAxisDataTab" ],
			_localizedString 	: [ "chartBuilder", "common.dataTab" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.chartbuilder.GanttChartWithAxisDataTab" ],
			_publicClasses		:
			{
				"actuate.dialog.GanttChartWithAxisDataDialog":"actuate.dialog.impl.chartbuilder.GanttChartWithAxisDataDialog",
				"noClass" : null
			},
			_hasDependency      : true
		},
		
		STOCK_CHART_DATA_TAB_WITHAXIS_DIALOG:
		{		
			_javaScript 		: [ "ParentChartWithAxisDataTab", "StockChartWithAxisDataTab", "alias_js_stockChartWithAxisDataTab" ],
			_localizedString 	: [ "chartBuilder", "common.dataTab" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.chartbuilder.StockChartWithAxisDataTab" ],
			_publicClasses		:
			{
				"actuate.dialog.StockChartWithAxisDataDialog":"actuate.dialog.impl.chartbuilder.StockChartWithAxisDataDialog",
				"noClass" : null
			},
			_hasDependency      : true
		}, 
		
		CHART_DATA_TAB_WOAXIS_DIALOG:
		{		
			_javaScript 		: [ "ChartWoAxisDataTab", "alias_js_chartWoAxisDataTab" ],
			_localizedString 	: [ "chartBuilder", "common.dataTab" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.chartbuilder.ChartWoAxisDataTab" ],
			_publicClasses		:
			{
				"actuate.dialog.ChartWoAxisDataDialog":"actuate.dialog.impl.chartbuilder.ChartWoAxisDataDialog",
				"noClass" : null
			}
		},
		
		RADAR_CHART_DATA_TAB_WOAXIS_DIALOG:
		{		
			_javaScript 		: [ "RadarChartWoAxisDataTab", "alias_js_radarChartWoAxisDataTab" ],
			_localizedString 	: [ "chartBuilder", "common.dataTab" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.chartbuilder.RadarChartWoAxisDataTab" ],
			_publicClasses		:
			{
				"actuate.dialog.RadarChartWoAxisDataDialog":"actuate.dialog.impl.chartbuilder.RadarChartWoAxisDataDialog",
				"noClass" : null
			}
		},
		
		GENERIC_PROPS_TAB_DIALOG:
		{		
			_javaScript 		: [ "GenericPropsTab", "alias_js_genericPropsDialog" ],
			_classInstance 		: [	"actuate.dialog.impl.helper.GenericPropsTab" ],
			_publicClasses		:
			{
				"actuate.dialog.GenericPropsDialog":"actuate.dialog.impl.GenericPropsDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for chart type dialog.
		 */	
		CHART_TYPE_TAB_DIALOG : 
		{		 
			_javaScript			: ["alias_js_chartTypeDialog", "ChartTypeTab"],
			_localizedString 	: [ "chartBuilder" ], 
			_classInstance		: ["actuate.dialog.impl.helper.chartbuilder.ChartTypeTab"],
			_publicClasses		:
			{
				"actuate.dialog.ChartTypeDialog" : "actuate.dialog.impl.chartbuilder.ChartTypeDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for column chart format dialog.
		 */	
		COLUMN_CHART_FORMAT_TAB_DIALOG : 
		{		 
			_javaScript			: ["alias_js_columnChartFormatDialog", "ColumnChartFormatTab", "alias_StyleModel"],
			_localizedString 	: [ "chartBuilder" ], 
			_classInstance		: ["actuate.dialog.impl.helper.chartbuilder.ColumnChartFormatTab"],
			_publicClasses		:
			{
				"actuate.dialog.ColumnChartFormatDialog" : "actuate.dialog.impl.chartbuilder.ColumnChartFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for column chart format dialog.
		 */	
		PIE_CHART_FORMAT_TAB_DIALOG : 
		{		 
			_javaScript			: ["alias_js_pieChartFormatDialog", "PieChartFormatTab", "alias_StyleModel"],
			_localizedString 	: [ "chartBuilder" ], 
			_classInstance		: ["actuate.dialog.impl.helper.chartbuilder.PieChartFormatTab"],
			_publicClasses		:
			{
				"actuate.dialog.PieChartFormatDialog" : "actuate.dialog.impl.chartbuilder.PieChartFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for column chart format dialog.
		 */	
		LINE_CHART_FORMAT_TAB_DIALOG : 
		{		 
			_javaScript			: ["alias_js_lineChartFormatDialog", "LineChartFormatTab", "alias_StyleModel"],
			_localizedString 	: [ "chartBuilder" ], 
			_classInstance		: ["actuate.dialog.impl.helper.chartbuilder.LineChartFormatTab"],
			_publicClasses		:
			{
				"actuate.dialog.LineChartFormatDialog" : "actuate.dialog.impl.chartbuilder.LineChartFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for column chart format dialog.
		 */	
		BAR_CHART_FORMAT_TAB_DIALOG : 
		{		 
			_javaScript			: ["alias_js_barChartFormatDialog", "BarChartFormatTab", "alias_StyleModel"],
			_localizedString 	: [ "chartBuilder" ], 
			_classInstance		: ["actuate.dialog.impl.helper.chartbuilder.BarChartFormatTab"],
			_publicClasses		:
			{
				"actuate.dialog.BarChartFormatDialog" : "actuate.dialog.impl.chartbuilder.BarChartFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for column chart format dialog.
		 */	
		DOUGHNUT_CHART_FORMAT_TAB_DIALOG : 
		{		 
			_javaScript			: ["alias_js_doughnutChartFormatDialog", "DoughnutChartFormatTab", "alias_StyleModel"],
			_localizedString 	: [ "chartBuilder" ], 
			_classInstance		: ["actuate.dialog.impl.helper.chartbuilder.DoughnutChartFormatTab"],
			_publicClasses		:
			{
				"actuate.dialog.DoughnutChartFormatDialog" : "actuate.dialog.impl.chartbuilder.DoughnutChartFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for scatter chart format dialog.
		 */	
		SCATTER_CHART_FORMAT_TAB_DIALOG : 
		{		 
			_javaScript			: ["alias_js_scatterChartFormatDialog", "ScatterChartFormatTab", "alias_StyleModel"],
			_localizedString 	: [ "chartBuilder" ], 
			_classInstance		: ["actuate.dialog.impl.helper.chartbuilder.ScatterChartFormatTab"],
			_publicClasses		:
			{
				"actuate.dialog.ScatterChartFormatDialog" : "actuate.dialog.impl.chartbuilder.ScatterChartFormatDialog",
				"noClass" : null
			}
		},

		/**
		 * Feature definition for area chart format dialog.
		 */	
		AREA_CHART_FORMAT_TAB_DIALOG : 
		{		 
			_javaScript			: ["alias_js_areaChartFormatDialog", "AreaChartFormatTab", "alias_StyleModel"],
			_localizedString 	: [ "chartBuilder" ], 
			_classInstance		: ["actuate.dialog.impl.helper.chartbuilder.AreaChartFormatTab"],
			_publicClasses		:
			{
				"actuate.dialog.AreaChartFormatDialog" : "actuate.dialog.impl.chartbuilder.AreaChartFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for bubble chart format dialog.
		 */	
		BUBBLE_CHART_FORMAT_TAB_DIALOG : 
		{		 
			_javaScript			: [ "alias_js_bubbleChartFormatDialog", "BubbleChartFormatTab", "alias_StyleModel"],
			_localizedString 	: [ "chartBuilder" ], 
			_classInstance		: ["actuate.dialog.impl.helper.chartbuilder.BubbleChartFormatTab"],
			_publicClasses		:
			{
				"actuate.dialog.BubbleChartFormatDialog" : "actuate.dialog.impl.chartbuilder.BubbleChartFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for difference chart format dialog.
		 */	
		DIFFERENCE_CHART_FORMAT_TAB_DIALOG : 
		{		 
			_javaScript			: [ "alias_js_differenceChartFormatDialog", "DifferenceChartFormatTab", "alias_StyleModel"],
			_localizedString 	: [ "chartBuilder" ], 
			_classInstance		: ["actuate.dialog.impl.helper.chartbuilder.DifferenceChartFormatTab"],
			_publicClasses		:
			{
				"actuate.dialog.DifferenceChartFormatDialog" : "actuate.dialog.impl.chartbuilder.DifferenceChartFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for gantt chart format dialog.
		 */	
		GANTT_CHART_FORMAT_TAB_DIALOG : 
		{		 
			_javaScript			: [ "alias_js_ganttChartFormatDialog", "GanttChartFormatTab", "alias_StyleModel"],
			_localizedString 	: [ "chartBuilder" ], 
			_classInstance		: ["actuate.dialog.impl.helper.chartbuilder.GanttChartFormatTab"],
			_publicClasses		:
			{
				"actuate.dialog.GanttChartFormatDialog" : "actuate.dialog.impl.chartbuilder.GanttChartFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for stock chart format dialog.
		 */	
		STOCK_CHART_FORMAT_TAB_DIALOG : 
		{		 
			_javaScript			: [ "alias_js_stockChartFormatDialog", "StockChartFormatTab", "alias_StyleModel"],
			_localizedString 	: [ "chartBuilder" ], 
			_classInstance		: ["actuate.dialog.impl.helper.chartbuilder.StockChartFormatTab"],
			_publicClasses		:
			{
				"actuate.dialog.StockChartFormatDialog" : "actuate.dialog.impl.chartbuilder.StockChartFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for pyramid chart format dialog.
		 */	
		PYRAMID_CHART_FORMAT_TAB_DIALOG : 
		{		 
			_javaScript			: [ "alias_js_pyramidChartFormatDialog", "PyramidChartFormatTab", "alias_StyleModel"],
			_localizedString 	: [ "chartBuilder" ], 
			_classInstance		: ["actuate.dialog.impl.helper.chartbuilder.PyramidChartFormatTab"],
			_publicClasses		:
			{
				"actuate.dialog.PyramidChartFormatDialog" : "actuate.dialog.impl.chartbuilder.PyramidChartFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for radar chart format dialog.
		 */	
		RADAR_CHART_FORMAT_TAB_DIALOG : 
		{		 
			_javaScript			: ["alias_js_radarChartFormatDialog", "RadarChartFormatTab", "alias_StyleModel"],
			_localizedString 	: [ "chartBuilder" ], 
			_classInstance		: ["actuate.dialog.impl.helper.chartbuilder.RadarChartFormatTab"],
			_publicClasses		:
			{
				"actuate.dialog.RadarChartFormatDialog" : "actuate.dialog.impl.chartbuilder.RadarChartFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for meter chart format dialog.
		 */	
		METER_CHART_FORMAT_TAB_DIALOG : 
		{		 
			_javaScript			: ["alias_js_meterChartFormatDialog", "MeterChartFormatTab", "alias_StyleModel"],
			_localizedString 	: [ "chartBuilder" ], 
			_classInstance		: ["actuate.dialog.impl.helper.chartbuilder.MeterChartFormatTab"],
			_publicClasses		:
			{
				"actuate.dialog.MeterChartFormatDialog" : "actuate.dialog.impl.chartbuilder.MeterChartFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for chart builder dialog.
		 */
		CHART_BUILDER_DIALOG : 
		{		
			_javaScript 		: [ "ChartBuilderDialog", "alias_js_chartBuilderDialog" ],
			_localizedString 	: [ "chartBuilder" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.chartbuilder.ChartBuilder", "actuate.dialog.ChartBuilderDialog" ],
  			_entryPoint			: "actuate.dialog.ChartBuilderDialog",
			_publicClasses		:
			{
				"actuate.dialog.ChartBuilderDialog":"actuate.dialog.impl.chartbuilder.ChartBuilderDialog",
				"noClass" : null
			}
		},
		
		/**
		 * flash gadget builder dialog
		 */
		FLASHGADGET_BUILDER_DIALOG : 
		{		
			_javaScript 		: [ "FlashGadgetBuilder", "alias_js_flashGadgetBuilderDialog" ],
			_localizedString 	: [ "flashGadgetBuilder" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.gadgetbuilder.FlashGadgetBuilder", "actuate.dialog.FlashGadgetBuilderDialog" ],
			_entryPoint			: "actuate.dialog.FlashGadgetBuilderDialog",
			_publicClasses		:
			{
				"actuate.dialog.FlashGadgetBuilderDialog":"actuate.dialog.impl.gadgetbuilder.FlashGadgetBuilderDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'format' tab for 'meter' gadget builder
		 */
		METER_FORMAT_TAB :
		{		
			_javaScript 		: [ "MeterFormatTab", "alias_js_meterFormatDialog" ],
			_localizedString 	: [ "flashGadgetBuilderDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.gadgetbuilder.MeterFormatTab" ],
			_publicClasses		:
			{
				"actuate.dialog.MeterFormatDialog":"actuate.dialog.impl.gadgetbuilder.MeterFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'data' tab for 'meter' and 'linearGauge' gadget builder
		 */
		METER_DATA_TAB :
		{		
			_javaScript 		: [ "MeterDataTab", "alias_js_meterDataDialog" ],
			_localizedString 	: [ "flashGadgetBuilderDialog", "common.dataTab" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.gadgetbuilder.MeterDataTab" ],
			_publicClasses		:
			{
				"actuate.dialog.MeterDataDialog":"actuate.dialog.impl.gadgetbuilder.MeterDataDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'data' tab for 'bullet', 'cylinder', 'sparkline'  and 'thermometer' gadget builder
		 */
		BULLET_DATA_TAB :
		{		
			_javaScript 		: [ "BulletDataTab", "alias_js_bulletDataDialog" ],
			_localizedString 	: [ "flashGadgetBuilderDialog", "common.dataTab" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.gadgetbuilder.BulletDataTab" ],
			_publicClasses		:
			{
				"actuate.dialog.BulletDataDialog":"actuate.dialog.impl.gadgetbuilder.BulletDataDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'data' tab for 'bullet', 'cylinder', 'sparkline'  and 'thermometer' gadget builder
		 */
		SPARKLINE_DATA_TAB :
		{		
			_javaScript 		: [ "SparkLineDataTab", "alias_js_sparkLineDataDialog" ],
			_localizedString 	: [ "flashGadgetBuilderDialog", "common.dataTab" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.gadgetbuilder.SparkLineDataTab" ],
			_publicClasses		:
			{
				"actuate.dialog.SparkLineDataDialog":"actuate.dialog.impl.gadgetbuilder.SparkLineDataDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'format' tab for 'linear gauge' gadget builder
		 */
		LINEARGAUGE_FORMAT_TAB :
		{		
			_javaScript 		: [ "LinearGaugeFormatTab", "alias_js_linearGaugeFormatDialog" ],
			_localizedString 	: [ "flashGadgetBuilderDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.gadgetbuilder.LinearGaugeFormatTab" ],
			_publicClasses		:
			{
				"actuate.dialog.LinearGaugeFormatDialog":"actuate.dialog.impl.gadgetbuilder.LinearGaugeFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'format' tab for 'sparkline' gadget builder
		 */
		SPARKLINE_FORMAT_TAB :
		{		
			_javaScript 		: [ "SparkLineFormatTab", "alias_js_sparkLineFormatDialog" ],
			_localizedString 	: [ "flashGadgetBuilderDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.gadgetbuilder.SparkLineFormatTab" ],
			_publicClasses		:
			{
				"actuate.dialog.SparkLineFormatDialog":"actuate.dialog.impl.gadgetbuilder.SparkLineFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'format' tab for 'bullet' gadget builder
		 */
		BULLET_FORMAT_TAB :
		{		
			_javaScript 		: [ "BulletFormatTab", "alias_js_bulletFormatDialog" ],
			_localizedString 	: [ "flashGadgetBuilderDialog", "fontDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.gadgetbuilder.BulletFormatTab" ],
			_publicClasses		:
			{
				"actuate.dialog.BulletFormatDialog":"actuate.dialog.impl.gadgetbuilder.BulletFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'format' tab for 'sparkline' gadget builder
		 */
		CYLINDER_FORMAT_TAB :
		{		
			_javaScript 		: [ "CylinderFormatTab", "alias_js_cylinderFormatDialog" ],
			_localizedString 	: [ "flashGadgetBuilderDialog", "fontDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.gadgetbuilder.CylinderFormatTab" ],
			_publicClasses		:
			{
				"actuate.dialog.CylinderFormatDialog":"actuate.dialog.impl.gadgetbuilder.CylinderFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'format' tab for 'sparkline' gadget builder
		 */
		APPLY_BUTTON_FORMAT_TAB :
		{		
			_javaScript 		: [ "ApplyButtonFormatTab", "alias_js_applyButtonFormatDialog" ],
			_localizedString 	: [ "applyButtonBuilderDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.applybuttonbuilder.ApplyButtonFormatTab" ],
			_publicClasses		:
			{
				"actuate.dialog.ApplyButtonFormatDialog":"actuate.dialog.impl.applybuttonbuilder.ApplyButtonFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'format' tab for 'sparkline' gadget builder
		 */
		THERMOMETER_FORMAT_TAB :
		{		
			_javaScript 		: [ "ThermometerFormatTab", "alias_js_thermometerFormatDialog" ],
			_localizedString 	: [ "flashGadgetBuilderDialog", "fontDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.gadgetbuilder.ThermometerFormatTab" ],
			_publicClasses		:
			{
				"actuate.dialog.ThermometerFormatDialog":"actuate.dialog.impl.gadgetbuilder.ThermometerFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'type' tab for flash gadget builder
		 */
		FLASHGADGET_TYPE_TAB :
		{		
			_javaScript 		: [ "FlashGadgetTypeTab", "alias_js_flashGadgetTypeDialog" ],
			_localizedString 	: [ "flashGadgetBuilderDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.gadgetbuilder.FlashGadgetTypeTab" ],
			_publicClasses		:
			{
				"actuate.dialog.FlashGadgetDialog":"actuate.dialog.impl.gadgetbuilder.FlashGadgetDialog",
				"noClass" : null
			}
		},
		
		SUMMARY_TABLE_BUILDER_DIALOG : 
		{		
			_javaScript 		: [ "SummaryTableBuilder", "alias_js_summaryTableBuilderDialog" ],
			_html 				: [ "SummaryTableBuilder" ],
			_localizedString 	: [ "tableBuilder", "summaryTableBuilder" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.summarytablebuilder.SummaryTableBuilder", "actuate.dialog.SummaryTableBuilderDialog" ],
  			_entryPoint			: "actuate.dialog.SummaryTableBuilderDialog",
			_publicClasses		:
			{
				"actuate.dialog.SummaryTableBuilderDialog":"actuate.dialog.impl.summarytablebuilder.SummaryTableBuilderDialog",
				"noClass" : null
			}
		},
		
		
		SUMMARY_TABLE_DATA_TAB :
		{		
			_javaScript 		: [ "SummaryTableDataTab", "alias_js_summaryTableDataDialog" ],
			_localizedString 	: [ "tableBuilder", "summaryTableBuilder", "common.dataTab" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.summarytablebuilder.SummaryTableDataTab" ],
			_publicClasses		:
			{
				"actuate.dialog.SummaryTableDataDialog":"actuate.dialog.impl.summarytablebuilder.SummaryTableDataDialog",
				"noClass" : null
			}
		},
		
		SUMMARY_TABLE_FORMAT_TAB :
		{		
			_javaScript 		: [ "SummaryTableFormatTab", "alias_js_summaryTableFormatDialog" ],
			_localizedString 	: [ "tableBuilder", "summaryTableBuilder", "fontDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.summarytablebuilder.SummaryTableFormatTab" ],
			_publicClasses		:
			{
				"actuate.dialog.SummaryTableFormatDialog":"actuate.dialog.impl.summarytablebuilder.SummaryTableFormatDialog",
				"noClass" : null
			}
		},

		/**
		 * Feature definition for advanced filter dialog.
		 */	
		ADVANCEDFILTERDIALOG_DIALOG :
		{		 
			_javaScript			: ["FilterManager", "AdvancedFilterDialog", "alias_js_advancedFilterDialog"],
			_html				: ["AdvancedFilterDialog"],
			_localizedString	: ["advancedFilterDialog", "filterDialog", "common"],
			_classInstance		: ["actuate.dialog.impl.helper.AdvancedFilterDialog"],
			_cssFiles 			: new Array(
									"advancedFilterDialog.css"
									),
									
  			_mobileCssFiles		: new Array(
									"advancedFilterDialog_mobile.css"
									),
			_publicClasses		:
			{
				"actuate.dialog.AdvancedFilterDialog" : "actuate.dialog.impl.AdvancedFilterDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for gadget builder filter dialog.
		 */	
		GADGETBUILDER_FILTERDIALOG_DIALOG :
		{		
			_javaScript			: ["FilterManager", "GadgetBuilderFilterTab", "alias_js_gadgetBuilderFilterDialog"],
			_html				: ["GadgetBuilderFilterDialog"],
			_localizedString	: ["gadgetBuilderFilterDialog", "advancedFilterDialog", "filterDialog", "common"],
			_classInstance		: ["actuate.dialog.impl.helper.GadgetBuilderFilterTab"], 
			_cssFiles 			: new Array(
									"advancedFilterDialog.css"
									),
			_publicClasses		:
			{
				"actuate.dialog.GadgetBuilderFilterDialog" : "actuate.dialog.impl.GadgetBuilderFilterDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for simple filter dialog.
		 */	
		FILTER_DIALOG :
		{		 
			_javaScript			: ["SelectedFilterDialog", "alias_js_selectedFilterDialog", "ChartFilterDialog", "alias_js_chartFilterDialog"],
			_html				: ["FilterDialog"],
			_localizedString	: ["filterDialog"],
			_classInstance		: ["actuate.dialog.impl.helper.SelectedFilterDialog", "actuate.dialog.impl.helper.ChartFilterDialog"],
			_cssFiles 			: new Array(
									"selectedFilterDialog.css", 
									"chartFilterDialog.css"
									),
			_publicClasses		:
			{
				"actuate.dialog.ChartFilterDialog" : "actuate.dialog.impl.ChartFilterDialog",
				"actuate.dialog.SelectedFilterDialog" : "actuate.dialog.impl.SelectedFilterDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for top bottom n filter dialog.
		 */	
		TOPBOTTOMN_DIALOG :
		{		 
			_javaScript			: ["TopBottomNDialog", "alias_js_topBottomNDialog"],
			_html				: ["TopBottomNDialog"],
			_localizedString	: ["filterDialog"],
			_classInstance		: ["actuate.dialog.impl.helper.TopBottomNDialog"],
			_cssFiles 			: new Array(
									"topBottomDialog.css"
									),
			_publicClasses		:
			{
				"actuate.dialog.TopBottomNDialog" : "actuate.dialog.impl.TopBottomNDialog", 
				"noClass" : null
			}
		},
		
		
		/**
		 * Feature definition for chart categories dialog.
		 */	
		CHART_CATEGORIES_DIALOG :
		{		 
			_javaScript			: ["ChartCategoriesDialog", "alias_js_chartCategoriesDialog"],
			_html				: ["ChartCategoriesDialog"],
			_localizedString	: ["chartCategoriesDialog"],
			_classInstance		: ["actuate.dialog.impl.helper.ChartCategoriesDialog"],
			_publicClasses		:
			{
				"actuate.dialog.ChartCategoriesDialog" : "actuate.dialog.impl.ChartCategoriesDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for chart series dialog.
		 */	
		CHART_SERIES_DIALOG :
		{		 
			_javaScript			: ["ChartSeriesDialog", "alias_js_chartSeriesDialog"],
			_html				: ["ChartSeriesDialog"],
			_localizedString	: ["chartSeriesDialog"],
			_classInstance		: ["actuate.dialog.impl.helper.ChartSeriesDialog"],
			_publicClasses		:
			{
				"actuate.dialog.ChartSeriesDialog" : "actuate.dialog.impl.ChartSeriesDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for string formatting dialog.
		 */	
		STRING_FORMAT_DIALOG :
		{
			_javaScript			: ["alias_stringFormattingDialog", "alias_js_stringFormattingDialog"],
			_html				: ["StringFormattingDialog"],
			_localizedString	: ["stringFormattingDialog"],
 			_classInstance		: ["actuate.dialog.impl.helper.format.StringFormattingDialog", "actuate.dialog.format.StringFormattingDialog"],
 			_entryPoint			: "actuate.dialog.format.StringFormattingDialog",
  			_cssFiles 			: new Array(
									"stringFormattingDialog.css"
									),
  			_mobileCssFiles		: new Array(
									"stringFormattingDialog_mobile.css"
									),
   			_publicClasses		:
			{
				"actuate.dialog.format.StringFormattingDialog" : "actuate.dialog.impl.format.StringFormattingDialog",
				"noClass" : null
			}
		}, 
		
		/**
		 * Feature definition for number formatting dialog.
		 */	
		NUMBER_FORMAT_DIALOG :
		{		 
			_javaScript			: ["alias_numberFormattingDialog", "alias_js_numberFormattingDialog"],
			_html				: ["NumberFormattingDialog"],
			_localizedString	: ["numberFormattingDialog"],					
 			_classInstance		: ["actuate.dialog.impl.helper.format.NumberFormattingDialog", "actuate.dialog.format.NumberFormattingDialog"],
  			_entryPoint			: "actuate.dialog.format.NumberFormattingDialog",
  			_cssFiles 			: new Array(
									"numberFormattingDialog.css"
									),
  			_mobileCssFiles		: new Array(
									"numberFormattingDialog_mobile.css"
									),
 			_publicClasses		:
			{
				"actuate.dialog.format.NumberFormattingDialog" : "actuate.dialog.impl.format.NumberFormattingDialog",
				"noClass" : null
			}
		}, 

		/**
		 * Feature definition for calculation dialog.
		 */	
		CALCULATION_DIALOG :
		{		 
			_javaScript			: ["CalculationDialog", "alias_js_calculationDialog"],
			_localizedString	: ["calculationDialog"],
 			_classInstance		: ["actuate.dialog.impl.helper.CalculationDialog", "actuate.dialog.CalculationDialog"],
  			_staticFunctions 	: [ "getInstance" ],
  			_cssFiles 			: new Array( "calculationDailog.css" ),
 			_publicClasses		:
			{
				"actuate.dialog.CalculationDialog" : "actuate.dialog.impl.CalculationDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Feature definition for file chooser dialog.
		 */	
		FILEPICKER_DIALOG :
		{		 
			_javaScript			: ["FilePickerDialog", "alias_js_filePickerDialog"],
			_localizedString	: ["filePickerDialog"],
 			_classInstance		: ["actuate.dialog.impl.helper.filepicker.FilePickerDialog", "actuate.dialog.FilePickerDialog"],
  			_staticFunctions 	: [ "getInstance" ],
  			_cssFiles 			: new Array( "filePickerDialog.css" ),
			_publicClasses		:
			{
				"actuate.dialog.FilePickerDialog" : "actuate.dialog.impl.FilePickerDialog",
				"noClass" : null
			}
		},

		/**
		 * Feature definition for hyperlink dialog.
		 */	
		HYPERLINK_BUILDER :
		{		 
			_javaScript			: ["HyperlinkBuilderDialog", "alias_js_hyperlinkBuilderDialog"],
			_html				: ["HyperlinkBuilderDialog"],
			_localizedString	: ["hyperlinkBuilderDialog", "baseDialog"],
 			_classInstance		: ["actuate.dialog.impl.helper.hyperlinkBuilder.HyperlinkBuilderDialog", "actuate.dialog.hyperlinkBuilder.HyperlinkBuilderDialog"],
  			_entryPoint			: "actuate.dialog.hyperlinkBuilder.HyperlinkBuilderDialog",
  			_cssFiles 			: new Array( "hyperlinkDialog.css" ),
 			_publicClasses		:
			{
				"actuate.dialog.hyperlinkBuilder.HyperlinkBuilderDialog" : "actuate.dialog.impl.hyperlinkBuilder.HyperlinkBuilderDialog",
				"noClass" : null
			}
		},
		
 		/**
 		 * Feature definition for date formatting dialog.
 		 */	
 		DATE_FORMAT_DIALOG :
 		{		 
 			_javaScript			: ["alias_dateFormattingDialog", "alias_js_dateFormattingDialog"],
 			_html				: ["DateFormattingDialog"],
 			_localizedString	: [ "dateFormattingDialog" ],		
 			_classInstance		: ["actuate.dialog.impl.helper.format.DateFormattingDialog", "actuate.dialog.format.DateFormattingDialog"],
 			_entryPoint			: "actuate.dialog.format.DateFormattingDialog",
  			_cssFiles 			: new Array(
									"dateFormattingDialog.css"
									),
  			_mobileCssFiles		: new Array(
									"dateFormattingDialog_mobile.css"
									),
  			_publicClasses		:
 			{
 				"actuate.dialog.format.DateFormattingDialog" : "actuate.dialog.impl.format.DateFormattingDialog",
 				"noClass" : null
 			}
 		},
 		
 		/**
 		 * Feature definition for date time formatting dialog.
 		 */	
		DATATIME_FORMAT_DIALOG :
		{		 
			_javaScript			: ["alias_dateTimeFormattingDialog", "alias_js_dateTimeFormattingDialog"],
			_html				: ["DateTimeFormattingDialog"],
			_localizedString	: ["dateTimeFormattingDialog"],
			_classInstance 		: ["actuate.dialog.impl.helper.format.DateTimeFormattingDialog", "actuate.dialog.format.DateTimeFormattingDialog"],
			_entryPoint			: "actuate.dialog.format.DateTimeFormattingDialog",
  			_cssFiles 			: new Array(
									"dateTimeFormattingDialog.css"
									),
  			_mobileCssFiles		: new Array(
									"dateTimeFormattingDialog_mobile.css"
									),
			_publicClasses		:
			{
				"actuate.dialog.format.DateTimeFormattingDialog" : "actuate.dialog.impl.format.DateTimeFormattingDialog",
				"noClass" : null
			}
		}, 
		
 		/**
 		 * Feature definition for time formatting dialog.
 		 */	
		TIME_FORMAT_DIALOG :
		{		 
			_javaScript 		: ["alias_timeFormattingDialog", "alias_js_timeFormattingDialog"],
			_html				: ["TimeFormattingDialog"],
			_localizedString	: ["timeFormattingDialog" ],		
			_classInstance		: ["actuate.dialog.impl.helper.format.TimeFormattingDialog", "actuate.dialog.format.TimeFormattingDialog"],
			_entryPoint			: "actuate.dialog.format.TimeFormattingDialog",
  			_cssFiles 			: new Array(
									"timeFormattingDialog.css"
									),
  			_mobileCssFiles		: new Array(
									"timeFormattingDialog_mobile.css"
									),
			_publicClasses		:
			{
				"actuate.dialog.format.TimeFormattingDialog" : "actuate.dialog.impl.format.TimeFormattingDialog",
				"noClass" : null
			}
		}, 
		
		/**
 		 * Feature definition for boolean formatting dialog.
		 */	
		BOOLEAN_FORMAT_DIALOG :
		{		 
			_javaScript			: ["alias_booleanFormattingDialog", "alias_js_booleanFormattingDialog"],
			_html				: ["BooleanFormattingDialog"],
			_localizedString	: ["booleanFormattingDialog"],
			_classInstance		: ["actuate.dialog.impl.helper.format.BooleanFormattingDialog", "actuate.dialog.format.BooleanFormattingDialog"],
  			_entryPoint			: "actuate.dialog.format.BooleanFormattingDialog",
  			_cssFiles 			: new Array(
									"booleanFormattingDialog.css"
									),
  			_mobileCssFiles		: new Array(
									"booleanFormattingDialog_mobile.css"
									),
			_publicClasses		:
			{
				"actuate.dialog.format.BooleanFormattingDialog" : "actuate.dialog.impl.format.BooleanFormattingDialog",
				"noClass" : null
			}
		}, 

		APPLY_BUTTON_DIALOG :
		{
			_javaScript 		: [ "ApplyButtonBuilder", "alias_js_applyButtonDialog" ],
			_localizedString 	: [ "applyButtonBuilder" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.applybuttonbuilder.ApplyButtonBuilder","actuate.dialog.ApplyButtonDialog"],
			_entryPoint			: "actuate.dialog.ApplyButtonDialog",
			_publicClasses		:
			{
				"actuate.dialog.ApplyButtonDialog":"actuate.dialog.impl.applybuttonbuilder.ApplyButtonDialog",
				"noClass" : null
			}		
		},
		
		/**
		 * Selector builder dialog
		 */
		SELECTOR_DIALOG : 
		{		
			_javaScript 		: [ "SelectorBuilder", "alias_js_selectorDialog" ],
			_html 				: [ "SelectorBuilder", "BooleanFormattingDialog", "StringFormattingDialog", "NumberFormattingDialog", "DateFormattingDialog", "TimeFormattingDialog", "DateTimeFormattingDialog" ],
			_localizedString 	: [ "Utility", "SelectorBuilder", "booleanFormattingDialog", "stringFormattingDialog", "numberFormattingDialog", "dateFormattingDialog", "timeFormattingDialog", "dateTimeFormattingDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.selectorbuilder.SelectorBuilder","actuate.dialog.SelectorDialog"],
			_entryPoint			: "actuate.dialog.SelectorDialog",
			_publicClasses		:
			{
				"actuate.dialog.SelectorDialog":"actuate.dialog.impl.selectorbuilder.SelectorDialog",
				"noClass" : null
			}		
		},
		
		/**
		 * ReportLibrary builder dialog
		 */
		REPORTLIBRARY_DIALOG : 
		{		
			_javaScript 		: [ "ReportLibraryBuilder", "alias_js_reportLibraryDialog" ],
			_localizedString 	: [ "Utility", "reportLibraryBuilder" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.reportlibrarybuilder.ReportLibraryBuilder", "actuate.dialog.ReportLibraryDialog"],
			_entryPoint			: "actuate.dialog.ReportLibraryDialog",
			_publicClasses		:
			{
				"actuate.dialog.ReportLibraryDialog":"actuate.dialog.impl.reportlibrarybuilder.ReportLibraryDialog",
				"noClass" : null
			}		
		},
		
		/**
		 * 'data' tab for 'selector' gadget builder
		 */
		SELECTOR_DATA_TAB :
		{		
			_javaScript 		: [ "SelectorDataTab", "alias_js_selectorDataDialog", "FilterManager" ],
			_localizedString 	: [ "Utility","selectorDialog", "selectorBuilder.dataTab", "selectorBuilder.typeTab", "selectorBuilder.formatTab", "common.dataTab", "filterDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.selectorbuilder.SelectorDataTab" ],
			_publicClasses		:
			{
				"actuate.dialog.SelectorDataDialog":"actuate.dialog.impl.selectorbuilder.SelectorDataDialog",
				"noClass" : null
			}
		},
		
		
		/**
		 * 'data' tab for 'selector' gadget builder
		 */
		MULTI_SELECTOR_DATA_TAB :
		{		
			_javaScript 		: [ "MultiSelectorDataTab", "alias_js_multiSelectorDataDialog", "FilterManager" ],
			_localizedString 	: [ "Utility","selectorDialog", "selectorBuilder.dataTab","selectorBuilder.multidataTab", "selectorBuilder.typeTab", "selectorBuilder.formatTab", "common.dataTab", "filterDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.selectorbuilder.MultiSelectorDataTab" ],
			_publicClasses		:
			{
				"actuate.dialog.MultiSelectorDataDialog":"actuate.dialog.impl.selectorbuilder.MultiSelectorDataDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'data' tab for 'version-selector' gadget builder
		 */
		SELECTOR_DATA_VERSION_TAB :
		{		
			_javaScript 		: [ "SelectorDataVersionTab", "alias_js_selectorDataVersionDialog" ],
			_localizedString 	: [ "Utility", "selectorDialog", "selectorBuilder.dataTab", "common.dataTab" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.selectorbuilder.SelectorDataVersionTab" ],
			_publicClasses		:
			{
				"actuate.dialog.SelectorDataVersionDialog":"actuate.dialog.impl.selectorbuilder.SelectorDataVersionDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'data' tab for 'reportlibrary' gadget builder
		 */
		REPORTLIBRARY_DATA_TAB :
		{		
			_javaScript 		: [ "ReportLibraryDataTab", "alias_js_reportLibraryDataDialog" ],
			_localizedString 	: [ "Utility", "reportLibraryBuilder" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.reportlibrarybuilder.ReportLibraryDataTab" ],
			_publicClasses		:
			{
				"actuate.dialog.ReportLibraryDataDialog":"actuate.dialog.impl.reportlibrarybuilder.ReportLibraryDataDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'type' tab for 'selector' gadget builder
		 */
		SELECTOR_TYPE_TAB :
		{		
			_javaScript 		: [ "SelectorTypeTab", "alias_js_selectorTypeDialog" ],
			_localizedString 	: [ "Utility","selectorDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.selectorbuilder.SelectorTypeTab" ],
			_cssFiles 			: new Array(
									"selectorType.css"
									),
			_publicClasses		:
			{
				"actuate.dialog.SelectorTypeDialog":"actuate.dialog.impl.selectorbuilder.SelectorTypeDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'type' tab for 'selector' gadget builder
		 */
		MULTI_SELECTOR_TYPE_TAB :
		{		
			_javaScript 		: [ "MultiSelectorTypeTab", "alias_js_multiSelectorTypeDialog" ],
			_localizedString 	: [ "Utility","selectorDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.selectorbuilder.MultiSelectorTypeTab" ],
			_cssFiles 			: new Array(
									"selectorType.css"
									),
			_publicClasses		:
			{
				"actuate.dialog.MultiSelectorTypeDialog":"actuate.dialog.impl.selectorbuilder.MultiSelectorTypeDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'format' tab for 'slider selector' gadget builder
		 */
		MULTI_SELECTOR_FORMAT_TAB :
		{		
			_javaScript 		: [ "MultiSelectorFormatTab", "alias_js_multiSelectorFormatDialog" ],
			_localizedString 	: [ "Utility","selectorDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.selectorbuilder.MultiSelectorFormatTab" ],
			_publicClasses		:
			{
				"actuate.dialog.MultiSelectorFormatDialog":"actuate.dialog.impl.selectorbuilder.MultiSelectorFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'format' tab for 'slider selector' gadget builder
		 */
		SELECTOR_SLIDER_FORMAT_TAB :
		{		
			_javaScript 		: [ "SelectorSliderFormatTab", "alias_js_selectorSliderFormatDialog" ],
			_localizedString 	: [ "Utility","selectorDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.selectorbuilder.SelectorSliderFormatTab" ],
			_publicClasses		:
			{
				"actuate.dialog.SelectorSliderFormatDialog":"actuate.dialog.impl.selectorbuilder.SelectorSliderFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'format' tab for 'list selector' gadget builder
		 */
		SELECTOR_LIST_FORMAT_TAB :
		{		
			_javaScript 		: [ "SelectorListFormatTab", "alias_js_selectorListFormatDialog" ],
			_localizedString 	: [ "Utility","selectorDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.selectorbuilder.SelectorListFormatTab" ],
			_publicClasses		:
			{
				"actuate.dialog.SelectorListFormatDialog":"actuate.dialog.impl.selectorbuilder.SelectorListFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'format' tab for 'dropdown selector' gadget builder
		 */
		SELECTOR_DROPDOWN_FORMAT_TAB :
		{		
			_javaScript 		: [ "SelectorDropdownFormatTab", "alias_js_selectorDropdownFormatDialog" ],
			_localizedString 	: [ "Utility","selectorDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.selectorbuilder.SelectorDropdownFormatTab" ],
			_publicClasses		:
			{
				"actuate.dialog.SelectorDropdownFormatDialog":"actuate.dialog.impl.selectorbuilder.SelectorDropdownFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'format' tab for 'checkbox selector' gadget builder
		 */
		SELECTOR_CHECKBOX_FORMAT_TAB :
		{		
			_javaScript 		: [ "SelectorCheckboxFormatTab", "alias_js_selectorCheckboxFormatDialog" ],
			_localizedString 	: [ "Utility","selectorDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.selectorbuilder.SelectorCheckboxFormatTab" ],
			_publicClasses		:
			{
				"actuate.dialog.SelectorCheckboxFormatDialog":"actuate.dialog.impl.selectorbuilder.SelectorCheckboxFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'format' tab for 'radio selector' gadget builder
		 */
		SELECTOR_RADIO_FORMAT_TAB :
		{		
			_javaScript 		: [ "SelectorRadioFormatTab", "alias_js_selectorRadioFormatDialog" ],
			_localizedString 	: [ "Utility","selectorDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.selectorbuilder.SelectorRadioFormatTab" ],
			_publicClasses		:
			{
				"actuate.dialog.SelectorRadioFormatDialog":"actuate.dialog.impl.selectorbuilder.SelectorRadioFormatDialog",
				"noClass" : null
			}
		},

		/**
		 * 'format' tab for 'radio selector' gadget builder
		 */
		SELECTOR_CALENDAR_FORMAT_TAB :
		{		
			_javaScript 		: [ "SelectorCalendarFormatTab", "alias_js_selectorCalendarFormatDialog" ],
			_localizedString 	: [ "Utility", "selectorDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.selectorbuilder.SelectorCalendarFormatTab" ],
			_publicClasses		:
			{
				"actuate.dialog.SelectorCalendarFormatDialog" : "actuate.dialog.impl.selectorbuilder.SelectorCalendarFormatDialog",
				"noClass" : null
			}
		},
		
		CROSSTAB_BUILDER_DIALOG : 
		{		
			_javaScript 		: [ "CrosstabBuilder", "alias_js_crosstabBuilderDialog" ],
			_html 				: [ "CrosstabBuilder" ],
			_localizedString 	: [ "crosstabBuilderDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.crosstabbuilder.CrosstabBuilder", "actuate.dialog.CrosstabBuilderDialog" ],
  			_entryPoint			: "actuate.dialog.CrosstabBuilderDialog",
			_publicClasses		:
			{
				"actuate.dialog.CrosstabBuilderDialog":"actuate.dialog.impl.crosstabbuilder.CrosstabBuilderDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'data' tab for crosstab builder
		 */
		CROSSTAB_DATA_TAB :
		{		
			_javaScript 		: [ "CrosstabDateGroupingDialog", "CrosstabDataTab", "alias_js_crosstabDataDialog" ],
			_localizedString 	: [ "crosstabBuilderDialog", "common.dataTab", "crosstabDateGroupingDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.crosstabbuilder.CrosstabDataTab" ],
			_cssFiles 			: new Array(
									"crosstabDataTab.css"
									),
			_publicClasses		:
			{
				"actuate.dialog.CrosstabDataDialog":"actuate.dialog.impl.crosstabbuilder.CrosstabDataDialog",
				"noClass" : null
			}
		},
		
		/**
		 * 'format' tab for crosstab builder
		 */
		CROSSTAB_FORMAT_TAB :
		{		
			_javaScript 		: [ "CrosstabFormatTab", "alias_js_crosstabFormatDialog" ],
			_localizedString 	: [ "crosstabBuilderDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.crosstabbuilder.CrosstabFormatTab" ],
			_cssFiles 			: new Array(
									"crosstabFormatTab.css"
									),
			_publicClasses		:
			{
				"actuate.dialog.CrosstabFormatDialog":"actuate.dialog.impl.crosstabbuilder.CrosstabFormatDialog",
				"noClass" : null
			}
		},
		
		/**
		 * Manage data dialog
		 */
		MANAGE_DATA_DIALOG : 
		{		
			_javaScript 		: [ "ManageDataDialog", "alias_js_ManageDataDialog", "DetailsDialog" ],
			_localizedString 	: [ "manageDataDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.datamanager.ManageDataDialog","actuate.dialog.datamanager.ManageDataDialog","actuate.dialog.impl.helper.datamanager.DetailsDialog"],
			_entryPoint			: "actuate.dialog.datamanager.ManageDataDialog",
			_cssFiles 			: new Array(
									"managedata.css"
									),
			_publicClasses		:
			{
				"actuate.dialog.datamanager.ManageDataDialog":"actuate.dialog.impl.datamanager.ManageDataDialog",
				"noClass" : null
			}		
		},
		
		/**
		 * Feature definition for calendar dialog.
		 */	
		CALENDAR_DIALOG :
		{		 
			_javaScript			: ["CalendarDialog", "alias_js_calendarDialog"],
			_html				: ["CalendarDialog"],
			_localizedString	: ["calendarDialog"],
			_classInstance		: ["actuate.dialog.impl.helper.CalendarDialog"],
			_publicClasses		:
			{
				"actuate.dialog.CalendarDialog" : "actuate.dialog.impl.CalendarDialog",
				"noClass" : null
			}
		},
		
		FLEXCOMPONENT_BUILDER_DIALOG : 
		{		
			_javaScript 		: [ "FlexComponentBuilder", "alias_js_flexcomponentBuilderDialog" ],
			_html 				: [ "FlexComponentBuilder" ],
			_localizedString 	: [ "FlexComponentBuilderDialog" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.flexcomponentbuilder.FlexComponentBuilder", "actuate.dialog.FlexComponentBuilderDialog" ],
  			_entryPoint			: "actuate.dialog.FlexComponentBuilderDialog",
			_publicClasses		:
			{
				"actuate.dialog.FlexComponentBuilderDialog":"actuate.dialog.impl.flexcomponentbuilder.FlexComponentBuilderDialog",
				"noClass" : null
			}
		},
		
		FLEXCOMPONENT_DATA_TAB :
		{		
			_javaScript 		: [ "FlexComponentDataTab", "alias_js_flexcomponentDataDialog" ],
			_localizedString 	: [ "FlexComponentBuilderDialog", "common.dataTab", "tableBuilder", "summaryTableBuilder" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.flexcomponentbuilder.FlexComponentDataTab" ],
			_publicClasses		:
			{
				"actuate.dialog.FlexComponentDataDialog":"actuate.dialog.impl.flexcomponentbuilder.FlexComponentDataDialog",
				"noClass" : null
			}
		},
		
		FLEXCROSSTAB_DATA_TAB :
		{		
			_javaScript 		: [ "FlexCrosstabDataTab", "alias_js_flexCrosstabDataDialog" ],
			_localizedString 	: [ "FlexComponentBuilderDialog", "common.dataTab", "crosstabBuilderDialog", "crosstabBuilderDialog.dataTab" ], 
			_classInstance 		: [	"actuate.dialog.impl.helper.flexcomponentbuilder.FlexCrosstabDataTab" ],
			_cssFiles 			: new Array(
									"crosstabDataTab.css"
									),
			_publicClasses		:
			{
				"actuate.dialog.FlexCrosstabDataDialog":"actuate.dialog.impl.flexcomponentbuilder.FlexCrosstabDataDialog",
				"noClass" : null
			}
		},		
		
		FLEXTABLE_FORMAT_TAB :
		{		
			_javaScript 		: [ "FlexTableFormatTab", "alias_js_flexTableFormatDialog" ],
			_localizedString 	: [ "flexComponentBuilderDialog", "tableBuilder", "fontDialog.background",
			                 	    "fontDialog.color", "fontDialog.type", "fontDialog.size", 
			                 	    "FlexComponentBuilderDialog.FontOption"], 
			_classInstance 		: [	"actuate.dialog.impl.helper.flexcomponentbuilder.FlexTableFormatTab" ],
			_publicClasses		:
			{
				"actuate.dialog.FlexTableFormatDialog":"actuate.dialog.impl.flexcomponentbuilder.FlexTableFormatDialog",
				"noClass" : null
			}
		},	
		
		FLEXCROSSTAB_FORMAT_TAB :
		{		
			_javaScript 		: [ "FlexCrosstabFormatTab", "alias_js_flexCrosstabFormatDialog" ],
			_localizedString 	: [ "flexComponentBuilderDialog", "tableBuilder", "fontDialog.background",
			                 	    "fontDialog.color", "fontDialog.type", "fontDialog.size", 
				                 	"crosstabBuilderDialog.formatTab", "crosstabBuilderDialog.formatTab.grandTotals",
				                 	"crosstabBuilderDialog.formatTab.subTotals", "flexComponentBuilderDialog.FontOption"], 
			_classInstance 		: [	"actuate.dialog.impl.helper.flexcomponentbuilder.FlexCrosstabFormatTab" ],
			_publicClasses		:
			{
				"actuate.dialog.FlexCrosstabFormatDialog":"actuate.dialog.impl.flexcomponentbuilder.FlexCrosstabFormatDialog",
				"noClass" : null
			}
		}	

	}
});
