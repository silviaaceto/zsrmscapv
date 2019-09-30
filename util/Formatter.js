/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("ui.s2p.srm.sc.approve.util.Formatter");jQuery.sap.require("sap.ui.core.Element");jQuery.sap.require("sap.ca.ui.model.format.AmountFormat");jQuery.sap.require("sap.ui.core.format.NumberFormat");jQuery.sap.require("sap.ca.ui.model.format.DateFormat");jQuery.sap.require("sap.ca.ui.model.format.FileSizeFormat");jQuery.sap.require("sap.ca.ui.model.format.FormattingLibrary");ui.s2p.srm.sc.approve.util.Formatter={i18nBundle:function(){return ui.s2p.srm.sc.approve.Configuration.oApplicationFacade.getResourceBundle();},formatItemCount:function(i){var m=ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();return m.getText("ITEMS_QTY_EX",[i]);},formatAccountAssignmentHeader:function(){var m=ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();return m.getText("ACC_AS");},formatAccountAssignmentIfPresent:function(o){return(o==="1");},formatDaysAgo:function(d){if(d!=null){var a=new Date(d);var c=new sap.ui.core.Configuration();var b=c.getLocale().sLocaleId;var F=sap.ui.core.format.DateFormat.getDateInstance({style:"medium"},new sap.ui.core.Locale(b));var l=F.format(a,({style:"short",UTC:true}));return l;}},formatTextAuthor:function(f,o,s){var m=ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();if(f!=""){return m.getText('FORWARDEDBY',[f]);}else if(o!=""){return m.getText('ONBEHALFOF',[o]);}else if(s){return m.getText('SUBSTITUTINGFORNAME',[s]);}},formatCatName:function(o){var m=ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();if(o==="02"){return m.getText('SERVICE_NAME');}else{return m.getText('PRODUCT_NAME');}},formatCatType:function(o){var m=ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();if(o==="02"){return m.getText('SERVICE_CATEGORY');}else{return m.getText('PRODUCT_CATEGORY');}},formatAccountAssignmentValue:function(o,a,b){var m=ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();if(o===""||a===""||b===""){return m.getText('MULTIPLE_ACC_ASSIGNMENTS');}else{return o+" "+a+" ("+b+")";}},formatGLAccountAssignmentValue:function(o,a){var m=ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();var g=m.getText('GL_ACC');var b=g+" "+o+" ("+a+")";return b;},arrayVisibilityCheck:function(o){if(o.length===0)return false;else return true;},valueVisibilityCheck:function(o){if(o===0)return false;else return true;},getTotalValue:function(o){if(o.length!=0){return o.length;}},glAccountVisibilityCheck:function(o,a,b){if(o===""||a===""||b===""){return false;}else{return true;}},setNoteText:function(){var m=ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();return m.getText('NOTES');},setAttachmentText:function(){var m=ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();return m.getText('ATTACHMENTS');},setApproverText:function(){var m=ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();return m.getText('APPR_CHAIN');},setAccountAssignmentText:function(){var m=ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();return m.getText('ACCOUNT_ASSIGNMENT');},showDeliveryDateHeader:function(d,f,t){var m=ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();var c=new sap.ui.core.Configuration();var a=c.getLocale().sLocaleId;var D=sap.ca.ui.model.format.DateFormat.getDateInstance({style:"medium"},new sap.ui.core.Locale(a));if(d){var b=D.format(d,true);return m.getText([b]);}if(f!=null&t!=null){var e=D.format(f,true);var g=D.format(t,true);return m.getText('FROM_TO_DELIVERY',[e,g]);}},getQuantity:function(v){var m=ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();if(v==="0"){return m.getText('LIMIT');}return parseFloat(v);},formatAttachmentIcon:function(m){var f=sap.ca.ui.model.format.FormattingLibrary.formatAttachmentIcon(m);return f;},formatAttachmentSize:function(b){var c=new sap.ui.core.Configuration();var a=c.getLocale().sLocaleId;var f=sap.ca.ui.model.format.FileSizeFormat.getInstance({style:"medium"},new sap.ui.core.Locale(a));var r=f.format(b);return r;},showAttachment:function(u){var m=u;sap.m.URLHelper.redirect(m,true);},badgeVisible:function(c){return(c>0);},switchVisible:function(v){return(v!=="");},formatQuantity:function(v,a){if(v==="0"){return"";}return parseFloat(v)+" "+a;},formatPrice:function(v,a,b,c,d,e){var m=ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();if(e=="X"){return m.getText("UNLIMITED");}else if(v=="0.00"){return d+" "+a;}else{var f=sap.ui.core.format.NumberFormat.getInstance({style:"standard",shortDecimals:"2"});return f.format(v)+" "+a+"/"+b+" "+c;}},formatCategory:function(v,a){return v+" ("+a+")";},deliveryDate:function(d,l){if(d.getDate==undefined){var d=new Date(d);}var m=ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();var c=new sap.ui.core.Configuration();var a=c.getLocale().sLocaleId;var D=sap.ui.core.format.DateFormat.getDateInstance({style:"medium"},new sap.ui.core.Locale(a));var h=D.format(d,({style:"short",UTC:true}));if(l==null||l==""){return h;}else{return m.getText("DELIVERY_ALSO_LATER",[h]);}},showElementOnUi:function(o){if(o===''){return false;}else{return true;}},formatItemHeader:function(n){var m=ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();return m.getText("ITEMS_QTY_EX",[parseInt(n)]);},formatPercentages:function(v){var f=sap.ca.ui.model.format.NumberFormat.getInstance({style:"standard",decimals:"2"});return f.format(v)+"%";},formatCurrencyValue:function(v){var f=sap.ui.core.format.NumberFormat.getInstance({style:"standard",shortDecimals:"2"});return f.format(v);},formatValue:function(v){if(v==="0.00"){return false;}else{return true;}}};