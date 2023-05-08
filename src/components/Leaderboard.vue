<template>
  <div class="container">
    <h2>Leaderboard</h2>
    <div class="podium">
      <div
        v-for="(participant, index) in participants.slice(0, 3)"
        :key="participant.id"
        class="podium-column"
        :class="`podium-${index + 1}`"
        :style="{
          height: ((participant.points / maxPoints) * 100 || 0) + '%',
          backgroundColor: podiumColors[index],
        }"
      >
        <div class="podium-text">
          <div class="podium-rank">{{ index + 1 }}</div>
          <div class="podium-name">{{ participant.alias }}</div>
          <div class="podium-points">{{ participant.points }}</div>
        </div>
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Alias</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(participant, index) in participants" :key="participant.id">
            <td>{{ index + 1 }}</td>
            <td>{{ participant.alias }}</td>
            <td>{{ participant.points }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}
.container h2{
  color: rgb(0, 43, 172);
  text-align: center;
}

.podium {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1rem;
  padding: 0 1rem;
}

.podium-column {
  flex: 1;
  margin: 0 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  border-radius: 8px;
}

.podium-rank {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.podium-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.podium-points {
  font-size: 1rem;
  font-weight: bold;
}

.podium-text {
  color: rgb(0, 0, 203);
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.5rem;
  text-align: left;
  color: black;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:nth-child(odd) {
  background-color: #f9f9f9;
}
</style>






<script>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import axios from "axios";
  
  export default {
    setup() {
      const djangoUrl = import.meta.env.VITE_DJANGOURL; //   ${djangoUrl}

      const route = useRoute();
      const gamePublicId = ref(sessionStorage.getItem("gamePublicId"));
      const uuidp = ref(sessionStorage.getItem("uuidP"));
  
      const participants = ref([]);
      const maxPoints = ref(0);
      const podiumColors = ["#F6BC44", "#E5E5E5", "#B57B33"]; // Gold, Silver, Bronze


      const fetchParticipants = async () => {
        try {
          console.log(gamePublicId)
          const response = await axios.get(`${djangoUrl}/api/game-participants/${gamePublicId.value}/`); 
          participants.value = response.data.sort((a, b) => b.points - a.points);
          maxPoints.value = participants.value[0]?.points || 0; // Set maxPoints to the points of the first participant or 0 if no participants
        } catch (error) {
          console.error("Error fetching participants:", error);
        }
      };
  
      onMounted(() => {
        fetchParticipants();
      });
  
      return {
        participants,
        maxPoints,
        podiumColors,
      };
    },
  };
  </script>
  