
//// Component ////

/**
 * An Entity Component
 * @class
 * @name Component
 */

'use strict';

/**
 * Component constructor
 *
 * @memberOf Component
 * @param {number} [id] ID of the entity this belongs to
 */

function Component(type, id)
{
	this.entityID = id || 0;
	this.live = true;
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
	this.totalEntities = 0;
}

/**
 * Base System initialization
 *
 * @memberOf EntitySystem
 * @param {Number} total the starting number of live entities
 * @param {Object} components object containing arrays of Components
 */

EntitySystem.prototype.init = function(total, components)
{
	// init stuff
	this.totalEntities = total;
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

}

