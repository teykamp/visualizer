<template>
  <div>
      <div class="cell" :style="{'width': cell.cellSize+'px', 'height': cell.cellSize+'px', 'border': cell.borderStyle}"></div>
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

    mounted() {

    }
}
</script>
 
<style scoped>
.cell:hover {
background-color: darkgray;
box-shadow: 4px 4px 7px;
transform: scale(1.25);
z-index: 100;
}
</style>