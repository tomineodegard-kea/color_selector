"use strict";
window.addEventListener("load", start);

// init function
function start() {
  document.querySelector("#colorinput").addEventListener("input", displayColor);
  displayColor();
}

// Get color a from the userinput
function getColor() {
  let getColor = document.querySelector("#colorinput").value;
  return getColor;
}

function displayColor() {
  let hexCode = getColor();
  let rgbVal = hexToRGB(hexCode);
  changeColorBox(hexCode);

  let hexVal = rgbToHex(rgbVal);
  let hslVal = rgbToHSL(rgbVal);

  displayHex(hexCode);
  displayRGB(rgbVal);
  displayHSL(hslVal);
}

// Change color of box based on color input
function changeColorBox(hexVal) {
  document.querySelector("#colorbox").style.backgroundColor = hexVal;
}
// Convert from rgb to HEX
function rgbToHex(values) {
  let r = values.r.toString(16);
  let g = values.g.toString(16);
  let b = values.b.toString(16);

  let hexCode = "#" + r + g + b;

  return hexCode;
}

function rgbToCssColor(values) {}

// Display hex code based on color input
function displayHex(hexCode) {
  document.querySelector(".hex_value").textContent = `Hex code: ${hexCode}`;
}

// Convert from hex to rgb
function hexToRGB(hexCode) {
  let r = parseInt(hexCode.substring(1, 3), 16);
  let g = parseInt(hexCode.substring(3, 5), 16);
  let b = parseInt(hexCode.substring(5, 7), 16);

  let values = {
    r,
    g,
    b,
  };

  return values;
}

// Display rgb efter conversion
function displayRGB(values) {
  document.querySelector(".rgb_value").textContent = `RGB values: ${values.r}. ${values.g}. ${values.b}`;
}

// Convert from rgb to hsl
function rgbToHSL(values) {
  let R = values.r;
  let G = values.g;
  let B = values.b;

  R /= 255;
  G /= 255;
  B /= 255;

  let h, s, l;

  const min = Math.min(R, G, B);
  const max = Math.max(R, G, B);

  if (max === min) {
    h = 0;
  } else if (max === R) {
    h = 60 * (0 + (G - B) / (max - min));
  } else if (max === G) {
    h = 60 * (2 + (B - R) / (max - min));
  } else if (max === B) {
    h = 60 * (4 + (R - G) / (max - min));
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
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  return {
    h,
    s,
    l,
  };
}

// Display hsl after conversion
function displayHSL(hslVal) {
  let h = hslVal.h.toFixed(0);
  let s = hslVal.s.toFixed(0);
  let l = hslVal.l.toFixed(0);
  document.querySelector(".hsl_value").textContent = h + "%. " + s + "%. " + l + "%";
}
