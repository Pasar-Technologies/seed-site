import axiosClient from "../../shared/services/axiosClient";

class AuthApi {
  setToken(token) {
    localStorage.setItem("authToken", token);
  }

  clearToken() {
    localStorage.removeItem("authToken");
  }

  // POST /account/auth/register → 201, data.data.message
  async register(data) {
    const response = await axiosClient.post("/account/auth/register", data);
    return response.data;
  }

  // POST /account/auth/verify-register → 200, data.data.accessToken + data.data.data (user)
  async verifyRegister(data) {
    const response = await axiosClient.post("/account/auth/verify-register", data);
    const accessToken = response.data?.data?.accessToken;
    if (accessToken) this.setToken(accessToken);
    return response.data;
  }

  // POST /account/auth/login → 200
  async login(credentials) {
    const response = await axiosClient.post("/account/auth/login", credentials);
    return response.data;
  }

  // POST /account/auth/verify-login → 200, data.data.accessToken
  async verifyLogin(data) {
    const response = await axiosClient.post("/account/auth/verify-login", data);
    const accessToken = response.data?.data?.accessToken;
    if (accessToken) this.setToken(accessToken);
    return response.data;
  }

  // POST /account/auth/logout
  async logout(refreshToken) {
    const response = await axiosClient.post("/account/auth/logout", { refreshToken });
    this.clearToken();
    return response.data;
  }
}

const authApi = new AuthApi();
export default authApi;
