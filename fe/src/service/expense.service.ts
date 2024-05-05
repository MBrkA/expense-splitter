import { useHttp } from "./http.service";
import { reactive } from "vue";

class ExpenseService {
  constructor(private readonly http = useHttp(3001)) {}

  async createExpense(groupId: string, data: any) {
    const result = await this.http.post(`/expense/${groupId}`, data);
    return result.data;
  }
}

let GLOBAL_EXPENSE_SERVICE: ExpenseService | null = null;

function useExpenseService() {
  if (GLOBAL_EXPENSE_SERVICE === null) {
    GLOBAL_EXPENSE_SERVICE = new ExpenseService();
  }
  return reactive<ExpenseService>(GLOBAL_EXPENSE_SERVICE);
}

export { useExpenseService };
