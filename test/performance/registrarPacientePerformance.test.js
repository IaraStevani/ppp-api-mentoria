import http from 'k6/http';
import { check, sleep } from 'k6';
import { pegarBaseURL } from './utils/variaveis.js';
import { obterTokenPerformance } from './helpers/autenticacaoPerformance.js';

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
    const token = obterTokenPerformance();

    const url = pegarBaseURL() + '/api/pacientes';

    const payload = JSON.stringify({
        nome: 'paciente',
        idade: 70,
        imc: 40,
        pressao: 160
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'Validar status 201': (r) => r.status === 201,
    });

    sleep(1);
}