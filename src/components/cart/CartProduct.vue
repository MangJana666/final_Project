<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8 mt-4" v-if="cart.length">
        <div class="d-flex" style="justify-content: space-between">
          <h4>Cart</h4>
          <h5>{{ cart.length }} Items</h5>
        </div>
        <hr />
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <div class="d-flex">
            <div class="col-4">
              <img :src="item.image" alt="" style="width: 200px" />
            </div>
            <div class="col-4">
              <p>{{ item.name }}</p>
              <p style="font-size: 13px">{{ item.size }}</p>
              <h6 style="margin-top: 70px">
                Rp{{ formatPrice(item.price * item.qty) }}
              </h6>
            </div>
          </div>
          <div class="d-flex" style="justify-content: space-between">
            <button
              @click="removeItem(item.id)"
              style="border: none; background-color: white; color: red"
            >
              Remove
            </button>
            <div class="d-flex">
              <button
                @click="increaseQty(item)"
                style="border: 0; margin-right: 5px; background-color: white"
              >
                +
              </button>
              <input
                type="text"
                :value="item.qty"
                readonly
                style="width: 40px; text-align: center"
              />
              <button
                @click="decreaseQty(item)"
                style="border: 0; margin-left: 5px; background-color: white"
              >
                -
              </button>
            </div>
          </div>
          <hr style="height: 10px; background-color: #ededed" />
        </div>
      </div>

      <div class="col-sm-8 mt-3" v-else>
        <div class="d-flex" style="justify-content: space-between">
          <h4>Cart</h4>
          <p>No item selected</p>
        </div>
        <hr />
        <div class="text-center" style="margin: 0% 30%">
          <img
            src="https://i.pinimg.com/564x/a8/9a/24/a89a24e807dcd248c63f431dae829a37.jpg"
            alt=""
            style="width: 20rem"
          />
          <h4>Your cart is still empty</h4>
          <p>Find your favorite items and add to cart before checkout.</p>
          <button
            type="button"
            class="btn btn-outline-success"
            style="width: 100%"
          >
            Browse Items
          </button>
        </div>
        <hr />
      </div>

      <div class="col-sm-4 mt-3">
        <div class="row">
          <div class="col">
            <div class="card">
              <div class="card-body">
                <div class="d-flex" style="justify-content: space-between">
                  <h5>Order Summary</h5>
                  <h5>Rp{{ formatPrice(totalPrice) }}</h5>
                </div>
                <div class="d-flex" style="justify-content: space-between">
                  <p>{{ cart.length }} items</p>
                  <p>Not include shipping fee</p>
                </div>
                <hr />
                <div>
                  <BaseButton
                    type="button"
                    class="btn btn-outline-success"
                    style="width: 100%"
                    @click="Checkout"
                  >
                    Checkout
                  </BaseButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import BaseButton from "../ui/BaseButton.vue";
import { useRouter } from "vue-router";

const store = useStore();
const cart = computed(() => store.state.products.cart);
const router = useRouter();

function formatPrice(value) {
  return value.toLocaleString("id-ID");
}

const totalPrice = computed(() =>
  cart.value.reduce((total, item) => total + item.price * item.qty, 0)
);

function increaseQty(item) {
  store.dispatch("products/updateQty", {
    productId: item.id,
    qty: item.qty + 1,
  });
}

function decreaseQty(item) {
  if (item.qty > 1) {
    store.dispatch("products/updateQty", {
      productId: item.id,
      qty: item.qty - 1,
    });
  } else {
    removeItem(item.id);
  }
}

function removeItem(productId) {
  store.dispatch("products/removeFromCart", productId);
}

function Checkout() {
  router.push({ name: "Checkout" });
}
</script>

<style scoped>
.cart-item {
  margin-bottom: 20px;
}
</style>
