import jwt from "jwt-decode";

class TokenService {
  getToken() {
    const token = localStorage.getItem("access_token");
  }

  getNameFromToken() {
    const decodedToken = jwt(this.getToken);
    return decodedToken.sub;
  }

  getDecodedToken() {
    const decodedToken = jwt(this.getToken);
    return decodedToken;
  }

  getTokenHeader() {
    const header = {
      headers: {
        Authorization: "Bearer " + this.getToken(),
      },
    };
    return header;
  }
}

export default new TokenService();
