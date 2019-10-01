/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
(function () {
	"use strict";
	jQuery.sap.declare("ui.s2p.srm.sc.approve.Component");
	jQuery.sap.require("sap.ca.scfld.md.ComponentBase");
	sap.ca.scfld.md.ComponentBase.extend("ui.s2p.srm.sc.approve.Component", {
		metadata: sap.ca.scfld.md.ComponentBase.createMetaData("MD", {
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
		createContent: function () {
			var v = {
					component: this
				},
				V = sap.ui.view({
					viewName: "ui.s2p.srm.sc.approve.Main",
					type: sap.ui.core.mvc.ViewType.XML,
					viewData: v
				}),
				p = V.getId() + "--",
				e = sap.ui.getCore().getEventBus();
			this.oEventBus = {
				publish: function (c, a, d) {
					c = p + c;
					e.publish(c, a, d);
				},
				subscribe: function (c, a, d, l) {
					c = p + c;
					e.subscribe(c, a, d, l);
				},
				unsubscribe: function (c, a, d, l) {
					c = p + c;
					e.unsubscribe(c, a, d, l);
				}
			};
			return V;
		}
	});
}());