/**
 * Button Scale Library
 * A JavaScript library for adding pixel-based scale animations to buttons
 *
 * @author Francesco Ciannavei
 * @license MIT
 * @version 1.0.2
 *
 * @see {@link https://github.com/Franky5831/JS-Lib-Scale|GitHub Repository}
 * @see {@link https://franky5831.github.io/JS-Lib-Scale/|Documentation}
 */

/**
 * Parameters for configuring the ButtonScale behavior
 */
export interface ButtonScaleParameters {
	/** Number of pixels to scale on hover (default: false/disabled) */
	hoverScale?: number | false;
	/** Number of pixels to scale on click (default: false/disabled) */
	clickScale?: number | false;
	/** Maximum scale value to apply */
	maxScale?: number | false;
	/** Minimum scale value to apply */
	minScale?: number | false;
	/** CSS class to add on hover */
	hoverClass?: string | false;
	/** CSS class to add on click */
	clickClass?: string | false;
}

/**
 * Initialize the ButtonScale class with a selector and parameters.
 */
export class ButtonScale {
	private buttonSelector: string;
	private parameters: ButtonScaleParameters;
	private hoverScale: number | false;
	private clickScale: number | false;
	private maxScale: number | false;
	private minScale: number | false;
	private hoverClass: string[] | false;
	private clickClass: string[] | false;

	/**
	 * @param buttonSelector - The selector for the button elements.
	 * @param parameters - An object containing optional parameters such as hoverScale and clickScale. Default values are false if not provided.
	 */
	constructor(buttonSelector: string, parameters: ButtonScaleParameters = {}) {
		this.buttonSelector = buttonSelector;
		this.parameters = parameters;

		this.hoverScale = this.parameters.hoverScale || false;
		this.clickScale = this.parameters.clickScale || false;

		this.maxScale = this.parameters.maxScale || false;
		this.minScale = this.parameters.minScale || false;

		this.hoverClass = this.parseClassTokens(this.parameters.hoverClass);
		this.clickClass = this.parseClassTokens(this.parameters.clickClass);

		this.init();
	}

	/**
	 * Parse and validate class tokens from a string
	 * @param classString - The class string to parse (can contain multiple classes)
	 * @returns An array of valid class tokens, or false if no valid classes
	 */
	private parseClassTokens(classString: string | false | undefined): string[] | false {
		if (!classString) return false;

		// Split by whitespace and filter out empty strings
		const tokens = classString.trim().split(/\s+/).filter(token => token.length > 0);

		if (tokens.length === 0) return false;

		// Validate each token - DOMTokenList doesn't allow tokens with whitespace
		// If any token is invalid, throw an error to alert the developer
		for (const token of tokens) {
			if (/\s/.test(token)) {
				console.error(`Invalid class token: "${token}" contains whitespace characters`);
				return false;
			}
		}

		return tokens;
	}

	/**
	 * Initialize the button elements
	 */
	private init(): void {
		const elements = this.getElements();

		for (let i = 0; i < elements.length; i++) {
			const element = elements[i];
			if (this.hoverScale) this.initHoverScale(element);
			if (this.clickScale) this.initMouseDownScale(element);
		}
	}

	/**
	 * Initialize the hover effect for the button elements
	 * @param element - The button element to initialize the hover effect for.
	 */
	private initHoverScale(element: Element): void {
		element.addEventListener("mouseover", () => {
			let scale = this.calculateScale(element, this.hoverScale as number);
			if (this.maxScale && scale > this.maxScale) scale = this.maxScale;
			if (this.hoverClass) element.classList.add(...this.hoverClass);
			(element as HTMLElement).style.transform = `scale(${scale})`;
		});

		element.addEventListener("mouseleave", () => {
			(element as HTMLElement).style.transform = `scale(1)`;
			if (this.hoverClass) element.classList.remove(...this.hoverClass);
		});
	}

	/**
	 * Initialize the click effect for the button elements
	 * @param element - The button element to initialize the click effect for.
	 */
	private initMouseDownScale(element: Element): void {
		element.addEventListener("mousedown", () => {
			let scale = this.calculateScale(element, this.clickScale as number);
			if (this.minScale && scale < this.minScale) scale = this.minScale;
			if (this.clickClass) element.classList.add(...this.clickClass);
			(element as HTMLElement).style.transform = `scale(${scale})`;
		});

		element.addEventListener("mouseup", () => {
			let scale = this.calculateScale(element, this.hoverScale as number);
			(element as HTMLElement).style.transform = `scale(${scale})`;
			if (this.clickClass) element.classList.remove(...this.clickClass);
		});
	}

	/**
	 * Calculate the new scale value based on the original width and the transform scale
	 * @param element - The button element to calculate the scale for.
	 * @param transformScale - The value to scale the button on hover or click.
	 * @returns The new scale value.
	 */
	private calculateScale(element: Element, transformScale: number): number {
		const htmlElement = element as HTMLElement;
		const elementWidth = htmlElement.offsetWidth;
		const elementHeight = htmlElement.offsetHeight;

		// We need the larger dimension to scale properly
		const elementDimension = elementHeight > elementWidth ? elementHeight : elementWidth;

		const originalDimension = elementDimension;
		const updatedDimension = elementDimension + transformScale;
		return parseFloat((updatedDimension / originalDimension).toFixed(2)); // Round to 2 decimal places before returning
	}

	/**
	 * Get all button elements matching the selector
	 * @returns An array of all the button elements.
	 */
	private getElements(): NodeListOf<Element> {
		return document.querySelectorAll(this.buttonSelector);
	}
}

export default ButtonScale;
