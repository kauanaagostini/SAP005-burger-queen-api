require("dotenv").config();

const express = require('express');
const routes = require('./server/routes/index');
const app = express();
const port = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json')

app.use(express.json())
app.use('/api', routes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// app.get('*', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})