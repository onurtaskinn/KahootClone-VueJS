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
          }"
        >
          <div class="podium-name">{{ participant.alias }}</div>
          <div class="podium-points">{{ participant.points }}</div>
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
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 1rem;
    color: black;
  }
  
  .podium {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 1rem;
    height: 250px;
  }
  
  .podium-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 20%;
    margin: 0 1rem;
    background-color: #f2f2f2;
    border-radius: 5px;
    position: relative;
    transition: height 0.5s;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding-bottom: 1.5rem; /* Add this line */
  }

  .podium-text {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  background-color: white;
  padding: 5px 0;
}
  
  .podium-name {
    margin-top: 0.5rem;
    padding: 0 5px; /* Add this line */
    color: black;
  }
  
  .podium-points {
    margin-top: 0.25rem;
    font-weight: bold;
    padding: 0 5px; /* Add this line */
    color: black;
  }
  
  .podium-1 {
    background-color: #F6BC44;
  }
  
  .podium-2 {
    background-color: #E5E5E5;
  }
  
  .podium-3 {
    background-color: #B57B33;
  }
  
  .table-container {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 100px; /* Add this line */
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    color: black;
  }
  
  thead {
    background-color: #f2f2f2;
  }
  
  th,
  td {
    text-align: left;
    padding: 0.5rem;
  }
  
  tr:nth-child(even) {
    background-color: #f7f7f7;
  }
  
  </style>
  



<script>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import axios from "axios";
  
  export default {
    setup() {
      const route = useRoute();
      const gamePublicId = ref(sessionStorage.getItem("gamePublicId"));
      const uuidp = ref(sessionStorage.getItem("uuidP"));
  
      const participants = ref([]);
      const maxPoints = ref(0);
      const podiumColors = ["#F6BC44", "#E5E5E5", "#B57B33"]; // Gold, Silver, Bronze


      const fetchParticipants = async () => {
        try {
          console.log(gamePublicId)
          const response = await axios.get(`http://localhost:8001/api/game-participants/${gamePublicId.value}/`);
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
