actuate.util.Package.define("actuate.dialog.impl.helper");actuate.dialog.impl.helper.CalendarDialog=actuate.Class.create();actuate.dialog.impl.helper.CalendarDialog.prototype=actuate.Class.extend(new actuate.dialog.impl.helper.AbstractIVDialog(),{_classname:"actuate.dialog.CalendarDialog",_dateMenu:null,initialize:function(){var A=actuate.util.Utility;var C=A.getLocalizedStrings("DatePicker",["okText","cancelText","todayText","minText","maxText","disabledDaysText","disabledDatesText","nextText","prevText","monthYearText"]);this.__localized_am=A.getLocalizedString("calendarDialog.LOCALIZED_AM");this.__localized_pm=A.getLocalizedString("calendarDialog.LOCALIZED_PM");this._localized_dateTime_pattern=A.getLocalizedString("calendarDialog.CAL_LOCALIZED_DATETIME_PATTERN");this._localized_date_pattern=A.getLocalizedString("calendarDialog.CAL_LOCALIZED_DATE_PATTERN");this._workingDateFormat=A.getLocalizedString("calendarDialog.CAL_LOCALIZED_TIME_PATTERN");C.format=A.getLocalizedString("dateFormat.shortDate");this._dateMenu=new actuate.uiadapter.DateMenu();actuate.Class.extend(this._dateMenu.getPicker(),this.pickerConfig);this._dateMenu.on("select",actuate.Method.bind(this._onMenuSelect,this));this._dateMenu.on("hide",actuate.Method.bind(this._hide,this));var B={constrainHeader:false,focus:actuate.Method.empty,syncShadow:actuate.Method.empty,adjustSizeToContent:actuate.Method.empty,center:actuate.Method.empty,contentEl:this._instance,closeAction:"hide",};this._window=new actuate.uiadapter.Window(B);},_bind:function(C){if(C==null||C.disabled){return ;}this._workingDateFormat=this.__isDateTime?this._localized_dateTime_pattern:this._localized_date_pattern;this.__target=C;var B;if(this.__target.getValue){B=this.__target.getValue();}else{B=this.__target.value;}if(B==null){this.__currentDate=new actuate.util.Date();}else{var A=this.parseDate(B,this._workingDateFormat);if(A==0){this.__currentDate=new actuate.util.Date();}else{this.__currentDate=new actuate.util.Date(A);}}this.__setCalendar(this.__currentDate);},_localBind:function(C){this.__isDateTime=C.isDateTime;if(C.target==null||C.target.disabled){return ;}this._workingDateFormat=this.__isDateTime?this._localized_dateTime_pattern:this._localized_date_pattern;this.__target=C.target;var B;if(this.__target.getValue){B=this.__target.getValue();}else{B=this.__target.value;}if(B==null||B==""){this.__currentDate=new actuate.util.Date();}else{var A=this.parseDate(B,this._workingDateFormat);if(A==0){this.__currentDate=new actuate.util.Date();}else{this.__currentDate=new actuate.util.Date(A);}}this.__setCalendar(this.__currentDate);},__setCalendar:function(A){this._dateMenu.setValue(A||new actuate.util.Date());var B=this.__target;if(!B.dom){if(B.getEl){B=B.getEl();}else{B=actuate.uiadapter.Element.get(B);}}this._dateMenu.show(B,"tr-br?");this._show();this._window.windowEl._ele.setStyle("display","none");this._window.windowEl._ele.disableShadow();},_onMenuSelect:function(A,B){this.__selectDate(B.getFullYear(),B.getMonth(),B.getDate());},__selectDate:function(B,D,A){if(this.__target==null){return ;}var E=parseInt(A);this.__currentDate.setDate(E);var C=this.__dateFormat(B,D,A);if(this.__target.tagName=="SELECT"){this.__target.options.add(new Option(C,C));this.__target.focus();}else{if(actuate.uiadapter&&this.__target instanceof actuate.uiadapter.TextField||this.__target instanceof actuate.widget.form.TextField){this.__target.focus();this.__target.setValue(C);}else{if(this.__target.tagName=="INPUT"){this.__target.value=C;this.__target.focus();}else{this.__target.add(C,C);this.__target.instance.focus();}}}this._hide();},_preHide:function(){this.__target=null;},parseDate:function(N,L){if(N==null){return null;}val=actuate.util.String.trim(N.toUpperCase());L=L+"";var S=0;var I=0;var O="";var D="";var R="";var F,E;var A=new actuate.util.Date();var G=A.getYear();var Q=A.getMonth()+1;var P=A.getDate();var B=A.getHours();var M=A.getMinutes();var J=A.getSeconds();var H="";while(I<L.length){O=L.charAt(I);D="";bQuote=(O=="'"||O=='"');if(bQuote){I++;}while((L.charAt(I)==O||bQuote)&&(I<L.length)){if(L.charAt(I)=="'"||L.charAt(I)=='"'){bQuote=false;I++;break;}D+=L.charAt(I);I++;}if(D=="yyyy"||D=="yy"||D=="y"){if(D=="yyyy"){F=4;E=4;}if(D=="yy"){F=2;E=2;}if(D=="y"){F=2;E=4;}G=this.__getInt(val,S,F,E);if(G==null){return 0;}S+=G.length;if(G.length==2){if(G>70){G=1900+(G-0);}else{G=2000+(G-0);}}}else{if(D=="MMM"){Q=0;for(var K=0;K<this._localizedMonthNames.length;K++){var C=this._localizedMonthNames[K];if(val.substring(S,S+C.length).toLowerCase()==C.toLowerCase()){Q=K+1;if(Q>12){Q-=12;}S+=C.length;break;}}if(Q==0){return 0;}if((Q<1)||(Q>12)){return 0;}}else{if(D=="MM"||D=="M"){F=1;E=2;Q=this.__getInt(val,S,F,E);if(Q==null){return 0;}if((Q<1)||(Q>12)){return 0;}S+=Q.length;}else{if(D=="dd"||D=="d"){F=1;E=2;P=this.__getInt(val,S,F,E);if(P==null){return 0;}if((P<1)||(P>31)){return 0;}S+=P.length;}else{if(D=="hh"||D=="h"){F=1;E=2;B=this.__getInt(val,S,F,E);if(B==null){return 0;}if((B<1)||(B>12)){return 0;}S+=B.length;B--;}else{if(D=="HH"||D=="H"){F=1;E=2;B=this.__getInt(val,S,F,E);if(B==null){return 0;}if((B<0)||(B>23)){return 0;}S+=B.length;}else{if(D=="KK"||D=="K"){F=1;E=2;B=this.__getInt(val,S,F,E);if(B==null){return 0;}if((B<0)||(B>11)){return 0;}S+=B.length;}else{if(D=="kk"||D=="k"){F=1;E=2;B=this.__getInt(val,S,F,E);if(B==null){return 0;}if((B<1)||(B>24)){return 0;}S+=B.length;h--;}else{if(D=="mm"||D=="m"){F=1;E=2;M=this.__getInt(val,S,F,E);if(M==null){return 0;}if((M<0)||(M>59)){return 0;}S+=M.length;}else{if(D=="ss"||D=="s"){F=1;E=2;J=this.__getInt(val,S,F,E);if(J==null){return 0;}if((J<0)||(J>59)){return 0;}S+=J.length;}else{if(D=="a"){nLenAM=this.__localized_am.length;nLenPM=this.__localized_pm.length;if(val.substring(S,S+nLenAM)==this.__localized_am.toUpperCase()){H=this.__localized_am.toUpperCase();S+=nLenAM;}else{if(val.substring(S,S+nLenPM)==this.__localized_pm.toUpperCase()){H=this.__localized_pm.toUpperCase();S+=nLenPM;}else{return 0;}}}else{sUnknownPattern=val.substring(S,S+D.length);if(sUnknownPattern!=D.toUpperCase()){return 0;}else{S+=D.length;}}}}}}}}}}}}}if(S!=N.length){return 0;}if(Q==2){if(((G%4==0)&&(G%100!=0))||(G%400==0)){if(P>29){return false;}}else{if(P>28){return false;}}}if((Q==4)||(Q==6)||(Q==9)||(Q==11)){if(P>30){return false;}}if(B<12&&H==this.__localized_pm.toUpperCase()){B+=12;}else{if(B>11&&H==this.__localized_am.toUpperCase()){B-=12;}}dt=new actuate.util.Date(G,Q-1,P,B,M,J);return dt.getTime();},__getInt:function(E,C,D,B){for(x=B;x>=D;x--){var A=E.substring(C,C+x);if(A.length<D){return null;}if(this.__isInteger(A)){return A;}}return null;},__isInteger:function(G,B,D,F){var C="0123456789";nLen=G.length;for(var A=0;A<nLen;A++){var E=G.charAt(A);if(C.indexOf(E)==-1){if(E=="e"||E=="E"){if(A>=nLen-1){return false;}cSymbol=G.charAt(A+1);if(cSymbol!=D&&cSymbol!=F&&cSymbol!="+"&&cSymbol!="-"&&C.indexOf(cSymbol)==-1){return false;}else{bStart=(C.indexOf(cSymbol)!=-1);for(k=A+2;k<nLen;k++){E=G.charAt(k);if(C.indexOf(E)==-1){return false;}else{bStart=true;}}return bStart;}}else{if(B){if(E!=D&&E!=F){return false;}if(A>0){return false;}continue;}}return false;}}return true;},__setDateTimeFlag:function(A){this.__isDateTime=A;},__dateFormat:function(B,D,A){var C=new actuate.util.Date(B,D,A);return actuate.util.Utility.formatDate(C,this._workingDateFormat);}});