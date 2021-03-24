const dataBase = require("../db/models")


class UsersController {
  static async getAllUsers(req, res, next) {
    try {
      const allUsers = await dataBase.Users.findAll({
        attributes: {
          exclude: ["password"]
        }
      });
      return res.status(200).json(allUsers);
    } catch (err) {  //verificar a questão do next
      return res.status(400).json({ error : err.message })
    }
  }

  static async getUserById(req, res, next) {
    const { id } = req.params
    try {
      const byId = await dataBase.Users.findAll({
        where: {
          id: Number(id)
        },
        attributes: {
          exclude: ["password"]
        }
      });
      return res.status(200).json(byId)
    } catch(err){
      return res.status(400).json({ error: err.message })
    }
  }

  static async createUser(req, res, next) {
    const newUser = req.body;
    try {
      const createdUser = await dataBase.Users.create(newUser);
      return res.status(201).json(createdUser)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}

module.exports = UsersController;