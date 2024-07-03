const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/user-management';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
  console.log(`Connecté à la base de données ${dbName}`);
});

module.exports = db;
