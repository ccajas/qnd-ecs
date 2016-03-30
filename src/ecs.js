
'use strict';

//// Component ////

/**
 * An Entity Component
 * @class
 * @name Component
 */

/**
 * Component constructor
 *
 * @memberOf Component
 * @param {number} type Component type ID
 * @param {number} [id] ID of the entity this belongs to
 */

function Component(type, id)
{
	Object.defineProperty(
		this, '_typeID', 
		{
  			configurable: false,
  			writable: false,
  			value: 1 << type
		}
	);
	this._entityID = id || -1;
	this.live = false;
}

/**
 * Clones a Component
 *
 * @memberOf Component
 * @return the cloned Component
 */

Component.prototype.clone = function()
{
	// JSON trick to quickly clone
	return (JSON.parse(JSON.stringify(this)));
}

//// EntitySystem ////

/**
 * @class base System object
 * @name EntitySystem
 */

/**
 * System construtor
 *
 * @memberOf EntitySystem
 */

function EntitySystem(handle)
{
	this.handle = handle;
	this.validEntity = 0;
}

/**
 * Static variable holding total no. of live entities
 *
 * @memberOf EntitySystem
 */

EntitySystem.totalEntities = 0;

/**
 * Base System initialization
 *
 * @memberOf EntitySystem
 * @param {Number} total the starting number of live entities
 * @param {Object} components object containing arrays of Components
 */

EntitySystem.prototype.init = function(total)
{
	// init stuff
}

/**
 * Helper function to iterate though live entities
 *
 * @memberOf EntitySystem
 * @param {Function} func callback function for processing entities
 */

EntitySystem.prototype.forEachEntity = function(func)
{
	for (var i = 0; i < EntitySystem.totalEntities; i++) func(i, this);
}

/**
 * Process Components and update entity count. 
 * Must be called after child EntitySystem process method
 *
 * @memberOf EntitySystem
 * @param {Number} dt elapsed time, in seconds
 */

EntitySystem.prototype.process = function(dt) 
{ 
	return EntitySystem.totalEntities;
}
