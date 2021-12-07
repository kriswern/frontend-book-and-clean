import axios from "axios";

const NEW_BOOKING_REST_API_URL = 'http://localhost:8080/api/addbookings'
const GET_ALL_BOOKINGS_REST_API_URL = 'http://localhost:8080/api/bookings'



class BookingService {

  registerBooking(booking) {
    console.log(booking)
    axios.post(NEW_BOOKING_REST_API_URL, booking);
  }

  getAllBookings() {
    const token = localStorage.getItem("token");

    return axios.get(GET_ALL_BOOKINGS_REST_API_URL, { 
      headers: {
        Authorization: "Bearer " + token
      }
    })
    console.log("something went wrong")
  }



}

export default new BookingService();