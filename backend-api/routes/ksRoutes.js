
const FilmsController = require("../controllers/FilmsController")
const UsersController = require("../controllers/UsersController")

module.exports = (app) => {
    app.route("/films")
    .get(FilmsController.getAll)
    .post(FilmsController.create)
    app.route("/films/:FilmID")
    .get(FilmsController.getByID)
    .delete(FilmsController.deleteById)
    .put(FilmsController.modifyById)
    app.route("/users")
    .get(UsersController.getAllUsers)
    .post(UsersController.create)
    app.route("/users/:UserID")
    .get(UsersController.getByID)
    app.route("/auth/:LoginEmail")
    .get(UsersController.getByEmail)

}
