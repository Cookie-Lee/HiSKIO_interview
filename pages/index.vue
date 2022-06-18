<template lang="pug">
  .pt-50px
    Products
    ShoppingCart
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "IndexPage",

  mounted() {
    this.GetProducts();
  },

  methods: {
    ...mapActions("product", ["GetProducts"]),
  },
};
</script>
