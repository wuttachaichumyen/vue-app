<script setup lang="ts">
import { ref } from 'vue';
import api from '@/lib/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const loading = ref(false);
const error = ref<string | null>(null);

const login = async () => {
  error.value = null;
  loading.value = true;
  try {
    const { data } = await api.post('/Auth/login', {
      username: username.value.trim(),
      passwordHash: password.value,
    });
    console.log(data);
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', username.value.trim());
    router.push({ name: 'IT023' });
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? 'เข้าสู่ระบบไม่สำเร็จ';
  } finally {
    loading.value = false;
  }
};

console.log('router:', router);
const goRegister = () => router.push({ name: 'IT022' });
console.log('router:', router)

</script>

<template>
  <div class="container">
    <h1>ลงชื่อเข้าใช้งาน</h1>
    <form @submit.prevent="login" class="card">
      <label>ผู้ใช้ (User)</label>
      <input v-model="username" type="text" placeholder="username" required />
      <label>รหัสผ่าน (Password)</label>
      <input v-model="password" type="password" placeholder="password" required />
      <button :disabled="loading" type="submit">ลงชื่อเข้าใช้งาน</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
    <button class="link" @click="goRegister">สมัครสมาชิก</button>
  </div>
</template>

<style scoped>
.container { max-width: 420px; margin: 40px auto; }
.card { display: grid; gap: 8px; padding: 16px; border: 1px solid #ddd; border-radius: 8px; }
.error { color: #b00020; }
.link { margin-top: 12px; background: transparent; color: #0366d6; }
</style>
