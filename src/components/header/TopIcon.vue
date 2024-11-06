<template>
  <div class="d-flex" style="align-items: center; margin-left: 30px">
    <RouterLink
      to="/cart"
      class="icons1"
      @click="toggleCart"
      style="color: black; position: relative"
    >
      <i style="font-size: 25px" class="fa-solid fa-cart-shopping"></i>
      <!-- Notifikasi jumlah item di cart -->
      <span v-if="cartItemCount" class="badge">{{ cartItemCount }}</span>
    </RouterLink>

    <div class="icons2 ms-4 me-3" style="position: relative">
      <i style="font-size: 25px" class="fa-regular fa-heart"></i>
      <!-- Notifikasi jumlah like -->
      <span v-if="likedItemCount" class="badge">{{ likedItemCount }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const cartItemCount = computed(() => store.getters["products/cartItemCount"]);
const likedItemCount = computed(() => store.getters["products/likedItemCount"]);

function toggleCart() {
  showCart.value = !showCart.value;
}
</script>

<style scoped>
.badge {
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 3px 6px;
  font-size: 12px;
}
</style>

<!-- <template>
  <div class="d-flex" style="align-items: center; margin-left: 30px">
    <RouterLink
      to="/cart"
      class="icons1"
      @click="toggleCart"
      style="color: black"
    >
      <i style="font-size: 25px" class="fa-solid fa-cart-shopping"></i>
    </RouterLink>
    <div class="icons2 ms-4 me-3">
      <i style="font-size: 25px" class="fa-regular fa-heart"></i>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showCart = ref(false);
function toggleCart() {
  showCart.value = !showCart.value;
}
</script> -->
