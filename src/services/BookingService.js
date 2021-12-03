import axios from "axios";

const NEW_BOOKING_REST_API_URL = 'http://localhost:8080/api/addbookings'


class BookingService {

  registerBooking(booking) {
    axios.post(NEW_BOOKING_REST_API_URL, booking);
  }

}

export default new BookingService();