
/**
 * A WebGL rendering System that inherits from EntitySystem
 * @class
 * @name RenderSystem
 */

/**
 * RenderSystem constructor
 *
 * @memberOf RenderSystem
 * @param {String} handle the name for this EntitySystem
 * @param {RenderingContext} gl reference to the WebGL rendering context
 */

function RenderSystem(handle, gl) 
{
	// Call constructor
	EntitySystem.call(this, handle);

	// Canvas settings
	this.gl = gl;

	// Default background color
	this.bg = 0xff000000;
}

/**
 * Inherit from EntitySystem
 *
 * @memberOf RenderSystem
 */

RenderSystem.prototype = new EntitySystem();

/**
 * Obtain relevant Components for the RenderSystem
 *
 * @memberOf RenderSystem
 * @param {Number} total the starting number of live entities
 * @param {Object} components object containing arrays of Components
 */

RenderSystem.prototype.init = function(components)
{
	// Count total entities
	EntitySystem.prototype.init.call(this, components);

	// Get positions
	this.positions = components.position;
	this.velocities = components.velocity;
}


/**
 * Process Components used by the RenderSystem
 *
 * @memberOf RenderSystem
 * @param {Number} dt elapsed time, in seconds
 */

RenderSystem.prototype.process = function(dt)
{
	var gl = this.gl;

	// Clear the canvas
	gl.clearColor(0.11, 0.16, 0.21, 1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Call base method to track entity amount
	return EntitySystem.prototype.process.call(this, dt);
}


