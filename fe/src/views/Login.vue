<template>
  <div class="card shadow" style="min-width: 50vw">
    <div class="card-body">
      <h3 class="card-title mb-5 border-bottom">Login</h3>

      <div class="form-group mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          v-model="data.email"
          type="email"
          class="form-control"
          :class="isValid.email"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          required
        />
        <div class="invalid-feedback">Enter a valid email!</div>
      </div>
      <div class="form-group mb-3">
        <label for="password">Password</label>
        <input
          v-model="data.password"
          type="password"
          class="form-control"
          :class="isValid.password"
          id="password"
          placeholder="Password"
          required
        />
        <div class="invalid-feedback">Enter a valid password!</div>
      </div>
      <div class="alert alert-danger" role="alert" v-if="isFailed">
        Failed to login!
      </div>
      <button type="submit" class="btn btn-primary" @click="login">
        Submit
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useUserService } from "../service/user.service.ts";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user.store.ts";

const router = useRouter();
const store = useUserStore();
const userStore = useUserStore();
const isFailed = ref(false);

const data = ref({
  email: "",
  password: "",
});
const isValid = ref({
  email: "",
  password: "",
});

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

function validationCheck() {
  let v = true;
  if (!data.value.email || !emailRegex.test(data.value.email)) {
    isValid.value.email = "is-invalid";
    v = v ? false : v;
  } else {
    isValid.value.email = "is-valid";
  }
  if (!data.value.password) {
    isValid.value.password = "is-invalid";
    v = v ? false : v;
  } else {
    isValid.value.password = "is-valid";
  }
  return v;
}

function clearValidation() {
  isValid.value.email = "";
  isValid.value.password = "";
}

function login() {
  if (validationCheck()) {
    useUserService()
      .login(data.value.email, data.value.password)
      .then((res) => {
        if (res) {
          store.setUser(res);
          router.push("/dashboard");
        } else {
          isFailed.value = true;
          clearValidation();
        }
      })
      .catch((err) => {
        isFailed.value = true;
        console.error(err);
        clearValidation();
      });
  }
}
onBeforeMount(async () => {
  if (userStore.user) {
    await router.push("/dashboard");
  }
});
</script>
<style scoped></style>
