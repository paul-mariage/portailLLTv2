actuate.util.Package.define("actuate.dialog.impl.chartbuilder");actuate.dialog.impl.chartbuilder.DifferenceChartWithAxisDataDialog=actuate.Class.create();actuate.dialog.impl.chartbuilder.DifferenceChartWithAxisDataDialog.prototype=actuate.Class.extend(new actuate.dialog.impl.AcDialog,{initialize:function(A){actuate.dialog.impl.AcDialog.prototype.initialize.call(this,A);this._helper=actuate.dialog.impl.helper.chartbuilder.DifferenceChartWithAxisDataTab;this._helper._helpee=this;}});