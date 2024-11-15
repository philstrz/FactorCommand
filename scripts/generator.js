import enumerated from "./utilities/enum.js";

let runtime = null;

let wave = 0;
let numbers = [];

const State = enumerated([
	"Paused",
	"Starting",
	"First",
	"Second",
	"Ending",
])

export default class Generator
{

	state = State.Paused;
	
	constructor(rt)
	{
		runtime = rt;
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
			case State.First:
				console.log("first");
				break;
			case State.Second:
				console.log("second");
				break;
			case State.Ending:
				console.log("ending");
				break;
		}
	}
	
	// Start of the wave
	start()
	{
		// Set available numbers for meteors
		this.setNumbers();
		console.log(numbers);
		
		// Move to next state, first half of wave
		this.state = State.First;
	}
	
	// External trigger to start the next wave
	nextWave()
	{
		this.wave = wave + 1;
		this.state = State.Starting;
	}
	
	// Numbers available for meteors is based on the wave number
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
	
	set wave(n)
	{
		wave = n;
	}
}