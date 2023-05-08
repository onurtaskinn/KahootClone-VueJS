<template>
  <div class="main-container">
    <div class="waiting-container">
      <h2>Waiting for game to start...</h2>
      <div class="participants">
        <h3>Participants</h3>
        <ul>
          <li v-for="(participant) in participants" :key="participant.id">
            {{ participant.alias }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";

export default {
  setup() {
    const djangoUrl = import.meta.env.VITE_DJANGOURL; //   ${djangoUrl}
    const router = useRouter();
    const gamePublicId = ref(sessionStorage.getItem("gamePublicId"));
    const uuidp = ref(sessionStorage.getItem("uuidP"));
    const participants = ref([]);

    if (!gamePublicId.value || !uuidp.value) {
      router.push({ name: "Home" });
    }

    const fetchParticipants = async () => {
      try {
        const response = await axios.get(`${djangoUrl}/api/game-participants/${gamePublicId.value}/`); //http://localhost:8001/api/game-participants/${gamePublicId.value}/
        participants.value = response.data;
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    onMounted(() => {
      fetchParticipants();

      const intervalId = setInterval(() => {
        fetchParticipants();
      }, 4000);

      onUnmounted(() => {
        clearInterval(intervalId);
      });
    });

    const checkGameStatus = async () => {
      try {
        const response = await axios.get(
          `${djangoUrl}/api/games/${gamePublicId.value}/`, //`http://localhost:8001/api/games/${gamePublicId.value}/`
        );

        if (response.data.state === "QUESTION") {
          sessionStorage.setItem("gamePublicId", gamePublicId.value);
          sessionStorage.setItem("uuidP", uuidp.value);
          router.push({ name: "Countdown" });
        } else {
          setTimeout(() => checkGameStatus(), 2000);
        }
      } catch (error) {
        console.error("Error fetching game status:", error);
      }
    };

    checkGameStatus();

    return {
      participants,
    };
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

.waiting-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin-top: 10vh; /* Reduce the margin-top */
  height: 80vh; /* Set height */
  overflow-y: auto; /* Add scroll when content overflows */
}

h2 {
  margin-bottom: 1.5rem;
  color: #3571d8;
  font-weight: bold;
}

.participants {
  text-align: center;
  margin-top: 1rem;
  height: calc(100% - 3.5rem); /* Set the height of the participants container */
  overflow-y: auto; /* Add scroll when the list overflows */
}

.participants h3 {
  margin-bottom: 1rem;
  font-weight: bolder;
  text-underline-offset:inherit;
  text-decoration: underline;
  font-size:.65cm;

  color: rgb(0, 0, 0);
}

.participants ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.participants li {
  color: #3571d8;
  margin-bottom: 0.5rem;
  font-weight: bolder;
  font-size: larger;
}

.participants::-webkit-scrollbar {
  width: 8px;
  background-color: #F5F5F5;
}

.participants::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #3571d8;
}

.participants::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #F5F5F5;
}

</style>
