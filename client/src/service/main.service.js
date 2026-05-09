import api from "../api";

class MainService {
  async getAllProducts() {
    return await api.get("/products");
  }

  async getUser() {
    return await api.get("/users/profile");
  }

  async updateUser(data) {
    return await api.put("/users/profile", data);
  }

  async getAllCtegories() {
    return await api.get("/categories");
  }
}

export default new MainService();
