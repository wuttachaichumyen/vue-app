<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/lib/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref<string | null>(localStorage.getItem('username'));
const error = ref<string | null>(null);

const validateToken = async () => {
  try {
    await api.get('/Auth/me'); // ต้องแนบ Bearer token ผ่าน interceptor
  } catch (e: any) {
    error.value = 'Token ไม่ถูกต้องหรือหมดอายุ';
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    router.replace({ name: 'IT021' });
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  router.replace({ name: 'IT021' });
};

onMounted(validateToken);
</script>

<template>
  <div class="container"><h1>
    <p v-if="username">Welcome User :  {{ username }}</p></h1>
    <p v-if="error" class="error">{{ error }}</p>
    <button @click="logout">ออกจากระบบ</button>
  </div>
</template>

<style scoped>
.container { max-width: 420px; margin: 40px auto; }
.error { color: #b00020; }
</style>
