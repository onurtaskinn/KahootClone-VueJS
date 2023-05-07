<template>
  <div class="home-container">
    <div class="content-box">
      <h2>Welcome to KahootClone!</h2>
      <p>Select an option from the menu above to get started.</p>
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
  font-weight: bold;
  margin-bottom: 1.5rem;
}
</style>
