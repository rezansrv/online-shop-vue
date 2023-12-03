<template>
  <div>
    <v-btn @click="goToCatalog" color="primary" variant="elevated">
      Back to catalog
    </v-btn>

    <div class="product" v-if="selectedProduct">
      <div class="product-image">
        <img :src="selectedProduct.thumbnail" alt="" />
      </div>
      <div class="product-details">
        <p>Brand: {{ selectedProduct.brand }}</p>
        <p class="product-description">Description: {{ selectedProduct.description }}</p>
        <h2>Price: ${{ selectedProduct.price }}</h2>
        <div class="button-container">
          <v-btn
            variant="elevated"
            :style="{ backgroundColor: '#3f51b5', marginRight: '8px', color: 'white' }"
            @click="addToCart"
          >
            Add to cart
          </v-btn>
          <v-btn
            v-if="selectedProductInCart.quantity > 0"
            variant="elevated"
            :style="{ backgroundColor: '#f44336', marginRight: '8px', color: 'white' }"
            @click="removeFromCart"
          >
          <v-icon>mdi-delete</v-icon>
          </v-btn>
          <div v-if="selectedProductInCart.quantity > 0" class="quantity-control">
            <v-btn icon @click="decrementQuantity" class="mr-2"><v-icon>mdi-minus</v-icon></v-btn>
            <span>{{ selectedProductInCart.quantity }}</span>
            <v-btn icon @click="incrementQuantity" class="ml-2"><v-icon>mdi-plus</v-icon></v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { productsStore } from "@/stores/products";
import "vue-material-design-icons/styles.css";
import '@mdi/font/css/materialdesignicons.css'

export default {
  name: "ProductDetails",
  methods: {
    goToCatalog() {
      this.$router.push({ name: "Catalog" });
    },
    addToCart() {
      const selectedProduct = this.selectedProduct;
      if (selectedProduct) {
        productsStore().addToCart(selectedProduct);
      }
    },
    removeFromCart() {
      const selectedProductId = this.selectedProduct.id;
      if (selectedProductId) {
        productsStore().removeFromCart(selectedProductId);
      }
    },
    incrementQuantity() {
      const selectedProductId = this.selectedProduct.id;
      if (selectedProductId) {
        productsStore().incrementProductQuantity(selectedProductId);
      }
    },
    decrementQuantity() {
      const selectedProductId = this.selectedProduct.id;
      if (selectedProductId) {
        productsStore().decrementProductQuantity(selectedProductId);
      }
    },
  },
  computed: {
    selectedProduct() {
      return productsStore().products.find(
        (item) => item.id === Number(this.$route.params.id)
      );
    },
    selectedProductInCart() {
      const productInCart = productsStore().cart.find(
        (item) => item.id === this.selectedProduct?.id
      );
      return productInCart || { quantity: 0 }; // return an object with quantity: 0 if not found
    },
  },
};
</script>

<style scoped>
.product {
  max-width: 800px;
  margin: auto;
  padding: 18px;
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.product-container {
  display: flex;
}

.product-image img {
  max-width: 100%;
  height: auto;
}

.product-details {
  flex: 1;
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.quantity-control{
  margin-top: 10px;
}


.product-description {
  margin-top: 16px;
  color: #616161;
}

@media screen and (max-width: 600px) {
  .product-container {
    flex-direction: column;
  }

  .product-image {
    margin-right: 0;
    margin-bottom: 16px;
  }
  .quantity-control {
  margin-top: 6px;
}
}
</style>