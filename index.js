require('dotenv').config();
const port = process.env.PORT || 8080;
const host = 'localhost';
const express = require('express');
const cors = require('cors');
const app = express();

const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');

//const swaggerDocument = yamljs.load('./docs/swagger.json')
const swaggerDocument = require('./docs/swagger.json')

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API on aadressil: http://localhost:${port}`)
})