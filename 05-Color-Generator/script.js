const generateBtn = document.getElementById("generate-btn");
const colorPicker = document.getElementById("color-picker");
const colorContainer = document.getElementById("color-container");
const toast = document.getElementById("toast");
const themeToggle = document.getElementById("theme-toggle");

generateBtn.addEventListener("click", () => {
  const baseColor = colorPicker.value;
  generatePalette(baseColor);
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
});

function generatePalette(baseColor) {
  colorContainer.innerHTML = "";
  const shades = generateShades(baseColor);

  shades.forEach((color) => {
    const box = document.createElement("div");
    box.className = "color-box";
    box.style.backgroundColor = color;

    const code = document.createElement("div");
    code.className = "color-code";
    code.textContent = color;

    box.appendChild(code);
    colorContainer.appendChild(box);

    box.addEventListener("click", () => {
      navigator.clipboard
        .writeText(color)
        .then(() => showToast(`Copied ${color}`));
    });
  });
}

function generateShades(hex) {
  const shades = [];
  let color = hex.replace("#", "");

  for (let i = 0; i < 6; i++) {
    const amt = i * 20;
    const r = Math.min(255, parseInt(color.substring(0, 2), 16) + amt);
    const g = Math.min(255, parseInt(color.substring(2, 4), 16) + amt);
    const b = Math.min(255, parseInt(color.substring(4, 6), 16) + amt);
    const newHex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    shades.push(newHex);
  }

  return shades;
}

function toHex(val) {
  const hex = val.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function showToast(message) {
  toast.textContent = message;
  toast.style.opacity = 1;

  setTimeout(() => {
    toast.style.opacity = 0;
  }, 1500);
}
