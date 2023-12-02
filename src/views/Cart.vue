<template>
  <div>
    <button v-if="store.cart.length" @click="goToCatalog">Back to catalog</button>
    <div v-if="!store.cart.length" style="text-align: center">
      <h1>Empty Cart...</h1>
      <router-link to="/">Home</router-link>
    </div>

    <div class="cart-items" v-else>
      <div  class="cart-item" v-for="item in store.cart" :key="item.id">
        <div class="item-details" v-if="item.quantity > 0" >
          <img :src="item.thumbnail" alt="">
          <span>Brand: {{ item.brand }}</span>
          <span>Category: {{ item.category }}</span>
          <span>Price: ${{ item.price }}</span>
          <span>Quantity: {{ item.quantity }}</span>
          <button @click="incrementQuantity(item.id)">+</button>
          <button @click="decrementQuantity(item.id)">-</button>
          <button @click="removeFromCart(item.id)">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { productsStore } from "@/stores/products";

export default {
  name: 'CartView',
  setup() {
    const store = productsStore();
    const router = useRouter();

    const goToCatalog = () => {
      router.push({ name: 'Catalog' });
    };

    return {
      store,
      goToCatalog,
    };
  },
  methods: {
    removeFromCart(id) {
      this.store.removeFromCart(id);
    },
    incrementQuantity(id) {
      console.log('hi')
      this.store.incrementProductQuantity(id);
    },
    decrementQuantity(id) {

      this.store.decrementProductQuantity(id);

    },
  },
};
</script>

<style scoped>
.item-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  box-shadow: 0 0 17px 6px #e7e7e7;
  border-radius: 8px;
  padding: 16px;
}

.item-details img {
  width: 20%;
}
</style>
