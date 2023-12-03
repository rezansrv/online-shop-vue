<template>
  <div>
    <v-btn class="mb-4" color="primary" variant="elevated" v-if="store.cart.length" @click="goToCatalog">Back to catalog</v-btn>
    <div v-if="!store.cart.length" style="text-align: center">
      <h1>Empty Cart...</h1>
      <router-link to="/">Home</router-link>
    </div>

    <div class="cart-items" v-else>
      <div class="cart-item" v-for="item in store.cart" :key="item.id">
        <div class="item-details" v-if="item.quantity > 0">
          <div class="my_img">
            <img :src="item.thumbnail" alt="" class="item-image" />
          </div>
          <div class="my_text">
            <span class="item-info">Brand: {{ item.brand }}</span>
            <span class="item-info">Category: {{ item.category }}</span>
            <span class="item-info">Price: ${{ item.price }}</span>
            <span class="item-info">Quantity: {{ item.quantity }}</span>
            <div class="item-buttons">
              <button @click="incrementQuantity(item.id)"><v-icon>mdi-plus</v-icon></button>
              <button @click="decrementQuantity(item.id)"><v-icon>mdi-minus</v-icon></button>
              <button @click="removeFromCart(item.id)"><v-icon color="#f44336">mdi-delete</v-icon></button>
            </div>
          </div>
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
  align-items: center;
  margin-bottom: 16px;
  box-shadow: 0 0 17px 6px #e7e7e7;
  border-radius: 8px;
  padding: 16px;

}

.item-details img {
  width: 120px;
  height: 100px;
  border-radius: 8px;
  margin-right: 16px;
}
.item-buttons {
  display: flex;
  
}

.item-buttons button {
  color: #000000; /* Add your desired button text color */
  border: none;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
}

.item-info{
  padding-left: 10px;
}


@media screen and (max-width: 600px){
  .my_text {
  flex: 1;
}

.item-info {
  display: block;
  margin-bottom: 8px;
}

.item-buttons {
  display: flex;
}

.item-buttons button {
  color: #000000; /* Add your desired button text color */
  border: none;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
}


}
</style>
