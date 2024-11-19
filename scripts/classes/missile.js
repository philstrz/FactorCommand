import Vector from "../utilities/vector.js";

const squareTriggerRange = 50;
const speed = 1000;

export default class Missile extends globalThis.InstanceType.Missile
{

	factor = 2;

	constructor()
	{
		super();
	}
	
	setTarget(x, y)
	{
		this.target = this.runtime.objects.Target.createInstance("Player", x, y);
	}
	
	// Every tick, move the missile until it reaches its target
	update()
	{
		const xDist = (this.x - this.target.x);
		const yDist = (this.y - this.target.y);
		const dist = xDist * xDist + yDist * yDist;
		if (dist <= squareTriggerRange)
		{
			this.explode();
		}
		else
		{
			this.move();
		}
	}
	
	// Within range of target, detonate
	explode()
	{
		this.runtime.objects.BlastRadius.createInstance("Explosions", this.x, this.y);
		this.target.destroy();
		this.destroy();
	}
	
	move()
	{
		const here = new Vector(this.x, this.y);
		const there = new Vector(this.target.x, this.target.y);
		
		const direction = Vector.difference(there, here);
		const velocity = Vector.scale(direction.unit(), speed);
		
		this.x += this.runtime.dt * velocity.x;
		this.y += this.runtime.dt * velocity.y;
	}
}