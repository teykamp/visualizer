<template>
  <div>
      <div  class="cell"
            :style="{'width': cell.cellSize+'px',
                    'height': cell.cellSize+'px',
                    'border': cell.borderStyle,
                    'background-color': cell.fillStyle}"
            v-on:click="toggleWall()"
            @mouseover="onMouseDrag()"
            @mousedown="updateWallDrawingMode(), onMouseDrag()"
            ></div>

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

    methods: {
        toggleWall() {
            this.wallDrawingMode ? this.cell.removeWall() : this.cell.setWall();
        },

        onMouseDrag() {
            if (this.isMouseDown) {
                this.toggleWall();
            }
        },
        updateWallDrawingMode() {
            this.$emit("wallDrawingMode", this.cell.isWall);
            this.toggleWall();
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