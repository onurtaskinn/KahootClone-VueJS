<template>
  <div class="wrapper">
    <div class="container">
      <div :class="containerClass">
        <div v-if="showHeader" class="header">
          <header class="fixed-title">
            <nav class="nav-links">
              <router-link to="/">KahootClone</router-link>
            </nav>
          </header>
        </div>
        <div class="app">
          <router-view> </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const showHeader = computed(
  () =>
    route.path === "/" ||
    route.path === "/join" ||
    route.path === "/leaderboard" ||
    route.path === "/waiting"
);
const containerClass = computed(() =>
  showHeader.value ? "container" : "container-no-header"
);
</script>

<style>
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.wrapper {
  min-width: 100%;
}

.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
}

.container-no-header {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  height: 100vh;
}

.header {
  justify-content: center;
  display: flex;
  align-items: center;
  background-color: #4a90e2;
  padding: 15px;
}

.app {
  display: grid;
  grid-column: 1 / 2;
  background-color: #78b8fd;
}

.title {
  margin-right: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

nav {
  display: flex;
}

nav a {
  margin-right: 10px;
  padding: 5px 10px;
  color: white;
  text-decoration: none;
  background-color: #3571d8;
  border-radius: 5px;
  font-weight: 600;
  transition: background-color 0.3s;
  font-size: larger;
}

nav a:hover {
  background-color: #1c5ed2;
}
</style>
