<template>
  <div>
    <div v-if="!promotions.loading" class="banner-announcement">
      We have these promotions now.
    </div>
    <div v-else class="banner-announcement">
      We are loading our promotions...
    </div>
    <div class="promotion-banners">
      <div
        class="promotion-banner card"
        v-for="promotion in promotions.data"
        :key="promotion.title"
      >
        <div v-if="promotion === `SKELETON`">
          <div class="promotion-banner-title">&nbsp;</div>
          <p class="promotion-banner-body">&nbsp;</p>
        </div>
        <div v-if="promotion !== `SKELETON`">
          <div class="promotion-banner-title">{{ promotion.title }}</div>
          <p class="promotion-banner-body">
            {{ promotion.description }}
            <br />
            <br />{{ promotion.products.length }} products under this promotion
            bundle
            <br />
            Started in {{ new Date(promotion.start_date).toDateString() }}
            <br />
            Ending in {{ new Date(promotion.end_date).toDateString()
            }}<br />Operated by {{ promotion.operator.name }} in
            {{ promotion.operator.country.name }}<br />
          </p>
          <router-link :to="{ path: `/promotions/${promotion.id}` }"
            ><p class="promotion-banner-footer">
              Learn more about this promo...
            </p></router-link
          >
        </div>
      </div>
    </div>
    <div>
      <div v-if="!products.loading" class="banner-announcement">
        We have these products now.
      </div>
      <div v-else class="banner-announcement">
        We are loading our products...
      </div>
      <div
        class="products"
        v-for="(productList, index) in getSortedProducts"
        :key="index"
      >
        <div
          class="product card"
          v-for="(product, index) in productList"
          :key="index"
        >
          <div v-if="product === `SKELETON`">
            <div class="product-name">&nbsp;</div>
            <p class="product-body">&nbsp;</p>
          </div>
          <router-link :to="{ path: `/products/${product.id}` }">
            <div v-if="product !== `SKELETON`">
              <div class="product-name">{{ product.name }}</div>
              <p class="product-body">
                {{ product.description }}
                <br />
                <br />• Operated by {{ product.operator.name }} <br />•
                Available in {{ product.operator.country.name }}
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import productService from "../../services/product-service";
import promotionService from "../../services/promotion-service";
import chunk from "lodash/chunk";

export default {
  data: () => {
    return {
      promotions: { data: [`SKELETON`, `SKELETON`, `SKELETON`], loading: true },
      products: {
        data: [],
        loading: true,
      },
    };
  },
  methods: {
    async getPromotions() {
      const result = await promotionService.getPromotions();
      this.promotions.data = result;
      this.promotions.loading = false;
    },
    async getProducts() {
      const result = await productService.getProducts();
      this.products.data = result;
      this.products.loading = false;
    },
  },
  async mounted() {
    await Promise.all([this.getPromotions(), this.getProducts()]);
  },
  computed: {
    getSortedProducts() {
      if (!this.products.data || this.products.loading) {
        return [
          [`SKELETON`, `SKELETON`, `SKELETON`, `SKELETON`],
          [`SKELETON`, `SKELETON`, `SKELETON`, `SKELETON`],
        ];
      }
      return chunk(this.products?.data, 4);
    },
  },
};
</script>

<style lang="scss" scoped>
.product-name {
  min-height: 70px;
}

a {
  text-decoration: none;
  color: black;
}
</style>
