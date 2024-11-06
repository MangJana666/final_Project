<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8 mt-5">
        <div class="card mb-4 p-3" v-for="item in checkoutCart" :key="item.id">
          <h5 class="fw-bold mb-3">Order</h5>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="d-flex">
              <div class="col-3">
                <img
                  :src="item.image"
                  alt="Product Image"
                  style="width: 100%; border-radius: 5px; height: 100%"
                />
              </div>
              <div class="ms-3">
                <h6 class="mb-1">{{ item.name }}</h6>
                <p class="mb-1">{{ item.size }}</p>
                <h6 class="fw-bold">Rp{{ formatPrice(item.price) }}</h6>
              </div>
            </div>
            <h6 class="fw-bold">x{{ item.qty }}</h6>
          </div>
        </div>
        <div class="card mb-4 p-3">
          <p class="fw-bold mb-2">Address</p>
          <div class="d-flex align-items-center">
            <i class="fa-solid fa-location-dot me-3"></i>
            <div>
              <h6>PT. Timedoor Indonesia</h6>
              <p>
                Jl. Tukad Yeh Aya IX No.46, Renon, Denpasar Selatan, Kota
                Denpasar, Bali 80226
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-4 mt-5">
        <div class="card p-3">
          <h5 class="fw-bold mb-3">Order Summary</h5>
          <div class="d-flex justify-content-between">
            <p>{{ checkoutCart.length }} items</p>
            <p class="text-muted">Not include shipping fee</p>
          </div>
          <hr />
          <div class="d-flex justify-content-between mb-3">
            <h5>Total</h5>
            <h5>Rp{{ formatPrice(totalPrice) }}</h5>
          </div>
          <button type="button" class="btn btn-success w-100" @click="orderNow">
            Order Now
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
const checkoutCart = computed(() => store.getters["products/checkoutCart"]);
const totalPrice = computed(() => store.getters["products/cartTotalPrice"]);

function formatPrice(value) {
  return value.toLocaleString("id-ID");
}

function orderNow() {
  store.dispatch("products/checkout");
}
</script>
