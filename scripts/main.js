
// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";
import Globals from "./globals.js";

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
	
}

// Before the layout starts
function onBeforeLayoutStart(runtime)
{
	
}

// When layout starts
function onLayoutStart(runtime)
{
	
}

function onPointerDown(runtime)
{
	const [mouseX, mouseY] = runtime.mouse.getMousePosition(1);
	
	console.log(mouseX, mouseY);
}

function onKeyDown(e, runtime)
{
	console.log(e.code, e.key);
}