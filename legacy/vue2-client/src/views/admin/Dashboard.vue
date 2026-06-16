<template>
  <div>
    <div class="banner-announcement">Our Balances</div>
    <div class="admin-dashboard">
      <div class="admin-dashboard-data card">
        <strong>Available</strong>
        <p>{{ balances?.available }} {{ balances?.unit }}</p>
      </div>
      <div class="admin-dashboard-data card">
        <strong>Credit Limit</strong>
        <p>{{ balances?.credit_limit }}</p>
      </div>
      <div class="admin-dashboard-data card">
        <strong>Holding</strong>
        <p>{{ balances?.holding }} {{ balances?.unit }}</p>
      </div>
    </div>
    <div v-if="!transactions.loading" class="banner-announcement">
      Our Transactions
    </div>
    <div v-else class="banner-announcement">Transactions Loading...</div>
    <table v-if="!!transactions.data.length">
      <tr>
        <th>ID</th>
        <th>Product ID</th>
        <th>Credit Type</th>
        <th>Credit to</th>
        <th>Prices</th>
        <th>Benefits</th>
        <th>Status</th>
        <th>Date</th>
      </tr>
      <tr v-for="txn in transactions.data" :key="txn.id">
        <template v-if="txn === `SKELETON`">
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </template>
        <template v-else>
          <td>{{ txn.id }}</td>
          <td>
            <router-link :to="{ path: `/admin/products/${txn.product.id}` }">{{
              txn.product.id
            }}</router-link>
          </td>
          <td>
            {{
              txn.hasCreditParty
                ? CREDIT_TYPES[txn.credit_party_identifier.key]
                : "N.A"
            }}
          </td>
          <td>
            {{ txn.hasCreditParty ? txn.credit_party_identifier.value : "N.A" }}
          </td>
          <td>{{ txn.prices }}</td>
          <td>{{ txn.benefits }}</td>
          <td>{{ txn.status }}</td>
          <td>{{ new Date(txn.creation_date).toDateString() }}</td>
        </template>
      </tr>
    </table>
  </div>
</template>

<script>
import adminService from "@/services/admin-service";
import sortBy from "lodash/sortBy";
import CREDIT_TYPES from "@/constants/CREDIT_TYPES";

export default {
  data() {
    return {
      balances: {},
      transactions: {
        loading: true,
        data: [
          `SKELETON`,
          `SKELETON`,
          `SKELETON`,
          `SKELETON`,
          `SKELETON`,
          `SKELETON`,
          `SKELETON`,
          `SKELETON`,
        ],
      },
      CREDIT_TYPES,
    };
  },
  methods: {
    mapBenefits(benefits) {
      if (!Array.isArray(benefits)) {
        return "N.A";
      }

      return benefits
        .map(
          (benefit) => `${benefit.amount.total_including_tax} ${benefit.unit}`
        )
        .join(",");
    },
    mapTxn(txnList) {
      return txnList.map((txn) => {
        const hasCreditParty = txn.credit_party_identifier;
        const creditIdentifier = hasCreditParty
          ? Object.keys(txn.credit_party_identifier)[0]
          : "N.A";
        const prices = `${txn.prices.wholesale.amount} ${txn.prices.wholesale.unit}`;
        const benefits = this.mapBenefits(txn.benefits);

        return {
          ...txn,
          prices,
          benefits,
          status: txn.status.class.message,
          hasCreditParty,
          credit_party_identifier: {
            key: hasCreditParty ? creditIdentifier : "N.A",
            value: hasCreditParty
              ? txn.credit_party_identifier[creditIdentifier]
              : "N.A",
          },
        };
      });
    },
    async getBalances() {
      const result = await adminService.getBalances();
      this.balances = result[0];
    },
    async getTxnList() {
      const result = await adminService.getTxnList();
      const mappedResult = this.mapTxn(result);
      this.transactions.data = sortBy(mappedResult, "id");
      this.transactions.loading = false;
    },
  },
  async mounted() {
    await Promise.all(this.getBalances(), this.getTxnList());
  },
};
</script>

<style lang="scss" scoped>
.admin-dashboard {
  display: flex;
  justify-content: center;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-top: 32px;
  margin-bottom: 32px;

  tr {
    td,
    th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }

    th {
      background: var(--primary-color);
      color: white;
    }
  }

  tr:nth-child(even) {
    background: whitesmoke;
  }
}

.admin-dashboard-data {
  display: flex;
  flex-direction: column;
  padding: 0px;

  strong {
    background: var(--secondary-color);
    color: white;
    padding: 24px;
    font-size: 20px;
  }

  p {
    padding: 24px;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
