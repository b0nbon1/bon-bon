<template>
    <div id="loader">
        <div id="poly">
        </div>
        <div class="loader">
            <span>{{loaded}} % </span>
        </div>
        <div id="animate-out" :class="{ loading: isActive }">
        </div>
        </div>
</template>

<script>
export default {
  name: 'Loader',
  props: ['swapComponent'],
  data() {
      return {
          loaded: 0,
          isActive: false
      }
  },
methods: {
    startLoading(){
         this.loading = setInterval(this.load, 50);
         },
    load(){
         this.loaded < 100 ? this.loaded++ : this.addClass();
      },
    addClass(){
        clearInterval(this.loading);
        this.isActive = true;
        setTimeout(() => this.swapComponent('home'), 4000);
    },
      
},
mounted(){
      this.startLoading();
   },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loader{
      position: absolute;
      bottom: 0;
      right: 0;
      background: white;
      clip-path: polygon(100% 0, 0% 100%, 100% 100%);
	  animation: slide-tl 1s cubic-bezier(0.680, -0.550, 0.265, 1.550) both;
}
@keyframes slide-tl {
  0% {
    width: 20%;
    height: 0;
  }
  100% {
    width: 20%;
    height: 20%;
  }
}
#loader span{
    position: absolute;
    background: white;
    text-align: center;
    bottom: 15%;
    font-family: 'Dokdo', cursive;
    font-size: 1.5rem;
    color: #000;
}
div#poly {
  text-align: center;
  display: inline-block;
  width: 250px;
  height: 250px;
  background: orange;
  cursor: pointer;
  clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
  animation: polygons 4s alternate infinite;
}

@keyframes polygons {
  25% {
    clip-path: polygon(20% 0%, 100% 38%, 70% 90%, 0% 100%);
    background: pink;
  }
  50% {
    clip-path: polygon(0 46%, 100% 15%, 55% 74%, 0 100%);
    background: orange;
  }
  75% {
    clip-path: polygon(100% 38%, 100% 38%, 66% 100%, 0 53%);
    background: cornflowerblue;
  }
}
.loading{
    position: absolute;
      bottom: 0;
      right: 0;
      background: white;
    clip-path: polygon(100% 0, 0% 100%, 100% 100%);
	    animation: slide 3s cubic-bezier(0.680, -0.550, 0.265, 1.550) 1s both;
}
@keyframes slide {
  0% {
    width: 20%;
    height: 20%;
  }
  50% {
    width: 100%;
    height: 100%;
  }
    75% {
        width: 100%;
        height: 100%;
        clip-path: polygon(54% 0, 100% 0, 100% 100%, 0 100%, 0 100%);
  }
  100% {
      width: 100%;
     height: 100%;
    clip-path: polygon(31% 0, 100% 0, 100% 100%, 0 100%, 0 32%);
  }
}
</style>