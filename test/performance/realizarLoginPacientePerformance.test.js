import http from 'k6/http';
import { check, sleep } from 'k6';
import { pegarBaseURL } from './utils/variaveis.js';
const postLoginPacientePerformance = JSON.parse(open('./fixtures/postLoginPacientePerformance.json'));

export const options = {
    stages: [
        { duration: '5s', target: 10 },
        { duration: '20m', target: 10 },
        { duration: '5s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(90)<10', 'max<10'],
        http_req_failed: ['rate<0.01'],
    },
};

export default function () {
    const url = pegarBaseURL() + '/api/login';
    const payload = JSON.stringify(postLoginPacientePerformance);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'Validar status 200': (r) => r.status === 200,
        'Validar token string': (r) => typeof (r.json().token) === 'string'
    });

    sleep(1);
}