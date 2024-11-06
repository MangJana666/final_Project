<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import ChangePassword from "../user/ChangePassword.vue";
import ProfileDetails from "../user/ProfileDetails.vue";
import UserMenu from "../user/UserMenu.vue";
import UserProduct from "../user/UserProduct.vue";
import TransactionHistory from "../user/TransactionHistory.vue";

const route = useRoute();

const component = {
  "profile-details": ProfileDetails,
  "change-password": ChangePassword,
  "user-product": UserProduct,
  "transaction-history": TransactionHistory,
};

const getRoute = computed(() => {
  return route.params.component;
});
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <UserMenu @changeComponent="$router.push($event)"></UserMenu>
      <component :is="component[getRoute]"></component>
    </div>
  </div>
</template>
