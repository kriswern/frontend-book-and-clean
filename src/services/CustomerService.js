import axios from "axios";

const GET_MY_BOOKINGS_REST_API_URL =
  "http://localhost:8080/api/customer/bookings";

class CustomerService {
  getMyBookings(customerId) {
    return axios.get(GET_MY_BOOKINGS_REST_API_URL, {
      params: { id: customerId },
    });
  }
}

export default new CustomerService();
