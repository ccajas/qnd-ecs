
/**
 * A Canvas rendering System that inherits from EntitySystem
 * @class
 * @name PhysicsSystem
 */

/**
 * PhysicsSystem constructor
 *
 * @memberOf PhysicsSystem
 * @param {String} handle the name for this EntitySystem
 * @param {RenderingContext} ctx reference to the Canvas rendering context
 */

function PhysicsSystem(handle) 
{
	// Call constructor
	EntitySystem.call(this, handle);

	// X and Y bounds, for positioning
	this.w = ctx.canvas.width;
	this.h = ctx.canvas.height;
}

/**
 * Inherit from EntitySystem
 *
 * @memberOf PhysicsSystem
 */

PhysicsSystem.prototype = new EntitySystem();

/**
 * Obtain relevant Components for the PhysicsSystem
 *
 * @memberOf PhysicsSystem
 * @param {Number} total the starting number of live entities
 * @param {Object} components object containing arrays of Components
 */

PhysicsSystem.prototype.init = function(total, components)
{
	// Count total entities
	EntitySystem.prototype.init.call(this, total, components);

	// Get important components
	this.positions  = components.position;
	this.velocities = components.velocity;

	// Constant values
	var kick = 0;
	var halfKick = kick / 2;
	var mass = 1;
	this.gravity = 1;

	// Randomize starting positions and velocities
	this.forEachEntity(function(i, self) 
	{
		self.positions[i] = new Position
		(
			0, i,
			Math.random() * self.w,
			Math.random() * self.h
		);

		self.velocities[i] = new Velocity
		(
			1, i,
			(Math.random() * kick) - halfKick,
			(Math.random() * kick) - halfKick,
			mass
		);
	});
}

/**
 * Process Components used by the PhysicsSystem
 *
 * @memberOf PhysicsSystem
 * @param {Number} dt elapsed time, in seconds
 */

PhysicsSystem.prototype.process = function(dt)
{
	// Apply movement relations
	this.forEachEntity(function(i, self) 
	{
		var mag = 0; // magnitude

		// Loop through other entities that haven't been calculated
		// Start from this entity length
		for (var j = self.totalEntities - 1; j >= i; j--) 
		{
			var dx = self.positions[j].x - self.positions[i].x;
			var dy = self.positions[j].y - self.positions[i].y;
			var dist2 = (dx * dx) + (dy * dy);

			// Attract other entities
			if (!(dist2 <= 1 || dist2 > 100000)) 
			{
				var v1 = self.velocities[i];
				var v2 = self.velocities[j];
				var dist = Math.sqrt(dist2);

				mag = (self.gravity * v1.m * v1.m) / (dist * dist * dist);

				v1.x += dx * mag * v1.m;
				v1.y += dy * mag * v1.m;
				v2.x -= dx * mag * v2.m;
				v2.y -= dy * mag * v2.m;
			}
		}
		// Finish calculating for this entity
	});

	// Call base method to track entity amount
	return EntitySystem.prototype.process.call(this, dt);
}