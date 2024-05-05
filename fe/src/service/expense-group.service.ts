import { useHttp } from "./http.service";
import { reactive } from "vue";

class ExpenseGroupService {
  constructor(private readonly http = useHttp(3002)) {}

  async getAllExpenseGroups(id: string) {
    const result = await this.http.get(`/expense/group/user/${id}`);
    return result.data;
  }

  async getExpenseGroupById(id: string) {
    const result = await this.http.get(`/expense/group/${id}`);
    return result.data;
  }

  async createExpenseGroup(data: any) {
    const result = await this.http.post("/expense/group", data);
    return result.data;
  }
}

let GLOBAL_EXPENSE_GROUP_SERVICE: ExpenseGroupService | null = null;

function useExpenseGroupService() {
  if (GLOBAL_EXPENSE_GROUP_SERVICE === null) {
    GLOBAL_EXPENSE_GROUP_SERVICE = new ExpenseGroupService();
  }
  return reactive<ExpenseGroupService>(GLOBAL_EXPENSE_GROUP_SERVICE);
}

export { useExpenseGroupService };
