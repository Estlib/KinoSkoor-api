
require('dotenv').config();
const port = process.env.PORT || 8080;
const host = 'localhost';
const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session') // lisasin exprtess sessioni

const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDocument = yamljs.load('./docs/swagger.yaml')
//const swaggerDocument = require('./docs/swagger.json')

const { sync, sessionStore } = require("./db") //lisa sessionStore
app.use(cors());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.json());
//sessioni sisu
app.use(session({
    secret: process.env.SESSIONSECRET || "dev",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 7*24*60*60*1000
    }
}))
sessionStore.sync(); //sünkroniseeri tabel


require("./routes/ksRoutes.js")(app)

app.listen(port, async () => {
    if (process.env.SYNC === 'true') {await sync();}
    console.log(`API on aadressil: http://${host}:${port}`)
})