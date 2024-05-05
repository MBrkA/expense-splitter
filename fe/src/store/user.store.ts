import { defineStore } from "pinia";

interface State {
  user: any | null;
  expenseGroups: any[];
}

interface Actions {
  setUser(user: any): void;
  logout(): void;
  setExpenseGroups(groups: any[]): void;
  getExpenseGroup(id: string): any[];
}

const mockExpenseData = [
  {
    id: 1,
    name: "Group 1",
    expenses: [
      {
        name: "Expense 1",
        amount: 100,
        date: "2021-10-10",
        participants: [
          {
            name: "User 1",
            amount: 50,
          },
          {
            name: "User 2",
            amount: 50,
          },
        ],
      },
      {
        name: "Expense 2",
        amount: 200,
        date: "2021-10-11",
        participants: [
          {
            name: "User 1",
            amount: 100,
          },
          {
            name: "User 2",
            amount: 100,
          },
        ],
      },
    ],
    participants: [
      {
        name: "User 1",
        balance: 0,
      },
      {
        name: "User 2",
        balance: 0,
      },
    ],
  },
  {
    id: 2,
    name: "Group 2",
    expenses: [
      {
        name: "Expense 1",
        amount: 100,
        date: "2021-10-10",
        participants: [
          {
            name: "User 1",
            amount: 50,
          },
          {
            name: "User 2",
            amount: 50,
          },
        ],
      },
      {
        name: "Expense 2",
        amount: 200,
        date: "2021-10-11",
        participants: [
          {
            name: "User 1",
            amount: 100,
          },
          {
            name: "User 2",
            amount: 100,
          },
        ],
      },
    ],
    participants: [
      {
        name: "User 1",
        balance: 0,
      },
      {
        name: "User 2",
        balance: 0,
      },
    ],
  },
];

export const useUserStore = defineStore<string, State, any, Actions>("user", {
  state: () => ({
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null,
    expenseGroups: mockExpenseData,
  }),
  actions: {
    setUser(user: any) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
    },
    setExpenseGroups(groups: any[]) {
      this.expenseGroups = groups;
    },
    getExpenseGroup(id) {
      return this.expenseGroups.find((e) => e.id === +id);
    },
  },
});
