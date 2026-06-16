<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { api } from "../api";

type Product = {
  id: string;
  name: string;
  description: string;
  category?: string;
  type: string;
  operator: { name: string; country: { name: string } };
  prices: { suggested_donation?: number };
};

type Promotion = {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  operator: { name: string; country: { name: string } };
  products: Product[];
};

const promotions = ref<Promotion[]>([]);
const products = ref<Product[]>([]);
const loading = ref(true);

const byCategory = computed(() => {
  const map = new Map<string, Product[]>();
  for (const p of products.value) {
    const cat = p.category || p.type;
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat)!.push(p);
  }
  return [...map.entries()];
});

onMounted(async () => {
  try {
    const [promoData, productData] = await Promise.all([
      api.getPromotions(),
      api.getProducts(),
    ]);
    promotions.value = promoData;
    products.value = productData;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <h1>Parody catalog</h1>
    <p class="muted">AI prompts, 3D models, meme NFTs, and other sellable nonsense. Full mock dataset — no upstream API.</p>

    <h2 class="section-title">Promotions</h2>
    <div v-if="loading" class="muted">Loading promotions…</div>
    <div v-else class="grid grid-3">
      <router-link
        v-for="promo in promotions"
        :key="promo.id"
        :to="{ name: 'promotion', params: { id: promo.id } }"
        class="card"
        style="display: block; text-decoration: none"
      >
        <div class="promo-title">{{ promo.title }}</div>
        <p class="muted">{{ promo.description }}</p>
        <p class="muted" style="margin-top: 0.5rem">
          {{ promo.products?.length || 0 }} products · {{ promo.operator.name }}
        </p>
      </router-link>
    </div>

    <template v-for="[category, items] in byCategory" :key="category">
      <h2 class="section-title">{{ category }}</h2>
      <div class="grid grid-3">
        <router-link
          v-for="product in items"
          :key="product.id"
          :to="{ name: 'product', params: { id: product.id } }"
          class="card"
          style="display: block; text-decoration: none"
        >
          <span class="badge">{{ product.type }}</span>
          <div class="product-name">{{ product.name }}</div>
          <p class="muted">{{ product.description }}</p>
          <p class="muted" style="margin-top: 0.5rem">
            Suggested gift: {{ product.prices?.suggested_donation ?? 0 }} SGD (optional)
          </p>
        </router-link>
      </div>
    </template>
  </div>
</template>
