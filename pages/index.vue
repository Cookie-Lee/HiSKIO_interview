<template lang="pug">
  .pt-50px
    ShoppingCart
    Products
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
