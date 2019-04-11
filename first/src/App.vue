<template>
  <div id="app">
    <div :is="currentComponent" :swap-component="swapComponent"></div>
  </div>
</template>

<script>
import Welcome from './components/welcome.vue';
import Loader from './components/loader.vue';
import Home from './components/home.vue';

export default {
  name: 'app',
   data() {
     return{
    currentComponent: 'Welcome'
    }
  },
  components: {
     'Welcome':Welcome,
    'Loader':Loader,
    'home':Home
  },
   methods: {
    swapComponent: function(component) {
      this.currentComponent = component;
    }
   }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Dokdo');
*{
  background-color: #145a3b;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

}
</style>
