actuate.util.Package.define("actuate.dialog.impl.format");actuate.dialog.impl.format.NumberFormattingDialog=actuate.Class.create();actuate.dialog.impl.format.NumberFormattingDialog.prototype=actuate.Class.extend(new actuate.dialog.impl.AcDialog,{initialize:function(A){actuate.dialog.impl.AcDialog.prototype.initialize.call(this,A);if(!actuate.dialog.impl.helper.format.numberFormattingDialog){actuate.dialog.impl.helper.format.numberFormattingDialog=actuate.common.ClassLoader.getInstance().forName("actuate.dialog.impl.helper.format.NumberFormattingDialog");actuate.dialog.impl.helper.format.numberFormattingDialog.consumerBind(A);}this._helper=actuate.dialog.impl.helper.format.numberFormattingDialog;this._helper._helpee=this;}});