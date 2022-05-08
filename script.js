"use strict;";

const colorPicker = document.querySelector("#color");

window.addEventListener("DOMContentLoaded", start);

// init function, setting all the values to white
function start() {
	document.querySelector(".hex").textContent = colorPicker.value;
	document.querySelector(".rgb").textContent = "rgb: 255, 255, 255";
	document.querySelector(".hsl").textContent = "hsl: 0, 0, 100";
	document.querySelector(".css").textContent = "rgb(0, 0, 0)";
	getColors();
}

//************************ MODEL ************************
// Get HEX color values
function getColors() {
	let hexColorValue, rgbColorValue, cssColorValue, hslColorValue;
	colorPicker.addEventListener("input", (e) => {
		let schemeValue = document.querySelector("#colorscheme").value;
		let colorPickValue = e.target.value;

		// HEX Value
		hexColorValue = `${colorPickValue}`;
		//RGB Value
		rgbColorValue = hexToRgb(hexColorValue);
		//CSS Value
		cssColorValue = rgbToCss(rgbColorValue);
		//HSL Value
		hslColorValue = rgbToHsl(rgbColorValue.r, rgbColorValue.g, rgbColorValue.b);
		document.querySelector("#colorscheme");
		displayColors(hexColorValue, rgbColorValue, cssColorValue, hslColorValue, schemeValue);
	});
}

//************************ VIEW ************************
function displayColors(hex, rgb, css, hsl, schemeValue) {
	//Set body background color
	document.querySelector(".color3").style.setProperty("--selectedColor", `${hex}`);
	// Display base color
	document.querySelector(".hex").textContent = hex;
	document.querySelector(".rgb").textContent = `rgb: ${rgb.r}, ${rgb.g},${rgb.b}`;
	document.querySelector(".hsl").textContent = `hsl: ${hsl.h}, ${hsl.s}, ${hsl.l}`;
	document.querySelector(".css").textContent = `css: rgb(${css.r}, ${css.g}, ${css.b})`;
	document.querySelector(".css").textContent = `css: rgb(${css.r}, ${css.g}, ${css.b})`;
	colorThreeText(hsl);

	// Show Values based on color scheme
	switch (schemeValue) {
		case "analogous":
			displayAnalogous(hsl);
			break;
		case "monochrome":
			displayMonochromatic(hsl);
			break;
		case "triad":
			displayTriad(hsl);
			break;
		case "complementary":
			displayComplementary(hsl);
			break;
		case "compound":
			displayCompound(hsl);
			break;
		case "shades":
			displayShades(hsl);
			break;
	}
}

//************************ Conversion ************************
/* HEX to RGB */
function hexToRgb(hexString) {
	r = parseInt(hexString.substring(1, 3), 16);
	g = parseInt(hexString.substring(3, 5), 16);
	b = parseInt(hexString.substring(5, 7), 16);
	// return { r: r, g: g, b: b };
	return { r, g, b };
}

/* RGB TO HEX */
function rgbToHex(rgbObject) {
	let r, g, b;
	r = convertion(rgbObject.r);
	g = convertion(rgbObject.g);
	b = convertion(rgbObject.b);
	// rgbToHsl(rgbObject.r, rgbObject.g, rgbObject.b);
	return `#${r}${g}${b}`;
}
function convertion(color) {
	let hex = color.toString(16);
	return hex.length === 1 ? "0" + hex : hex;
}

/* CSS to RGB */
function rgbToCss(rgb) {
	let r, g, b;
	r = rgb.r;
	g = rgb.g;
	b = rgb.b;
	return { r, g, b };
}

/* HSL Convertion */
function rgbToHsl(r, g, b) {
	r /= 255;
	g /= 255;
	b /= 255;

	let h, s, l;

	const min = Math.min(r, g, b);
	const max = Math.max(r, g, b);

	if (max === min) {
		h = 0;
	} else if (max === r) {
		h = 60 * (0 + (g - b) / (max - min));
	} else if (max === g) {
		h = 60 * (2 + (b - r) / (max - min));
	} else if (max === b) {
		h = 60 * (4 + (r - g) / (max - min));
	}

	if (h < 0) {
		h = h + 360;
	}

	l = (min + max) / 2;

	if (max === 0 || min === 1) {
		s = 0;
	} else {
		s = (max - l) / Math.min(l, 1 - l);
	}

  s *= 100;
	l *= 100;

	return { h: Math.round(h), s: Math.round(s), l: Math.round(l) };
}

