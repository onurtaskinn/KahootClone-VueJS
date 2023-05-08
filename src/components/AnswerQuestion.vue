<template>
  <div class="answer-question-container">
    <div class="question-wrapper">
      <p v-if="gameData && gameData.current_question">Question {{ gameData.questionNo }}: {{ gameData.current_question.question }}</p>
    </div>
    <form class="answer-form">
      <div class="grid-container" v-if="gameData && gameData.current_question">
        <div
          v-for="(answer, index) in gameData.current_question.current_answers"
          :key="answer.id"
          class="grid-item"
          :class="`answer-${index}`"
          @click="selectAnswer(index)"
        >
          <div class="answer-content">
            <input
              type="radio"
              :id="`answer-${index}`"
              :value="index"
              v-model="selectedAnswer"
              @change="submitAnswer"
            />
            <label :for="`answer-${index}`">{{ answer.answer }}</label>
          </div>
        </div>
      </div>
    </form>
    <div class="countdown-wrapper">
      <h2>Countdown: {{ countdown }}</h2>
    </div>
  </div>
</template>







<!-- <script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios';

export default {
  setup() {
    const router = useRouter();
    const gamePublicId = ref(sessionStorage.getItem("gamePublicId"));
    const uuidp = ref(sessionStorage.getItem("uuidP"));

    const gameData = ref(null);
    const selectedAnswer = ref(null);
    const countdown = ref(null);

    const onCountdownFinished = async () => {
      await fetchGameData();
    };

    const startCountdown = (time) => {
      countdown.value = time;
      console.log(" in start countdown : ", time);

      const interval = setInterval(() => {
        countdown.value--;

        if (countdown.value <= 0) {
          clearInterval(interval);
          onCountdownFinished();
        }
      }, 1100);
    };

    const selectAnswer = (index) => {
      selectedAnswer.value = index;
      submitAnswer();
    };

    const submitAnswer = async () => {
      console.log("Selected answer ID:", selectedAnswer.value);
      console.log("publicId:", gameData.value.publicId);

      const data = {
        game: gameData.value.publicId,
        uuidp: uuidp.value,
        answer: selectedAnswer.value,
      };

      try {
        const response = await axios.post("https://my-third-assignment.onrender.com/api/guess/" , data);
        console.log("Guess saved successfully:", response.data);
        const correct = response.data.correct;
        sessionStorage.setItem("correct", correct);

        sessionStorage.setItem("previousQuestion", gameData.value.current_question.question);
        const correctAnswer = gameData.value.current_question.current_answers.find(answer => answer.correct).answer;
        sessionStorage.setItem("previousAnswer", correctAnswer);
        sessionStorage.setItem("guessedAnswer", gameData.value.current_question.current_answers[selectedAnswer.value].answer);
      } catch (error) {
        console.error("Error saving the guess:", error.response.data);
      }
    };

    const fetchGameData = async () => {
      try {
        const response = await axios.get(`https://my-third-assignment.onrender.com/api/games/${gamePublicId.value}/`);
        gameData.value = response.data;

        if (gameData.value.state !== "QUESTION") {
          if (gameData.value.current_question) {
            startCountdown(gameData.value.current_question.answerTime);
          } else {
            router.push({ name: "InWaitingRoom" });
          }
        } else {
          router.push({ name: "InWaitingRoom" });
        }
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };

    onMounted(async () => {
      await fetchGameData();
      if (gameData.value && gameData.value.current_question) {
        startCountdown(gameData.value.current_question.answerTime);
      }
    });

    return {
      gameData,
      selectedAnswer,
      submitAnswer,
      countdown,
      selectAnswer,
    };
  },
};
</script> -->



<!-- <script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios';

export default {
  setup() {
    const router = useRouter();
    const gamePublicId = ref(sessionStorage.getItem("gamePublicId"));
    const uuidp = ref(sessionStorage.getItem("uuidP"));

    const gameData = ref(null);
    const selectedAnswer = ref(null);
    const countdown = ref(null);

    const onCountdownFinished = async () => {
      await fetchGameData();
    };

    const startCountdown = (time) => {
      countdown.value = time;
      console.log(" in start countdown : ", time);

      const interval = setInterval(() => {
        countdown.value--;

        if (countdown.value <= 0) {
          clearInterval(interval);
          onCountdownFinished();
        }
      }, 1100);
    };

    const selectAnswer = (index) => {
      selectedAnswer.value = index;
      submitAnswer();
    };

    

    const fetchGameData = async () => {
      try {
        const response = await axios.get(`https://my-third-assignment.onrender.com/api/games/${gamePublicId.value}/`);
        gameData.value = response.data;

        if (gameData.value.state !== "QUESTION") {
          if (gameData.value.current_question) {
            startCountdown(gameData.value.current_question.answerTime);
          } else {
            router.push({ name: "InWaitingRoom" });
          }
        } else {
          router.push({ name: "InWaitingRoom" });
        }
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };

    onMounted(() => {
      startCountdown(10); // Set the initial countdown value (e.g., 10 seconds)
    });

    return {
      gameData,
      selectedAnswer,
      submitAnswer,
      countdown,
      selectAnswer,
    };
  },
};
</script> -->







<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios';

export default {
  setup() {
    const router = useRouter();
    const gamePublicId = ref(sessionStorage.getItem("gamePublicId"));
    const uuidp = ref(sessionStorage.getItem("uuidP"));

    const gameData = ref(null);
    const selectedAnswer = ref(null);
    const countdown = ref(null);

    const onCountdownFinished = () => {
      if (gameData.value.total_questions !== gameData.value.questionNo) {
        router.push({ name: "InWaitingRoom" });
      } else {
        sessionStorage.setItem("gamePublicId", gamePublicId.value);
        sessionStorage.setItem("uuidP", uuidp.value);
        router.push({ name: "Leaderboard" });
      }
    };


    const startCountdown = () => {
      countdown.value = gameData.value.current_question.answerTime;
      console.log("in start countdown:", gameData.value.current_question.answerTime);

      const interval = setInterval(() => {
        countdown.value--;

        if (countdown.value <= 0) {
          clearInterval(interval);

          const checkGameState = async () => {
            const response = await axios.get(
              `https://my-third-assignment.onrender.com/api/games/${gamePublicId.value}/`
            );
            if (response.data.state !== "ANSWER") {
              onCountdownFinished();
            } else {
              setTimeout(checkGameState, 1000); // Check again after 1 second
            }
          };

          checkGameState();
        }
      }, 1000);
    };

    const fetchGameData = async () => {
      try {
        const response = await axios.get(`https://my-third-assignment.onrender.com/api/games/${gamePublicId.value}/`);
        gameData.value = response.data;
        startCountdown()
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };


    const selectAnswer = (index) => {
      selectedAnswer.value = index;
      submitAnswer();
    };

    const submitAnswer = async () => {
      console.log("Selected answer ID:", selectedAnswer.value);
      console.log("publicId:", gameData.value.publicId);

      const data = {
        game: gameData.value.publicId,
        uuidp: uuidp.value,
        answer: selectedAnswer.value,
      };

      try {
        const response = await axios.post("https://my-third-assignment.onrender.com/api/guess/" , data);
        console.log("Guess saved successfully:", response.data);
        const correct = response.data.correct;
        sessionStorage.setItem("correct", correct);
        sessionStorage.setItem("previousQuestion", gameData.value.current_question.question);
        const correctAnswer = gameData.value.current_question.current_answers.find(answer => answer.correct).answer;
        sessionStorage.setItem("previousAnswer", correctAnswer);
        sessionStorage.setItem("guessedAnswer", gameData.value.current_question.current_answers[selectedAnswer.value].answer);
      } catch (error) {
        console.error("Error saving the guess:", error.response.data);
      }
    };



    onMounted(() => {
      fetchGameData();
    });

    return {
      gameData,
      selectedAnswer,
      submitAnswer,
      countdown,
      selectAnswer,
    };
  },
};
</script>



<style scoped>
.answer-question-container {
  display: grid;
  grid-template-rows: auto 2fr auto;
  grid-template-columns: 1fr;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
}

body {
  min-width: 100vw;
}

.question-wrapper {
  text-align: center;
  background-color: #004e75;
  color: #ffffff;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  font-size: 1.5rem; /* Make question text bigger */
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  grid-gap: 10px;
  flex-grow: 1;
}

.grid-item {
  padding: 10px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.answer-0 {
  background-color: #f44336;
}

.answer-1 {
  background-color: #2196f3;
}

.answer-2 {
  background-color: #4caf50;
}

.answer-3 {
  background-color: #ff9800;
}

input[type="radio"] {
  display: none;
}

input[type="radio"]:checked + label {
  font-weight: bold;
}

.countdown-wrapper {
  text-align: center;
  background-color: #ffca28;
  color: #000;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
}

.answer-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  text-align: left; /* Add text-align to align multiline text properly */
  word-break: break-word; /* Use word-break instead of word-wrap */
}

.answer-content label {
  font-size: 1.2rem;
  font-weight: normal;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  transition: font-weight 0.2s, text-shadow 0.2s;
}


.grid-item:hover .answer-content label {
  /* font-weight: bold; */
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

</style>



<!-- //   const interval = setInterval(() => {
  //     countdown.value--;

  //     if (countdown.value <= 0) {
  //       clearInterval(interval);
  //       if(gameData.value.total_questions !== gameData.value.questionNo){
  //         router.push({ name: "InWaitingRoom" });
  //       }
  //       else{
  //         sessionStorage.setItem("gamePublicId", this.gamePublicId);
  //         sessionStorage.setItem("uuidP", this.uuidP);
  //         router.push({ name: "Leaderboard" });
  //       }
  //     }
  //   }, 1000);
  // }; -->



  <!-- // try {
    //   const response = await axios.post("http://127.0.0.1:8001/api/guess/", data);
    //   console.log("Guess saved successfully:", response.data);
    //   const correct = response.data.correct; // Access the uuidP value
    //   sessionStorage.setItem("correct", correct);
    //   console.log(correct)
    // } catch (error) {
    //   console.error("Error saving the guess:", error.response.data);
    // } -->



    <!-- 
<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from 'axios';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const gamePublicId = ref(route.query.gamePublicId);
    const uuidp = ref(route.query.uuidP);

    const gameData = ref(null);
    const selectedAnswer = ref(null);
    const countdown = ref(null);

    const selectAnswer = (index) => {
      selectedAnswer.value = index;
      submitAnswer();
    };

    const submitAnswer = async () => {
      console.log("Selected answer ID:", selectedAnswer.value);
      console.log("publicId:", gameData.value.publicId);

      const data = {
        game: gameData.value.publicId,
        uuidp: uuidp.value,
        answer: selectedAnswer.value,
      };

      try {
        const response = await axios.post("http://127.0.0.1:8001/api/guess/", data);
        console.log("Guess saved successfully:", response.data);
      } catch (error) {
        console.error("Error saving the guess:", error.response.data);
      }
    };


    const startCountdown = () => {
      countdown.value = gameData.value.current_question.answerTime;
      console.log(" in start countdown : ",gameData.value.current_question.answerTime)

      const interval = setInterval(() => {
        countdown.value--;

        if (countdown.value <= 0) {
          clearInterval(interval);
          if(gameData.value.total_questions !== gameData.value.questionNo){
            router.push({ name: "InWaitingRoom", query: { gamePublicId: gameData.value.publicId, uuidP: uuidp.value } });
          }
          else{
            router.push({ name: "Leaderboard", query: { gamePublicId: gameData.value.publicId, uuidP: uuidp.value } });
          }
          // Fetch new data or perform other actions when the countdown reaches 0
        }
      }, 1000);
    };

    const fetchGameData = async () => {
      try {
        console.log("game State is not QUESTION");
        const response = await axios.get(`http://localhost:8001/api/games/${gamePublicId.value}/`);
        gameData.value = response.data;

        if (gameData.value.state !== "QUESTION") {
          console.log("game State is not QUESTION");

          // Check if current_question exists before using its answerTime property
          if (gameData.value.current_question) {
            setTimeout(fetchGameData, gameData.value.current_question.answerTime * 1000);
            startCountdown();
          } else {
            console.log("No more questions available");
            // Redirect to Leaderboard.vue
            router.push({ name: "Leaderboard", query: { gamePublicId: gameData.value.publicId } });
          }
        } else {
          console.log("game State is QUESTION");
          router.push({ name: "InWaitingRoom", query: { gamePublicId: gameData.value.publicId, uuidP: uuidp.value } });
        }
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };


    onMounted(() => {
      fetchGameData();
    });

    return {
      gameData,
      selectedAnswer,
      submitAnswer,
      countdown,
      selectAnswer,
    };
  },
};
</script>  -->