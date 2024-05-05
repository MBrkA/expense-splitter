<template>
  <div class="card shadow" style="min-width: 50vw">
    <div class="card-body">
      <h3 class="card-title mb-5 border-bottom">New Expense Group</h3>

      <div class="form-group mb-3">
        <label for="name">Name</label>
        <input
          v-model="data.name"
          type="text"
          class="form-control"
          :class="isValid.name"
          id="name"
          placeholder="Enter group name"
          required
        />
        <div class="invalid-feedback">Enter a valid name!</div>
      </div>
      <div class="form-group mb-3">
        <label for="name">Date</label>
        <input
          v-model="data.date"
          type="date"
          class="form-control"
          :class="isValid.date"
          id="name"
        />
      </div>

      <button type="submit" class="btn btn-primary" @click="submitFunc">
        Submit
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
// User Signup: New users can create an account by providing necessary details such as name, email, and password.
import { onBeforeMount, ref } from "vue";
import { useExpenseGroupService } from "../../service/expense-group.service.ts";
import { useRouter } from "vue-router";
import { useUserStore } from "../../store/user.store.ts";

const router = useRouter();
const userStore = useUserStore();

// get date as
const data = ref({
  name: "",
  date: new Date().toISOString().slice(0, 10),
});
const isValid = ref({
  name: "",
  date: "",
});

function validationCheck() {
  let v = true;
  if (!data.value.name) {
    isValid.value.name = "is-invalid";
    v = v ? false : v;
  } else {
    isValid.value.name = "is-valid";
  }
  if (!data.value.date) {
    isValid.value.date = "is-invalid";
    v = v ? false : v;
  } else {
    isValid.value.date = "is-valid";
  }
  return v;
}

function submitFunc() {
  if (validationCheck()) {
    useExpenseGroupService()
      .createExpenseGroup({
        ...data.value,
        user: userStore.user._id,
        expenses: [],
        total: 0,
        participants: [],
        balanceDistribution: [],
      })
      .then((data) => {
        console.log(data);
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

onBeforeMount(async () => {
  if (!userStore.user) {
    await router.push("/");
  }
});
</script>
<style scoped></style>
