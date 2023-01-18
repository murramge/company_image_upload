import axios from "axios";
class Auth {
  constructor() {
    this.Auth = axios.create({
      baseURL: `http://115.89.138.200:8082/api/auth/`,
    });
  }

  async loginauth(companyCode, password) {
    const response = await this.Auth.post(`/login`, {
      jikwonCode: companyCode,
      password: password,
    });
    return response;
  }
}

export default Auth;
