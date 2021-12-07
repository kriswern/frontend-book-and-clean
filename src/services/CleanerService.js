import axios from "axios";

const GET_MY_BOOKINGS_REST_API_URL =
  "http://localhost:8080/api/cleaner/bookings";

class CleanerService {
  getMyBookings(cleanerId) {
    return axios.get(GET_MY_BOOKINGS_REST_API_URL, {
      params: { id: cleanerId },
    });
  }
}

export default new CleanerService();
