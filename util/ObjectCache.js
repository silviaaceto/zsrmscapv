/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("ui.s2p.srm.sc.approve.util.ObjectCache");
ui.s2p.srm.sc.approve.util.ObjectCache=function(){this._id=null;this._length=0;this._keyValueMap={};};
ui.s2p.srm.sc.approve.util.ObjectCache.prototype.isEmpty=function(){return(this._length===0);};
ui.s2p.srm.sc.approve.util.ObjectCache.prototype.clear=function(){this._keyValueMap={};this._length=0;};
ui.s2p.srm.sc.approve.util.ObjectCache.prototype.setId=function(i){this._id=i;};
ui.s2p.srm.sc.approve.util.ObjectCache.prototype.getId=function(){return this._id;};
ui.s2p.srm.sc.approve.util.ObjectCache.prototype.setKey=function(k,v){if(!this._keyValueMap.hasOwnProperty(k)){this._length++;}this._keyValueMap[k]=v;};
ui.s2p.srm.sc.approve.util.ObjectCache.prototype.getValue=function(k){if(!this._keyValueMap.hasOwnProperty(k)){return undefined;}return this._keyValueMap[k];};
(function(){var i=new ui.s2p.srm.sc.approve.util.ObjectCache();ui.s2p.srm.sc.approve.util.ObjectCache.getInstance=function(){return i;};}());
