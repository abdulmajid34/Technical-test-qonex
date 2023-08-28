const express = require('express');
const { sequelize } = require('./models');
const app = express();
const cors = require('cors')
<<<<<<< HEAD
const PORT = process.env.PORT || 8000
const routes = require('./routes')
const erroHandler = require('./middlewares/errorHandlers')
=======
const PORT = process.env.PORT || 3000
const routes = require('./routes')
>>>>>>> de3f11c19b9a82ee96794e4f8f7d0a9150ae3b36


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

