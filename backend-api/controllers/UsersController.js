
const {db} = require('../db')
const Utilities = require('./Utilities')
const UUID = require('uuid')

exports.create =
async (req,res) => {
    console.log("a")
    console.log(req.body.DisplayName+" "+req.body.EmailAddress+" "+req.body.FullName+" "+req.body.PhoneNumber2FA+" "+req.body.PasswordHASH+" ")
    if (
        !req.body.FullName ||
        !req.body.EmailAddress ||
        !req.body.PasswordHASH ||
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
            case !req.body.PasswordHASH:
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
        PasswordHASH: (await Utilities.gimmePassword(req.body.PasswordHASH)).toString(),
        DisplayName: req.body.DisplayName
    }
    
        if(req.body.PhoneNumber2FA != null){
        newUser.PhoneNumber2FA = Utilities.gimmePassword(req.body.PhoneNumber2FA).toString();}
    
    const resultingUser = await db.users.create(newUser);
    return res
    .location(`${Utilities.getBaseURL(req)}/users/${resultingUser.UserID}`).sendStatus(201);
}
exports.getAllUsers =
async (req,res) => {
    const users = await db.users.findAll();
    res.status(200).send(users.map(({UserID, UserName, IsAdmin}) => {return {UserID, UserName, IsAdmin }}))
    
}
