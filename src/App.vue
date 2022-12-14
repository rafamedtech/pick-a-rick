<script setup>
import { ref, watch } from 'vue';
import createDeck from '@/features/createDeck';
import createGame from '@/features/createGame';
import { launchConfetti } from '@/utilities/confetti';
import AppFooter from '@/components/AppFooter.vue';
import AppHero from '@/components/AppHero.vue';
import GameBoard from '@/components/GameBoard.vue';
import NewGameButton from '@/components/NewGameButton.vue';
import rymDeck from '@/data/rymDeck.json';

const { cardList } = createDeck(rymDeck);
const { newPlayer, startGame, restartGame, matchesFound, status } = createGame(cardList);
const userSelection = ref([]);
const userCanFlipCard = ref(true);

const startNewGame = () => {
  if (newPlayer) {
    startGame();
  } else {
    restartGame();
  }
};

const flipCard = (payload) => {
  if (userCanFlipCard.value) {
    cardList.value[payload.position].visible = true;

    if (userSelection.value[0]) {
      if (
        userSelection.value[0].position === payload.position &&
        userSelection.value[0].faceValue === payload.faceValue
      ) {
        return;
      } else {
        userSelection.value[1] = payload;
      }
    } else {
      userSelection.value[0] = payload;
    }
  } else {
    return;
  }
};

watch(matchesFound, (currentValue) => {
  if (currentValue === 8) {
    launchConfetti();
  }
});

watch(
  userSelection,
  (currentValue) => {
    if (currentValue.length === 2) {
      const cardOne = currentValue[0];
      const cardTwo = currentValue[1];
      // Disable ability to flip cards
      userCanFlipCard.value = false;

      if (cardOne.faceValue === cardTwo.faceValue) {
        cardList.value[cardOne.position].matched = true;
        cardList.value[cardTwo.position].matched = true;
        userCanFlipCard.value = true;
      } else {
        setTimeout(() => {
          cardList.value[cardOne.position].visible = false;
          cardList.value[cardTwo.position].visible = false;
          // Allow user to flip a new card
          userCanFlipCard.value = true;
        }, 2000);
      }

      userSelection.value.length = 0;
    }
  },
  { deep: true }
);
</script>

<template>
  <AppHero />
  <NewGameButton :newPlayer="newPlayer" @start-new-game="startNewGame" />
  <GameBoard :cardList="cardList" :status="status" @flip-card="flipCard" />
  <AppFooter />
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

html {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2342b4ca' fill-opacity='0.24' fill-rule='evenodd'/%3E%3C/svg%3E");
  /* background-color: #00070c; */
  background-color: var(--color-background);
}

h1 {
  margin-top: 0;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  color: #fff;
  padding: 60px 0;
}

.status {
  font-family: 'Get Schwifty', sans-serif;
  font-size: 18px;
  margin-top: 1rem;
  color: var(--color-text);
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 60px);
  grid-template-rows: repeat(4, 60px);
  grid-column-gap: 12px;
  grid-row-gap: 12px;
  justify-content: center;
}

@media screen and (min-width: 500px) {
  .game-board {
    grid-template-columns: repeat(4, 90px);
    grid-template-rows: repeat(4, 90px);
  }
}

@media screen and (min-width: 600px) {
  .game-board {
    grid-template-columns: repeat(4, 120px);
    grid-template-rows: repeat(4, 120px);
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.shuffle-card-move {
  transition: transform 0.8s ease-in;
}
</style>
