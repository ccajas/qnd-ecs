
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

	// Call constructor
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

	// Store positions
	this.positions = components.position;

	// Randomize starting positions
	function repeat(c, s, self) { for (var i = 0; i < c; i++) s(i, self); }

	repeat(this.totalEntities, function(i, self) 
	{
		self.positions[i] = new Position
		(
			Math.random() * self.w,
			Math.random() * self.h, 0
		);

	}, this);
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

	for (var i = 0; i < this.totalEntities; i++)
		ctx.fillRect(this.positions[i].x|0, this.positions[i].y|0, 1, 1);

	// Call base method to track entity amount
	return EntitySystem.prototype.process.call(this, dt);
}


