import axios from "axios";
import TokenService from "../services/TokenService";

const GET_MY_BOOKINGS_REST_API_URL =
  "http://localhost:8080/api/customer/bookings";

const GET_MY_ID_REST_API_URL = "http://localhost:8080/api/customer/customerid";
const GET_CUSTOMER_REST_API_URL = "http://localhost:8080/api/customer/email";
const POST_APPROVE_CLEANING_REST_API_URL =
  "http://localhost:8080/api/customer/approve-cleaning";

const POST_REJECT_CLEANING_REST_API_URL =
  "http://localhost:8080/api/customer/reject-cleaning";

class CustomerService {
  getMyBookings() {
    const header = TokenService.getTokenHeader();

    if (header !== undefined) {
      const name = TokenService.getNameFromToken();
      //get requests needs to be a parameter in the url, or axios wont send the header
      return axios.get(GET_MY_BOOKINGS_REST_API_URL + `?name=${name}`, header);
    }
  }

  approveCleaning(id) {
    const header = TokenService.getTokenHeader();

    if (header !== undefined) {
      return axios.post(POST_APPROVE_CLEANING_REST_API_URL, { id: id }, header);
    }
  }

  rejectCleaning(formData) {
    const header = TokenService.getTokenHeader();

    if (header !== undefined) {
      return axios.post(POST_REJECT_CLEANING_REST_API_URL, formData, header);
    }
  }

  getMyID() {
    const header = TokenService.getTokenHeader();

    if (header !== undefined) {
      const name = TokenService.getNameFromToken();

      return axios.get(GET_MY_ID_REST_API_URL + `?name=${name}`, header);
    }
  }

  getUserByMail() {
    const header = TokenService.getTokenHeader();
    const email = TokenService.getNameFromToken();
    return axios.get(GET_CUSTOMER_REST_API_URL + `?email=${email}`, header);
  }
}

export default new CustomerService();
