
'use strict'

/**
 * Component type definitions
 */

Position._typeID = 0;
Velocity._typeID = 1;

//// Position ////

/**
 * A Position component
 * @class
 * @name Position
 */

/**
 * Position constructor
 *
 * @memberOf Position
 * @param {number}  [id] ID of the entity this belongs to
 * @param {boolean} [live] default live state
 */

function Position(id, live)
{
	Component.call(this, id, live);

	this.x = 0;
	this.y = 0;
}

/**
 * Position constructor with defined values
 *
 * @memberOf Position
 * @param {number} x x coordinate
 * @param {number} y y coordinate
 * @param {number}  [id] ID of the entity this belongs to
 * @param {boolean} [live] default live state
 */

function Position(x, y, id, live)
{
	Component.call(this, id, live);

	this.x = x;
	this.y = y;
}

/**
 * Inherit from Component
 *
 * @memberOf Position
 */

Position.prototype = new Component();

//// Velocity ////

/**
 * A Velocity component
 * @class
 * @name Velocity
 */

/**
 * Velocity constructor with defined values
 *
 * @memberOf Velocity
 * @param {number} x horizontal velocity
 * @param {number} y vertical velocity
 * @param {number} m mass or momentum
 * @param {number}  [id] ID of the entity this belongs to
 * @param {boolean} [live] default live state
 */

function Velocity(x, y, m, id, live)
{
	Component.call(this, id, live);

	this.x = x || 0;
	this.y = y || 0;
	this.m = m || 1;
}

/**
 * Inherit from Component
 *
 * @memberOf Velocity
 */

Velocity.prototype = new Component();
