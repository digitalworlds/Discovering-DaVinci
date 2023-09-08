<template>
  <div class="ledger-container">
    <div class="ledger-wrapper">
      <ledger-entry v-for="(transaction, index) in sortedTransactions" :key="index" :transaction="transaction"/>
    </div>
  </div>
</template>

<script>
import LedgerEntry from "./ledger-entry";
import { mapActions } from "vuex";

const bodyScrollLock = require('body-scroll-lock')

export default {
  name: "LedgerView",
  components: {
    LedgerEntry
  },
  data() {
    return {
      transactions: []
    };
  },
  async created() {
    this.transactions = await this.getTransactions();
  },
  mounted() {
    bodyScrollLock.disableBodyScroll(this.$el);
  },
  computed: {
    sortedTransactions() {
      return this.transactions.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
  },
  methods: {
    ...mapActions(["getTransactions"])
  }
};
</script>

<style scoped>
.ledger-container {
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;

  height: calc(var(--inner-height) * (1270 / 1920));
  width: 100%;

  overflow-y: scroll;
}

.ledger-wrapper {
  margin: 20px 10px 0px 10px;
  padding-bottom: 25%;
}
</style>
