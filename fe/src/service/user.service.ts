import { useHttp } from "./http.service";
import { reactive } from "vue";

class UserService {
  constructor(private readonly http = useHttp(3000)) {}

  async getAllUsers() {
    const result = await this.http.get("/user");
    return result.data;
  }

  async getUserById(id: string) {
    const result = await this.http.get(`/user/${id}`);
    return result.data;
  }

  async createUser(data: any) {
    const result = await this.http.post("/user", data);
    return result.data;
  }

  async login(email: string, password: string) {
    const result = await this.http.post("/user/login", { email, password });
    return result.data;
  }

  async register(name: string, email: string, password: string) {
    const result = await this.http.post("/user/register", {
      name,
      email,
      password,
    });
    return result.data;
  }
}

let GLOBAL_USER_SERVICE: UserService | null = null;

function useUserService() {
  if (GLOBAL_USER_SERVICE === null) {
    GLOBAL_USER_SERVICE = new UserService();
  }
  return reactive<UserService>(GLOBAL_USER_SERVICE);
}

export { useUserService };
