const express = require('express');
const { sequelize } = require('./models');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 8000
const routes = require('./routes')
const erroHandler = require('./middlewares/errorHandlers')


sequelize.authenticate()
  .then(() => {
    console.log('Database terhubung');
  })
  .catch(err => {
    console.error('Gagal terhubung ke database:', err);
  });



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.use(erroHandler)

app.get('/', (req, res) => {
  res.send('HELLO WORLD 3')
})

app.listen(PORT, (_) => {
	console.log(`server listening on port ${PORT}`)
})

module.exports = app
