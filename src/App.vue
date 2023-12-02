<template>
  <header>
    <v-toolbar color="black" title="My Shop">
      <v-btn @click="goToCartView" color="secoundry" variant="elevated">
        Items in Cart:{{ selectedProductInCart.quantity }}
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
      quantity: 0
    };
  },
  methods: {
    goToCartView() {
      this.$router.push({ name: "CartView" });
    },
  },
  computed:{
    selectedProduct() {
      return productsStore().products.find(
        (item) => item.id === Number(this.$route.params.id)
      );
    },
    selectedProductInCart() {
      const productInCart = productsStore().cart.find(
        (item) => {
          item.id === this.selectedProduct?.id
          this.quantity = item.quantity
        }
        
      );
      return productInCart || { quantity:this.quantity  }; // return an object with quantity: 0 if not found
    }
  },

  mounted() {
    console.log(this.store.cartItemsCount, 'item')
  }
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
