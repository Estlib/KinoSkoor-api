
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
const { sync } = require("./db")


// app.get('/films', (req, res) => {
//     res.send(["Terminator 2", "Minions", "Devil wears a prada"])
// })


app.use(cors());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.json());

require("./routes/ksRoutes.js")(app)

app.listen(port, async () => {
    if (process.env.SYNC === 'true') {await sync();}
    console.log(`API on aadressil: http://${host}:${port}`)
})