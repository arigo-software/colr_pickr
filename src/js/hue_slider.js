/*
 * Hue Slider
 */

// Function to handle changes to the HUE slider
let colorSliderHandler = function (position) {
	// Defining the slider and dragger
	const sliderContainer = document.getElementById('color_slider');
	const sliderDragger = document.getElementById('color_slider_dragger');

	// Defining the X position
	let eventX = position - sliderContainer.getBoundingClientRect().left;

	// Making conditions so that the user don't drag outside the box
	if (eventX < 11) {
		eventX = 11;
	}

	if (eventX > 277) {
		eventX = 277;
	}

	// Updating the X property of the dragger
	sliderDragger.attributes.x.nodeValue = eventX;

	// Percentage of the dragger on the X axis
	const percent = ((eventX - 11) / 266) * 100;
	// Calculating the color
	// Max number for hue colors is 359, I find the percentage of this, from the percent variable
	// I take it away from the max number because the slider should work backwards
	const HColor = Math.round(359 - (359 / 100) * percent);

	// Updating the Hue value in the data object
	colorPicker.hue = HColor;

	// Full HSLA color
	const HSLA = `hsla(${HColor}, ${colorPicker.saturation}%, ${colorPicker.lightness}%, ${colorPicker.alpha})`;

	// Updating the color for the color preview
	document.getElementById('color_picked_preview').children[0].setAttribute('fill', HSLA);

	// Updating the Hue color in the Saturation and lightness box
	document
		.getElementById('saturation')
		.children[1].setAttribute('stop-color', `hsl(${HColor}, 100%, 50%)`);

	// Update the color text values
	updateColorValueInput();
};

/*
 * Mouse Events
 */

// Start the slider drag
document.getElementById('color_slider').addEventListener('mousedown', function (event) {
	// Updating the status in the data object
	colorPicker.sliderStatus = true;
	// Calling handler function
	colorSliderHandler(event.pageX);
});

// Moving the slider drag
document.addEventListener('mousemove', function (event) {
	// Checking that the drag has started
	if (colorPicker.sliderStatus === true) {
		// Calling handler function
		colorSliderHandler(event.pageX);
	}
});

// End the slider drag
document.addEventListener('mouseup', function () {
	// Checking that the drag has started
	if (colorPicker.sliderStatus === true) {
		// Updating the status in the data object
		colorPicker.sliderStatus = false;
	}
});

/*
 * Touch Events
 */

// Start the slider drag on touch
document.getElementById('color_slider').addEventListener(
	'touchstart',
	function (event) {
		// Updating the status
		colorPicker.sliderStatusTouch = true;
		// Calling the handler function
		colorSliderHandler(event.changedTouches[0].clientX);
	},
	{ passive: true }
);

// Moving the slider drag on touch
document.addEventListener(
	'touchmove',
	function () {
		// Checking that the touch drag has started
		if (colorPicker.sliderStatusTouch === true) {
			// Prevent page scrolling
			event.preventDefault();
			// Calling the handler function
			colorSliderHandler(event.changedTouches[0].clientX);
		}
	},
	{ passive: false }
);

// End the slider drag on touch
document.addEventListener('touchend', function () {
	// Checking that the touch drag has started
	if (colorPicker.sliderStatusTouch === true) {
		// Updating the status
		colorPicker.sliderStatusTouch = false;
	}
});