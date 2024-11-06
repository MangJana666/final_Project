<template>
  <div class="collapse navbar-collapse col-10" id="navbarSupportedContent">
    <form class="d-flex col-10" role="search">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <component :is="component[menuComponent]"></component>
      <LanguageBar></LanguageBar>
    </form>
  </div>
</template>

<script setup>
import LanguageBar from "./LanguageBar.vue";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import ProfileMenu from "./ProfileMenu.vue";
import AuthButton from "./AuthButton.vue";

const menuComponent = ref("auth-menu");
const store = useStore();

const component = {
  "auth-menu": AuthButton,
  "profile-menu": ProfileMenu,
};

const getToken = computed(() => {
  return store.state.auth.token;
});

if (!getToken.value) {
  menuComponent.value = "auth-menu";
} else {
  menuComponent.value = "profile-menu";
}

watch(getToken, (newValue, oldValue) => {
  if (!newValue) {
    menuComponent.value = "auth-menu";
  } else {
    menuComponent.value = "profile-menu";
  }
});
</script>
