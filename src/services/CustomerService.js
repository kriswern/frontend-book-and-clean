import axios from "axios";
import TokenService from "../services/TokenService";

const GET_MY_BOOKINGS_REST_API_URL =
  "http://localhost:8080/api/customer/bookings";

const GET_MY_ID_REST_API_URL = "http://localhost:8080/api/customer/customerid";

class CustomerService {
  getMyBookings() {
    const header = TokenService.getTokenHeader();

    if (header !== undefined) {
      const name = TokenService.getNameFromToken();
      //get requests needs to be a parameter in the url, or axios wont send the header
      return axios.get(GET_MY_BOOKINGS_REST_API_URL + `?name=${name}`, header);
    }
  }

  getMyID() {
    const header = TokenService.getTokenHeader();

    if (header !== undefined) {
      const name = TokenService.getNameFromToken();

      return axios.get(GET_MY_ID_REST_API_URL + `?name=${name}`, header);
    }
  }
}

export default new CustomerService();
