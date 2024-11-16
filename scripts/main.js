import Globals from "./globals.js";
import Missile from "./missile.js";
import Meteor from "./meteor.js";
import Generator from "./generator.js";

runOnStartup(async runtime =>
{
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.
	
	runtime.addEventListener("beforeprojectstart", () => onBeforeProjectStart(runtime));
	
	// Add viewport dimensions to globals
	Globals.viewport.width = runtime.viewportWidth;
	Globals.viewport.height = runtime.viewportHeight;
	
	// Stop the browser from scrolling away
	window.addEventListener("keydown", function(e) { if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) { e.preventDefault(); } }, false); 
	
	// Set custom classes for objects
	runtime.objects.Missile.setInstanceClass(Missile);
	runtime.objects.Meteor.setInstanceClass(Meteor);
});

async function onBeforeProjectStart(runtime)
{
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial
	// instances are created and available to use here.
	runtime.addEventListener("tick", () => tick(runtime));
	
	// Get all layouts
	for (const layout of runtime.getAllLayouts())
	{
		// Skip the Loader and Title layout
		if (layout.name === "Loader") continue;
		if (layout.name === "Title") continue;
		
		// Add a function before every layout starts
		layout.addEventListener("beforelayoutstart", ()=> onBeforeLayoutStart(runtime));

		// Add a function at the start of every layout
		layout.addEventListener("afterlayoutstart", ()=> onLayoutStart(runtime));	

	}
	
	// Handle mouse input
	runtime.addEventListener("pointerdown", () => onPointerDown(runtime));
	runtime.mouse.setCursorStyle("crosshair");
	
	// Handle keyboard input
	runtime.addEventListener("keydown", e => onKeyDown(e, runtime));
}

// Every tick
function tick(runtime)
{
	for (const missile of runtime.objects.Missile.getAllInstances())
	{
		missile.update();
	}
	if (generator)
	{
		generator.update();
	}
}

// Before the layout starts
function onBeforeLayoutStart(runtime)
{
	
}

// When layout starts
let generator = null;
function onLayoutStart(runtime)
{
	generator = new Generator(runtime);
	generator.nextWave();
}

function onPointerDown(runtime)
{
	const [mouseX, mouseY] = runtime.mouse.getMousePosition(1);
	
	launchMissile(runtime, mouseX, mouseY);
}

function onKeyDown(e, runtime)
{
	console.log(e.code, e.key);
}

function launchMissile(runtime, x, y)
{
	const missile = runtime.objects.Missile.createInstance("Player", 320, 280);
	missile.setTarget(x, y);
}