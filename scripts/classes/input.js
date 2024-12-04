let runtime = null;
let singleton = null;

const lmb = {
	down: false,
	click: false,
}

//let rmbClick = false;
//let rmbDown = false;

let scroll = 0;

export default class Input
{
	constructor(rt)
	{
		if (!runtime) runtime = rt;
		if (!singleton) singleton = this;
	}
	
	// Clear all input from previous frame
	clear()
	{
		scroll = 0;
		lmb.click = false;
	}
	
	wheel(event)
	{
		scroll = -Math.sign(event.deltaY);
	}
	
	get Wheel()
	{
		return scroll;
	}
	
	pointer(down)
	{
		if (down)
		{
			lmb.click = true;
			lmb.down = true;
		}
		else
		{
			lmb.down = false;
		}
		
	}
	
	get LMB()
	{
		return lmb;
	}
}