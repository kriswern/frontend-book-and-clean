import axios from "axios";

const NEW_BOOKING_REST_API_URL = 'http://localhost:8080/api/admin/addbooking'
const GET_ALL_BOOKINGS_REST_API_URL = 'http://localhost:8080/api/admin/bookings'
const GET_ALL_CUSTOMERS_REST_API_URL = 'http://localhost:8080/api/admin/customers'
const DELETE_BOOKING_REST_API_URL = 'http://localhost:8080/api/deletebookings'

class AdminService {

  getAllBookings() {
    return axios.get(GET_ALL_BOOKINGS_REST_API_URL)
  }

  getAllCustomers() {
    return axios.get(GET_ALL_CUSTOMERS_REST_API_URL)

  }



}

export default new AdminService();