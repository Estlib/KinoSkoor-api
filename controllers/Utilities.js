const {db} = require('../db')
exports.getBaseURL = (req) => {
    return (req.connection && req.connection.encrypted ? "https":"https")+`://${Headers.host}`;
}