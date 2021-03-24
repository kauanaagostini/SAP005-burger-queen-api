// aqui vai o código que acessa o banco de dados

const getAllExamples = (req, res) => {
  console.log("você também pode utilizar o console para visualizar =)")
  res.send("Resquest feita")
}

const getAllUsers = (req, res) => {
  console.log("você também pode utilizar o console para visualizar =)")
  res.send(users)
}

module.exports = { getAllExamples, getAllUsers }