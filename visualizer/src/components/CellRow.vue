<template>
  <div>
      <div div class="row" v-for="cell in cellRow" v-bind:key="cell.globID">
        <Cell v-bind:cell="cell"
              v-bind:isMouseDown="isMouseDown"
              v-bind:wallDrawingMode="wallDrawingMode"
              v-bind:startIndex="startIndex"
              v-bind:finishIndex="finishIndex"
              v-on:wallDrawingMode="drawEmitHelper($event)"
              v-on:updateIndex="indexEmitHelper($event)"
              />
      </div>
  </div>
</template>

<script>
import Cell from "./Cell"

export default {
    name: "CellRow",
    data() {
        return {

        }
    },

    components: {
        Cell
    },

    props: [
        "cellRow",
        "isMouseDown",
        "wallDrawingMode",
        "startIndex",
        "finishIndex",
    ],

    methods: {
        drawEmitHelper(emitted) {
            this.$emit("wallDrawingMode", emitted);
        },

        indexEmitHelper(emitted) {
            this.$emit("updateIndex", emitted);
        },
    },
}
</script>

<style>

</style>