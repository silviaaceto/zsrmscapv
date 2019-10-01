jQuery.sap.registerPreloadedModules({
"name":"ui/s2p/srm/sc/approve/Component-preload",
"version":"2.0",
"modules":{
	"ui/s2p/srm/sc/approve/Component.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
/*jslint nomen: true, vars: true, white: true */
/*global jQuery: false, sap: false */
(function() {
	"use strict";
	//define a root UIComponent which exposes the main view
	jQuery.sap.declare("ui.s2p.srm.sc.approve.Component");
	//---------Changes for Manifest Migration V1 for 1.28 App on HCP--------------
	//jQuery.sap.require("ui.s2p.srm.sc.approve.Configuration");
	jQuery.sap.require("sap.ca.scfld.md.ComponentBase");
	// new Component
	sap.ca.scfld.md.ComponentBase.extend("ui.s2p.srm.sc.approve.Component", {
		metadata: sap.ca.scfld.md.ComponentBase.createMetaData("MD", {
			//---------Changes for Manifest Migration V1 for 1.28 App on HCP--------------Added Manifest
			"manifest": "json",
			"includes": ["css/shoppingcart.css"],
			"config": {
				"titleResource": "DISPLAY_NAME_APPROVE",
				"resourceBundle": "i18n/i18n.properties",
				"icon": "sap-icon://Fiori2/F0408",
				"favIcon": "./resources/sap/ca/ui/themes/base/img/favicon/Approve_Shopping_Carts.ico",
				"homeScreenIconPhone": "./resources/sap/ca/ui/themes/base/img/launchicon/Approve_Shopping_Carts/57_iPhone_Desktop_Launch.png",
				"homeScreenIconPhone@2": "./resources/sap/ca/ui/themes/base/img/launchicon/Approve_Shopping_Carts/114_iPhone-Retina_Web_Clip.png",
				"homeScreenIconTablet": "./resources/sap/ca/ui/themes/base/img/launchicon/Approve_Shopping_Carts/72_iPad_Desktop_Launch.png",
				"homeScreenIconTablet@2": "./resources/sap/ca/ui/themes/base/img/launchicon/Approve_Shopping_Carts/144_iPad_Retina_Web_Clip.png"
			},
			// Navigation related properties
			"masterPageRoutes": {
				"master": {
					"pattern": "",
					"view": "ui.s2p.srm.sc.approve.view.S2"
				}
			},
			"detailPageRoutes": {
				"detail": {
					"pattern": "detail/{contextPath}",
					"view": "ui.s2p.srm.sc.approve.view.S3"
				},
				"detailItem": {
					"pattern": "detailItem/{workItemId}/{itemIndex}/{itemNumber}/{scNumber}/{servername}",
					"view": "ui.s2p.srm.sc.approve.view.itemDetail"
				},
				"noData": {
					"pattern": "noData",
					"view": "empty"
				}
			}
		}),
		/**
		 * Initialize the application
		 * 
		 * @returns {sap.ui.core.Control} the content
		 */
		createContent: function() {
			var oViewData = {
					component: this
				},
				oView = sap.ui.view({
					viewName: "ui.s2p.srm.sc.approve.Main",
					type: sap.ui.core.mvc.ViewType.XML,
					viewData: oViewData
				}),
				sPrefix = oView.getId() + "--",
				oEventBus = sap.ui.getCore().getEventBus();
			this.oEventBus = {
				publish: function(channelId, eventId, data) {
					channelId = sPrefix + channelId;
					oEventBus.publish(channelId, eventId, data);
				},
				subscribe: function(channelId, eventId, data, oListener) {
					channelId = sPrefix + channelId;
					oEventBus.subscribe(channelId, eventId, data, oListener);
				},
				unsubscribe: function(channelId, eventId, data, oListener) {
					channelId = sPrefix + channelId;
					oEventBus.unsubscribe(channelId, eventId, data, oListener);
				}
			};
			return oView;
		}
	});
}());
},
	"ui/s2p/srm/sc/approve/Configuration.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
/*jslint nomen: true, vars: true, white: true */
/*global jQuery: false, sap: false */
(function() {
	"use strict";
jQuery.sap.declare("ui.s2p.srm.sc.approve.Configuration");
jQuery.sap.require("sap.ca.scfld.md.ConfigurationBase");
jQuery.sap.require("sap.ca.scfld.md.app.Application");
	sap.ca.scfld.md.ConfigurationBase
			.extend("ui.s2p.srm.sc.approve.Configuration", {
	oServiceParams: {
        serviceList: [
            {
                name: "CARTAPPROVAL",
                masterCollection: "WorkflowTaskCollection",
                serviceUrl: ui.s2p.srm.sc.approve.Component.getMetadata().getManifestEntry("sap.app").dataSources["CARTAPPROVAL"].uri,
                isDefault: true,
            	mockedDataSource: "./localService/metadata.xml"
            },
            {
                name : "CARTAPPROVAL_STANDARD",
                masterCollection : "WorkflowTaskCollection",
                serviceUrl : ui.s2p.srm.sc.approve.Component.getMetadata().getManifestEntry("sap.app").dataSources["CARTAPPROVAL"].uri,
                isDefault : false,
              mockedDataSource : "./localService/metadata.xml"
            }
        ]
    },
    getServiceParams: function () {
        return this.oServiceParams;
    },
    /**
     * @inherit
     */
    getServiceList: function () {
        return this.oServiceParams.serviceList;
    },
    getMasterKeyAttributes : function() {
        return ["WorkitemId"];
    },
    setApplicationFacade: function(oApplicationFacade) {
    	ui.s2p.srm.sc.approve.Configuration.oApplicationFacade = oApplicationFacade;
    }
});
}());
},
	"ui/s2p/srm/sc/approve/Main.controller.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
sap.ui.controller("ui.s2p.srm.sc.approve.Main", {

	onInit : function() {
        jQuery.sap.require("sap.ca.scfld.md.Startup");				
		sap.ca.scfld.md.Startup.init('ui.s2p.srm.sc.approve', this);
	},
	
	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * 
	 * @memberOf MainXML
	 */
	onExit : function() {

		//exit cleanup code here
	}	
	
});
},
	"ui/s2p/srm/sc/approve/Main.view.xml":'<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<core:View xmlns:core="sap.ui.core"\nxmlns="sap.m" controllerName="ui.s2p.srm.sc.approve.Main" displayBlock="true" height="100%">                          \n\t<NavContainer id="fioriContent" >                                                              \t\n\t</NavContainer> \n</core:View>\n',
	"ui/s2p/srm/sc/approve/i18n/i18n.properties":'#Approve Shopping Cart\n# __ldi.translation.uuid=244c2b10-3008-11e3-aa6e-0800200c9a66\n\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=Approve Shopping Carts\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Shopping Carts ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Shopping Cart\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=Description\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=Account Assignment\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=Delivery Date\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER = {0} or later\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=G/L Account\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=Quantity\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=Subtotal\n\n#XFLD: Title of the information area\nITEM_HEADER=Information\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=Delivery on\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=Delivery Required\n\n#XFLD: Info for Limit Item\nLIMIT=Limit\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=Product\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=Product Category\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=Service \n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=Service Category\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=Supplier\n\n#XFLD: Address data\nADDRESS=Address\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=Category\n\n#XFLD: Title for the notes view\nNOTES=Notes\n\n#XFLD: Account Assignment percentage\nSHARE=Share\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=Items ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=Item\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=of\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=Approval Chain\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today = Today\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday = Yesterday\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo ={0} days ago\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY = Forwarded By {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF = On Behalf Of {0}\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME = Substituting for {0}\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=Multiple Account Assignments\n\n#XFLD: Title for the attachments view \nATTACHMENTS = Attachments\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=Items \n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=Shopping Cart Approved\n\n#XFLD: Shopping Cart Rejected\nREJECTED=Shopping Cart Rejected\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED={0} Item(s) Approved, {1} Item(s) Rejected\n\n#XFLD: Shopping Cart Sent\nSENT=Shopping Cart Sent\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=Shopping Cart Forwarded to {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=Approve the shopping cart submitted by {0}?\n\n#XFLD: Shopping Cart Approve\nAPPROVE=Approve\n\n#XFLD: Shopping Cart Reject\nREJECT=Reject\n\n#XFLD: Ok\nOK=OK\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=Reject the shopping cart submitted by {0}?\n\n#XFLD: Shopping Cart Decision\nDECISION = Send your decision on the shopping cart submitted by {0}? \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS = Approved items\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS = Rejected items\n\n#XFLD: Shopping Cart Send\nSEND = Send \n\n#XFLD: Shopping Cart Forward\nFORWARD = Forward \n\n#XFLD: Shopping Cart Inquire\nINQUIRE = Inquire \n\n# XFLD: Title for the approval view\nAPPR_CHAIN = Approval Chain\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT = Account Assignment\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED = Unlimited\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER = Item {0} of {1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS = Delivery Address\n \n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} to {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=No Shopping Carts are currently available\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS =System cannot process Shopping Cart\n\n#YMSG: Error Message\nSEARCH_MESS= Enter a valid user name\n\n#XFLD: Expected Value field label\nEXP_VALUE = Expected Value\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT = Value Limit\n\n#XFLD: Cancel\nCANCEL=Cancel\n\n#XFLD: Add Note (optional)\nADDNOTE=Add Note (optional)',
	"ui/s2p/srm/sc/approve/i18n/i18n_ar.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=\\u0627\\u0639\\u062A\\u0645\\u0627\\u062F \\u0639\\u0631\\u0628\\u0627\\u062A \\u0627\\u0644\\u062A\\u0633\\u0648\\u0642\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=\\u0639\\u0631\\u0628\\u0627\\u062A \\u0627\\u0644\\u062A\\u0633\\u0648\\u0642 ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=\\u0639\\u0631\\u0628\\u0629 \\u0627\\u0644\\u062A\\u0633\\u0648\\u0642\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=\\u0627\\u0644\\u0648\\u0635\\u0641\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=\\u062A\\u0639\\u064A\\u064A\\u0646 \\u0627\\u0644\\u062D\\u0633\\u0627\\u0628\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=\\u062A\\u0627\\u0631\\u064A\\u062E \\u0627\\u0644\\u062A\\u0633\\u0644\\u064A\\u0645\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0} \\u0623\\u0648 \\u0623\\u062D\\u062F\\u062B\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=\\u062D\\u0633\\u0627\\u0628 \\u0627\\u0644\\u0623\\u0633\\u062A\\u0627\\u0630 \\u0627\\u0644\\u0639\\u0627\\u0645\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=\\u0627\\u0644\\u0643\\u0645\\u064A\\u0629\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=\\u0627\\u0644\\u0625\\u062C\\u0645\\u0627\\u0644\\u064A \\u0627\\u0644\\u0641\\u0631\\u0639\\u064A\n\n#XFLD: Title of the information area\nITEM_HEADER=\\u0645\\u0639\\u0644\\u0648\\u0645\\u0627\\u062A\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=\\u062A\\u0627\\u0631\\u064A\\u062E \\u0627\\u0644\\u062A\\u0633\\u0644\\u064A\\u0645\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=\\u0627\\u0644\\u062A\\u0633\\u0644\\u064A\\u0645 \\u0627\\u0644\\u0645\\u0637\\u0644\\u0648\\u0628\n\n#XFLD: Info for Limit Item\nLIMIT=\\u0627\\u0644\\u062D\\u062F\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=\\u0627\\u0644\\u0645\\u0646\\u062A\\u062C\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=\\u0641\\u0626\\u0629 \\u0627\\u0644\\u0645\\u0646\\u062A\\u062C\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=\\u0627\\u0644\\u062E\\u062F\\u0645\\u0629\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=\\u0641\\u0626\\u0629 \\u0627\\u0644\\u062E\\u062F\\u0645\\u0629\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=\\u0627\\u0644\\u0645\\u0648\\u0631\\u0651\\u0650\\u062F\n\n#XFLD: Address data\nADDRESS=\\u0627\\u0644\\u0639\\u0646\\u0648\\u0627\\u0646\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=\\u0627\\u0644\\u0641\\u0626\\u0629\n\n#XFLD: Title for the notes view\nNOTES=\\u0645\\u0644\\u0627\\u062D\\u0638\\u0627\\u062A\n\n#XFLD: Account Assignment percentage\nSHARE=\\u0645\\u0634\\u0627\\u0631\\u0643\\u0629\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=\\u0627\\u0644\\u0628\\u0646\\u0648\\u062F ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=\\u0627\\u0644\\u0628\\u0646\\u062F\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=\\u0645\\u0646\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=\\u0633\\u0644\\u0633\\u0644\\u0629 \\u0627\\u0644\\u0627\\u0639\\u062A\\u0645\\u0627\\u062F\\u0627\\u062A\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=\\u0627\\u0644\\u064A\\u0648\\u0645\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=\\u0623\\u0645\\u0633\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo=\\u0645\\u0646\\u0630 {0} \\u0645\\u0646 \\u0627\\u0644\\u0623\\u064A\\u0627\\u0645\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=\\u062A\\u0645\\u062A \\u0625\\u0639\\u0627\\u062F\\u0629 \\u0627\\u0644\\u062A\\u0648\\u062C\\u064A\\u0647 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF=\\u0628\\u0627\\u0644\\u0646\\u064A\\u0627\\u0628\\u0629 \\u0639\\u0646 {0}\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME=\\u0628\\u062F\\u064A\\u0644\\u0627\\u064B \\u0644\\u0640 {0}\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=\\u062A\\u0639\\u064A\\u064A\\u0646\\u0627\\u062A \\u0627\\u0644\\u062D\\u0633\\u0627\\u0628 \\u0627\\u0644\\u0645\\u062A\\u0639\\u062F\\u062F\\u0629\n\n#XFLD: Title for the attachments view \nATTACHMENTS=\\u0645\\u0631\\u0641\\u0642\\u0627\\u062A\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=\\u0627\\u0644\\u0628\\u0646\\u0648\\u062F\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=\\u0639\\u0631\\u0628\\u0629 \\u062A\\u0633\\u0648\\u0642 \\u0645\\u0639\\u062A\\u0645\\u062F\\u0629\n\n#XFLD: Shopping Cart Rejected\nREJECTED=\\u0639\\u0631\\u0628\\u0629 \\u062A\\u0633\\u0648\\u0642 \\u0645\\u0631\\u0641\\u0648\\u0636\\u0629\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED=\\u062A\\u0645 \\u0627\\u0639\\u062A\\u0645\\u0627\\u062F {0} \\u0645\\u0646 \\u0627\\u0644\\u0628\\u0646\\u0648\\u062F \\u0648\\u0631\\u0641\\u0636 {1} \\u0645\\u0646 \\u0627\\u0644\\u0628\\u0646\\u0648\\u062F\n\n#XFLD: Shopping Cart Sent\nSENT=\\u0639\\u0631\\u0628\\u0629 \\u062A\\u0633\\u0648\\u0642 \\u0645\\u0631\\u0633\\u064E\\u0644\\u0629\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=\\u062A\\u0645\\u062A \\u0625\\u0639\\u0627\\u062F\\u0629 \\u062A\\u0648\\u062C\\u064A\\u0647 \\u0639\\u0631\\u0628\\u0629 \\u0627\\u0644\\u062A\\u0633\\u0648\\u0642 \\u0625\\u0644\\u0649 {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=\\u0647\\u0644 \\u062A\\u0631\\u064A\\u062F \\u0627\\u0639\\u062A\\u0645\\u0627\\u062F \\u0639\\u0631\\u0628\\u0629 \\u0627\\u0644\\u062A\\u0633\\u0648\\u0642 \\u0627\\u0644\\u0645\\u0642\\u062F\\u0645\\u0629 \\u0645\\u0646 {0}\\u061F\n\n#XFLD: Shopping Cart Approve\nAPPROVE=\\u0627\\u0639\\u062A\\u0645\\u0627\\u062F\n\n#XFLD: Shopping Cart Reject\nREJECT=\\u0631\\u0641\\u0636\n\n#XFLD: Ok\nOK=\\u0645\\u0648\\u0627\\u0641\\u0642\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=\\u0647\\u0644 \\u062A\\u0631\\u064A\\u062F \\u0631\\u0641\\u0636 \\u0639\\u0631\\u0628\\u0629 \\u0627\\u0644\\u062A\\u0633\\u0648\\u0642 \\u0627\\u0644\\u0645\\u0642\\u062F\\u0645\\u0629 \\u0645\\u0646 {0}\\u061F\n\n#XFLD: Shopping Cart Decision\nDECISION=\\u0647\\u0644 \\u062A\\u0631\\u064A\\u062F \\u0625\\u0631\\u0633\\u0627\\u0644 \\u0642\\u0631\\u0627\\u0631\\u0643 \\u0628\\u0634\\u0623\\u0646 \\u0639\\u0631\\u0628\\u0629 \\u0627\\u0644\\u062A\\u0633\\u0648\\u0642 \\u0627\\u0644\\u0645\\u0642\\u062F\\u0645\\u0629 \\u0645\\u0646 {0}\\u061F \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=\\u0627\\u0644\\u0628\\u0646\\u0648\\u062F \\u0627\\u0644\\u0645\\u0639\\u062A\\u0645\\u062F\\u0629\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=\\u0627\\u0644\\u0628\\u0646\\u0648\\u062F \\u0627\\u0644\\u0645\\u0631\\u0641\\u0648\\u0636\\u0629\n\n#XFLD: Shopping Cart Send\nSEND=\\u0625\\u0631\\u0633\\u0627\\u0644\n\n#XFLD: Shopping Cart Forward\nFORWARD=\\u0625\\u0639\\u0627\\u062F\\u0629 \\u062A\\u0648\\u062C\\u064A\\u0647\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=\\u0627\\u0633\\u062A\\u0639\\u0644\\u0627\\u0645\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=\\u0633\\u0644\\u0633\\u0644\\u0629 \\u0627\\u0644\\u0627\\u0639\\u062A\\u0645\\u0627\\u062F\\u0627\\u062A\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=\\u062A\\u0639\\u064A\\u064A\\u0646 \\u0627\\u0644\\u062D\\u0633\\u0627\\u0628\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=\\u063A\\u064A\\u0631 \\u0645\\u062D\\u062F\\u0648\\u062F\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=\\u0627\\u0644\\u0628\\u0646\\u062F {0} \\u0645\\u0646 {1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0627\\u0644\\u062A\\u0633\\u0644\\u064A\\u0645\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} \\u0625\\u0644\\u0649 {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=\\u0644\\u0627 \\u062A\\u062A\\u0648\\u0641\\u0631 \\u0623\\u064A \\u0639\\u0631\\u0628\\u0627\\u062A \\u062A\\u0633\\u0648\\u0642 \\u062D\\u0627\\u0644\\u064A\\u064B\\u0627\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=\\u0644\\u0627 \\u064A\\u0645\\u0643\\u0646 \\u0644\\u0644\\u0646\\u0638\\u0627\\u0645 \\u0645\\u0639\\u0627\\u0644\\u062C\\u0629 \\u0639\\u0631\\u0628\\u0629 \\u0627\\u0644\\u062A\\u0633\\u0648\\u0642\n\n#YMSG: Error Message\nSEARCH_MESS=\\u0623\\u062F\\u062E\\u0644 \\u0627\\u0633\\u0645 \\u0645\\u0633\\u062A\\u062E\\u062F\\u0645 \\u0635\\u0627\\u0644\\u062D\\u064B\\u0627\n\n#XFLD: Expected Value field label\nEXP_VALUE=\\u0627\\u0644\\u0642\\u064A\\u0645\\u0629 \\u0627\\u0644\\u0645\\u062A\\u0648\\u0642\\u0639\\u0629\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=\\u062D\\u062F \\u0627\\u0644\\u0642\\u064A\\u0645\\u0629\n\n#XFLD: Cancel\nCANCEL=\\u0625\\u0644\\u063A\\u0627\\u0621\n\n#XFLD: Add Note (optional)\nADDNOTE=\\u0625\\u0636\\u0627\\u0641\\u0629 \\u0645\\u0644\\u0627\\u062D\\u0638\\u0629 (\\u0627\\u062E\\u062A\\u064A\\u0627\\u0631\\u064A)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_bg.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=\\u041E\\u0434\\u043E\\u0431\\u0440\\u044F\\u0432\\u0430\\u043D\\u0435 \\u043A\\u043E\\u043B\\u0438\\u0447\\u043A\\u0438 \\u0441 \\u043F\\u043E\\u043A\\u0443\\u043F\\u043A\\u0438\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=\\u041A\\u043E\\u043B\\u0438\\u0447\\u043A\\u0438 \\u0441 \\u043F\\u043E\\u043A\\u0443\\u043F\\u043A\\u0438 ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=\\u041A\\u043E\\u043B\\u0438\\u0447\\u043A\\u0430 \\u0441 \\u043F\\u043E\\u043A\\u0443\\u043F\\u043A\\u0438\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=\\u041E\\u043F\\u0438\\u0441\\u0430\\u043D\\u0438\\u0435\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=\\u041F\\u0440\\u0438\\u0441\\u044A\\u0435\\u0434\\u0438\\u043D\\u044F\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0441\\u043C\\u0435\\u0442\\u043A\\u0430\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=\\u0414\\u0430\\u0442\\u0430 \\u043D\\u0430 \\u0434\\u043E\\u0441\\u0442\\u0430\\u0432\\u043A\\u0430\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0} \\u0438\\u043B\\u0438 \\u043F\\u043E-\\u043A\\u044A\\u0441\\u043D\\u043E\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=\\u0421\\u043C\\u0435\\u0442\\u043A\\u0430 \\u043E\\u0442 \\u0413\\u043B\\u0430\\u0432\\u043D\\u0430 \\u043A\\u043D\\u0438\\u0433\\u0430\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=\\u041A\\u043E\\u043B\\u0438\\u0447\\u0435\\u0441\\u0442\\u0432\\u043E\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=\\u041C\\u0435\\u0436\\u0434\\u0438\\u043D\\u043D\\u0430 \\u0441\\u0443\\u043C\\u0430\n\n#XFLD: Title of the information area\nITEM_HEADER=\\u0418\\u043D\\u0444\\u043E\\u0440\\u043C\\u0430\\u0446\\u0438\\u044F\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=\\u0414\\u043E\\u0441\\u0442\\u0430\\u0432\\u0435\\u043D\\u043E \\u043D\\u0430\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=\\u0418\\u0437\\u0438\\u0441\\u043A\\u0432\\u0430 \\u0441\\u0435 \\u0434\\u043E\\u0441\\u0442\\u0430\\u0432\\u043A\\u0430\n\n#XFLD: Info for Limit Item\nLIMIT=\\u0413\\u0440\\u0430\\u043D\\u0438\\u0446\\u0430\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=\\u041F\\u0440\\u043E\\u0434\\u0443\\u043A\\u0442\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=\\u041A\\u0430\\u0442\\u0435\\u0433\\u043E\\u0440\\u0438\\u044F \\u043F\\u0440\\u043E\\u0434\\u0443\\u043A\\u0442\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=\\u0423\\u0441\\u043B\\u0443\\u0433\\u0430\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=\\u041A\\u0430\\u0442\\u0435\\u0433\\u043E\\u0440\\u0438\\u044F \\u0443\\u0441\\u043B\\u0443\\u0433\\u0438\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=\\u0414\\u043E\\u0441\\u0442\\u0430\\u0432\\u0447\\u0438\\u043A\n\n#XFLD: Address data\nADDRESS=\\u0410\\u0434\\u0440\\u0435\\u0441\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=\\u041A\\u0430\\u0442\\u0435\\u0433\\u043E\\u0440\\u0438\\u044F\n\n#XFLD: Title for the notes view\nNOTES=\\u0411\\u0435\\u043B\\u0435\\u0436\\u043A\\u0438\n\n#XFLD: Account Assignment percentage\nSHARE=\\u0414\\u044F\\u043B\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=\\u041F\\u043E\\u0437\\u0438\\u0446\\u0438\\u0438 ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=\\u041F\\u043E\\u0437\\u0438\\u0446\\u0438\\u044F\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=\\u043E\\u0442\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=\\u0412\\u0435\\u0440\\u0438\\u0433\\u0430 \\u043D\\u0430 \\u043E\\u0434\\u043E\\u0431\\u0440\\u0435\\u043D\\u0438\\u0435\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=\\u0414\\u043D\\u0435\\u0441\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=\\u0412\\u0447\\u0435\\u0440\\u0430\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo=\\u041F\\u0440\\u0435\\u0434\\u0438 {0} \\u0434\\u043D\\u0438\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=\\u041F\\u0440\\u0435\\u0430\\u0434\\u0440\\u0435\\u0441\\u0438\\u0440\\u0430\\u043D \\u043E\\u0442 {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF=\\u041E\\u0442 \\u0438\\u043C\\u0435\\u0442\\u043E \\u043D\\u0430 {0}\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME=\\u0417\\u0430\\u043C\\u0435\\u0441\\u0442\\u0432\\u0430\\u0449 \\u0437\\u0430 {0}\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=\\u041C\\u043D\\u043E\\u0433\\u043E\\u043A\\u0440\\u0430\\u0442\\u043D\\u0438 \\u043F\\u0440\\u0438\\u0441\\u044A\\u0435\\u0434\\u0438\\u043D\\u044F\\u0432\\u0430\\u043D\\u0438\\u044F \\u043D\\u0430 \\u0441\\u043C\\u0435\\u0442\\u043A\\u0438\n\n#XFLD: Title for the attachments view \nATTACHMENTS=\\u041F\\u0440\\u0438\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u044F\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=\\u041F\\u043E\\u0437\\u0438\\u0446\\u0438\\u0438\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=\\u041A\\u043E\\u043B\\u0438\\u0447\\u043A\\u0430\\u0442\\u0430 \\u0441 \\u043F\\u043E\\u043A\\u0443\\u043F\\u043A\\u0438 \\u0435 \\u043E\\u0434\\u043E\\u0431\\u0440\\u0435\\u043D\\u0430\n\n#XFLD: Shopping Cart Rejected\nREJECTED=\\u041A\\u043E\\u043B\\u0438\\u0447\\u043A\\u0430\\u0442\\u0430 \\u0441 \\u043F\\u043E\\u043A\\u0443\\u043F\\u043A\\u0438 \\u0435 \\u043E\\u0442\\u0445\\u0432\\u044A\\u0440\\u043B\\u0435\\u043D\\u0430\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED={0} \\u043E\\u0434\\u043E\\u0431\\u0440\\u0435\\u043D\\u0438 \\u043F\\u043E\\u0437\\u0438\\u0446\\u0438\\u0438, {1} \\u043E\\u0442\\u0445\\u0432\\u044A\\u0440\\u043B\\u0435\\u043D\\u0438 \\u043F\\u043E\\u0437\\u0438\\u0446\\u0438\\u0438\n\n#XFLD: Shopping Cart Sent\nSENT=\\u041A\\u043E\\u043B\\u0438\\u0447\\u043A\\u0430\\u0442\\u0430 \\u0441 \\u043F\\u043E\\u043A\\u0443\\u043F\\u043A\\u0438 \\u0435 \\u0438\\u0437\\u043F\\u0440\\u0430\\u0442\\u0435\\u043D\\u0430\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=\\u041A\\u043E\\u043B\\u0438\\u0447\\u043A\\u0430 \\u0441 \\u043F\\u043E\\u043A\\u0443\\u043F\\u043A\\u0438 \\u043F\\u0440\\u0435\\u0430\\u0434\\u0440\\u0435\\u0441\\u0438\\u0440\\u0430\\u043D\\u0430 \\u043A\\u044A\\u043C {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=\\u041E\\u0434\\u043E\\u0431\\u0440\\u044F\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u043A\\u043E\\u043B\\u0438\\u0447\\u043A\\u0430 \\u0441 \\u043F\\u043E\\u043A\\u0443\\u043F\\u043A\\u0438, \\u043F\\u0440\\u0435\\u0434\\u0441\\u0442\\u0430\\u0432\\u0435\\u043D\\u0430 \\u043E\\u0442 {0}?\n\n#XFLD: Shopping Cart Approve\nAPPROVE=\\u041E\\u0434\\u043E\\u0431\\u0440\\u044F\\u0432\\u0430\\u043D\\u0435\n\n#XFLD: Shopping Cart Reject\nREJECT=\\u041E\\u0442\\u0445\\u0432\\u044A\\u0440\\u043B\\u044F\\u043D\\u0435\n\n#XFLD: Ok\nOK=OK\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=\\u041E\\u0442\\u0445\\u0432\\u044A\\u0440\\u043B\\u044F\\u043D\\u0435 \\u043D\\u0430 \\u043A\\u043E\\u043B\\u0438\\u0447\\u043A\\u0430 \\u0441 \\u043F\\u043E\\u043A\\u0443\\u043F\\u043A\\u0438, \\u043F\\u0440\\u0435\\u0434\\u0441\\u0442\\u0430\\u0432\\u0435\\u043D\\u0430 \\u043E\\u0442 {0}?\n\n#XFLD: Shopping Cart Decision\nDECISION=\\u0418\\u0437\\u043F\\u0440\\u0430\\u0449\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0432\\u0430\\u0448\\u0435\\u0442\\u043E \\u0440\\u0435\\u0448\\u0435\\u043D\\u0438\\u0435 \\u0437\\u0430 \\u043A\\u043E\\u043B\\u0438\\u0447\\u043A\\u0430\\u0442\\u0430 \\u0441 \\u043F\\u043E\\u043A\\u0443\\u043F\\u043A\\u0438, \\u043F\\u0440\\u0435\\u0434\\u0441\\u0442\\u0430\\u0432\\u0435\\u043D\\u0430 \\u043E\\u0442 {0}? \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=\\u041E\\u0434\\u043E\\u0431\\u0440\\u0435\\u043D\\u0438 \\u043F\\u043E\\u0437\\u0438\\u0446\\u0438\\u0438\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=\\u041E\\u0442\\u0445\\u0432\\u044A\\u0440\\u043B\\u0435\\u043D\\u0438 \\u043F\\u043E\\u0437\\u0438\\u0446\\u0438\\u0438\n\n#XFLD: Shopping Cart Send\nSEND=\\u0418\\u0437\\u043F\\u0440\\u0430\\u0449\\u0430\\u043D\\u0435\n\n#XFLD: Shopping Cart Forward\nFORWARD=\\u041F\\u0440\\u0435\\u043F\\u0440\\u0430\\u0449\\u0430\\u043D\\u0435\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=\\u0417\\u0430\\u043F\\u0438\\u0442\\u0432\\u0430\\u043D\\u0435\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=\\u0412\\u0435\\u0440\\u0438\\u0433\\u0430 \\u043D\\u0430 \\u043E\\u0434\\u043E\\u0431\\u0440\\u0435\\u043D\\u0438\\u0435\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=\\u041F\\u0440\\u0438\\u0441\\u044A\\u0435\\u0434\\u0438\\u043D\\u044F\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0441\\u043C\\u0435\\u0442\\u043A\\u0430\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=\\u041D\\u0435\\u043E\\u0433\\u0440\\u0430\\u043D\\u0438\\u0447\\u0435\\u043D\\u043E\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=\\u041F\\u043E\\u0437\\u0438\\u0446\\u0438\\u044F {0} \\u043E\\u0442 {1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=\\u0410\\u0434\\u0440\\u0435\\u0441 \\u0437\\u0430 \\u0434\\u043E\\u0441\\u0442\\u0430\\u0432\\u043A\\u0430\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} \\u0434\\u043E {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=\\u0412 \\u043C\\u043E\\u043C\\u0435\\u043D\\u0442\\u0430 \\u043D\\u044F\\u043C\\u0430 \\u043D\\u0430\\u043B\\u0438\\u0447\\u043D\\u0438 \\u043A\\u043E\\u043B\\u0438\\u0447\\u043A\\u0438 \\u0441 \\u043F\\u043E\\u043A\\u0443\\u043F\\u043A\\u0438\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=\\u0421\\u0438\\u0441\\u0442\\u0435\\u043C\\u0430\\u0442\\u0430 \\u043D\\u0435 \\u043C\\u043E\\u0436\\u0435 \\u0434\\u0430 \\u043E\\u0431\\u0440\\u0430\\u0431\\u043E\\u0442\\u0438 \\u043A\\u043E\\u043B\\u0438\\u0447\\u043A\\u0430\\u0442\\u0430 \\u0441 \\u043F\\u043E\\u043A\\u0443\\u043F\\u043A\\u0438\n\n#YMSG: Error Message\nSEARCH_MESS=\\u0412\\u044A\\u0432\\u0435\\u0434\\u0435\\u0442\\u0435 \\u0432\\u0430\\u043B\\u0438\\u0434\\u043D\\u043E \\u043F\\u043E\\u0442\\u0440\\u0435\\u0431\\u0438\\u0442\\u0435\\u043B\\u0441\\u043A\\u043E \\u0438\\u043C\\u0435\n\n#XFLD: Expected Value field label\nEXP_VALUE=\\u041E\\u0447\\u0430\\u043A\\u0432\\u0430\\u043D\\u0430 \\u0441\\u0442\\u043E\\u0439\\u043D\\u043E\\u0441\\u0442\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=\\u041B\\u0438\\u043C\\u0438\\u0442 \\u0437\\u0430 \\u0441\\u0442\\u043E\\u0439\\u043D\\u043E\\u0441\\u0442\n\n#XFLD: Cancel\nCANCEL=\\u041E\\u0442\\u043A\\u0430\\u0437\n\n#XFLD: Add Note (optional)\nADDNOTE=\\u0414\\u043E\\u0431\\u0430\\u0432\\u044F\\u043D\\u0435 \\u043D\\u0430 \\u0431\\u0435\\u043B\\u0435\\u0436\\u043A\\u0430 (\\u043D\\u0435\\u0437\\u0430\\u0434\\u044A\\u043B\\u0436\\u0438\\u0442\\u0435\\u043B\\u043D\\u043E)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_cs.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=Schvalov\\u00E1n\\u00ED n\\u00E1kupn\\u00EDch ko\\u0161\\u00EDk\\u016F\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=N\\u00E1kupn\\u00ED ko\\u0161\\u00EDky ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=N\\u00E1kupn\\u00ED ko\\u0161\\u00EDk\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=Popis\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=P\\u0159i\\u0159azen\\u00ED \\u00FA\\u010Dtu\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=Datum dod\\u00E1vky\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0} nebo pozd\\u011Bji\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=\\u00DA\\u010Det hlavn\\u00ED knihy\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=Mno\\u017Estv\\u00ED\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=Mezisou\\u010Det\n\n#XFLD: Title of the information area\nITEM_HEADER=Informace\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=Datum dod\\u00E1n\\u00ED\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=Po\\u017Eadovan\\u00E9 dod\\u00E1n\\u00ED\n\n#XFLD: Info for Limit Item\nLIMIT=Limit\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=Produkt\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=Kategorie produktu\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=Slu\\u017Eba\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=Kategorie slu\\u017Eby\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=Dodavatel\n\n#XFLD: Address data\nADDRESS=Adresa\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=Kategorie\n\n#XFLD: Title for the notes view\nNOTES=Pozn\\u00E1mky\n\n#XFLD: Account Assignment percentage\nSHARE=Sd\\u00EDlet\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=Polo\\u017Eky ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=Polo\\u017Eka\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=z\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=Schvalovac\\u00ED \\u0159et\\u011Bzec\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=Dnes\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=V\\u010Dera\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo=P\\u0159ed {0} dny\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=P\\u0159ed\\u00E1no {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF=V zastoupen\\u00ED {0}\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME=N\\u00E1hrada za {0}\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=V\\u00EDce p\\u0159i\\u0159azen\\u00ED \\u00FA\\u010Dtu\n\n#XFLD: Title for the attachments view \nATTACHMENTS=P\\u0159\\u00EDlohy\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=Polo\\u017Eky\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=N\\u00E1kupn\\u00ED ko\\u0161\\u00EDk schv\\u00E1len\n\n#XFLD: Shopping Cart Rejected\nREJECTED=N\\u00E1kupn\\u00ED ko\\u0161\\u00EDk zam\\u00EDtnut\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED=Po\\u010Det schv\\u00E1len\\u00FDch polo\\u017Eek\\: {0}, po\\u010Det zam\\u00EDtnut\\u00FDch polo\\u017Eek\\: {1}\n\n#XFLD: Shopping Cart Sent\nSENT=N\\u00E1kupn\\u00ED ko\\u0161\\u00EDk odesl\\u00E1n\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=N\\u00E1kupn\\u00ED ko\\u0161\\u00EDk byl p\\u0159ed\\u00E1n {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=Schv\\u00E1lit n\\u00E1kupn\\u00ED ko\\u0161\\u00EDk odeslan\\u00FD {0}?\n\n#XFLD: Shopping Cart Approve\nAPPROVE=Schv\\u00E1lit\n\n#XFLD: Shopping Cart Reject\nREJECT=Odm\\u00EDtnout\n\n#XFLD: Ok\nOK=OK\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=Zam\\u00EDtnout n\\u00E1kupn\\u00ED ko\\u0161\\u00EDk odeslan\\u00FD {0}?\n\n#XFLD: Shopping Cart Decision\nDECISION=Odeslat va\\u0161e rozhodnut\\u00ED o n\\u00E1kupn\\u00EDm ko\\u0161\\u00EDku odeslan\\u00E9m {0}? \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=Schv\\u00E1len\\u00E9 polo\\u017Eky\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=Zam\\u00EDtnut\\u00E9 polo\\u017Eky\n\n#XFLD: Shopping Cart Send\nSEND=Odeslat\n\n#XFLD: Shopping Cart Forward\nFORWARD=P\\u0159edat\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=Zjistit\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=Schvalovac\\u00ED \\u0159et\\u011Bzec\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=P\\u0159i\\u0159azen\\u00ED \\u00FA\\u010Dtu\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=Neomezen\\u011B\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=Polo\\u017Eka {0} z {1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=Dodac\\u00ED adresa\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} do {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=Nyn\\u00ED nejsou dostupn\\u00E9 \\u017E\\u00E1dn\\u00E9 n\\u00E1kupn\\u00ED ko\\u0161\\u00EDky\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=Syst\\u00E9m nem\\u016F\\u017Ee zpracovat n\\u00E1kupn\\u00ED ko\\u0161\\u00EDk\n\n#YMSG: Error Message\nSEARCH_MESS=Zadejte platn\\u00E9 u\\u017Eivatelsk\\u00E9 jm\\u00E9no\n\n#XFLD: Expected Value field label\nEXP_VALUE=O\\u010Dek\\u00E1van\\u00E1 hodnota\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=Hodnotov\\u00FD limit\n\n#XFLD: Cancel\nCANCEL=Zru\\u0161it\n\n#XFLD: Add Note (optional)\nADDNOTE=P\\u0159idat pozn\\u00E1mku (voliteln\\u00E9)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_de.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=Einkaufswagen genehmigen\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Einkaufswagen ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Einkaufswagen\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=Beschreibung\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=Kontierung\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=Lieferdatum\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0} oder sp\\u00E4ter\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=Sachkonto\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=Menge\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=Zwischensumme\n\n#XFLD: Title of the information area\nITEM_HEADER=Informationen\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=Lieferung am\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=Ben\\u00F6tigt ab\n\n#XFLD: Info for Limit Item\nLIMIT=Limit\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=Produkt\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=Produktkategorie\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=Service\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=Servicekategorie\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=Lieferant\n\n#XFLD: Address data\nADDRESS=Adresse\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=Kategorie\n\n#XFLD: Title for the notes view\nNOTES=Notizen\n\n#XFLD: Account Assignment percentage\nSHARE=Anteil\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=Positionen ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=Position\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=von\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=Genehmigungskette\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=Heute\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=Gestern\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo=Vor {0} Tagen\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=Weitergeleitet von {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF=Im Namen von {0}\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME=Stellvertretend f\\u00FCr {0}\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=Mehrere Kontierungen\n\n#XFLD: Title for the attachments view \nATTACHMENTS=Anlagen\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=Positionen\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=Einkaufswagen genehmigt\n\n#XFLD: Shopping Cart Rejected\nREJECTED=Einkaufswagen abgelehnt\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED={0} Positionen genehmigt, {1} Positionen abgelehnt\n\n#XFLD: Shopping Cart Sent\nSENT=Einkaufswagen gesendet\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=Einkaufswagen an {0} weitergeleitet\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=Einkaufswagen von {0} genehmigen?\n\n#XFLD: Shopping Cart Approve\nAPPROVE=Genehmigen\n\n#XFLD: Shopping Cart Reject\nREJECT=Ablehnen\n\n#XFLD: Ok\nOK=OK\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=Einkaufswagen von {0} ablehnen?\n\n#XFLD: Shopping Cart Decision\nDECISION=Entscheidung f\\u00FCr Einkaufswagen von {0} senden? \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=Genehmigte Positionen\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=Abgelehnte Positionen\n\n#XFLD: Shopping Cart Send\nSEND=Senden\n\n#XFLD: Shopping Cart Forward\nFORWARD=Weiterleiten\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=Anfrage\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=Genehmigungskette\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=Kontierung\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=Unbegrenzt\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=Position {0} von {1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=Lieferadresse\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} bis {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=Derzeit sind keine Einkaufswagen verf\\u00FCgbar\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=System kann den Einkaufswagen nicht bearbeiten\n\n#YMSG: Error Message\nSEARCH_MESS=Geben Sie einen g\\u00FCltigen Benutzernamen ein\n\n#XFLD: Expected Value field label\nEXP_VALUE=Erwarteter Wert\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=Wertlimit\n\n#XFLD: Cancel\nCANCEL=Abbrechen\n\n#XFLD: Add Note (optional)\nADDNOTE=Notiz hinzuf\\u00FCgen (optional)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_en.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=Approve Shopping Carts\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Shopping Carts ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Shopping Cart\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=Description\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=Account Assignment\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=Delivery Date\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0} or later\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=G/L Account\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=Quantity\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=Subtotal\n\n#XFLD: Title of the information area\nITEM_HEADER=Information\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=Delivery on\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=Delivery Required\n\n#XFLD: Info for Limit Item\nLIMIT=Limit\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=Product\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=Product Category\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=Service\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=Service Category\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=Supplier\n\n#XFLD: Address data\nADDRESS=Address\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=Category\n\n#XFLD: Title for the notes view\nNOTES=Notes\n\n#XFLD: Account Assignment percentage\nSHARE=Share\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=Items ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=Item\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=of\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=Approval Chain\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=Today\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=Yesterday\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo={0} days ago\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=Forwarded by {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF=On Behalf of {0}\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME=Substituting for {0}\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=Multiple Account Assignments\n\n#XFLD: Title for the attachments view \nATTACHMENTS=Attachments\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=Items\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=Shopping Cart Approved\n\n#XFLD: Shopping Cart Rejected\nREJECTED=Shopping Cart Rejected\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED={0} Items Approved, {1} Items Rejected\n\n#XFLD: Shopping Cart Sent\nSENT=Shopping Cart Sent\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=Shopping Cart forwarded to {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=Approve the shopping cart submitted by {0}?\n\n#XFLD: Shopping Cart Approve\nAPPROVE=Approve\n\n#XFLD: Shopping Cart Reject\nREJECT=Reject\n\n#XFLD: Ok\nOK=OK\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=Reject the shopping cart submitted by {0}?\n\n#XFLD: Shopping Cart Decision\nDECISION=Send your decision on the shopping cart submitted by {0}? \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=Approved Items\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=Rejected Items\n\n#XFLD: Shopping Cart Send\nSEND=Send\n\n#XFLD: Shopping Cart Forward\nFORWARD=Forward\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=Inquire\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=Approval Chain\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=Account Assignment\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=Unlimited\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=Item {0} of {1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=Delivery Address\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} to {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=No shopping carts are currently available\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=System cannot process shopping cart\n\n#YMSG: Error Message\nSEARCH_MESS=Enter a valid user name\n\n#XFLD: Expected Value field label\nEXP_VALUE=Expected Value\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=Value Limit\n\n#XFLD: Cancel\nCANCEL=Cancel\n\n#XFLD: Add Note (optional)\nADDNOTE=Add Note (Optional)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_en_US_sappsd.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=[[[\\u0100\\u03C1\\u03C1\\u0157\\u014F\\u028B\\u0113 \\u015C\\u0125\\u014F\\u03C1\\u03C1\\u012F\\u014B\\u011F \\u0108\\u0105\\u0157\\u0163\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=[[[\\u015C\\u0125\\u014F\\u03C1\\u03C1\\u012F\\u014B\\u011F \\u0108\\u0105\\u0157\\u0163\\u015F ({0}) ]]]\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=[[[\\u015C\\u0125\\u014F\\u03C1\\u03C1\\u012F\\u014B\\u011F \\u0108\\u0105\\u0157\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=[[[\\u010E\\u0113\\u015F\\u010B\\u0157\\u012F\\u03C1\\u0163\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=[[[\\u0100\\u010B\\u010B\\u014F\\u0171\\u014B\\u0163 \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=[[[\\u010E\\u0113\\u013A\\u012F\\u028B\\u0113\\u0157\\u0177 \\u010E\\u0105\\u0163\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER=[[[{0} \\u014F\\u0157 \\u013A\\u0105\\u0163\\u0113\\u0157]]]\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=[[[\\u0122/\\u013B \\u0100\\u010B\\u010B\\u014F\\u0171\\u014B\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=[[[\\u01EC\\u0171\\u0105\\u014B\\u0163\\u012F\\u0163\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=[[[\\u015C\\u0171\\u0183\\u0163\\u014F\\u0163\\u0105\\u013A\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Title of the information area\nITEM_HEADER=[[[\\u012C\\u014B\\u0192\\u014F\\u0157\\u0271\\u0105\\u0163\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=[[[\\u010E\\u0113\\u013A\\u012F\\u028B\\u0113\\u0157\\u0177 \\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=[[[\\u010E\\u0113\\u013A\\u012F\\u028B\\u0113\\u0157\\u0177 \\u0158\\u0113\\u01A3\\u0171\\u012F\\u0157\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Info for Limit Item\nLIMIT=[[[\\u013B\\u012F\\u0271\\u012F\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=[[[\\u01A4\\u0157\\u014F\\u018C\\u0171\\u010B\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=[[[\\u01A4\\u0157\\u014F\\u018C\\u0171\\u010B\\u0163 \\u0108\\u0105\\u0163\\u0113\\u011F\\u014F\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=[[[\\u015C\\u0113\\u0157\\u028B\\u012F\\u010B\\u0113 \\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=[[[\\u015C\\u0113\\u0157\\u028B\\u012F\\u010B\\u0113 \\u0108\\u0105\\u0163\\u0113\\u011F\\u014F\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=[[[\\u015C\\u0171\\u03C1\\u03C1\\u013A\\u012F\\u0113\\u0157\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Address data\nADDRESS=[[[\\u0100\\u018C\\u018C\\u0157\\u0113\\u015F\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=[[[\\u0108\\u0105\\u0163\\u0113\\u011F\\u014F\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Title for the notes view\nNOTES=[[[\\u0143\\u014F\\u0163\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Account Assignment percentage\nSHARE=[[[\\u015C\\u0125\\u0105\\u0157\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=[[[\\u012C\\u0163\\u0113\\u0271\\u015F ({0}) ]]]\n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=[[[\\u012C\\u0163\\u0113\\u0271]]]\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=[[[\\u014F\\u0192\\u2219\\u2219]]]\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=[[[\\u0100\\u03C1\\u03C1\\u0157\\u014F\\u028B\\u0105\\u013A \\u0108\\u0125\\u0105\\u012F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=[[[\\u0162\\u014F\\u018C\\u0105\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=[[[\\u0176\\u0113\\u015F\\u0163\\u0113\\u0157\\u018C\\u0105\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo=[[[{0} \\u018C\\u0105\\u0177\\u015F \\u0105\\u011F\\u014F]]]\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=[[[\\u0191\\u014F\\u0157\\u0175\\u0105\\u0157\\u018C\\u0113\\u018C \\u0181\\u0177 {0}]]]\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF=[[[\\u014E\\u014B \\u0181\\u0113\\u0125\\u0105\\u013A\\u0192 \\u014E\\u0192 {0}]]]\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME=[[[\\u015C\\u0171\\u0183\\u015F\\u0163\\u012F\\u0163\\u0171\\u0163\\u012F\\u014B\\u011F \\u0192\\u014F\\u0157 {0}]]]\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=[[[\\u039C\\u0171\\u013A\\u0163\\u012F\\u03C1\\u013A\\u0113 \\u0100\\u010B\\u010B\\u014F\\u0171\\u014B\\u0163 \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Title for the attachments view \nATTACHMENTS=[[[\\u0100\\u0163\\u0163\\u0105\\u010B\\u0125\\u0271\\u0113\\u014B\\u0163\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=[[[\\u012C\\u0163\\u0113\\u0271\\u015F \\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Text value One\nONE=[[[1\\u2219\\u2219\\u2219]]]\n\n#XFLD: Shopping Cart Approved\nAPPROVED=[[[\\u015C\\u0125\\u014F\\u03C1\\u03C1\\u012F\\u014B\\u011F \\u0108\\u0105\\u0157\\u0163 \\u0100\\u03C1\\u03C1\\u0157\\u014F\\u028B\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Shopping Cart Rejected\nREJECTED=[[[\\u015C\\u0125\\u014F\\u03C1\\u03C1\\u012F\\u014B\\u011F \\u0108\\u0105\\u0157\\u0163 \\u0158\\u0113\\u0135\\u0113\\u010B\\u0163\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED=[[[{0} \\u012C\\u0163\\u0113\\u0271(\\u015F) \\u0100\\u03C1\\u03C1\\u0157\\u014F\\u028B\\u0113\\u018C, {1} \\u012C\\u0163\\u0113\\u0271(\\u015F) \\u0158\\u0113\\u0135\\u0113\\u010B\\u0163\\u0113\\u018C]]]\n\n#XFLD: Shopping Cart Sent\nSENT=[[[\\u015C\\u0125\\u014F\\u03C1\\u03C1\\u012F\\u014B\\u011F \\u0108\\u0105\\u0157\\u0163 \\u015C\\u0113\\u014B\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=[[[\\u015C\\u0125\\u014F\\u03C1\\u03C1\\u012F\\u014B\\u011F \\u0108\\u0105\\u0157\\u0163 \\u0191\\u014F\\u0157\\u0175\\u0105\\u0157\\u018C\\u0113\\u018C \\u0163\\u014F {0}]]]\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=[[[\\u0100\\u03C1\\u03C1\\u0157\\u014F\\u028B\\u0113 \\u0163\\u0125\\u0113 \\u015F\\u0125\\u014F\\u03C1\\u03C1\\u012F\\u014B\\u011F \\u010B\\u0105\\u0157\\u0163 \\u015F\\u0171\\u0183\\u0271\\u012F\\u0163\\u0163\\u0113\\u018C \\u0183\\u0177 {0}?]]]\n\n#XFLD: Shopping Cart Approve\nAPPROVE=[[[\\u0100\\u03C1\\u03C1\\u0157\\u014F\\u028B\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Shopping Cart Reject\nREJECT=[[[\\u0158\\u0113\\u0135\\u0113\\u010B\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Ok\nOK=[[[\\u014E\\u0136\\u2219\\u2219]]]\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=[[[\\u0158\\u0113\\u0135\\u0113\\u010B\\u0163 \\u0163\\u0125\\u0113 \\u015F\\u0125\\u014F\\u03C1\\u03C1\\u012F\\u014B\\u011F \\u010B\\u0105\\u0157\\u0163 \\u015F\\u0171\\u0183\\u0271\\u012F\\u0163\\u0163\\u0113\\u018C \\u0183\\u0177 {0}?]]]\n\n#XFLD: Shopping Cart Decision\nDECISION=[[[\\u015C\\u0113\\u014B\\u018C \\u0177\\u014F\\u0171\\u0157 \\u018C\\u0113\\u010B\\u012F\\u015F\\u012F\\u014F\\u014B \\u014F\\u014B \\u0163\\u0125\\u0113 \\u015F\\u0125\\u014F\\u03C1\\u03C1\\u012F\\u014B\\u011F \\u010B\\u0105\\u0157\\u0163 \\u015F\\u0171\\u0183\\u0271\\u012F\\u0163\\u0163\\u0113\\u018C \\u0183\\u0177 {0}? ]]]\n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=[[[\\u0100\\u03C1\\u03C1\\u0157\\u014F\\u028B\\u0113\\u018C \\u012F\\u0163\\u0113\\u0271\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=[[[\\u0158\\u0113\\u0135\\u0113\\u010B\\u0163\\u0113\\u018C \\u012F\\u0163\\u0113\\u0271\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Shopping Cart Send\nSEND=[[[\\u015C\\u0113\\u014B\\u018C \\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Shopping Cart Forward\nFORWARD=[[[\\u0191\\u014F\\u0157\\u0175\\u0105\\u0157\\u018C \\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=[[[\\u012C\\u014B\\u01A3\\u0171\\u012F\\u0157\\u0113 \\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=[[[\\u0100\\u03C1\\u03C1\\u0157\\u014F\\u028B\\u0105\\u013A \\u0108\\u0125\\u0105\\u012F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=[[[\\u0100\\u010B\\u010B\\u014F\\u0171\\u014B\\u0163 \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=[[[\\u016E\\u014B\\u013A\\u012F\\u0271\\u012F\\u0163\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=[[[\\u012C\\u0163\\u0113\\u0271 {0} \\u014F\\u0192 {1} ]]]\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=[[[\\u010E\\u0113\\u013A\\u012F\\u028B\\u0113\\u0157\\u0177 \\u0100\\u018C\\u018C\\u0157\\u0113\\u015F\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY=[[[{0} \\u0163\\u014F {1}]]]\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=[[[\\u0143\\u014F \\u015C\\u0125\\u014F\\u03C1\\u03C1\\u012F\\u014B\\u011F \\u0108\\u0105\\u0157\\u0163\\u015F \\u0105\\u0157\\u0113 \\u010B\\u0171\\u0157\\u0157\\u0113\\u014B\\u0163\\u013A\\u0177 \\u0105\\u028B\\u0105\\u012F\\u013A\\u0105\\u0183\\u013A\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=[[[\\u015C\\u0177\\u015F\\u0163\\u0113\\u0271 \\u010B\\u0105\\u014B\\u014B\\u014F\\u0163 \\u03C1\\u0157\\u014F\\u010B\\u0113\\u015F\\u015F \\u015C\\u0125\\u014F\\u03C1\\u03C1\\u012F\\u014B\\u011F \\u0108\\u0105\\u0157\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#YMSG: Error Message\nSEARCH_MESS=[[[\\u0114\\u014B\\u0163\\u0113\\u0157 \\u0105 \\u028B\\u0105\\u013A\\u012F\\u018C \\u0171\\u015F\\u0113\\u0157 \\u014B\\u0105\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Expected Value field label\nEXP_VALUE=[[[\\u0114\\u03C7\\u03C1\\u0113\\u010B\\u0163\\u0113\\u018C \\u01B2\\u0105\\u013A\\u0171\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=[[[\\u01B2\\u0105\\u013A\\u0171\\u0113 \\u013B\\u012F\\u0271\\u012F\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Cancel\nCANCEL=[[[\\u0108\\u0105\\u014B\\u010B\\u0113\\u013A\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Add Note (optional)\nADDNOTE=[[[\\u0100\\u018C\\u018C \\u0143\\u014F\\u0163\\u0113 (\\u014F\\u03C1\\u0163\\u012F\\u014F\\u014B\\u0105\\u013A)\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_en_US_saptrc.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=QkbNZ4aKEtWMGhF0p3TJag_Approve Shopping Carts\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=EXlexSkNjlLNpoQgPibBGQ_Shopping Carts ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=vtGi721dksWSqEpOSu3fkg_Shopping Cart\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=oQDOAuZsO+1fQUD0ACL6tQ_Description\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=wuVU3QI7MlNPF9e0s1bR+Q_Account Assignment\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=k43E6WMN8vOpwwfjNzYHyw_Delivery Date\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER=6huXfHvk9XbmORDIyouMOg_{0} or later\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=Enkwggq+PPh2BRMSeRSkvQ_G/L Account\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=z1H/g2xrXqM3+0SwuAeOCw_Quantity\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=Mstd/ERMrHNg0XLH/iREwQ_Subtotal\n\n#XFLD: Title of the information area\nITEM_HEADER=m3LiIHnahWcnaxVm1GxY6A_Information\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=lKr2OUWNCdTP9eJoy9cAVQ_Delivery on\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=DDbMbXyJ2qg9wEsXBVP6HA_Delivery Required\n\n#XFLD: Info for Limit Item\nLIMIT=w8yFGzoBZ5okHkyndVxG6g_Limit\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=lBE8vXnNDjbNTFALt1pT+g_Product\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=OkQ0LOtN+hX5gg5HTpVGkw_Product Category\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=S6iIXeI20yUpuHkOEbis9w_Service \n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=jpLH+Tpz01c+TNLGXFro+w_Service Category\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=Ptc7OrD1+FZf7Njryx89xg_Supplier\n\n#XFLD: Address data\nADDRESS=1yeyrR1ZMQiKLDGhCCNwsg_Address\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=AB2tx1WP7oovlhJeCYXFWw_Category\n\n#XFLD: Title for the notes view\nNOTES=D8qe6oBFcbv9KhVy+xB5ow_Notes\n\n#XFLD: Account Assignment percentage\nSHARE=5lAkB6oedjg+JIswkGst4w_Share\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=ektFWeVzDmJTIPakLYWqLw_Items ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=IJpoODvVGfENCYqdR5p08Q_Item\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=BgAtTIgWuQuzFZ3odKFNrQ_of\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=eAQS9LHh2UBFXwc4Ch8gBA_Approval Chain\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=a8BhVjYjnKO4P66YPViUtQ_Today\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=xZmOjODlxvvAh0OKXC/fog_Yesterday\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo=ZYvaUaSrvurctZ8qBDEk8A_{0} days ago\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=cjhfY/tpqjamiWvR9gS/LQ_Forwarded By {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF=p9GjJbeJK7qBd0wZLy/r7Q_On Behalf Of {0}\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME=UzHGhgd1An22/oiNMJfGCg_Substituting for {0}\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=LEPq7T15srT32s/cde/aMA_Multiple Account Assignments\n\n#XFLD: Title for the attachments view \nATTACHMENTS=V4/5laXpuXsM3e8K++9+Hg_Attachments\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=M2eUKKIUDoqLyjHIAo+GLg_Items \n\n#XFLD: Text value One\nONE=c75LypRwxfQqoXnlBhLzRA_1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=2wMT0A8LUXnQj8C9MflMtg_Shopping Cart Approved\n\n#XFLD: Shopping Cart Rejected\nREJECTED=HOq3OSFRE0gnFmUVEjYeAg_Shopping Cart Rejected\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED=BjBDtiX3s2nZkzvdF2XCXw_{0} Item(s) Approved, {1} Item(s) Rejected\n\n#XFLD: Shopping Cart Sent\nSENT=FML3rtTkC/uaGd4bIrxhcw_Shopping Cart Sent\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=iE3CA3kPIaAXm9zi+TyP1Q_Shopping Cart Forwarded to {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=4o6+gK/IebAIDy+8eqCiaw_Approve the shopping cart submitted by {0}?\n\n#XFLD: Shopping Cart Approve\nAPPROVE=jOV8CJmjO2GNVdJ/RY3L+A_Approve\n\n#XFLD: Shopping Cart Reject\nREJECT=rMZT+F4dK2Gw1NgSUUKK/A_Reject\n\n#XFLD: Ok\nOK=6YFJ+X+WEg+llhLGI/ERxQ_OK\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=jGnF/iimz5ynYuFHGdewBA_Reject the shopping cart submitted by {0}?\n\n#XFLD: Shopping Cart Decision\nDECISION=7aFoGLDpM9wYHWcHwkG5qg_Send your decision on the shopping cart submitted by {0}? \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=CeOcwCemC9g1fWloLpqU8w_Approved items\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=DAjp6NK+sFu2B08EaGh9bw_Rejected items\n\n#XFLD: Shopping Cart Send\nSEND=RT/xbKJHFNKIk6PlJqN5rQ_Send \n\n#XFLD: Shopping Cart Forward\nFORWARD=ahBdEeR/s2KCsi3U8xgLjg_Forward \n\n#XFLD: Shopping Cart Inquire\nINQUIRE=HSEOEAK6YCetqIKstROR3w_Inquire \n\n# XFLD: Title for the approval view\nAPPR_CHAIN=UasSWxs+OmCSXPPhNc39vA_Approval Chain\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=ASPi9A7Hr/OFBrwB3JKk4A_Account Assignment\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=swrFJXVnCnLFQI+8pvObYw_Unlimited\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=bWrfg3ngVpNF4osmCsCFMg_Item {0} of {1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=dNU4vxljrRX7lqAvfXFTqw_Delivery Address\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY=f6Vs1ntxEkM+OjH/MMc33A_{0} to {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=d1cFTESPf+fjMrqkNk/S+A_No Shopping Carts are currently available\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=j2bnRHR6F7hqmA6TrlZ7fw_System cannot process Shopping Cart\n\n#YMSG: Error Message\nSEARCH_MESS=N0/AIP3ICvvjYhZspyb7iA_Enter a valid user name\n\n#XFLD: Expected Value field label\nEXP_VALUE=w3IXZpSkk5ZLoyjP+JV+cA_Expected Value\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=Ox1E1/p+3v3tS5sFQyk7nw_Value Limit\n\n#XFLD: Cancel\nCANCEL=xzj3TZVtFI2pigQAVzdUuw_Cancel\n\n#XFLD: Add Note (optional)\nADDNOTE=+qTU91U1cklVgpR7BQZbJg_Add Note (optional)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_es.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=Aprobaci\\u00F3n \\u00F3rdenes de compra\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Carritos ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Carrito de compra\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=Descripci\\u00F3n\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=Asignaci\\u00F3n de costes\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=Fecha de entrega\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0}o despu\\u00E9s\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=Cuenta mayor\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=Cantidad\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=Subtotal\n\n#XFLD: Title of the information area\nITEM_HEADER=Informaci\\u00F3n\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=Entrega el\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=Entrega requerida\n\n#XFLD: Info for Limit Item\nLIMIT=L\\u00EDmite\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=Producto\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=Categor\\u00EDa de producto\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=Servicio\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=Tipo de servicio\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=Proveedor\n\n#XFLD: Address data\nADDRESS=Direcci\\u00F3n\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=Categor\\u00EDa\n\n#XFLD: Title for the notes view\nNOTES=Notas\n\n#XFLD: Account Assignment percentage\nSHARE=Compartir\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=Art\\u00EDculos ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=Posici\\u00F3n\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=de\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=Cadena de aprobaciones\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=Hoy\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=Ayer\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo=Hace {0} d\\u00EDas\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=Transmitido por {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF=En nombre de {0}\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME=Substituto para {0}\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=Asignaciones de costes m\\u00FAltiples\n\n#XFLD: Title for the attachments view \nATTACHMENTS=Anexos\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=Art\\u00EDculos\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=Carrito aprobado\n\n#XFLD: Shopping Cart Rejected\nREJECTED=Carrito rechazado\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED={0} art\\u00EDculos aprobados, {1} art\\u00EDculos rechazados\n\n#XFLD: Shopping Cart Sent\nSENT=Carrito enviado\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=Carrito transmitido a {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=Aprobar el carro de la compra enviado por {0}?\n\n#XFLD: Shopping Cart Approve\nAPPROVE=Aprobar\n\n#XFLD: Shopping Cart Reject\nREJECT=Rechazar\n\n#XFLD: Ok\nOK=OK\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=Rechazar el carro de la compra enviado por {0}?\n\n#XFLD: Shopping Cart Decision\nDECISION=\\u00BFEnviar su decisi\\u00F3n sobre el carro de la compra enviado por {0}? \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=Art\\u00EDculos aprobados\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=Art\\u00EDculos rechazados\n\n#XFLD: Shopping Cart Send\nSEND=Enviar\n\n#XFLD: Shopping Cart Forward\nFORWARD=Transmitir\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=Consultar\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=Cadena de aprobaciones\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=Asignaci\\u00F3n de costes\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=Ilimitado\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=Art\\u00EDculo {0} de {1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=Direcci\\u00F3n de entrega\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} a {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=Actualmente no hay carritos disponibles\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=El sistema no puede procesar el carrito\n\n#YMSG: Error Message\nSEARCH_MESS=Introduce un nombre de usuario v\\u00E1lido\n\n#XFLD: Expected Value field label\nEXP_VALUE=Valor previsto\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=L\\u00EDmite de valor\n\n#XFLD: Cancel\nCANCEL=Cancelar\n\n#XFLD: Add Note (optional)\nADDNOTE=A\\u00F1adir nota (opcional)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_fr.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=Approbation de paniers\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Paniers ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Panier\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=Description\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=Imputation\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=Date de livraison\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0}\\u00A0ou plus tard\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=Compte g\\u00E9n\\u00E9ral\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=Quantit\\u00E9\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=Total interm\\u00E9diaire\n\n#XFLD: Title of the information area\nITEM_HEADER=Informations\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=Livraison le\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=Livraison requise le\n\n#XFLD: Info for Limit Item\nLIMIT=Limite\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=Produit\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=Cat\\u00E9gorie de produit\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=Service\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=Cat\\u00E9gorie de service\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=Fournisseur\n\n#XFLD: Address data\nADDRESS=Adresse\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=Cat\\u00E9gorie\n\n#XFLD: Title for the notes view\nNOTES=Notes\n\n#XFLD: Account Assignment percentage\nSHARE=Partager\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=Articles ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=Article\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=/\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=Cha\\u00EEne d\'approbation\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=Aujourd\'hui\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=Hier\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo=Il y a {0} jour(s).\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=Transf\\u00E9r\\u00E9 par {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF=Au nom de {0}\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME=Remplace {0}\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=Imputations multiples\n\n#XFLD: Title for the attachments view \nATTACHMENTS=Pi\\u00E8ces jointes\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=Articles\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=Panier approuv\\u00E9\n\n#XFLD: Shopping Cart Rejected\nREJECTED=Panier refus\\u00E9\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED={0} articles approuv\\u00E9s, {1} articles refus\\u00E9s\n\n#XFLD: Shopping Cart Sent\nSENT=Panier envoy\\u00E9\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=Panier transf\\u00E9r\\u00E9 \\u00E0 {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=Approuver le panier envoy\\u00E9 par {0}\\u00A0?\n\n#XFLD: Shopping Cart Approve\nAPPROVE=Approuver\n\n#XFLD: Shopping Cart Reject\nREJECT=Refuser\n\n#XFLD: Ok\nOK=OK\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=Rejeter le panier envoy\\u00E9 par {0}\\u00A0?\n\n#XFLD: Shopping Cart Decision\nDECISION=Envoyer votre d\\u00E9cision relative au panier envoy\\u00E9 par {0}\\u00A0? \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=Articles approuv\\u00E9s\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=Articles refus\\u00E9s\n\n#XFLD: Shopping Cart Send\nSEND=Envoyer\n\n#XFLD: Shopping Cart Forward\nFORWARD=Transf\\u00E9rer\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=Renseignements\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=Cha\\u00EEne d\'approbation\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=Imputation\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=Illimit\\u00E9\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=Article {0}\\u00A0/\\u00A0{1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=Adresse de livraison\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} au {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=Actuellement, aucun panier n\'est disponible.\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=Le syst\\u00E8me ne peut pas traiter le panier.\n\n#YMSG: Error Message\nSEARCH_MESS=Entrez un nom d\'utilisateur valide.\n\n#XFLD: Expected Value field label\nEXP_VALUE=Valeur attendue\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=Limite de valeur\n\n#XFLD: Cancel\nCANCEL=Annuler\n\n#XFLD: Add Note (optional)\nADDNOTE=Ajouter note (facultatif)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_hr.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=Odobri kupovna kolica\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Kupovna kolica ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Kupovna kolica\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=Opis\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=Dodjela konta\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=Datum isporuke\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0} ili kasniji\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=Konto glavne knjige\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=Koli\\u010Dina\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=Me\\u0111uzbroj\n\n#XFLD: Title of the information area\nITEM_HEADER=Informacije\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=Isporuka dana\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=Isporuka obavezna\n\n#XFLD: Info for Limit Item\nLIMIT=Ograni\\u010Denje\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=Proizvod\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=Kategorija proizvoda\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=Usluga\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=Kategorija usluge\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=Dobavlja\\u010D\n\n#XFLD: Address data\nADDRESS=Adresa\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=Kategorija\n\n#XFLD: Title for the notes view\nNOTES=Bilje\\u0161ke\n\n#XFLD: Account Assignment percentage\nSHARE=Udio\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=Stavke ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=Stavka\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=od\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=Lanac odobrenja\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=Danas\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=Ju\\u010Der\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo={0} dana prije\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=Proslijedio {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF=U ime {0}\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME=Zamjena za {0}\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=Vi\\u0161estruke dodjele konta\n\n#XFLD: Title for the attachments view \nATTACHMENTS=Prilozi\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=Stavke\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=Kupovna kolica odobrena\n\n#XFLD: Shopping Cart Rejected\nREJECTED=Kupovna kolica odbijena\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED={0} Stavke odobrene, {1} stavke odbijene\n\n#XFLD: Shopping Cart Sent\nSENT=Kupovna kolica poslana\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=Kupovna kolica proslije\\u0111ena {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=Odobriti kupovna kolica koja je poslao {0}?\n\n#XFLD: Shopping Cart Approve\nAPPROVE=Odobri\n\n#XFLD: Shopping Cart Reject\nREJECT=Odbij\n\n#XFLD: Ok\nOK=OK\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=Odbiti kupovna kolica koja je poslao {0}?\n\n#XFLD: Shopping Cart Decision\nDECISION=Poslati odluku o kupovnim kolicima koja je poslao {0}? \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=Odobrene stavke\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=Odbijene stavke\n\n#XFLD: Shopping Cart Send\nSEND=Po\\u0161alji\n\n#XFLD: Shopping Cart Forward\nFORWARD=Proslijedi\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=Upit\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=Lanac odobrenja\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=Dodjela konta\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=Neograni\\u010Deno\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=Stavka {0} od {1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=Adresa isporuke\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} do {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=Trenutno nema raspolo\\u017Eivih kupovnih kolica\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=Sustav ne mo\\u017Ee obraditi kupovna kolica\n\n#YMSG: Error Message\nSEARCH_MESS=Unesi va\\u017Ee\\u0107e korisni\\u010Dko ime\n\n#XFLD: Expected Value field label\nEXP_VALUE=O\\u010Dekivana vrijednost\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=Ograni\\u010Denje vrijednosti\n\n#XFLD: Cancel\nCANCEL=Otka\\u017Ei\n\n#XFLD: Add Note (optional)\nADDNOTE=Dodaj bilje\\u0161ku (izborno)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_hu.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=Bev\\u00E1s\\u00E1rl\\u00F3kosarak enged\\u00E9lyez\\u00E9se\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Bev\\u00E1s\\u00E1rl\\u00F3kosarak ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Bev\\u00E1s\\u00E1rl\\u00F3kos\\u00E1r\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=Le\\u00EDr\\u00E1s\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=Kont\\u00EDroz\\u00E1s\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=Sz\\u00E1ll\\u00EDt\\u00E1si d\\u00E1tum\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0} vagy k\\u00E9s\\u0151bbi\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=F\\u0151k\\u00F6nyvi sz\\u00E1mla\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=Mennyis\\u00E9g\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=R\\u00E9sz\\u00F6sszeg\n\n#XFLD: Title of the information area\nITEM_HEADER=Inform\\u00E1ci\\u00F3k\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=Sz\\u00E1ll\\u00EDt\\u00E1s d\\u00E1tuma\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=K\\u00E9rt sz\\u00E1ll\\u00EDt\\u00E1s\n\n#XFLD: Info for Limit Item\nLIMIT=Limit\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=Term\\u00E9k\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=Term\\u00E9kkateg\\u00F3ria\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=Szolg\\u00E1ltat\\u00E1s\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=Szolg\\u00E1ltat\\u00E1st\\u00EDpus\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=Sz\\u00E1ll\\u00EDt\\u00F3\n\n#XFLD: Address data\nADDRESS=C\\u00EDm\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=Kateg\\u00F3ria\n\n#XFLD: Title for the notes view\nNOTES=Megjegyz\\u00E9sek\n\n#XFLD: Account Assignment percentage\nSHARE=Sz\\u00E1zal\\u00E9k\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=T\\u00E9telek ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=T\\u00E9tel\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=/\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=Enged\\u00E9lyez\\u00E9si l\\u00E1nc\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=Ma\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=Tegnap\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo={0} napja\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY={0} tov\\u00E1bb\\u00EDtotta\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF={0} nev\\u00E9ben\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME={0} helyettes\\u00EDt\\u0151jek\\u00E9nt\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=T\\u00F6bb kont\\u00EDroz\\u00E1s\n\n#XFLD: Title for the attachments view \nATTACHMENTS=Mell\\u00E9kletek\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=T\\u00E9telek\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=Bev\\u00E1s\\u00E1rl\\u00F3kos\\u00E1r enged\\u00E9lyezve\n\n#XFLD: Shopping Cart Rejected\nREJECTED=Bev\\u00E1s\\u00E1rl\\u00F3kos\\u00E1r elutas\\u00EDtva\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED={0} j\\u00F3v\\u00E1hagyott t\\u00E9tel, {1} elutas\\u00EDtott t\\u00E9tel\n\n#XFLD: Shopping Cart Sent\nSENT=Bev\\u00E1s\\u00E1rl\\u00F3kos\\u00E1r elk\\u00FCldve\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=Bev\\u00E1s\\u00E1rl\\u00F3kos\\u00E1r tov\\u00E1bb\\u00EDtva\\: {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=Enged\\u00E9lyezi a k\\u00F6vetkez\\u0151 \\u00E1ltal bek\\u00FCld\\u00F6tt bev\\u00E1s\\u00E1rl\\u00F3kosarat\\: {0}?\n\n#XFLD: Shopping Cart Approve\nAPPROVE=Enged\\u00E9lyez\\u00E9s\n\n#XFLD: Shopping Cart Reject\nREJECT=Elutas\\u00EDt\\u00E1s\n\n#XFLD: Ok\nOK=OK\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=Elutas\\u00EDtja a k\\u00F6vetkez\\u0151 \\u00E1ltal bek\\u00FCld\\u00F6tt bev\\u00E1s\\u00E1rl\\u00F3kosarat\\: {0}?\n\n#XFLD: Shopping Cart Decision\nDECISION=Elk\\u00FCldi a k\\u00F6vetkez\\u0151 \\u00E1ltal bek\\u00FCld\\u00F6tt bev\\u00E1s\\u00E1rl\\u00F3kos\\u00E1rral kapcsolatos d\\u00F6nt\\u00E9s\\u00E9t\\: {0}? \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=Enged\\u00E9lyezett t\\u00E9telek\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=Elutas\\u00EDtott t\\u00E9telek\n\n#XFLD: Shopping Cart Send\nSEND=K\\u00FCld\\u00E9s\n\n#XFLD: Shopping Cart Forward\nFORWARD=\\u00C1tir\\u00E1ny\\u00EDt\\u00E1s\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=Lek\\u00E9rdez\\u00E9s\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=Enged\\u00E9lyez\\u00E9si l\\u00E1nc\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=Kont\\u00EDroz\\u00E1s\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=Korl\\u00E1tlan\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER={0}/{1} t\\u00E9tel \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=Sz\\u00E1ll\\u00EDt\\u00E1si c\\u00EDm\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} \\u2013 {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=Jelenleg nincsenek el\\u00E9rhet\\u0151 bev\\u00E1s\\u00E1rl\\u00F3kosarak\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=A rendszer nem tudja feldolgozni a bev\\u00E1s\\u00E1rl\\u00F3kosarat\n\n#YMSG: Error Message\nSEARCH_MESS=Adjon meg egy \\u00E9rv\\u00E9nyes felhaszn\\u00E1l\\u00F3nevet\n\n#XFLD: Expected Value field label\nEXP_VALUE=V\\u00E1rt \\u00E9rt\\u00E9k\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=\\u00C9rt\\u00E9khat\\u00E1r\n\n#XFLD: Cancel\nCANCEL=M\\u00E9gse\n\n#XFLD: Add Note (optional)\nADDNOTE=Jegyzet hozz\\u00E1ad\\u00E1sa (opcion\\u00E1lis)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_it.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=Approva carrelli acquisti\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Carrelli acquisti ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Carrello acquisti\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=Descrizione\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=Contabilizzazione\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=Data di consegna\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0}o successivamente\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=Conto Co.Ge.\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=Quantit\\u00E0\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=Totale parziale\n\n#XFLD: Title of the information area\nITEM_HEADER=Informazioni\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=Data di consegna\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=Consegna richiesta\n\n#XFLD: Info for Limit Item\nLIMIT=Limite\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=Prodotto\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=Categoria di prodotto\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=Servizio\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=Categoria servizio\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=Fornitore\n\n#XFLD: Address data\nADDRESS=Indirizzo\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=Categoria\n\n#XFLD: Title for the notes view\nNOTES=Note\n\n#XFLD: Account Assignment percentage\nSHARE=Percentuale\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=Posizioni ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=Posizione\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=di\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=Catena di approvazione\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=Oggi\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=Ieri\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo={0} giorni fa\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=Inoltrato da {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF=Per conto di {0}\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME=In sostituzione di {0}\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=Attribuzioni conto multiple\n\n#XFLD: Title for the attachments view \nATTACHMENTS=Allegati\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=Posizioni\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=Carrello acquisti approvato\n\n#XFLD: Shopping Cart Rejected\nREJECTED=Carrello acquisti rifiutato\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED={0} posizioni approvate, {1} posizioni rifiutate\n\n#XFLD: Shopping Cart Sent\nSENT=Carrello acquisti inviato\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=Carrello acquisti inoltrato a {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=Approvare il carrello acquisti inviato da {0}?\n\n#XFLD: Shopping Cart Approve\nAPPROVE=Approva\n\n#XFLD: Shopping Cart Reject\nREJECT=Rifiuta\n\n#XFLD: Ok\nOK=OK\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=Rifiutare il carrello acquisti inviato da {0}?\n\n#XFLD: Shopping Cart Decision\nDECISION=Inviare la decisione sul carrello acquisti presentato da {0}? \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=Posizioni approvate\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=Posizioni rifiutate\n\n#XFLD: Shopping Cart Send\nSEND=Invia\n\n#XFLD: Shopping Cart Forward\nFORWARD=Inoltra\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=Richiesta d\'informazioni\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=Catena di approvazione\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=Contabilizzazione\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=Illimitato\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=Posizione {0} di {1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=Indirizzo di consegna\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} a {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=Nessun carrello acquisti attualmente disponibile\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=Il sistema non pu\\u00F2 elaborare il carrello acquisti\n\n#YMSG: Error Message\nSEARCH_MESS=Inserire un nome utente valido\n\n#XFLD: Expected Value field label\nEXP_VALUE=Valore previsto\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=Limite valore\n\n#XFLD: Cancel\nCANCEL=Annulla\n\n#XFLD: Add Note (optional)\nADDNOTE=Aggiungi nota (facoltativo)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_iw.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=\\u05D0\\u05E9\\u05E8 \\u05E2\\u05D2\\u05DC\\u05D5\\u05EA \\u05E7\\u05E0\\u05D9\\u05D5\\u05EA\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=\\u05E2\\u05D2\\u05DC\\u05D5\\u05EA \\u05E7\\u05E0\\u05D9\\u05D5\\u05EA ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=\\u05E2\\u05D2\\u05DC\\u05EA \\u05E7\\u05E0\\u05D9\\u05D5\\u05EA\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=\\u05EA\\u05D9\\u05D0\\u05D5\\u05E8\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=\\u05D4\\u05E7\\u05E6\\u05D0\\u05EA \\u05D7\\u05E9\\u05D1\\u05D5\\u05DF\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=\\u05EA\\u05D0\\u05E8\\u05D9\\u05DA \\u05D0\\u05E1\\u05E4\\u05E7\\u05D4\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0} \\u05D0\\u05D5 \\u05DE\\u05D0\\u05D5\\u05D7\\u05E8 \\u05D9\\u05D5\\u05EA\\u05E8\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=\\u05D7\\u05E9\\u05D1\\u05D5\\u05DF \\u05E1\\u05E4\\u05E8 \\u05D7\\u05E9\\u05D1\\u05D5\\u05E0\\u05D5\\u05EA \\u05E8\\u05D0\\u05E9\\u05D9\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=\\u05DB\\u05DE\\u05D5\\u05EA\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=\\u05E1\\u05D9\\u05DB\\u05D5\\u05DD \\u05D1\\u05D9\\u05E0\\u05D9\\u05D9\\u05DD\n\n#XFLD: Title of the information area\nITEM_HEADER=\\u05DE\\u05D9\\u05D3\\u05E2\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=\\u05D0\\u05E1\\u05E4\\u05E7\\u05D4 \\u05D1\\u05EA\\u05D0\\u05E8\\u05D9\\u05DA\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=\\u05D0\\u05E1\\u05E4\\u05E7\\u05D4 \\u05E0\\u05D3\\u05E8\\u05E9\\u05EA\n\n#XFLD: Info for Limit Item\nLIMIT=\\u05D4\\u05D2\\u05D1\\u05DC\\u05D4\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=\\u05DE\\u05D5\\u05E6\\u05E8\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=\\u05E7\\u05D8\\u05D2\\u05D5\\u05E8\\u05D9\\u05D9\\u05EA \\u05DE\\u05D5\\u05E6\\u05E8\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=\\u05E9\\u05D9\\u05E8\\u05D5\\u05EA\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=\\u05E7\\u05D8\\u05D2\\u05D5\\u05E8\\u05D9\\u05D9\\u05EA \\u05E9\\u05D9\\u05E8\\u05D5\\u05EA\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=\\u05E1\\u05E4\\u05E7\n\n#XFLD: Address data\nADDRESS=\\u05DB\\u05EA\\u05D5\\u05D1\\u05EA\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=\\u05E7\\u05D8\\u05D2\\u05D5\\u05E8\\u05D9\\u05D4\n\n#XFLD: Title for the notes view\nNOTES=\\u05D4\\u05E2\\u05E8\\u05D5\\u05EA\n\n#XFLD: Account Assignment percentage\nSHARE=\\u05E9\\u05EA\\u05E3\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=\\u05E4\\u05E8\\u05D9\\u05D8\\u05D9\\u05DD ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=\\u05E4\\u05E8\\u05D9\\u05D8\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=\\u05DE\\u05EA\\u05D5\\u05DA\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=\\u05E9\\u05E8\\u05E9\\u05E8\\u05EA \\u05D0\\u05D9\\u05E9\\u05D5\\u05E8\\u05D9\\u05DD\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=\\u05D4\\u05D9\\u05D5\\u05DD\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=\\u05D0\\u05EA\\u05DE\\u05D5\\u05DC\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo=\\u05DC\\u05E4\\u05E0\\u05D9 {0} \\u05D9\\u05DE\\u05D9\\u05DD\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=\\u05D4\\u05D5\\u05E2\\u05D1\\u05E8 \\u05E2\\u05DC-\\u05D9\\u05D3\\u05D9 {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF=\\u05D1\\u05E9\\u05DD {0}\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME=\\u05DE\\u05D7\\u05DC\\u05D9\\u05E3 \\u05E2\\u05D1\\u05D5\\u05E8 {0}\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=\\u05D4\\u05E7\\u05E6\\u05D0\\u05D5\\u05EA \\u05D7\\u05E9\\u05D1\\u05D5\\u05DF \\u05DE\\u05E8\\u05D5\\u05D1\\u05D5\\u05EA\n\n#XFLD: Title for the attachments view \nATTACHMENTS=\\u05E7\\u05D1\\u05E6\\u05D9\\u05DD \\u05DE\\u05E6\\u05D5\\u05E8\\u05E4\\u05D9\\u05DD\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=\\u05E4\\u05E8\\u05D9\\u05D8\\u05D9\\u05DD\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=\\u05E2\\u05D2\\u05DC\\u05EA \\u05D4\\u05E7\\u05E0\\u05D9\\u05D5\\u05EA \\u05D0\\u05D5\\u05E9\\u05E8\\u05D4\n\n#XFLD: Shopping Cart Rejected\nREJECTED=\\u05E2\\u05D2\\u05DC\\u05EA \\u05D4\\u05E7\\u05E0\\u05D9\\u05D5\\u05EA \\u05E0\\u05D3\\u05D7\\u05EA\\u05D4\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED={0} \\u05E4\\u05E8\\u05D9\\u05D8\\u05D9\\u05DD \\u05D0\\u05D5\\u05E9\\u05E8\\u05D5, {1} \\u05E4\\u05E8\\u05D9\\u05D8\\u05D9\\u05DD \\u05E0\\u05D3\\u05D7\\u05D5\n\n#XFLD: Shopping Cart Sent\nSENT=\\u05E2\\u05D2\\u05DC\\u05EA \\u05D4\\u05E7\\u05E0\\u05D9\\u05D5\\u05EA \\u05E0\\u05E9\\u05DC\\u05D7\\u05D4\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=\\u05E2\\u05D2\\u05DC\\u05EA \\u05E7\\u05E0\\u05D9\\u05D5\\u05EA \\u05D4\\u05D5\\u05E2\\u05D1\\u05E8\\u05D4 \\u05D0\\u05DC {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=\\u05DC\\u05D0\\u05E9\\u05E8 \\u05D0\\u05EA \\u05E2\\u05D2\\u05DC\\u05EA \\u05D4\\u05E7\\u05E0\\u05D9\\u05D5\\u05EA \\u05E9\\u05E0\\u05E9\\u05DC\\u05D7\\u05D4 \\u05E2\\u05DC \\u05D9\\u05D3\\u05D9 {0}?\n\n#XFLD: Shopping Cart Approve\nAPPROVE=\\u05D0\\u05E9\\u05E8\n\n#XFLD: Shopping Cart Reject\nREJECT=\\u05D3\\u05D7\\u05D4\n\n#XFLD: Ok\nOK=OK\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=\\u05DC\\u05D3\\u05D7\\u05D5\\u05EA \\u05D0\\u05EA \\u05E2\\u05D2\\u05DC\\u05EA \\u05D4\\u05E7\\u05E0\\u05D9\\u05D5\\u05EA \\u05E9\\u05E0\\u05E9\\u05DC\\u05D7\\u05D4 \\u05E2\\u05DC \\u05D9\\u05D3\\u05D9 {0}?\n\n#XFLD: Shopping Cart Decision\nDECISION=\\u05DC\\u05E9\\u05DC\\u05D5\\u05D7 \\u05D0\\u05EA \\u05D4\\u05D4\\u05D7\\u05DC\\u05D8\\u05D4 \\u05E9\\u05DC\\u05DA \\u05D0\\u05D5\\u05D3\\u05D5\\u05EA \\u05E2\\u05D2\\u05DC\\u05EA \\u05D4\\u05E7\\u05E0\\u05D9\\u05D5\\u05EA \\u05E9\\u05E0\\u05E9\\u05DC\\u05D7\\u05D4 \\u05E2\\u05DC \\u05D9\\u05D3\\u05D9 {0}? \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=\\u05E4\\u05E8\\u05D9\\u05D8\\u05D9\\u05DD \\u05E9\\u05D0\\u05D5\\u05E9\\u05E8\\u05D5\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=\\u05E4\\u05E8\\u05D9\\u05D8\\u05D9\\u05DD \\u05E9\\u05E0\\u05D3\\u05D7\\u05D5\n\n#XFLD: Shopping Cart Send\nSEND=\\u05E9\\u05DC\\u05D7\n\n#XFLD: Shopping Cart Forward\nFORWARD=\\u05D4\\u05E2\\u05D1\\u05E8\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=\\u05D1\\u05E6\\u05E2 \\u05E9\\u05D0\\u05D9\\u05DC\\u05EA\\u05D4\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=\\u05E9\\u05E8\\u05E9\\u05E8\\u05EA \\u05D0\\u05D9\\u05E9\\u05D5\\u05E8\\u05D9\\u05DD\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=\\u05D4\\u05E7\\u05E6\\u05D0\\u05EA \\u05D7\\u05E9\\u05D1\\u05D5\\u05DF\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=\\u05D1\\u05DC\\u05EA\\u05D9 \\u05DE\\u05D5\\u05D2\\u05D1\\u05DC\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=\\u05E4\\u05E8\\u05D9\\u05D8 {0} \\u05DE\\u05EA\\u05D5\\u05DA {1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=\\u05DB\\u05EA\\u05D5\\u05D1\\u05EA \\u05DC\\u05D0\\u05E1\\u05E4\\u05E7\\u05D4\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} \\u05E2\\u05D3 {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=\\u05D0\\u05D9\\u05DF \\u05E2\\u05D2\\u05DC\\u05D5\\u05EA \\u05E7\\u05E0\\u05D9\\u05D5\\u05EA \\u05D6\\u05DE\\u05D9\\u05E0\\u05D5\\u05EA \\u05DB\\u05E8\\u05D2\\u05E2\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=\\u05D4\\u05DE\\u05E2\\u05E8\\u05DB\\u05EA \\u05DC\\u05D0 \\u05D9\\u05DB\\u05D5\\u05DC\\u05D4 \\u05DC\\u05E2\\u05D1\\u05D3 \\u05E2\\u05D2\\u05DC\\u05EA \\u05E7\\u05E0\\u05D9\\u05D5\\u05EA\n\n#YMSG: Error Message\nSEARCH_MESS=\\u05D4\\u05D6\\u05DF \\u05E9\\u05DD \\u05DE\\u05E9\\u05EA\\u05DE\\u05E9 \\u05D7\\u05D5\\u05E7\\u05D9\n\n#XFLD: Expected Value field label\nEXP_VALUE=\\u05E2\\u05E8\\u05DA \\u05E6\\u05E4\\u05D5\\u05D9\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=\\u05D4\\u05D2\\u05D1\\u05DC\\u05EA \\u05E2\\u05E8\\u05DA\n\n#XFLD: Cancel\nCANCEL=\\u05D1\\u05D8\\u05DC\n\n#XFLD: Add Note (optional)\nADDNOTE=\\u05D4\\u05D5\\u05E1\\u05E3 \\u05D4\\u05E2\\u05E8\\u05D4 (\\u05D0\\u05D5\\u05E4\\u05E6\\u05D9\\u05D5\\u05E0\\u05D0\\u05DC\\u05D9)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_ja.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=\\u30B7\\u30E7\\u30C3\\u30D4\\u30F3\\u30B0\\u30AB\\u30FC\\u30C8\\u627F\\u8A8D\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=\\u30B7\\u30E7\\u30C3\\u30D4\\u30F3\\u30B0\\u30AB\\u30FC\\u30C8 ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=\\u30B7\\u30E7\\u30C3\\u30D4\\u30F3\\u30B0\\u30AB\\u30FC\\u30C8\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=\\u30C6\\u30AD\\u30B9\\u30C8\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=\\u52D8\\u5B9A\\u8A2D\\u5B9A\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=\\u7D0D\\u5165\\u671F\\u65E5\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0} \\u4EE5\\u964D\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=G/L \\u52D8\\u5B9A\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=\\u6570\\u91CF\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=\\u5C0F\\u8A08\n\n#XFLD: Title of the information area\nITEM_HEADER=\\u60C5\\u5831\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=\\u7D0D\\u5165\\u671F\\u65E5\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=\\u7D0D\\u5165\\u5FC5\\u9808\n\n#XFLD: Info for Limit Item\nLIMIT=\\u5236\\u9650\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=\\u88FD\\u54C1\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=\\u88FD\\u54C1\\u30AB\\u30C6\\u30B4\\u30EA\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=\\u30B5\\u30FC\\u30D3\\u30B9\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=\\u30B5\\u30FC\\u30D3\\u30B9\\u30AB\\u30C6\\u30B4\\u30EA\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=\\u30B5\\u30D7\\u30E9\\u30A4\\u30E4\n\n#XFLD: Address data\nADDRESS=\\u30A2\\u30C9\\u30EC\\u30B9\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=\\u30AB\\u30C6\\u30B4\\u30EA\n\n#XFLD: Title for the notes view\nNOTES=\\u6CE8\\u8A18\n\n#XFLD: Account Assignment percentage\nSHARE=\\u30B7\\u30A7\\u30A2\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=\\u660E\\u7D30 ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=\\u30A2\\u30A4\\u30C6\\u30E0\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=/\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=\\u627F\\u8A8D\\u30C1\\u30A7\\u30FC\\u30F3\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=\\u672C\\u65E5\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=\\u6628\\u65E5\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo={0} \\u65E5\\u524D\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=\\u8EE2\\u9001\\u8005 {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF={0} \\u306E\\u4EE3\\u7406\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME={0} \\u306E\\u4EE3\\u884C\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=\\u8907\\u6570\\u306E\\u52D8\\u5B9A\\u8A2D\\u5B9A\n\n#XFLD: Title for the attachments view \nATTACHMENTS=\\u6DFB\\u4ED8\\u6587\\u66F8\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=\\u30A2\\u30A4\\u30C6\\u30E0\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=\\u627F\\u8A8D\\u6E08\\u30B7\\u30E7\\u30C3\\u30D4\\u30F3\\u30B0\\u30AB\\u30FC\\u30C8\n\n#XFLD: Shopping Cart Rejected\nREJECTED=\\u5374\\u4E0B\\u6E08\\u30B7\\u30E7\\u30C3\\u30D4\\u30F3\\u30B0\\u30AB\\u30FC\\u30C8\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED={0} \\u660E\\u7D30\\u627F\\u8A8D\\u6E08\\u3001{1} \\u660E\\u7D30\\u5374\\u4E0B\\u6E08\n\n#XFLD: Shopping Cart Sent\nSENT=\\u9001\\u4FE1\\u6E08\\u30B7\\u30E7\\u30C3\\u30D4\\u30F3\\u30B0\\u30AB\\u30FC\\u30C8\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=\\u30B7\\u30E7\\u30C3\\u30D4\\u30F3\\u30B0\\u30AB\\u30FC\\u30C8\\u304C {0} \\u306B\\u8EE2\\u9001\\u3055\\u308C\\u307E\\u3057\\u305F\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY={0} \\u304B\\u3089\\u9001\\u4FE1\\u3055\\u308C\\u305F\\u30B7\\u30E7\\u30C3\\u30D4\\u30F3\\u30B0\\u30AB\\u30FC\\u30C8\\u3092\\u627F\\u8A8D\\u3057\\u307E\\u3059\\u304B\\u3002\n\n#XFLD: Shopping Cart Approve\nAPPROVE=\\u627F\\u8A8D\n\n#XFLD: Shopping Cart Reject\nREJECT=\\u5374\\u4E0B\n\n#XFLD: Ok\nOK=OK\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY={0} \\u304B\\u3089\\u9001\\u4FE1\\u3055\\u308C\\u305F\\u30B7\\u30E7\\u30C3\\u30D4\\u30F3\\u30B0\\u30AB\\u30FC\\u30C8\\u3092\\u5374\\u4E0B\\u3057\\u307E\\u3059\\u304B\\u3002\n\n#XFLD: Shopping Cart Decision\nDECISION={0} \\u304B\\u3089\\u9001\\u4FE1\\u3055\\u308C\\u305F\\u30B7\\u30E7\\u30C3\\u30D4\\u30F3\\u30B0\\u30AB\\u30FC\\u30C8\\u306B\\u95A2\\u3059\\u308B\\u6C7A\\u5B9A\\u3092\\u9001\\u4FE1\\u3057\\u307E\\u3059\\u304B\\u3002 \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=\\u627F\\u8A8D\\u6E08\\u30A2\\u30A4\\u30C6\\u30E0\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=\\u5374\\u4E0B\\u6E08\\u30A2\\u30A4\\u30C6\\u30E0\n\n#XFLD: Shopping Cart Send\nSEND=\\u9001\\u4FE1\n\n#XFLD: Shopping Cart Forward\nFORWARD=\\u8EE2\\u9001\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=\\u554F\\u5408\\u305B\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=\\u627F\\u8A8D\\u30C1\\u30A7\\u30FC\\u30F3\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=\\u52D8\\u5B9A\\u8A2D\\u5B9A\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=\\u7121\\u5236\\u9650\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=\\u660E\\u7D30 {0}/{1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=\\u7D0D\\u5165\\u5148\\u4F4F\\u6240\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0}  -  {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=\\u73FE\\u5728\\u5229\\u7528\\u3067\\u304D\\u308B\\u30B7\\u30E7\\u30C3\\u30D4\\u30F3\\u30B0\\u30AB\\u30FC\\u30C8\\u304C\\u3042\\u308A\\u307E\\u305B\\u3093\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=\\u30B7\\u30E7\\u30C3\\u30D4\\u30F3\\u30B0\\u30AB\\u30FC\\u30C8\\u3092\\u51E6\\u7406\\u3067\\u304D\\u307E\\u305B\\u3093\n\n#YMSG: Error Message\nSEARCH_MESS=\\u6709\\u52B9\\u306A\\u30E6\\u30FC\\u30B6\\u540D\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\n\n#XFLD: Expected Value field label\nEXP_VALUE=\\u898B\\u8FBC\\u91D1\\u984D\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=\\u91D1\\u984D\\u5236\\u9650\n\n#XFLD: Cancel\nCANCEL=\\u4E2D\\u6B62\n\n#XFLD: Add Note (optional)\nADDNOTE=\\u6CE8\\u8A18\\u8FFD\\u52A0 (\\u30AA\\u30D7\\u30B7\\u30E7\\u30F3)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_nl.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=Winkelwagens goedkeuren\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Winkelwagens ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Winkelwagen\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=Omschrijving\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=Rubricering\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=Leveringsdatum\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0} of later\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=Grootboekrekening\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=Hoeveelheid\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=Subtotaal\n\n#XFLD: Title of the information area\nITEM_HEADER=Informatie\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=Levering op\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=Levering vereist\n\n#XFLD: Info for Limit Item\nLIMIT=Limiet\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=Product\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=Productcategorie\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=Service\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=Servicecategorie\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=Leverancier\n\n#XFLD: Address data\nADDRESS=Adres\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=Categorie\n\n#XFLD: Title for the notes view\nNOTES=Notities\n\n#XFLD: Account Assignment percentage\nSHARE=Aandeel\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=Artikelen ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=Positie\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=van\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=Goedkeuringsketen\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=Vandaag\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=Gisteren\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo={0} dagen geleden\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=Doorgestuurd door {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF=Namens {0}\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME=Vervanger van {0}\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=Meerdere rubriceringen\n\n#XFLD: Title for the attachments view \nATTACHMENTS=Bijlagen\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=Posities\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=Winkelwagen goedgekeurd\n\n#XFLD: Shopping Cart Rejected\nREJECTED=Winkelwagen afgewezen\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED={0} posities goedgekeurd, {1} posities afgekeurd\n\n#XFLD: Shopping Cart Sent\nSENT=Winkelwagen verzonden\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=Winkelwagen doorgestuurd naar {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=Winkelwagen goedkeuren die is verzonden door {0}?\n\n#XFLD: Shopping Cart Approve\nAPPROVE=Goedkeuren\n\n#XFLD: Shopping Cart Reject\nREJECT=Afwijzen\n\n#XFLD: Ok\nOK=OK\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=Winkelwagen afwijzen die is verzonden door {0}?\n\n#XFLD: Shopping Cart Decision\nDECISION=Uw beslissing verzenden over winkelwagen die is verzonden door {0}? \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=Goedgekeurde posities\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=Afgekeurde posities\n\n#XFLD: Shopping Cart Send\nSEND=Verzenden\n\n#XFLD: Shopping Cart Forward\nFORWARD=Doorverbinden\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=Aanvragen\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=Goedkeuringsketen\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=Rubricering\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=Onbeperkt\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=Artikel {0} van {1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=Leveringsadres\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} tot {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=Er zijn momenteel geen winkelwagens beschikbaar\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=Systeem kan winkelwagen niet verwerken\n\n#YMSG: Error Message\nSEARCH_MESS=Geef geldige gebruikersnaam op\n\n#XFLD: Expected Value field label\nEXP_VALUE=Verwachte waarde\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=Waardelimiet\n\n#XFLD: Cancel\nCANCEL=Annuleren\n\n#XFLD: Add Note (optional)\nADDNOTE=Notitie toevoegen (optioneel)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_no.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=Godkjenn handlekurver\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Handlekurver ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Handlekurv\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=Beskrivelse\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=Kontering\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=Leveringsdato\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0} eller senere\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=Artskonto\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=Kvantum\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=Delsum\n\n#XFLD: Title of the information area\nITEM_HEADER=Informasjon\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=Levering den\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=N\\u00F8dvendig den\n\n#XFLD: Info for Limit Item\nLIMIT=Grense\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=Produkt\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=Produktkategori\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=Tjeneste\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=Tjenestekategori\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=Leverand\\u00F8r\n\n#XFLD: Address data\nADDRESS=Adresse\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=Kategori\n\n#XFLD: Title for the notes view\nNOTES=Merknader\n\n#XFLD: Account Assignment percentage\nSHARE=Andel\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=Varer ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=Posisjon\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=av\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=Godkjenningskjede\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=I dag\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=I g\\u00E5r\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo={0} dager siden\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=Videresendt av {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF=P\\u00E5 vegne av {0}\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME=Stedfortreder for {0}\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=Flere konteringer\n\n#XFLD: Title for the attachments view \nATTACHMENTS=Vedlegg\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=Posisjoner\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=Handlekurv godkjent\n\n#XFLD: Shopping Cart Rejected\nREJECTED=Handlekurv avvist\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED={0} posisjoner godkjent, {1} posisjoner avvist\n\n#XFLD: Shopping Cart Sent\nSENT=Handlekurv sendt\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=Handlekurven er videresendt til {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=Godkjenne handlekurven sendt av {0}?\n\n#XFLD: Shopping Cart Approve\nAPPROVE=Godkjenn\n\n#XFLD: Shopping Cart Reject\nREJECT=Avvis\n\n#XFLD: Ok\nOK=OK\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=Avvise handlekurven sendt av {0}?\n\n#XFLD: Shopping Cart Decision\nDECISION=Sende beslutningen din om handlekurven sendt av {0}? \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=Godkjente varer\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=Avviste varer\n\n#XFLD: Shopping Cart Send\nSEND=Send\n\n#XFLD: Shopping Cart Forward\nFORWARD=Viderekoble\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=Sp\\u00F8rring\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=Godkjenningskjede\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=Kontering\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=Ubegrenset\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=Vare {0} av {1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=Leveringsadresse\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} til {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=Ingen handlekurver tilgjengelig akkurat n\\u00E5\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=Systemet kan ikke behandle handlekurv\n\n#YMSG: Error Message\nSEARCH_MESS=Oppgi et gyldig brukernavn\n\n#XFLD: Expected Value field label\nEXP_VALUE=Forventet verdi\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=Verdigrense\n\n#XFLD: Cancel\nCANCEL=Avbryt\n\n#XFLD: Add Note (optional)\nADDNOTE=Tilf\\u00F8y merknad (valgfri)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_pl.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=Zatwierdzanie koszyk\\u00F3w zakup\\u00F3w\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Koszyki zakup\\u00F3w ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Koszyk zakup\\u00F3w\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=Opis\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=Dekretacja\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=Data dostawy\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0} lub p\\u00F3\\u017Aniej\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=Konto KG\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=Ilo\\u015B\\u0107\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=Suma cz\\u0119\\u015Bciowa\n\n#XFLD: Title of the information area\nITEM_HEADER=Informacje\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=Dostawa dnia\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=Wymagana dostawa\n\n#XFLD: Info for Limit Item\nLIMIT=Limit\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=Produkt\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=Kategoria produktu\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=Us\\u0142uga\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=Kategoria us\\u0142ugi\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=Dostawca\n\n#XFLD: Address data\nADDRESS=Adres\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=Kategoria\n\n#XFLD: Title for the notes view\nNOTES=Notatki\n\n#XFLD: Account Assignment percentage\nSHARE=Udzia\\u0142\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=Pozycje ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=Pozycja\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=z\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=\\u0141a\\u0144cuch zatwierdze\\u0144\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=Dzisiaj\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=Wczoraj\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo={0} dni temu\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=Przekazane przez {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF=W imieniu {0}\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME=W zast\\u0119pstwie za {0}\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=Kilka dekretacji\n\n#XFLD: Title for the attachments view \nATTACHMENTS=Za\\u0142\\u0105czniki\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=Pozycje\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=Zatwierdzono koszyk zakup\\u00F3w\n\n#XFLD: Shopping Cart Rejected\nREJECTED=Odrzucono koszyk zakup\\u00F3w\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED=Pozycji zatwierdzonych\\: {0}, pozycji odrzuconych\\: {1}\n\n#XFLD: Shopping Cart Sent\nSENT=Wys\\u0142ano koszyk zakup\\u00F3w\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=Przekazano koszyk zakup\\u00F3w do {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=Zatwierdzi\\u0107 koszyk zakup\\u00F3w przes\\u0142any przez {0}?\n\n#XFLD: Shopping Cart Approve\nAPPROVE=Zatwierd\\u017A\n\n#XFLD: Shopping Cart Reject\nREJECT=Odrzu\\u0107\n\n#XFLD: Ok\nOK=OK\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=Odrzuci\\u0107 koszyk zakup\\u00F3w przes\\u0142any przez {0}?\n\n#XFLD: Shopping Cart Decision\nDECISION=Wys\\u0142a\\u0107 decyzj\\u0119 dot. koszyka zakup\\u00F3w przes\\u0142anego przez {0}? \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=Zatwierdzone pozycje\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=Odrzucone pozycje\n\n#XFLD: Shopping Cart Send\nSEND=Wy\\u015Blij\n\n#XFLD: Shopping Cart Forward\nFORWARD=Przeka\\u017C dalej\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=Zapytaj\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=\\u0141a\\u0144cuch zatwierdze\\u0144\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=Dekretacja\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=Nieograniczone\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=Pozycja {0} z {1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=Adres dostawy\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} do {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=Koszyki zakup\\u00F3w nie s\\u0105 obecnie dost\\u0119pne\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=System nie mo\\u017Ce przetworzy\\u0107 koszyka zakup\\u00F3w\n\n#YMSG: Error Message\nSEARCH_MESS=Wprowad\\u017A prawid\\u0142ow\\u0105 nazw\\u0119 u\\u017Cytkownika\n\n#XFLD: Expected Value field label\nEXP_VALUE=Warto\\u015B\\u0107 oczekiwana\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=Limit warto\\u015Bci\n\n#XFLD: Cancel\nCANCEL=Anuluj\n\n#XFLD: Add Note (optional)\nADDNOTE=Dodaj notatk\\u0119 (opcjonalne)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_pt.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=Aprovar carrinhos de compras\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Carrinhos de compras ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Carrinho de compras\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=Descri\\u00E7\\u00E3o\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=Classifica\\u00E7\\u00E3o cont\\u00E1bil\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=Data da transfer\\u00EAncia\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0} ou mais tarde\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=Conta do Raz\\u00E3o\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=Quantidade\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=Subtotal\n\n#XFLD: Title of the information area\nITEM_HEADER=Informa\\u00E7\\u00F5es\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=Entrega em\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=Necess\\u00E1rio para\n\n#XFLD: Info for Limit Item\nLIMIT=Limite\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=Produto\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=Categoria de produto\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=Servi\\u00E7o\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=Categoria de servi\\u00E7o\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=Fornecedor\n\n#XFLD: Address data\nADDRESS=Endere\\u00E7o\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=Categoria\n\n#XFLD: Title for the notes view\nNOTES=Notas\n\n#XFLD: Account Assignment percentage\nSHARE=Compartilhar\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=Itens ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=Item\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=de\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=Cadeia de aprova\\u00E7\\u00E3o\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=Hoje\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=Ontem\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo={0} dias atr\\u00E1s\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=Encaminhado por {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF=Em nome de {0}\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME=Substituindo por {0}\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=V\\u00E1rias classifica\\u00E7\\u00F5es cont\\u00E1beis\n\n#XFLD: Title for the attachments view \nATTACHMENTS=Anexos\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=Itens\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=Carrinho de compras aprovado\n\n#XFLD: Shopping Cart Rejected\nREJECTED=Carrinho de compras rejeitado\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED={0} itens aprovados, {1} itens rejeitados\n\n#XFLD: Shopping Cart Sent\nSENT=Carrinho de compras enviado\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=Carrinho de compras encaminhado a {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=Aprovar carrinho de compras enviado por {0}?\n\n#XFLD: Shopping Cart Approve\nAPPROVE=Aprovar\n\n#XFLD: Shopping Cart Reject\nREJECT=Rejeitar\n\n#XFLD: Ok\nOK=OK\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=Rejeitar carrinho de compras enviado por {0}?\n\n#XFLD: Shopping Cart Decision\nDECISION=Enviar sua decis\\u00E3o sobre carrinho de compras enviado por {0}? \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=Itens aprovados\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=Itens rejeitados\n\n#XFLD: Shopping Cart Send\nSEND=Enviar\n\n#XFLD: Shopping Cart Forward\nFORWARD=Encaminhar\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=Consultar\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=Cadeia de aprova\\u00E7\\u00E3o\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=Classifica\\u00E7\\u00E3o cont\\u00E1bil\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=Ilimitado\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=Item {0} de {1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=Endere\\u00E7o de entrega\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} a {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=Nenhum carrinho de compras dispon\\u00EDvel atualmente\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=O sistema n\\u00E3o pode processar o carrinho de compras\n\n#YMSG: Error Message\nSEARCH_MESS=Insira um nome de usu\\u00E1rio v\\u00E1lido\n\n#XFLD: Expected Value field label\nEXP_VALUE=Valor previsto\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=Limite de valor\n\n#XFLD: Cancel\nCANCEL=Cancelar\n\n#XFLD: Add Note (optional)\nADDNOTE=Adicionar nota (opcional)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_ro.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=Aprobare co\\u0219uri de cump\\u0103r\\u0103turi\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Co\\u0219uri de cump\\u0103r\\u0103turi ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Co\\u0219 de cump\\u0103r\\u0103turi\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=Descriere\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=Alocare cont\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=Dat\\u0103 livrare\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0} sau ulterior\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=Cont de CM\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=Cantitate\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=Subtotal\n\n#XFLD: Title of the information area\nITEM_HEADER=Informa\\u021Bii\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=Livrare pe\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=Livrare necesar\\u0103\n\n#XFLD: Info for Limit Item\nLIMIT=Limit\\u0103\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=Produs\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=Categorie produs\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=Serviciu\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=Categorie serviciu\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=Furnizor\n\n#XFLD: Address data\nADDRESS=Adres\\u0103\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=Categorie\n\n#XFLD: Title for the notes view\nNOTES=Note\n\n#XFLD: Account Assignment percentage\nSHARE=Partajare\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=Pozi\\u021Bii({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=Pozi\\u021Bie\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=din\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=Lan\\u021B de aprobare\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=Ast\\u0103zi\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=Ieri\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo=\\u00CEn urm\\u0103 cu {0} zile\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=Redirec\\u021Bionat de {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF=\\u00CEn numele {0}\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME=\\u00CEnlocuitor pt. {0}\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=Mai multe aloc\\u0103ri de cont\n\n#XFLD: Title for the attachments view \nATTACHMENTS=Anexe\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=Pozi\\u021Bii\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=Co\\u0219 de cump\\u0103r\\u0103turi aprobat\n\n#XFLD: Shopping Cart Rejected\nREJECTED=Co\\u0219 de cump\\u0103r\\u0103turi respins\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED={0} pozi\\u021Bii aprobate, {1} pozi\\u021Bii respinse\n\n#XFLD: Shopping Cart Sent\nSENT=Co\\u0219 de cump\\u0103r\\u0103turi expediat\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=Co\\u0219 de cump\\u0103r\\u0103turi redirec\\u021Bionat la {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=Aproba\\u021Bi co\\u0219ul de cump\\u0103r\\u0103turi transmis de {0}?\n\n#XFLD: Shopping Cart Approve\nAPPROVE=Aprobare\n\n#XFLD: Shopping Cart Reject\nREJECT=Respingere\n\n#XFLD: Ok\nOK=OK\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=Respinge\\u021Bi co\\u0219ul de cump\\u0103r\\u0103turi transmis de {0}?\n\n#XFLD: Shopping Cart Decision\nDECISION=Expedia\\u021Bi decizia dvs. pt. co\\u0219ul de cump\\u0103r\\u0103turi transmis de {0}? \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=Pozi\\u021Bii aprobate\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=Pozi\\u021Bii respinse\n\n#XFLD: Shopping Cart Send\nSEND=Expediere\n\n#XFLD: Shopping Cart Forward\nFORWARD=Redirec\\u021Bionare\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=Consultare\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=Lan\\u021B de aprobare\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=Alocare cont\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=Nelimitat\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=Pozi\\u021Bia {0} din {1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=Adres\\u0103 de livrare\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} la {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=Niciun co\\u0219 de cump\\u0103r\\u0103turi disponibil momentan\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=Sistemul nu poate prelucra co\\u0219ul de cump\\u0103r\\u0103turi\n\n#YMSG: Error Message\nSEARCH_MESS=Introduce\\u021Bi un nume de utilizator valabil\n\n#XFLD: Expected Value field label\nEXP_VALUE=Valoare prev\\u0103zut\\u0103\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=Limit\\u0103 valoare\n\n#XFLD: Cancel\nCANCEL=Anulare\n\n#XFLD: Add Note (optional)\nADDNOTE=Ad\\u0103ugare not\\u0103 (op\\u021Bional)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_ru.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=\\u0423\\u0442\\u0432\\u0435\\u0440\\u0436\\u0434\\u0435\\u043D\\u0438\\u0435 \\u043A\\u043E\\u0440\\u0437\\u0438\\u043D\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=\\u041A\\u043E\\u0440\\u0437\\u0438\\u043D\\u044B\\: ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=\\u041A\\u043E\\u0440\\u0437\\u0438\\u043D\\u0430\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=\\u041E\\u043F\\u0438\\u0441\\u0430\\u043D\\u0438\\u0435\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=\\u041A\\u043E\\u043D\\u0442\\u0438\\u0440\\u043E\\u0432\\u043A\\u0430\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=\\u0414\\u0430\\u0442\\u0430 \\u043F\\u043E\\u0441\\u0442\\u0430\\u0432\\u043A\\u0438\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0} \\u0438\\u043B\\u0438 \\u043F\\u043E\\u0437\\u0436\\u0435\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=\\u041E\\u0441\\u043D\\u043E\\u0432\\u043D\\u043E\\u0439 \\u0441\\u0447\\u0435\\u0442\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=\\u041A\\u043E\\u043B\\u0438\\u0447\\u0435\\u0441\\u0442\\u0432\\u043E\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=\\u041F\\u043E\\u0434\\u044B\\u0442\\u043E\\u0433\n\n#XFLD: Title of the information area\nITEM_HEADER=\\u0418\\u043D\\u0444\\u043E\\u0440\\u043C\\u0430\\u0446\\u0438\\u044F\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=\\u0414\\u0430\\u0442\\u0430 \\u043F\\u043E\\u0441\\u0442\\u0430\\u0432\\u043A\\u0438\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=\\u041F\\u043E\\u0441\\u0442\\u0430\\u0432\\u043A\\u0430 \\u0442\\u0440\\u0435\\u0431\\u0443\\u0435\\u0442\\u0441\\u044F\n\n#XFLD: Info for Limit Item\nLIMIT=\\u041B\\u0438\\u043C\\u0438\\u0442\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=\\u041F\\u0440\\u043E\\u0434\\u0443\\u043A\\u0442\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=\\u041A\\u0430\\u0442\\u0435\\u0433\\u043E\\u0440\\u0438\\u044F \\u043F\\u0440\\u043E\\u0434\\u0443\\u043A\\u0442\\u0430\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=\\u0421\\u0435\\u0440\\u0432\\u0438\\u0441\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=\\u041A\\u0430\\u0442\\u0435\\u0433\\u043E\\u0440\\u0438\\u044F \\u0441\\u0435\\u0440\\u0432\\u0438\\u0441\\u0430\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=\\u041F\\u043E\\u0441\\u0442\\u0430\\u0432\\u0449\\u0438\\u043A\n\n#XFLD: Address data\nADDRESS=\\u0410\\u0434\\u0440\\u0435\\u0441\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=\\u041A\\u0430\\u0442\\u0435\\u0433\\u043E\\u0440\\u0438\\u044F\n\n#XFLD: Title for the notes view\nNOTES=\\u041F\\u0440\\u0438\\u043C\\u0435\\u0447\\u0430\\u043D\\u0438\\u044F\n\n#XFLD: Account Assignment percentage\nSHARE=\\u0414\\u043E\\u043B\\u044F\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=\\u041F\\u043E\\u0437\\u0438\\u0446\\u0438\\u0438 ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=\\u041F\\u043E\\u0437\\u0438\\u0446\\u0438\\u044F\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=/\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=\\u0426\\u0435\\u043F\\u043E\\u0447\\u043A\\u0430 \\u0443\\u0442\\u0432\\u0435\\u0440\\u0436\\u0434\\u0435\\u043D\\u0438\\u044F\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=\\u0421\\u0435\\u0433\\u043E\\u0434\\u043D\\u044F\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=\\u0412\\u0447\\u0435\\u0440\\u0430\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo={0} \\u0434\\u043D. \\u043D\\u0430\\u0437\\u0430\\u0434\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=\\u041F\\u0435\\u0440\\u0435\\u0441\\u043B\\u0430\\u043B\\: {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF=\\u041E\\u0442 \\u0438\\u043C\\u0435\\u043D\\u0438 {0}\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME=\\u0417\\u0430\\u043C\\u0435\\u0449\\u0435\\u043D\\u0438\\u0435 \\u0434\\u043B\\u044F {0}\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=\\u041D\\u0435\\u0441\\u043A\\u043E\\u043B\\u044C\\u043A\\u043E \\u043A\\u043E\\u043D\\u0442\\u0438\\u0440\\u043E\\u0432\\u043E\\u043A\n\n#XFLD: Title for the attachments view \nATTACHMENTS=\\u0412\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u044F\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=\\u041F\\u043E\\u0437\\u0438\\u0446\\u0438\\u0438\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=\\u041A\\u043E\\u0440\\u0437\\u0438\\u043D\\u0430 \\u043F\\u043E\\u043A\\u0443\\u043F\\u043E\\u043A \\u0443\\u0442\\u0432\\u0435\\u0440\\u0436\\u0434\\u0435\\u043D\\u0430\n\n#XFLD: Shopping Cart Rejected\nREJECTED=\\u041A\\u043E\\u0440\\u0437\\u0438\\u043D\\u0430 \\u043F\\u043E\\u043A\\u0443\\u043F\\u043E\\u043A \\u043E\\u0442\\u043A\\u043B\\u043E\\u043D\\u0435\\u043D\\u0430\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED=\\u0423\\u0442\\u0432\\u0435\\u0440\\u0436\\u0434\\u0435\\u043D\\u043E \\u043F\\u043E\\u0437\\u0438\\u0446\\u0438\\u0439\\: {0}, \\u043E\\u0442\\u043A\\u043B\\u043E\\u043D\\u0435\\u043D\\u043E \\u043F\\u043E\\u0437\\u0438\\u0446\\u0438\\u0439\\: {1}\n\n#XFLD: Shopping Cart Sent\nSENT=\\u041A\\u043E\\u0440\\u0437\\u0438\\u043D\\u0430 \\u043F\\u043E\\u043A\\u0443\\u043F\\u043E\\u043A \\u043E\\u0442\\u043F\\u0440\\u0430\\u0432\\u043B\\u0435\\u043D\\u0430\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=\\u041A\\u043E\\u0440\\u0437\\u0438\\u043D\\u0430 \\u043F\\u0435\\u0440\\u0435\\u0430\\u0434\\u0440\\u0435\\u0441\\u043E\\u0432\\u0430\\u043D\\u0430 {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=\\u0423\\u0442\\u0432\\u0435\\u0440\\u0434\\u0438\\u0442\\u044C \\u043A\\u043E\\u0440\\u0437\\u0438\\u043D\\u0443, \\u043F\\u043E\\u043B\\u0443\\u0447\\u0435\\u043D\\u043D\\u0443\\u044E \\u043E\\u0442 {0}?\n\n#XFLD: Shopping Cart Approve\nAPPROVE=\\u0423\\u0442\\u0432\\u0435\\u0440\\u0434\\u0438\\u0442\\u044C\n\n#XFLD: Shopping Cart Reject\nREJECT=\\u041E\\u0442\\u043A\\u043B\\u043E\\u043D\\u0438\\u0442\\u044C\n\n#XFLD: Ok\nOK=\\u041E\\u041A\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=\\u041E\\u0442\\u043A\\u043B\\u043E\\u043D\\u0438\\u0442\\u044C \\u043A\\u043E\\u0440\\u0437\\u0438\\u043D\\u0443, \\u043F\\u043E\\u043B\\u0443\\u0447\\u0435\\u043D\\u043D\\u0443\\u044E \\u043E\\u0442 {0}?\n\n#XFLD: Shopping Cart Decision\nDECISION=\\u041E\\u0442\\u043F\\u0440\\u0430\\u0432\\u0438\\u0442\\u044C \\u0440\\u0435\\u0448\\u0435\\u043D\\u0438\\u0435 \\u043F\\u043E \\u043A\\u043E\\u0440\\u0437\\u0438\\u043D\\u0435, \\u043F\\u043E\\u043B\\u0443\\u0447\\u0435\\u043D\\u043D\\u043E\\u0439 \\u043E\\u0442 {0}? \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=\\u0423\\u0442\\u0432\\u0435\\u0440\\u0436\\u0434\\u0435\\u043D\\u043D\\u044B\\u0435 \\u043F\\u043E\\u0437\\u0438\\u0446\\u0438\\u0438\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=\\u041E\\u0442\\u043A\\u043B\\u043E\\u043D\\u0435\\u043D\\u043D\\u044B\\u0435 \\u043F\\u043E\\u0437\\u0438\\u0446\\u0438\\u0438\n\n#XFLD: Shopping Cart Send\nSEND=\\u041E\\u0442\\u043F\\u0440\\u0430\\u0432\\u0438\\u0442\\u044C\n\n#XFLD: Shopping Cart Forward\nFORWARD=\\u041F\\u0435\\u0440\\u0435\\u0430\\u0434\\u0440\\u0435\\u0441\\u043E\\u0432\\u0430\\u0442\\u044C\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=\\u041F\\u043E\\u0438\\u0441\\u043A\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=\\u0426\\u0435\\u043F\\u043E\\u0447\\u043A\\u0430 \\u0443\\u0442\\u0432\\u0435\\u0440\\u0436\\u0434\\u0435\\u043D\\u0438\\u044F\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=\\u041A\\u043E\\u043D\\u0442\\u0438\\u0440\\u043E\\u0432\\u043A\\u0430\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=\\u0411\\u0435\\u0437 \\u043E\\u0433\\u0440\\u0430\\u043D\\u0438\\u0447\\u0435\\u043D\\u0438\\u044F\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=\\u041F\\u043E\\u0437\\u0438\\u0446\\u0438\\u044F {0} \\u0438\\u0437 {1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=\\u0410\\u0434\\u0440\\u0435\\u0441 \\u043F\\u043E\\u0441\\u0442\\u0430\\u0432\\u043A\\u0438\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} \\u043F\\u043E {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=\\u041D\\u0435\\u0442 \\u0434\\u043E\\u0441\\u0442\\u0443\\u043F\\u043D\\u044B\\u0445 \\u043A\\u043E\\u0440\\u0437\\u0438\\u043D\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=\\u041A\\u043E\\u0440\\u0437\\u0438\\u043D\\u0430 \\u043F\\u043E\\u043A\\u0443\\u043F\\u043E\\u043A \\u043D\\u0435 \\u043C\\u043E\\u0436\\u0435\\u0442 \\u0431\\u044B\\u0442\\u044C \\u043E\\u0431\\u0440\\u0430\\u0431\\u043E\\u0442\\u0430\\u043D\\u0430 \\u0432 \\u0441\\u0438\\u0441\\u0442\\u0435\\u043C\\u0435\n\n#YMSG: Error Message\nSEARCH_MESS=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u043E\\u0435 \\u0438\\u043C\\u044F \\u043F\\u043E\\u043B\\u044C\\u0437\\u043E\\u0432\\u0430\\u0442\\u0435\\u043B\\u044F\n\n#XFLD: Expected Value field label\nEXP_VALUE=\\u041E\\u0436\\u0438\\u0434\\u0430\\u0435\\u043C\\u0430\\u044F \\u0441\\u0442\\u043E\\u0438\\u043C\\u043E\\u0441\\u0442\\u044C\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=\\u041B\\u0438\\u043C\\u0438\\u0442 \\u0441\\u0442\\u043E\\u0438\\u043C\\u043E\\u0441\\u0442\\u0438\n\n#XFLD: Cancel\nCANCEL=\\u041E\\u0442\\u043C\\u0435\\u043D\\u0438\\u0442\\u044C\n\n#XFLD: Add Note (optional)\nADDNOTE=\\u0414\\u043E\\u0431\\u0430\\u0432\\u0438\\u0442\\u044C \\u043F\\u0440\\u0438\\u043C\\u0435\\u0447\\u0430\\u043D\\u0438\\u0435 (\\u043E\\u043F\\u0446\\u0438\\u043E\\u043D\\u0430\\u043B\\u044C\\u043D\\u043E)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_sh.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=Odobri kolica za kupovinu\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Kolica za kupovinu ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Kolica za kupovinu\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=Opis\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=Dodela ra\\u010Duna\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=Datum isporuke\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0} ili kasnije\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=Ra\\u010Dun glavne knjige\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=Koli\\u010Dina\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=Me\\u0111uzbir\n\n#XFLD: Title of the information area\nITEM_HEADER=Informacije\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=Isporuka\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=Isporuka zahtevana\n\n#XFLD: Info for Limit Item\nLIMIT=Ograni\\u010Denje\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=Proizvod\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=Kategorija proizvoda\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=Usluga\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=Kategorija usluge\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=Dobavlja\\u010D\n\n#XFLD: Address data\nADDRESS=Adresa\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=Kategorija\n\n#XFLD: Title for the notes view\nNOTES=Bele\\u0161ke\n\n#XFLD: Account Assignment percentage\nSHARE=Podeli\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=Stavke ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=Stavka\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=od\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=Lanac odobrenja\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=Danas\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=Ju\\u010De\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo=Pre {0} dana\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=Prosledio {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF=U ime {0}\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME=Zamena za {0}\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=Vi\\u0161estruke dodele ra\\u010Duna\n\n#XFLD: Title for the attachments view \nATTACHMENTS=Dodaci\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=Stavke\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=Kolica za kupovinu odobrena\n\n#XFLD: Shopping Cart Rejected\nREJECTED=Kolica za kupovinu odbijena\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED={0} stavki odobreno, {1} stavki odbijeno\n\n#XFLD: Shopping Cart Sent\nSENT=Kolica za kupovinu poslata\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=Kolica za kupovinu prosle\\u0111ena {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=Odobriti kolica za kupovinu koja je podneo {0}?\n\n#XFLD: Shopping Cart Approve\nAPPROVE=Odobri\n\n#XFLD: Shopping Cart Reject\nREJECT=Odbij\n\n#XFLD: Ok\nOK=OK\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=Odbiti kolica za kupovinu koja je podneo {0}?\n\n#XFLD: Shopping Cart Decision\nDECISION=Poslati va\\u0161u odluku za kolica za kupovinu koja je podneo {0}? \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=Odobrene stavke\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=Odbijene stavke\n\n#XFLD: Shopping Cart Send\nSEND=Po\\u0161alji\n\n#XFLD: Shopping Cart Forward\nFORWARD=Prosledi\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=Postavi upit\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=Lanac odobrenja\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=Dodela ra\\u010Duna\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=Neograni\\u010Deno\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=Stavka {0} od {1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=Adresa isporuke\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} do {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=Kolica za kupovinu trenutno nisu dostupna\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=Sistem ne mo\\u017Ee da obradi kolica za kupovinu\n\n#YMSG: Error Message\nSEARCH_MESS=Unesite va\\u017Ee\\u0107e korisni\\u010Dko ime\n\n#XFLD: Expected Value field label\nEXP_VALUE=O\\u010Dekivana vrednost\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=Ograni\\u010Denje vrednosti\n\n#XFLD: Cancel\nCANCEL=Odustani\n\n#XFLD: Add Note (optional)\nADDNOTE=Dodaj bele\\u0161ku (izborno)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_sk.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=Schva\\u013Eovanie n\\u00E1kupn\\u00FDch ko\\u0161\\u00EDkov\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=N\\u00E1kupn\\u00E9 ko\\u0161\\u00EDky ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=N\\u00E1kupn\\u00FD ko\\u0161\\u00EDk\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=Popis\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=Priradenie \\u00FA\\u010Dtu\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=D\\u00E1tum dod\\u00E1vky\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0} alebo nesk\\u00F4r\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=\\u00DA\\u010Det hlavnej knihy\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=Mno\\u017Estvo\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=Medzis\\u00FA\\u010Det\n\n#XFLD: Title of the information area\nITEM_HEADER=Inform\\u00E1cie\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=D\\u00E1tum dodania\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=Po\\u017Eadovan\\u00E9 dodanie\n\n#XFLD: Info for Limit Item\nLIMIT=Limit\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=Produkt\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=Kateg\\u00F3ria produktu\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=Slu\\u017Eba\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=Kateg\\u00F3ria slu\\u017Eby\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=Dod\\u00E1vate\\u013E\n\n#XFLD: Address data\nADDRESS=Adresa\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=Kateg\\u00F3ria\n\n#XFLD: Title for the notes view\nNOTES=Pozn\\u00E1mky\n\n#XFLD: Account Assignment percentage\nSHARE=Zdie\\u013Ea\\u0165\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=Polo\\u017Eky ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=Polo\\u017Eka\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=z\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=Schva\\u013Eovac\\u00ED re\\u0165azec\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=Dnes\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=V\\u010Dera\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo=pred {0} d\\u0148ami\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=Odovzdal {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF=V mene {0}\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME=V zast\\u00FApen\\u00ED za {0}\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=Viacer\\u00E9 priradenia \\u00FA\\u010Dtu\n\n#XFLD: Title for the attachments view \nATTACHMENTS=Pr\\u00EDlohy\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=Polo\\u017Eky\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=N\\u00E1kupn\\u00FD ko\\u0161\\u00EDk schv\\u00E1len\\u00FD\n\n#XFLD: Shopping Cart Rejected\nREJECTED=N\\u00E1kupn\\u00FD ko\\u0161\\u00EDk zamietnut\\u00FD\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED={0} polo\\u017Eiek schv\\u00E1len\\u00FDch, {1} polo\\u017Eiek zamietnut\\u00FDch\n\n#XFLD: Shopping Cart Sent\nSENT=N\\u00E1kupn\\u00FD ko\\u0161\\u00EDk odoslan\\u00FD\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=N\\u00E1kupn\\u00FD ko\\u0161\\u00EDk bol odovzdan\\u00FD {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=Schv\\u00E1li\\u0165 n\\u00E1kupn\\u00FD ko\\u0161\\u00EDk odoslan\\u00FD {0}?\n\n#XFLD: Shopping Cart Approve\nAPPROVE=Schv\\u00E1li\\u0165\n\n#XFLD: Shopping Cart Reject\nREJECT=Zamietnu\\u0165\n\n#XFLD: Ok\nOK=OK\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=Zamietnu\\u0165 n\\u00E1kupn\\u00FD ko\\u0161\\u00EDk odoslan\\u00FD {0}?\n\n#XFLD: Shopping Cart Decision\nDECISION=Posla\\u0165 va\\u0161e rozhodnutie o n\\u00E1kupnom ko\\u0161\\u00EDku odoslan\\u00E9ho {0}? \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=Schv\\u00E1len\\u00E9 polo\\u017Eky\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=Zamietnut\\u00E9 polo\\u017Eky\n\n#XFLD: Shopping Cart Send\nSEND=Odosla\\u0165\n\n#XFLD: Shopping Cart Forward\nFORWARD=Odovzda\\u0165\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=Zisti\\u0165\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=Schva\\u013Eovac\\u00ED re\\u0165azec\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=Priradenie \\u00FA\\u010Dtu\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=Neobmedzen\\u00E9\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=Polo\\u017Eka {0} z {1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=Dodacia adresa\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} do {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=Moment\\u00E1lne nie s\\u00FA k dispoz\\u00EDcii \\u017Eiadne n\\u00E1kupn\\u00E9 ko\\u0161\\u00EDky\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=Syst\\u00E9m nem\\u00F4\\u017Ee spracova\\u0165 n\\u00E1kupn\\u00FD ko\\u0161\\u00EDk\n\n#YMSG: Error Message\nSEARCH_MESS=Zadajte platn\\u00E9 meno pou\\u017E\\u00EDvate\\u013Ea\n\n#XFLD: Expected Value field label\nEXP_VALUE=O\\u010Dak\\u00E1van\\u00E1 hodnota\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=Limit hodnoty\n\n#XFLD: Cancel\nCANCEL=Zru\\u0161i\\u0165\n\n#XFLD: Add Note (optional)\nADDNOTE=Prida\\u0165 pozn\\u00E1mku (volite\\u013En\\u00E9)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_sl.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=Odobritev nakupovalnih ko\\u0161aric\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Nakupovalni vozi\\u010Dki ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Nakupovalna ko\\u0161arica\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=Opis\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=Kontiranje\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=Datum dobave\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0} ali kasneje\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=Konto glavne knjige\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=Koli\\u010Dina\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=Vmesna vsota\n\n#XFLD: Title of the information area\nITEM_HEADER=Informacije\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=Dobava dne\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=Dobava zahtevana\n\n#XFLD: Info for Limit Item\nLIMIT=Meja\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=Proizvod\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=Kategorija proizvoda\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=Storitev\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=Kategorija storitve\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=Dobavitelj\n\n#XFLD: Address data\nADDRESS=Naslov\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=Kategorija\n\n#XFLD: Title for the notes view\nNOTES=Zabele\\u017Eke\n\n#XFLD: Account Assignment percentage\nSHARE=Dele\\u017E\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=Postavke ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=Postavka\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=Od\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=Veriga odobritev\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=Danes\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=V\\u010Deraj\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo=Pred {0} dnevi\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=Posredoval {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF=V imenu {0}\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME=Nadome\\u0161\\u010Da za {0}\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=Ve\\u010Dkratno kontiranje\n\n#XFLD: Title for the attachments view \nATTACHMENTS=Priloge\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=Postavke\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=Nakupovalna ko\\u0161arica odobrena\n\n#XFLD: Shopping Cart Rejected\nREJECTED=Nakupovalna ko\\u0161arica zavrnjena\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED={0} postavk odobrenih, {1} postavk zavrnjenih\n\n#XFLD: Shopping Cart Sent\nSENT=Nakupovalna ko\\u0161arica poslana\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=Nakupovalni vozi\\u010Dek posredovan {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=\\u017Delite odobriti nakupovalni vozi\\u010Dek, ki ga je poslal {0}?\n\n#XFLD: Shopping Cart Approve\nAPPROVE=Odobritev\n\n#XFLD: Shopping Cart Reject\nREJECT=Zavrnitev\n\n#XFLD: Ok\nOK=OK\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=\\u017Delite zavrniti nakupovalni vozi\\u010Dek, ki ga je poslal {0}?\n\n#XFLD: Shopping Cart Decision\nDECISION=\\u017Delite poslati svojo odlo\\u010Ditev o nakupovalnem vozi\\u010Dku, ki ga je poslal {0}? \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=Odobrene postavke\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=Zavrnjene postavke\n\n#XFLD: Shopping Cart Send\nSEND=Po\\u0161iljanje\n\n#XFLD: Shopping Cart Forward\nFORWARD=Posredovanje\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=Poizvedovanje\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=Veriga odobritev\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=Kontiranje\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=Neomejeno\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=Postavka {0} od {1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=Naslov dostave\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} do {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=Nakupovalne ko\\u0161arice trenutno niso na voljo\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=Sistem ne more procesirati nakupovalne ko\\u0161arice\n\n#YMSG: Error Message\nSEARCH_MESS=Vnesite veljavno uporabni\\u0161ko ime\n\n#XFLD: Expected Value field label\nEXP_VALUE=Pri\\u010Dakovana vrednost\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=Mejna vrednost\n\n#XFLD: Cancel\nCANCEL=Preklic\n\n#XFLD: Add Note (optional)\nADDNOTE=Dodajanje zabele\\u017Eke (izbirno)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_tr.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=Al\\u0131\\u015Fveri\\u015F sepetlerini onayla\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Al\\u0131\\u015Fveri\\u015F sepetleri ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Al\\u0131\\u015Fveri\\u015F sepeti\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=Tan\\u0131m\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=Hesap tayini\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=Teslimat tarihi\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0}veya daha ge\\u00E7\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=DK hesab\\u0131\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=Miktar\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=Alt toplam\n\n#XFLD: Title of the information area\nITEM_HEADER=Bilgi\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=Teslimat tarihi\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=Teslimat gerekli\n\n#XFLD: Info for Limit Item\nLIMIT=S\\u0131n\\u0131r\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=\\u00DCr\\u00FCn\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=\\u00DCr\\u00FCn kategorisi\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=Hizmet\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=Hizmet kategorisi\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=Tedarik\\u00E7i\n\n#XFLD: Address data\nADDRESS=Adres\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=Kategori\n\n#XFLD: Title for the notes view\nNOTES=Notlar\n\n#XFLD: Account Assignment percentage\nSHARE=Oran\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=Kalemler ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=Kalem\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=/\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=Onay zinciri\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=Bug\\u00FCn\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=D\\u00FCn\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo={0} g\\u00FCn \\u00F6nce\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=\\u0130leten {0}\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF={0} ad\\u0131na\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME={0} i\\u00E7in ikame\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=\\u00C7oklu hesap tayinleri\n\n#XFLD: Title for the attachments view \nATTACHMENTS=Ekler\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=Kalem\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=Al\\u0131\\u015Fveri\\u015F sepeti onayland\\u0131\n\n#XFLD: Shopping Cart Rejected\nREJECTED=Al\\u0131\\u015Fveri\\u015F sepeti reddedildi\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED={0} \\u00F6\\u011Fe onayland\\u0131, {1} \\u00F6\\u011Fe kaydedildi\n\n#XFLD: Shopping Cart Sent\nSENT=Al\\u0131\\u015Fveri\\u015F sepeti g\\u00F6nderildi\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=Al\\u0131\\u015Fveri\\u015F sepeti iletildi. Al\\u0131c\\u0131\\: {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY={0} taraf\\u0131ndan g\\u00F6nderilen al\\u0131\\u015Fveri\\u015F sepeti onaylans\\u0131n m\\u0131?\n\n#XFLD: Shopping Cart Approve\nAPPROVE=Onayla\n\n#XFLD: Shopping Cart Reject\nREJECT=Reddet\n\n#XFLD: Ok\nOK=Tamam\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY={0} taraf\\u0131ndan g\\u00F6nderilen al\\u0131\\u015Fveri\\u015F sepeti reddedilsin mi?\n\n#XFLD: Shopping Cart Decision\nDECISION={0} taraf\\u0131ndan g\\u00F6nderilen al\\u0131\\u015Fveri\\u015F sepetindeki karar\\u0131n\\u0131z g\\u00F6nderilsin mi? \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=Onaylanan kalemler\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=Reddedilen kalemler\n\n#XFLD: Shopping Cart Send\nSEND=G\\u00F6nder\n\n#XFLD: Shopping Cart Forward\nFORWARD=\\u0130let\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=Sorgu\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=Onay zinciri\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=Hesap tayini\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=S\\u0131n\\u0131rs\\u0131z\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=Kalem {0} / {1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=Teslimat adresi\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} Biti\\u015F {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=\\u015Eu anda kullan\\u0131labilir al\\u0131\\u015Fveri\\u015F sepeti yok\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=Sistem al\\u0131\\u015Fveri\\u015F sepetini i\\u015Fleyemiyor\n\n#YMSG: Error Message\nSEARCH_MESS=Ge\\u00E7erli kullan\\u0131c\\u0131 ad\\u0131 gir\n\n#XFLD: Expected Value field label\nEXP_VALUE=Beklenen de\\u011Fer\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=De\\u011Fer limiti\n\n#XFLD: Cancel\nCANCEL=\\u0130ptal\n\n#XFLD: Add Note (optional)\nADDNOTE=Not ekle (iste\\u011Fe ba\\u011Fl\\u0131)\n',
	"ui/s2p/srm/sc/approve/i18n/i18n_zh_CN.properties":'\n\n\n\n#XFLD, 30: Application Name\nDISPLAY_NAME_APPROVE=\\u5BA1\\u6279\\u8D2D\\u7269\\u8F66\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=\\u8D2D\\u7269\\u8F66 ({0}) \n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=\\u8D2D\\u7269\\u8F66\n\n#XFLD: SCA S3 Description of a shopping cart item\nDESCRIPTION=\\u63CF\\u8FF0\n\n#XFLD: Information how this shopping cart (item) is handled in accounting (e.g. Cost Center, Profit Center, GL Account, ...)\nACC_AS=\\u79D1\\u76EE\\u5206\\u914D\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_DATE=\\u4EA4\\u8D27\\u65E5\\u671F\n\n#XFLD: Information that the shopping cart items have different delivery dates/periods of performance (e.g. 16.07.2013 and later)\nDELIVERY_ALSO_LATER={0} \\u6216\\u66F4\\u665A\n\n#XFLD: SCA S9 Label as title for the G/L Account in the account view\nGL_ACC=\\u603B\\u8D26\\u79D1\\u76EE\n\n#XTIT: SCA S3 Item List Label Quantity\nQUANTITY_LBL=\\u6570\\u91CF\n\n#XFLD: Column Header for Item Price\nSUB_TOTAL_HEADER=\\u5C0F\\u8BA1\n\n#XFLD: Title of the information area\nITEM_HEADER=\\u4FE1\\u606F\n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ON=\\u4EA4\\u8D27\\u65E5\\u671F\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required\nDELIVERY_REQUIRED=\\u8981\\u6C42\\u7684\\u4EA4\\u8D27\\u65E5\\u671F\n\n#XFLD: Info for Limit Item\nLIMIT=\\u9650\\u5236\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType === \'03\'\nPRODUCT_NAME=\\u4EA7\\u54C1\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType != \'03\'\nPRODUCT_CATEGORY=\\u4EA7\\u54C1\\u7C7B\\u522B\n\n#XFLD: SCA S9 Label as title for the product information in the information view where ItemType == \'03\'\nSERVICE_NAME=\\u670D\\u52A1\n\n#XFLD: SCA S9 Check if title for the product information in the information view where ItemType == \'03\'\nSERVICE_CATEGORY=\\u670D\\u52A1\\u7C7B\\u522B\n\n#XFLD: SCA S9 Label as title for the vendor in the information view\nSUPPLIER=\\u4F9B\\u5E94\\u5546\n\n#XFLD: Address data\nADDRESS=\\u5730\\u5740\n\n#XFLD: SCA S9 Label as title for the product category in the information view\nCATEGORY=\\u7C7B\\u522B\n\n#XFLD: Title for the notes view\nNOTES=\\u5907\\u6CE8\n\n#XFLD: Account Assignment percentage\nSHARE=\\u4EFD\\u989D\n\n#XFLD: Number of items contained in the shopping cart (more than one)\nITEMS_QTY_EX=\\u9879\\u76EE ({0}) \n\n#XFLD: Number of items contained in the shopping cart (only one)\nITEM=\\u9879\\u76EE\n\n#XTIT: Of used in Title for the screen that shows one item of a shopping cart (e.g. Item 1 of 4)\nOF=/\n\n#XFLD: Title for the approval view \nAPPROVAL_HEADER=\\u5BA1\\u6279\\u94FE\n\n#YMSG: Time when sth. (e.g. a leave) was created today\nDateTimeFormatter.Today=\\u4ECA\\u5929\n\n#YMSG: Time when sth. (e.g. a leave) was created yesterday\nDateTimeFormatter.Yesterday=\\u6628\\u5929\n\n#YMSG: Time when sth. (e.g. a leave) was created x days ago (Plural; e.g. 2 days ago\nDateTimeFormatter.DaysAgo={0} \\u5929\\u524D\n\n#XFLD, 40: Name of the person that forwarded the shopping cart\nFORWARDEDBY=\\u7531 {0} \\u8F6C\\u53D1\n\n#XFLD, 40: Name of the person for that this shopping cart was created\nONBEHALFOF=\\u4EE3\\u8D2D\\u5BF9\\u8C61\\uFF1A{0}\n\n#XFLD, 40: Name of the person that normally does the shopping cart approval\nSUBSTITUTINGFORNAME=\\u66FF\\u4EE3 {0}\n\n#XFLD: Text Value for Multiple Account Assignments\nMULTIPLE_ACC_ASSIGNMENTS=\\u591A\\u4E2A\\u79D1\\u76EE\\u5206\\u914D\n\n#XFLD: Title for the attachments view \nATTACHMENTS=\\u9644\\u4EF6\n\n#XFLD: Number of items approved or rejected \nSHOPPING_CART_ITEMS=\\u9879\\u76EE\n\n#XFLD: Text value One\nONE=1\n\n#XFLD: Shopping Cart Approved\nAPPROVED=\\u5DF2\\u6279\\u51C6\\u8D2D\\u7269\\u8F66\n\n#XFLD: Shopping Cart Rejected\nREJECTED=\\u5DF2\\u62D2\\u7EDD\\u8D2D\\u7269\\u8F66\n\n#XFLD: Shopping Cart partially approved\nPARTAPPROVED=\\u5DF2\\u6279\\u51C6 {0} \\u4E2A\\u9879\\u76EE\\uFF0C\\u5DF2\\u62D2\\u7EDD {1} \\u4E2A\\u9879\\u76EE\n\n#XFLD: Shopping Cart Sent\nSENT=\\u5DF2\\u53D1\\u9001\\u8D2D\\u7269\\u8F66\n\n#XFLD: Shopping Cart Forwarded\nFORWARDED=\\u5DF2\\u5C06\\u8D2D\\u7269\\u8F66\\u8F6C\\u53D1\\u7ED9 {0}\n\n#XFLD: Shopping Cart Approve cart by person\nAPPROVESC_BY=\\u662F\\u5426\\u6279\\u51C6\\u7531 {0} \\u63D0\\u4EA4\\u7684\\u8D2D\\u7269\\u8F66\\uFF1F\n\n#XFLD: Shopping Cart Approve\nAPPROVE=\\u6279\\u51C6\n\n#XFLD: Shopping Cart Reject\nREJECT=\\u62D2\\u7EDD\n\n#XFLD: Ok\nOK=\\u786E\\u5B9A\n\n#XFLD: Shopping Cart Approve by person\nREJECTSC_BY=\\u662F\\u5426\\u62D2\\u7EDD\\u7531 {0} \\u63D0\\u4EA4\\u7684\\u8D2D\\u7269\\u8F66\\uFF1F\n\n#XFLD: Shopping Cart Decision\nDECISION=\\u662F\\u5426\\u53D1\\u9001\\u60A8\\u5BF9 {0} \\u6240\\u63D0\\u4EA4\\u8D2D\\u7269\\u8F66\\u7684\\u51B3\\u7B56\\uFF1F \n\n#XFLD: Shopping Cart Approved Items\nAPPROVED_ITEMS=\\u6279\\u51C6\\u7684\\u9879\\u76EE\n\n#XFLD: Shopping Cart Rejected Items\nREJECTED_ITEMS=\\u62D2\\u7EDD\\u7684\\u9879\\u76EE\n\n#XFLD: Shopping Cart Send\nSEND=\\u53D1\\u9001\n\n#XFLD: Shopping Cart Forward\nFORWARD=\\u8F6C\\u53D1\n\n#XFLD: Shopping Cart Inquire\nINQUIRE=\\u67E5\\u8BE2\n\n# XFLD: Title for the approval view\nAPPR_CHAIN=\\u5BA1\\u6279\\u94FE\n\n#XFLD: Account Assignment field label\nACCOUNT_ASSIGNMENT=\\u79D1\\u76EE\\u5206\\u914D\n\n#XFLD: Property of a limit item in a shopping cart\nUNLIMITED=\\u65E0\\u9650\\u5236\n\n#XFLD, 20: Header for current item \nITEM_DETAIL_HEADER=\\u9879\\u76EE {0}/{1} \n\n#XFLD: Date when the shopping cart item will be delivered\nDELIVERY_ADDRESS=\\u4EA4\\u8D27\\u5730\\u5740\n\n#XFLD: Date or periods of performance when the shopping cart item (service or limit item) is required.\nFROM_TO_DELIVERY={0} \\u5230 {1}\n\n#XFLD: Shopping Cart Approved\nVIEW_MESSGE=\\u5F53\\u524D\\u65E0\\u53EF\\u7528\\u8D2D\\u7269\\u8F66\n\n#XFLD: Parameter for Service call\n#QUESTION_MARK=?\n\n#YMSG: Error Message\nERROR_MESS=\\u7CFB\\u7EDF\\u65E0\\u6CD5\\u5904\\u7406\\u8D2D\\u7269\\u8F66\n\n#YMSG: Error Message\nSEARCH_MESS=\\u8F93\\u5165\\u6709\\u6548\\u7528\\u6237\\u540D\n\n#XFLD: Expected Value field label\nEXP_VALUE=\\u9884\\u671F\\u503C\n\n#XFLD: Limit Vlaue field label\nVALUE_LIMIT=\\u503C\\u9650\\u5236\n\n#XFLD: Cancel\nCANCEL=\\u53D6\\u6D88\n\n#XFLD: Add Note (optional)\nADDNOTE=\\u6DFB\\u52A0\\u6CE8\\u91CA\\uFF08\\u53EF\\u9009\\uFF09\n',
	"ui/s2p/srm/sc/approve/util/Formatter.js":function(){/*
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
},
	"ui/s2p/srm/sc/approve/util/ItemList.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("ui.s2p.srm.sc.approve.util.ItemList");

ui.s2p.srm.sc.approve.util.ItemList = {};

/*
 * We use this Utility object to keep track of the items in the Shopping Cart
 * The items collection can be retrieved in the ItemDetail screen and helps
 * navigating to previous or next items when the Up/Down navigation buttons
 * are clicked. 
 */
ui.s2p.srm.sc.approve.util.ItemList.item = (function() {
	var items = [];
	return {
		//Added scnumber, itemnumber for fiori performance improvement
		add : function(itemList) {
			this.clear();
			for(var i = 0; i < itemList.length; i++){
				items.push({
					item : itemList[i].WorkitemID,
					index : i,
					scnumber : itemList[i].ScNumber,
					itemnumber : itemList[i].ItemNumber
				});
			}			
		},
		

		each : function(callback) {
			for ( var i = 0; i < items.length; i++) {
				callback(items[i].item);
			}
		},

		length : function() {
			return items.length;
		},

		clear: function(){
			items = [];
		},
		
		getIndex : function(index) {
			return index;
		},
		
		getItemAtIndex: function(index){
			return items[index].item;
		},
		getWorkItemId: function(index){
			return items[index].item;
		},
		getSCNumber: function(index){
			return items[index].scnumber;
		},
		getSCItemNumber: function(index){
			return items[index].itemnumber;
		}
	};
})();
},
	"ui/s2p/srm/sc/approve/util/ObjectCache.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("ui.s2p.srm.sc.approve.util.ObjectCache");