/* HSL Convertion */
function hslToRgb(hslObj) {
	h = hslObj.h;
	s = hslObj.s / 100;
	l = hslObj.l / 100;

	let c = (1 - Math.abs(2 * l - 1)) * s,
		x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
		m = l - c / 2,
		r = 0,
		g = 0,
		b = 0;
	if (0 <= h && h < 60) {
		r = c;
		g = x;
		b = 0;
	} else if (60 <= h && h < 120) {
		r = x;
		g = c;
		b = 0;
	} else if (120 <= h && h < 180) {
		r = 0;
		g = c;
		b = x;
	} else if (180 <= h && h < 240) {
		r = 0;
		g = x;
		b = c;
	} else if (240 <= h && h < 300) {
		r = x;
		g = 0;
		b = c;
	} else if (300 <= h && h < 360) {
		r = c;
		g = 0;
		b = x;
	}
	r = Math.round((r + m) * 255);
	g = Math.round((g + m) * 255);
	b = Math.round((b + m) * 255);

	return { r, g, b };
}

//************************ Color Schemes ************************
function cleanUpHsl(hslObj) {
	if (hslObj.h > 360) {
		hslObj.h -= 360;
	}
	if (hslObj.h < 0) {
		hslObj.h += 360;
	}
	if (hslObj.s > 100) {
		hslObj.s = 100;
	}
	if (hslObj.s < 0) {
		hslObj.s *= -1;
	}
	if (hslObj.l > 100) {
		hslObj.l -= 100;
	}
	if (hslObj.l < 0) {
		hslObj.l *= -1;
	}

	return hslObj;
}

// Display and calc for the analogous
function displayAnalogous(hslObj) {
	let newHsl = calcAnalogous(hslObj);

	document.querySelector(".color1").style.setProperty("--firstColor", `hsl(${newHsl[0].h}, ${newHsl[0].s}%, ${newHsl[0].l}%)`);
	document.querySelector(".color2").style.setProperty("--secondColor", `hsl(${newHsl[1].h}, ${newHsl[1].s}%, ${newHsl[1].l}%)`);
	document.querySelector(".color4").style.setProperty("--thirdColor", `hsl(${newHsl[2].h}, ${newHsl[2].s}%, ${newHsl[2].l}%)`);
	document.querySelector(".color5").style.setProperty("--fourthColor", `hsl(${newHsl[3].h}, ${newHsl[3].s}%, ${newHsl[3].l}%)`);

	setAllColorTexts(newHsl, hslObj);
}

function calcAnalogous(hslObj) {
	let hsl = cleanUpHsl(hslObj);
	let hslArr = [];
	hslArr.push({ h: hsl.h / 4, s: hsl.s, l: hsl.l });
	hslArr.push({ h: hsl.h / 2, s: hsl.s, l: hsl.l });
	hslArr.push({ h: hsl.h / 2, s: hsl.s, l: hsl.l });
	hslArr.push({ h: hsl.h / 4, s: hsl.s, l: hsl.l });
	return hslArr;
}
// Display and calc for the monochromatic
function displayMonochromatic(hslObj) {
	let newHsl = calcMonochromatic(hslObj);

  document.querySelector(".color1").style.setProperty("--firstColor", `hsl(${newHsl[0].h}, ${newHsl[0].s}%, ${newHsl[0].l}%)`);
	document.querySelector(".color2").style.setProperty("--secondColor", `hsl(${newHsl[1].h}, ${newHsl[1].s}%, ${newHsl[1].l}%)`);
	document.querySelector(".color4").style.setProperty("--thirdColor", `hsl(${newHsl[2].h}, ${newHsl[2].s}%, ${newHsl[2].l}%)`);
	document.querySelector(".color5").style.setProperty("--fourthColor", `hsl(${newHsl[3].h}, ${newHsl[3].s}%, ${newHsl[3].l}%)`);

  setAllColorTexts(newHsl, hslObj);
}

function calcMonochromatic(hslObj) {
	let hsl = cleanUpHsl(hslObj);
	let hslArr = [];
	hslArr.push({ h: hsl.h, s: hsl.s / 2, l: hsl.l });
	hslArr.push({ h: hsl.h, s: hsl.s / 3, l: hsl.l });
	hslArr.push({ h: hsl.h, s: hsl.s, l: hsl.l / 2 });
	hslArr.push({ h: hsl.h, s: hsl.s, l: hsl.l / 3 });
	return hslArr;
}

