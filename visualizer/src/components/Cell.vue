<template>
    <div>
        <div  class="cell"
            :style="{'width': cell.cellSize+'px',
                    'height': cell.cellSize+'px',
                    'border': cell.borderStyle,
                    'background-color': cell.fillStyle}"
            @mouseover="onMouseDrag()"
            @mousedown="updateWallDrawingMode()"
            @mouseout="mouseOff()"
        ></div>
<!-- add if statement here to maybe have start/finish images? -->
    </div>
</template>

<script>
export default {
    name: "Cell",
    data() {
        return {
            hover: false,
        }
    },

    props: [
        "cell",
        "isMouseDown",
        "wallDrawingMode",
    ],
// TODO: make start/finish not draggable ontop of eachother
// TODO: fix start/finish copying
    methods: {
        toggleDraw() {
            console.log(this.wallDrawingMode);
            switch (this.wallDrawingMode) {
                case this.cell.cellType.WALL:
                    this.cell.removeWall();
                    break;
                case this.cell.cellType.EMPTY:
                    this.cell.setWall();
                    break;
                case this.cell.cellType.START:
                    this.cell.setStart();
                    break;
                case this.cell.cellType.FINISH:
                    this.cell.setFinish();
                    break;
            }
            // this.wallDrawingMode ? this.cell.removeWall() : this.cell.setWall();
        },

        onMouseDrag() {
            if (this.isMouseDown) {
                this.toggleDraw();
            }
        },

        mouseOff() {
            if (this.isMouseDown) {
                if (this.cell.fillStyle == this.cell.cellType.START || this.cell.fillStyle == this.cell.cellType.FINISH) {
                    if (this.wallDrawingMode != this.cell.cellType.WALL && this.wallDrawingMode != this.cell.cellType.EMPTY) {
                        this.cell.fillStyle = this.cell.prevType;
                    }                    
                }
            }
        },
        
        updateWallDrawingMode() {
            switch (this.cell.fillStyle) {
                case this.cell.cellType.WALL:
                    this.$emit("wallDrawingMode", this.cell.cellType.WALL);
                    this.wallDrawingMode = this.cell.cellType.WALL;
                    break;
                case this.cell.cellType.EMPTY:
                    this.$emit("wallDrawingMode", this.cell.cellType.EMPTY);
                    this.wallDrawingMode = this.cell.cellType.EMPTY;
                    break;
                case this.cell.cellType.START:
                    this.$emit("wallDrawingMode", this.cell.cellType.START);
                    this.wallDrawingMode = this.cell.cellType.START;
                    break;
                case this.cell.cellType.FINISH:
                    this.$emit("wallDrawingMode", this.cell.cellType.FINISH);
                    this.wallDrawingMode = this.cell.cellType.FINISH;
                    break;
            }

            // const isWall = (this.cell.fillStyle == this.cell.cellType.WALL) ? true : false;
            // this.$emit("wallDrawingMode", isWall);
            this.toggleDraw();
        },
    },
}
</script>

<style scoped>
.cell {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -webkit-touch-callout: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
}

.cell:hover {
box-shadow: 4px 4px 7px;
transform: scale(1.25);
z-index: 100;
transition: 30ms ease-out;
}
</style>