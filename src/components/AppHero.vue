<template>
  <h1 class="sr-only">Peek-a-Rick</h1>
  <h1 :class="$style.title" data-test="title">Pick - a - Rick</h1>
  <section :class="$style.description">
    <p>Welcome to Pick-a-Rick, a <strong>Rick and Morty</strong> themed card matching game!</p>
  </section>
</template>

<style module>
.description {
  font-family: 'Get Schwifty';
}

.description strong {
  font-weight: bold;
  color: #7132a9;
}

.description p {
  margin: 0;
  font-size: 1rem;
}

.description p:last-child {
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: clamp(0.9rem, 2.5vw, 1.5rem);
}

.title {
  padding-bottom: 30px;
  margin: 0 auto;
  font-family: 'Get Schwifty';
  font-size: clamp(2.5rem, 10vw, 4rem);
  color: aqua;
  -webkit-text-fill-color: #42b4ca;
  -webkit-text-stroke-color: #bfde42;
  -webkit-text-stroke-width: 1.5px;
}
</style>
