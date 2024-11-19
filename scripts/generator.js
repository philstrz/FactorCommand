import enumerated from "./utilities/enum.js";
import Random from "./utilities/random.js";
import {Dimensions} from "./globals.js";

let runtime = null;

let wave = 0;
let numbers = [];

const State = enumerated([
	"Paused",
	"Starting",
	"Wave",
	"Ending",
])

const waveInterval = [2, 1, 0.5];
const waveTime = [30, 50, 60];
const stages = 3;

let generator = null;

export default class Generator
{

	state = State.Paused;
	
	// Two timers for launching and for the entire wave
	launchTimer = waveInterval[0];
	waveTimer = 0;
	
	// Each wave is broken up into stages
	stage = 0;
	
	// Instantiate with runtime, store to class var
	constructor(rt)
	{
		if (runtime === null)
		{
			runtime = rt;
		}
		if (generator === null)
		{
			generator = this;
		}
	}
	
	// Every tick, check state and proceed accordingly
	update()
	{
		switch (this.state)
		{
			case State.Paused:
				console.log("paused");
				break;
			case State.Starting:
				this.start();
				break;
			case State.Wave:
				this.wave();
				break;
			case State.Ending:
				console.log("ending");
				break;
		}
	}
	
	// Wave by number
	wave()
	{
		this.waveTimer += runtime.dt;
		this.launchTimer -= runtime.dt;
		if (this.launchTimer <= 0)
		{
			this.launchTimer = waveInterval[this.stage];
			this.launch();
		}
		if (this.waveTimer >= waveTime[this.stage])
		{
			this.stage += 1;
			if (this.stage >= stages)
			{
				this.state = State.Ending;
			}
		}
	}
	
	// Launch a meteor
	launch()
	{
		// Start meteor anywhere along top
		const x = Dimensions.meteors.left + Math.random() * (Dimensions.meteors.right - Dimensions.meteors.left);
		const y = 0;
		
		// Point meteor at the bottom
		const t = 170 + Math.random() * 300;
		let theta = Math.atan2( 200, t - x );
		console.log(theta * 180 / Math.PI);
		
		// Restrict theta within +/- 30 deg
		theta = theta < (Math.PI / 3) ? Math.PI / 3 : theta;
		theta = theta > (2 * Math.PI / 3) ? (2 * Math.PI) / 3 : theta;
		
		console.log(theta * 180 / Math.PI);
		
		// Pick a number based on available factors
		const number = Random.choose(numbers, 1);
		
		// Create and set the meteor
		const meteor = runtime.objects.Meteor.createInstance("Meteors", x, y);
		meteor.Theta = theta;
		meteor.Number = number;
		
	}
	
	// Start of the wave
	start()
	{
		// Set available numbers for meteors
		this.setNumbers();
		console.log(numbers);
		
		// Move to next state
		this.state = State.Wave;
	}
	
	// External trigger to start the next wave
	nextWave()
	{
		this.waveNumber = wave + 1;
		this.state = State.Starting;
	}
	
	// Numbers available for meteors are based on the wave number
	setNumbers()
	{
		numbers = [];
		const limit = wave + 1;
		for (let i = 2; i <= limit; i++)
		{
			for (let j = 2; j <= limit; j++)
			{
				numbers.push( i * j );
			}
		}
	}
	
	set waveNumber(n)
	{
		wave = n;
	}
}