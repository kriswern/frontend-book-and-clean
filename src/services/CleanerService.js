import axios from "axios";
import TokenService from "../services/TokenService";

const GET_MY_BOOKINGS_REST_API_URL =
  "http://localhost:8080/api/cleaner/bookings";
const UPDATE_BOOKING_STATUS =
  "http://localhost:8080/api/cleaner/bookings/update";
const GET_CLEANER_REST_API_URL = "http://localhost:8080/api/cleaner/email";

class CleanerService {
  getMyBookings() {
    console.log("in cleaner service");
    const header = TokenService.getTokenHeader();

    if (header !== undefined) {
      const name = TokenService.getNameFromToken();
      //get requests needs to be a parameter in the url, or axios wont send the header
      return axios.get(GET_MY_BOOKINGS_REST_API_URL + `?name=${name}`, header);
    }
  }

  changeStatus(id) {
    const header = TokenService.getTokenHeader();

    if (header !== undefined) {
      return axios.post(UPDATE_BOOKING_STATUS, { id: id }, header);
    }
  }

  getUserByMail() {
    const header = TokenService.getTokenHeader();
    const email = TokenService.getNameFromToken();
    return axios.get(GET_CLEANER_REST_API_URL + `?email=${email}`, header);
  }
}

export default new CleanerService();
