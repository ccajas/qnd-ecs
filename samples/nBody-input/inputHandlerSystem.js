
/**
 * A test System that inherits from EntitySystem
 * @class
 * @name InputHandlerSystem
 */

/**
 * InputHandlerSystem constructor
 *
 * @memberOf InputHandlerSystem
 * @param {String} handle the name for this EntitySystem
 */

function InputHandlerSystem(handle) 
{
	EntitySystem.call(this, handle);

	// Initial input states
	this.mouseState = {}
}

/**
 * Inherit from EntitySystem
 *
 * @memberOf InputHandlerSystem
 */

InputHandlerSystem.prototype = new EntitySystem();

/**
 * Obtain relevant Components for the InputHandlerSystem
 *
 * @memberOf PhysicsSystem
 * @param {Number} total the starting number of live entities
 * @param {Object} components object containing arrays of Components
 */

InputHandlerSystem.prototype.init = function(components)
{
	// Count total entities
	EntitySystem.prototype.init.call(this, components);

	// Get important components
	this.positions  = components.position;
	this.velocities = components.velocity;

	// Keyb3oard event listeners	
	//document.addEventListener('keydown', this.hKeys.bind(this), false);
	//document.addEventListener('keyup',   this.hKeys.bind(this), false);

	// Mouse event listeners
	window.addEventListener('mousedown', this.hMouse.bind(this), false);
	window.addEventListener('mouseup',   this.hMouse.bind(this), false);
	window.addEventListener('mousemove', this.hMouse.bind(this), false);
}

/**
 * Handler to attach to keyboard events and update keyState
 *
 * @function
 * @memberOf InputHandlerSystem
 * @param {Event} e Event object
 */

InputHandlerSystem.prototype.hKeys = function(e)
{
	e = e || window.event;
	//this.keyState[e.keyCode] = (e.type == 'keydown');
}

/**
 * Handler to attach to mouse events and update mouseState
 *
 * @function
 * @memberOf InputHandlerSystem
 * @param {Event} e Event object
 */

InputHandlerSystem.prototype.hMouse = function(e)
{
	e = e || window.event;
	this.mouseState['buttons'] = e.buttons;
	this.mouseState['x'] = e.x;
	this.mouseState['y'] = e.y;
}

/**
 * Process Components used by the InputHandlerSystem
 *
 * @memberOf InputHandlerSystem
 * @param {Number} dt elapsed time, in seconds
 */

InputHandlerSystem.prototype.process = function(dt)
{
	// Get InputHandler component and map events
	/*this.forEachEntity(function(i, self)
	{

	});*/

	//console.log(this.mouseState);

	// Call base method to track entity amount
	return EntitySystem.prototype.process.call(this, dt);
}
