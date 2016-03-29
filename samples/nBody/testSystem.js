
/**
 * A test System that inherits from EntitySystem
 * @class
 * @name TestSystem
 */

/**
 * TestSystem constructor
 *
 * @memberOf TestSystem
 * @param {String} handle the name for this EntitySystem
 */

function TestSystem(handle) 
{
	EntitySystem.call(this, handle);

	console.log(this);
}

/**
 * Inherit from EntitySystem
 *
 * @memberOf TestSystem
 */

TestSystem.prototype = new EntitySystem();

/**
 * Process Components used by the TestSystem
 *
 * @memberOf TestSystem
 * @param {Number} dt elapsed time, in seconds
 */

TestSystem.prototype.process = function(dt)
{
	// Display some feedback
	//console.log('System "'+ this.handle +'" is processing: '+ dt +'s');

	// Call base method to track entity amount
	return EntitySystem.prototype.process.call(this, dt);
}