/**
 * ObjectCache stores pairs of key value maps for a given page identified by a unique id. 
 * The current implementation only stores key value pairs for a single id. 
 */
ui.s2p.srm.sc.approve.util.ObjectCache = function(){
	this._id 		  = null;
	this._length      = 0;
	this._keyValueMap = {};
};

/**
 * Determines if the cache is empty
 * @public
 * @return Boolean true/false 
 */
ui.s2p.srm.sc.approve.util.ObjectCache.prototype.isEmpty = function(){
	return ( this._length === 0 );
};

/**
 * Clears a cache
 * @public 
 */
ui.s2p.srm.sc.approve.util.ObjectCache.prototype.clear = function(){
	this._keyValueMap = {};
	this._length = 0;
};

/**
 * Get unique identifier for the key map values
 * @public
 * @param id - unique identifier 
 */
ui.s2p.srm.sc.approve.util.ObjectCache.prototype.setId = function(id){
	this._id = id;
};

/**
 * Retrieves the unique identifier for the cache
 * @public 
 * @return id - unique identifier for the cache
 */
ui.s2p.srm.sc.approve.util.ObjectCache.prototype.getId = function(){
	return this._id;
};

/**
 * Set a value in the key map
 * @public
 * @param key   - string key for which value needs to be persisted
 * @param value - value for the key
 */
