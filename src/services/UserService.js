import axios from "axios";
import TokenService from "./TokenService";

const GET_ALL_USERS_REST_API_URL = "http://localhost:8080/users/";
const GET_USER_BY_EMAIL_REST_API_URL = "http://localhost:8080/users/email";

class UserService {    
    getAllUser(){
        const header = TokenService.getTokenHeader();
        return axios.get(GET_ALL_USERS_REST_API_URL, header);        
    }

    getUserByMail() {
        const header = TokenService.getTokenHeader();
        const email = TokenService.getNameFromToken();
        console.log("User service called");
        return axios.get(GET_USER_BY_EMAIL_REST_API_URL + `?email=${email}`, header);
    }

}

export default new UserService();