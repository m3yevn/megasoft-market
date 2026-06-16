<script setup lang="ts">
import { ref, onMounted } from "vue";
import { api } from "../api";

const info = ref<{
  disclaimer: string;
  message: string;
  suggestedAmounts: (number | string)[];
  paynow: { label: string; qrUrl: string | null; placeholder: string };
  tng: { label: string; qrUrl: string | null; placeholder: string };
} | null>(null);

onMounted(async () => {
  info.value = await api.getDonation();
});
</script>

<template>
  <div v-if="info">
    <h1>Consensual gift jar ☕</h1>
    <p class="muted">{{ info.disclaimer }}</p>
    <p>{{ info.message }}</p>
    <p class="muted">
      Suggested amounts (totally optional):
      {{ info.suggestedAmounts.join(", ") }}
    </p>

    <div class="donation-grid">
      <div class="card">
        <h2>{{ info.paynow.label }}</h2>
        <img
          v-if="info.paynow.qrUrl"
          :src="info.paynow.qrUrl"
          :alt="info.paynow.label"
          class="donation-qr"
        />
        <p v-else class="muted">{{ info.paynow.placeholder }}</p>
      </div>
      <div class="card">
        <h2>{{ info.tng.label }}</h2>
        <img
          v-if="info.tng.qrUrl"
          :src="info.tng.qrUrl"
          :alt="info.tng.label"
          class="donation-qr"
        />
        <p v-else class="muted">{{ info.tng.placeholder }}</p>
      </div>
    </div>

    <p class="muted" style="margin-top: 2rem">
      When you're ready, add <code>DONATION_PAYNOW_QR_URL</code> and
      <code>DONATION_TNG_QR_URL</code> in Vercel env — point them at hosted QR image URLs.
    </p>
  </div>
  <p v-else class="muted">Loading…</p>
</template>
