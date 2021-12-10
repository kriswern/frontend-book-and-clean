import axios from "axios";
import TokenService from "../services/TokenService";

const BASE_URL = "http://localhost:8080/api/";

class BookingService {
  registerBooking(booking, role) {
    console.log(booking);
    const header = TokenService.getTokenHeader();
    if (header !== undefined) {
      axios
        .post(`${BASE_URL}${role}/addbooking`, booking, header)
        .then((response) => {
          if (response.status === 200) {
            return true;
          }
        });
    }
  }

  deleteBooking(id, role) {
    console.log(id);
    const header = TokenService.getTokenHeader();
    if (header !== undefined) {
      axios
        .delete(
          `http://localhost:8080/api/${role}/deletebookings?id=${id}`,
          header
        )
        .then((response) => {
          console.log(response);
        });
    }
  }
}

export default new BookingService();
