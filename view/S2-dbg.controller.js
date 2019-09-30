/*
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