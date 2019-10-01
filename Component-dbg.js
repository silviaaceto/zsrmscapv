/*
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