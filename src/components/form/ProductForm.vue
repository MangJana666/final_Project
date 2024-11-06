<template>
  <ul class="list-group">
    <ProductFormBody :isEdit="isEdit"></ProductFormBody>
  </ul>
</template>

<script setup>
import ProductFormBody from "./ProductFormBody.vue";

const props = defineProps({
  isEdit: { type: Boolean, default: false },
});
</script>
