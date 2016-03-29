
/**
 * A Canvas rendering System that inherits from EntitySystem
 * @class
 * @name RenderSystem
 */

/**
 * RenderSystem constructor
 *
 * @memberOf RenderSystem
 * @param {String} handle the name for this EntitySystem
 * @param {RenderingContext} ctx reference to the Canvas rendering context
 */

function RenderSystem(handle, ctx) 
{
	// Call constructor
	EntitySystem.call(this, handle);

	// Canvas settings
	this.ctx = ctx;
	this.w = ctx.canvas.width;
	this.h = ctx.canvas.height;

	// Default color
	this.pixelFill = "#fff";
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

RenderSystem.prototype.init = function(total, components)
{
	// Count total entities
	EntitySystem.prototype.init.call(this, total, components);

	// Get positions
	this.positions = components.position;
}


/**
 * Process Components used by the RenderSystem
 *
 * @memberOf RenderSystem
 * @param {Number} dt elapsed time, in seconds
 */

RenderSystem.prototype.process = function(dt)
{
	// Clear the canvas
	this.ctx.fillStyle = '#333';
	this.ctx.fillRect(0, 0, this.w, this.h);

	// Draw the dots
	this.ctx.fillStyle = this.pixelFill;

	this.forEachEntity(function(i, self) {
		ctx.fillRect(self.positions[i].x|0, self.positions[i].y|0, 1, 1)
	});

	// Call base method to track entity amount
	return EntitySystem.prototype.process.call(this, dt);
}


