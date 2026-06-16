<script setup lang="ts">
import { ref, onMounted } from "vue";
import { api } from "../api";

const username = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

async function login() {
  error.value = "";
  if (!username.value || !password.value) {
    error.value = "Username and password required.";
    return;
  }
  loading.value = true;
  try {
    const result = await api.login(username.value, password.value);
    localStorage.setItem("token", result.token);
    window.location.href = "/app/";
  } catch (e: unknown) {
    const err = e as { data?: { message?: string } };
    error.value = err.data?.message || (err.data as { error?: string })?.error || "Login failed. Try demo / demo.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="login-wrap">
    <h1><span class="m" style="color: var(--accent)">M</span>egasoft Market</h1>
    <p class="muted" style="text-align: center; margin-bottom: 1.5rem">
      Reseller portal (parody edition). Demo: <code>demo</code> / <code>demo</code>
    </p>
    <div v-if="error" class="alert">{{ error }}</div>
    <form class="card" @submit.prevent="login">
      <label>Username</label>
      <input v-model="username" type="text" autocomplete="username" />
      <label>Password</label>
      <input v-model="password" type="password" autocomplete="current-password" />
      <input type="submit" :value="loading ? 'Signing in…' : 'Sign in'" :disabled="loading" />
    </form>
  </div>
</template>
