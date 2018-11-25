<template>
  <div class="big-button-container"  v-on:click="onClick()">
  <p class="text">{{title}}</p>
  <font-awesome-icon v-bind:icon="iconType"  :style="{ color: '#CCC' }" />
  </div>
</template>

<script>
const BigButton = {
  name: "BigButton",
  props: ["onClick", "title", "iconType"],
};
export default BigButton;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.big-button-container {
  display: flex;
  width: 130px;
  height: 130px;
  margin: 0px;
  padding: 0px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #ccc;
  cursor: pointer;
  border-radius: 5px;
}
.big-button-container:hover {
  background-color: rgb(183, 196, 219);
}

.text {
  color: #cccccc;
  font-weight: 900;
}
</style>
