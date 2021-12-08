import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/'

class BookingService {

  registerBooking(booking, role) {
    console.log(booking)
    axios.post(`${BASE_URL}${role}/addbooking`, booking).then((response) => {
      if(response.status === 200) {
        return true;
      }
    });
  }


  deleteBooking(id, role) {
    console.log(id)
    axios.delete(`http://localhost:8080/api/${role}/deletebookings`, {data: id}).then((response) => {
      console.log(response)
    })

  }



}

export default new BookingService();