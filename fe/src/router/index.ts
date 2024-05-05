import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import NewGroup from "../views/expense/NewGroup.vue";
import Details from "../views/expense/Details.vue";
import AddExpense from "../views/expense/AddExpense.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: Main,
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/expense/new-group",
      name: "expense-new-group",
      component: NewGroup,
    },
    {
      path: "/expense/details/:id",
      name: "expense-details",
      component: Details,
      props: true,
    },
    {
      path: "/expense/add/:id",
      name: "expense-add",
      component: AddExpense,
      props: true,
    },
  ],
});

export default router;
