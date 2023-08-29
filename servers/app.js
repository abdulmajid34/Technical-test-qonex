require ("dotenv").config()
const express = require('express');
const { sequelize } = require('./models');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 4000
const routes = require('./routes')

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

app.listen(PORT, (_) => {
	console.log(`server listening on port ${PORT}`)
})