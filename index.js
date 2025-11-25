require('dotenv').config();
const port = process.env.PORT || 8080;
const host = 'localhost';
const express = require('express');
const cors = require('cors');
const app = express();

const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');

const swaggerDocument = yamljs.load('./docs/swagger.yaml')
//const swaggerDocument = require('./docs/swagger.json')



app.get('/films', (req, res) => {
    res.send(["Terminator 2", "Minions", "Devil wears a prada"])
})



app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API on aadressil: http://localhost:${port}`)
})