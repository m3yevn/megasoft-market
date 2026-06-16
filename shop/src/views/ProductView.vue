<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { api } from "../api";

const route = useRoute();
const product = ref<Record<string, unknown> | null>(null);
const email = ref("");
const error = ref("");
const success = ref("");
const loading = ref(false);

const fieldKey = ref("email");

onMounted(async () => {
  product.value = await api.getProduct(route.params.id as string);
  const fields = (product.value?.required_credit_party_identifier_fields as string[][])?.[0];
  fieldKey.value = fields?.[0] || "email";
});

async function acquire() {
  error.value = "";
  success.value = "";
  if (!email.value) {
    error.value = `${fieldKey.value} is required.`;
    return;
  }
  loading.value = true;
  try {
    const result = await api.submitTxn(route.params.id as string, {
      [fieldKey.value]: email.value,
    });
    success.value = `${result.message} (txn: ${result.id})`;
    if (result.suggested_donation) {
      success.value += ` Optional suggested gift: ${result.suggested_donation} SGD.`;
    }
  } catch (e: unknown) {
    const err = e as { data?: { errors?: { message: string }[] } };
    error.value = err.data?.errors?.[0]?.message || "Acquire failed.";
  } finally {
    loading.value = false;
  }
}

function reset() {
  success.value = "";
  email.value = "";
}
</script>

<template>
  <div v-if="product" class="detail-layout">
    <div>
      <span class="badge">{{ product.type }}</span>
      <h1>{{ product.name }}</h1>
      <p class="muted">{{ product.description }}</p>
      <p><strong>Operator:</strong> {{ (product.operator as { name: string }).name }}</p>
      <p>
        <strong>Suggested voluntary gift:</strong>
        {{ (product.prices as { suggested_donation?: number })?.suggested_donation ?? 0 }} SGD
      </p>
      <router-link to="/donation">Send a consensual gift →</router-link>
    </div>

    <div class="card">
      <h2>Acquire (mock)</h2>
      <p class="muted">No real goods. Demo transaction only.</p>
      <div v-if="error" class="alert">{{ error }}</div>
      <div v-if="success" class="success-box">
        {{ success }}
        <p><button type="button" @click="reset">Acquire another</button></p>
      </div>
      <form v-else @submit.prevent="acquire">
        <label>Credit to ({{ fieldKey }})</label>
        <input v-model="email" type="email" placeholder="you@example.com" />
        <input
          type="submit"
          :value="loading ? 'Acquiring…' : 'Acquire nonsense asset'"
          :disabled="loading"
        />
      </form>
    </div>
  </div>
  <p v-else class="muted">Loading…</p>
</template>
