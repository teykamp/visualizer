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

    draw(ctx) {
        // has to return a function, otherwise lag issues on load
        // can also just draw the rect in Canvas.vue using object params
        return () => {
                ctx.fillStyle = this.fillStyle;
                ctx.lineWidth = this.lineWidth;
                ctx.strokeStyle = this.strokeStyle;
                ctx.rect(this.x, this.y, this.cellSize, this.cellSize)
            };
    }
}