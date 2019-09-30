/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("ui.s2p.srm.sc.approve.util.ItemList");ui.s2p.srm.sc.approve.util.ItemList={};ui.s2p.srm.sc.approve.util.ItemList.item=(function(){var a=[];return{add:function(b){this.clear();for(var i=0;i<b.length;i++){a.push({item:b[i].WorkitemID,index:i,scnumber:b[i].ScNumber,itemnumber:b[i].ItemNumber});}},each:function(c){for(var i=0;i<a.length;i++){c(a[i].item);}},length:function(){return a.length;},clear:function(){a=[];},getIndex:function(i){return i;},getItemAtIndex:function(i){return a[i].item;},getWorkItemId:function(i){return a[i].item;},getSCNumber:function(i){return a[i].scnumber;},getSCItemNumber:function(i){return a[i].itemnumber;}};})();
