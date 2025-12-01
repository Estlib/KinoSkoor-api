
const FilmsController = require("../controllers/FilmsController")

module.exports = (app) => {
    app.route("/films")
    .get(FilmsController.getAll)
}