import http from 'k6/http';
const postLoginPerformance = JSON.parse(open('../fixtures/postLoginPerformance.json'));
import { pegarBaseURL } from '../utils/variaveis.js';

export function obterTokenPerformance() {
    const url = pegarBaseURL() + '/api/login';

    const payload = JSON.stringify(postLoginPerformance);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    return res.json('token');
}