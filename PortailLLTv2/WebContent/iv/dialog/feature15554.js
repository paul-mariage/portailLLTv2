actuate.util.Package.define("actuate.dialog.impl.flashgadget");actuate.dialog.impl.flashgadget.FlashGadgetFormatDialog=actuate.Class.create();actuate.dialog.impl.flashgadget.FlashGadgetFormatDialog.prototype=actuate.Class.extend(new actuate.dialog.impl.AcDialog,{initialize:function(A){actuate.dialog.impl.AcDialog.prototype.initialize.call(this,A);this._helper=actuate.dialog.impl.helper.flashgadget.flashGadgetFormatDialog;this._helper._helpee=this;}});