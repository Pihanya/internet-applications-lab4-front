import axios from 'axios';

class PointsService {

    host = "localhost:14248";

    getVerdicts(token) {
        return axios.get(this.host + '/verdicts',
            {headers: {'Authorization': 'Bearer ' + token}})
            .then(res => res.data.verdicts)
            .catch( err => console.log(err) );
    }

    getVerdict(token, x, y, r) {
        return axios.post(this.host + '/verdicts?'
            + 'x="' + x + '"&'
            + 'y="' + y + '"&'
            + 'r="' + r + '"',
            {headers: {'Authorization': 'Bearer ' + token}})
            .then(res => res.data.verdict)
            .catch( err => console.log(err) );
    }

    clearVerdicts(token) {
        return axios.delete(this.host + '/verdicts/clear',
            {headers: {'Authorization': 'Bearer ' + token}})
            .then(res => (res.status === 200))
            .catch( err => console.log(err) );
    }
}

export default PointsService;