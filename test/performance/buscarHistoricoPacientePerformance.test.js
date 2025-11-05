import http from 'k6/http';
import { check, sleep } from 'k6';
import { pegarBaseURL } from './utils/variaveis.js';
import { obterTokenPacientePerformance } from './helpers/autenticacaoPacientePerformance.js';

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
    const token = obterTokenPacientePerformance();

    const url = pegarBaseURL() + '/api/historico';

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    };

    const res = http.get(url, params);

    check(res, {
        'Validar status 200': (r) => r.status === 200,      
    });

    sleep(1);
}