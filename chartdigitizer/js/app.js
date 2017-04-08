var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var offsetX = document.getElementById('canvas').offsetLeft;
var offsetY = document.getElementById('canvas').offsetTop;

var xPadding = 50;
var yPadding = 50;

var canvasWidth = 600;
var canvasHeight = 600;

canvas.style.width = '100%';
canvas.style.height = '100%';
// ...then set the internal size to match
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
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

// var numXscale = canvas.clientWidth / canvas.width;
// var numYscale = canvas.clientHeight / canvas.height;

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

function togglePin() {
    if (flagPin) {
        document.getElementById('idButtonPin').innerHTML = 'Start pinning';
        flagPin = false;
    } else {
        document.getElementById('idButtonPin').innerHTML = 'Stop pinning';
        flagPin = true;
    }
}

function addTable() {
    var newTable = document.createElement('table');
    newTable.setAttribute("style", "float:left;position:relative");
    var header = newTable.createTHead();
    var row = header.insertRow(0);
    var cell = row.insertCell(0);
    cell.innerHTML = "X";
    var cell = row.insertCell(1);
    cell.innerHTML = "Y";
    document.getElementById('tables').appendChild(newTable);
    tableGlobal = newTable;
}

function canvas2realX(numX) {
    return numX*canvas.clientWidth / canvas.width;
}

function canvas2realY(numY) {
    return numY*canvas.clientHeight / canvas.height;
}

function drawAxis() {

    ctx.lineWidth = 3;
    ctx.strokeStyle = '#333';
    ctx.font = 'italic 8pt sans-serif';
    ctx.textAlign = "center";

    // Draw the axises
    ctx.beginPath();
    ctx.moveTo(xPadding, canvas.height - yPadding);
    ctx.lineTo(xPadding, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xPadding, canvas.height - yPadding);
    ctx.lineTo(canvas.width, canvas.height - yPadding);
    ctx.stroke();
    // // Draw the X value texts
    ctx.lineWidth = 1;
    for (var i = 0; i <= numMaxX - numMinX; i += numStepX) {
        ctx.fillText(i, getXPixel(i), canvas.height - yPadding + 20);
        ctx.beginPath();
        ctx.moveTo(getXPixel(i), canvas.height - yPadding);
        ctx.lineTo(getXPixel(i), 0);
        ctx.stroke();
    }

    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    for (var i = 0; i <= numMaxY - numMinY; i += numStepY) {
        ctx.fillText(i, xPadding - 10, getYPixel(i));
        ctx.beginPath();
        ctx.moveTo(xPadding, getYPixel(i));
        ctx.lineTo(canvas.width, getYPixel(i));
        ctx.stroke();
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
    dx = x - canvas2realX(imageX);
    dy = y - canvas2realY(imageY);
    
    if (dx * dx + dy * dy <= rr) {
        return (0);
    }
    // top-right
    dx = x - canvas2realX(imageRight);
    dy = y - canvas2realY(imageY);
    console.log(dx.toString()+' '+dy.toString());
    if (dx * dx + dy * dy <= rr) {
        return (1);
    }
    // bottom-right
    dx = x - canvas2realX(imageRight);
    dy = y - canvas2realY(imageBottom);
    if (dx * dx + dy * dy <= rr) {
        return (2);
    }
    // bottom-left
    dx = x - canvas2realX(imageX);
    dy = y - canvas2realY(imageBottom);
    if (dx * dx + dy * dy <= rr) {
        return (3);
    }
    return (-1);
}

function hitImage(x, y) {
    return (x > canvas2realX(imageX) && x < canvas2realX(imageX + imageWidth) && y > canvas2realY(imageY) && y < canvas2realY(imageY + imageHeight));
}

function handleMouseDown(e) {
    if (!flagPin) {
        startX = parseInt(e.clientX - document.getElementById('canvas').offsetLeft);
        startY = parseInt(e.clientY - document.getElementById('canvas').offsetTop);
        console.log(startX.toString()+'_'+startY.toString());
        draggingResizer = anchorHitTest(startX, startY);
        draggingImage = draggingResizer < 0 && hitImage(startX, startY);
    } else {
        var row = tableGlobal.insertRow(tableGlobal.rows.length);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell2.innerHTML = Math.round((canvas.clientHeight - parseInt(e.clientY - document.getElementById('canvas').offsetTop) -  canvas2realY(yPadding)) / ((canvas.clientHeight - 2 *  canvas2realY(yPadding)) / numMaxY));
        cell1.innerHTML = Math.round((parseInt(e.clientX - document.getElementById('canvas').offsetLeft) - canvas2realX(xPadding)) / ((canvas.clientWidth - 2 * canvas2realX(xPadding)) / numMaxX));
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

            mouseX = parseInt(e.clientX - document.getElementById('canvas').offsetLeft)*canvas.width/canvas.clientWidth;
            mouseY = parseInt(e.clientY - document.getElementById('canvas').offsetTop)*canvas.height/canvas.clientHeight;
            console.log(mouseX.toString()+','+mouseY.toString());
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

            mouseX = parseInt(e.clientX - document.getElementById('canvas').offsetLeft);
            mouseY = parseInt(e.clientY - document.getElementById('canvas').offsetTop);

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

function downloadTables() {
    var vecTables = document.getElementById('tables').children;
    var strTextFinal = '';
    for (var i = 0; i < vecTables.length; i++) {
        var vecRows = vecTables[i].children[0].children;
        for (var j = 0; j < vecRows.length; j++) {
            strTextFinal = strTextFinal+vecRows[j].children[0].textContent+','+vecRows[j].children[1].textContent+'\n';
        }
    }
    var blob = new Blob([strTextFinal], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "chartdigitizer.txt");
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
