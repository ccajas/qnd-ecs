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
	console.log(this);
}

/**
 * Inherit from Component
 *
 * @memberOf Position
 */

Position.prototype = new Component();