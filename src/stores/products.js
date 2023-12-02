import { defineStore } from 'pinia'

export const productsStore = defineStore('products', {
  state: () => ({
    products: [],
    cart: [],
  }),
  getters: {
    cartItemsCount: (state) => {
      return state.cart.reduce((count, item) => count + item.quantity, 0);
    },
  },
  
  actions: {
    fetchProductsFromDB() {
      fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(json => {
          this.products = json.products.map(product => ({ ...product, quantity: 0 }));
        });
    },

    addToCart(product) {
      const existingProduct = this.cart.find(item => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },

    removeFromCart(id) {
      console.log("removeMotodIscall")
      this.cart = this.cart.filter((item) => item.id !== id);
      const product = this.cart.find((item) => item.id === id);
      console.log(this.cart)
      if (product) {

        console.log("shoud be zerooo",product.quantity)

        product.quantity= 0;
      }
    },

    incrementProductQuantity(id) {
      console.log('Incrementing quantity in store', id);
      const product = this.cart.find((item) => item.id === id);
      if (product) {
        product.quantity += 1;
      }
      console.log(product.quantity)
    },
    
    decrementProductQuantity(id) {
      console.log('Decrementing quantity in store', id);
      const product = this.cart.find((item) => item.id === id);
      if (product && product.quantity > 0) {
        product.quantity -= 1;
      }
      console.log(product.quantity)
    },
  },
});
