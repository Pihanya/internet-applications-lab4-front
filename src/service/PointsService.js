import axios from 'axios';

class PointsService {
    getVerdicts(token) {
        return axios.get('/verdicts',
            {headers: {'Authorization': 'Bearer ' + token}})
            .then(res => res.data.verdicts);
    }

    getVerdict(token, x, y, r) {
        return axios.post('/verdicts?'
            + 'x="' + x + '"&'
            + 'y="' + y + '"&'
            + 'r="' + r + '"',
            {headers: {'Authorization': 'Bearer ' + token}})
            .then(res => res.data.verdict);
    }

    clearVerdicts(token) {
        return axios.delete('/verdicts/clear',
            {headers: {'Authorization': 'Bearer ' + token}})
            .then(res => (res.status === 200));
    }
}

export default PointsService;