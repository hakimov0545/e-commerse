import api from "../api";

class AuthService {
  async login(data) {
    return await api.post("/login", data);
  }

  async register(data) {
    return await api.post("/auth/register", data);
  }
}

export default new AuthService();
