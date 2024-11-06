<script setup>
import ProductForm from "../form/ProductForm.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { watch } from "vue";
defineProps({
  isEdit: { type: Boolean, default: false },
});

const store = useStore();
const route = useRoute();
const detailData = ref();
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  try {
    await store.dispatch("products/getProductDetail", route.params.id);
    detailData.value = store.state.products.productDetail;
  } catch (error) {
    console.log(error);
  }
  isLoading.value = false;
});

watch(
  () => store.state.products.productDetail,
  (newData) => {
    detailData.value = newData;
  }
);
</script>

<template>
  <main>
    .
    <div class="container-md my5 py-5">
      <ProductForm v-if="detailData && !isLoading" :isEdit="true"></ProductForm>
    </div>
  </main>
</template>
