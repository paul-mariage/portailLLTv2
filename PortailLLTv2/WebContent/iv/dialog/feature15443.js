actuate.util.Package.define("actuate.dialog.impl.gadgetbuilder");actuate.dialog.impl.gadgetbuilder.LinearGaugeFormatDialog=actuate.Class.create();actuate.dialog.impl.gadgetbuilder.LinearGaugeFormatDialog.prototype=actuate.Class.extend(new actuate.dialog.impl.AcDialog,{initialize:function(A){actuate.dialog.impl.AcDialog.prototype.initialize.call(this,A);this._helper=actuate.dialog.impl.helper.gadgetbuilder.LinearGaugeFormatTab;actuate.dialog.impl.helper.gadgetbuilder.LinearGaugeFormatTab._helpee=this;}});