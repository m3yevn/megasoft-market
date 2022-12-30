<template>
  <div class="promotion-banner">
    <div class="promotion-banner-title">{{ promotion.title }}</div>
    <p class="promotion-banner-body">
      {{ promotion.description }}
      <br />
      <br />
      Started in {{ new Date(promotion.start_date).toDateString() }}
      <br />
      Ending in {{ new Date(promotion.end_date).toDateString() }}<br />Operated
      by {{ promotion.operator.name }} in {{ promotion.operator.country.name
      }}<br />
      <br />
    </p>
    <div
      class="products"
      v-for="(productList, index) in getSortedProducts"
      :key="index"
    >
      <div
        class="product card"
        v-for="product in productList"
        :key="product.title"
      >
        <div class="product-name">{{ product.name }}</div>
        <div class="product-body">{{ product.description }}</div>
        <div class="product-footer">
          <router-link :to="{ path: `/products/${product.id}` }"
            >Learn more about this product..</router-link
          >
        </div>
      </div>
    </div>
    <p class="promotion-terms-title">Read the terms of this promotion.</p>
    <div class="promotion-terms" v-html="getTermsHTML"></div>
  </div>
</template>

<script>
import { marked } from "marked";
import chunk from "lodash/chunk";
import promotionService from "@/services/promotion-service";

export default {
  data: () => {
    return { promotion: {} };
  },
  methods: {
    async getPromotionById() {
      const result = await promotionService.getPromotionById(
        this.$route.params.id
      );
      this.promotion = result;
    },
  },
  async mounted() {
    this.getPromotionById();
  },
  computed: {
    getTermsHTML() {
      return marked(this.promotion?.terms);
    },
    getSortedProducts() {
      if (!this.promotion?.products) {
        return [];
      }
      return chunk(this.promotion?.products, 4);
    },
  },
};
</script>

<style lang="scss" scoped>
.promotion-banner {
  width: 100vw;

  .promotion-banner-title {
    border-radius: 0px;
  }

  .promotion-terms-title {
    padding: 16px;
    font-size: 16px;
    font-weight: bolder;
  }

  .product-body {
    background: whitesmoke;
    min-height: 150px;
  }

  .product-name {
    min-height: 70px;
  }
}
</style>
