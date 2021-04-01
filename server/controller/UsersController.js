const dataBase = require("../db/models")


class UsersController {
  static async getAllUsers(req, res) {
    try {
      const allUsers = await dataBase.Users.findAll({
        order: [["id", "ASC"]],
        attributes: {
          exclude: ["password"]
        }
      });
      return res.status(200).json(allUsers);
    } catch (err) {
      return res.status(400).json({ error : err.message })
    }
  }

  static async getUserById(req, res) {
    const { id } = req.params

    const handleValidateUser = await dataBase.Users.findByPk(id);
    if(!handleValidateUser){
      return res.status(404).json({ status: `Úsuario não existe. ID informado ${id}`})
    }

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

  static async createUser(req, res) {
    const { name, email, password, role, restaurant } = req.body;

    if( name.length < 1 || email.length < 1 || password.length < 1 || role.length < 1 || restaurant.length < 1){
      return res.status(400).json({ status: "Campos de preenchimento obrigatório vazios." })
    }

    try {
      const createdUser = await dataBase.Users.findOrCreate({
        where: { email },
        defaults: { name, email, password, role, restaurant },
      });

      const newUser = createdUser[1]

      if(!newUser) {
        return res.status(400).json({ status: "O e-mail informado já está registrado." })
      }

      return res.status(201).json({ status: "Usuário criado com sucesso."})
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  static async updateUser(req, res) {
    const { id } = req.params
    const { name, password, role, email, restaurant } = req.body

    if(email != undefined || restaurant != undefined) {
      return res.status(400).json({ status: "Os parametros: e-mail e restaurant não podem ser alterados."})
    }

    try {
      const updatedUser = await dataBase.Users.update(
        { name, password, role }, {
        where: {
          id: Number(id)
        }
      });
      return res.status(201).json({ status: "Usuário alterado com sucesso"})
    } catch(err) {
      return res.status(400).json({ error: err.message })
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params
    try {
      const deletedUser =  await dataBase.Users.destroy({
        where: {
          id: Number(id)
        }
      });
      return res.status(201).json({ status: "Usuário deletado com sucesso"})
    } catch(err) {
      return res.status(400).json({ error: err.message })
    }
  }

}

module.exports = UsersController;