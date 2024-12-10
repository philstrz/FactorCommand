import customClasses from "./customClasses.js";

// Code to run on the loading screen.
// Note layouts, objects etc. are not yet available.
runOnStartup(async runtime =>
{
	// Initialize statics

	// Set custom classes in a function
	customClasses(runtime);
	
	// Stop the browser from scrolling away
	window.addEventListener("keydown", function(e) { if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) { e.preventDefault(); } }, false); 
	
	// Add the Tick call before project starts
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime)
{
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial
	// instances are created and available to use here.
	
	runtime.addEventListener("tick", () => Tick(runtime));
}

function Tick(runtime)
{
	// Only the Game layout uses script-only logic
	if (runtime.layout.name != "Game") return;
	
	
	
}
