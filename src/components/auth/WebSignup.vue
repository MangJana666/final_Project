<template>
  <form
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    "
    @submit.prevent="register"
  >
    <div class="card px-5 py-4" style="width: 600px">
      <div class="h4 text-start">Sign Up</div>
      <p class="text-start">Enter your details below</p>
      <div class="mt-3">
        <BaseInput
          type="text"
          identity="fullname"
          placeholder="Enter your fullname"
          label="Full name"
          v-model="signupData.fullname"
        ></BaseInput>
      </div>
      <div class="mt-3">
        <BaseInput
          type="text"
          identity="username"
          placeholder="Enter your username"
          label="Username"
          v-model="signupData.username"
        ></BaseInput>
      </div>
      <div class="mt-3">
        <BaseInput
          type="email"
          identity="email"
          placeholder="Enter your email"
          label="Email"
          v-model="signupData.email"
        ></BaseInput>
      </div>
      <div class="mt-3">
        <BaseInput
          type="password"
          identity="password"
          placeholder="Enter your password"
          label="Password"
          v-model="signupData.password"
          @keyInput="passwordCheck"
        ></BaseInput>
        <p
          class="text-danger mt-1 fw-medium"
          style="font-size: 11px"
          :style="{ display: passwordStatusDisplay }"
        >
          The password field must be at least 8 characters
        </p>
      </div>
      <div class="mt-3">
        <BaseInput
          type="password"
          identity="confirmationPassword"
          placeholder="Enter your password"
          label="Confirmation Password"
          v-model="signupData.confirmationPassword"
          @keyInput="confirmationPasswordCheck"
        ></BaseInput>
        <p
          class="text-danger mt-1 fw-medium"
          style="font-size: 11px"
          :style="{ display: confirmPasswordDoesNotMatch }"
        >
          The password confirmation does not match
        </p>
        <p
          class="text-success mt-1 fw-medium"
          style="font-size: 11px"
          :style="{ display: confirmPasswordMatch }"
        >
          The password confirmation does match
        </p>
      </div>
      <div class="d-flex mt-4">
        <input
          type="checkbox"
          class="mt-2 ms-2"
          style="align-self: flex-start"
        />
        <label for="" class="ms-3">
          By clicking sign up, I hereby agree and consent to Term & Conditions;
          I confirm that I have read Privacy policy.
        </label>
      </div>
      <BaseButton
        class="btn mt-3"
        data-bs-toggle="modal"
        data-bs-target="#registerModal"
        @click="register"
        style="background-color: #0d6b6e; color: white"
        >Sign Up</BaseButton
      >
    </div>
  </form>

  <!-- modal -->
  <div
    v-if="isRegistrationSuccess"
    class="modal fade"
    id="registerModal"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body" style="justify-content: center">
          <img
            src="https://i.pinimg.com/564x/83/b1/bd/83b1bd6a5cf261f7a8c3416f9a7fcf56.jpg"
            alt=""
            style="width: 12rem"
          />
        </div>
        <div class="col-auto modal-footer" style="justify-content: center">
          <button
            type="button"
            class="btn"
            data-bs-dismiss="modal"
            style="width: 400px; background-color: #0d6b6e; color: white"
            @click="goToHome"
          >
            Go To Home Page
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput from "../ui/BaseInput.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BaseButton from "../ui/BaseButton.vue";
import { reactive, ref } from "vue";

const store = useStore();
const router = useRouter();
const passwordStatusDisplay = ref("none");

const passwordCheck = () => {
  if (signupData.password.length < 8) {
    passwordStatusDisplay.value = "block";
  } else {
    passwordStatusDisplay.value = "none";
  }
};

const signupData = reactive({
  fullname: "",
  username: "",
  email: "",
  password: "",
  confirmationPassword: "",
  isLogin: false,
});

const confirmPasswordDoesNotMatch = ref("none");
const confirmPasswordMatch = ref("none");

const confirmationPasswordCheck = () => {
  if (signupData.confirmationPassword === "") {
    confirmPasswordDoesNotMatch.value = "none";
    confirmPasswordMatch.value = "none";
    return;
  }
  if (signupData.password !== signupData.confirmationPassword) {
    confirmPasswordDoesNotMatch.value = "block";
    confirmPasswordMatch.value = "none";
    return;
  }
  confirmPasswordDoesNotMatch.value = "none";
  confirmPasswordMatch.value = "block";
};

// const isRegistrationSuccess = ref(false);

// const register = async () => {
//   if (
//     signupData.password.length >= 8 &&
//     signupData.password === signupData.confirmationPassword
//   ) {
//     await store.dispatch("auth/getRegisterData", signupData);
//     isRegistrationSuccess.value = true;
//   } else {
//     signupData.confirmationPassword = "";
//     signupData.password = "";
//     confirmPasswordDoesNotMatch.value = false;
//     confirmPasswordMatch.value = false;
//   }
// };

// const goToHome = () => {
//   router.push("/");
// };

const isRegistrationSuccess = ref(false);

const register = async () => {
  if (
    signupData.password !== signupData.confirmationPassword ||
    signupData.password.length < 8
  ) {
    signupData.confirmationPassword = "";
    signupData.password = "";
    confirmPasswordDoesNotMatch.value = "none";
    confirmPasswordMatch.value = "none";
  } else {
    await store.dispatch("auth/getRegisterData", signupData);
    isRegistrationSuccess.value = true;
  }
};

const goToHome = () => {
  router.push("/");
};
</script>
