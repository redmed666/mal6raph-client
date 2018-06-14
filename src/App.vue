<template>
  <div id="app">
    <header>
      <h1>Mal6raph</h1>
    </header>
    <main>
      <Navigation></Navigation>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";

export default {
  components: {
    Navigation: Navigation
  },
  name: "app"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>