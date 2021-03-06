# Quick 'N' Dirty ECS (Entity Component System)

Entities are implicity defined as "nodes" or aggregates of components. There is no "Entity" object.

## Sample Applications

### simpleTest

A basic implementation of QND-ECS using one System.

### nBody

N-Body simulation with: 
* **MovementSystem** - update Positions with Velocity component
* **ParticleSystem** - spawns particles (defined by Position and Velocity)
* **PhysicsSystem** - update Velocities
* **RenderSystem** - draws points (Canvas) using Positions

### nBody-input

Uses code from *Nbody* plus:
* **EntityKeeperSystem** - manages lifetime of Entities
* **InputSystem** - reads and updates InputState to create new Entities
