import axios from "axios";
import TokenService from "../services/TokenService"

const GET_MY_BOOKINGS_REST_API_URL =
  "http://localhost:8080/api/cleaner/bookings";

class CleanerService {
  getMyBookings(cleanerId) {
    const header = TokenService.getTokenHeader()
    if(header !== undefined){
      //get requests needs to be a parameter in the url, or axios wont send the header
      return axios.get(GET_MY_BOOKINGS_REST_API_URL+ `?id=${cleanerId}`, header);
    }
  }
}

export default new CleanerService();
