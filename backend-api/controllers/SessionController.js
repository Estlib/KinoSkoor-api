const {db} = require("../db.js")
const Utilities = require("./Utilities.js")

exports.newSession =
async (req,res) => {
    if (!req.body.LoginEmail || !req.body.LoginPassword) 
        {
            const missingparams = "";
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
    const userToProvideSessionFor = await db.users.getByEmail(req.body.LoginEmail) //not implemented
}