/*
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
