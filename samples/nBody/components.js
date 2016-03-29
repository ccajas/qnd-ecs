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
 * @param {number} x x coordinate
 * @param {number} y y coordinate
 * @param {number} type Component type ID
 * @param {number} [id] ID of the entity this belongs to
 */

function Position(x, y, type, id)
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