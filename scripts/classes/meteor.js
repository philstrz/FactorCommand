const baseSpeed = 100;

// Get an array of the factors of a number, excluding 1 and n
function factor(n)
{
	const f = [];
	
	while ( n > 1 )
	{
		for (let i = 2; i <= n; i++)
		{
			if ( n % i == 0)
			{
				f.push(i);
				n /= i;
				i = 1;
			}
		}
	}
	return f;
}


// Custom class for meteor objects
export default class Meteor extends globalThis.InstanceType.Meteor
{
	theta = Math.PI / 2;

	constructor()
	{
		super();
	}
	
	set Number(n)
	{
		this.number = n;
		this.factors =  factor(n);
		console.log(this.factors);
		
		this.speed = baseSpeed / this.factors.length;
		
		const sf = this.getChildAt(0);
		sf.text = String(n);
	}
	
	set Theta(angle)
	{
		this.theta = angle;
		
		this.dx = Math.cos(this.theta);
		this.dy = Math.sin(this.theta);
	}
	
	update()
	{
		this.x += this.dx * this.runtime.dt * this.speed;
		this.y += this.dy * this.runtime.dt * this.speed;
	}
	
	// Receive factor "damage"
	hit(n)
	{
		// Ignore hits of the same size as this
		if (n === this.number) return;
		
		// If the factor divides, divide
		if (this.number % n === 0)
		{
			const divided = this.number / n;
			const factors = factor(divided);
			
			// WIP
		}
	}
}