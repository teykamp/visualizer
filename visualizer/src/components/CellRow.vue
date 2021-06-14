<template>
  <div>
      <div div class="row" v-for="cell in cellRow" v-bind:key="cell.globID">
        <Cell v-bind:cell="cell"/>
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
        "cellRow"
    ],

    mounted() {

    }
}
</script>
 
<style>

</style>