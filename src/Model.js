//Setiap bangun (Line, Square, Rectangle) harus bisa jalanin ini

// var maxNumTriangles = 200;
// var maxNumVertices = 3 * maxNumTriangles;
var cBuffer;
var vColor;
var vBuffer;
var vPosition;
var vColor;
var colorPicker = [0.0,0.0,0.0,1.0];
// pisah polygon 
class Model {

  constructor(id, name){
    this.name = name;
    this.vertices = [];
    this.verticesColor = [];
    this.id = id;
  } 
  addVertex(vertex){
    this.vertices.push(vertex);
  }

  changeVertices(vertices){
    this.vertices=vertices;
  }
  getLengthVertices(){
    return this.vertices.length;
  }
  addVertexColor(color){
    this.verticesColor.push(color);
  }
  getVertex(i){
    return this.vertices[i];
  }
  changeLastVertex(vertex){
    if (this.vertices.length!=0){
      this.vertices[this.vertices.length-1] = vertex;
    }
  }
  render(gl){
    const vertices = [];
    const colors = [];
    for (let j = 0; j < this.vertices.length; j++) {
      vertices.push(this.vertices[j]);
      colors.push(this.verticesColor[j]);
    }
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

  
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
  }
  isEmpty(){
    return this.vertices.length==0;
  }
}

class Polygon extends Model{

  constructor(id){
    super(id, "Polygon" +id);
  }

  render(gl){
    super.render(gl);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, this.vertices.length);
  }
}

class Square extends Model {

}

class Rectangle extends Model {

}

class Line extends Model {
  constructor(id){
    super(id, "Line"+id);
  }

  render(gl){
    super.render(gl);
    gl.drawArrays(gl.LINES, 0, this.vertices.length);
  }


}