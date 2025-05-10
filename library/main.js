class ButtonScale {
	constructor(buttonSelector, parameters) {
		this.buttonSelector = buttonSelector;
		this.parameters = parameters;
		this.hoverScale = this.parameters.hoverScale || false;
		this.clickScale = this.parameters.clickScale || false;

		this.init()
	}

	init() {
		let elements = this.getElements();

		for (let i = 0; i < elements.length; i++) {
			let element = elements[i];
			if (this.hoverScale) this.initHoverScale(element)
			if (this.clickScale) this.initMouseDownScale(element);
		}
	}

	initHoverScale(element) {
		element.addEventListener("mouseover", () => {
			let scale = this.calculateScale(element.offsetWidth, this.hoverScale);
			element.style.transform = `scale(${scale})`;
		});
		element.addEventListener("mouseleave", () => {
			element.style.transform = `scale(1)`;
		});
	}

	initMouseDownScale(element) {
		element.addEventListener("mousedown", () => {
			let scale = this.calculateScale(element.offsetWidth, this.clickScale);
			element.style.transform = `scale(${scale})`;
		});
		element.addEventListener("mouseup", () => {
			let scale = this.calculateScale(element.offsetWidth, this.hoverScale);
			element.style.transform = `scale(${scale})`;
		});
	}

	calculateScale(elementWidth, transformScale) {
		let originalWidth = elementWidth;
		let updatedWidth = elementWidth + transformScale;
		return (updatedWidth / originalWidth).toFixed(2);
	}

	getElements() {
		return document.querySelectorAll(this.buttonSelector);
	}
}