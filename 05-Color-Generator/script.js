const generateBtn = document.getElementById("generate-btn");
const previousBtn = document.getElementById("previous-btn");
const colorContainer = document.getElementById("color-container");
const colorPicker = document.getElementById("color-picker");
const parallaxBg = document.getElementById("parallax-bg");

let previousPalettes = [];

generateBtn.addEventListener("click", () => {
  const baseColor = colorPicker.value;
  const palette = generateColorPalette(baseColor);
  previousPalettes.push(palette);
  renderPalette(palette);
});

previousBtn.addEventListener("click", () => {
  if (previousPalettes.length > 1) {
    previousPalettes.pop();
    const lastPalette = previousPalettes[previousPalettes.length - 1];
    renderPalette(lastPalette);
  } else if (previousPalettes.length === 1) {
    previousPalettes.pop();
    colorContainer.innerHTML = "";
  }
});

function renderPalette(palette) {
  colorContainer.innerHTML = "";
  palette.forEach((color) => {
    const colorBox = document.createElement("div");
    colorBox.className = "color-box";
    colorBox.style.backgroundColor = color;

    const colorCode = document.createElement("div");
    colorCode.className = "color-code";
    colorCode.textContent = color;

    const copyButton = document.createElement("button");
    copyButton.className = "copy-btn";
    copyButton.textContent = "Copy";
    copyButton.onclick = () => copyToClipboard(color);

    colorBox.appendChild(colorCode);
    colorBox.appendChild(copyButton);
    colorContainer.appendChild(colorBox);
  });
}

function generateColorPalette(baseColor) {
  let colors = [];
  const hsl = hexToHSL(baseColor);
  for (let i = -2; i <= 2; i++) {
    let h = (hsl.h + i * 20) % 360;
    if (h < 0) h += 360;
    colors.push(hslToHex(h, hsl.s, hsl.l));
  }
  return colors;
}

function hexToHSL(H) {
  let r = 0,
    g = 0,
    b = 0;
  if (H.length === 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length === 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  r /= 255;
  g /= 255;
  b /= 255;
  const cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin;
  let h = 0,
    s = 0,
    l = 0;
  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  return { h, s, l };
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
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
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function copyToClipboard(color) {
  navigator.clipboard.writeText(color).then(() => {
    showToast(`Copied ${color} to clipboard!`);
  });
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

// Parallax effect
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 50;
  const y = (e.clientY / window.innerHeight - 0.5) * 50;
  parallaxBg.style.transform = `translate(${x}px, ${y}px)`;
});
