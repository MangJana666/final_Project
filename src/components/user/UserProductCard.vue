<template>
  <div class="col-md-6 col-12 my-2">
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <div>
            <p class="mb-0">{{ product.category }}</p>
            <div class="h-50">
              <h4 class="fs-5 mb-0">{{ product.name }}</h4>
            </div>
            <slot></slot>
          </div>
          <div class="d-flex">
            <img
              :src="product.image"
              :alt="product.name"
              width="90"
              height="80"
              class="rounded"
              style="object-fit: cover"
            />
          </div>
        </div>
        <div class="d-flex justify-content-between mt-3 pt-3 border-top">
          <button
            class="btn delete-btn px-3 py-2 rounded-pill"
            @click="$emit('btnRemowe')"
          >
            {{ buttonName[0] }}
          </button>
          <button
            class="btn edit-btn px-3 py-2 rounded-pill"
            @click="$emit('btnEdit')"
          >
            {{ buttonName[1] }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { watch } from "vue";

const store = useStore();
const productList = ref();
const productListStatus = ref(false);

defineProps({
  product: { type: Object, require: true },
  buttonName: { type: Array, require: true },
});

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
