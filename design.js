"use strict";
const sizePicker = document.querySelector(".size-picker");
const pixelCanvas = document.querySelector(".pixel-canvas");
const quickFill = document.querySelector(".quick-fill");
const eraseMode = document.querySelector(".erase-mode");
const drawMode = document.querySelector(".draw-mode");
const resetCanvas = document.querySelector(".reset");
const hidden = document.querySelector(".hidden");

// Starter code
function makeGrid() {
  let gridHeight = document.querySelector(".input-height").value;
  let gridWidth = document.querySelector(".input-width").value;
  // If grid already present, clears any cells that have been filled in
  while (pixelCanvas.firstChild) {
    pixelCanvas.removeChild(pixelCanvas.firstChild);
  }
  // if users input is in range
  if (inRange(gridHeight, 0, 50) && inRange(gridWidth, 0, 50)) {
    hidden.style.display = "none";
    // Creates rows and cells
    for (let i = 1; i <= gridHeight; i++) {
      let gridRow = document.createElement("tr");
      pixelCanvas.appendChild(gridRow);
      for (let j = 1; j <= gridWidth; j++) {
        let gridCell = document.createElement("td");
        gridRow.appendChild(gridCell);
        // Fills in cell with selected color upon mouse press
        gridCell.addEventListener("mousedown", function () {
          const color = document.querySelector(".color-picker").value;
          this.style.backgroundColor = color;
        });
      }
    }
  } else {
    hidden.style.display = "block";
  }
}

// Function to validate input is inrange
function inRange(value, min, max) {
  return value >= min && value <= max;
}

// User input processed using a callback function to make grid
sizePicker.addEventListener("click", function (e) {
  e.preventDefault();
  makeGrid();
});

// Boolean to match if hold mousedown
let down = false;

// Continuous drawing user hold mousedown
pixelCanvas.addEventListener("mousedown", function (e) {
  down = true;
  pixelCanvas.addEventListener("mouseup", function () {
    down = false;
  });
  pixelCanvas.addEventListener("mouseleave", function () {
    down = false;
  });

  pixelCanvas.addEventListener("mouseover", function (e) {
    const color = document.querySelector(".color-picker").value;
    if (down) {
      if (e.target.tagName === "TD") {
        e.target.style.backgroundColor = color;
      }
    }
  });
});

// Fill function to fill the whole grid
quickFill.addEventListener("click", function (e) {
  e.preventDefault();
  const color = document.querySelector(".color-picker").value;
  pixelCanvas
    .querySelectorAll("td")
    .forEach((td) => (td.style.backgroundColor = color));
});

// Quick erase using double click without switching to eraser
pixelCanvas.addEventListener("dblclick", (e) => {
  e.target.style.backgroundColor = null;
});

// Erase functionality
eraseMode.addEventListener("click", function () {
  // mousedown hold for continous erasing
  pixelCanvas.addEventListener("mousedown", function (e) {
    down = true;
    pixelCanvas.addEventListener("mouseup", function () {
      down = false;
    });
    pixelCanvas.addEventListener("mouseleave", function () {
      down = false;
    });
    pixelCanvas.addEventListener("mouseover", function (e) {
      if (down) {
        if (e.target.tagName === "TD") {
          e.target.style.backgroundColor = null;
        }
      }
    });
  });
  // Single cell erase
  pixelCanvas.addEventListener("mousedown", function (e) {
    e.target.style.backgroundColor = null;
  });
});

// Draw function, by default this is the default function running.
drawMode.addEventListener("click", function () {
  // mousedown hold for continous drawing
  pixelCanvas.addEventListener("mousedown", function (e) {
    down = true;
    pixelCanvas.addEventListener("mouseup", function () {
      down = false;
    });
    pixelCanvas.addEventListener("mouseleave", function () {
      down = false;
    });
    pixelCanvas.addEventListener("mouseover", function (e) {
      const color = document.querySelector(".color-picker").value;
      if (down) {
        if (e.target.tagName === "TD") {
          e.target.style.backgroundColor = color;
        }
      }
    });
  });
  // Single cell draw
  pixelCanvas.addEventListener("mousedown", function (e) {
    if (e.target.tagName !== "TD") return;
    const color = document.querySelector(".color-picker").value;
    e.target.style.backgroundColor = color;
  });
});

// Reset grid color or erase existing drawing but keep grid.
resetCanvas.addEventListener("click", function (e) {
  while (pixelCanvas.firstChild) {
    pixelCanvas.removeChild(pixelCanvas.firstChild);
  }
  makeGrid();
});

// Form styles
const setActive = (el, active) => {
  const formField = el.parentNode.parentNode;
  if (active) {
    formField.classList.add("form-field--is-active");
  } else {
    formField.classList.remove("form-field--is-active");
    el.value === ""
      ? formField.classList.remove("form-field--is-filled")
      : formField.classList.add("form-field--is-filled");
  }
};

[].forEach.call(
  document.querySelectorAll(".form-field__input, .form-field__textarea"),
  (el) => {
    el.onblur = () => {
      setActive(el, false);
    };
    el.onfocus = () => {
      setActive(el, true);
    };
  }
);
