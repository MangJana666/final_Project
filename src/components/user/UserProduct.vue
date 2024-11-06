<template>
  <ul class="col-8 list-group">
    <li class="list-group-item">
      <div
        class="d-flex flex-sm-row flex-column justify-content-between align-items-sm-center"
      >
        <div class="mb-3 mb-sm-0">
          <p class="my-0 fs-4 fw-semibold">My Product</p>
          <p class="my-0 text-secondary">Add your original product here</p>
        </div>
        <div>
          <RouterLink
            to="/new-product"
            class="btn add-btn px-3 py-2 rounded-pill"
          >
            <i class="fa-solid fa-circle-plus pe-2"></i>Add Product
          </RouterLink>
        </div>
      </div>
    </li>
    <li class="list-group-item">
      <p class="mt-2 mb-4 fs-5 fw-semibold">Product List</p>
      <div class="row">
        <UserProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          :buttonName="['Delete', 'Edit']"
          @btnRemowe="deleteProduct(product.id)"
          @btnEdit="editProduct(product.id)"
        >
          <p>{{ new Date(product.createdAt).toDateString() }}</p>
        </UserProductCard>
      </div>
    </li>
  </ul>
</template>

<script setup>
import UserProductCard from "./UserProductCard.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { watch } from "vue";

const store = useStore();
const router = useRouter();

const products = ref([]);

const loadProducts = () => {
  const allProducts = store.state.products.products;
  const userId = store.state.auth.userLogin.userId;
  products.value = allProducts.filter((product) => product.userId === userId);
};

loadProducts();

const deleteProduct = async (id) => {
  try {
    await store.dispatch("products/deleteProduct", id);
    products.value = products.value.filter((product) => product.id !== id);
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

const editProduct = (id) => {
  router.push({ name: "editProductPage", params: { id } });
};
</script>
