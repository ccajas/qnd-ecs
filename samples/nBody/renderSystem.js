
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
	this.ctx = ctx;
	this.w = ctx.canvas.width;
	this.h = ctx.canvas.height;

	// Default color
	this.pixelFill = "#fff";

	EntitySystem.call(this, handle);
	console.log(this);
}

/**
 * Inherit from EntitySystem
 *
 * @memberOf RenderSystem
 */

RenderSystem.prototype = new EntitySystem();

/**
 * Process Components used by the RenderSystem
 *
 * @memberOf RenderSystem
 * @param {Number} dt elapsed time, in seconds
 */

RenderSystem.prototype.process = function(dt)
{
	// Clear the canvas
	this.ctx.fillStyle = "gray";
	this.ctx.fillRect(0, 0, this.w, this.h);
	//console.log('System "'+ this.handle +'" is processing: '+ dt +'s');

	// Call base method to track entity amount
	return EntitySystem.prototype.process.call(this, dt);
}


