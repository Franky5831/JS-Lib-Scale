# Button Scale Library
Ever wanted to add a scale animation to your buttons?\
If you have you probably faced a problem: **you can't scale elements based on a fixed amount of pixels, you can only scale them based on their size**.\
That's why I created this library.

## Installation
```html
<!-- Add the library to your project (version 0.0.1) -->
<script src="https://cdn.jsdelivr.net/gh/Franky5831/JS-Lib-Scale@0.0.1/library/main.js"></script>

<!-- Target button -->
<button class="scaleButton">Click Me</button>

<!-- Initialize the library -->
<script>
	new ButtonScale(".scaleButton", { // The selector for your buttons
		hoverScale: 15, // The value to scale the button on hover
		clickScale: -5, // The value to scale the button on click
	});
</script>
```

## Example
<iframe src="iframe-example.html" width="100%" style="border: none;margin: 0;"></iframe>

[Go to the demo]({{baseUrl}}/demo.html ':ignore')