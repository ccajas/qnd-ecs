
/**
 * A test System that inherits from EntitySystem
 * @class
 * @name EntityKeeperSystem
 */

/**
 * EntityKeeperSystem constructor
 *
 * @memberOf EntityKeeperSystem
 * @param {String} handle the name for this EntitySystem
 */

function EntityKeeperSystem(handle) 
{
	EntitySystem.call(this, handle);

	console.log(this);
}

/**
 * Inherit from EntitySystem
 *
 * @memberOf EntityKeeperSystem
 */

EntityKeeperSystem.prototype = new EntitySystem();

/**
 * Obtain Component groups for the System
 *
 * @memberOf PhysicsSystem
 * @param {Number} total the starting number of live entities
 * @param {Object} components object containing arrays of Components
 */

EntityKeeperSystem.prototype.init = function(total, components)
{
	// Count total entities
	EntitySystem.prototype.init.call(this, total, components);

	// Reference to Component groups
	this.components = components;
}

/**
 * Process Components used by the EntityKeeperSystem
 *
 * @memberOf EntityKeeperSystem
 * @param {Number} dt elapsed time, in seconds
 */

EntityKeeperSystem.prototype.process = function(dt)
{
	var total = EntitySystem.totalEntities;

	// Track live entities and mark dead ones
	this.forEachEntity(function(i, self)
	{
		var remove = true;
		Object.keys(self.components).forEach(function(key)
		{
			if (self.components[key][i] != null &&
				self.components[key][i].live)
				remove = false;
		});
		// If no longer live, swap object with last live component
		if (remove)
		{
			var lastEntity = total - 1;

			// Swap last entity's Components with the one to be removed
			Object.keys(self.components).forEach(function(key)
			{
				self.components[key][i] = self.components[key][lastEntity];
				//self.components[key][lastEntity] = null; 
			});

			// Reduce live entity count
			total--;
		}
	});

	if (EntitySystem.totalEntities != total)
		EntitySystem.totalEntities = total;

	// Call base method to track entity amount
	return EntitySystem.prototype.process.call(this, dt);
}
