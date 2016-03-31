
'use strict'

//// InputState ////

/**
 * A InputState component
 * @class
 * @name InputState
 */

/**
 * InputState constructor
 *
 * @memberOf InputState
 * @param {number} type Component type ID
 * @param {number} [id] ID of the entity this belongs to
 */

function InputState(type, id)
{
	Component.call(this, type, id);

	// Current and last input states
	this.keyState = {};
	this.lastKeyState = {};
	this.mouseState = {};
	this.lastMouseState = {};
}

/**
 * Inherit from Component
 *
 * @memberOf InputState
 */

InputState.prototype = new Component();