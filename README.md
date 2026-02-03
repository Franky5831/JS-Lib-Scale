# Button Scale Library

Ever wanted to add a scale animation to your buttons?\
If you have you probably faced a problem: **you can't scale elements based on a fixed amount of pixels, you can only scale them based on their size**.\
That's why I created this library.

## Features

- **Pixel-based scaling** - Scale buttons by exact pixel amounts instead of percentages
- **Hover effects** - Add smooth scale animations on mouse hover
- **Click effects** - Add press-down effects when buttons are clicked
- **Max/Min constraints** - Limit scaling with maximum and minimum scale values
- **Multiple elements** - Apply effects to multiple buttons with a single instance
- **Lightweight** - Pure JavaScript with no dependencies
- **Browser compatible** - Works in all modern browsers

## Installation

Include the library in your HTML via CDN:

```html
<script src="https://cdn.jsdelivr.net/gh/Franky5831/JS-Lib-Scale@1.0.1/dist/main.js"></script>
```

## Usage

```javascript
// Combine hover and click with constraints
new ButtonScale('.my-button', {
  hoverScale: 15,
  clickScale: -10,
  maxScale: 1.2,   // Don't scale larger than 1.2x
  minScale: 0.9    // Don't scale smaller than 0.9x
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
