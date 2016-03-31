
'use strict'

/**
 * Component type definitions
 */

InputState._typeID = 2;

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
 * @param {number}  [id] ID of the entity this belongs to
 * @param {boolean} [live] default live state
 */

function InputState(id, live)
{
	Component.call(this, id, live);

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
