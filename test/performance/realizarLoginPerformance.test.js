import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    iterations: 100,
    thresholds: {    
    http_req_duration: ['p(90)<10','max<10'], 
    http_req_failed: ['rate<0.01'], 
  },
};

export default function () {
    const url = 'http://localhost:3000/api/login';
    const payload = JSON.stringify({
        nome: 'medico',
        senha: '123',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

        check(res,{
            'Validar status 200': (r) => r.status === 200,
            'Validar token string': (r) => typeof(r.json().token) === 'string'
        });
    
    sleep(1);    
}