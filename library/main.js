/**
 * Initialize the ButtonScale class with a selector and parameters.
 * @param {string} buttonSelector - The selector for the button elements.
 * @param {Object} parameters - An object containing optional parameters such as hoverScale and clickScale. Default values are false if not provided.
*/
class ButtonScale {
	constructor(buttonSelector, parameters) {
		this.buttonSelector = buttonSelector;
		this.parameters = parameters;
		this.hoverScale = this.parameters.hoverScale || false;
		this.clickScale = this.parameters.clickScale || false;

		this.init()
	}

	/*
	 * Initialize the button elements
	*/
	init() {
		let elements = this.getElements();

		for (let i = 0; i < elements.length; i++) {
			let element = elements[i];
			if (this.hoverScale) this.initHoverScale(element)
			if (this.clickScale) this.initMouseDownScale(element);
		}
	}

	/**
	 * Initialize the hover effect for the button elements
	 * @param {Element} element - The button element to initialize the hover effect for.
	*/
	initHoverScale(element) {
		element.addEventListener("mouseover", () => {
			let scale = this.calculateScale(element, this.hoverScale);
			element.style.transform = `scale(${scale})`;
		});
		element.addEventListener("mouseleave", () => {
			element.style.transform = `scale(1)`;
		});
	}

	/**
	 * Initialize the click effect for the button elements
	 * @param {Element} element - The button element to initialize the click effect for.
	*/
	initMouseDownScale(element) {
		element.addEventListener("mousedown", () => {
			let scale = this.calculateScale(element, this.clickScale);
			element.style.transform = `scale(${scale})`;
		});
		element.addEventListener("mouseup", () => {
			let scale = this.calculateScale(element, this.hoverScale);
			element.style.transform = `scale(${scale})`;
		});
	}

	/**
	 * Calculate the new scale value based on the original width and the transform scale
	 * @param {number} elementWidth - The width of the button element.
	 * @param {number} transformScale - The value to scale the button on hover or click.
	 * @returns {number} The new scale value.
	*/
	calculateScale(element, transformScale) {
		let elementWidth = element.offsetWidth;
		let elementHeight = element.offsetHeight;

		// We need the larger dimension to scale properly
		let elementDimension;
		if(elementHeight > elementWidth) {
			elementDimension = elementHeight;
		} else {
			elementDimension = elementWidth;
		}

		let originalDimension = elementDimension;
		let updatedDimension = elementDimension + transformScale;
		return (updatedDimension / originalDimension).toFixed(2); // Round to 2 decimal places before returning
	}

	/**
	 * Initialize the hover effect for the button elements
	 * @returns {Element[]} An array of all the button elements.
	*/
	getElements() {
		return document.querySelectorAll(this.buttonSelector);
	}
}