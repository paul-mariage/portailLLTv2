actuate.util.Package.define("actuate.iv.ui.dialog.file");actuate.iv.ui.dialog.file.IVFile=actuate.Class.create();actuate.iv.ui.dialog.file.IVFile.prototype={name:null,description:null,isFile:null,initialize:function(A){this.name=A.name;this.description=A.description;this.isFile=!A.isFolder;}};