actuate.util.Package.define("actuate.dialog.impl");actuate.dialog.impl.ChartFilterDialog=actuate.Class.create();actuate.dialog.impl.ChartFilterDialog.prototype=actuate.Class.extend(new actuate.dialog.impl.AcDialog,{initialize:function(A){actuate.dialog.impl.AcDialog.prototype.initialize.call(this,A);this._helper=actuate.dialog.impl.helper.chartFilterDialog;this._helper._helpee=this;},createFilterRequest:function(){return this._helper.createFilterRequest();},createShowDialogRequest:function(){return this._helper.createShowDialogRequest(this);},createMoreValuesRequest:function(A){return this._helper.createMoreValuesRequest(A);}});