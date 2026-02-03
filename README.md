# Button Scale Library

Ever wanted to add a scale animation to your buttons?\
If you have you probably faced a problem: **you can't scale elements based on a fixed amount of pixels, you can only scale them based on their size**.\
That's why I created this library.

## Features

- **Pixel-based scaling** - Scale buttons by exact pixel amounts instead of percentages
- **Hover effects** - Add smooth scale animations on mouse hover
- **Click effects** - Add press-down effects when buttons are clicked
- **CSS class toggling** - Add/remove CSS classes on hover and click events
- **Max/Min constraints** - Limit scaling with maximum and minimum scale values
- **Multiple elements** - Apply effects to multiple buttons with a single instance
- **TypeScript** - Written in TypeScript with type definitions
- **Lightweight** - Pure JavaScript with no dependencies
- **Browser compatible** - Works in all modern browsers

## Installation

Include the library in your HTML via CDN:

```html
<script src="https://cdn.jsdelivr.net/gh/Franky5831/JS-Lib-Scale@1.0.2/dist/main.js"></script>
```

## Usage

### Basic scaling with hover and click effects
```javascript
new ButtonScale('.my-button', {
  hoverScale: 15,      // Grow by 15px on hover
  clickScale: -10,     // Shrink by 10px on click
  maxScale: 1.2,       // Don't scale larger than 1.2x
  minScale: 0.9        // Don't scale smaller than 0.9x
});
```

### Add CSS classes on interactions
```javascript
new ButtonScale('.my-button', {
  hoverClass: 'glow shadow',   // Add multiple classes on hover
  clickClass: 'pressed',       // Add class on click
  hoverScale: 10,              // Can combine with scaling
  clickScale: -5
});
```

## Documentation

Full documentation available at: [https://franky5831.github.io/JS-Lib-Scale/](https://franky5831.github.io/JS-Lib-Scale/)

## Development

### Running Tests

This library includes a comprehensive test suite using Jest.

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Coverage

The test suite includes 31 tests covering:
- Constructor and parameter initialization
- Element selection
- Scale calculation logic
- Hover and click event handlers
- Max/min scale constraints
- Multiple element handling
- Edge cases

Current coverage: **100% statements, 96% branches, 100% functions, 100% lines**
