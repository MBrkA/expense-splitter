<template>
  <div class="card shadow" style="min-width: 50vw">
    <div class="card-body">
      <h3 class="card-title mb-5 border-bottom">Signup</h3>

      <div class="form-group mb-3">
        <label for="name">Name</label>
        <input
          v-model="data.name"
          type="text"
          class="form-control"
          :class="isValid.name"
          id="name"
          placeholder="Enter your name"
          required
        />
        <div class="invalid-feedback">Enter a valid name!</div>
      </div>
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
      <button type="submit" class="btn btn-primary" @click="signup">
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
const userStore = useUserStore();

const data = ref({
  name: "",
  email: "",
  password: "",
});
const isValid = ref({
  name: "",
  email: "",
  password: "",
});

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

function validationCheck() {
  let v = true;
  if (!data.value.name) {
    isValid.value.name = "is-invalid";
    v = v ? false : v;
  } else {
    isValid.value.name = "is-valid";
  }
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

function signup() {
  if (validationCheck()) {
    useUserService()
      .register(data.value.name, data.value.email, data.value.password)
      .then((res) => {
        if (res) {
          router.push("/");
        }
      })
      .catch((err) => {
        console.error(err);
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
