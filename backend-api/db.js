
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USERNAME,
    process.env.DB_USERPASS,
    {
        host: process.env.DB_HOSTNAME,
        dialect: 'mariadb',
        logging: console.log,
    }
)

async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully, yippie!');
    } catch (error) {
        console.error("Unable to connect. " + error);
    }
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.films = require("./models/Film.js")(sequelize,DataTypes);
db.users = require("./models/User.js")(sequelize,DataTypes);
db.orders = require("./models/Order.js")(sequelize, DataTypes, db.films, db.users)

db.films.belongsToMany(db.users, {through: db.orders, as: "OrderedFilms"})
db.users.belongsToMany(db.films, {through: db.orders })

const sync = (async ()=> {
    await sequelize.sync({alter: true});
    console.log('DB sync has been completed.');
})

module.exports = {db, sync};