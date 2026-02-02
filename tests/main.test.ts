/**
 * Tests for ButtonScale Library
 * Mostly AI generated BTW
 */

import { ButtonScale } from '../library/main';

describe('ButtonScale', () => {
	let container: HTMLDivElement;

	beforeEach(() => {
		// Set up a fresh DOM for each test
		container = document.createElement('div');
		container.innerHTML = `
			<button class="test-button" style="width: 100px; height: 50px;">Button 1</button>
			<button class="test-button" style="width: 200px; height: 100px;">Button 2</button>
			<button class="different-button" style="width: 150px; height: 75px;">Button 3</button>
		`;
		document.body.appendChild(container);
	});

	afterEach(() => {
		// Clean up the DOM after each test
		document.body.removeChild(container);
	});

	describe('Constructor and Initialization', () => {
		test('should create a ButtonScale instance with default parameters', () => {
			const buttonScale = new ButtonScale('.test-button', {}) as any;

			expect(buttonScale.buttonSelector).toBe('.test-button');
			expect(buttonScale.hoverScale).toBe(false);
			expect(buttonScale.clickScale).toBe(false);
			expect(buttonScale.maxScale).toBe(false);
			expect(buttonScale.minScale).toBe(false);
		});

		test('should create instance with hoverScale parameter', () => {
			const buttonScale = new ButtonScale('.test-button', { hoverScale: 10 }) as any;

			expect(buttonScale.hoverScale).toBe(10);
			expect(buttonScale.clickScale).toBe(false);
		});

		test('should create instance with clickScale parameter', () => {
			const buttonScale = new ButtonScale('.test-button', { clickScale: -5 }) as any;

			expect(buttonScale.hoverScale).toBe(false);
			expect(buttonScale.clickScale).toBe(-5);
		});

		test('should create instance with both hover and click scale', () => {
			const buttonScale = new ButtonScale('.test-button', {
				hoverScale: 10,
				clickScale: -5
			}) as any;

			expect(buttonScale.hoverScale).toBe(10);
			expect(buttonScale.clickScale).toBe(-5);
		});

		test('should create instance with maxScale parameter', () => {
			const buttonScale = new ButtonScale('.test-button', {
				hoverScale: 20,
				maxScale: 1.15
			}) as any;

			expect(buttonScale.maxScale).toBe(1.15);
		});

		test('should create instance with minScale parameter', () => {
			const buttonScale = new ButtonScale('.test-button', {
				clickScale: -20,
				minScale: 0.85
			}) as any;

			expect(buttonScale.minScale).toBe(0.85);
		});

		test('should create instance with all parameters', () => {
			const buttonScale = new ButtonScale('.test-button', {
				hoverScale: 10,
				clickScale: -5,
				maxScale: 1.2,
				minScale: 0.8
			}) as any;

			expect(buttonScale.hoverScale).toBe(10);
			expect(buttonScale.clickScale).toBe(-5);
			expect(buttonScale.maxScale).toBe(1.2);
			expect(buttonScale.minScale).toBe(0.8);
		});
	});

	describe('getElements', () => {
		test('should return all elements matching the selector', () => {
			const buttonScale = new ButtonScale('.test-button', {}) as any;
			const elements = buttonScale.getElements();

			expect(elements.length).toBe(2);
			expect(elements[0].textContent).toBe('Button 1');
			expect(elements[1].textContent).toBe('Button 2');
		});

		test('should return correct element for different selector', () => {
			const buttonScale = new ButtonScale('.different-button', {}) as any;
			const elements = buttonScale.getElements();

			expect(elements.length).toBe(1);
			expect(elements[0].textContent).toBe('Button 3');
		});

		test('should return empty NodeList for non-existent selector', () => {
			const buttonScale = new ButtonScale('.non-existent', {}) as any;
			const elements = buttonScale.getElements();

			expect(elements.length).toBe(0);
		});
	});

	describe('calculateScale', () => {
		let buttonScale: any;
		let element: HTMLElement;

		beforeEach(() => {
			buttonScale = new ButtonScale('.test-button', {}) as any;
			element = document.querySelector('.test-button') as HTMLElement;

			// Mock offsetWidth and offsetHeight
			Object.defineProperty(element, 'offsetWidth', {
				configurable: true,
				value: 100
			});
			Object.defineProperty(element, 'offsetHeight', {
				configurable: true,
				value: 50
			});
		});

		test('should calculate correct scale for positive transform (hover)', () => {
			const scale = buttonScale.calculateScale(element, 10);

			// Original dimension: 100 (width is larger)
			// Updated dimension: 110
			// Scale: 110/100 = 1.10
			expect(scale).toBe(1.10);
		});

		test('should calculate correct scale for negative transform (click)', () => {
			const scale = buttonScale.calculateScale(element, -10);

			// Original dimension: 100
			// Updated dimension: 90
			// Scale: 90/100 = 0.90
			expect(scale).toBe(0.90);
		});

		test('should use larger dimension when height is greater than width', () => {
			Object.defineProperty(element, 'offsetWidth', {
				configurable: true,
				value: 50
			});
			Object.defineProperty(element, 'offsetHeight', {
				configurable: true,
				value: 100
			});

			const scale = buttonScale.calculateScale(element, 10);

			// Original dimension: 100 (height is larger)
			// Updated dimension: 110
			// Scale: 110/100 = 1.10
			expect(scale).toBe(1.10);
		});

		test('should use width when width equals height', () => {
			Object.defineProperty(element, 'offsetWidth', {
				configurable: true,
				value: 100
			});
			Object.defineProperty(element, 'offsetHeight', {
				configurable: true,
				value: 100
			});

			const scale = buttonScale.calculateScale(element, 20);

			// Original dimension: 100
			// Updated dimension: 120
			// Scale: 120/100 = 1.20
			expect(scale).toBe(1.20);
		});

		test('should round to 2 decimal places', () => {
			Object.defineProperty(element, 'offsetWidth', {
				configurable: true,
				value: 99
			});
			Object.defineProperty(element, 'offsetHeight', {
				configurable: true,
				value: 50
			});

			const scale = buttonScale.calculateScale(element, 10);

			// Original dimension: 99
			// Updated dimension: 109
			// Scale: 109/99 = 1.101010... should round to 1.10
			expect(scale).toBe(1.10);
		});
	});

	describe('Hover Scale Functionality', () => {
		test('should apply hover scale on mouseover', () => {
			const buttonScale = new ButtonScale('.test-button', { hoverScale: 10 });
			const element = document.querySelector('.test-button') as HTMLElement;

			Object.defineProperty(element, 'offsetWidth', {
				configurable: true,
				value: 100
			});
			Object.defineProperty(element, 'offsetHeight', {
				configurable: true,
				value: 50
			});

			// Trigger mouseover event
			const mouseoverEvent = new Event('mouseover');
			element.dispatchEvent(mouseoverEvent);

			expect(element.style.transform).toBe('scale(1.1)');
		});

		test('should reset scale on mouseleave', () => {
			const buttonScale = new ButtonScale('.test-button', { hoverScale: 10 });
			const element = document.querySelector('.test-button') as HTMLElement;

			Object.defineProperty(element, 'offsetWidth', {
				configurable: true,
				value: 100
			});
			Object.defineProperty(element, 'offsetHeight', {
				configurable: true,
				value: 50
			});

			// Trigger mouseover then mouseleave
			const mouseoverEvent = new Event('mouseover');
			const mouseleaveEvent = new Event('mouseleave');

			element.dispatchEvent(mouseoverEvent);
			expect(element.style.transform).toBe('scale(1.1)');

			element.dispatchEvent(mouseleaveEvent);
			expect(element.style.transform).toBe('scale(1)');
		});

		test('should not add hover listeners when hoverScale is false', () => {
			const buttonScale = new ButtonScale('.test-button', { clickScale: -5 });
			const element = document.querySelector('.test-button') as HTMLElement;

			Object.defineProperty(element, 'offsetWidth', {
				configurable: true,
				value: 100
			});
			Object.defineProperty(element, 'offsetHeight', {
				configurable: true,
				value: 50
			});

			// Trigger mouseover event
			const mouseoverEvent = new Event('mouseover');
			element.dispatchEvent(mouseoverEvent);

			// Should not have transform applied
			expect(element.style.transform).toBe('');
		});

		test('should apply maxScale constraint on hover', () => {
			const buttonScale = new ButtonScale('.test-button', {
				hoverScale: 20,
				maxScale: 1.15
			});
			const element = document.querySelector('.test-button') as HTMLElement;

			Object.defineProperty(element, 'offsetWidth', {
				configurable: true,
				value: 100
			});
			Object.defineProperty(element, 'offsetHeight', {
				configurable: true,
				value: 50
			});

			// Trigger mouseover event
			const mouseoverEvent = new Event('mouseover');
			element.dispatchEvent(mouseoverEvent);

			// Would be 1.20 without maxScale, should be capped at 1.15
			expect(element.style.transform).toBe('scale(1.15)');
		});

		test('should not apply maxScale when scale is below max', () => {
			const buttonScale = new ButtonScale('.test-button', {
				hoverScale: 10,
				maxScale: 1.20
			});
			const element = document.querySelector('.test-button') as HTMLElement;

			Object.defineProperty(element, 'offsetWidth', {
				configurable: true,
				value: 100
			});
			Object.defineProperty(element, 'offsetHeight', {
				configurable: true,
				value: 50
			});

			// Trigger mouseover event
			const mouseoverEvent = new Event('mouseover');
			element.dispatchEvent(mouseoverEvent);

			// Should be 1.10, which is below maxScale of 1.20
			expect(element.style.transform).toBe('scale(1.1)');
		});
	});

	describe('Click Scale Functionality', () => {
		test('should apply click scale on mousedown', () => {
			const buttonScale = new ButtonScale('.test-button', { clickScale: -10 });
			const element = document.querySelector('.test-button') as HTMLElement;

			Object.defineProperty(element, 'offsetWidth', {
				configurable: true,
				value: 100
			});
			Object.defineProperty(element, 'offsetHeight', {
				configurable: true,
				value: 50
			});

			// Trigger mousedown event
			const mousedownEvent = new Event('mousedown');
			element.dispatchEvent(mousedownEvent);

			expect(element.style.transform).toBe('scale(0.9)');
		});

		test('should reset to hover scale on mouseup when hoverScale is set', () => {
			const buttonScale = new ButtonScale('.test-button', {
				hoverScale: 10,
				clickScale: -10
			});
			const element = document.querySelector('.test-button') as HTMLElement;

			Object.defineProperty(element, 'offsetWidth', {
				configurable: true,
				value: 100
			});
			Object.defineProperty(element, 'offsetHeight', {
				configurable: true,
				value: 50
			});

			// Trigger mousedown then mouseup
			const mousedownEvent = new Event('mousedown');
			const mouseupEvent = new Event('mouseup');

			element.dispatchEvent(mousedownEvent);
			expect(element.style.transform).toBe('scale(0.9)');

			element.dispatchEvent(mouseupEvent);
			expect(element.style.transform).toBe('scale(1.1)');
		});

		test('should reset to scale(1) on mouseup when hoverScale is false', () => {
			const buttonScale = new ButtonScale('.test-button', { clickScale: -10 });
			const element = document.querySelector('.test-button') as HTMLElement;

			Object.defineProperty(element, 'offsetWidth', {
				configurable: true,
				value: 100
			});
			Object.defineProperty(element, 'offsetHeight', {
				configurable: true,
				value: 50
			});

			// Trigger mousedown then mouseup
			const mousedownEvent = new Event('mousedown');
			const mouseupEvent = new Event('mouseup');

			element.dispatchEvent(mousedownEvent);
			expect(element.style.transform).toBe('scale(0.9)');

			element.dispatchEvent(mouseupEvent);
			// When hoverScale is false (0), calculateScale returns 1
			expect(element.style.transform).toBe('scale(1)');
		});

		test('should not add click listeners when clickScale is false', () => {
			const buttonScale = new ButtonScale('.test-button', { hoverScale: 10 });
			const element = document.querySelector('.test-button') as HTMLElement;

			Object.defineProperty(element, 'offsetWidth', {
				configurable: true,
				value: 100
			});
			Object.defineProperty(element, 'offsetHeight', {
				configurable: true,
				value: 50
			});

			// Trigger mousedown event
			const mousedownEvent = new Event('mousedown');
			element.dispatchEvent(mousedownEvent);

			// Should not have transform applied from click
			expect(element.style.transform).toBe('');
		});

		test('should apply minScale constraint on click', () => {
			const buttonScale = new ButtonScale('.test-button', {
				clickScale: -20,
				minScale: 0.85
			});
			const element = document.querySelector('.test-button') as HTMLElement;

			Object.defineProperty(element, 'offsetWidth', {
				configurable: true,
				value: 100
			});
			Object.defineProperty(element, 'offsetHeight', {
				configurable: true,
				value: 50
			});

			// Trigger mousedown event
			const mousedownEvent = new Event('mousedown');
			element.dispatchEvent(mousedownEvent);

			// Would be 0.80 without minScale, should be capped at 0.85
			expect(element.style.transform).toBe('scale(0.85)');
		});

		test('should not apply minScale when scale is above min', () => {
			const buttonScale = new ButtonScale('.test-button', {
				clickScale: -10,
				minScale: 0.80
			});
			const element = document.querySelector('.test-button') as HTMLElement;

			Object.defineProperty(element, 'offsetWidth', {
				configurable: true,
				value: 100
			});
			Object.defineProperty(element, 'offsetHeight', {
				configurable: true,
				value: 50
			});

			// Trigger mousedown event
			const mousedownEvent = new Event('mousedown');
			element.dispatchEvent(mousedownEvent);

			// Should be 0.90, which is above minScale of 0.80
			expect(element.style.transform).toBe('scale(0.9)');
		});
	});

	describe('Multiple Elements', () => {
		test('should apply hover effect to all matching elements', () => {
			const buttonScale = new ButtonScale('.test-button', { hoverScale: 10 });
			const elements = document.querySelectorAll('.test-button');

			elements.forEach(element => {
				Object.defineProperty(element, 'offsetWidth', {
					configurable: true,
					value: 100
				});
				Object.defineProperty(element, 'offsetHeight', {
					configurable: true,
					value: 50
				});
			});

			// Trigger mouseover on first element
			const mouseoverEvent = new Event('mouseover');
			elements[0].dispatchEvent(mouseoverEvent);

			expect((elements[0] as HTMLElement).style.transform).toBe('scale(1.1)');

			// Second element should not be affected
			expect((elements[1] as HTMLElement).style.transform).toBe('');

			// Trigger mouseover on second element
			elements[1].dispatchEvent(mouseoverEvent);
			expect((elements[1] as HTMLElement).style.transform).toBe('scale(1.1)');
		});

		test('should apply click effect to all matching elements independently', () => {
			const buttonScale = new ButtonScale('.test-button', { clickScale: -10 });
			const elements = document.querySelectorAll('.test-button');

			elements.forEach(element => {
				Object.defineProperty(element, 'offsetWidth', {
					configurable: true,
					value: 100
				});
				Object.defineProperty(element, 'offsetHeight', {
					configurable: true,
					value: 50
				});
			});

			// Trigger mousedown on first element
			const mousedownEvent = new Event('mousedown');
			elements[0].dispatchEvent(mousedownEvent);

			expect((elements[0] as HTMLElement).style.transform).toBe('scale(0.9)');

			// Second element should not be affected
			expect((elements[1] as HTMLElement).style.transform).toBe('');
		});
	});

	describe('Edge Cases', () => {
		test('should handle zero transform scale', () => {
			// When hoverScale is 0 (falsy), hover listeners are not added
			const buttonScale = new ButtonScale('.test-button', { hoverScale: 0 });
			const element = document.querySelector('.test-button') as HTMLElement;

			Object.defineProperty(element, 'offsetWidth', {
				configurable: true,
				value: 100
			});
			Object.defineProperty(element, 'offsetHeight', {
				configurable: true,
				value: 50
			});

			const mouseoverEvent = new Event('mouseover');
			element.dispatchEvent(mouseoverEvent);

			// When hoverScale is 0 (falsy), no event listeners are attached
			expect(element.style.transform).toBe('');
		});

		test('should handle very small elements', () => {
			const buttonScale = new ButtonScale('.test-button', { hoverScale: 10 }) as any;
			const element = document.querySelector('.test-button') as HTMLElement;

			Object.defineProperty(element, 'offsetWidth', {
				configurable: true,
				value: 10
			});
			Object.defineProperty(element, 'offsetHeight', {
				configurable: true,
				value: 5
			});

			const scale = buttonScale.calculateScale(element, 10);

			// 10 + 10 = 20, 20/10 = 2.00
			expect(scale).toBe(2.00);
		});

		test('should handle negative scale values correctly', () => {
			const buttonScale = new ButtonScale('.test-button', { clickScale: -50 }) as any;
			const element = document.querySelector('.test-button') as HTMLElement;

			Object.defineProperty(element, 'offsetWidth', {
				configurable: true,
				value: 100
			});
			Object.defineProperty(element, 'offsetHeight', {
				configurable: true,
				value: 50
			});

			const scale = buttonScale.calculateScale(element, -50);

			// 100 - 50 = 50, 50/100 = 0.50
			expect(scale).toBe(0.50);
		});
	});
});
