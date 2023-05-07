<template>
  <div class="app-container">
    <div class="header">
      <header class="fixed-title">
      <h1 class="title">KahootClone</h1>
      <nav class="nav-links">
        <router-link to="/create">Create Quiz</router-link>
        <router-link to="/join">Join Quiz</router-link>
        <router-link to="/leaderboard">Leaderboard</router-link>
      </nav>
    </header>
    </div>
    <div class="app">
      <main>
        <div class="content-wrapper">
          <router-view>
          </router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<style>
body {
  background-color: rgb(75, 22, 189) !important;
  position: relative;
}

.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.header {
  flex: 1;
  background-color: rgb(14, 195, 186) ;
}


.app {
  flex: 4;
  background-color: rgb(229, 19, 26) ;
}



.fixed-title {
  transform: translateX(-50%);
  text-align: center;
  padding: 10px;
  z-index: 1000;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin-top: 0 !important; 
  margin-bottom: 0.5rem; 
  color: white; 
}

.nav-links {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0;
}

.nav-links a {
  color: #aca2a2;
  margin: 0 1rem;
  font-size: 1.1rem;
  font-weight: 1;
  white-space: nowrap; 
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  width: 1200px;
  padding-top: 4rem;
  padding-bottom: 4rem; 
  bottom: 0;
  left: 0;
  padding-bottom: 2rem;
}
</style>

<!-- 

<template>
  <div class="grid-container">
    <div class="grid-item">1</div>
    <div class="grid-item">2</div>
    <div class="grid-item">3</div>
    <div class="grid-item">4</div>
  </div>
</template>

<style>
.grid-container {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
}

.grid-item {
  background-color: #eee;
  padding: 20px;
  font-size: 30px;
  text-align: center;
}

.grid-item:nth-child(1) {
  grid-row: 1 / span 2;
  grid-column: 1 / span 2;
  background-color: #aaa;
}

.grid-item:nth-child(2) {
  grid-row: 1 / span 1;
  grid-column: 2 / span 1;
}

.grid-item:nth-child(3) {
  grid-row: 2 / span 1;
  grid-column: 1 / span 1;
}

.grid-item:nth-child(4) {
  grid-row: 2 / span 1;
  grid-column: 2 / span 1;
}
</style> -->
