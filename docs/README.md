# Button Scale Library
Ever wanted to add a scale animation to your buttons?\
If you have you probably faced a problem: **you can't scale elements based on a fixed amount of pixels, you can only scale them based on their size**.\
That's why I created this library.

## Installation
```html
<!-- Add the library to your project (version 1.0.2) -->
<script src="https://cdn.jsdelivr.net/gh/Franky5831/JS-Lib-Scale@1.0.2/dist/main.js"></script>

<!-- Target button -->
<button class="scaleButton">Click Me</button>

<!-- Initialize the library -->
<script>
	new ButtonScale(".scaleButton", {
		hoverScale: 15,    // Scale by 15px on hover
		clickScale: -5,    // Scale by -5px on click
		maxScale: 1.2,     // Maximum scale limit
		minScale: 0.9,     // Minimum scale limit
		hoverClass: 'glow shadow',  // Add CSS classes on hover
		clickClass: 'pressed'       // Add CSS class on click
	});
</script>
```

### Advanced Examples

**Using only CSS classes (no scaling):**
```javascript
new ButtonScale(".btn", {
	hoverClass: 'btn-hover',
	clickClass: 'btn-active'
});
```

**Combining scale effects with classes:**
```javascript
new ButtonScale(".button", {
	hoverScale: 10,
	hoverClass: 'button-glow',
	clickScale: -5,
	clickClass: 'button-pressed',
	maxScale: 1.3,
	minScale: 0.85
});
```

**Multiple classes:**
```javascript
new ButtonScale(".btn", {
	hoverClass: 'shadow-lg scale-up animated',  // Multiple classes
	clickClass: 'pressed bounce'                 // Multiple classes
});
```

## Parameters
All parameters are optional:

### Scale Parameters
- `hoverScale` - The pixel value to scale the button on hover
- `clickScale` - The pixel value to scale the button on click
- `maxScale` - The maximum scale limit for the button (e.g., 1.2 = 120%)
- `minScale` - The minimum scale limit for the button (e.g., 0.9 = 90%)

### Class Parameters (New!)
- `hoverClass` - CSS class(es) to add on hover (supports multiple space-separated classes)
- `clickClass` - CSS class(es) to add on click (supports multiple space-separated classes)

## Example
<iframe src="iframe-example.html" width="100%" style="border: none;margin: 0;"></iframe>

[Go to the demo]({{baseUrl}}/demo.html ':ignore')