"use strict";

var canvas;
var gl;
var draw;

var index = 0;
var program;
var afterClick = false;
var firstClick = true;
const model = new Model(0,"Line");
var arrayObject = [model];


window.onload = function init() {

    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.8, 0.8, 0.8, 1.0);

    //  Load shaders and initialize attribute buffers
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    gl.clear(gl.COLOR_BUFFER_BIT);


    cBuffer = gl.createBuffer();
    vBuffer = gl.createBuffer();
    vPosition = gl.getAttribLocation(program, "vPosition");
    vColor = gl.getAttribLocation(program, "vColor");


    // event listener mouse klik
    canvas.addEventListener("click", function (event) {
        if (firstClick){
            var point = vec2(2 * (event.clientX-this.offsetLeft) / canvas.width - 1,
                2 * (canvas.height - (event.clientY-this.offsetTop)) / canvas.height - 1);
            arrayObject[arrayObject.length - 1].addVertex(point);
            arrayObject[arrayObject.length - 1].addVertexColor(colorPicker)
            firstClick = false;
        }
        afterClick = true;
    });


    canvas.addEventListener("dblclick", function () {
        newModel()
        resetClick()

    });

    canvas.addEventListener("mousemove", function (event) {
        var point = vec2(2 * (event.clientX - this.offsetLeft) / canvas.width - 1,
            2 * (canvas.height - (event.clientY - this.offsetTop)) / canvas.height - 1);
        if (afterClick){
            arrayObject[arrayObject.length - 1].addVertex(point);
            arrayObject[arrayObject.length - 1].addVertexColor(colorPicker)
            afterClick =false;
        }else{
            arrayObject[arrayObject.length - 1].changeLastVertex(point);
        }
        
    });


    document.getElementById("draw").onchange = function(){
        newModel()
    };

    document.getElementById("color").onchange = function () {
        changeColorVertices(this.value)
    };

    document.getElementById("clear").onclick = function () {
        location.reload();
    }

    render()
}

function newModel() {
    var value = document.getElementById("draw").value;
    if (value == "Line") {
        arrayObject.push(new Line(arrayObject.length))
    }
    else if (value == "Square") {
        arrayObject.push(new Square(arrayObject.length))
    }
    else if (value == "Rectangle") {
        arrayObject.push(new Rectangle(arrayObject.length))
    }
    else if (value == "Polygon") {
        arrayObject.push(new Polygon(arrayObject.length))
    }
};

function save(){
    for (let i = 0; i < arrayObject.length; i++) {
        if (arrayObject[i].isEmpty()) {
            arrayObject.splice(i, 1);
        }
    }
    const jsonFile = JSON.parse(JSON.stringify(arrayObject));
    const file  = document.createElement("a");
    file.href =URL.createObjectURL(new Blob([JSON.stringify(jsonFile, null, 2)], {
        type: "text/plain"
    }));
    file.setAttribute("download", "data.json");
}
function load() {
    const file = document.getElementById("file-input").files[0];
    var fileread;
    let reader = new FileReader();

    reader.readAsText(file);
    var idx;

    reader.onload = function () {
        fileread = JSON.parse(reader.result);
        for (let i = 0; i < fileread.length; i++) {
            idx = fileread[i]["name"].search("Polygon");
            if (idx != -1){
                arrayObject.push(new Polygon(arrayObject.length));
                for (let j = 0; j < fileread[i]["vertices"].length; j++) {
                    arrayObject[arrayObject.length-1].addVertex(fileread[i]["vertices"][j]);
                    arrayObject[arrayObject.length - 1].addVertexColor(fileread[i]["verticesColor"][j]);
                }
            }   
        }
        newModel()
        console.log(arrayObject);
    };
}

function changeColorVertices(hex){
    const arrayColor = hexToRgb(hex);
    colorPicker = arrayColor;
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    for (let i = 0; i < arrayObject.length-1; i++) {
        if (arrayObject[i].isEmpty()) {
            arrayObject.splice(i, 1);
        }
    }
    for (let i = 0; i < arrayObject.length; i++) {
        arrayObject[i].render(gl);
    }
    window.requestAnimFrame(render);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255, 1.0];
}

function resetClick(){
    afterClick = false;
    firstClick = true;
}