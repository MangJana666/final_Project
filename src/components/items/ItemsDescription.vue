<template>
  <div class="card box-2 ms-2">
    <div class="card-body box-inner-2">
      <div class="card-body box-inner-2">
        <div>
          <h3 class="fw-bold">Rp. {{ productDetail.price }}</h3>
          <p class="dis mb-3">{{ productDetail.name }}</p>
        </div>
        <div class="row">
          <div class="col-2">
            <p style="color: gray">8 / M</p>
          </div>
          <div class="col-4">
            <ul style="color: gray">
              <li>Very Good</li>
            </ul>
          </div>
          <div class="col-4">
            <ul style="color: gray">
              <li>Denpasar</li>
            </ul>
          </div>
        </div>
        <hr />
        <div class="mb-3">
          <p class="dis mb-2" style="color: gray">Item Description</p>
          <p class="dis">
            {{ productDetail.description }}
          </p>
        </div>
        <div class="row d-flex mt-2" id="cardP">
          <div class="col-6">
            <h6 class="leftT">Category</h6>
          </div>
          <div class="col-6">
            <p>{{ productDetail.category }}</p>
          </div>
        </div>
        <div class="row d-flex mt-2" id="cardP">
          <div class="col-6">
            <h6 class="leftT">Size</h6>
          </div>
          <div class="col-6">
            <p>{{ productDetail.size }}</p>
          </div>
        </div>
        <div class="row d-flex mt-2" id="cardP">
          <div class="col-6">
            <h6 class="leftT">Condition</h6>
          </div>
          <div class="col-6">
            <p>Very Good</p>
          </div>
        </div>
        <div class="row d-flex mt-2" id="cardP">
          <div class="col-6">
            <h6 class="leftT">Color</h6>
          </div>
          <div class="col-6">
            <p>{{ productDetail.color }}</p>
          </div>
        </div>
        <div class="row d-flex mt-2" id="cardP">
          <div class="col-6">
            <h6 class="leftT">Uploaded</h6>
          </div>
          <div class="col-6">
            <p>5 hours ago</p>
          </div>
        </div>
        <div class="row d-flex mt-2" id="cardP">
          <div class="col-6">
            <h6 class="leftT">Shipping</h6>
          </div>
          <div class="col-6">
            <p>Rp. {{ productDetail.shipping }}</p>
          </div>
        </div>
        <hr />
        <div class="d-flex flex-column gap-2">
          <a
            href="#"
            class="btn active"
            role="button"
            aria-pressed="true"
            style="background-color: #0d6b6e; color: white"
            >Buy Now</a
          >
          <a
            href="#"
            class="btn btn-outline-success"
            role="button"
            aria-pressed="true"
            @click="addToCart(productDetail)"
            >Add to Cart</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  products: Object,
});

import { computed, reactive } from "vue";
import { useStore } from "vuex";

const store = useStore();

const productDetail = computed(() => {
  console.log(store.state.products.productDetail);
  return store.state.products.productDetail;
});

function addToCart(product) {
  store.dispatch("products/addToCart", product);
}
console.log(productDetail);
</script>
