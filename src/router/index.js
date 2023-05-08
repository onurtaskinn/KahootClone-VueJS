import { createRouter, createWebHistory } from "vue-router";

import JoinGame from "@/components/JoinGame.vue";
import Waiting from "@/components/WaitingPage.vue";
import AnswerQuestion from "@/components/AnswerQuestion.vue";
import Countdown from "@/components/CountDown.vue";
import InWaitingRoom from "@/components/InWaitingRoom.vue";
import Leaderboard from "@/components/LeaderBoard.vue";
import Home from "@/components/HomePage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/join",
    name: "JoinGame",
    component: JoinGame,
  },
  {
    path: "/waiting",
    name: "Waiting",
    component: Waiting,
  },
  {
    path: "/countdown",
    name: "Countdown",
    component: Countdown,
    props: true,
  },
  {
    path: "/answer-question",
    name: "AnswerQuestion",
    component: AnswerQuestion,
  },
  {
    path: "/waiting-inside",
    name: "InWaitingRoom",
    component: InWaitingRoom,
  },
  {
    path: "/leaderboard",
    name: "Leaderboard",
    component: Leaderboard,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
