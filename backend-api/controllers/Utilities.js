
const {db} = require('../db')
const bcrypt = require('bcrypt')

exports.getBaseURL = (req) => {
    return (req.connection && req.connection.encrypted ? "https":"https")+`://${Headers.host}`;
}

exports.gimmePassword = async (passwordInTXT) => {
    const saltRounds = 10;
    const newPassword = await bcrypt.hash(passwordInTXT,saltRounds)
    return newPassword;
}

exports.letMeIn = async (givenPassword, givenHASH) => {
    const match = await bcrypt.compare(givenPassword, givenHASH);
    return match;
}