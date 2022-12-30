import { axiosService } from "./axios-service";

class LoginService {
  async login(authObj) {
    return await axiosService.client.post("/login", authObj);
  }

  async validateToken(token) {
    const result = await axiosService.client.post("/token", { token });
    axiosService.setToken(token);
    return result.isValid;
  }

  logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }
}

export default new LoginService();
