
'use strict'

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
 * @param {number} type Component type ID
 * @param {number} [id] ID of the entity this belongs to
 */

function Position(type, id)
{
	Component.call(this, type, id);

	this.x = 0;
	this.y = 0;
}

/**
 * Position constructor with defined values
 *
 * @memberOf Position
 * @param {number} type Component type ID
 * @param {number} [id] ID of the entity this belongs to
 * @param {number} x x coordinate
 * @param {number} y y coordinate
 */

function Position(type, id, x, y)
{
	Component.call(this, type, id);

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
 * @param {number} type Component type ID
 * @param {number} [id] ID of the entity this belongs to
 * @param {number} x horizontal velocity
 * @param {number} y vertical velocity
 * @param {number} m mass or momentum
 */

function Velocity(type, id, x, y, m)
{
	Component.call(this, type, id);

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