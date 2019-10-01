/*
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