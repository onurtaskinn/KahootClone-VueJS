<template>
  <div class="main-container">
    <div class="countdown-container">
      <h2>Get ready to answer the question!</h2>
      <p><span class="counter">{{ counter }}</span></p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const uuidp = ref(sessionStorage.getItem("uuidP"));
    const gamePublicId = ref(sessionStorage.getItem("gamePublicId"));

    console.log("Participant uuidP in countdown:", uuidp.value);
    console.log("publicId:", gamePublicId.value);

    const counter = ref(5);

    const startCountdown = () => {
      const timer = setInterval(() => {
        if (counter.value <= 1) {
          clearInterval(timer);
          router.push({
            name: "AnswerQuestion",
          });
        } else {
          counter.value--;
        }
      }, 1100);
    };

    onMounted(() => {
      startCountdown();
    });

    return {
      counter,
    };
  },
};
</script>


<style scoped>

.main-container {
  /* justify-content: center; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.countdown-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  margin-bottom: 1.5rem;
  color: #3571d8;
  font-weight:400 ;
  font-family:fantasy;
}

p {
  font-size: 1.2rem;
}

.counter {
  font-size: 4rem;
  font-weight: bold;
  display: inline-block;
  margin: 0 0.5rem;
}
</style>