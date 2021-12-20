import axios from "axios";
import TokenService from "../services/TokenService";

const BASE_URL = "http://localhost:8080/api/";
const GET_PRICE_LIST = "http://localhost:8080/api/";

class BookingService {
  registerBooking(booking, role) {
    console.log(booking);
    const header = TokenService.getTokenHeader();
    if (header !== undefined) {
      axios
        .post(`${BASE_URL}${role}/addbooking`, booking, header)
        .then((response) => {
          if (response.status === 201) {
            alert("The booking has been made!");
            return true;
          } else if (response.status === 208) {
            alert(
              "No booking made! There already is a booking on this customer within 2 hours of this one!"
            );
            return false;
          } else if (response.status === 500) {
            alert("Something went wrong!");
            return false;
          }
        });
    }
  }

  getPriceList() {
    const header = TokenService.getTokenHeader();
    const role = TokenService.getRoleFromToken();

    return axios.get(GET_PRICE_LIST + role + "/priceList", header);
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
