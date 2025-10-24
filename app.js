const express = require('express');
const app = express();
const saudeRoutes = require('./src/routes/saudeRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./resources/swagger.json');

app.use(express.json());

// Rotas da API
app.use('/api', saudeRoutes);

// Endpoint para renderizar o Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Inicialização
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
