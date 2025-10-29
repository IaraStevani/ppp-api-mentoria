const configLocal = JSON.parse(open('../config/config.Local.json'));

export function pegarBaseURL(){
    return  __ENV.BASE_URL || configLocal.baseUrl;
}