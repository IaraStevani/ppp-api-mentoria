import http from 'k6/http';
const postLoginPacientePerformance = JSON.parse(open('../fixtures/postLoginPacientePerformance.json'));
import { pegarBaseURL } from '../utils/variaveis.js';

export function obterTokenPacientePerformance() {
    const url = pegarBaseURL() + '/api/login';

    const payload = JSON.stringify(postLoginPacientePerformance);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    return res.json('token');
}