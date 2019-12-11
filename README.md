# Quick 'n' Dirty ECS

This is a JavaScript implementation of the Entity-Component System pattern. It is meant to be very lightweight and quick to prototype games and simulations with 
(though feel free to make some full games with it if you want!)

Entities are implicity defined as "nodes" or aggregates of components. There is no "Entity" object.

## Sample Applications

### simpleTest

A basic implementation of QND-ECS using one dummy System.

### nBody

N-Body simulation with: 
* **MovementSystem** - update Positions with Velocity component
* **ParticleSystem** - spawns particles (defined by Position and Velocity)
* **PhysicsSystem** - update Velocities
* **RenderSystem** - draws points (Canvas) using Positions

### nBody-input

Uses code from *nBody* plus:
* **EntityKeeperSystem** - manages lifetime of entities
* **InputSystem** - reads and updates InputState to create new particle entities
