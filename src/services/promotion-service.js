import { axiosService } from "./axios-service";

class PromotionService {
  async getPromotions() {
    return await axiosService.client.get("/promotions");
  }

  async getPromotionById(id) {
    return await axiosService.client.get(`/promotions/${id}`);
  }
}

export default new PromotionService();
