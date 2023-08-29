require ("dotenv").config()
const express = require('express');
const { sequelize } = require('./models');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 4000
// const routes = require('./routes')
// const erroHandler = require('./middlewares/errorHandlers')
const { register, login, authenticate } = require('./controllers/authController')

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
// app.use(routes)
// app.use(erroHandler)

app.get('/', (req, res) => {
  res.json({ message: "HELLO WORLD HOME" })
})

app.post('/register', register)
app.post('/login', login)

app.get('/protected', authenticate, (req, res) => {
  res.json({ message: "HELLO WORLD"})
})

// app.get('/', (req, res) => {
//   res.send('HELLO WORLD 3')
// })

app.listen(PORT, (_) => {
	console.log(`server listening on port ${PORT}`)
})

