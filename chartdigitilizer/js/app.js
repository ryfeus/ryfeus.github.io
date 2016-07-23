var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var offsetX = document.getElementById('canvas').offsetLeft;
var offsetY = document.getElementById('canvas').offsetTop;

var xPadding = 100;
var yPadding = 100;

var canvasWidth = 1000;
var canvasHeight = 600;

ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

var startX;
var startY;
var numMaxX = 24;
var numMaxY = 100;
var numMinX = 0;
var numMinY = 0;

var numStepX = 1;
var numStepY = 10;

var flagPin = false;
var isDown = false;


var pi2 = Math.PI * 2;
var resizerRadius = 8;
var rr = resizerRadius * resizerRadius;
var draggingResizer = {
    x: 0,
    y: 0
};
var imageX = 50;
var imageY = 50;
var tableGlobal;



var imageWidth, imageHeight, imageRight, imageBottom;
var draggingImage = false;
var startX;
var startY;



// var img = new Image();
// img.onload = function () {
//     imageWidth = img.width;
//     imageHeight = img.height;
//     imageRight = imageX + imageWidth;
//     imageBottom = imageY + imageHeight;
//     draw(true, false);
// };
// img.src = "https://dl.dropboxusercontent.com/u/139992952/stackoverflow/facesSmall.png";

var imagDrop = document.createElement("img");




imagDrop.addEventListener("load", function() {
    //clearCanvas();
    imageWidth = imagDrop.width;
    imageHeight = imagDrop.height;
    imageRight = imageX + imageWidth;
    imageBottom = imageY + imageHeight;
    draw(true, false);
    console.log("test");
    //ctx.drawImage(imagDrop, 0, 0);
}, false);

// To enable drag and drop
canvas.addEventListener("dragover", function(evt) {
    evt.preventDefault();
}, false);

