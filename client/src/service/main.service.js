import api from "../api";

class MainService {
  async getAllProducts() {
    return await api.get("/products");
  }

  async getUser() {
    return await api.get("/users/profile");
  }
}

export default new MainService();
