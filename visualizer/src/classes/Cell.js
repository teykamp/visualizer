export default class Cell {
    constructor(x, y, cellSize, id) {
        this.x = x;
        this.y = y;
        this.cellSize = cellSize;
        this.isWall = false;
        this.id = id;
        this.fillStyle = "white";
        this.lineWidth = 1;
        this.strokeStyle = "black";
    }

}