<template>
  <div class="card shadow" style="min-width: 50vw">
    <div class="card-body">
      <h3 class="card-title mb-5 border-bottom">Expense Group Details</h3>
      <div class="row border-top border-bottom">
        <div class="col-md-6">✨Name</div>
        <div class="col-md-6">{{ data["name"] }}</div>
      </div>
      <div class="row border-bottom border-top mt-2">
        <div class="col">✨Listed Expenses</div>
      </div>
      <div class="row border-bottom" v-for="expenses in data['expenses']">
        <div class="col-md-6">Expense Name :</div>
        <div class="col-md-6">{{ expenses["expname"] }}</div>
        <div class="col-md-6">Payer :</div>
        <div class="col-md-6">{{ expenses["payer"] }}</div>
        <div class="col-md-6">Amount :</div>
        <div class="col-md-6">{{ expenses["price"] }} ₺</div>
        <div class="col-md-6">Date :</div>
        <div class="col-md-6">{{ expenses["date"] }}</div>
        <div class="col-md-6">Time :</div>
        <div class="col-md-6">{{ expenses["time"] }}</div>
      </div>
      <div class="row border-bottom border-top mt-2">
        <div class="col">✨Participants</div>
      </div>
      <div class="row border-bottom" v-for="participant in uniquePayerNames">
        <div class="col-md-6">Name</div>
        <div class="col-md-6">{{ participant["name"] }}</div>
        <div class="col-md-6">Amount</div>
        <div class="col-md-6">{{ participant["amount"] }} ₺</div>
      </div>
      <div class="row border-bottom border-top mt-2">
        <div class="col-md-6">✨Total Amount of Expenses</div>
        <div class="col-md-6">{{ totalAmount }} ₺</div>
      </div>
      <div class="row border-bottom border-top mt-2">
        <div class="col">✨Balance Distributions Among Participants</div>
      </div>
      <div class="row border-bottom" v-for="dist in balanceDistributions">
        <div class="col-md-6">Name :</div>
        <div class="col-md-6">{{ dist["name"] }}</div>
        <div class="col-md-6">Payer :</div>
        <div class="col-md-6">
          {{ dist["amount"] < 0 ? "Owes" : "Gets" }}
          {{ Math.abs(dist["amount"]) }} ₺
        </div>
      </div>

      <div class="row mt-3">
        <div class="col">
          <button class="btn btn-primary" @click="addExpense">
            Add Expense
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
/*
Expense Group Details: Clicking on an expense group within the dashboard reveals detailed information,
including listed expenses, participants, total amount of expenses, and balance distributions among participants.
 */
import { useUserStore } from "../../store/user.store.ts";
import { useRouter } from "vue-router";
import { useExpenseGroupService } from "../../service/expense-group.service.ts";
import { onBeforeMount, ref } from "vue";

const props = defineProps<{
  id: string;
}>();

const userStore = useUserStore();
const router = useRouter();
//const data = userStore.getExpenseGroup(props.id);
const data = ref({});
const uniquePayerNames = ref([]);
const totalAmount = ref(0);
const balanceDistributions = ref([]);

useExpenseGroupService()
  .getExpenseGroupById(props.id)
  .then((response: any) => {
    data.value = response;
    uniquePayerNames.value = [
      ...new Set(response.expenses.map((expense) => expense.payer)),
    ];
    uniquePayerNames.value = uniquePayerNames.value.map((payer) => {
      return {
        name: payer,
        amount: response.expenses
          .filter((expense) => expense.payer === payer)
          .reduce((acc, curr) => acc + curr.price, 0),
      };
    });
    totalAmount.value = response.expenses.reduce(
      (acc, curr) => acc + curr.price,
      0,
    );
    balanceDistributions.value = uniquePayerNames.value.map((payer) => {
      return {
        name: payer.name,
        amount:
          payer.amount - totalAmount.value / uniquePayerNames.value.length,
      };
    });
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

function addExpense() {
  router.push({ name: "expense-add", params: { id: props.id } });
}

onBeforeMount(async () => {
  if (!userStore.user) {
    await router.push("/");
  }
});
</script>
<style scoped></style>
