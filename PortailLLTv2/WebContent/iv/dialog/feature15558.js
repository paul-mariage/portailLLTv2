actuate.util.Package.define("actuate.dialog.impl.flexcomponentbuilder");actuate.dialog.impl.flexcomponentbuilder.FlexComponentBuilderDialog=actuate.Class.create();actuate.dialog.impl.flexcomponentbuilder.FlexComponentBuilderDialog=actuate.Class.extendClass(actuate.dialog.impl.AcDialog,{initialize:function(A){actuate.dialog.impl.flexcomponentbuilder.FlexComponentBuilderDialog.superclass.initialize.call(this,A);this._helper=actuate.dialog.impl.helper.flexcomponentbuilder.flexComponentBuilder;this._helper._helpee=this;}});