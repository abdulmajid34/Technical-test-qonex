const express = require('express');
const { sequelize } = require('./models');
const app = express();
const cors = require('cors')
const PORT = 3000

// Menjalankan koneksi ke database
sequelize.authenticate()
  .then(() => {
    console.log('Database terhubung');
  })
  .catch(err => {
    console.error('Gagal terhubung ke database:', err);
  });

// Mengatur routes atau middleware di sini

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('HELLO WORLD 3')
})

app.listen(PORT, (_) => {
	console.log(`server listening on port ${PORT}`)
})

module.exports = app