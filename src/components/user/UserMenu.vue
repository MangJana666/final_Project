<template>
  <div class="col-sm-3">
    <h2>Settings</h2>
    <div style="margin-top: 50px">
      <ul type="none" @click="menuClicked('profile-details')">
        <i class="fa-regular fa-user"></i
        ><a style="text-decoration: none"> Profile Details</a>
      </ul>
      <ul type="none" @click="menuClicked('change-password')">
        <i class="fa-regular fa-pen-to-square"></i
        ><a style="text-decoration: none"> Change Password</a>
      </ul>
      <ul type="none" @click="menuClicked('transaction-history')">
        <i class="fa-solid fa-layer-group"></i>
        <a style="text-decoration: none"> Transaction History</a>
      </ul>
      <ul type="none" @click="menuClicked('user-product')">
        <i class="fa-solid fa-shop"></i
        ><a style="text-decoration: none"> User Product</a>
      </ul>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["changeComponent"]);

const menuClicked = (option) => {
  emit("changeComponent", option);
};
</script>
