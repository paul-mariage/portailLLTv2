actuate.util.Package.define("actuate.dialog.impl.chartbuilder");actuate.dialog.impl.chartbuilder.ChartBuilderDialog=actuate.Class.create();actuate.dialog.impl.chartbuilder.ChartBuilderDialog=actuate.Class.extendClass(actuate.dialog.impl.AcDialog,{initialize:function(A){actuate.dialog.impl.chartbuilder.ChartBuilderDialog.superclass.initialize.call(this,A);this._helper=actuate.dialog.impl.helper.chartbuilder.chartBuilder;actuate.dialog.impl.helper.chartbuilder.chartBuilder._helpee=this;}});