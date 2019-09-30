/*
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