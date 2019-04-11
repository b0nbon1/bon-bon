<template>
  <div class="hello">
    <a href="#"><div id="logo"></div></a>
    <header>
        <nav>
            <ul></ul>
        </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: ['swapComponent']
}


</script>

<style scoped>
*{
    background: #fff;
    height: 100vh;
}
#logo {
    position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: #145a3b;
      transition: 0.3s;
    clip-path: polygon(0 0, 0 32%, 31% 0);
}
a #logo:hover {
      clip-path: polygon(0 0, 0 35%, 34% 0)
}
</style>
