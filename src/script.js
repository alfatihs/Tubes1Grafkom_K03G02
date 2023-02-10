"use strict";

var canvas;
var gl;
var draw;

var maxNumTriangles = 200;
var maxNumVertices = 3 * maxNumTriangles;
var index = 0;
var program

const model = new Model(0,"Line");
const arrayObject = [model];


window.onload = function init() {

    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.8, 0.8, 0.8, 1.0);

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    gl.clear(gl.COLOR_BUFFER_BIT);


    canvas.addEventListener("click", function (event) {
        var point = vec2(2 * event.clientX / canvas.width - 1,
            2 * (canvas.height - event.clientY) / canvas.height - 1);
        
        arrayObject[arrayObject.length-1].addVertex(point);

        render();
    });

    document.getElementById("draw").onchange = function () {
        var value = document.getElementById("draw").value;
        if (value == "Polygon"){
            arrayObject.push(new Model(arrayObject.length, "Polygon"))
        }
        else if(value == "Line"){
            arrayObject.push(new Model(arrayObject.length, "Line"))
        }
        else if (value == "Square") {
            arrayObject.push(new Model(arrayObject.length, "Square"))
        }
    };
}


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    for (let i = 0; i < arrayObject.length; i++) {
        arrayObject[i].render(gl);
    }
    window.requestAnimFrame(render);
}

