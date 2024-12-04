import {Singletons} from "../globals.js";

let input = null;

let factor = 2;

const factors = {
	min: 2,
	max: 3,
};

export default class Launcher extends globalThis.InstanceType.Launcher
{
	constructor()
	{
		super();
		input = Singletons.input;
		
		this.number = this.runtime.objects.LauncherNumber.getFirstInstance();
	}
	
	// Read inputs and respond accordingly
	update()
	{
		if (input.Wheel)
		{
			factor = factor + input.Wheel;
			factor = factor > factors.max ? factors.min : factor;
			factor = factor < factors.min ? factors.max : factor;
			
			this.number.text = String(factor);
		}
		
		if (input.LMB.click) console.log("click");
		if (input.LMB.down) console.log("down");
	}
}