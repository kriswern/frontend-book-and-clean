import jwt from "jwt-decode";

class TokenService {
  getToken() {
    const token = localStorage.getItem("access_token");
    if (token !== null) {
      return token;
    }
  }

  getNameFromToken() {
    const token = this.getToken();
    if (token !== undefined) {
      const decodedToken = jwt(token);
      return decodedToken.sub;
    }
  }

  getRoleFromToken() {
    const token = this.getToken();
    if (token !== undefined) {
      const decodedToken = jwt(token);
      return decodedToken.roles[0];
    }
  }

  getTokenHeader() {
    const header = {
      headers: {
        Authorization: "Bearer " + this.getToken(),
      },
    };
    return header;
  }

  deleteToken() {
    localStorage.removeItem("access_token");
  }
}

export default new TokenService();
