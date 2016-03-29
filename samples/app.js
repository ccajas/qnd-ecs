/**
 * @class Test application
 * @name App
 */

App = (function()
{
	'use strict';

	/**
	 * TestApp constructor
	 *
	 * @memberOf App
     * @param {Array.<Object>} systemGroup array of all EntitySystems
     * @param {Object} componentGroups object containing arrays of Components
     * @param {RenderingContext} [ctx] Canvas rendering context
	 */

	function App(systemGroup, componentGroups, ctx)
	{
		this.systems = [];
		this.componentGroups = componentGroups;

		// Count total entities
		this.totalEntities = 
			(componentGroups && componentGroups.position) ?
			componentGroups.position.length : 0;

		// Canvas context
		this.ctx = ctx;

		// Set up EntitySystems. 
		// They will be process in the order that they are added to the array
		
		this.systems.push.apply(
			this.systems, systemGroup
		);
	}

	// time keeping variables
	var startTime, dt, lastFrame;

	/**
	 * TestApp functions
	 */

	App.prototype =
	{
		/**
		 * Initialize App Components and Systems
		 *
		 * @memberOf App
		 */

		init: function()
		{
			var self = this;
			dt, lastFrame = 0;

			this.systems.forEach(function(system)
			{
				system.init(
					self.totalEntities, 
					self.componentGroups
				);
			});

			// Debug output of Systems
			console.log('Systems', this.systems);

			// Begin update loop
			this.update(dt);
		},

		/**
		 * Update App Components from each System
		 *
		 * @memberOf SystemMgr
		 * @param {Array.<Object>} componentLists object containing all lists of Components by type
		 */

		update: function(dt)
		{
			var self = this;

			// Update current time
			dt = (Date.now() - lastFrame) / 1000;
			lastFrame = Date.now();

			// Process systems and return updated entity count
			this.systems.forEach(function(system)
			{
				self.totalEntities = system.process(dt);
			});

			// Call update on next frame
			requestAnimationFrame(function animFrame() {
				self.update(dt);
			});
		}
	}

	return App;

})();