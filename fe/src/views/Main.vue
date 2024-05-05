<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <button
          class="btn btn-primary w-75"
          type="button"
          @click="router.push('/login')"
        >
          Login
        </button>
      </div>
    </div>
    <div class="row mt-3 justify-content-center">
      <div class="col-lg-6">
        <button
          class="btn btn-success w-75"
          type="button"
          @click="router.push('/signup')"
        >
          Register
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { onBeforeMount } from "vue";
import { useUserStore } from "../store/user.store.ts";

const router = useRouter();
const userStore = useUserStore();
onBeforeMount(async () => {
  if (userStore.user) {
    await router.push("/dashboard");
  }
});
</script>
<style scoped></style>
