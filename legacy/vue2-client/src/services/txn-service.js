import { axiosService } from "./axios-service";

class TxnService {
  async submitTxn(txn) {
    return await axiosService.client.post("/transactions", txn);
  }
}

export default new TxnService();
