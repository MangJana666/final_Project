<template>
  <div
    class="cardCont container d-flex row-col-auto h-100"
    style="justify-content: flex-start"
  >
    <RouterLink
      :to="`/items/${product.id}`"
      class="card text-black"
      style="
        width: 12rem;
        text-decoration: none;
        margin-left: 5px;
        border: none;
        background-color: transparent;
      "
      v-for="(product, index) in products.splice(0, 4)"
      :key="index"
      id="products"
    >
      <img
        :src="product?.image"
        class="card-img-top"
        alt="..."
        style="height: 12rem"
      />
      <div class="card-body">
        <h5>Rp.{{ product.price }}</h5>
        <p class="card-text">{{ product.name }}</p>
        <div class="btm d-flex justify-content-between">
          <p>{{ product.size }}</p>
          <i class="fa-regular fa-heart" style="margin-top: 3px"></i>
        </div>
      </div>
    </RouterLink>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const products = computed(() => {
  return store.state.products.product;
});
</script>
