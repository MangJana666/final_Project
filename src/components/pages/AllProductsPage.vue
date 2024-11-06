<template>
  <div class="container">
    <h1>Items</h1>
    <hr />
    <a
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#staticBackdrop"
      aria-controls="staticBackdrop"
      style="text-decoration: none; color: black; font-size: 15px"
      href=""
      >Filter<i
        class="fa-solid fa-sliders"
        style="font-size: 15px; margin-left: 10px"
      ></i
    ></a>
  </div>
  <div class="container mt-1 d-flex justify-content-center">
    <div class="cardAll mt-2">
      <div class="d-flex flex-wrap justify-content-start">
        <RouterLink
          :to="`/items/${product.id}`"
          class="card new-card text-black text-decoration-none"
          v-for="(product, index) in products"
          :key="index"
        >
          <img
            :src="product.image"
            class="card-img-top"
            style="width: 100%; object-fit: cover; height: 15rem"
          />
          <div class="card-body">
            <h5 class="card-title">Rp {{ product.price }}</h5>
            <p class="card-text">{{ product.name }}</p>
            <div class="btm d-flex justify-content-between">
              <p>{{ product.size }}</p>
              <i class="fa-regular fa-heart" style="margin-top: 3px"></i>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>

  <!-- modal -->
  <div
    class="offcanvas offcanvas-start"
    data-bs-backdrop="static"
    tabindex="-1"
    id="staticBackdrop"
    aria-labelledby="staticBackdropLabel"
    style="width: 30%"
  >
    <div class="offcanvas-header">
      <h4 class="offcanvas-title" id="staticBackdropLabel">Filter</h4>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="row">
        <h6>Sort By Price</h6>
        <div class="d-flex mt-2">
          <button type="button" class="btn btn-outline-secondary">
            Ascending
          </button>
          <button type="button" class="btn btn-outline-secondary ms-2">
            Descending
          </button>
        </div>
      </div>
      <div class="row mt-4">
        <h6>Price range</h6>
        <div class="d-flex">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Rp</span>
            <input
              type="number"
              class="form-control"
              placeholder="Price"
              aria-label="Price"
              aria-describedby="basic-addon1"
            />
          </div>
          <div class="input-group mb-3 ms-2">
            <span class="input-group-text" id="basic-addon1">Rp</span>
            <input
              type="number"
              class="form-control"
              placeholder="Price"
              aria-label="Price"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div class="d-flex">
          <button type="button" class="btn btn-outline-secondary">
            Rp. 50,000 - Rp. 100,000
          </button>
          <button type="button" class="btn btn-outline-secondary ms-2">
            Rp. 100,000 - 200,000
          </button>
          <button type="button" class="btn btn-outline-secondary ms-2">
            Rp. 200,000 - 500,000
          </button>
        </div>
        <h6 class="mt-4">Product Size</h6>
        <div class="d-flex">
          <button type="button" class="btn btn-outline-secondary ms-2">
            S
          </button>
          <button type="button" class="btn btn-outline-secondary ms-2">
            M
          </button>
          <button type="button" class="btn btn-outline-secondary ms-2">
            XL
          </button>
          <button type="button" class="btn btn-outline-secondary ms-2">
            XXL
          </button>
          <button type="button" class="btn btn-outline-secondary ms-2">
            XXXL
          </button>
          <button type="button" class="btn btn-outline-secondary ms-2">
            XML
          </button>
        </div>
      </div>
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

<style>
.cardAll {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.new-card {
  margin: 10px;
  min-width: 10rem;
  max-width: 12rem;
  overflow: hidden;
  flex: 1 1 auto;
  border: none;
  background-color: transparent;
}
</style>
