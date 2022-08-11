<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  matched: {
    type: Boolean,
    default: false,
  },
  position: {
    type: Number,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: false,
  },
});
const { matched, position, value, visible } = toRefs(props);

const emit = defineEmits(['select-card']);
const selectCard = () => {
  emit('select-card', {
    position: position.value,
    faceValue: value.value,
  });
};
</script>

<template>
  <div class="card" :class="{ 'is-flipped': visible }" @click="selectCard" data-test="game-card">
    <div class="card-face is-front">
      <img class="card-image" :src="`/images/${value}.jpeg`" :alt="value" data-test="image" />
      <img
        v-if="matched"
        src="/images/checkmark.svg"
        class="icon-checkmark"
        data-test="checkmark"
      />
    </div>
    <div class="card-face is-back" data-test="backface"></div>
  </div>
</template>

<style>
.card {
  position: relative;
  transition: 0.5s transform ease-in;
  transform-style: preserve-3d;
}

.card.is-flipped {
  transform: rotateY(180deg);
}

.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
}

.card-face.is-front {
  color: white;
  transform: rotateY(180deg);
}

.card-face.is-back {
  background-image: url('/images/back-card.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: white;
}

.card-image {
  max-width: 100%;
  border-radius: 10px;
}

.icon-checkmark {
  position: absolute;
  right: 5px;
  bottom: 5px;
}
</style>
