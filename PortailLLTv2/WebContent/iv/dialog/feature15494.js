actuate.util.Package.define("actuate.dialog.impl.chartbuilder");actuate.dialog.impl.chartbuilder.RadarChartFormatDialog=actuate.Class.create();actuate.dialog.impl.chartbuilder.RadarChartFormatDialog.prototype=actuate.Class.extend(new actuate.dialog.impl.AcDialog,{initialize:function(A){actuate.dialog.impl.AcDialog.prototype.initialize.call(this,A);this._helper=actuate.dialog.impl.helper.chartbuilder.radarChartFormatTab;this._helper._helpee=this;}});