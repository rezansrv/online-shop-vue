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
        <p>Description: {{ selectedProduct.description }}</p>
        <h2>Price: ${{ selectedProduct.price }}</h2>
        <div>
          <v-btn
            variant="elevated"
            :style="{ backgroundColor: '#3f51b5', marginRight: '8px' }"
            @click="addToCart"
          >
            Add to cart
          </v-btn>
          <v-btn
            v-if="selectedProductInCart"
            variant="elevated"
            :style="{ backgroundColor: '#f44336', marginRight: '8px' }"
            @click="removeFromCart"
          >
            Remove from cart
          </v-btn>
  <!-- ... Your existing code ... -->

  <div v-if="selectedProductInCart.quantity >0" class="quantity-control">
  <v-btn icon @click="decrementQuantity" class="mr-2"> <!-- Adding margin-right class -->
    -
  </v-btn>
  <span>{{ selectedProductInCart.quantity }}</span>
  <v-btn icon @click="incrementQuantity" class="ml-2"> <!-- Adding margin-left class -->
    +
  </v-btn>
</div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { productsStore } from "@/stores/products";
import 'vue-material-design-icons/styles.css';
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
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to the next line on small screens */
  margin-top: 50px;
}

.product-image {
  margin-right: 24px;
  flex: 1 1 300px; /* Set a flexible width for better responsiveness */
}

.product-details {
  flex: 1 1 calc(100% - 300px); /* Take remaining width on large screens, full width on small screens */
}

.quantity-control {
  margin-top: 10px;
  display: flex;
  align-items: center;
}



@media only screen and (max-width: 600px) {
  /* Adjust styles for small screens */
  .product {
    flex-direction: column; /* Stack items vertically on small screens */
  }

  .product-details {
    flex: 1 1 100%; /* Full width on small screens */
  }
}
</style>
