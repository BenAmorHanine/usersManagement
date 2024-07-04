const express= require('express');
const mongoose = require('mongoose');
const db = require('./dbconfig');


const app = express();
const port = process.env.PORT|| 7000 ;

app.use(express.json());
app.use(express.urlencoded({extended: false }))

// Importation des controllers
const userController = require('./controllers/userController');
const roleController = require('./controllers/roleController.js');
const permissionController = require('./controllers/permissionController.js');

// Importation des routes
const userRoutes = require('./routes/users');
const roleRoutes = require('./routes/roles');
const permissionRoutes = require('./routes/permissions');

// Utilisation des routes
app.use('/api', userRoutes);
app.use('/api', roleRoutes);
app.use('/api', permissionRoutes);


app.get('/', (req, res) => {
    res.send('Helloooooo World!');
  });
  
  app.get('/users', userController.getAllUsers);
  app.get('/roles/all', userController.getAllroles);
  app.get('/permissions/all', permissionController.getAllPermissions);

  app.post('/users/signup', userController.createUser);
  app.post('/roles/createrole', roleController.createRole);
  app.post('/permissions/createpermission', permissionController.createPermission);
 
  // Middleware pour gérer les routes non trouvées
  app.use((req, res, next) => {
      res.status(404).send('Page non trouvée!');
    });
  
  // Démarrage du serveur
  app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
  });
