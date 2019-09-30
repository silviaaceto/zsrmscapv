/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("ui.s2p.srm.sc.approve.util.Formatter");

jQuery.sap.require("sap.ui.core.Element");
jQuery.sap.require("sap.ca.ui.model.format.AmountFormat");
jQuery.sap.require("sap.ui.core.format.NumberFormat");
jQuery.sap.require("sap.ca.ui.model.format.DateFormat");
jQuery.sap.require("sap.ca.ui.model.format.FileSizeFormat");
jQuery.sap.require("sap.ca.ui.model.format.FormattingLibrary");

ui.s2p.srm.sc.approve.util.Formatter = {

	i18nBundle: function() {
		return ui.s2p.srm.sc.approve.Configuration.oApplicationFacade.getResourceBundle();
	},

	//Get the total item count in S3 view
	formatItemCount: function(itemCount) {
		var oModel = ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();
		return oModel.getText("ITEMS_QTY_EX", [itemCount]);
	},

	//Get the Account Assignment Header value in S3 view
	formatAccountAssignmentHeader: function() {
		var oModel = ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();
		return oModel.getText("ACC_AS");
	},

	//Check if object is not a limit item
	formatAccountAssignmentIfPresent: function(obj) {
		return (obj === "1");
	},

	//Formatting the Shopping Cart creation date for S2 and S3 view
	formatDaysAgo: function(oDate) {
		if (oDate != null) {
			var date = new Date(oDate);
			var config = new sap.ui.core.Configuration();
			var currLocale = config.getLocale().sLocaleId;
			var Formatter = sap.ui.core.format.DateFormat.getDateInstance({
				style: "medium"
			}, new sap.ui.core.Locale(currLocale));
			var longDate = Formatter.format(date, ({
				style: "short",
				UTC: true
			}));
			return longDate;
		}
	},

	//Formatting the forwarded by,creating a shopping cart as a substitute for or on behalf of 
	formatTextAuthor: function(forwardedByName, onBehalfOfName, substitutingForName) {
		var oModel = ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();
		if (forwardedByName != "") {
			return oModel.getText('FORWARDEDBY', [forwardedByName]);
		} else if (onBehalfOfName != "") {
			return oModel.getText('ONBEHALFOF', [onBehalfOfName]);
		} else if (substitutingForName) {
			return oModel.getText('SUBSTITUTINGFORNAME', [substitutingForName]);
		}
	},

	//Format the item as Product or Sevice name
	formatCatName: function(obj) {
		var oModel = ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();
		if (obj === "02") {
			return oModel.getText('SERVICE_NAME');
		} else {
			return oModel.getText('PRODUCT_NAME');
		}
	},

	//Format the item as Product or Sevice Category
	formatCatType: function(obj) {
		var oModel = ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();
		if (obj === "02") {
			return oModel.getText('SERVICE_CATEGORY');
		} else {
			return oModel.getText('PRODUCT_CATEGORY');
		}
	},

	//In case of multiple assignments show the text as Multiple Account Assignments else show the account assignment description
	formatAccountAssignmentValue: function(obj1, obj2, obj3) {
		var oModel = ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();
		if (obj1 === "" || obj2 === "" || obj3 === "") {
			return oModel.getText('MULTIPLE_ACC_ASSIGNMENTS');
		} else {
			return obj1 + " " + obj2 + " (" + obj3 + ")";
		}
	},

	//In case of a single Account Assignment show the General Account Assignment
	formatGLAccountAssignmentValue: function(obj1, obj2) {
		var oModel = ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();
		var glacctext = oModel.getText('GL_ACC');
		var glaccassText = glacctext + " " + obj1 + " (" + obj2 + ")";

		return glaccassText;
	},

	//Check if an array is empty
	arrayVisibilityCheck: function(obj) {
		if (obj.length === 0)
			return false;
		else
			return true;
	},

	//Check if a value is 0
	valueVisibilityCheck: function(obj) {
		if (obj === 0)
			return false;
		else
			return true;
	},

	//Get total number of items in an array
	getTotalValue: function(obj) {
		if (obj.length != 0) {
			return obj.length;
		}
	},

	//Show General Account if cart cart has only one Account Assignment
	glAccountVisibilityCheck: function(obj1, obj2, obj3) {
		if (obj1 === "" || obj2 === "" || obj3 === "") {
			return false;
		} else {
			return true;
		}
	},

	//Show Notes label if there are notes for an item
	setNoteText: function() {
		var oModel = ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();
		return oModel.getText('NOTES');

	},

	//Show Attachments label if there are attachments for an item
	setAttachmentText: function() {
		var oModel = ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();
		return oModel.getText('ATTACHMENTS');
	},

	//Show Approval Chain label if there are approvers for an item
	setApproverText: function() {
		var oModel = ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();
		return oModel.getText('APPR_CHAIN');
	},

	//Set the Account Assignment label 
	setAccountAssignmentText: function() {
		var oModel = ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();
		return oModel.getText('ACCOUNT_ASSIGNMENT');
	},

	//Delivery date for an item in item detail page
	showDeliveryDateHeader: function(oDate, fromDate, toDate) {
		var oModel = ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();
		var config = new sap.ui.core.Configuration();
		var currLocale = config.getLocale().sLocaleId;
		var DateFormatter = sap.ca.ui.model.format.DateFormat.getDateInstance({
			style: "medium"
		}, new sap.ui.core.Locale(currLocale));
		if (oDate) {
			var mediumDate = DateFormatter.format(oDate, true);
			return oModel.getText([mediumDate]);
		}
		if (fromDate != null & toDate != null) {
			var mediumFromDate = DateFormatter.format(fromDate, true);
			var mediumToDate = DateFormatter.format(toDate, true);
			return oModel.getText('FROM_TO_DELIVERY', [mediumFromDate, mediumToDate]);
		}

	},

	//Check if an item is limit item
	getQuantity: function(oValue) {
		var oModel = ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();
		if (oValue === "0") {
			return oModel.getText('LIMIT');
		} 
		
		return parseFloat(oValue);
	},

	//Show the format of an attachment
	formatAttachmentIcon: function(sMimeType) {
		var formatterFileIcon = sap.ca.ui.model.format.FormattingLibrary.formatAttachmentIcon(sMimeType);
		return formatterFileIcon;
	},

	//Show the total size of the attachment
	formatAttachmentSize: function(bytes) {
		var config = new sap.ui.core.Configuration();
		var currLocale = config.getLocale().sLocaleId;
		var formatter = sap.ca.ui.model.format.FileSizeFormat.getInstance({
			style: "medium"
		}, new sap.ui.core.Locale(currLocale));
		var result = formatter.format(bytes);
		return result;
	},

	//Open or download the attachment
	showAttachment: function(url) {
		var sMedia_src = url;
		sap.m.URLHelper.redirect(sMedia_src, true);
	},

	//Do the badge visibility on the tab container
	badgeVisible: function(cnt) {
		return (cnt > 0);
	},

	//Do the switch visibility on the table of items
	switchVisible: function(val) {
		return (val !== "");

	},

	//Format the quantity if not a limit item
	formatQuantity: function(value1, value2) {
		if (value1 === "0") {
			return "";
		}
		
		return parseFloat(value1) + " " + value2;
	},

	//Format the value for limit item in item details
	formatPrice: function(value1, value2, value3, value4, value5, value6) {
		var oModel = ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();
		if (value6 == "X") {
			return oModel.getText("UNLIMITED");
		} else if (value1 == "0.00") {
			return value5 + " " + value2;
		} else {
			var formatter = sap.ui.core.format.NumberFormat.getInstance({
				style: "standard",
				shortDecimals: "2"
			});
			return formatter.format(value1) + " " + value2 + "/" + value3 + " " + value4;
		}
	},

	//Format category 
	formatCategory: function(value1, value2) {
		return value1 + " (" + value2 + ")";
	},

	//Delivery date format if it it a limit item
	deliveryDate: function(oDate, oLaterDate) {
		if (oDate.getDate == undefined) {
			var oDate = new Date(oDate);
		}
		var oModel = ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();
		var config = new sap.ui.core.Configuration();
		var currLocale = config.getLocale().sLocaleId;
		var DateFormatter = sap.ui.core.format.DateFormat.getDateInstance({
			style: "medium"
		}, new sap.ui.core.Locale(currLocale));
		var oHeaderDate = DateFormatter.format(oDate, ({
			style: "short",
			UTC: true
		}));
		if (oLaterDate == null || oLaterDate == "") {
			return oHeaderDate;
		} else {
			return oModel.getText("DELIVERY_ALSO_LATER", [oHeaderDate]);
		}
	},

	//Show an element if required
	showElementOnUi: function(obj) {
		if (obj === '') {
			return false;
		} else {
			return true;
		}
	},

	//Format item header in the table
	formatItemHeader: function(nItems) {
		var oModel = ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();
		return oModel.getText("ITEMS_QTY_EX", [parseInt(nItems)]);
	},

	//Format for percentage
	formatPercentages: function(oValue) {
		var formatter = sap.ca.ui.model.format.NumberFormat.getInstance({
			style: "standard",
			decimals: "2"
		});
		return formatter.format(oValue) + "%";
	},

	//Format for currency in objectListItem in S3 
	formatCurrencyValue: function(oValue) {
		var formatter = sap.ui.core.format.NumberFormat.getInstance({
			style: "standard",
			shortDecimals: "2"
		});
		return formatter.format(oValue);
	},
	formatValue: function(oValue) {
		if (oValue === "0.00") {
			return false;
		} else {
			return true;
		}
	}

};