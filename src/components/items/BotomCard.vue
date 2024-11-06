<template>
  <div class="topText container d-flex mt-5">
    <div class="col-11">
      <h2>New Product</h2>
    </div>
    <div class="textSee col-1 row">
      <h6><a href="">See All</a></h6>
    </div>
  </div>
  <div
    class="cardCont container d-flex row-col-auto h-100 mt-2"
    style="justify-content: space-between"
  >
    <RouterLink
      :to="`/items/${product.id}`"
      class="card text-black"
      style="
        width: 17rem;
        text-decoration: none;
        margin-left: 10px;
        border: none;
        background-color: transparent;
      "
      v-for="(product, index) in products.splice(0, 5)"
      :key="index"
      id="products"
    >
      <img
        :src="product?.image"
        class="card-img-top"
        alt="..."
        style="height: 14rem"
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
    <div
      class="cSee card"
      style="width: 17rem; background-color: aliceblue; margin-left: 5px"
    >
      <h5>
        <a href="">See All <br />Product</a>
      </h5>
    </div>
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
