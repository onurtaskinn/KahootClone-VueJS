<template>
  <div class="home-container">
    <div class="content-box">
      <h2>Welcome to KahootClone!</h2>
      <!-- <p>Select an option from the menu above to get started.</p> -->
      <nav class="nav-links">
                <router-link to="/join">Join Quiz</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>


.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  margin-top: 0rem;
  color: rgb(60, 138, 180);
}

.content-box {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.content-box h2 {
  font-size: 2rem;
  font-weight:bold;
  margin-bottom: 1.5rem;
}

nav {
    display: flex;
    justify-content: center;
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
