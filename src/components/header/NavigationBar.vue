<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <div class="d-flex col-3" style="justify-content: center">
        <RouterLink to="/" class="navbar-brand" href="#"
          ><img src="/src/assets/img/logo.png" alt=""
        /></RouterLink>
      </div>
      <SearchBar></SearchBar>
    </div>
  </nav>
</template>

<script setup>
import SearchBar from "./SearchBar.vue";
</script>