// Display and calc for the triad
function displayTriad(hslObj) {
	let newHsl = calcTriad(hslObj);
	newHsl.forEach((el) => {
		cleanUpHsl(el);
	});
	console.log(newHsl[0]);

	document.querySelector(".color1").style.setProperty("--firstColor", `hsl(${newHsl[0].h}, ${newHsl[0].s}%, ${newHsl[0].l}%)`);
	document.querySelector(".color2").style.setProperty("--secondColor", `hsl(${newHsl[1].h}, ${newHsl[1].s}%, ${newHsl[1].l}%)`);
	document.querySelector(".color4").style.setProperty("--thirdColor", `hsl(${newHsl[2].h}, ${newHsl[2].s}%, ${newHsl[2].l}%)`);
	document.querySelector(".color5").style.setProperty("--fourthColor", `hsl(${newHsl[3].h}, ${newHsl[3].s}%, ${newHsl[3].l}%)`);

  setAllColorTexts(newHsl, hslObj);
}

function calcTriad(hslObj) {
	let hslArr = [];
	hslArr.push({ h: hslObj.h + 60, s: hslObj.s, l: hslObj.l });
	hslArr.push({ h: hslObj.h + 60, s: hslObj.s, l: hslObj.l });
	hslArr.push({ h: hslObj.h + 120, s: hslObj.s, l: hslObj.l });
	hslArr.push({ h: hslObj.h + 120, s: hslObj.s, l: hslObj.l });
	return hslArr;
}
// Display and calc for the complementary
function displayComplementary(hslObj) {
	let newHsl = calcComplementary(hslObj);

	document.querySelector(".color1").style.setProperty("--firstColor", `hsl(${newHsl[0].h}, ${newHsl[0].s}%, ${newHsl[0].l}%)`);
	document.querySelector(".color2").style.setProperty("--secondColor", `hsl(${newHsl[1].h}, ${newHsl[1].s}%, ${newHsl[1].l}%)`);
	document.querySelector(".color4").style.setProperty("--thirdColor", `hsl(${newHsl[2].h}, ${newHsl[2].s}%, ${newHsl[2].l}%)`);
	document.querySelector(".color5").style.setProperty("--fourthColor", `hsl(${newHsl[3].h}, ${newHsl[3].s}%, ${newHsl[3].l}%)`);

	setAllColorTexts(newHsl, hslObj);
}
function calcComplementary(hslObj) {
	let hsl = cleanUpHsl(hslObj);
	let hslArr = [];
	hslArr.push({ h: hsl.h - 90, s: hsl.s, l: hsl.l });
	hslArr.push({ h: hsl.h - 180, s: hsl.s, l: hsl.l });
	hslArr.push({ h: hsl.h + 90, s: hsl.s, l: hsl.l });
	hslArr.push({ h: hsl.h - 180, s: hsl.s, l: hsl.l });
	return hslArr;
}

// Display and calc for the compound
function displayCompound(hslObj) {
	let newHsl = calcCompound(hslObj);

	document.querySelector(".color1").style.setProperty("--firstColor", `hsl(${newHsl[0].h}, ${newHsl[0].s}%, ${newHsl[0].l}%)`);
	document.querySelector(".color2").style.setProperty("--secondColor", `hsl(${newHsl[1].h}, ${newHsl[1].s}%, ${newHsl[1].l}%)`);
	document.querySelector(".color4").style.setProperty("--thirdColor", `hsl(${newHsl[2].h}, ${newHsl[2].s}%, ${newHsl[2].l}%)`);
	document.querySelector(".color5").style.setProperty("--fourthColor", `hsl(${newHsl[3].h}, ${newHsl[3].s}%, ${newHsl[3].l}%)`);

	setAllColorTexts(newHsl, hslObj);
}

function calcCompound(hslObj) {
	let hsl = cleanUpHsl(hslObj);
	let hslArr = [];
	hslArr.push({ h: hsl.h / 2, s: hsl.s, l: hsl.l });
	hslArr.push({ h: hsl.h - 180, s: hsl.s, l: hsl.l });
	hslArr.push({ h: hsl.h / 4, s: hsl.s, l: hsl.l });
	hslArr.push({ h: hsl.h - 180, s: hsl.s, l: hsl.l });
	return hslArr;
}

