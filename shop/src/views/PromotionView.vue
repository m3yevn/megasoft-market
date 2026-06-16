<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { api } from "../api";

const route = useRoute();
const promo = ref<{
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  operator: { name: string; country: { name: string } };
  products: { id: string; name: string; description: string; type: string }[];
} | null>(null);

onMounted(async () => {
  promo.value = await api.getPromotion(route.params.id as string);
});
</script>

<template>
  <div v-if="promo">
    <h1>{{ promo.title }}</h1>
    <p class="muted">{{ promo.description }}</p>
    <p class="muted">
      {{ promo.operator.name }} · {{ new Date(promo.start_date).toLocaleDateString() }} –
      {{ new Date(promo.end_date).toLocaleDateString() }}
    </p>

    <h2 class="section-title">Bundle products</h2>
    <div class="grid grid-3">
      <router-link
        v-for="p in promo.products"
        :key="p.id"
        :to="{ name: 'product', params: { id: p.id } }"
        class="card"
        style="display: block; text-decoration: none"
      >
        <span class="badge">{{ p.type }}</span>
        <div class="product-name">{{ p.name }}</div>
        <p class="muted">{{ p.description }}</p>
      </router-link>
    </div>
  </div>
  <p v-else class="muted">Loading…</p>
</template>
