<template>
  <div class="d-flex">
    <TopIcon></TopIcon>
  </div>
  <div class="collapse navbar-collapse" id="navbar-list-4">
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            :src="
              userData.imageLink ||
              'https://i.pinimg.com/564x/c8/ed/da/c8edda475d1568e89967520d683aa10a.jpg'
            "
            width="40"
            height="40"
            class="rounded-circle"
          />
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <li>
            <RouterLink :to="`/user/:component`" class="dropdown-item" href="#"
              ><i class="fa-solid fa-user pe-2"></i>Profile</RouterLink
            >
          </li>
          <li>
            <a class="dropdown-item" href="#"
              ><i class="fa-solid fa-bars pe-2"></i>Orders</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="logout" style="color: red"
              ><i class="fa-solid fa-right-from-bracket pe-2"></i>Log Out</a
            >
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import TopIcon from "./TopIcon.vue";
import { computed } from "vue";

const store = useStore();
const router = useRouter();

const logout = () => {
  store.commit("auth/setUserLogout");
  router.push("/");
};

const userData = computed(() => store.state.auth.userLogin);
</script>

<style>
.bg-custom-1 {
  background-color: #85144b;
}

.bg-custom-2 {
  background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);
}
</style>
