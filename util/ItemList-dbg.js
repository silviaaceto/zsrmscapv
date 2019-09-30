/*
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
