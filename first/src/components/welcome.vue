<template>
  <div class="hello">
    <h3 @click="swapComponent('Loader')"><span>Click</span> to enter to the website</h3>
  </div>
</template>


<script>
// import Loader from './loader.vue';
export default {
  name: 'Welcome',
  props: ['swapComponent']
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  position: absolute;
  left: 50%;
  top: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 2rem;
  font-family: 'Dokdo', cursive;
  transform: translate(-50%, -50%);
}
h3 span{
  font-size: 3rem;
}
</style>
