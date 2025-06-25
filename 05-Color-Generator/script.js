document
  .getElementById("generate-btn")
  .addEventListener("click", generateColors);

function generateColors() {
  const colorContainer = document.getElementById("color-container");
  colorContainer.innerHTML = ""; // Clear previous colors

  for (let i = 0; i < 6; i++) {
    const color = getRandomColor();
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
  }
}

function getRandomColor() {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
}

function copyToClipboard(color) {
  navigator.clipboard.writeText(color).then(() => {
    alert(`Copied ${color} to clipboard!`);
  });
}
