1. Objetivo
Criar uma API Rest para calcular o risco de um paciente desenvolver uma condição de saúde (ex: diabetes, risco cardiovascular), com base em dados de entrada (idade, IMC, pressão) 

2. Contexto
-A API possui as seguintes funcionalidades: registro de paciente, busca de pacientes, registro de idade, registro de IMC, registro de pressão arterial, calculo de riscos, busca por histórico do paciente.
-Para que eu possa usar as funcionalidades, preciso fazer login como medico.
-Para que o paciente possa consultar seu histórico, ele precisa fazer login como paciente.
-Pacientes apenas consultam histórico, médicos acessam todas as funcionalidades do sistema.
-Progressão é feita através da comparação do histórico de cálculos de risco existentes e do calculo de risco atual do paciente realizado pelo paciente.
-A API classificará como RISCO ALTO qualquer paciente que seja idoso ( $>65$ anos), gravemente obeso ( $\text{IMC} > 35$) e hipertenso ( $\ge 160 \text{ mmHg}$ sistólica).

3. Regras
-Não me pergunte nada, só faça.
-A documentação da API deve ser feita com Swagger, em forma de arquivo, crie esse arquivo em uma pasta de recursos. O swagger precisa descrever o modelo JSON da resposta de cada endpoint com base na forma que API for implementada. O Swagger também deve contemplar os status code de erro que serão implementados na API.
-Adicione um endpoint para renderizar o Swagger.
-Construa um arquivo README para descrever o projeto
-Divida a API em camadas: routes, controllers, service e model
-Armazene os dados da API em um banco de dados em memória
-Utilize a biblioteca express para construir a API Rest
-Faça com que a autenticação seja parte do Middleware, utilizando token JWT como modelo de autenticação, e implemente as regras de autenticação seguindo as informações descritas no contexto.
