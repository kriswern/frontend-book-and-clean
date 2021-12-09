import axios from "axios";
import TokenService from "../services/TokenService"

const GET_ALL_BOOKINGS_REST_API_URL =
  "http://localhost:8080/api/admin/bookings";
const GET_ALL_CUSTOMERS_REST_API_URL =
  "http://localhost:8080/api/admin/customers";
const GET_ALL_CLEANERS_REST_API_URL =
  "http://localhost:8080/api/admin/cleaners";
const POST_ASSIGN_CLEANER_REST_API_URL =
  "http://localhost:8080/api/admin/assigncleaner";

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

  assignCleaner(formData) {
    const header = TokenService.getTokenHeader()

    console.log("Axios", formData)
    
    axios.put(POST_ASSIGN_CLEANER_REST_API_URL, formData, header).then((response) => {
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
