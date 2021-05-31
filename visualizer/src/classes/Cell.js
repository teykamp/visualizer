export default class Cell {
    constructor(x, y, cellSize, globID, cellIndex) {
        this.x = x;
        this.y = y;
        this.cellSize = cellSize;
        this.isWall = false;
        this.globID = globID;
        this.fillStyle = "white";
        this.lineWidth = 1;
        this.strokeStyle = "black";
        this.cellIndex = cellIndex;
    }

    updateWall() {
        this.isWall = !this.isWall;
        this.fillStyle = this.isWall ? "black" : "white";
    }
}