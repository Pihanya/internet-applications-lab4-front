import axios from 'axios';

class AuthService {
    authorize(user, passwordSHA256) {
        return axios.get('/authorize?' +
            'user="' + user + '"&' +
            'password_sha256="' + passwordSHA256 + '"')
            .then(res => res.data.token);
    }
}


export default AuthService;