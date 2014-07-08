actuate.util.Package.define("actuate.iv.ui.dialog");
actuate.iv.ui.dialog.IVLinkToThisPageDialog = actuate.Class
		.extendClass(
				actuate.iv.ui.dialog.AbstractIVDialog,
				{
					FEATURE_TOOLBAR_TYPE : "Toolbar",
					FEATURE_MAINMENU_TYPE : "MainMenu",
					FEATURE_PARAMETER_TYPE : "Parameter",
					FEATURE_EXPORTDATA_TYPE : "ExportData",
					FEATURE_EDITREPORT_TYPE : "EditReport",
					FEATURE_EXPORTREPORT_TYPE : "ExportReport",
					FEATURE_SAVEDESIGN_TYPE : "SaveDesign",
					FEATURE_SAVEDOCUMENT_TYPE : "SaveDocument",
					FEATURE_TOC_TYPE : "Toc",
					FEATURE_PRINT_TYPE : "Print",
					FEATURE_SERVERPRINT_TYPE : "ServerPrint",
					FEATURE_HIDECOLUMN_TYPE : "HideColumn",
					FEATURE_HIDESHOWITEMS_TYPE : "HideShowItems",
					FEATURE_SHOWCOLUMNS_TYPE : "ShowColumns",
					FEATURE_REORDERCOLUMNS_TYPE : "ReorderColumns",
					FEATURE_CALCULATION_TYPE : "Calculation",
					FEATURE_EDITCALCULATION_TYPE : "EditCalculation",
					FEATURE_DELETECOLUMN_TYPE : "DeleteColumn",
					FEATURE_COLUMNWIDTH_TYPE : "ColumnWidth",
					FEATURE_ROWHEIGHT_TYPE : "RowHeight",
					FEATURE_SUPPRESSDUPLICATEVALUES_TYPE : "SuppressDuplicateValues",
					FEATURE_NOTSUPPRESSDUPLICATEVALUES_TYPE : "NotSuppressDuplicateValues",
					FEATURE_MOVETOGROUP_TYPE : "MoveToGroup",
					FEATURE_MOVETOLEFT_TYPE : "MoveToLeft",
					FEATURE_MOVETORIGHT_TYPE : "MoveToRight",
					FEATURE_SORT_ASC : "SortAsc",
					FEATURE_SORT_DSC : "SortDsc",
					FEATURE_ADVANCEDSORT_TYPE : "AdvancedSort",
					FEATURE_FILTER_TYPE : "Filter",
					FEATURE_CHARTSUBTYPE_TYPE : "ChartSubType",
					FEATURE_FLASHGADGET_TYPE : "FlashGadgetType",
					FEATURE_TOPBOTTOMNFILTER_TYPE : "TopBottomN",
					FEATURE_AGGREGATION_TYPE : "Aggregation",
					FEATURE_TEXTEDIT_TYPE : "Text",
					FEATURE_ADDGROUP_TYPE : "AddGroup",
					FEATURE_DELETEGROUP_TYPE : "DeleteGroup",
					FEATURE_HIDEDETAIL_TYPE : "HideDetail",
					FEATURE_SHOWDETAIL_TYPE : "ShowDetail",
					FEATURE_CHANGEFONT_TYPE : "ChangeFont",
					FEATURE_FORMAT_TYPE : "Format",
					FEATURE_ALIGNLEFT_TYPE : "AlignLeft",
					FEATURE_ALIGNCENTER_TYPE : "AlignCenter",
					FEATURE_ALIGNRIGHT_TYPE : "AlignRight",
					FEATURE_CONDITIONALFORMAT_TYPE : "ConditionalFormat",
					FEATURE_PAGEBREAK_TYPE : "PageBreak",
					FEATURE_SWITCHVIEW_TYPE : "SwitchView",
					FEATURE_TOOLBAR_HELP_TYPE : "ToolbarHelp",
					FEATURE_LINKTOTHISPAGE_TYPE : "LinkToThisPage",
					_classname : "actuate.iv.ui.dialog.IVLinkToThisPageDialog",
					hasCancelButton : false,
					_height : 187,
					_width : 431,
					_parameterMap : null,
					_data : null,
					_callback : null,
					initialize : function() {
						var B = this._getId(this._classname);
						actuate.iv.ui.dialog.AbstractIVDialog.prototype.initialize
								.call(this, B);
						var A = {
							cls : "linktothispage_dialog_inputtext "
									+ actuate.iv.constant.CSS_INPUTBOX,
							readOnly : true,
							draggable : false,
							selectOnFocus : true
						};
						this.pasteEmailIM = new actuate.uiadapter.TextField(A);
						this.pasteHTML = new actuate.uiadapter.TextField(A);
						this.pasteEmailIM.render(document.getElementById(B
								+ "_pasteEmailIM"));
						this.pasteHTML.render(document.getElementById(B
								+ "_pasteHTML"));
					},
					_createScriptAndURL : function() {
						var G = this._data;
						var I = this._viewer.apiInstance;
						var L = I.getReportDesign();
						var C = I.getReportDocument();
						var F = actuate.util.Utility.isTransient(C);
						var E = I.requestOptions;
						var O = F && L;
						this.pasteEmailIM.setValue(this._viewer
								.createCurrentViewUrl(true, true));
						var D = "<script type='text/javascript' language='JavaScript' src='"
								+ this._viewer.getBaseUrl()
								+ "jsapi'><\/script>"
								+ "<script type='text/javascript'>"
								+ "actuate.load('viewer');";
						if (E != null) {
							D += "var reqOps = new actuate.RequestOptions( );";
							if (E.getRepositoryType()) {
								D += "reqOps.setRepositoryType('"
										+ E.getRepositoryType() + "');";
							}
							if (E.getIServerUrl()) {
								D += "reqOps.setIServerUrl('"
										+ E.getIServerUrl() + "');";
							}
							if (E.getVolume()) {
								D += "reqOps.setVolume('" + E.getVolume()
										+ "');";
							}
							var H = E.__getCustomParameters();
							if (H) {
								var B = "";
								for ( var A in H) {
									if ((A == "connectionHandle" && !O)
											|| A == "__page") {
										B += "'" + A + "':'" + H[A] + "',";
									}
								}
								D += "reqOps.setCustomParameters({"
										+ B.substring(0, B.length - 1) + "});";
							}
						}
						D += "actuate.initialize( '"
								+ this._viewer.getBaseUrl()
								+ "',reqOps==undefined?null:reqOps, null,null,myInit );"
								+ "function myInit()"
								+ "{"
								+ "viewer1 = new actuate.Viewer( 'container1' );";
						if (I.width) {
							D += "viewer1.setWidth(" + I.width + ");";
						}
						if (I.height) {
							D += "viewer1.setHeight(" + I.height + ");";
						}
						if (I.getReportletBookmark() != null) {
							D += "viewer1.setReportletBookmark('"
									+ I.getReportletBookmark() + "');";
						}
						if (O) {
							D += "viewer1.setReportDesign('" + L + "');";
						} else {
							if (C != null) {
								D += "viewer1.setReportDocument('" + C + "');";
							}
						}
						if (this._parameterMap) {
							var N = "var parameterValueMap={";
							var K = "";
							var J = false;
							for ( var M in this._parameterMap) {
								N += K;
								J = true;
								if (this._parameterMap[M] != null) {
									N += M + ':"' + this._parameterMap[M] + '"';
								} else {
									N += M + ":null";
								}
								K = ",";
							}
							if (J) {
								N += "};";
								N += "var parameterValues=[];for(var key in parameterValueMap){";
								N += "var param=new actuate.viewer.impl.ParameterValue();";
								N += "param.setName(key);";
								N += "if(parameterValueMap[key]!=null){";
								N += "param.setValue(parameterValueMap[key]);}";
								N += "else{param.setValueIsNull(true);}";
								N += "parameterValues.push(param);}";
								D += (N + "viewer1.setParameterValues(parameterValues);");
							}
						}
						if (this._viewer.featureMap) {
							D += "var options = new actuate.viewer.UIOptions( );";
							if (this._viewer.featureMap[this.FEATURE_TOOLBAR_TYPE] != undefined) {
								D += "options.enableToolBar("
										+ this._viewer.featureMap[this.FEATURE_TOOLBAR_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_MAINMENU_TYPE] != undefined) {
								D += "options.enableMainMenu("
										+ this._viewer.featureMap[this.FEATURE_MAINMENU_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_PARAMETER_TYPE] != undefined) {
								D += "options.enableParameterPage("
										+ this._viewer.featureMap[this.FEATURE_PARAMETER_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_TOC_TYPE] != undefined) {
								D += "options.enableTOC("
										+ this._viewer.featureMap[this.FEATURE_TOC_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_EXPORTREPORT_TYPE] != undefined) {
								D += "options.enableExportReport("
										+ this._viewer.featureMap[this.FEATURE_EXPORTREPORT_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_EXPORTDATA_TYPE] != undefined) {
								D += "options.enableDataExtraction("
										+ this._viewer.featureMap[this.FEATURE_EXPORTDATA_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_SAVEDESIGN_TYPE] != undefined) {
								D += "options.enableSaveDesign("
										+ this._viewer.featureMap[this.FEATURE_SAVEDESIGN_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_SAVEDOCUMENT_TYPE] != undefined) {
								D += "options.enableSaveDocument("
										+ this._viewer.featureMap[this.FEATURE_SAVEDOCUMENT_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_PRINT_TYPE] != undefined) {
								D += "options.enablePrint("
										+ this._viewer.featureMap[this.FEATURE_PRINT_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_SERVERPRINT_TYPE] != undefined) {
								D += "options.enableServerPrint("
										+ this._viewer.featureMap[this.FEATURE_SERVERPRINT_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_HIDESHOWITEMS_TYPE] != undefined) {
								D += "options.enableHideShowItems("
										+ this._viewer.featureMap[this.FEATURE_HIDESHOWITEMS_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_HIDECOLUMN_TYPE] != undefined) {
								D += "options.enableColumnEdit("
										+ this._viewer.featureMap[this.FEATURE_HIDECOLUMN_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_REORDERCOLUMNS_TYPE] != undefined) {
								D += "options.enableReorderColumns("
										+ this._viewer.featureMap[this.FEATURE_REORDERCOLUMNS_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_CALCULATION_TYPE] != undefined) {
								D += "options.enableCalculatedColumn("
										+ this._viewer.featureMap[this.FEATURE_CALCULATION_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_ROWHEIGHT_TYPE] != undefined) {
								D += "options.enableRowResize("
										+ this._viewer.featureMap[this.FEATURE_ROWHEIGHT_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_COLUMNWIDTH_TYPE] != undefined) {
								D += "options.enableColumnResize("
										+ this._viewer.featureMap[this.FEATURE_COLUMNWIDTH_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_SUPPRESSDUPLICATEVALUES_TYPE] != undefined) {
								D += "options.enableSuppressDuplicate("
										+ this._viewer.featureMap[this.FEATURE_SUPPRESSDUPLICATEVALUES_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_MOVETOGROUP_TYPE] != undefined) {
								D += "options.enableGroupEdit("
										+ this._viewer.featureMap[this.FEATURE_MOVETOGROUP_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_MOVETOLEFT_TYPE] != undefined) {
								D += "options.enableMoveColumn("
										+ this._viewer.featureMap[this.FEATURE_MOVETOLEFT_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_SORT_ASC] != undefined) {
								D += "options.enableSort("
										+ this._viewer.featureMap[this.FEATURE_SORT_ASC]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_ADVANCEDSORT_TYPE] != undefined) {
								D += "options.enableAdvancedSort("
										+ this._viewer.featureMap[this.FEATURE_ADVANCEDSORT_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_FILTER_TYPE] != undefined) {
								D += "options.enableFilter("
										+ this._viewer.featureMap[this.FEATURE_FILTER_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_CHARTSUBTYPE_TYPE] != undefined) {
								D += "options.enableChartSubType("
										+ this._viewer.featureMap[this.FEATURE_CHARTSUBTYPE_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_FLASHGADGET_TYPE] != undefined) {
								D += "options.enableFlashGadgetType("
										+ this._viewer.featureMap[this.FEATURE_FLASHGADGET_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_TOPBOTTOMNFILTER_TYPE] != undefined) {
								D += "options.enableTopBottomNFilter("
										+ this._viewer.featureMap[this.FEATURE_TOPBOTTOMNFILTER_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_AGGREGATION_TYPE] != undefined) {
								D += "options.enableAggregation("
										+ this._viewer.featureMap[this.FEATURE_AGGREGATION_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_TEXTEDIT_TYPE] != undefined) {
								D += "options.enableTextEdit("
										+ this._viewer.featureMap[this.FEATURE_TEXTEDIT_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_HIDEDETAIL_TYPE] != undefined) {
								D += "options.enableCollapseExpand("
										+ this._viewer.featureMap[this.FEATURE_HIDEDETAIL_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_CHANGEFONT_TYPE] != undefined) {
								D += "options.enableFormat("
										+ this._viewer.featureMap[this.FEATURE_CHANGEFONT_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_PAGEBREAK_TYPE] != undefined) {
								D += "options.enablePageBreak("
										+ this._viewer.featureMap[this.FEATURE_PAGEBREAK_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_SWITCHVIEW_TYPE] != undefined) {
								D += "options.enableSwitchView("
										+ this._viewer.featureMap[this.FEATURE_SWITCHVIEW_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_EDITREPORT_TYPE] != undefined) {
								D += "options.enableEditReport("
										+ this._viewer.featureMap[this.FEATURE_EDITREPORT_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_TOOLBAR_HELP_TYPE] != undefined) {
								D += "options.enableToolbarHelp("
										+ this._viewer.featureMap[this.FEATURE_TOOLBAR_HELP_TYPE]
										+ ");";
							}
							if (this._viewer.featureMap[this.FEATURE_LINKTOTHISPAGE_TYPE] != undefined) {
								D += "options.enableLinkToThisPage("
										+ this._viewer.featureMap[this.FEATURE_LINKTOTHISPAGE_TYPE]
										+ ");";
							}
							D += "viewer1.setUIOptions( options );";
						}
						D += "viewer1.submit();"
								+ "}"
								+ "<\/script>"
								+ "<div id='container1' style='border-width: 0px; border-style: solid;'></div>";
						this.pasteHTML.setValue(D);
					},
					_localBind : function(A) {
						this._data = A;
					},
					_beh_parameter : function(B) {
						this._callback = B;
						var A = new Array();
						A.push("actuate.parameter");
						actuate.resource.module.require(A, actuate.Method
								.bind2(this._prepareParameters, this));
					},
					_prepareParameters : function() {
						var A = document.createElement("DIV");
						var D = "report_parameter_container_id";
						A.id = D;
						document.body.appendChild(A);
						A.style.display = "none";
						var B = new actuate.parameter.Parameter(D);
						report = this._viewer.apiInstance.getReportDocument();
						B.setReportName(report);
						var C = actuate.Method.bind(this._processParameters,
								this);
						B.submit(function() {
							B.downloadParameterValues(C);
						});
					},
					_processParameters : function(D) {
						if (D) {
							for (var C = 0; C < D.length; C++) {
								var A = D[C].getName();
								var B = D[C].getValue();
								if (D[C].getValueIsNull()) {
									B = null;
								}
								this._parameterMap[A] = B;
							}
						}
						this._createScriptAndURL();
						if (this._callback) {
							this._callback();
						}
					},
					_okPress : function() {
						this._hide();
					},
					__getHelpTopic : function() {
						return "iv_link_to_this_page";
					},
					_show : function() {
						actuate.iv.ui.dialog.IVLinkToThisPageDialog.superclass._show
								.call(this);
						var A = this;
						this.pasteEmailIM.setValue("");
						this.pasteHTML.setValue("");
						this._parameterMap = {};
						this._viewer.showProgressIndicator(function() {
							A._beh_parameter(function() {
								A._viewer.hideProgressIndicator();
							});
						});
					}
				});