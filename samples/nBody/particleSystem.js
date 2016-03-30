
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

	// Constant values
	var kick = 0;
	var halfKick = kick / 2;
	var mass = 1;

	// Starting no. of particles
	var particles = 1000;
	EntitySystem.totalEntities = particles;

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

		self.positions[i].live = true;
		self.velocities[i].live = true;	
	});
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
		// If a valid Input Component exists, listen for mouse inputs
		// to create particles
		if (self.inputs && self.inputs[i].live)
		{

		}
	});

	// Call base method to track entity amount
	return EntitySystem.prototype.process.call(this, dt);
}
