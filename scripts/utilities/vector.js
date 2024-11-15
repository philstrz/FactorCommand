
export default class Vector
{

	// Static methods
	static difference(u, v)
	{
		return new Vector(u.x - v.x, u.y - v.y);
	}
	
	static magnitudeSquared(v)
	{
		return (v.x * v.x + v.y * v.y);
	}
	
	static scale(v, a)
	{
		return new Vector(a * v.x, a * v.y);
	}
	
	// Instance methods
	constructor(x=0, y=0)
	{
	 	this.x = x;
		this.y = y;
	}
	
	unit()
	{
		const d2 = Vector.magnitudeSquared(this);
		
		let x = this.x * Math.abs(this.x);
		let y = this.y * Math.abs(this.y);
		
		x /= d2;
		y /= d2;
		
		return new Vector(x, y);
	}
}