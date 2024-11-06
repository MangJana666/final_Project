<template>
  <div class="col-sm-9">
    <div class="row">
      <div class="card col-10 col-sm-10">
        <form class="card-body">
          <h6>Change Password</h6>
          <div class="mb-3 mt-4">
            <BaseInput
              type="password"
              identity="password"
              placeholder="Enter your Password"
              label="Old Password"
            ></BaseInput>
          </div>
          <div class="mb-3 mt-3">
            <BaseInput
              type="password"
              identity="newPassword"
              placeholder="New Password"
              label="New Password"
            ></BaseInput>
          </div>
          <div class="mb-3 mt-3">
            <BaseInput
              type="password"
              identity="newConfirmPassword"
              placeholder="Confirmation password"
              label="Password"
            ></BaseInput>
          </div>
          <div class="d-flex justify-content-end mt-4">
            <button
              type="submit"
              class="btn justify-content-end"
              style="background-color: #0d6b6e; color: white"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput from "../ui/BaseInput.vue";
</script>
