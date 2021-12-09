import axios from "axios";
import TokenService from "../services/TokenService"


const GET_MY_BOOKINGS_REST_API_URL =
  "http://localhost:8080/api/customer/bookings";

class CustomerService {
  getMyBookings(customerId) {
    const header = TokenService.getTokenHeader()
    if(header !== undefined){
      return axios.get(GET_MY_BOOKINGS_REST_API_URL, {
        params: { id: customerId },
      }, header);
    }
  }
}

export default new CustomerService();

