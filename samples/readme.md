## Sample Applications

### Simpletest

A basic implementation of QND-ECS using one System.

### Nbody

N-Body simulation with: 
* **MovementSystem** - update Positions with Velocity component
* **ParticleSystem** - spawns particles (defined by Position and Velocity)
* **PhysicsSystem** - update Velocities
* **RenderSystem** - draws points (Canvas) using Positions

### Nbody-input

Uses code from *Nbody* plus:
* **EntityKeeperSystem** - manages lifetime of Entities
* **InputSystem** - reads and updates InputState to create new Entities
