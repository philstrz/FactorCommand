import enumerated from "./utilities/enum.js";

let runtime = null;

let wave = 0;

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
				console.log("starting");
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
	
	start()
	{
		this.state = State.Starting;
		this.wave = wave + 1;
	}
	
	set wave(n)
	{
		wave = n;
	}
}