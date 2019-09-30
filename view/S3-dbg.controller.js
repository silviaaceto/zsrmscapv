/*
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