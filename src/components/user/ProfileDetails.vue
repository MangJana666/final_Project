<template>
  <div class="col-sm-9">
    <div class="row">
      <div class="card col-10 col-sm-10">
        <form class="card-body" @submit.prevent="updateProfile">
          <h6>Edit Profile</h6>
          <div class="d-flex mt-4" style="align-items: center">
            <h6>Photos</h6>
            <img
              :src="
                userData.image ||
                'https://i.pinimg.com/564x/88/54/80/885480f77f921fad94ce6388099b8d7e.jpg'
              "
              alt="Profile"
              class="imgProfile rounded-circle"
              style="
                object-fit: cover;
                margin-left: 200px;
                width: 60px;
                height: 60px;
              "
            />
            <BaseInput
              type="file"
              identity="image"
              @change="checkImage"
              placeholder="Choose"
              label="Choose"
              style="margin-left: 30px; width: 100px"
            >
            </BaseInput>

            <div class="d-flex justify-content-center">
              <p style="margin-left: 10px">JPG, JPEG or PNG, 1 MB max.</p>
              <a style="text-decoration: none"
                ><i
                  class="fa-solid fa-trash"
                  style="margin-left: 20px; font-size: 20px"
                ></i
              ></a>
            </div>
          </div>
          <hr />
          <div class="mb-3 mt-3">
            <BaseInput
              type="text"
              identity="fullname"
              placeholder="Enter your fullname"
              label="Full name"
              v-model="userData.fullname"
            ></BaseInput>
          </div>
          <div class="mb-3 mt-3">
            <BaseInput
              type="email"
              identity="email"
              placeholder="Enter your email"
              label="Email"
              v-model="userData.email"
            ></BaseInput>
          </div>
          <div class="mb-3 mt-3">
            <BaseInput
              type="password"
              identity="password"
              placeholder="Enter your password"
              label="Password"
              v-model="userData.password"
            ></BaseInput>
          </div>
          <div class="d-flex justify-content-end mt-4">
            <BaseButton
              type="submit"
              class="btn justify-content-end"
              style="background-color: #0d6b6e; color: white"
              @click="updateProfile"
            >
              Update Profile
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { store } from "@/store";
import BaseInput from "../ui/BaseInput.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { ref } from "vue";
import BaseButton from "../ui/BaseButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const userData = ref({
  imageLink: "",
  fullname: "",
  email: "",
  password: "",
});

const checkImage = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
    userData.value.image = reader.result;
  };
};

const updateProfile = async () => {
  try {
    const id = userData.value.userId;
    console.log(id);
    await store.dispatch("auth/updateUser", {
      id,
      updatedUser: userData.value,
    });
    router.push("/");
  } catch (err) {
    console.log(err);
  }
};

onMounted(async () => {
  try {
    userData.value = store.state.auth.userLogin;
  } catch (err) {
    console.log(err);
  }
});
</script>
