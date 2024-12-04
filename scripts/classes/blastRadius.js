

export default class BlastRadius extends globalThis.InstanceType.BlastRadius
{

	meteorUIDs = [];

	constructor()
	{
		super();
		
		// Only check collisions with meteors that exist when this detonation starts
		for (const meteor of this.runtime.objects.Meteor.getAllInstances())
		{
			this.meteorUIDs.push(meteor.uid);
		}
	}
	
	set Factor(n)
	{
		this.factor = n;
		
		const sf = this.getChildAt(0);
		sf.text = String(n);
	}
	
	// Check for meteor collisions
	update()
	{	
		for (const meteor of this.runtime.objects.Meteor.getAllInstances())
		{
			if (this.meteorUIDs.includes(meteor.uid) && this.runtime.collisions.testOverlap(this, meteor))
			{
				meteor.hit(this.factor);
			}
		}
	}
}