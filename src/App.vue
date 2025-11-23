<script setup>
import { useRouter } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue';
import IT2021 from './pages/IT021.vue';
import IT2022 from './pages/IT022.vue';
import IT2023 from './pages/IT023.vue';
</script>

<template>
 <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
