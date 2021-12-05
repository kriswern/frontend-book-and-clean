import axios from "axios";

const NEW_BOOKING_REST_API_URL = 'http://localhost:8080/api/addbookings'
const GET_ALL_BOOKINGS_REST_API_URL = 'http://localhost:8080/api/bookings'
const DELETE_BOOKING_REST_API_URL = 'http://localhost:8080/api/deletebookings'



class BookingService {

  registerBooking(booking) {
    console.log(booking)
    axios.post(NEW_BOOKING_REST_API_URL, booking).then((response) => {
      if(response.status === 200) {
        return true;
      }
    });
  }

  getAllBookings() {
    return axios.get(GET_ALL_BOOKINGS_REST_API_URL)
  }

  deleteBooking(id) {
    console.log(id)
    axios.delete(DELETE_BOOKING_REST_API_URL, {data: id}).then((response) => {
      console.log(response)
    })

  }



}

export default new BookingService();