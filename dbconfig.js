const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/user-management';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
  console.log(`Connecté à la base de données `);
});

console.log('hey1');


module.exports = db;


console.log('hey');

