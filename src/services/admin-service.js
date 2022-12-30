import { axiosService } from "./axios-service";

class AdminService {
  async getBalances() {
    return await axiosService.client.get("/balances");
  }

  async getTxnList() {
    return await axiosService.client.get("/transactions");
  }
}

export default new AdminService();
