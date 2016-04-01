
/**
 * A Canvas rendering System that inherits from EntitySystem
 * @class
 * @name ParticleSystem
 */

/**
 * ParticleSystem constructor
 *
 * @memberOf ParticleSystem
 * @param {String} handle the name for this EntitySystem
 * @param {RenderingContext} ctx reference to the Canvas rendering context
 */

function ParticleSystem(handle, ctx) 
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
 * @memberOf ParticleSystem
 */

ParticleSystem.prototype = new EntitySystem();

/**
 * Obtain relevant Components for the ParticleSystem
 *
 * @memberOf ParticleSystem
 * @param {Number} total the starting number of live entities
 * @param {Object} components object containing arrays of Components
 */

ParticleSystem.prototype.init = function(components)
{
	// Count total entities
	EntitySystem.prototype.init.call(this, components);

	// Get important components
	this.positions  = components.position;
	this.velocities = components.velocity;
	this.inputs		= components.input;

	// Constant values
	var kick = 0;
	var halfKick = kick / 2;
	var mass = 1;

	// Starting no. of particles
	var particles = 1000;
	var start = EntitySystem.totalEntities;

	console.log('particle start: '+ start);

	// Randomize starting positions and velocities
	for (var i = start; i < start + particles; i++)
	{
		this.positions[i] = new Position
		(
			Math.random() * this.w,
			Math.random() * this.h,
			i, true
		);

		this.velocities[i] = new Velocity
		(
			(Math.random() * kick) - halfKick,
			(Math.random() * kick) - halfKick,
			mass, i, true
		);
	}

	EntitySystem.totalEntities += particles;
}

/**
 * Process Components used by the ParticleSystem
 *
 * @memberOf ParticleSystem
 * @param {Number} dt elapsed time, in seconds
 */

ParticleSystem.prototype.process = function(dt)
{
	this.forEachEntity(function(i, self)
	{
		// First check if it's out of bounds. If it is, de-spawn it
		if (self.positions[i].x > self.w || self.positions[i].x < 0 ||
			self.positions[i].y > self.h || self.positions[i].y < 0)
		{
			self.positions[i].live  = false;
			self.velocities[i].live = false;
		}

		// If a valid Input Component exists, listen for mouse inputs
		// to create particles
		if (self.inputs)
			if (self.inputs[i] && self.inputs[i].live)
			{
				var mouseState = self.inputs[i].mouseState;
				
				// Spawn a new particle when button is pressed
				if (mouseState.buttons == 1)
				{
					var mass = 1;
					var next = EntitySystem.totalEntities;

					self.positions[next] = new Position
					(
						mouseState.x,
						mouseState.y,
						next, true
					);

					self.velocities[next] = new Velocity
					(
						0, 0, mass, next, true
					);

					// Add entity count
					EntitySystem.totalEntities++;
				}
			}
	});

	// Call base method to track entity amount
	return EntitySystem.prototype.process.call(this, dt);
}
