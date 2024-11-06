<template>
  <div class="col-sm-9">
    <div class="row">
      <div class="col-10 col-sm-10">
        <div>
          <div class="card-header" style="background-color: white">
            <h5>My Order</h5>
          </div>
          <div
            class="card mt-2"
            style="border-radius: 10px"
            v-for="(transaction, index) in transactionHistory"
            :key="index"
          >
            <div class="d-flex mt-3 ms-3">
              <i class="fa-solid fa-bag-shopping"></i>
              <h6 style="margin-left: 5px">Shopping</h6>
              <p style="margin-left: 5px">{{ transaction.date }}</p>

              <p
                style="
                  background-color: #effff0;
                  color: green;
                  border-radius: 5px;
                  margin-left: 5px;
                "
              >
                Done
              </p>
              <p style="margin-left: 5px">{{ transaction.orderId }}</p>
            </div>
            <div class="d-flex ms-3" style="justify-content: space-between">
              <div class="d-flex">
                <img
                  :src="transaction.items[0].image"
                  alt=""
                  style="width: 200px"
                />
                <div>
                  <h3>{{ transaction.items[0].name }}</h3>
                  <p>
                    {{ transaction.items.length }} products x Rp{{
                      formatPrice(transaction.totalPrice)
                    }}
                  </p>
                </div>
              </div>
              <div class="d-flex me-5">
                <div
                  style="border: 1px solid; height: 70px; border-color: gray"
                ></div>
                <div class="row">
                  <div class="ms-2">
                    <p>Total Price</p>
                    <h5>Rp{{ formatPrice(transaction.totalPrice) }}</h5>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p class="ms-3">
                + {{ transaction.items.length - 1 }} more Product
              </p>
            </div>
            <div class="card-footer" style="background-color: white">
              <div class="d-flex" style="justify-content: flex-end">
                <button
                  type="button"
                  class="btn"
                  style="background-color: #009499; color: white"
                >
                  Buy Again
                </button>
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

const store = useStore();

const transactionHistory = computed(
  () => store.state.products.transactionHistory
);

const formatPrice = (price) => {
  return price.toLocaleString();
};
</script>
