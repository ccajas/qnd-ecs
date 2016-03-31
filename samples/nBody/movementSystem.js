
/**
 * A Canvas rendering System that inherits from EntitySystem
 * @class
 * @name MovementSystem
 */

/**
 * MovementSystem constructor
 *
 * @memberOf MovementSystem
 * @param {String} handle the name for this EntitySystem
 */

function MovementSystem(handle) 
{
	// Call constructor
	EntitySystem.call(this, handle);
}

/**
 * Inherit from EntitySystem
 *
 * @memberOf MovementSystem
 */

MovementSystem.prototype = new EntitySystem();

/**
 * Obtain relevant Components for the MovementSystem
 *
 * @memberOf MovementSystem
 * @param {Number} total the starting number of live entities
 * @param {Object} components object containing arrays of Components
 */

MovementSystem.prototype.init = function(components)
{
	// Count total entities
	EntitySystem.prototype.init.call(this, components);

	// Get important components
	this.positions  = components.position;
	this.velocities = components.velocity;
}


/**
 * Process Components used by the MovementSystem
 *
 * @memberOf MovementSystem
 * @param {Number} dt elapsed time, in seconds
 */

MovementSystem.prototype.process = function(dt)
{
	// Update positions based on their velocity
	this.forEachEntity(function(i, self)
	{
		self.positions[i].x += self.velocities[i].x;
		self.positions[i].y += self.velocities[i].y;
	});
	
	// Call base method to track entity amount
	return EntitySystem.prototype.process.call(this, dt);
}
