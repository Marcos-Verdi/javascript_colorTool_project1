const hexInput = document.getElementById("hexInput");
const colorInput = document.getElementById("inputColor");
const colorAltered = document.getElementById("alteredColor");
const colorAlteredText = document.getElementById("alteredColorText");
const slider = document.getElementById("slider");
const sliderText = document.getElementById("sliderText");
const toggleButton = document.getElementById("toggle-btn")
const darkenText = document.getElementById("darken-text")
const lightenText = document.getElementById("lighten-text")


const isValidHex = (hex) => {
  if (!hex) return false;
  let strippedHex = hex.replace('#','');
  return strippedHex.length === 6 || strippedHex.length === 3;
};



hexInput.addEventListener('keyup', () => {
  let hex = hexInput.value;
  if(!isValidHex(hex)) return;

  let strippedHex = hex.replace('#','');
  inputColor.style.backgroundColor = "#" + strippedHex;
  reset();
})



const hexToRgb = (hex) => {
  if(!isValidHex(hex)) return null;

  let strippedHex = hex.replace('#','');

  if (strippedHex.length === 3) {
    let strippedHex = strippedHex[0] + strippedHex[0]
    + strippedHex[1] + strippedHex[1]
    + strippedHex[2] + strippedHex[2]
  }

  let r = parseInt(strippedHex.substring(0,2),16);
  let g = parseInt(strippedHex.substring(2,4),16);
  let b = parseInt(strippedHex.substring(4,6),16);

  return {r,g,b}
}



const rgbToHex = (r,g,b) => {
  let hex = "#"
  let hx1 = ("0" + r.toString(16)).slice(-2)
  let hx2 = ("0" + g.toString(16)).slice(-2)
  let hx3 = ("0" + b.toString(16)).slice(-2)
  hex += hx1 + hx2 + hx3;
  return hex;
}




slider.addEventListener('input', () => {
  if (!isValidHex(hexInput.value)) return;
  sliderText.textContent = `${slider.value}%`;
  let newColor = alterColor(hexInput.value, slider.value);
  colorAltered.style.backgroundColor = newColor;
  colorAlteredText.innerText = `Altered Color ${newColor}`;
})




const alterColor = (hex, percentage) => {
  let {r,g,b} = hexToRgb(hex);
  let amount = Math.floor( (percentage/100) * 255);

  let newR = increaseWithinRange(r,amount);
  let newG = increaseWithinRange(g,amount);
  let newB = increaseWithinRange(b,amount);

  return rgbToHex(newR,newG,newB);
}




const increaseWithinRange = (x, amount) => {
  if(!toggleButton.classList.contains("toggled")) {
    let darkerX = x + amount;
    if (darkerX > 255) return 255;
    if (darkerX < 0) return 0;
    return darkerX;
  } else {
    let lighterX = x - amount;
    if (lighterX > 255) return 255;
    if (lighterX < 0) return 0;
    return lighterX;
  } 
}
    

toggleButton.addEventListener('click', () => {
  if(!toggleButton.classList.contains("toggled")) {
    toggleButton.classList.add("toggled");
    lightenText.classList.add("unselected");
    darkenText.classList.remove("unselected");
  } else {
    toggleButton.classList.remove("toggled");
    darkenText.classList.add("unselected");
    lightenText.classList.remove("unselected");
  }
  reset();
})

const reset = () => {
  slider.value = 0
  sliderText.textContent = '0%'
  colorAltered.style.backgroundColor = hexInput.value;
  colorAlteredText.innerText = `Altered Color ${hexInput.value}`
}

    