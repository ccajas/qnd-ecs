/**
 * @class Test application
 * @name App
 */

App = (function()
{
	'use strict';

	/**
	 * TestApp construtor
	 *
	 * @memberOf App
	 */

	function App()
	{
		this.systems = [];
		this.componentGroups = {};
		this.totalEntities = 0;

		// Set up EntitySystems. 
		// They will be process in the order that they are added to the array
		this.systems.push.apply(
			this.systems, [
				new TestSystem('Test')
			]
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
		 * @memberOf SystemMgr
		 * @param {Array.<Object>} componentLists object containing all lists of Components by type
		 */

		init: function()
		{
			var self = this;
			dt, lastFrame = 0;

			this.systems.forEach(function(system)
			{
				system.init(self.totalEntities);
			});

			// Debug System output
			console.log(this.systems);

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

			// Process systems
			this.systems.forEach(function(system)
			{
				system.process(dt);
			});

			// Call update on next frame
			requestAnimationFrame(function animFrame() {
				self.update(dt);
			});
		}
	}

	return App;

})();