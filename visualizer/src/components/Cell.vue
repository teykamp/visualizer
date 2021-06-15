<template>
  <div>
      <div class="cell" :style="{'width': cell.cellSize+'px', 'height': cell.cellSize+'px', 'border': cell.borderStyle, 'background-color': cell.fillStyle}" v-on:click="toggleWall()"></div>
  </div>
</template>

<script>
export default {
    name: "Cell",
    data() {
        return {

        }
    },

    props: [
        "cell"
    ],
    methods: {
        // todo:  make draggable wall painting
        toggleWall() {
            this.cell.updateWall();
        }
    },

    mounted() {

    }
}
</script>
 
<style scoped>
.cell:hover {
box-shadow: 4px 4px 7px;
transform: scale(1.25);
z-index: 100;
transition: 30ms ease-out;
}
</style>