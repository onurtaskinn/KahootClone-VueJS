<template>
    <div class="main-container">
      <audio ref="correctAnswerAudio" src="/static/Correct-answer.mp3" preload="auto"></audio>
      <div class="waiting-container">
        <div v-if="previousQuestion && previousAnswer" class="previous-container">
          <h2 class="section-title">Previous Question</h2>
          <div class="previous-question">
            <p>{{ previousQuestion }}</p>
          </div>
          <h2 class="section-title">Correct Answer</h2>
          <div class="previous-answer" :class="{ 'correct-answer': correct === 'true', 'incorrect-answer': correct === 'false' }">
            <p>{{ previousAnswer }}</p>
          </div>
          <h3 v-if="correct === 'true'" class="success-message">Your answer is correct!!</h3>
          <div v-if="correct === 'false'" class="guessed-answer" :class="{ 'incorrect-answer': correct === 'false' }">
            <h2 class="section-title">Your Answer</h2>
            <p>{{ guessedAnswer }}</p>
          </div>
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
      const router = useRouter();
      const gamePublicId = ref(sessionStorage.getItem("gamePublicId"));
      const uuidp = ref(sessionStorage.getItem("uuidP"));
      const correct = ref(sessionStorage.getItem("correct"));
      const last_question = ref(sessionStorage.getItem("last_question"));

      const participants = ref([]);
      const previousQuestion = ref(sessionStorage.getItem("previousQuestion"));
      const previousAnswer = ref(sessionStorage.getItem("previousAnswer"));
      const guessedAnswer = ref(sessionStorage.getItem("guessedAnswer"));

      const correctAnswerAudio = ref(null);

      
      console.log("last question : xx",last_question.value)
      console.log(correct.value)

      const playSound = () => {
      if (correctAnswerAudio.value && correct.value ==='true') {
        correctAnswerAudio.value.play();
      }
      };

  
      if (!gamePublicId.value || !uuidp.value) {
        router.push({ name: "Home" });
      }
  
      const fetchParticipants = async () => {
        try {
          const response = await axios.get(`https://my-third-assignment.onrender.com/api/game-participants/${gamePublicId.value}/`); //`http://localhost:8001/api/game-participants/${gamePublicId.value}/`
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
        playSound();
      });
  
      const checkGameStatus = async () => {
        try {
          const response = await axios.get(
            //`http://localhost:8001/api/games/${gamePublicId.value}/`,
            `https://my-third-assignment.onrender.com/api/games/${gamePublicId.value}/`,
          );
          console.log(response.data.state)
          if (response.data.state === "ANSWER") {
            router.push({ name: "AnswerQuestion" });
            console.log("to leaderboard")
            console.log("last question : yy",last_question.value)
            console.log(response.data.state)
          }
          else if( response.data.state === "FINISHED" ){
            router.push({ name: "Leaderboard" });
          }
          else {
            setTimeout(() => checkGameStatus(), 2000);
          }
        } catch (error) {
          console.error("Error fetching game status:", error);
        }
      };
  
      checkGameStatus();
  
      return {
        correctAnswerAudio,
        participants,
        previousQuestion,
        previousAnswer,
        guessedAnswer,
        correct,
      };
    },
  };
  </script>
  
<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.waiting-container {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
}

.section-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.25rem;
  color: black;
}
.previous-question{
    color: black;
}
.previous-container .previous-question,
.previous-container .previous-answer,
.previous-container .guessed-answer {
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  word-wrap: break-word; /* Added to wrap long text */
}

.correct-answer {
  color: #4caf50;
}

.incorrect-answer {
  color: #f44336;
}

.success-message {
  color: #4caf50;
  font-weight: bold;
}

.guessed-answer {
  color: #f44336;
}
</style>
