import axios from 'axios';

class PointsService {
    host = "http://localhost:14780/lab4web";

    getVerdicts(token) {
        return axios.get(this.host + '/verdicts',
            {headers: {'Authorization': 'Bearer ' + token}})
            .then(res => res.data.verdicts[0].map(verdictsArray => {
                return {
                    x: verdictsArray.x[0],
                    y: verdictsArray.y[0],
                    r: verdictsArray.r[0],
                    verdict: verdictsArray.verdict[0]
                }
            }))
            .catch(err => console.log(err));
    }

    getVerdict(token, x, y, r) {
        return axios.post(this.host + '/verdicts?'
            + 'x=' + x + '&'
            + 'y=' + y + '&'
            + 'r=' + r + '', undefined,
            {
                headers: {'Authorization': 'Bearer ' + token}
            })
            .then(res => res.data.verdict[0] === "true")
            .catch(err => console.log(err));
    }

    clearVerdicts(token) {
        return axios.delete(this.host + '/verdicts',
            {
                headers: {'Authorization': 'Bearer ' + token}
            })
            .then(res => (res.status === 200))
            .catch(err => console.log(err));
    }
}

export default PointsService;