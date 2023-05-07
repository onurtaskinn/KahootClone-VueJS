<template>
  <div class="main-container">
    <div class="join-game-container">
      <h2>Join Game</h2>
      <form @submit.prevent="submitForm">
        <div class="input-container">
          <label for="alias">Alias:</label>
          <input id="alias" type="text" v-model="alias" />
        </div>
        <div class="input-container">
          <label for="game-id">Game ID:</label>
          <input id="game-id" type="text" v-model="gamePublicId" />
        </div>
        <button class="join-button" type="submit">Join</button>
      </form>
    </div>
  </div>
</template>

<!-- <script>
import axios from "axios";

export default {
  data() {
    return {
      alias: "",
      gamePublicId: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post(
          "http://localhost:8001/api/participants/",
          {
            alias: this.alias,
            game: this.gamePublicId,
          }
        );

        if (response.status === 201) {
          const uuidP = response.data.uuidP; // Access the uuidP value
          this.$router.push({
            name: "Waiting",
            query: { gamePublicId: this.gamePublicId, uuidP: uuidP }, // Pass the uuidP value
          });
        }
      } catch (error) {
        console.error("Error creating participant:", error);
      }
    },
  },
};
</script> -->

<script>
import axios from "axios";

export default {
  data() {
    return {
      alias: "",
      gamePublicId: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post(
          "http://localhost:8001/api/participants/",
          {
            alias: this.alias,
            game: this.gamePublicId,
          }
        );

        if (response.status === 201) {
          const uuidP = response.data.uuidP; // Access the uuidP value
          sessionStorage.setItem("gamePublicId", this.gamePublicId);
          sessionStorage.setItem("uuidP", uuidP);
          this.$router.push({ name: "Waiting" });
        }
      } catch (error) {
        console.error("Error creating participant:", error);
      }
    },
  },
};
</script>


<style scoped>
.main-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #4a90e2;
}

.join-game-container {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}
.join-game-container h2 {
  font-size: 2rem;
  font-weight: bold;
  color:#3571d8;
  margin-bottom: 1.5rem;
  text-align: center;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  color: #4a90e2;
}

.input-container label {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.input-container input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.join-button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #3571d8;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.join-button:hover {
  background-color: #1c5ed2;
}
</style>