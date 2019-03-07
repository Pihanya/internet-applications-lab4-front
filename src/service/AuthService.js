import axios from 'axios';
import {sha256} from "js-sha256";

class AuthService {

    host = "localhost:14248";

    authorize(user, password) {
        let passwordSHA256 = sha256(password);

        return axios.get(this.host + '/authorize?' +
            'user="' + user + '"&' +
            'password_sha256="' + passwordSHA256 + '"')
            .then(res => res.data.token)
            .catch(err => console.log(err));
    }
}


export default AuthService;