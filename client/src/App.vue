<template>
<body>
  <section class='app'>
    <div id='wrapper'>
      <div id='nav'>
        <router-link to='/saveInfo'>Save Info</router-link> |
        <router-link to='/retrieveInfo'> Retrieve Info</router-link>
      </div> <br><br>
      <div id='welcome'>
        <h3>Never spell out your info on the phone again</h3>
        <h2>Just TypeIt!</h2>
      </div>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </section>
</body>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>

.app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color:rgb(176, 224, 228);
  width: auto;
  height: auto;
  margin: auto;
  margin-top: 110px;
  padding-top: 20px;
  padding-bottom: 40px;
  border-radius: 40px;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
}

#nav {
  font-weight: bold;
}

#wrapper {
  margin-top: 50px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
