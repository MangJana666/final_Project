<template>
  <WebHeader></WebHeader>
  <RouterView></RouterView>
  <WebFooter></WebFooter>
</template>
<script setup>
import { RouterView } from "vue-router";
import WebFooter from "./components/footer/WebFooter.vue";
import WebHeader from "./components/header/WebHeader.vue";
import HomePage from "./components/pages/HomePage.vue";
</script>
