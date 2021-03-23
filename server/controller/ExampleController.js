// aqui vai o código que acessa o banco de dados

const users = [
  {
    id: "1",
    name: "Kauana",
    restaurant: "teste",
    role: "salao",
    password: "123456"
  }
]

const getAllExamples = (req, res) => {
  console.log("você também pode utilizar o console para visualizar =)")
  res.send("Resquest feita")
}

const getAllUsers = (req, res) => {
  console.log("você também pode utilizar o console para visualizar =)")
  res.send(users)
}

module.exports = { getAllExamples, getAllUsers }