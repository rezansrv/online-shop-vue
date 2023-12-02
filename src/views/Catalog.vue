<template>
  <div class="products-list">
    <v-row no-gutters ccolor="primary"> 
      <v-col color="primary"
        v-for="product in store.products"
        :key="product.id"
        cols="12"
        sm="4"
        @click="goToProductPage(product.id)"
      >
        <product-item :product-data="product" @item-clicked="goToProductPage" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import { productsStore } from "@/stores/products";

export default {
  name: "CatalogView",
  components: {
    ProductItem,
  },
  data() {
    return {
      store: productsStore(),
    };
  },
  methods: {
    goToProductPage(id) {
      this.$router.push({ name: "ProductView", params: { id } });
    },
    async fetchProducts() {
      await this.store.fetchProductsFromDB();
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.products-list{
  background-color: rgb(0, 0, 0);
  margin-inline: -10px;
}

</style>