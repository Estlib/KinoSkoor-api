const {db} = require("../db.js")
const Utilities = require("./Utilities.js")

exports.newSession =
async (req,res) => {
    console.log(req.body)
    if (req.body.LoginEmail === undefined || !req.body.LoginPassword === undefined) 
        {
            var missingparams = "";
            if(!req.body.LoginEmail)
                {
                    missingparams += " No email provided. ";
                }     
            if(!req.body.LoginPassword)
                {
                    missingparams +=  "No password provided. ";
                }     
        return res.status(400).send({error:"Missing parameter for logging in"+missingparams})
        }
    LoginEmail = req.body.LoginEmail
    console.log(LoginEmail)
    var userToProvideSessionFor = await db.users.findOne({where: {EmailAddress: LoginEmail}})         
    if(!userToProvideSessionFor) {
        return res.status(404).send({error:"User not found"})
    }
    //const newLoginHASH = (await Utilities.gimmePassword(LoginPassword)).toString()
    var isCorrect = (await Utilities.letMeIn(req.body.LoginPassword, userToProvideSessionFor.PasswordHASH))
    if (!isCorrect) 
    {
        return res.status(401).send({error:"Password mismatch"})
    }
    req.session.UserID = userToProvideSessionFor.UserID

    return res.status(200).send({
        UserID : userToProvideSessionFor.UserID,
        DisplayName: userToProvideSessionFor.DisplayName,
        EmailAddress: userToProvideSessionFor.EmailAddress,
        IsAdmin: userToProvideSessionFor.IsAdmin
    })
}