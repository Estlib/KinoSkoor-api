
const {db} = require('../db')
const Utilities = require('./Utilities')
const UUID = require('uuid')

exports.create =
async (req,res) => {
    console.log("a")
    console.log(req.body)
    // console.log(req.body.DisplayName+" "+req.body.EmailAddress+" "+req.body.FullName+" "+req.body.PlainPhoneNumber2FA+" "+req.body.PlainPassword+" ")
    if (
        !req.body.FullName ||
        !req.body.EmailAddress ||
        !req.body.PlainPassword ||
        !req.body.DisplayName 
    ){
        const bodycontent = req.body;
        var errors = "";
        switch(bodycontent) 
        {
            case !req.body.FullName:
                errors+="FullName, "                
                break;
            case !req.body.EmailAddress:
                errors+="EmailAddress, "
                break;
            case !req.body.PlainPassword:
                errors+="Password, "
                break;
            case !req.body.DisplayName:
                errors+="DisplayName, "
                break;
            default:
                break;
        }
        return res.status(400).send({error:`Missing some parameter: ${errors}`})
    }
    const newUser = {
        UserID: UUID.v7(),
        FullName: req.body.FullName,
        EmailAddress: req.body.EmailAddress,
        PasswordHASH: (await Utilities.gimmePassword(req.body.PlainPassword)).toString(),
        DisplayName: req.body.DisplayName
    }
    
        if(req.body.PhoneNumber2FA != null){
        newUser.PhoneNumber2FA = Utilities.gimmePassword(req.body.PlainPhoneNumber2FA).toString();}
    
    const resultingUser = await db.users.create(newUser);
    return res
    .location(`${Utilities.getBaseURL(req)}/users/${resultingUser.UserID}`).sendStatus(201);
}
exports.getAllUsers =
async (req,res) => {
    const users = await db.users.findAll();
    res.status(200).send(users.map(({UserID, DisplayName, IsAdmin}) => {return {UserID, DisplayName, IsAdmin }}))
    
}
exports.getByID =
async (req,res) => {
    const user = await getUser(req, res);
    if (!user) {return};
    return res.send(user);
}


const getUser =
async (req,res) => {
    const userID = req.params.UserID;
    const user = await db.users.findByPk(userID);
    if (!user) {
        res.status(404).send({error:`user by this id does not exist${userID}`})
        return null;
    }
    return user;
}
