

export default class Missile extends globalThis.InstanceType.Missile
{

	constructor()
	{
		super();
	}
	
	setTarget(x, y)
	{
		this.target = this.runtime.objects.createInstance("Player", x, y);
		
	}
}