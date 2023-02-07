//Setiap bangun (Line, Square, Rectangle) harus bisa jalanin ini
class Model {
  constructor(id){
    this.vertices = [];
    this.type = "Model";
    this.name = "Nameless Model";
    this.center = new Point([0,0], [0,0,0,1]) //Titik berat
    this.preserveSimilarity = true;
    this.isFan = true;
    this.id = id;
  }
}
