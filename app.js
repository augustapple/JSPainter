const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("controls_color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const filenameInput = document.getElementById("filename");

canvas.width = 600;
canvas.height = 600;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = "#2C2C2C";
ctx.fillStyle = "#2C2C2C";
ctx.lineWidth = 2;

let isClicked = false;
let filling = false;

function startPainting(event) {
    if(!event.button) {
        isClicked = true;
    }
}

function stopPainting() {
    isClicked = false;
}

function onMouseMove(event) {
    const coordObj = {
        x: event.offsetX,
        y: event.offsetY
    };
    if(isClicked && !filling) {
        ctx.lineTo(coordObj.x, coordObj.y);
        ctx.stroke()
    } else {
        ctx.beginPath();
        ctx.moveTo(coordObj.x, coordObj.y);
    }
}

function onMouseUp(event) {
    stopPainting();
}

function changeColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
}

function changeRange(event) {
    ctx.lineWidth = event.target.value;
}

function changeMode(event) {
    if (filling) {
        filling = false;
        mode.textContent = "Fill";
    } else {
        filling = true;
        mode.textContent = "Paint";
    }
}

function canvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function imageSave() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    const filename = filenameInput.value;
    link.href = image;
    if(filename) {
        link.download = filename;
    } else {
        link.download = "JSPainter";
    }
    
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", canvasClick);
}

Array.from(colors).forEach(color => color.addEventListener("click", changeColor));

if (range) {
    range.addEventListener("input", changeRange);
}

if (mode) {
    mode.addEventListener("click", changeMode);
}

if (saveBtn) {
    saveBtn.addEventListener("click", imageSave);
}