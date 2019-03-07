import axios from 'axios';
import {sha256} from "js-sha256";

class AuthService {
    authorize(user, password) {
        let passwordSHA256 = sha256(password);

        return "refactor_token"; // todo: refactor
        /*return axios.get('/authorize?' +
            'user="' + user + '"&' +
            'password_sha256="' + passwordSHA256 + '"')
            .then(res => res.data.token);*/
    }
}


export default AuthService;