<template>
  <header>
    <v-toolbar color="black" title="My Shop">
      <v-btn @click="goToCartView" color="secoundry" variant="elevated">
        Items in Cart: {{ store.cartItemsCount }}
      </v-btn>
    </v-toolbar>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script>
import { productsStore } from "@/stores/products";
export default {
  data() {
    return {
      store: productsStore(),
    };
  },
  methods: {
    goToCartView() {
      this.$router.push({ name: "CartView" });
    },
  },
  computed: {
    selectedProductInCart() {
      return this.store.cartItemsCount;
    },
  },
};
</script>

<style scoped>

.cart-items {
  text-align: end;
  padding: 16px;
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
}
</style>