// Handle dropped image file - only Firefox and Google Chrome
canvas.addEventListener("drop", function(evt) {
    var files = evt.dataTransfer.files;
    if (files.length > 0) {
        var file = files[0];
        if (typeof FileReader !== "undefined" && file.type.indexOf("image") != -1) {
            var reader = new FileReader();
            // Note: addEventListener doesn't work in Google Chrome for this event
            reader.onload = function(evt) {
                imagDrop.src = evt.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
    evt.preventDefault();
}, false);

updateAxis();
addTable();



// // Draw the X value texts
// for(var i = 0; i < data.values.length; i ++) {
//     // uses data.values[i].X
//     ctx.fillText(data.values[i].X, getXPixel(data.values[i].X), canvas.height - yPadding + 20);
// }

// // Draw the Y value texts
// ctx.textAlign = "right";
// ctx.textBaseline = "middle";

// for(var i = 0; i < getMaxY(); i += 10) {
//     ctx.fillText(i, xPadding - 10, getYPixel(i));
// }

// ctx.strokeStyle = '#f00';


// // Draw the line canvas
// ctx.beginPath();
// ctx.moveTo(getXPixel(data.values[0].X), getYPixel(data.values[0].Y));
// for(var i = 1; i < data.values.length; i ++) {
//     ctx.lineTo(getXPixel(data.values[i].X), getYPixel(data.values[i].Y));
// }
// ctx.stroke();

// // Draw the dots
// ctx.fillStyle = '#333';

// for(var i = 0; i < data.values.length; i ++) {  
//     ctx.beginPath();
//     ctx.arc(getXPixel(data.values[i].X), getYPixel(data.values[i].Y), 4, 0, Math.PI * 2, true);
//     ctx.fill();
// }






function togglePin() {
    if (flagPin) {
        flagPin = false;
    } else {
        flagPin = true;
    }
}

function addTable() {
    var newTable = document.createElement('table');
    newTable.setAttribute("style", "float:left;position:relative");
    var header = newTable.createTHead();
    var row = header.insertRow(0);
    var cell = row.insertCell(0);
    cell.innerHTML = "Y";
    var cell = row.insertCell(1);
    cell.innerHTML = "X";
    document.getElementById('tables').appendChild(newTable);
    tableGlobal = newTable;
}

function drawAxis() {

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#333';
    ctx.font = 'italic 8pt sans-serif';
    ctx.textAlign = "center";

    // Draw the axises
    ctx.beginPath();
    ctx.moveTo(xPadding, 0);
    ctx.lineTo(xPadding, canvas.height - yPadding);
    ctx.lineTo(canvas.width, canvas.height - yPadding);
    ctx.stroke();


    // // Draw the X value texts
    for (var i = 0; i <= numMaxX - numMinX; i += numStepX) {
        ctx.fillText(i, getXPixel(i), canvas.height - yPadding + 20);
    }

    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    for (var i = 0; i <= numMaxY - numMinY; i += numStepY) {
        ctx.fillText(i, xPadding - 10, getYPixel(i));
    }

    ctx.strokeStyle = '#f00';
}

function updateAxis() {
    numMaxX = parseInt(document.getElementById('MaxX').value);
    numMaxY = parseInt(document.getElementById('MaxY').value);
    numStepX = parseInt(document.getElementById('StepX').value);
    numStepY = parseInt(document.getElementById('StepY').value);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAxis();

}

function getXPixel(val) {
    return ((canvas.width - 2 * xPadding) / numMaxX) * val + (xPadding);
}

// Return the y pixel for a graph point
function getYPixel(val) {
    return canvas.height - (((canvas.height - 2 * yPadding) / numMaxY) * val) - yPadding;
}

function draw(withAnchors, withBorders) {

    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateAxis();

    // draw the image
    ctx.globalAlpha = 0.4;
    ctx.drawImage(imagDrop, 0, 0, imagDrop.width, imagDrop.height, imageX, imageY, imageWidth, imageHeight);

    // optionally draw the draggable anchors
    if (withAnchors) {
        drawDragAnchor(imageX, imageY);
        drawDragAnchor(imageRight, imageY);
        drawDragAnchor(imageRight, imageBottom);
        drawDragAnchor(imageX, imageBottom);
    }

    // optionally draw the connecting anchor lines
    if (withBorders) {
        ctx.beginPath();
        ctx.moveTo(imageX, imageY);
        ctx.lineTo(imageRight, imageY);
        ctx.lineTo(imageRight, imageBottom);
        ctx.lineTo(imageX, imageBottom);
        ctx.closePath();
        ctx.stroke();
    }
}

function drawDragAnchor(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, resizerRadius, 0, pi2, false);
    ctx.closePath();
    ctx.fill();
}

function anchorHitTest(x, y) {

    var dx, dy;

    // top-left
    dx = x - imageX;
    dy = y - imageY;
    if (dx * dx + dy * dy <= rr) {
        return (0);
    }
    // top-right
    dx = x - imageRight;
    dy = y - imageY;
    if (dx * dx + dy * dy <= rr) {
        return (1);
    }
    // bottom-right
    dx = x - imageRight;
    dy = y - imageBottom;
    if (dx * dx + dy * dy <= rr) {
        return (2);
    }
    // bottom-left
    dx = x - imageX;
    dy = y - imageBottom;
    if (dx * dx + dy * dy <= rr) {
        return (3);
    }
    return (-1);
}

function hitImage(x, y) {
    return (x > imageX && x < imageX + imageWidth && y > imageY && y < imageY + imageHeight);
}

function handleMouseDown(e) {
    if (!flagPin) {
        startX = parseInt(e.clientX - offsetX);
        startY = parseInt(e.clientY - offsetY);
        draggingResizer = anchorHitTest(startX, startY);
        draggingImage = draggingResizer < 0 && hitImage(startX, startY);
    } else {
        var row = tableGlobal.insertRow(tableGlobal.rows.length);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = Math.round((canvasHeight - parseInt(e.clientY - offsetY) - yPadding) / ((canvas.height - 2 * yPadding) / numMaxY));
        cell2.innerHTML = Math.round((parseInt(e.clientX - offsetX) - xPadding) / ((canvas.width - 2 * xPadding) / numMaxX));
    }
}

function handleMouseUp(e) {
    if (!flagPin) {
        draggingResizer = -1;
        draggingImage = false;
        draw(true, false);
    }
}

function handleMouseOut(e) {
    if (!flagPin) {
        handleMouseUp(e);
    }
}

function handleMouseMove(e) {

    if (!flagPin) {
        if (draggingResizer > -1) {

            mouseX = parseInt(e.clientX - offsetX);
            mouseY = parseInt(e.clientY - offsetY);

            // resize the image
            switch (draggingResizer) {
                case 0:
                    //top-left
                    imageX = mouseX;
                    imageWidth = imageRight - mouseX;
                    imageY = mouseY;
                    imageHeight = imageBottom - mouseY;
                    break;
                case 1:
                    //top-right
                    imageY = mouseY;
                    imageWidth = mouseX - imageX;
                    imageHeight = imageBottom - mouseY;
                    break;
                case 2:
                    //bottom-right
                    imageWidth = mouseX - imageX;
                    imageHeight = mouseY - imageY;
                    break;
                case 3:
                    //bottom-left
                    imageX = mouseX;
                    imageWidth = imageRight - mouseX;
                    imageHeight = mouseY - imageY;
                    break;
            }

            if (imageWidth < 25) { imageWidth = 25; }
            if (imageHeight < 25) { imageHeight = 25; }

            // set the image right and bottom
            imageRight = imageX + imageWidth;
            imageBottom = imageY + imageHeight;

            // redraw the image with resizing anchors
            draw(true, true);

        } else if (draggingImage) {

            imageClick = false;

            mouseX = parseInt(e.clientX - offsetX);
            mouseY = parseInt(e.clientY - offsetY);

            // move the image by the amount of the latest drag
            var dx = mouseX - startX;
            var dy = mouseY - startY;
            imageX += dx;
            imageY += dy;
            imageRight += dx;
            imageBottom += dy;
            // reset the startXY for next time
            startX = mouseX;
            startY = mouseY;

            // redraw the image with border
            draw(false, true);

        }
    }
}

$("#canvas").mousedown(function(e) {
    handleMouseDown(e);
});
$("#canvas").mousemove(function(e) {
    handleMouseMove(e);
});
$("#canvas").mouseup(function(e) {
    handleMouseUp(e);
});
$("#canvas").mouseout(function(e) {
    handleMouseOut(e);
});
