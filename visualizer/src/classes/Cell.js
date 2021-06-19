export default class Cell {
    constructor(x, y, cellSize, globID, cellIndex) {
        this.x = x;
        this.y = y;
        this.cellSize = cellSize;
        this.cellCenter = [x + cellSize/2, y + cellSize/2];
        this.isWall = false;
        this.globID = globID;
        this.fillStyle = "white";
        this.lineWidth = 1;
        this.borderStyle = "1px solid black";
        this.cellIndex = cellIndex;
    }

    updateWall() {
        this.isWall = !this.isWall;
        this.fillStyle = this.isWall ? "black" : "white";
    }

    setWall() {
        this.isWall = true;
        this.fillStyle = "black";
    }

    removeWall() {
        this.isWall = false;
        this.fillStyle = "white";
    }
}