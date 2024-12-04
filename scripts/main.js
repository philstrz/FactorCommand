import {Dimensions, Singletons} from "./globals.js";
import Missile from "./classes/missile.js";
import Meteor from "./classes/meteor.js";
import Generator from "./classes/generator.js";
import BlastRadius from "./classes/blastRadius.js";
import Launcher from "./classes/launcher.js";
import Input from "./classes/input.js";

runOnStartup(async runtime =>
{
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.
	
	runtime.addEventListener("beforeprojectstart", () => onBeforeProjectStart(runtime));
	
	// Add viewport dimensions to globals
	Dimensions.viewport.width = runtime.viewportWidth;
	Dimensions.viewport.height = runtime.viewportHeight;
	
	// Stop the browser from scrolling away
	window.addEventListener("keydown", function(e) { if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) { e.preventDefault(); } }, false); 
	
	// Set custom classes for objects
	runtime.objects.Missile.setInstanceClass(Missile);
	runtime.objects.Meteor.setInstanceClass(Meteor);
	runtime.objects.BlastRadius.setInstanceClass(BlastRadius);
	runtime.objects.Launcher.setInstanceClass(Launcher);
	
	// Set singletons
	Singletons.runtime = runtime;
	Singletons.input = new Input(runtime);
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
	runtime.addEventListener("wheel", e => Singletons.input.wheel(e));
	
	//runtime.addEventListener("wheel", e => onWheel(e, runtime));
	//runtime.addEventListener("pointerdown", () => onPointerDown(runtime));
	
	runtime.addEventListener("pointerdown", () => Singletons.input.pointer(true));
	runtime.addEventListener("pointerup", () => Singletons.input.pointer(false));
	
	runtime.mouse.setCursorStyle("crosshair");
	
	// Handle keyboard input
	runtime.addEventListener("keydown", e => onKeyDown(e, runtime));
	
	// WIP
}

// Every tick
function tick(runtime)
{
	for (const missile of runtime.objects.Missile.getAllInstances())
	{
		missile.update();
	}
	
	for (const blast of runtime.objects.BlastRadius.getAllInstances())
	{
		blast.update();
	}
	
	for (const meteor of runtime.objects.Meteor.getAllInstances())
	{
		meteor.update();
	}
	
	if (launcher) launcher.update();
	
	if (generator) generator.update();
	
	if (input) input.clear();
	
}

// Before the layout starts
function onBeforeLayoutStart(runtime)
{
	
}

// When layout starts
let generator = null;
let launcher = null;
let input = null;
function onLayoutStart(runtime)
{
	launcher = runtime.objects.Launcher.getFirstInstance();

	generator = new Generator(runtime);
	generator.nextWave();
	
	input = Singletons.input;
	
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

let factor = 2;
let minFactor = 2;
let maxFactor = 4;
function onWheel(e, runtime)
{	
	if (e.deltaY < 0)
	{
		factor = factor >= maxFactor ? minFactor : factor + 1;
	}
	
	if (e.deltaY > 0)
	{
		factor = factor <= minFactor ? maxFactor : factor - 1;
	}
	console.log(factor);
	runtime.objects.LauncherNumber.getFirstInstance().text = String(factor);
	
}

function launchMissile(runtime, x, y)
{	
	const launcher = runtime.objects.Launcher.getFirstInstance();
	const missile = runtime.objects.Missile.createInstance("Player", launcher.x, launcher.y, true);
	missile.Target = {x: x, y: y};
	missile.Factor = factor;
}