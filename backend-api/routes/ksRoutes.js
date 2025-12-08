
const FilmsController = require("../controllers/FilmsController")

module.exports = (app) => {
    app.route("/films")
    .get(FilmsController.getAll)
    .post(FilmsController.create)
    app.route("/films/:FilmID")
    .get(FilmsController.getByID)
    .delete(FilmsController.deleteById)
}