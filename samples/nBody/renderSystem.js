
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
	this.imgData = ctx.getImageData(0, 0, this.w, this.h);

	// Buffer data for image processing
	this.buf  = new ArrayBuffer(this.imgData.data.length);
	this.buf8 = new Uint8ClampedArray(this.buf);
	this.data = new Uint32Array(this.buf);

	console.log(this.imgData);

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
	// Clear the canvas
	for (var d = 0; d < this.data.length; )
	    this.data[d++] = this.bg;

	// Draw the dots
	this.forEachEntity(function(i, self) 
	{
		var x = self.positions[i].x|0;
		var y = self.positions[i].y|0;

		// Add color based on velocity
		var vx = self.velocities[i].x * 5;
		var vy = self.velocities[i].y * 5;

		var speed = (vx * vx + vy * vy);
		var value = (speed|0 < 0xff) ? speed|0 : 0xff;

		self.data[y * self.w + x] |= 
            (value << 16) | (value <<  8) | value;
	});

	this.imgData.data.set(this.buf8);
	this.ctx.putImageData(this.imgData, 0, 0);

	// Display no. of live entities
	this.ctx.fillStyle = '#ccc';
	this.ctx.font = "12px Helvetica, Arial";
	this.ctx.fillText('Live entities: '+ EntitySystem.totalEntities, 5, this.h - 5);
	this.ctx.fillText('N-body Simulation '+ dt * 1000 +'ms', 5, 15);

	// Call base method to track entity amount
	return EntitySystem.prototype.process.call(this, dt);
}


