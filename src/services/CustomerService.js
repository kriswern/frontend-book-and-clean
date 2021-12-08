import axios from "axios";

const NEW_BOOKING_REST_API_URL = 'http://localhost:8080/api/customer/addbooking'
const GET_MY_BOOKINGS_REST_API_URL = 'http://localhost:8080/api/customer/bookings'
const DELETE_BOOKING_REST_API_URL = 'http://localhost:8080/api/deletebookings'

class CustomerService {
  
  getMyBookings(customerId) {
    return axios.get(GET_MY_BOOKINGS_REST_API_URL, {params: {id: customerId}})
  }

  deleteBooking(id) {
    console.log(id)
    axios.delete(DELETE_BOOKING_REST_API_URL, {data: id}).then((response) => {
      console.log(response)
    })

  }

  registerBooking(booking) {
    console.log(booking)
    axios.post(NEW_BOOKING_REST_API_URL, booking).then((response) => {
      if(response.status === 200) {
        return true;
      }
    });
  }





}

export default new CustomerService();