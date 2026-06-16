<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const showNav = computed(() => route.name !== "login");

function logout() {
  localStorage.removeItem("token");
  router.push({ name: "login" });
}
</script>

<template>
  <div class="app-shell">
    <header v-if="showNav" class="app-header">
      <a href="/" class="logo"><span class="m">M</span>ega<span class="s">S</span>oft</a>
      <nav>
        <router-link to="/">Catalog</router-link>
        <router-link to="/donation">Gift jar ☕</router-link>
        <a href="/docs">Docs</a>
        <button class="ghost" type="button" @click="logout">Logout</button>
      </nav>
    </header>
    <p v-if="showNav" class="parody-banner">
      Parody demo — nonsense digital goods. Optional donations are voluntary gifts, not purchases.
    </p>
    <main class="app-main">
      <router-view />
    </main>
    <footer class="app-footer">Eternal Flame · Megasoft Market v2 · not a real business</footer>
  </div>
</template>