ui.s2p.srm.sc.approve.util.ObjectCache.prototype.setKey = function(key,value){
	if(!this._keyValueMap.hasOwnProperty(key)){
		this._length++;
	}
	this._keyValueMap[key] = value;
};

/**
 * Retrieve a value against a key
 * @public
 * @param key - string key for which value needs to be returned 
 */
ui.s2p.srm.sc.approve.util.ObjectCache.prototype.getValue = function(key){
	if(!this._keyValueMap.hasOwnProperty(key)){
		return undefined;
	}
	return this._keyValueMap[key];
};

(function(){
	var instance = new ui.s2p.srm.sc.approve.util.ObjectCache();
	
	ui.s2p.srm.sc.approve.util.ObjectCache.getInstance = function(){
		return instance;
	};
}());
},
	"ui/s2p/srm/sc/approve/view/S2.controller.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ca.scfld.md.controller.ScfldMasterController");
jQuery.sap.require("ui.s2p.srm.sc.approve.util.Formatter");

sap.ca.scfld.md.controller.ScfldMasterController.extend("ui.s2p.srm.sc.approve.view.S2", {

	onInit: function() {
		// execute the onInit for the base class ScfldMasterController
		sap.ca.scfld.md.controller.ScfldMasterController.prototype.onInit.call(this);

		// register list for changes
		this.registerMasterListBind(this.getList());
		this.busyDialog = new sap.m.BusyDialog();

		//Using the component ID we subscribe a call back for refreshing the data
		var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
		var oComponent = sap.ui.component(sComponentId);
		oComponent.oEventBus.subscribe("ui.s2p.srm.sc.approve", "approveShoppingCart", this._handleApproveCallBack, this);
		//Route to detail on refresh by selected the next item
		this.oRouter.attachRoutePatternMatched(function(oEvent) {
			if (!sap.ui.Device.system.phone) {
				if (oEvent.getParameter("name") === "detail") {
					var sBindingContextPath = this.getBindingContextPathFor(oEvent.getParameter("arguments"));
					var oItem = this.findItemByContextPath(sBindingContextPath);
					var oList = this.getList();
					var iIndex = oList.indexOfItem(oItem);
					var oNextItem = oList.getItems()[iIndex + 1];

					this._sNextDetailPath = oNextItem && oNextItem.getBindingContext(this.sModelName).getPath();
				} else {
					var oItems = this.getList().getItems();
					if (oItems.length === 0) {
						this.showEmptyView('DETAIL_TITLE', 'VIEW_MESSGE');
						this.busyDialog.close();
					}
				}
			}
		}, this);
	},

	/**	
	 * @private [_handleApproveCallBack Callback handler on after approval, to select next row in desktop, or to load master in phone]	
	 */
	_handleApproveCallBack: function(channelId, eventId, data) {
		if (!sap.ui.Device.system.phone) {
			var mycount = 0;
			var mymasterlist = this.getList().getItems(); // get the items of the list
			for (var i = 0; i < mymasterlist.length; i++) { // loop over the items
				if (mymasterlist[i].getVisible() == true) { // check if items is visible and not a group header item
					mycount++;
				}
			}
			if (mycount == 1) {
				this.showEmptyView('DETAIL_TITLE', 'VIEW_MESSGE');
				this.busyDialog.close();
			} else {
				var oItem = this.findItemByContextPath(this._sNextDetailPath);
				if (oItem) {
					this.setListItem(oItem);
				} else {
					if (this.getList().getItems().length > 1) {
						this.selectFirstItem();
					} else {
						this.showEmptyView('DETAIL_TITLE', 'VIEW_MESSGE');
						this.busyDialog.close();
					}
				}
			}
		} else {
			this.oRouter.navTo("master", {}, true);
		}
	},
	/**
	 * @override
	 *
	 * @param oItem
	 * @param sFilterPattern
	 * @returns {*}
	 */
	applySearchPatternToListItem: function(oItem, sFilterPattern) {
		if (sFilterPattern.substring(0, 1) === "#") {
			var sTail = sFilterPattern.substr(1);
			var sDescr = oItem.getBindingContext().getProperty("Name").toLowerCase();
			return sDescr.indexOf(sTail) === 0;
		} else {
			return sap.ca.scfld.md.controller.ScfldMasterController.prototype.applySearchPatternToListItem.call(null, oItem,
				sFilterPattern);
		}

		/**
		 * @ControllerHook Extension hook for searching  
		 * This hook can be used to enhance search through extensibility
		 * @callback sap.ca.scfld.md.controller.BaseDetailController~extHook4
		 * @return {model}  ...
		 */

		if (this.extHook4) {
			this.extHook4();
		};

	},

	/**
	 *returns the header and footer options for master list
	 */

	getHeaderFooterOptions: function() {
		return {
			sI18NMasterTitle: "MASTER_TITLE",
			buttonList: []
		};
	}
});
},
	"ui/s2p/srm/sc/approve/view/S2.view.xml":'<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<core:View xmlns:core="sap.ui.core"\n\txmlns="sap.m" controllerName="ui.s2p.srm.sc.approve.view.S2">\n\t<Page id="listpage" title="{i18n>MASTER_TITLE}">\n\t\t<content>\n\t\t\t<List id="list" items="{/WorkflowTaskCollection}" mode="{device>/listMode}" select="_handleSelect" growing="true" growingScrollToLoad="true" growingThreshold="20">\t\t\t\n\t\t\t\t<ObjectListItem  id="MAIN_LIST_ITEM" type="{device>/listItemType}" press="_handleItemPress"\n\t\t\t\t\ttitle="{CreatedByName}"\n                    number="{parts:[{path:\'Value\'}],formatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatCurrencyValue\'}"\n                    numberUnit="{Currency}">\n                    <firstStatus>\n                     \t<ObjectStatus text="{path:\'WiCreatedAt\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatDaysAgo\'}"> \n                    \t</ObjectStatus>\n                    </firstStatus>\n\t\t\t\t\t<attributes>\n\t\t\t\t\t\t<ObjectAttribute id="ATTR1" text="{ItemDescriptions}" />\n\t\t\t\t\t\t<ObjectAttribute id="ATTR2" text="{parts: [{path: \'ForwardedByName\'}, {path:\'OnBehalfOfName\'}, {path: \'SubstitutingForName\'}], formatter: \'ui.s2p.srm.sc.approve.util.Formatter.formatTextAuthor\'}" />\t\t\t\t\t\t\n\t\t\t\t\t<!-- extension point for attributes --> \n\n\t\t\t\t\t\t<core:ExtensionPoint name="extMoreAttr"></core:ExtensionPoint>\n\n\t\t\t\t\t\n\t\t\t\t\t</attributes>\n\t\t\t\t</ObjectListItem>\t\t\t\t\n\t\t\t</List>\n\t\t</content>\n\t\t<footer>\n\t\t\t<Bar id="footer"></Bar>\n\t\t</footer>\n\t</Page>\n</core:View>',
	"ui/s2p/srm/sc/approve/view/S3.controller.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ca.ui.dialog.factory");
