<template>
  <div class="img-top container-fluid">
    <div class="card w-45" style="width: 25rem; height: 13rem">
      <div class="card-body align-item-center" style="justify-content: center">
        <h2 class="card-title">Ready to Decluter <br />yout Closet</h2>
        <a
          href="#"
          class="btn mt-5"
          style="width: 100%; background-color: #0d6b6e; color: white"
          >Go Somewhere</a
        >
      </div>
    </div>
  </div>
  <div class="topText container d-flex mt-5">
    <div class="col-11">
      <h2>Popular Items</h2>
    </div>
    <div class="textSee col-1 row">
      <h6><RouterLink to="/allproduct" href="">See All</RouterLink></h6>
    </div>
  </div>
  <div class="container-fluid">
    <ItemsCard :products="productList" v-if="productListStatus"></ItemsCard>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import ItemsCard from "../items/ItemsCard.vue";

const store = useStore();
const productListStatus = ref(false);
const productList = ref([]);

onMounted(async () => {
  try {
    await store.dispatch("products/getProductData");
    productListStatus.value = true;
    productList.value = store.state.products.product;
  } catch (error) {
    console.log(error);
  }
});
</script>
