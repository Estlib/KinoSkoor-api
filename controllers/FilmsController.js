//
const {db} = require('../db')
const Utilities = require('./Utilities')

exports.getAll =
async (req,res) => {
    const films = await db.films.findAll();
    console.log("getAll: "+films )
    res
    .status(200)
    .send(films.map(({FilmID,Name}) => {return{FilmID,Name}}))
}
