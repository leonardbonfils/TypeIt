<template>
<body>
  <section class='app'>
    <div id='nav'>
      <router-link to='/saveInfo'>Save Info</router-link> |
      <router-link to='/retrieveInfo'> Retrieve Info</router-link>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </section>
</body>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color:white;
}

#nav {
  font-weight: bold
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
