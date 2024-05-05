<template>
  <div class="container text-center">
    <div class="row">
      <div class="col-md-3">
        <table class="table">
          <tbody class="text-start border-start border-end border-top">
            <tr>
              <td>{{ userStore.user["name"] }}</td>
            </tr>
            <tr>
              <td>{{ userStore.user["email"] }}</td>
            </tr>
          </tbody>
        </table>
        <button
          class="btn btn-primary w-100 mb-3"
          type="button"
          @click="router.push('/expense/new-group')"
        >
          New Expense Group
        </button>
        <button class="btn btn-dark w-100 mb-3" type="button" @click="logout">
          Logout
        </button>
      </div>
      <div class="col-md-9">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody class="text-start border-start border-end">
            <tr v-for="i in data" @click="goDetails(i)" style="cursor: pointer">
              <td>{{ i["name"] }}</td>
              <td>{{ i["date"] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user.store.ts";
import { useExpenseGroupService } from "../service/expense-group.service.ts";
import { onBeforeMount, ref } from "vue";
const router = useRouter();
const userStore = useUserStore();

const data = ref([]);
useExpenseGroupService()
  .getAllExpenseGroups(userStore.user["_id"])
  .then((response: any) => {
    data.value = response;
  })
  .catch((error) => {
    console.log(error);
  });

function logout() {
  userStore.logout();
  router.push("/");
}

function goDetails(item: any) {
  router.push({ name: "expense-details", params: { id: item["_id"] } });
}
onBeforeMount(async () => {
  if (!userStore.user) {
    await router.push("/");
  }
});
</script>
<style scoped></style>