jQuery.sap.require("sap.ca.ui.quickoverview.EmployeeLaunch");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");
jQuery.sap.require("ui.s2p.srm.sc.approve.util.Formatter");
jQuery.sap.require("ui.s2p.srm.sc.approve.util.ItemList");
jQuery.sap.require("ui.s2p.srm.sc.approve.util.ObjectCache");
jQuery.sap.require("sap.ca.ui.message.message");

sap.ca.scfld.md.controller.BaseDetailController.extend("ui.s2p.srm.sc.approve.view.S3", {

	onInit: function() {

		//execute the onInit for the base class BaseDetailController
		sap.ca.scfld.md.controller.BaseDetailController.prototype.onInit.call(this);

		// Get instance of the busy dialog
		this.busyDialog = new sap.m.BusyDialog();

		// Get instance of the OData model
		this.oDataModel = this.oApplicationFacade.getODataModel();

		// Get instance of the Page cache.
		this.oPageCache = ui.s2p.srm.sc.approve.util.ObjectCache.getInstance();

		this.new_oDataModel = this.oApplicationFacade.getODataModel("CARTAPPROVAL_STANDARD");
		this.count = 0;
		//Get a route listener from S2 or item detail controller for displaying the detail page
		this.oRouter.attachRouteMatched(function(oEvent) {
			if (oEvent.getParameter("name") === "detail") {
				this.description = undefined;

				//get WorkItemId and read details				
				var sDetailContextPath = oEvent.getParameter("arguments").contextPath;
				sDetailContextPath = sDetailContextPath.split("WorkflowTaskCollection(")[1].split(")")[0];
				var splitParam = sDetailContextPath.split(",");
				var wId = splitParam[1].split("=")[1].replace(/'/g, "");
				var oServerData = splitParam[0];
				this.oServerName = splitParam[0].split("=")[1];
				// this.count++;
				// if (this.count == 1) {
				// 	var ServerName = this.oServerName.substring(1, this.oServerName.length - 1);
				// 	this.new_oDataModel.sServiceUrl = this.new_oDataModel.sServiceUrl + ServerName;
				// }
				//start the busy dialog now
				this.busyDialog.open();

				//Service read for details
				this.readContent(oServerData, wId);

				//change the cache
				if (this.oPageCache.isEmpty() || this.oPageCache.getId() !== wId) {
					this.oPageCache.clear();
					this.oPageCache.setId(wId);
				}
			}
		}, this);

		//Setting the header/footer options for detail screen with approve, reject, send, forward, addToHomePage buttons
		this.setHeaderFooterOptions(this.createHeaderFooterOptions());
	},

	//Creating a custom footer options
	createHeaderFooterOptions: function() {
		var that = this;
		return {
			sI18NDetailTitle: "DETAIL_TITLE",
			oPositiveAction: {
				sId: "approveBtn",
				sI18nBtnTxt: "APPROVE",
				onBtnPressed: function() {
					jQuery.proxy(that.handleApprove(), this);
				}
			},

			oNegativeAction: {
				sId: "rejectBtn",
				sI18nBtnTxt: "REJECT",
				onBtnPressed: function() {
					jQuery.proxy(that.handleReject(), this);
				}
			},
			buttonList: [{
				sId: "inquireBtn",
				sI18nBtnTxt: "INQUIRE",
				onBtnPressed: function(evt) {
					jQuery.proxy(that.handleInquire(evt), this);
				}
			}, {
				sId: "sendBtn",
				sI18nBtnTxt: "SEND",
				onBtnPressed: function(evt) {
					jQuery.proxy(that.handleSend(evt), this);
				}
			}, {
				sId: "forwardBtn",
				sI18nBtnTxt: "FORWARD",
				onBtnPressed: function(evt) {
					jQuery.proxy(that.handleForward(evt), this);
				}
			}],

			oAddBookmarkSettings: {
				title: that.oApplicationFacade.getResourceBundle().getText("DETAIL_TITLE"),
				icon: "sap-icon//cart"
			},

			onBack: jQuery.proxy(function() {
				//Check if a navigation to master is the previous entry in the history
				var sDir = sap.ui.core.routing.History.getInstance().getDirection(this.oRouter.getURL("master"));
				if (sDir === "Backwards") {
					window.history.go(-1);
				} else {
					//we came from somewhere else - create the master view
					this.oRouter.navTo("master");
				}
			}, this)
		};
	},

	//Reads a service returning oData to get the details of a Shopping Cart
	readContent: function(oServerData, wId) {
		/*changes for actions to be executed successfully in Firefox browser*/
		//Actions fail in Firefox, check the agent and set header manually.
		/*		var browser = navigator.userAgent;
				if(String(browser).indexOf("Trident")!=-1){ */
		var onRequestSuccess = function(oData, oResponse) {
			//Make a JSON model binding for the data returned
			/*var csrfToken = oResponse.headers['x-csrf-token'];
			this.oDataModel.setHeaders({"x-csrf-token":csrfToken });*/
			this.bindView(oData);
		};

		//this.oDataModel.setTokenHandlingEnabled(false);
		this.oDataModel.setHeaders({
			"X-Requested-With": "XMLHttpRequest",
			"Content-Type": "application/atom+xml"
		});
		//"x-csrf-token":"Fetch" 	  } );
		//		}
		/*check if browser is Firefox
		else if ($.browser.mozilla) { 
			var onRequestSuccess = function(oData, oResponse) { 
			var csrfToken = oResponse.headers["X-CSRF-Token"]; 
			this.oDataModel.setHeaders({"X-CSRF-Token":csrfToken }); 
			//Make a JSON model binding for the data returned 
			this.bindView(oData); 
			}; 
			this.oDataModel.setTokenHandlingEnabled(false); 
			this.oDataModel.setHeaders({ "X-Requested-With": "XMLHttpRequest", 
			"Content-Type": "application/atom+xml", 
			"X-CSRF-Token":"Fetch"}); 
			} */
		/*else 
		{
			var onRequestSuccess = function(oData, oResponse) { 
				var csrfToken = oResponse.headers["x-csrf-token"]; 
				this.oDataModel.setHeaders({"x-csrf-token":csrfToken }); 
				//Make a JSON model binding for the data returned 
				this.bindView(oData); 
				}; 
				this.oDataModel.setTokenHandlingEnabled(false); 
				this.oDataModel.setHeaders({ "X-Requested-With": "XMLHttpRequest", 
				"Content-Type": "application/atom+xml", 
				"x-csrf-token":"Fetch"}); 
				} */

		//Since the service uses the backend service name, a concatenation of its name to service URL done
		//var obj=this.oDataModel.sServiceUrl;
		//this.oDataModel.sServiceUrl = obj.split(";")[0]+";v=2;mo";
		this.oDataModel.read("WorkflowTaskCollection(" + oServerData + ",WorkitemID='" + wId + "')/SCAHeader", null, [
				"$expand=SCAAttachmentHeader,SCANoteHeader,SCAApproverHeader,SCAItem/SCAAttachmentItem,SCAItem/SCANoteItem"
			], true,
			jQuery.proxy(onRequestSuccess, this), jQuery.proxy(this.onRequestFailed, this));

		/**
		 * @ControllerHook Extension hook for saving  
		 * This hook can be used to save the fields through extensibility
		 * @callback sap.ca.scfld.md.controller.BaseDetailController~extHook2
		 * @return {model}  ...
		 */
		//var extensionHook2 = this.onDataRecieved2;
		if (this.extHook2) {
			this.extHook2();
		};
	},

	bindView: function(oData) {

		this.description = oData;

		//Select the information tab from Icon Tab Bar as default
		this.getView().byId('icontabBar').setSelectedKey("Information");
		this.getView().byId('icontabBar').setExpanded(true);

		//Setting a JSON model to oData returned with its name
		this.getView().setModel(new sap.ui.model.json.JSONModel(oData), "description");

		//we use a global array to keep track of product item for each of the items in a shopping cart
		ui.s2p.srm.sc.approve.util.ItemList.item.clear();
		for (var i = 0; i < oData.SCAItem.results.length; i++) {
			//ui.s2p.srm.sc.approve.util.ItemList.item.add(oData.WorkitemID,i);
			ui.s2p.srm.sc.approve.util.ItemList.item.add(oData.SCAItem.results);
		}
		//Dynamically show up the footer buttons in Enabled or Disabled state and check for inquire button visibility
		this.showApproveRejectSendButtons(oData.ApprovalOnItemlevel, oData.isInquireWorkflow);
		/**
		 * @ControllerHook Extension hook for saving 
		 * This hook can be used to alter the search filters through extensibility
		 * @callback sap.ca.scfld.md.controller.BaseDetailController~extHookBind
		 * @param {Array} oData ...
		 * @return {void} ...
		 */
		if (this.extHookBind) {
			this.extHookBind(oData);
		}

		//Update item state from cache
		this.updateItemStateFromCache();

		//close the busy dialog first
		this.busyDialog.close();
	},

	//Show Business Card on click of a name
	handleUserNameClick: function(oControl, eId) {
		//Get the Picture of the employee if exists
		var oPicture = this.getEmployeeImage(eId);
		var onRequestSuccess = function(oData, oRespose) {
			var oEmployee = {
				imgurl: oPicture,
				name: oData.results[0].FullName,
				department: "",
				contactmobile: oData.results[0].MobilePhone,
				contactphone: oData.results[0].WorkPhone,
				companyname: oData.results[0].CompanyName,
				contactemail: oData.results[0].EMail,
				contactemailsubj: "",
				companyaddress: oData.results[0].AddressString
			};

			//call 'Business Card' reuse component
			var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(oEmployee);
			oEmployeeLaunch.openBy(oControl);
		};

		//Since the service uses the backend service name, a concatenation of its name to service URL done
		/*var obj=this.oDataModel.sServiceUrl;
		this.oDataModel.sServiceUrl = obj.split(";")[0]+";v=2;mo";	
		*/
		//Service read for User Details retrieval
		this.oDataModel.read("UserDetailsCollection", null, ["$filter=UserID eq '" + eId + "' and SAP__Origin eq " + this.oServerName], false,
			jQuery.proxy(onRequestSuccess, this),
			jQuery.proxy(this.onRequestFailed, this));
	},

	//On click of approver's name in Approver Tab 
	onApproverPress: function(oEvent) {
		if (oEvent.getSource().getModel('description')) {
			var ind = parseInt(oEvent.getSource().getBindingContextPath().split('/')[3]);
			var arr = this.description.SCAApproverHeader.results;
			var selectedID = oEvent.getParameters().id;
			var oControl = this.getView().byId(selectedID);
			this.handleUserNameClick(oControl, arr[ind].ApproverID);
		}
	},

	//On click of creator's name in Header info
	onCreatorPress: function(oEvent) {
		var oControl = this.getView().byId("DetailHeader");
		this.handleUserNameClick(oControl, this.description.CreatedByID);
	},

	//On click of person's name in the Header info 
	onPersonNamePress: function(event) {
		var oControl = this.getView().byId("ATTR2");
		var id = "";
		if (this.description.ForwardedByID) {
			id = this.description.ForwardedByID;
		} else if (this.description.SubstitutingForID) {
			id = this.description.SubstitutingForID;
		} else {
			id = this.description.OnBehalfOfID;
		}
		this.handleUserNameClick(oControl, id);
	},

	//On click of person's name in the Note Tab
	onNotePersonPress: function(oEvent) {
		if (oEvent.getSource().getModel('description')) {
			var ind = parseInt(oEvent.getSource().getBindingContextPath().split('/')[3]);
			var arr = this.description.SCANoteHeader.results;
			var oControl = this.getView().byId("Notes");
			this.handleUserNameClick(oControl, arr[ind].CreatedByID);
		}
	},

	//On click of Approve Button
	handleApprove: function() {
		var oDataObj = this.description;
		var oBundle = this.oApplicationFacade.getResourceBundle();

		// open the confirmation dialog
		var oApproveDialog = new sap.m.Dialog("approveDialog", {
			title: oBundle.getText("APPROVE"),
			content: [
				new sap.m.Text({
					text: oBundle.getText("APPROVESC_BY", [oDataObj.CreatedByName])
				}).addStyleClass("sapUiTinyMarginBottom"),
				new sap.m.TextArea({
					width: "100%",
					placeholder: oBundle.getText("ADDNOTE"),
				})
			],
			beginButton: new sap.m.Button({
				text: oBundle.getText("OK"),
				press: function() {
					this.busyDialog.open();
					this.onApprove(oApproveDialog);
				}.bind(this)
			}),
			endButton: new sap.m.Button({
				text: oBundle.getText("CANCEL"),
				press: function() {
					this.fnClose(oApproveDialog);
				}.bind(this)
			}),

			afterClose: function() {
				oApproveDialog.destroy();
			}
		});

		oApproveDialog.addStyleClass("sapUiContentPadding");
		oApproveDialog.open();
	},

	//On click of Reject Button
	handleReject: function() {
		var oDataObj = this.description;
		var oBundle = this.oApplicationFacade.getResourceBundle();

		// open the confirmation dialog
		var oRejectDialog = new sap.m.Dialog("rejectDialog", {
			title: oBundle.getText("REJECT"),
			content: [
				new sap.m.Text({
					text: oBundle.getText("REJECTSC_BY", [oDataObj.CreatedByName]),
				}).addStyleClass("sapUiTinyMarginBottom"),
				new sap.m.TextArea({
					width: "100%",
					placeholder: oBundle.getText("ADDNOTE"),
				})
			],
			beginButton: new sap.m.Button({
				text: oBundle.getText("OK"),
				press: function() {
					this.busyDialog.open();
					this.onReject(oRejectDialog);
				}.bind(this)
			}),
			endButton: new sap.m.Button({
				text: oBundle.getText("CANCEL"),
				press: function() {
					this.fnClose(oRejectDialog);
				}.bind(this)
			}),

			afterClose: function() {
				oRejectDialog.destroy();
			}
		});

		oRejectDialog.addStyleClass("sapUiContentPadding");
		oRejectDialog.open();
	},

	//On click of Send Button
	handleSend: function(oEvent) {

		var oDataObj = this.description;
		var oBundle = this.oApplicationFacade.getResourceBundle();
		var itemTableValues = this.byId('itemList').getItems();
		var approvedItemCnt = 0;
		var rejectedItemCnt = 0;

		//Get the total number of approved and rejected items
		for (var i = 0; i < itemTableValues.length; i++) {
			if (itemTableValues[i].getCells()[0].bOutput != "invisible") {
				if (itemTableValues[i].getCells()[0].getProperty('state') == true) {
					approvedItemCnt++;
				} else {
					rejectedItemCnt++;
				}
			}
		}

		// open the confirmation dialog
		var oSendDialog = new sap.m.Dialog("sendDialog", {
			title: oBundle.getText("SEND"),
			content: [
				new sap.m.Text({
					text: oBundle.getText("DECISION", [oDataObj.CreatedByName]) + "\n\n" + oBundle.getText(
						"APPROVED_ITEMS") + " " + approvedItemCnt + "\n" + oBundle.getText("REJECTED_ITEMS") + " " + rejectedItemCnt,
				}).addStyleClass("sapUiTinyMarginBottom"),
				new sap.m.TextArea({
					width: "100%",
					placeholder: oBundle.getText("ADDNOTE"),
				})
			],
			beginButton: new sap.m.Button({
				text: oBundle.getText("SEND"),
				press: function() {
					this.busyDialog.open();
					this.onApproveRejectAtItemLevel(oSendDialog);
				}.bind(this)
			}),
			endButton: new sap.m.Button({
				text: oBundle.getText("CANCEL"),
				press: function() {
					this.fnClose(oSendDialog);
				}.bind(this)
			}),
			afterClose: function() {
				oSendDialog.destroy();
			}
		});

		oSendDialog.addStyleClass("sapUiContentPadding");
		oSendDialog.open();
	},

	//On click of forward button
	handleForward: function(oControlEvent) {
		var fnStartSearch = function(sQuery) {
			var sParams = this.oDataModel.sServiceUrl;
			//Since the service uses the backend service name, a concatenation of its name to service URL done
			//this.oDataModel.sServiceUrl = sParams.split(";")[0]+";v=2;mo";

			//Call a service to get a list of searched agents
			this.oDataModel.read("/ForwardingAgentCollection", null, ["$filter=SearchForText eq '" + sQuery + "'and SAP__Origin eq " + this.oServerName],
				true,
				jQuery.proxy(function(oData, oResponse) {
					sap.ca.ui.dialog.forwarding.setFoundAgents(oData.results);
				}, this), jQuery.proxy(this.onSearchRequestFailed, this));
		};

		sap.ca.ui.dialog.forwarding.start(jQuery.proxy(fnStartSearch, this),
			jQuery.proxy(this.ForwardingAgentCollection, this));
	},

	onItemApproveChange: function(oEvent) {
		//find the corresponding item which was changed
		var itemIndex = oEvent.getSource().getBindingInfo("visible").binding.oContext.getPath().split("/")[3];
		var items = this.byId("itemList").getItems();
		if (itemIndex !== -1) {
			this.oPageCache.setKey(itemIndex, oEvent.getSource().getProperty("state"));
		}
	},

	//Service call to Approve a Shopping Cart
	onApprove: function(oDialog) {
		oDialog.close();
		var oDataObj = this.description;
		this.sTextKey = "APPROVED"; //Text Key for success
		this.sSuccessMsg = this.oApplicationFacade.getResourceBundle().getText(this.sTextKey) + "\n";

		// Call the back-end service for rejection
		var oEntry = {};
		var oServerName = this.oServerName.replace(/'/g, "");
	//	oEntry.SAP__Origin=oServerName;
		oEntry.Comment = (oDialog.getContent()[1].getValue()) ? (oDialog.getContent()[1].getValue()) : "";
		oEntry.WorkitemID = oDataObj.WorkitemID;
		oEntry.DecisionKey = "001";
		oEntry.ScNumber = oDataObj.ScNumber;
		

		//	this.oDataModel.setRefreshAfterChange(false);
		var sParams = this.oDataModel.sServiceUrl;
		//Since the service uses the backend service name, a concatenation of its name to service URL done
		//this.oDataModel.sServiceUrl = sParams.split(";")[0]+";v=2;o="+oServerName;

		//Set request to asynchronous due to timeout setting in Safari browser
		var oServiceParams = {
			success: jQuery.proxy(this._handleApproveRejectSuccess, this),
			error: jQuery.proxy(this.onRequestFailed, this),
			async: true
		};

		// this.new_oDataModel.create("ApplyDecision?WorkitemID='" + oDataObj.WorkitemID + "'&DecisionKey='001'&Comment='" + encodeURIComponent(
		// 	oEntry.Comment) + "'", oEntry, oServiceParams);
		//Temporary Solution for multi origin issue, later to adapt changes in CARTAPPROVAL_STANDARD
		this.oDataModel.create("ApplyDecision?WorkitemID='" + oDataObj.WorkitemID  + 
		"'&DecisionKey='001'&Comment='" + encodeURIComponent(oEntry.Comment) + "'&SAP__Origin='"+oServerName+"'", oEntry, oServiceParams);
		
	},

	//Service call to Reject a Shopping Cart
	onReject: function(oDialog) {
		oDialog.close();
		var oDataObj = this.description;
		this.sTextKey = "REJECTED"; //Text Key for success message.
		this.sSuccessMsg = this.oApplicationFacade.getResourceBundle().getText(this.sTextKey) + "\n";

		// Call the back-end service for rejection
		var oEntry = {};
		var oServerName = this.oServerName.replace(/'/g, "");
		oEntry.Comment = (oDialog.getContent()[1].getValue()) ? (oDialog.getContent()[1].getValue()) : "";
		oEntry.WorkitemID = oDataObj.WorkitemID;
		oEntry.DecisionKey = "002";
		
		var sParams = this.oDataModel.sServiceUrl;

		//Since the service uses the backend service name, a concatenation of its name to service URL done
		//this.oDataModel.sServiceUrl = sParams.split(";")[0]+";v=2;o="+oServerName;
		//	this.oDataModel.setRefreshAfterChange(false);

		//Set request to asynchronous due to timeout setting in Safari browser		
		var oServiceParams = {
			success: jQuery.proxy(this._handleApproveRejectSuccess, this),
			error: jQuery.proxy(this.onRequestFailed, this),
			async: true
		};

		//this.new_oDataModel.create("ApplyDecision?WorkitemID='" + oDataObj.WorkitemID + "'&DecisionKey='002'&Comment='" + encodeURIComponent(
			//oEntry.Comment) + "'", oEntry, oServiceParams);
			//sap note 2660402 
		this.oDataModel.create("ApplyDecision?WorkitemID='" + oDataObj.WorkitemID  + 
		"'&DecisionKey='001'&Comment='" + encodeURIComponent(oEntry.Comment) + "'&SAP__Origin='"+oServerName+"'", oEntry, oServiceParams);

	},

	//Service call to Forward a Shopping Cart
	ForwardingAgentCollection: function(oResult) {

		var oDataObj = this.description;

		if (oResult && oResult.bConfirmed) {
			this.oSelectedAgent = oResult.oAgentToBeForwarded;
			var oEntry = {};
			oEntry.Comment = (oResult.sNote) ? oResult.sNote : "";
			oEntry.WorkitemID = oDataObj.WorkitemID;
			oEntry.NewApprover = this.oSelectedAgent.UserId;

			var oServerName = this.oServerName.replace(/'/g, "");
			var sParams = this.oApplicationFacade.getODataModel().sServiceUrl;
			//Since the service uses the back-end service name, a concatenation of its name to service URL done
			//this.oDataModel.sServiceUrl = sParams.split(";")[0]+";v=2;o="+oServerName;
			//	this.oDataModel.setRefreshAfterChange(false);

			//Set request to asynchronous due to timeout setting in Safari browser
			var oServiceParams = {
				success: jQuery.proxy(this._handleForwardSuccess, this),
				error: jQuery.proxy(this.onRequestFailed, this),
				async: true
			};
			// this.new_oDataModel.create("Forward?WorkitemID='" + oDataObj.WorkitemID + "'&NewApprover='" + this.oSelectedAgent.UserId +
			// 	"'&Comment='" +
			// 	encodeURIComponent(oEntry.Comment) + "'",
			// 	oEntry, oServiceParams);
			//sap note 2660402 
			this.oDataModel.create("ApplyDecision?WorkitemID='" + oDataObj.WorkitemID  + 
		"'&DecisionKey='001'&Comment='" + encodeURIComponent(oEntry.Comment) + "'&SAP__Origin='"+oServerName+"'", oEntry, oServiceParams);

		}
	},

	_handleApproveRejectSuccess: function() {

		var sParams = this.oDataModel.sServiceUrl;
		//Since the service uses the back-end service name, a concatenation of its name to service URL done
		this.oDataModel.sServiceUrl = sParams.split(";")[0] + ";v=2;mo";

		var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.oView);
		var oComponent = sap.ui.component(sComponentId);
		oComponent.oEventBus.publish("ui.s2p.srm.sc.approve", "approveShoppingCart");

		this.oDataModel.setRefreshAfterChange(true);
		this.oDataModel.refresh(true);

		//display success message for the action
		sap.m.MessageToast.show(this.sSuccessMsg, {
			closeOnBrowserNavigation: false
		});
		this.busyDialog.close();
	},

	_handleForwardSuccess: function() {
		var sParams = this.oDataModel.sServiceUrl;
		//Since the service uses the backend service name, a concatenation of its name to service URL done
		this.oDataModel.sServiceUrl = sParams.split(";")[0] + ";v=2;mo";

		var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.oView);
		var oComponent = sap.ui.component(sComponentId);
		oComponent.oEventBus.publish("ui.s2p.srm.sc.approve", "approveShoppingCart");

		this.oDataModel.setRefreshAfterChange(true);
		this.oDataModel.refresh(true);

		//show success message.
		var sMsg = this.oApplicationFacade.getResourceBundle().getText("FORWARDED", [this.oSelectedAgent.FullName]) + "\n";
		sap.m.MessageToast.show(sMsg);
	},

	onApproveRejectAtItemLevel: function(oDialog) {
		oDialog.close();
		var oDataObj = this.description;
		var itemArray = [];
		this.sTextKey = "APPROVED"; //Text Key for success
		var rejectedItemCount = 0;
		for (var i = 0; i < oDataObj.SCAItem.results.length; i++) {
			var obj = {};
			if (oDataObj.SCAItem.results[i].ApprovalOnItemlevel === "X") {
				if (this.byId('itemList').getItems()[i].getCells()[0].getProperty('state') == true) {
					obj.ItemApproved = oDataObj.SCAItem.results[i].ApprovalOnItemlevel;
				} else {
					obj.ItemApproved = '0';
					rejectedItemCount++;
				}
				obj.ItemNumber = oDataObj.SCAItem.results[i].ItemNumber;
				itemArray.push(obj);
			}
		}
		if (rejectedItemCount == oDataObj.SCAItem.results.length) { //To check if all the items are rejected in item level approval
			this.sTextKey = "REJECTED"; //Text Key for success message.
			this.sSuccessMsg = this.oApplicationFacade.getResourceBundle().getText(this.sTextKey) + "\n";
		} else if (rejectedItemCount === 0) {
			this.sTextKey = "APPROVED";
			this.sSuccessMsg = this.oApplicationFacade.getResourceBundle().getText(this.sTextKey) + "\n";
		} else if (rejectedItemCount === 0) {
			this.sTextKey = "FORWARDED";
			this.sSuccessMsg = this.oApplicationFacade.getResourceBundle().getText(this.sTextKey) + "\n";
		} else {
			this.sTextKey = "PARTAPPROVED";
			this.sSuccessMsg = this.oApplicationFacade.getResourceBundle().getText(this.sTextKey, [oDataObj.SCAItem.results.length -
				rejectedItemCount, rejectedItemCount
			]) + "\n";
		}

		var oServerName = this.oServerName.replace(/'/g, "");

		// Call the back-end service for rejection
		var oEntry = {};
		oEntry.Comment = (oDialog.getContent()[1].getValue()) ? oDialog.getContent()[1].getValue() : "";
		oEntry.WorkitemID = oDataObj.WorkitemID;
		oEntry.ScNumber = oDataObj.ScNumber;
		oEntry.SCAIBAItem = itemArray;
		//	 this.oDataModel.setRefreshAfterChange(false);
		var sParams = this.new_oDataModel.sServiceUrl;
		//Since the service uses the backend service name, a concatenation of its name to service URL done
		var sCreateParams = sParams.replace(";mo", ";o=" + oServerName);
		this.new_oDataModel.sServiceUrl = sCreateParams;

		//Set request to asynchronous due to timeout setting in Safari browser
		var oServiceParams = {
			success: jQuery.proxy(this._handleApproveRejectSuccess, this),
			error: jQuery.proxy(this.onRequestFailed, this),
			async: true
		};

		this.new_oDataModel.create("SCAIBAHeaderCollection", oEntry, oServiceParams);

		this.new_oDataModel.sServiceUrl = sParams;
	},

	onRequestFailed: function(oError) {
		//restore the original OData path
		//var sParams = this.oDataModel.sServiceUrl;
		//Since the service uses the backend service name, a concatenation of its name to service URL done
		//this.oDataModel.sServiceUrl = sParams.split(";")[0]+";v=2;mo";

		//close the busy dialog first
		this.busyDialog.close();
		var oBundle = this.oApplicationFacade.getResourceBundle();

		this.oDataModel.setRefreshAfterChange(true);
		if (this.oDataModel.hasPendingChanges()) {
			this.oDataModel.refresh(true);
		}

		var messages = new Array();
		if (oError.response) {
			if (oError.response.body) {
				if (jQuery.parseJSON(oError.response.body).error.innererror.errordetails) {
					for (var i = 0; i < jQuery.parseJSON(oError.response.body).error.innererror.errordetails.length; i++) {
						messages.push(jQuery.parseJSON(oError.response.body).error.innererror.errordetails[i].message);
					}
				}
			}
		}
		var messageTxt = '';
		if (messages.length > 0) {
			for (var i = 0; i < messages.length; i++) {
				messageTxt = messages[i] + '\n' + '\n' + messageTxt;
			}
		}

		sap.ca.ui.message.showMessageBox({
			type: sap.ca.ui.message.Type.ERROR,
			message: oBundle.getText("ERROR_MESS"),
			details: messageTxt

		});
	},
	onSearchRequestFailed: function(oError) {
		this.busyDialog.close();
		var oBundle = this.oApplicationFacade.getResourceBundle();

		sap.ca.ui.message.showMessageBox({
			type: sap.ca.ui.message.Type.ERROR,
			message: oBundle.getText("SEARCH_MESS")

		});
	},

	updateItemStateFromCache: function(oEvent) {
		if (this.description) {
			if (this.description.ApprovalOnItemlevel === "X" && !this.oPageCache.isEmpty()) {
				//setTimeout(jQuery.proxy(function() {
				for (var i = 0; i < this.description.NumberOfItems; i++) {
					var state = this.oPageCache.getValue(i);
					if (state !== undefined) {
						this.byId("itemList").getItems()[i].getCells()[0].setProperty("state", state);
					}
				}
			} else {
				for (var i = 0; i < this.description.NumberOfItems; i++) {
					this.byId("itemList").getItems()[i].getCells()[0].setProperty("state", true);
				}
			}
		}
	},

	//Dynamically check if a Shopping Cart has item level approval or header level approval, accordingly set the buttons Enable/Disable
	//Item level Approval : Disable Approve, Reject buttons and enable Send button
	//Header level Approval : Enable Approve, Reject buttons and disable Send button
	// Inquire button : based on iisInquireWorkflow flag and if not tablet and mobile , then visible
	showApproveRejectSendButtons: function(itemLevelApproval, isInquireWorkflow) {
		if (itemLevelApproval === "") {
			this.byId('itemList').getColumns()[0].setVisible(false);
			var oButtonList = this.createHeaderFooterOptions();
			oButtonList = this.showInquireButton(oButtonList, isInquireWorkflow);

			for (var i = 0; i < oButtonList.buttonList.length; i++) {
				//Dummy change 
				var a = 10;
				if (oButtonList.buttonList[i].sId === "sendBtn") {
					oButtonList.buttonList.splice(i, 1);
				}
			}
			this.setHeaderFooterOptions(oButtonList);
			// this.setBtnEnabled("sendBtn", false);
		} else {
			this.getView().byId('itemList').getColumns()[0].setVisible(true);
			var buttonList = this.createHeaderFooterOptions();
			buttonList.oPositiveAction = null;
			buttonList.oNegativeAction = null;
			buttonList = this.showInquireButton(buttonList, isInquireWorkflow);
			this.setHeaderFooterOptions(buttonList);
			this.setBtnEnabled("sendBtn", true);
		}
		//	Check for inquire intent -- cloud deployment
		this.isInquireIntentSupported();
	},

	//        This will navigate to webdynpro screen to open
	//		   workflow item in inquire scenario
	//
	handleInquire: function() {
		var fgetService = sap.ushell && sap.ushell.Container && sap.ushell.Container.getService;
		this.oCrossAppNavigator = fgetService && fgetService("CrossApplicationNavigation");

		var oDataObj = this.description;
		var sHref = (this.oCrossAppNavigator && this.oCrossAppNavigator.hrefForExternal({
			target: {
				semanticObject: "ShoppingCartItem",
				action: "inquire"
			},
			params: {
				"SAPSRM_BO_NO": oDataObj.ScNumber,
				"SAPSRM_WIID": oDataObj.WorkitemID
			}
		}));

		if (sHref) {
			sap.m.URLHelper.redirect(sHref);
		}
	},

	// Dynamically check if workflow item is of type approval with completionm
	//, accordingly set the inquire button visibility

	showInquireButton: function(obuttonList, isInquireWorkflow) {
		if (isInquireWorkflow === "" || isInquireWorkflow === undefined || sap.ui.Device.system.tablet === true || sap.ui.Device.system.phone ===
			true) {
			for (var i = 0; i < obuttonList.buttonList.length; i++) {
				//Dummy change 
				var a = 10;
				if (obuttonList.buttonList[i].sId === "inquireBtn") {
					obuttonList.buttonList.splice(i, 1);
				}
			}
		}

		return obuttonList;
	},

	//Navigate to item level details and pass WorkItemid, itemIndex and servername
	moveToItemDetail: function(oEvent) {
		//Added scnumber, itemnumber for fiori performance improvement		
		var wId = oEvent.getSource().getModel('description').getData().WorkitemID;
		var itemIndex = oEvent.getSource().getBindingContextPath().split('/')[3];
		var itemNumber = oEvent.getSource().getModel('description').getData().SCAItem.results[itemIndex].ItemNumber;
		var scNumber = oEvent.getSource().getModel('description').getData().ScNumber;
		var serverName = this.oServerName;
		this.oRouter.navTo("detailItem", {
			workItemId: wId,
			itemIndex: itemIndex,
			itemNumber: itemNumber,
			scNumber: scNumber,
			servername: serverName
		}, true);
	},

	//If a Navigate to Empty Page is called
	navToEmpty: function() {
		this.oRouter.navTo("noData");
	},

	//Get Employee's Picure 
	formatEmployee: function(oEvent) {
		if (oEvent.getParameters().key === "approver") {
			var oVar = "";
			var oServerName = this.oServerName.replace(/'/g, "");
			var approverlist = this.description.SCAApproverHeader.results;
			for (var i = 0; i < approverlist.length; i++) {
				var fnSuccess = function(oData, oResponse) {
					if (oResponse.body.length === 0) {
						oVar = jQuery.sap.getModulePath("ui.s2p.srm.sc.approve") + "/img/" + "person_placeholder.png";
						this.getView().byId("Approval_list").getItems()[i].setIcon(oVar);
					} else {
						oVar = oResponse.requestUri;
						this.getView().byId("Approval_list").getItems()[i].setIcon(oVar);
					}
					this.oDataModel.sServiceUrl = this.oDataModel.sServiceUrl.split(";")[0] + ";v=2;mo";
				};

				var fnError = function(oError) {
					oVar = jQuery.sap.getModulePath("ui.s2p.srm.sc.approve") + "/img/" + "person_placeholder.png";
					this.getView().byId("Approval_list").getItems()[i].setIcon(oVar);
					this.oDataModel.sServiceUrl = this.oDataModel.sServiceUrl.split(";")[0] + ";v=2;mo";
				};

				//this.oDataModel.sServiceUrl = this.oDataModel.sServiceUrl.split(";")[0]+";v=2;o="+oServerName;
				var eid = approverlist[i].ApproverID;
				this.new_oDataModel.read("UserDetailsCollection('" + eid + "')/$value", null, null, false, jQuery.proxy(fnSuccess, this), jQuery.proxy(
					fnError, this));
			}
		}
	},
	getEmployeeImage: function(eid) {
		var oVar = "";
		var oServerName = this.oServerName.replace(/'/g, "");
		var fnSuccess = function(oData, oResponse) {
			if (oResponse.body.length === 0) {
				oVar = jQuery.sap.getModulePath("ui.s2p.srm.sc.approve") + "/img/" + "person_placeholder.png";
			} else {
				oVar = oResponse.requestUri;
			}
			this.oDataModel.sServiceUrl = this.oDataModel.sServiceUrl.split(";")[0] + ";v=2;mo";
		};

		var fnError = function(oError) {
			oVar = jQuery.sap.getModulePath("ui.s2p.srm.sc.approve") + "/img/" + "person_placeholder.png";
			this.oDataModel.sServiceUrl = this.oDataModel.sServiceUrl.split(";")[0] + ";v=2;mo";
		};

		//this.oDataModel.sServiceUrl = this.oDataModel.sServiceUrl.split(";")[0]+";v=2;o="+oServerName;
		this.new_oDataModel.read("UserDetailsCollection('" + eid + "')/$value", null, null, false, jQuery.proxy(fnSuccess, this), jQuery.proxy(
			fnError, this));
		return oVar;
	},

	// Change the state of the switch to initial state or changed state after the items are loaded 
	onItemsLoaded: function(oEvent) {
		this.updateItemStateFromCache(oEvent);
	},

	isMainScreen: function() {
		return true;
	},
	// this method checks if intent for asked feature is availavle 
	// this method checks if intent for asked feature is availavle 
	isInquireIntentSupported: function() {
		var controller = this;
		if (controller.isInquireIntentSupportedFlag === false) {
			controller.setBtnEnabled("inquireBtn", false);
		} else {
			var aIntents = ["#ShoppingCartItem-inquire?SAPSRM_BO_NO=" + this.description.ScNumber + "&SAPSRM_WIID=" + this.description.WorkitemID];
			var fgetService = sap.ushell && sap.ushell.Container && sap.ushell.Container.getService;
			this.oCrossAppNavigator = fgetService && fgetService("CrossApplicationNavigation");
			if (this.oCrossAppNavigator !== undefined) {
				this.oCrossAppNavigator.isIntentSupported(aIntents).done(
						function(aResponses) {
							if (aResponses[aIntents[0]].supported !== true) {
								controller.setBtnEnabled("inquireBtn", false);
								controller.isInquireIntentSupportedFlag = false;
							}
						})
					.fail(function() {
						controller.setBtnEnabled("inquireBtn", false);
						controller.isInquireIntentSupportedFlag = false;
					});
			}
		}
	},

	fnClose: function(oDialog) {
		oDialog.close();
	}

});
},
	"ui/s2p/srm/sc/approve/view/S3.view.xml":'<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<core:View xmlns:core="sap.ui.core" \n\t xmlns:sap.ui.layout="sap.ui.layout"\n\t xmlns:sap.ui.layout.form="sap.ui.layout.form"\n\txmlns:sap.ui.core.mvc="sap.ui.core.mvc" xmlns="sap.m"\n\tcontrollerName="ui.s2p.srm.sc.approve.view.S3">\n\t<Page title="{i18n>DETAIL_TITLE}" class="sapUiFioriObjectPage" showNavButton="{device>/showNavButton}" navButtonPress="_navBack">\n\t\t<content>\n\n\t\t\t<ObjectHeader id="DetailHeader" title="{description>/CreatedByName}" titleActive="true"\n\t\t\t\ttitlePress="onCreatorPress" number="{path:\'description>/Value\',formatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatCurrencyValue\'}"\n\t\t\t\tnumberUnit="{description>/Currency}">\n\t\t\t\t<firstStatus>\n\t\t\t\t\t<ObjectStatus\n\t\t\t\t\t\ttext="{path: \'description>/WiCreatedAt\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatDaysAgo\'}"></ObjectStatus>\n\t\t\t\t</firstStatus>\n\t\t\t\t<attributes>\n\t\t\t\t\t<ObjectAttribute id="ATTR2" press="onPersonNamePress"\n\t\t\t\t\t\tactive="true"\n\t\t\t\t\t\ttext="{parts: [{path: \'description>/ForwardedByName\'}, {path:\'description>/OnBehalfOfName\'}, {path: \'description>/SubstitutingForName\'}], formatter: \'ui.s2p.srm.sc.approve.util.Formatter.formatTextAuthor\'}" />\n\t\t\t\t</attributes>\n\t\t\t</ObjectHeader>\n\n\t\t\t<IconTabBar id="icontabBar" expandable="true" expanded="true" select="formatEmployee"\n\t\t\t\tselectedKey="Information">\n\t\t\t\t<items>\n\t\t\t\t\t<IconTabFilter icon="sap-icon://hint" iconColor="Default"\n\t\t\t\t\t\tkey="Information" id="info" showAll="false">\n\t\t\t\t\t\t<content>\n\t\t\t\t\t\t\t<sap.ui.layout.form:SimpleForm\n\t\t\t\t\t\t\t\tid="myForm1" minWidth="1024" editable="false">\n\t\t\t\t\t\t\t\t<sap.ui.layout.form:content>\n\t\t\t\t\t\t\t\t\t<Label text="{i18n>DESCRIPTION}">\n\t\t\t\t\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\t\t\t\t\tminWidth="192" weight="3"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t<Text\n\t\t\t\t\t\t\t\t\t\ttext="{parts:[{path:\'description>/ScDescription\'},{path:\'description>/ScNumberFormatted\'}], formatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatCategory\'}"\n\t\t\t\t\t\t\t\t\t\tmaxLines="0">\n\t\t\t\t\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\t\t\t\t\tweight="5"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t\t\t\t\t</Text>\n\n\t\t\t\t\t\t\t\t\t<Label\n\t\t\t\t\t\t\t\t\t\ttext="{path:\'description>/HeaderInfo/CumulatedAccountingTypeCode\',\n\t\t\t\t\t\t\t\t\tformatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatAccountAssignmentHeader\'}"\n\t\t\t\t\t\t\t\t\t\tvisible="{path:\'description>/HeaderInfo/CumulatedAccountingTypeCode\',\n\t\t\t\t\t\t\t\t\tformatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatAccountAssignmentIfPresent\'}">\n\t\t\t\t\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\t\t\t\t\tminWidth="192" weight="3"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t\t\t\t\t</Label>\n\n\t\t\t\t\t\t\t\t\t<Text id="acc_as_type" maxLines="0"\n\t\t\t\t\t\t\t\t\t\ttext="{parts : [{path:\'description>/HeaderInfo/AccountCategoryDescription\'},\n\t\t\t\t\t\t\t\t\t\t\t\t{path:\'description>/HeaderInfo/AccountDescription\'},{path:\'description>/HeaderInfo/AccountNumber\'}], \n\t\t\t\t\t\t\t\t\t\t\t\tformatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatAccountAssignmentValue\'}"\n\t\t\t\t\t\t\t\t\t\tvisible="{path:\'description>/HeaderInfo/CumulatedAccountingTypeCode\',\n\t\t\t\t\t\t\t\t\t\t\t\tformatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatAccountAssignmentIfPresent\'}">\n\t\t\t\t\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\t\t\t\t\tweight="5"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t\t\t\t\t</Text>\n\t\t\t\t\t\t\t\t\t<Label text="">\n\t\t\t\t\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\t\t\t\t\tminWidth="192" weight="3"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t<Text id="glacc_as_type" maxLines="0" \n\t\t\t\t\t\t\t\t\t\tvisible="{parts : [{path:\'description>/HeaderInfo/AccountCategoryDescription\'},\n\t\t\t\t\t\t\t\t\t\t\t\t {path:\'description>/HeaderInfo/AccountDescription\'},{path:\'description>/HeaderInfo/AccountNumber\'}], \n\t\t\t\t\t\t\t\t\t\t\t\t formatter:\'ui.s2p.srm.sc.approve.util.Formatter.glAccountVisibilityCheck\'}"\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\ttext = "{parts : [{path:\'description>/HeaderInfo/GlAccountDescription\'},{path:\'description>/HeaderInfo/GlAccountNumberFormatted\'}], \n\t\t\t\t\t\t\t\t\t\t\t\tformatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatGLAccountAssignmentValue\'}">\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\t\t\t\t\tweight="5"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t\t\t\t\t</Text>\n\n\t\t\t\t\t\t\t\t\t<Label text="{i18n>DELIVERY_DATE}">\n\t\t\t\t\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\t\t\t\t\tminWidth="192" weight="3"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t<Text\n\t\t\t\t\t\t\t\t\t\ttext="{parts : [{path : \'description>/HeaderInfo/DeliveryDate\'}, {path : \'description>/HeaderInfo/DeliveryDateAlsoLater\'}],\n\t\t\t\t\t\t\t\t\t\t formatter : \'ui.s2p.srm.sc.approve.util.Formatter.deliveryDate\'}"\n\t\t\t\t\t\t\t\t\t\tmaxLines="0">\n\t\t\t\t\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\t\t\t\t\tweight="5"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t\t\t\t\t</Text>\n\t\t\t\t\t\t\t\t\t<!-- extension point for attributes --> \n\n\t\t\t\t\t\t\t<core:ExtensionPoint name="extMoreInfo1"></core:ExtensionPoint>\n\t\t\t\t\t\t\t\t</sap.ui.layout.form:content>\n\t\t\t\t\t\t\t</sap.ui.layout.form:SimpleForm>\n\t\t\t\t\t\t</content>\n\t\t\t\t\t</IconTabFilter>\n\n\t\t\t\t\t<IconTabFilter icon="sap-icon://notes" iconColor="Default"\n\t\t\t\t\t\tkey="note" visible="{path:\'description>/SCANoteHeader/results\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.arrayVisibilityCheck\'}"\n\t\t\t\t\t\t id="noteTab" showAll="false"\n\t\t\t\t\t\tcount="{path:\'description>/SCANoteHeader/results\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.getTotalValue\'}">\n\t\t\t\t\t\t<content>\n\t\t\t\t\t\t\t<List id="Notes" items="{description>/SCANoteHeader/results}"\n\t\t\t\t\t\t\t\tmode="SingleSelectMaster" showSeparators="None">\n\t\t\t\t\t\t\t\t<items>\n\t\t\t\t\t\t\t\t\t<FeedListItem sender="{description>CreatedByName}"\n\t\t\t\t\t\t\t\t\t\tid="noteval" showIcon="false" text="{description>Text}"\n\t\t\t\t\t\t\t\t\t\tinfo="{description>TypeDescription}" senderPress="onNotePersonPress"\n\t\t\t\t\t\t\t\t\t\tsenderActive="true"\n\t\t\t\t\t\t\t\t\t\ttimestamp="{path:\'description>CreatedAt\',type:\'sap.ui.model.type.Date\', formatOptions: {style:\'medium\'}}">\n\t\t\t\t\t\t\t\t\t</FeedListItem>\n\t\t\t\t\t\t\t\t</items>\n\t\t\t\t\t\t\t</List>\n\t\t\t\t\t\t</content>\n\t\t\t\t\t</IconTabFilter>\n\n\t\t\t\t\t<IconTabFilter icon="sap-icon://attachment"\n\t\t\t\t\t\ticonColor="Default" key="attachment" visible="{path:\'description>/SCAAttachmentHeader/results\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.arrayVisibilityCheck\'}"\n\t\t\t\t\t\t id="attachTab" \n\t\t\t\t\t\t count="{path:\'description>/SCAAttachmentHeader/results\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.getTotalValue\'}"\n\t\t\t\t\t\tshowAll="false">\n\t\t\t\t\t\t<content id="Attachment">\n\t\t\t\t\t\t\t<List id="AttachmentData" items="{description>/SCAAttachmentHeader/results}"\n\n\t\t\t\t\t\t\t\tvisible="false" showSeparators="None">\n\t\t\t\t\t\t\t\t<StandardListItem  type="Active"\n\t\t\t\t\t\t\t\t\ttitle="{description>Description}"\n\t\t\t\t\t\t\t\t\ticon="{path:\'description>MimeType\',formatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatAttachmentIcon\'}"\n\t\t\t\t\t\t\t\t\tdescription="{path:\'description>FileSize\',formatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatAttachmentSize\'}"\n\t\t\t\t\t\t\t\t\ticonInset="false">\n\t\t\t\t\t\t\t\t</StandardListItem>\n\t\t\t\t\t\t\t</List>\n\n\t\t\t\t\t\t</content>\n\t\t\t\t\t</IconTabFilter>\n\n\t\t\t\t\t<IconTabFilter icon="sap-icon://group" iconColor="Default" expandable="true" expanded="true"\n\t\t\t\t\t\tkey="approver" visible="{path:\'description>/SCAApproverHeader/results\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.arrayVisibilityCheck\' }" id="approveTab" showAll="false"\n\t\t\t\t\t\tcount="{path:\'description>/SCAApproverHeader/results\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.getTotalValue\'}">\n\t\t\t\t\t\t<content id="Approval">\n\t\t\t\t\t\t\t<List id="Approval_list" items="{description>/SCAApproverHeader/results}"\n\t\t\t\t\t\t\t\tmode="SingleSelectMaster" showSeparators="None" inset="false">\n\t\t\t\t\t\t\t\t<items>\n\t\t\t\t\t\t\t\t\t<FeedListItem sender="{path:\'description>ApproverFullName\'}"  \n\t\t\t\t\t\t\t\t\t\tid="approverDet" iconActive="false" iconPress="onApproverPress"\n\t\t\t\t\t\t\t\t\t\tsenderPress="onApproverPress" senderActive="true"\n\t\t\t\t\t\t\t\t\t\ttext="{description>ApprovalStatus}">\n\t\t\t\t\t\t\t\t\t</FeedListItem>\n\t\t\t\t\t\t\t\t</items>\n\t\t\t\t\t\t\t</List>\n\t\t\t\t\t\t</content>\n\t\t\t\t\t</IconTabFilter>\n\t\t\t\t</items>\n\t\t\t</IconTabBar>\n\n\t\t\t<Table id="itemList" items="{description>/SCAItem/results}" updateFinished="onItemsLoaded" growing="true" growingScrollToLoad="true" growingThreshold="500"\n\t\t\t\theaderText="{ path: \'description>/NumberOfItems\', formatter: \'ui.s2p.srm.sc.approve.util.Formatter.formatItemHeader\'}">\n\t\t\t\t<columns>\n\t\t\t\t\t<Column visible="false" hAlign="Left" minScreenWidth="tablet"\n\t\t\t\t\t\tdemandPopin="true">\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<Label textAlign="Left" weight="5"></Label>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t</Column>\n\t\t\t\t\t<Column hAlign="Left">\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<Label text="{i18n>DESCRIPTION}" textAlign="Left" weight="5"></Label>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t</Column>\n\t\t\t\t\t<Column hAlign="Left" minScreenWidth="tablet" demandPopin="true">\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<Label text="{i18n>QUANTITY_LBL}" textAlign="Right" weight="5"></Label>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t</Column>\n\t\t\t\t\t<Column hAlign="Left" minScreenWidth="tablet" demandPopin="true">\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<Label id="SCC_SUB_TOTAL" text="{i18n>SUB_TOTAL_HEADER}"\n\t\t\t\t\t\t\t\ttextAlign="Right" weight="5"></Label>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t</Column>\n\t\t\t\t</columns>\n\t\t\t\t<items>\n\t\t\t\t\t<ColumnListItem press="moveToItemDetail" type="Navigation"\n\t\t\t\t\t\tunread="true" counter="0" id="itemListDetail">\n\t\t\t\t\t\t<cells>\n\t\t\t\t\t\t\t<Switch id="approve_reject" enables="true" change="onItemApproveChange"\n\t\t\t\t\t\t\t state="true" type="AcceptReject" class="soc-table-elem-align"\n\t\t\t\t\t\t\t\tvisible="{path:\'description>ApprovalOnItemlevel\',\n\t\t\t\t\t\t    \t  formatter :\'ui.s2p.srm.sc.approve.util.Formatter.switchVisible\' }"></Switch>\n\t\t\t\t\t\t    \n\t\t\t\t\t\t\t<ObjectIdentifier title="{description>Description}" \n\t\t\t\t\t\t\t\tbadgeNotes="{path : \'description>NumberOfNotesItm\',\n\t\t\t\t\t\t\t   formatter : \'ui.s2p.srm.sc.approve.util.Formatter.badgeVisible\'}"\n\t\t\t\t\t\t\t\tbadgeAttachments="{path : \'description>NumberOfAttachmentsItm\',\n\t\t\t\t\t\t\t   formatter : \'ui.s2p.srm.sc.approve.util.Formatter.badgeVisible\'}"></ObjectIdentifier>\n\n\t\t\t\t\t\t\t<ObjectNumber id="quantity" \n\t\t\t\t\t\t\t\tnumber="{path:\'description>Quantity\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.getQuantity\'}"\n\t\t\t\t\t\t\t\tnumberUnit="{description>UnitText}"></ObjectNumber>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<ObjectNumber \n\t\t\t\t\t\t\t\tnumber="{path:\'description>Value\',formatter :\'ui.s2p.srm.sc.approve.util.Formatter.formatCurrencyValue\'}" numberUnit="{description>Currency}"></ObjectNumber>\n\t\t\t\t\t\t</cells>\n\t\t\t\t\t</ColumnListItem>\n\n\t\t\t\t</items>\n\t\t\t</Table>\n\t\t</content>\n\t\t<footer>\n\t\t\t<Bar id="detailFooter">\n\t\t\t</Bar>\n\t\t</footer>\n\t</Page>\n\n</core:View>',
	"ui/s2p/srm/sc/approve/view/itemDetail.controller.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");
jQuery.sap.require("ui.s2p.srm.sc.approve.util.ItemList");
jQuery.sap.require("ui.s2p.srm.sc.approve.util.ObjectCache");
jQuery.sap.require("sap.ca.ui.quickoverview.EmployeeLaunch");

sap.ca.scfld.md.controller.BaseDetailController.extend("ui.s2p.srm.sc.approve.view.itemDetail", {

	onInit: function() {
		//execute the onInit for the base class BaseDetailController
		sap.ca.scfld.md.controller.BaseDetailController.prototype.onInit.call(this);

		// Get instance of the busy dialog
		this.busyDialog = new sap.m.BusyDialog();

		//Setting the Navigate back visible true for moving back to S3 controller
		this.getView().byId("itemHeader").setShowNavButton(true);

		// Get instance of the Page cache.
		this.oPageCache = ui.s2p.srm.sc.approve.util.ObjectCache.getInstance();

		this.new_oDataModel = this.oApplicationFacade.getODataModel("CARTAPPROVAL_STANDARD");
		this.count = 0;

		this.oRouter.attachRouteMatched(function(oEvent) {
			if (oEvent.getParameter("name") === "detailItem") {
				//Get parameters from S3 controller
				var wID = oEvent.getParameter("arguments").workItemId;
				this.itemIndex = parseInt(oEvent.getParameter("arguments").itemIndex);
				var itemNumber = oEvent.getParameter("arguments").itemNumber;
				var scNumber = oEvent.getParameter("arguments").scNumber;
				var oServerName = oEvent.getParameter("arguments").servername;
				this.oServer = oServerName;

				// this.count++;
				// if (this.count == 1) {
				// 	var ServerName = this.oServer.substring(1, this.oServer.length - 1);
				// 	this.new_oDataModel.sServiceUrl = this.new_oDataModel.sServiceUrl + ServerName;
				// }
				//start the busy dialog now
				this.busyDialog.open();
				//Read details of a particular item
				//Added scnumber, itemnumber for fiori performance improvement
				this.readContent(false, wID, oServerName, scNumber, itemNumber);
				//Set header footer for up/down arrows
				this.initHeaderFooter(wID);
			}
		}, this);
	},

	//Read details of a particular item by calling a service
	readContent: function(bForce, wId, oServerName, scNumber, itemNumber) {
		var onRequestSuccess = function(oData, oResponse) {
			this.itemObj = oData;
			//Call a binding for view
			this.bindView();
		};

		var oDataModel = this.oApplicationFacade.getODataModel();
		oDataModel.read("SCAItemCollection(SAP__Origin=" + oServerName + ",WorkitemID='" + wId + "',ScNumber='" + scNumber + "',ItemNumber='" +
			itemNumber + "')", null, ["$expand=SCAAccounting,SCAAttachmentItem,SCANoteItem,SCAApproverItem"], true,
			jQuery.proxy(onRequestSuccess, this), jQuery.proxy(this.onRequestFailed, this));
	},

	onRequestFailed: function(oError) {
		//close the busy dialog first
		this.busyDialog.close();
		jQuery.sap.require("sap.ca.ui.message.message");
		sap.ca.ui.message.showMessageBox({
			type: sap.ca.ui.message.Type.ERROR,
			message: oError.message,
			details: oError.response.body
		});
	},

	/*
	 * Initialize the back button, item navigation buttons etc. 
	 */
	initHeaderFooter: function(wId) {
		var that = this;
		if (ui.s2p.srm.sc.approve.util.ItemList.item.length() == 0) {
			var onRequestSuccess = function(oData, oRespose) {
				for (var i = 0; i < oData.SCAItem.results.length; i++) {
					ui.s2p.srm.sc.approve.util.ItemList.item.add(oData.SCAItem.results);
					this.oHeaderFooterOptions.oUpDownOptions.iPosition = ui.s2p.srm.sc.approve.util.ItemList.item.getIndex(that.itemIndex);
					this.oHeaderFooterOptions.oUpDownOptions.iCount = ui.s2p.srm.sc.approve.util.ItemList.item.length();

					this.setHeaderFooterOptions(this.oHeaderFooterOptions);
				}
			};
			var onRequestFailed = function(oError) {
				//close the busy dialog first
				this.busyDialog.close();
				jQuery.sap.require("sap.ca.ui.message.message");
				sap.ca.ui.message.showMessageBox({
					type: sap.ca.ui.message.Type.ERROR,
					message: oError.message,
					details: oError.response.body
				});
			};
			var serverName = that.oServer;
			var oDataModel = this.oApplicationFacade.getODataModel();
			oDataModel.read("WorkflowTaskCollection(SAP__Origin=" + serverName + ",WorkitemID='" + wId + "')/SCAHeader", null, [
					"$expand=SCAAttachmentHeader,SCANoteHeader,SCAApproverHeader,SCAItem/SCAAttachmentItem,SCAItem/SCANoteItem"
				], true,
				jQuery.proxy(onRequestSuccess, this), jQuery.proxy(onRequestFailed, this));

		}
		this.oHeaderFooterOptions = {
			onBack: function(oEvent) {
				var wId = that.itemObj.WorkitemID;
				var serverName = that.oServer;
				that.new_oDataModel.sServiceUrl = "/sap/opu/odata/GBSRM/CARTAPPROVAL;v=2;o=";
				var path = "WorkflowTaskCollection(SAP__Origin=" + serverName + ",WorkitemID='" + wId + "')";
				that.oRouter.navTo("detail", {
					contextPath: path
				}, true);
			},
			oUpDownOptions: {
				sI18NDetailTitle: "ITEM_DETAIL_HEADER",
				iPosition: 0,
				iCount: 0,
				fSetPosition: function(iNewPosition) {
					if ((iNewPosition >= 0) && (iNewPosition < ui.s2p.srm.sc.approve.util.ItemList.item.length())) {
						//Added scnumber, itemnumber for fiori performance improvement and also calling detailitem view on click of up and down arrow
						that.workItemId = ui.s2p.srm.sc.approve.util.ItemList.item.getWorkItemId(iNewPosition);
						that.scNumber = ui.s2p.srm.sc.approve.util.ItemList.item.getSCNumber(iNewPosition);
						that.scItemNumber = ui.s2p.srm.sc.approve.util.ItemList.item.getSCItemNumber(iNewPosition);
						that.oRouter.navTo("detailItem", {
							workItemId: that.workItemId,
							itemIndex: iNewPosition,
							itemNumber: that.scItemNumber,
							scNumber: that.scNumber,
							servername: that.oServer
						}, true);
					}
				}
			}
		};

		this.oHeaderFooterOptions.oUpDownOptions.iPosition = ui.s2p.srm.sc.approve.util.ItemList.item.getIndex(that.itemIndex);
		this.oHeaderFooterOptions.oUpDownOptions.iCount = ui.s2p.srm.sc.approve.util.ItemList.item.length();

		//A scaffolding function for setting the header footer custom function
		this.setHeaderFooterOptions(this.oHeaderFooterOptions);

		/**
		 * @ControllerHook Extension hook for adding buttons on header  
		 * This hook can be used to add buttons on header through extensibility
		 * @callback sap.ca.scfld.md.controller.BaseDetailController~extHook3
		 * @return {model}  ...
		 */

		if (this.extHook3) {
			this.extHook3();
		};
	},

	bindView: function() {
		this.getApproveRejectData();
		var itemDetailData = this.itemObj;
		var oModelDetail = new sap.ui.model.json.JSONModel(itemDetailData);
		this.getView().setModel(oModelDetail, "itemDetailData");

		//check for "Delivery date" and "Delivery Required"
		if ((oModelDetail.oData.DeliveryDate == "" || oModelDetail.oData.DeliveryDate == null) && oModelDetail.oData.DeliveryPeriodFrom &&
			oModelDetail.oData.DeliveryPeriodTo) {
			var deliveryText = this.oApplicationFacade.getResourceBundle().getText("DELIVERY_REQUIRED");
			this.getView().byId("delivery").setText(deliveryText);
		}

		this.initHeaderFooter(this.itemObj.WorkitemID);
		//close the busy dialog first
		this.busyDialog.close();
	},

	//Show Business Card on click of a name.
	handleUserNameClick: function(oControl, eId) {
		//Get the Picture of the employee if exists
		var oPicture = this.formatEmployee(eId);
		var onRequestSuccess = function(oData, oRespose) {
			var oEmployee = {
				imgurl: oPicture,
				name: oData.results[0].FullName,
				department: "",
				contactmobile: oData.results[0].MobilePhone,
				contactphone: oData.results[0].WorkPhone,
				companyname: oData.results[0].CompanyName,
				contactemail: oData.results[0].EMail,
				contactemailsubj: "",
				companyaddress: oData.results[0].AddressString
			};

			//call 'Business Card' reuse component
			var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(oEmployee);
			oEmployeeLaunch.openBy(oControl);
		};

		//var obj=this.oApplicationFacade.getODataModel().sServiceUrl;
		//Since the service uses the backend service name, a concatenation of its name to service URL done
		//this.oApplicationFacade.getODataModel().sServiceUrl = obj.split(";")[0]+";v=2;mo";
		var oDataModel = this.oApplicationFacade.getODataModel();
		//Service read for User Details retrieval
		oDataModel.read("UserDetailsCollection", null, ["$filter=UserID eq '" + eId + "' and SAP__Origin eq " + this.oServer], false,

			jQuery.proxy(onRequestSuccess, this),
			jQuery.proxy(this.onRequestFailed, this));
	},

	//Get Employee's Picure 
	formatEmployee: function(ApproverID) {
		var oVar = "";
		var oServerName = this.oServer.replace(/'/g, "");
		//var oModel = this.oApplicationFacade.getODataModel();

		var fnSuccess = function(oData, oResponse) {
			if (oResponse.body.length === 0) {
				oVar = jQuery.sap.getModulePath("ui.s2p.srm.sc.approve") + "/img/" + "person_placeholder.png";
			} else {
				oVar = oResponse.requestUri;
			}
			//oModel.sServiceUrl = oModel.sServiceUrl .split(";")[0]+";v=2;mo";
		};

		var fnError = function(oError) {
			oVar = jQuery.sap.getModulePath("ui.s2p.srm.sc.approve") + "/img/" + "person_placeholder.png";
			//oModel.sServiceUrl = oModel.sServiceUrl .split(";")[0]+";v=2;mo";
		};

		this.new_oDataModel.sServiceUrl = this.new_oDataModel.sServiceUrl.split(";")[0] + ";v=2;o=" + oServerName;
		this.new_oDataModel.read("UserDetailsCollection('" + ApproverID + "')/$value", null, null, false, jQuery.proxy(fnSuccess, this),
			jQuery.proxy(fnError, this));

		return oVar;
	},

	//On click of the attachment 
	onAttachment: function(oEvent) {
		var index = parseInt(oEvent.getSource().getBindingContextPath().split('/')[3]);
		var URL = this.itemObj.SCAAttachmentItem.results[index].__metadata.media_src;
		// replace absolute URL with relative path to attachment
		var aURL = URL.split("/");
		var sAttachmentURL = "";

		var sURLIndex = aURL.indexOf("GBSRM") - 3;
		for (var i = sURLIndex; i < aURL.length; i++) {
			sAttachmentURL = sAttachmentURL + "/" + aURL[i];
		}
		ui.s2p.srm.sc.approve.util.Formatter.showAttachment(sAttachmentURL);
	},

	//On click of the approver's name
	onApproverPress: function(oEvent) {
		if (oEvent.getSource().getModel('itemDetailData')) {
			var ind = parseInt(oEvent.getSource().getBindingContextPath().split('/')[3]);
			var arr = this.itemObj.SCAApproverItem.results;
			var selectedlistid = oEvent.getParameters().id;
			var oControl = this.getView().byId(selectedlistid);
			this.handleUserNameClick(oControl, arr[ind].ApproverID);
		}
	},

	//On click of the person's name
	onNotePersonPress: function(oEvent) {
		if (oEvent.getSource().getModel('itemDetailData')) {
			var ind = parseInt(oEvent.getSource().getBindingContextPath().split('/')[3]);
			var arr = this.itemObj.SCANoteItem.results;
			var oControl = this.getView().byId("NotesDetail");
			this.handleUserNameClick(oControl, arr[ind].CreatedByID);
		}
	},

	//Get the approved/rejected status in object header
	getApproveRejectData: function() {
		var acceptRejectStatus = true;
		if (this.oPageCache.getValue(this.itemIndex) == false) {
			acceptRejectStatus = this.oPageCache.getValue(this.itemIndex);
		}
		if (this.itemObj) {
			if (this.itemObj.ApprovalOnItemlevel != "") {
				if (acceptRejectStatus) {
					this.getView().byId('approveRejectIcon').setIcon("sap-icon://accept").setState("Success");
				} else {
					this.getView().byId('approveRejectIcon').setIcon("sap-icon://decline").setState("Error");
				}
			} else {
				this.getView().byId('approveRejectIcon').setIcon("");
			}
		}
	}
});
},
	"ui/s2p/srm/sc/approve/view/itemDetail.view.xml":'<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<core:View xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:mvc="sap.ui.core.mvc"\n    xmlns:sap.ui.layout.form="sap.ui.layout.form"\n\txmlns:sap.ui.layout="sap.ui.layout" xmlns:sap.ui.core.mvc="sap.ui.core.mvc"\n\txmlns:sap.ui.core="sap.ui.core" controllerName="ui.s2p.srm.sc.approve.view.itemDetail">\n\t<Page showNavButton="true" id="itemHeader" navButtonTap="_navBack">\n\t\t<content>\n\t\t\t<ObjectHeader id="DetailItemHeader" title="{itemDetailData>/Description}"\n\t\t\t\tnumber="{parts:[{path:\'itemDetailData>/Value\'}],\n\t\t\t\tformatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatCurrencyValue\'}"\n\t\t\t\tnumberUnit="{itemDetailData>/Currency}" titleActive="false">\n\t\t\t\t<firstStatus>\n\t\t\t\t\t<ObjectStatus id="approveRejectIcon"></ObjectStatus>\n\t\t\t\t</firstStatus> \n\t\t\t\t<attributes>\n\t\t\t\t\t<ObjectAttribute\n\t\t\t\t\t\ttext="{parts:[{path:\'itemDetailData>/Quantity\'},{path:\'itemDetailData>/UnitText\'}], formatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatQuantity\'}"></ObjectAttribute>\n\t\t\t\t\t<ObjectAttribute\n\t\t\t\t\t\ttext="{parts:[{path:\'itemDetailData>/Price\'},{path:\'itemDetailData>/Currency\'},{path:\'itemDetailData>/PriceUnit\'},{path:\'itemDetailData>/UnitText\'},{path:\'itemDetailData>/LimitValue\'},{path:\'itemDetailData>/HaveUnlimitedValue\'}],\n\t\t\t\t\t\tformatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatPrice\'}"></ObjectAttribute>\n\t\t\t\t\t\t\n\t\t\t\t\t\t<!-- extension point for attributes -->\n\n\t\t\t\t\t\t\t<core:ExtensionPoint name="extMoreInfo2"></core:ExtensionPoint>\n\t\t\t\t</attributes>\n\t\t\t</ObjectHeader>\n\n\t\t\t<sap.ui.layout.form:SimpleForm id="infoForm"\n\t\t\t\tminWidth="1024" editable="false">\n\t\t\t\t<sap.ui.layout.form:content>\n\t\t\t\t\t<sap.ui.core:Title text="{i18n>ITEM_HEADER}"></sap.ui.core:Title>\n\n\t\t\t\t\t<Label id="categoryName"\n\t\t\t\t\t\ttext="{path:\'itemDetailData>/ItemType\', formatter : \'ui.s2p.srm.sc.approve.util.Formatter.formatCatName\'}"\n\t\t\t\t\t\tvisible="{path:\'itemDetailData>/Description\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.showElementOnUi\'}">\n\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\tminWidth="192" weight="3"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t</Label>\n\t\t\t\t\t<Text id="categoryNameText" text="{itemDetailData>/Description}"\n\t\t\t\t\t\tvisible="{path:\'itemDetailData>/Description\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.showElementOnUi\'}"\n\t\t\t\t\t\tmaxLines="0">\n\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\tweight="5"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t</Text>\n\n\t\t\t\t\t<Label id="categoryType"\n\t\t\t\t\t\ttext="{path:\'itemDetailData>/ItemType\', formatter : \'ui.s2p.srm.sc.approve.util.Formatter.formatCatType\'}"\n\t\t\t\t\t\tvisible="{path:\'itemDetailData>/CategoryDescription\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.showElementOnUi\'}">\n\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\tminWidth="192" weight="3"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t</Label>\n\t\t\t\t\t<Text id="categoryTypeText"\n\t\t\t\t\t\tvisible="{path:\'itemDetailData>/CategoryDescription\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.showElementOnUi\'}"\n\t\t\t\t\t\ttext="{parts:[{path:\'itemDetailData>/CategoryDescription\'},{path:\'itemDetailData>/CategoryNumber\'}], formatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatCategory\'}"\n\t\t\t\t\t\tmaxLines="0">\n\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\tweight="5"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t</Text>\n\n\t\t\t\t\t<Label id="supplier" text="{i18n>SUPPLIER}"\n\t\t\t\t\t\tvisible="{path:\'itemDetailData>/VendorName\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.showElementOnUi\'}">\n\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\tminWidth="192" weight="3"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t</Label>\n\t\t\t\t\t<Text id="supplierText" text="{itemDetailData>/VendorName}"\n\t\t\t\t\t\tmaxLines="0"\n\t\t\t\t\t\tvisible="{path:\'itemDetailData>/VendorName\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.showElementOnUi\'}">\n\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\tweight="5"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t</Text>\n\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t<!-- Delivery details -->\n\t\t\t\t\t<Label text="{i18n>DELIVERY_DATE}" id="delivery">\n\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\tminWidth="192" weight="3"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t</Label>\n\t\t\t\t\t<Text text="{parts : [{path:\'itemDetailData>/DeliveryDate\'},{path:\'itemDetailData>/DeliveryPeriodFrom\'},\n\t\t\t\t\t\t\t\t\t\t{path:\'itemDetailData>/DeliveryPeriodTo\'}],\n\t\t\t\t\t\t\t\t\t\tformatter:\'ui.s2p.srm.sc.approve.util.Formatter.showDeliveryDateHeader\'}"\n\t\t\t\t\t\tid="addressTxt" maxLines="0">\n\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\tweight="5"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t</Text>\n\t\t\t\t\t\n\t\t\t\t\t<Label text="{i18n>DELIVERY_ADDRESS}" id="address"\n\t\t\t\t\t\tvisible="{path:\'itemDetailData>/DeliveryAddress/AddressString\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.showElementOnUi\'}">\n\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\tminWidth="192" weight="3"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t</Label>\n\t\t\t\t\t<Text text="{itemDetailData>/DeliveryAddress/AddressString}"\n\t\t\t\t\t\tvisible="{path:\'itemDetailData>/DeliveryAddress/AddressString\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.showElementOnUi\'}"\n\t\t\t\t\t\tid="addressText" maxLines="0">\n\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\tweight="5"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t</Text>\n\t\t\t\t\t<Label text="{i18n>VALUE_LIMIT}" id="val"\n\t\t\t\t\t\tvisible="{path:\'itemDetailData>/LimitValue\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatValue\'}">\n\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\tminWidth="192" weight="3"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t</Label>\n\t\t\t\t\t<Text text="{itemDetailData>/LimitValue}"\n\t\t\t\t\t\tvisible="{path:\'itemDetailData>/LimitValue\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatValue\'}"\n\t\t\t\t\t\tid="Value" maxLines="0">\n\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\tweight="5"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t</Text>\n\t\t\t\t\t\t<Label text="{i18n>EXP_VALUE}" id="expval"\n\t\t\t\t\t\tvisible="{path:\'itemDetailData>/ExpectedValue\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatValue\'}">\n\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\tminWidth="192" weight="3"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t</Label>\n\t\t\t\t\t<Text text="{itemDetailData>/ExpectedValue}"\n\t\t\t\t\t\tvisible="{path:\'itemDetailData>/ExpectedValue\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatValue\'}"\n\t\t\t\t\t\tid="expValue" maxLines="0">\n\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\tweight="5"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t</Text>\n\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t<!-- extension point for attributes -->\n\n\t\t\t\t\t\t\t<core:ExtensionPoint name="extMoreInfo3"></core:ExtensionPoint>\n\t\t\t\t</sap.ui.layout.form:content>\n\t\t\t</sap.ui.layout.form:SimpleForm>\n\n\t\t\t<List id="NotesDetail"\n\t\t\t\titems="{itemDetailData>/SCANoteItem/results}"\n\t\t\t\tvisible="{path:\'itemDetailData>/NumberOfNotesItm\', formatter :\'ui.s2p.srm.sc.approve.util.Formatter.valueVisibilityCheck\'}"\n\t\t\t\theaderText="{path:\'itemDetailData>/SCANoteItem/results/NumberOfNotesItm\', formatter :\'ui.s2p.srm.sc.approve.util.Formatter.setNoteText\'}"\n\t\t\t\tmode="SingleSelectMaster" showSeparators="None">\n\t\t\t\t<items>\n\t\t\t\t\t<FeedListItem sender="{itemDetailData>CreatedByName}"\n\t\t\t\t\t\tshowIcon="false" senderPress="onNotePersonPress" senderActive="true"\n\t\t\t\t\t\ttext="{itemDetailData>Text}" info="{itemDetailData>TypeDescription}"\n\t\t\t\t\t\ttimestamp="{path:\'itemDetailData>CreatedAt\',type:\'sap.ui.model.type.Date\', formatOptions: {style:\'medium\'}}">\n\t\t\t\t\t</FeedListItem>\n\t\t\t\t</items>\n\t\t\t</List>\n\n\t\t\t<List id="AttachmentDetailData"\n\t\t\t\titems="{itemDetailData>/SCAAttachmentItem/results}"\n\t\t\t\tvisible="{path:\'itemDetailData>/NumberOfAttachmentsItm\', formatter :\'ui.s2p.srm.sc.approve.util.Formatter.valueVisibilityCheck\'}"\n\t\t\t\theaderText="{path:\'itemDetailData>/NumberOfAttachmentsItm\',  formatter :\'ui.s2p.srm.sc.approve.util.Formatter.setAttachmentText\'}"\n\t\t\t\tshowSeparators="None">\n\t\t\t\t<StandardListItem press="onAttachment" type="Active"\n\t\t\t\t\ttitle="{itemDetailData>Description}"\n\t\t\t\t\ticon="{path:\'itemDetailData>MimeType\',formatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatAttachmentIcon\'}"\n\t\t\t\t\tdescription="{path:\'itemDetailData>FileSize\',formatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatAttachmentSize\'}"\n\t\t\t\t\ticonInset="false">\n\t\t\t\t</StandardListItem>\n\t\t\t</List>\n\n\t\t\t<sap.ui.layout.form:SimpleForm id="deliveryAddressForm"\n\t\t\t\tminWidth="1024" editable="false">\n\t\t\t\t<sap.ui.layout.form:content>\n\t\t\t\t\t<!-- extension point for attributes -->\n\n\t\t\t\t\t\t\t<core:ExtensionPoint name="extMoreInfo4"></core:ExtensionPoint>\n\t\t\t\t</sap.ui.layout.form:content>\n\t\t\t</sap.ui.layout.form:SimpleForm>\n\t\t\t\n\t\t\t<Table id="tableHeader" items="{itemDetailData>/SCAAccounting/results}"\n\t\t\t\tvisible="{path:\'itemDetailData>/SCAAccounting/results\', formatter :\'ui.s2p.srm.sc.approve.util.Formatter.arrayVisibilityCheck\'}"\n\t\t\t\theaderText="{path:\'itemDetailData>/SCAAccounting/results\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.setAccountAssignmentText\'}">\n\t\t\t\t<columns>\n\t\t\t\t\t<Column hAlign="Left" minScreenWidth="tablet" demandPopin="true">\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<Label text="{i18n>DESCRIPTION}" textAlign="Left"></Label>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t</Column>\n\t\t\t\t\t<Column hAlign="Left" minScreenWidth="tablet" demandPopin="true">\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<Label text="{i18n>CATEGORY}" textAlign="Left"></Label>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t</Column>\n\t\t\t\t\t<Column hAlign="Left" minScreenWidth="tablet" demandPopin="true">\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<Label id="GL_ACC" text="{i18n>GL_ACC}" textAlign="Left"></Label>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t</Column>\n\t\t\t\t\t<Column hAlign="Left" minScreenWidth="tablet" demandPopin="true">\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<Label id="SHARE" text="{i18n>SHARE}" textAlign="Left"></Label>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t</Column>\n\t\t\t\t\t<!-- extension point for attributes -->\n\n\t\t\t\t\t\t\t<core:ExtensionPoint name="extMoreInfo5"></core:ExtensionPoint>\n\t\t\t\t</columns>\n\t\t\t\t<items>\n\t\t\t\t\t<ColumnListItem  unread="true" counter="0"\n\t\t\t\t\t\tid="itemListDetail">\n\t\t\t\t\t\t<cells id="itemList">\n\t\t\t\t\t\t\t<ObjectIdentifier id="ob1"\n\t\t\t\t\t\t\t\ttitle="{parts:[{path:\'itemDetailData>AccountDescription\'},{path:\'itemDetailData>AccountNumber\'}], formatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatCategory\'}"></ObjectIdentifier>\n\t\t\t\t\t\t\t<Text id="ob2"\n\t\t\t\t\t\t\t\ttext="{itemDetailData>AccountCategoryDescription}"/>\n\t\t\t\t\t\t\t<Text id="ob3"\n\t\t\t\t\t\t\t\ttext="{parts:[{path:\'itemDetailData>GlAccountDescription\'},{path:\'itemDetailData>GlAccountNumber\'}],formatter:\'ui.s2p.srm.sc.approve.util.Formatter.formatCategory\'}"/>\n\t\t\t\t\t\t\t<ObjectNumber id="ob4"\n\t\t\t\t\t\t\t\tnumber="{path:\'itemDetailData>DistributionPercentage\',\n\t\t\t\t\t\t\t\t\tformatter : \'ui.s2p.srm.sc.approve.util.Formatter.formatPercentages\'}">\n\t\t\t\t\t\t\t</ObjectNumber>\n\t\t\t\t\t\t\t<!-- <ObjectIdentifier id="ob5"></ObjectIdentifier> -->\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<!--  extension point for attributes -->\n\n\t\t\t\t\t\t\t<core:ExtensionPoint name="extMoreInfo6"></core:ExtensionPoint>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</cells>\n\t\t\t\t\t</ColumnListItem>\n\t\t\t\t</items>\n\t\t\t</Table>\n\n\t\t\t<List id="Approval_list" items="{itemDetailData>/SCAApproverItem/results}"\n\t\t\t\tmode="SingleSelectMaster" showSeparators="None"\n\t\t\t\theaderText="{path:\'itemDetailData>/SCAApproverItem/results\',formatter :\'ui.s2p.srm.sc.approve.util.Formatter.setApproverText\'}"\n\t\t\t\tvisible="{path:\'itemDetailData>/SCAApproverItem/results\', formatter:\'ui.s2p.srm.sc.approve.util.Formatter.arrayVisibilityCheck\'}">\n\t\t\t\t<items>\n\t\t\t\t\t<FeedListItem sender="{path:\'itemDetailData>ApproverFullName\'}"\n\t\t\t\t\t\tid="approverDet" iconActive="false" senderActive="true"\n\t\t\t\t\t\ticon="{path : \'itemDetailData>ApproverID\', formatter: \'.formatEmployee\'}"\n\t\t\t\t\t\ticonPress="onApproverPress" senderPress="onApproverPress"\n\t\t\t\t\t\ttext="{itemDetailData>ApprovalStatus}">\n\t\t\t\t\t</FeedListItem>\n\t\t\t\t</items>\n\t\t\t</List>\n\n\t\t</content>\n\t</Page>\n</core:View>'
}});
