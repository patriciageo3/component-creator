window.onload = function() {
	
	/* Variables - get the html elements */
	const componentsButtons = document.querySelectorAll(".component_name");
	const customizeBoards = document.querySelectorAll(".elements");
	const createBtnButton = document.querySelector(".create_component.button");
	const createParaButton = document.querySelector(".create_component.paragraph");
	const componentContainers = document.querySelectorAll(".component_container");
	const createdComponents = document.querySelectorAll("created_component");
	
	let index = 0;
	let timer = 0;
	let stopClick = false;
	
	// Button custom properties:
	let btnColor = "";
	const btnColorInput = document.querySelector("#btn_color");
	let btnBorderColor = "";
	const btnBorderColorInput = document.querySelector("#btn_borderColor");
	let btnTextColor = "";
	const btnTextColorInput = document.querySelector("#btn_textColor");
	
	// Paragraph custom properties:
	let paraColor = "";
	const paraColorInput = document.querySelector("#para_color");
	let paraBorderColor = "";
	const paraBorderColorInput = document.querySelector("#para_borderColor");
	let paraTextColor = "";
	const paraTextColorInput = document.querySelector("#para_textColor");
	
	/* Define functions & Classes */
	class ComponentConstructor { 
		constructor(width, height, text, textColor, fontSize, padding, color, borderColor,  borderWidth, borderStyle) {
			this.width = width ? width + "px" : "80%";
			this.height = height ? height + "px" : "20%";
			this.text = text || "Sample";
			this.textColor = textColor || "";
			this.fontSize = fontSize ? fontSize + "px" : "";
			this.padding = padding ? padding + "px" : "5px";
			this.index = ++index;
			this.color = color || "";
			this.borderColor = borderColor || "";
			this.borderWidth = borderWidth ? borderWidth + "px" : "";
			this.borderStyle = borderStyle ? borderStyle : "";
		}
		
		create(componentType) {
				let mainContainer = document.querySelector(".main");
				let componentContainer = document.createElement("div");
				componentContainer.id = componentType + " " + this.index;
				componentContainer.className = "component_container";
				componentContainer.ondblclick = this.removeComponent;
				
				let component = document.createElement(componentType);
				component.className = "created_component";
				component.textContent = this.text;
				component.style.color = this.textColor;
				component.style.fontSize = this.fontSize;
				component.style.width = this.width;
				component.style.height = this.height;
				component.style.padding = this.padding;
				component.style.backgroundColor = this.color;
				component.style.borderColor = this.borderColor;
				component.style.borderWidth = this.borderWidth;
				component.style.borderStyle = this.borderStyle;
				component.onclick = this.handleClick;
				
				componentContainer.appendChild(component);
				mainContainer.appendChild(componentContainer);
			}
		
		
		handleClick() {
			timer = setTimeout(() => {
				if (!stopClick) {
					alert(`component ${this.parentElement.id} clicked!`);	
				}
				stopClick = false;
			}, 200);
			
		}
		
		removeComponent() {
			clearTimeout(timer);
			stopClick = true;
			let mainContainer = document.querySelector(".main");
			mainContainer.removeChild(this);
		}	
		
	}
	
	
	function showCustomizedBoard() {
		this.classList.toggle("active");
		let board = customizeBoards[this.dataset.key]; //take corresponding board dinamically
		board.classList.toggle("show");
	}
	
	function createComponent(componentType, hook) {
		let width = document.querySelector("#" + hook + "_width").value;
		let height = document.querySelector("#" + hook + "_height").value;
		let textBtn = document.querySelector("#" + hook + "_text").value;
		let fontSize = document.querySelector("#" + hook + "_fontSize").value;
		let padding = document.querySelector("#" + hook + "_pad").value;
		
		let bgColor;
		let borderColor;
		let textColor;
		if (hook === "btn") {
			bgColor = btnColor || "";
			borderColor = btnBorderColor || "";
			textColor = btnTextColor || "";
		} else if (hook === "para") {
			bgColor = paraColor || "";
			borderColor = paraBorderColor || "";
			textColor = paraTextColor || "";
		}
		
		let borderWidth = document.querySelector("#" + hook + "_borderWidth").value;
		let borderStyle = document.querySelector("#" + hook + "_borderStyle").value;
		
		let component = new ComponentConstructor(width, height, textBtn, textColor, fontSize, padding, bgColor, borderColor, borderWidth, borderStyle);
		component.create(componentType);
	}
	
	
	
	//Component custom property functions:
	function getTextColor(hook) {
		if (hook === "btn") { 
			btnTextColor =  btnTextColorInput.value;
		} else if (hook === "para") {
			paraTextColor =  paraTextColorInput.value;
		}
	}	
	
	function getBgColor(hook) {
		if (hook === "btn") { 
			btnColor =  btnColorInput.value;
		} else if (hook === "para") {
			paraColor =  paraColorInput.value;
		}
	}
	
	function getBorderColor(hook) {
		if (hook === "btn") { 
			btnBorderColor = btnBorderColorInput.value;
		} else if (hook === "para") {
			paraBorderColor = paraBorderColorInput.value;
		}	
	}
	
	
	/* Event Listeners */
	componentsButtons.forEach(elem => elem.addEventListener("click", showCustomizedBoard));
	createBtnButton.addEventListener("click", createComponent.bind(null, "button", "btn"));
	createParaButton.addEventListener("click", createComponent.bind(null, "p", "para"));
	componentContainers.forEach(elem => elem.addEventListener("dblclick", removeComponent));
	createdComponents.forEach(elem => elem.addEventListener("click", this.handleClick));
	
	// Component custom property listeners:
	btnTextColorInput.addEventListener("change", getTextColor.bind(null, "btn"));
	btnColorInput.addEventListener("change", getBgColor.bind(null, "btn"));
	btnBorderColorInput.addEventListener("change", getBorderColor.bind(null, "btn"));
	paraColorInput.addEventListener("change", getBgColor.bind(null, "para"));
	paraBorderColorInput.addEventListener("change", getBorderColor.bind(null, "para"));
	paraTextColorInput.addEventListener("change", getTextColor.bind(null, "para"));
	
};