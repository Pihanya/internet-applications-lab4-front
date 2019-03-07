import axios from 'axios';

class PointsService {
    getVerdicts(token) {
        return axios.get('/verdicts?' +
            'token="' + token + '"')
            .then(res => res.data.verdicts);
    }

    getVerdict(token, x, y, r) {
        return axios.post('/verdicts?' +
            'token="' + token + '"&'
            + 'x="' + x + '"&'
            + 'y="' + y + '"&'
            + 'r="' + r + '"')
            .then(res => res.data.verdict);
    }

    clearVerdicts(token) {
        return axios.delete('/verdicts/clear?' +
            'token="' + token + '"')
            .then(res => (res.status === 200));
    }
}

export default PointsService;