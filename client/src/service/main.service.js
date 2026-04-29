import api from "../api";

class MainService {
  async getAllProducts() {
    return await api.get("/products");
  }
}

export default new MainService();
