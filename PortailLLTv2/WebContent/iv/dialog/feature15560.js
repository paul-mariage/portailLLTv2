actuate.util.Package.define("actuate.dialog.impl.flexcomponentbuilder");actuate.dialog.impl.flexcomponentbuilder.FlexTableFormatDialog=actuate.Class.create();actuate.dialog.impl.flexcomponentbuilder.FlexTableFormatDialog.prototype=actuate.Class.extend(new actuate.dialog.impl.AcDialog,{initialize:function(A){actuate.dialog.impl.AcDialog.prototype.initialize.call(this,A);this._helper=actuate.dialog.impl.helper.flexcomponentbuilder.flexTableFormatTab;this._helper._helpee=this;}});