<template>
  <div class="card shadow" style="min-width: 50vw">
    <div class="card-body">
      <h3 class="card-title mb-5 border-bottom">Add Expense</h3>

      <div class="form-group mb-3">
        <label for="name">Expense Name</label>
        <input
          v-model="data.expname"
          type="text"
          class="form-control"
          :class="isValid.expname"
          id="name"
          placeholder="Enter expense name"
          required
        />
        <div class="invalid-feedback">Enter a valid name!</div>
      </div>
      <div class="form-group mb-3">
        <label for="name">Price</label>
        <div class="input-group mb-3">
          <span class="input-group-text">₺</span>
          <input
            v-model="data.price"
            min="0"
            type="number"
            class="form-control"
            :class="isValid.price"
            id="name"
            placeholder="Enter price"
            required
          />
          <div class="invalid-feedback">Enter a valid price!</div>
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="name">Date</label>
        <input
          v-model="data.date"
          type="date"
          class="form-control"
          :class="isValid.date"
          id="name"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="name">Time</label>
        <input
          v-model="data.time"
          type="time"
          class="form-control"
          :class="isValid.time"
          id="name"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="name">Payer's Name</label>
        <input
          v-model="data.payer"
          type="text"
          class="form-control"
          :class="isValid.payer"
          id="name"
          placeholder="Enter payer's name"
          required
        />
        <div class="invalid-feedback">Enter a valid name!</div>
      </div>

      <button type="submit" class="btn btn-primary" @click="submitFunc">
        Submit
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useExpenseService } from "../../service/expense.service.ts";
import { useRouter } from "vue-router";
import { useUserStore } from "../../store/user.store.ts";

const userStore = useUserStore();
const router = useRouter();

const props = defineProps<{
  id?: string;
}>();

const data = ref({
  expname: "",
  price: "",
  date: new Date().toISOString().slice(0, 10),
  time: new Date().toISOString().slice(11, 16),
  payer: "",
});
const isValid = ref({
  expname: "",
  price: "",
  date: "",
  time: "",
  payer: "",
});

function validationCheck() {
  let v = true;
  if (!data.value.expname) {
    isValid.value.expname = "is-invalid";
    v = v ? false : v;
  } else {
    isValid.value.expname = "is-valid";
  }
  if (!data.value.price) {
    isValid.value.price = "is-invalid";
    v = v ? false : v;
  } else {
    isValid.value.price = "is-valid";
  }
  if (!data.value.payer) {
    isValid.value.payer = "is-invalid";
    v = v ? false : v;
  } else {
    isValid.value.payer = "is-valid";
  }
  if (!data.value.date) {
    isValid.value.date = "is-invalid";
    v = v ? false : v;
  } else {
    isValid.value.date = "is-valid";
  }
  if (!data.value.time) {
    isValid.value.time = "is-invalid";
    v = v ? false : v;
  } else {
    isValid.value.time = "is-valid";
  }
  return v;
}

function submitFunc() {
  if (validationCheck()) {
    useExpenseService()
      .createExpense(String(props.id), data.value)
      .then(() => {
        router.push({ name: "expense-details", params: { id: props.id } });
      })
      .catch((error) => {
        console.error(error);
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
