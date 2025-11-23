<script setup lang="ts">
import { ref } from 'vue';
import api from '@/lib/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const error = ref<string | null>(null);
const success = ref<string | null>(null);

const register = async () => {
  error.value = null;
  success.value = null;

  if (password.value !== confirmPassword.value) {
    error.value = 'Password และ Confirm Password ต้องเหมือนกัน';
    return;
  }
  loading.value = true;
  try {
    await api.post('/Auth/register', {
      username: username.value.trim(),
      passwordHash: password.value,
    });
    success.value = 'สมัครสมาชิกสำเร็จ';
    setTimeout(() => router.push({ name: 'IT021' }), 800); // กลับ IT 02-1
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? 'สมัครสมาชิกไม่สำเร็จ';
  } finally {
    loading.value = false;
  }
};

const backToLogin = () => router.push({ name: 'IT021' });
</script>

<template>
  <div class="container">
    <h1>สมัครสมาชิก</h1>
    <form @submit.prevent="register" class="card">
      <label>ผู้ใช้ (User)</label>
      <input v-model="username" type="text" placeholder="username" required />
      <label>รหัสผ่าน (Password)</label>
      <input v-model="password" type="password" placeholder="password" required />
      <label>ยืนยันรหัสผ่าน (Confirm Password)</label>
      <input v-model="confirmPassword" type="password" placeholder="confirm password" required />
      <button :disabled="loading" type="submit">สมัครสมาชิก</button>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </form>
    <button class="link" @click="backToLogin">กลับไปหน้า IT 02-1</button>
  </div>
</template>

<style scoped>
.container { max-width: 420px; margin: 40px auto; }
.card { display: grid; gap: 8px; padding: 16px; border: 1px solid #ddd; border-radius: 8px; }
.error { color: #b00020; }
.success { color: #0a8f08; }
.link { margin-top: 12px; background: transparent; color: #0366d6; }
</style>
