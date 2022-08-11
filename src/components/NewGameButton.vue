<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  newPlayer: {
    type: Boolean,
    default: true,
  },
});
const { newPlayer } = toRefs(props);

const emit = defineEmits(['start-new-game']);

const startNewGame = () => {
  emit('start-new-game');
};
</script>

<template>
  <button v-if="newPlayer" @click="startNewGame" :class="$style.button" data-test="start-button">
    <div :class="$style['button-icon']">
      <img :class="$style['icon-play']" src="/images/play.svg" alt="Play Icon" />
    </div>
    Start Game
  </button>
  <button v-else @click="startNewGame" :class="$style.button" data-test="restart-button">
    <img src="/images/restart.svg" alt="Restart Icon" />Restart Game
  </button>
</template>

<style module>
.button {
  background-color: #42b4ca;
  color: white;
  padding: 8px 16px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  font-weight: bold;
  font-family: 'Titillium Web', sans-serif;
  font-weight: bold;
  font-size: 1rem;
  border: 0;
  border-radius: 10px;
  transition: 0.2s all ease-in;
  border: 2px solid #bfde42;
}

.button:hover {
  background-color: transparent;
  color: #42b4ca;
}

.button img {
  padding-right: 12px;
  transition: 0.2s opacity ease-in;
}

.button .icon-ghost {
  position: absolute;
  left: -6px;
  opacity: 0;
}

.button .icon-play {
  position: absolute;
  left: -6px;
  opacity: 1;
}

.button-icon {
  position: relative;
  width: 24px;
  height: 24px;
}
</style>