// Display and calc for the shades
function displayShades(hslObj) {
	let newHsl = calcShades(hslObj);

  document.querySelector(".color1").style.setProperty("--firstColor", `hsl(${newHsl[0].h}, ${newHsl[0].s}%, ${newHsl[0].l}%)`);
	document.querySelector(".color2").style.setProperty("--secondColor", `hsl(${newHsl[1].h}, ${newHsl[1].s}%, ${newHsl[1].l}%)`);
	document.querySelector(".color4").style.setProperty("--thirdColor", `hsl(${newHsl[2].h}, ${newHsl[2].s}%, ${newHsl[2].l}%)`);
	document.querySelector(".color5").style.setProperty("--fourthColor", `hsl(${newHsl[3].h}, ${newHsl[3].s}%, ${newHsl[3].l}%)`);

  setAllColorTexts(newHsl, hslObj);
}
function calcShades(hslObj) {
	let hsl = cleanUpHsl(hslObj);
	let hslArr = [];
	hslArr.push({ h: hsl.h, s: hsl.s, l: hsl.l / 2 });
	hslArr.push({ h: hsl.h, s: hsl.s, l: hsl.l / 2.5 });
	hslArr.push({ h: hsl.h, s: hsl.s, l: hsl.l / 3 });
	hslArr.push({ h: hsl.h, s: hsl.s, l: hsl.l / 3.5 });
	return hslArr;
}

/* ********************** SET THE TEXT FOR ALL THE INDIVIDUAL COLORS DISPLAYED ********************** */
function setAllColorTexts(newHsl, singleHsl) {
	colorOneText(newHsl);
	colorTwoText(newHsl);
	colorThreeText(singleHsl);
	colorFourText(newHsl);
	colorFiveText(newHsl);
}
function colorOneText(newHsl) {
	let hex, rgb, css, hsl;
	hsl = newHsl[0];
	rgb = hslToRgb(hsl);
	console.log(hsl);
	hex = rgbToHex(rgb);
	css = rgbToCss(rgb);
	document.querySelector(".color1 p:first-child").textContent = hex;
	document.querySelector(".color1 p:nth-child(2)").textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
	document.querySelector(".color1 p:nth-child(3)").textContent = `HSL: ${Math.round(hsl.h)}, ${Math.round(hsl.s)}, ${Math.round(hsl.l)}`;
	document.querySelector(".color1 p:last-child").textContent = `rgb(${css.r}, ${css.g}, ${css.b})`;
}

function colorTwoText(newHsl) {
	let hex, rgb, css, hsl;
	hsl = newHsl[1];
	rgb = hslToRgb(hsl);
	console.log(hsl);
	hex = rgbToHex(rgb);
	css = rgbToCss(rgb);
	document.querySelector(".color2 p:first-child").textContent = hex;
	document.querySelector(".color2 p:nth-child(2)").textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
	document.querySelector(".color2 p:nth-child(3)").textContent = `HSL: ${Math.round(hsl.h)}, ${Math.round(hsl.s)}, ${Math.round(hsl.l)}`;
	document.querySelector(".color2 p:last-child").textContent = `rgb(${css.r}, ${css.g}, ${css.b})`;
}

function colorThreeText(singleHsl) {
	let hex, rgb, css;
	rgb = hslToRgb(singleHsl);
	hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
	hex = rgbToHex(rgb);
	css = rgbToCss(rgb);
	document.querySelector(".color3 p:first-child").textContent = hex;
	document.querySelector(".color3 p:nth-child(2)").textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
	document.querySelector(".color3 p:nth-child(3)").textContent = `HSL: ${Math.round(hsl.h)}, ${Math.round(hsl.s)}, ${Math.round(hsl.l)}`;
	document.querySelector(".color3 p:last-child").textContent = `rgb(${css.r}, ${css.g}, ${css.b})`;
}

function colorFourText(newHsl) {
	let hex, rgb, css, hsl;
	hsl = newHsl[2];
	rgb = hslToRgb(hsl);
	hex = rgbToHex(rgb);
	css = rgbToCss(rgb);
	document.querySelector(".color4 p:first-child").textContent = hex;
	document.querySelector(".color4 p:nth-child(2)").textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
	document.querySelector(".color4 p:nth-child(3)").textContent = `HSL: ${Math.round(hsl.h)}, ${Math.round(hsl.s)}, ${Math.round(hsl.l)}`;
	document.querySelector(".color4 p:last-child").textContent = `rgb(${css.r}, ${css.g}, ${css.b})`;
}

function colorFiveText(newHsl) {
	let hex, rgb, css, hsl;
	hsl = newHsl[3];
	rgb = hslToRgb(hsl);
	hex = rgbToHex(rgb);
	css = rgbToCss(rgb);
	document.querySelector(".color5 p:first-child").textContent = hex;
	document.querySelector(".color5 p:nth-child(2)").textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
	document.querySelector(".color5 p:nth-child(3)").textContent = `HSL: ${Math.round(hsl.h)}, ${Math.round(hsl.s)}, ${Math.round(hsl.l)}`;
	document.querySelector(".color5 p:last-child").textContent = `rgb(${css.r}, ${css.g}, ${css.b})`;
}