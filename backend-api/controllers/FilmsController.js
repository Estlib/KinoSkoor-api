
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

exports.create =
async (req,res) => {
    if (
        !req.body.Name ||
        !req.body.Description ||
        !req.body.RunTime ||
        !req.body.ReleaseYear ||
        !req.body.Language
    ){
        return res.status(400).send({error:'Missing some parameter, please review your request data.'})
    }
    const newFilm = {
        FilmID: UUID.v7(),
        Name: req.body.Name,
        Description: req.body.Description,
        RunTime: req.body.RunTime,
        ReleaseYear: req.body.ReleaseYear,
        Language: req.body.Language,
    }
    
    const createdFilm = await db.films.create(newFilm);
    return res
    .location(`${Utilities.getBaseURL(req)}/films/${createdFilm.FilmID}`).sendStatus(201);
}

exports.deleteById =
async (req,res) => {
    const filmToBeDeleted = await getFilm(req,res);
    if(!filmToBeDeleted) 
    {
        return;
    }
    await filmToBeDeleted.destroy();
    res.status(204).send({error:"No Content"})
}

exports.modifyById =
async (req, res) => {
    const filmToBeChanged = await getFilm(req,res);
    if(!filmToBeChanged) {
        return;
    }
    if (
        !req.body.Name ||
        !req.body.Description ||
        !req.body.RunTime ||
        !req.body.ReleaseYear ||
        !req.body.Language
    ){
        return res.status(400).send({error:'Missing some parameter, please review your request data.'})
    }
    filmToBeChanged.Name = req.body.Name;
    filmToBeChanged.NameDescription = req.body.Description;
    filmToBeChanged.NameRunTime = req.body.RunTime;
    filmToBeChanged.NameReleaseYear = req.body.ReleaseYear;
    filmToBeChanged.NameLanguage = req.body.Language;
    await filmToBeChanged.save();
    return res
    .location(`${Utilities.getBaseURL(req)}/films/${filmToBeChanged.FilmID}`).sendStatus(201)
    .send(filmToBeChanged);
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