<template>
  <v-sheet class="ma-2 pa-2">
    <v-card
      class="product"
      style="max-width: 350px; display: flex; flex-direction: column"
    >
      <img :src="productData.thumbnail" class="my-image" cover />
      <v-card-title class="text-h6">{{ productData.brand }}</v-card-title>

      <v-card-subtitle class="mb-2"> $ {{ productData.price }} </v-card-subtitle>

      <v-card-text class="mb-4">
        {{ productData.description }}
      </v-card-text>

      <v-card-actions style="margin-top: auto">
        <v-card-actions style="margin-top: auto; text-align: center">
          <v-btn @click="goToProductPage(productData.id)" color="primary">
            More details
          </v-btn>
        </v-card-actions>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script>
export default {
  props: {
    productData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToProductPage(productId) {
      this.$emit("item-clicked", productId);
    },
  },
};
</script>

<style scoped>
.product {
  max-width: 300px;
  min-height: 500px;
  margin: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.product:hover {
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.3);
}

.my-image {
  border-radius: 10px;
  height: 29vh;
  width: 100%;
}

v-card-title {
  font-weight: bold;
}

v-card-subtitle {
  color: #757575;
}

v-card-text {
  color: #616161;
}

v-card-actions {
  margin-top: auto;
}

v-btn {
  text-transform: none;
}
</style>
