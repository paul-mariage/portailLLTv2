actuate.util.Package.define("actuate.dialog.impl.chartbuilder");actuate.dialog.impl.chartbuilder.PyramidChartFormatDialog=actuate.Class.create();actuate.dialog.impl.chartbuilder.PyramidChartFormatDialog.prototype=actuate.Class.extend(new actuate.dialog.impl.AcDialog,{initialize:function(A){actuate.dialog.impl.AcDialog.prototype.initialize.call(this,A);this._helper=actuate.dialog.impl.helper.chartbuilder.pyramidChartFormatTab;this._helper._helpee=this;}});