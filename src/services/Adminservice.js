import axios from "axios";
import TokenService from "../services/TokenService";

const GET_ALL_BOOKINGS_REST_API_URL =
  "http://localhost:8080/api/admin/bookings";
const GET_ALL_CUSTOMERS_REST_API_URL =
  "http://localhost:8080/api/admin/customers";
const GET_ALL_CLEANERS_REST_API_URL =
  "http://localhost:8080/api/admin/cleaners";
const PUT_ASSIGN_CLEANER_REST_API_URL =
  "http://localhost:8080/api/admin/assigncleaner";
const GET_CLEANER_NAME_REST_API_URL =
  "http://localhost:8080/api/admin/cleanername";
const PUT_REMOVE_CLEANER_REST_API_URL =
  "http://localhost:8080/api/admin/removecleaner";

const POST_BILL = "http://localhost:8080/api/admin/addbill";
const PUT_BOOKING_BILL = "http://localhost:8080/api/admin/updatebookingbill";
class AdminService {
  getAllBookings() {
    const header = TokenService.getTokenHeader();
    if (header !== undefined) {
      return axios.get(GET_ALL_BOOKINGS_REST_API_URL, header);
    }
  }

  getAllCustomers() {
    const header = TokenService.getTokenHeader();
    if (header !== undefined) {
      return axios.get(GET_ALL_CUSTOMERS_REST_API_URL, header);
    }
  }

  getAllCleaners() {
    const header = TokenService.getTokenHeader();

    return axios.get(GET_ALL_CLEANERS_REST_API_URL, header);
  }

  getCleanerName(id) {
    const header = TokenService.getTokenHeader();

    return axios.get(GET_CLEANER_NAME_REST_API_URL + `?id=${id}`, header);
  }

  assignCleaner(formData) {
    const header = TokenService.getTokenHeader();

    axios
      .put(PUT_ASSIGN_CLEANER_REST_API_URL, formData, header)
      .then((response) => {
        if (response.status === 201) {
          return true;
        } else if (response.status === 208) {
          alert(
            "The cleaner can´t be added! There already is a booking on this cleaner within 2 hours of this one!"
          );
          return false;
        } else if (response.status === 500) {
          alert("Something went wrong!");
          return false;
        }
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  }

  removeCleaner(bookingId) {
    const header = TokenService.getTokenHeader();

    axios
      .put(PUT_REMOVE_CLEANER_REST_API_URL, { id: bookingId }, header)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  }

  addBill(total, customerId, bookingIds) {
    const header = TokenService.getTokenHeader();

    console.log(bookingIds);
    return axios.post(
      POST_BILL,
      { customerId: customerId, total: total, bookingIds: bookingIds },
      header
    );
  }

  updateBookingsBilledStatus(bookingsInCart) {
    const header = TokenService.getTokenHeader();
    return axios.put(PUT_BOOKING_BILL, bookingsInCart, header);
  }
}

export default new AdminService();
