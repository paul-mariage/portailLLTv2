actuate.util.Package.define("actuate.dialog.impl.datamanager");actuate.dialog.impl.datamanager.ManageDataDialog=actuate.Class.extendClass(actuate.dialog.impl.AcDialog,{_localEvents:new Array(actuate.dialog.impl.EventConstants.ON_SYNC_DATAMART_METADATA),initialize:function(A){actuate.dialog.impl.datamanager.ManageDataDialog.superclass.initialize.call(this,A);this._helper=actuate.dialog.impl.helper.datamanager.manageDataDialog;actuate.dialog.impl.helper.datamanager.manageDataDialog._helpee=this;}});