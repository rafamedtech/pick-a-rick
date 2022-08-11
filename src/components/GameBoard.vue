<script setup>
import { toRefs } from 'vue';
import GameCard from '@/components/GameCard.vue';

const props = defineProps({
  cardList: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});
const { cardList, status } = toRefs(props);

const emit = defineEmits(['flip-card']);
const selectCard = (payload) => {
  emit('flip-card', payload);
};
</script>

<template>
  <transition-group tag="section" class="game-board" name="shuffle-card">
    <GameCard
      v-for="card in cardList"
      :key="`${card.value}-${card.variant}`"
      :matched="card.matched"
      :value="card.value"
      :visible="card.visible"
      :position="card.position"
      @select-card="selectCard"
      data-test="card"
    />
  </transition-group>
  <h2 class="status" data-test="status">{{ status }}</h2>
</template>
