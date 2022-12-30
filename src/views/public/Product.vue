<template>
  <div>
    <div v-if="product" class="products">
      <div class="product">
        <div class="product-name">{{ product.name }}</div>
        <div
          :class="
            type === `admin` ? `product-body-container` : `product-body-wrapper`
          "
        >
          <div class="product-body">
            <strong>Description:</strong>
            {{ product.description }}
            <strong>Availability Zones:</strong>
            {{ product.availability_zones.join(",") }}
            <strong>Benefits:</strong>
            <p v-for="(benefit, index) in product.benefits" :key="index">
              {{ benefit.amount.total_including_tax }} {{ benefit.unit }}
            </p>
            <strong>Operator:</strong>
            {{ product.operator.name }}, {{ product.operator.country.name }}
            <strong>Wholesale Prices:</strong>
            {{ product.prices.wholesale.amount }}
            {{ product.prices.wholesale.unit }}
            <strong>Service:</strong>
            {{ product.service.name }}
            <strong>Type:</strong>
            {{ product.type }}
            <template v-if="product.validity">
              <strong>Validity:</strong>
              {{ product.validity.quantity }} {{ product.validity.unit }}
            </template>
          </div>
          <div v-if="type !== `admin`" class="product-txn-form card">
            <div class="alert" type="error" v-if="alert">{{ alert }}</div>

            <template v-if="success">
              <div class="product-txn-success" v-html="success"></div>
              <div>
                <button @click="refresh()">Make another purchase</button>
              </div>
            </template>
            <template v-if="!success">
              <div><strong>Credit to</strong></div>
              <form @submit.prevent="submitTxn()">
                <div>{{ FIELDS[creditIdentifier.key] }}</div>
                <input v-model="creditIdentifier.value" />
                <label class="error"
                  >{{ error[creditIdentifier.key] }}&nbsp;</label
                >
                <div>
                  <input
                    type="submit"
                    :value="loading ? `Purchasing...` : `Purchase`"
                    :disabled="loading"
                  />
                </div>
              </form>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productService from "@/services/product-service";
import txnService from "@/services/txn-service";
import FIELDS from "@/constants/FIELDS";

export default {
  props: {
    type: String,
  },
  data: () => {
    return {
      FIELDS,
      product: null,
      creditIdentifier: "",
      error: {},
      alert: "",
      success: "",
      loading: false,
    };
  },
  watch: {
    creditIdentifier: {
      deep: true,
      handler(val) {
        this.alert = "";
        this.success = "";
        this.error = {
          [val.key]: !val.value ? "*required" : "",
        };
      },
    },
  },
  methods: {
    refresh() {
      this.creditIdentifier = {
        key:
          this.product.required_credit_party_identifier_fields?.[0]?.[0] ||
          "mobile_number",
        value: "",
      };
    },
    async getProductById() {
      const result = await productService.getProductById(this.$route.params.id);
      this.product = result;
      this.refresh();
    },
    async submitTxn() {
      if (this.error[this.creditIdentifier.key]) {
        return;
      }
      this.loading = true;
      const result = await txnService.submitTxn({
        productId: this.$route.params.id,
        creditTo: {
          [this.creditIdentifier.key]: this.creditIdentifier.value,
        },
      });
      this.loading = false;

      if (result?.isError && result?.status === 400) {
        return (this.alert = result?.data?.errors[0].message);
      }

      this.success = `✅ Transaction ID ${
        result.id
      } is ${result.status.class.message.toLowerCase()}.`;
    },
  },
  async mounted() {
    this.getProductById();
  },
};
</script>

<style lang="scss" scoped>
.product {
  width: 100vw !important;
}

.product-body {
  display: flex;
  flex-direction: column;
  width: 50%;

  strong {
    padding-top: 20px;
  }
}

.product-body-container {
  display: flex;
  width: 100%;
  justify-content: center;

  div {
    width: 38%;
  }
}

.product-body-wrapper {
  display: flex;
  flex-direction: row;
}

.product-txn-form {
  width: 50%;
  text-align: left;
  position: relative;
  min-height: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .product-txn-success {
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 16px;
  }

  form {
    padding: 32px;
  }

  input[type="submit"] {
    width: 100%;
  }

  .alert {
    top: 16px;
    right: 8px;
  }
}
</style>
