import axios from 'axios';
import {sha256} from "js-sha256";

class AuthService {
    host = "http://localhost:14780/lab4web";

    authorize(user, password) {
        let passwordSHA256 = sha256(password);

        return axios.get(this.host + '/authorize?' +
            'user=' + user + '&' +
            'password_sha256=' + passwordSHA256)
            .then(res => res.data.token[0])
            .catch(err => console.log(err));
    }
}

export default AuthService;