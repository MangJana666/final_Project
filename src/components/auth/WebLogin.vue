<template>
  <form
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    "
    @submit.prevent="login"
  >
    <div class="card px-5 py-4" style="width: 400px">
      <div class="h2 text-start">Login to Vintage</div>
      <p class="text-start">Enter your details below</p>
      <div class="mt-3">
        <BaseInput
          type="email"
          identity="email"
          placeholder="Enter your email"
          label="Email"
          v-model="loginData.email"
        ></BaseInput>
      </div>
      <div class="mt-3">
        <BaseInput
          type="password"
          identity="password"
          placeholder="Enter your password"
          label="Password"
          v-model="loginData.password"
        ></BaseInput>
      </div>
      <BaseButton
        class="btn mt-5"
        @click="login"
        style="background-color: #0d6b6e; color: white"
        >Continue</BaseButton
      >
    </div>
  </form>
</template>

<script setup>
import { reactive } from "vue";
import BaseInput from "../ui/BaseInput.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BaseButton from "../ui/BaseButton.vue";
import Cookies from "js-cookie";

const store = useStore();
const router = useRouter();

const loginData = reactive({
  email: "",
  password: "",
  isLogin: true,
});

const login = async () => {
  await store.dispatch("auth/getLoginData", loginData);
  router.push("/");
};
</script>
