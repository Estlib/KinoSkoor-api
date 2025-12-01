
const FilmsController = require("../controllers/FilmsController")

module.exports = (app) => {
    app.route("/films")
    .get(FilmsController.getAll)
    app.route("/films/:FilmID")
    .get(FilmsController.getByID)
}