
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
	EntitySystem.prototype.init.call(this, components);

	// Get Input Components
	this.inputs = components.input;

	console.log('start', components);

	// Add an Input Component
	var total = EntitySystem.totalEntities;
	this.inputs[total].live = true;
	EntitySystem.totalEntities++;

	// Get InputHandler component and map events
	this.forEachEntity(function(i, self)
	{
		if (self.inputs[i].live == true)
		{
			// Keyboard event listeners	
			//document.addEventListener('keydown', this.hKeys.bind(this), false);
			//document.addEventListener('keyup',   this.hKeys.bind(this), false);

			var input = self.inputs[i];
			console.log('binding mouse inputs!', i);

			// Mouse event listeners
			window.addEventListener('mousedown', self.hMouse.bind(input), false);
			window.addEventListener('mouseup',   self.hMouse.bind(input), false);
			window.addEventListener('mousemove', self.hMouse.bind(input), false);
		}
	});


	console.log('end', components);
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

	//console.log(EntitySystem.totalEntities);

	// Call base method to track entity amount
	return EntitySystem.prototype.process.call(this, dt);
}
