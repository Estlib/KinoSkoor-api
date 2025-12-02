
const {db} = require('../db')
const Utilities = require('./Utilities')
const UUID = require('uuid')

exports.getAll =
async (req,res) => {
    const films = await db.films.findAll();
    console.log("getAll: "+films )
    res
    .status(200)
    .send(films.map(({FilmID,Name}) => {return{FilmID,Name}}))
}

exports.getByID =
async (req, res) => {
    const film = await getFilm(req, res);
    if (!film) 
        {return res.status(404).send({error: 'Film not found'})}
    return res.status(200).send(film)
}

const getFilm =
async (req, res) => {
    const idNumber = req.params.FilmID;
    console.log(idNumber)
    // if(!idNumber) {
    //     res.status(400).send({error:`Entered id is not valid ${idNumber}`})
    //     return null;
    // }    
    // if(isNaN(idNumber)) {
    //     res.status(400).send({error:`Entered id is not valid ${idNumber}`})
    //     return null;
    // }
    // if(UUID.validate(idNumber) !== true) {
    //     res.status(400).send({error:`Entered id is not valid ${idNumber}`})
    //     return null;
    // }
    const film = await db.films.findByPk(idNumber);
    if(!film) {
        res.status(404).send({error: `Film with this id was not found ${idNumber}`})
        return null;
    }
    return film;
}