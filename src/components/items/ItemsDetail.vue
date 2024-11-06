<template>
  <div class="container d-flex mt-3">
    <div class="row me-2">
      <div class="col-auto">
        <div
          class="card image"
          style="
            width: 50rem;
            height: 100%;
            justify-content: center;
            align-items: center;
            object-fit: cover;
          "
        >
          <img
            style="
              width: fit-content;
              height: fit-content;
              justify-content: center;
            "
            :src="productDetail.image"
            alt="..."
          />
        </div>
      </div>
    </div>
    <ItemsDescription></ItemsDescription>
  </div>
  <h3 style="margin-top: 20px; margin-left: 305px">Other Product</h3>
  <div class="mt-4 me-5" style="margin-left: 35px">
    <DetailItemsTop></DetailItemsTop>
  </div>
  <div class="mt-3 me-5" style="margin-left: 35px">
    <DetailItemsBottom></DetailItemsBottom>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import ItemsDescription from "./ItemsDescription.vue";
import products from "@/store/products";
import TopCard from "./TopCard.vue";
import DetailItemsTop from "./DetailItemsTop.vue";
import DetailItemsBottom from "./DetailItemsBottom.vue";

const route = useRoute();
const store = useStore();

// const product = computed(() => {
//   return store.state.products.products;
// });

onMounted(async () => {
  await store.dispatch("products/getProductDetail", route.params.id);
});

const productDetail = computed(() => {
  return store.state.products.productDetail;
});
</script>
