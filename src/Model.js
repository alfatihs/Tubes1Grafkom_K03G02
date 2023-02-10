//Setiap bangun (Line, Square, Rectangle) harus bisa jalanin ini

var maxNumTriangles = 200;
var maxNumVertices = 3 * maxNumTriangles;
class Model {
  constructor(id, name){
    this.vertices = [];
    this.name = name;
    this.preserveSimilarity = true;
    this.isFan = true;
    this.id = id;
  }

  addVertex(vertex){
    this.vertices.push(vertex);
  }

  render = (gl) => {
    const vertices = [];
    for (let j = 0; j < this.vertices.length; j++) {
      vertices.push(this.vertices[j]);
    }
    
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // for color
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 16 * maxNumVertices, gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    if(this.name =="Polygon"){
      gl.drawArrays(gl.TRIANGLE_FAN, 0, this.vertices.length);
    }
    else if(this.name == "Line"){
      gl.drawArrays(gl.LINES, 0, this.vertices.length);
    }
    else{
      gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length);
    }
  }
}
