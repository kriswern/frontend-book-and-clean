import axios from "axios";
import TokenService from "../services/TokenService"

const GET_ALL_BOOKINGS_REST_API_URL =
  "http://localhost:8080/api/admin/bookings";
const GET_ALL_CUSTOMERS_REST_API_URL =
  "http://localhost:8080/api/admin/customers";
const GET_ALL_CLEANERS_REST_API_URL =
  "http://localhost:8080/api/admin/cleaners";
const PUT_ASSIGN_CLEANER_REST_API_URL =
  "http://localhost:8080/api/admin/assigncleaner";
const GET_CLEANER_NAME_REST_API_URL = "http://localhost:8080/api/admin/cleanername";
const PUT_REMOVE_CLEANER_REST_API_URL =
  "http://localhost:8080/api/admin/removecleaner";

class AdminService {
  getAllBookings() {
    const header = TokenService.getTokenHeader()
    if(header !== undefined){
      return axios.get(GET_ALL_BOOKINGS_REST_API_URL, header)
    }
  }

  getAllCustomers() {
    const header = TokenService.getTokenHeader()
    if(header !== undefined){
      return axios.get(GET_ALL_CUSTOMERS_REST_API_URL, header)
    }
  }

  getAllCleaners() {
    const header = TokenService.getTokenHeader()

    return axios.get(GET_ALL_CLEANERS_REST_API_URL, header);
  }

  getCleanerName(id) {
    const header = TokenService.getTokenHeader()

    return axios.get(GET_CLEANER_NAME_REST_API_URL + `?id=${id}`, header)
  }

  assignCleaner(formData) {
    const header = TokenService.getTokenHeader()
    
    axios.put(PUT_ASSIGN_CLEANER_REST_API_URL, formData, header).then((response) => {
      if(response.status === 200) {
        
        console.log(response.data);
      }
    })
      .catch(error => {
        console.log(error.response.data.error)
     });
  }

  removeCleaner(bookingId) {
    const header = TokenService.getTokenHeader()

    axios.put(PUT_REMOVE_CLEANER_REST_API_URL, {id: bookingId}, header).then((response) => {
      if(response.status === 200) {
        
        console.log(response.data);
      }
    })
      .catch(error => {
        console.log(error.response.data.error)
     });

  }
}

export default new AdminService();
