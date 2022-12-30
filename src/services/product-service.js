import { axiosService } from "./axios-service";

class ProductService {
  async getProducts() {
    return await axiosService.client.get("/products");
  }

  async getProductById(id) {
    return await axiosService.client.get(`/products/${id}`);
  }
}

export default new ProductService();
