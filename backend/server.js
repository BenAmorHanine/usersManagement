const express= require('express');
const mongoose = require('mongoose');
const db = require('./dbconfig');


const app = express();
const port = process.env.PORT|| 3000 ;

app.use(express.json());
app.use(express.urlencoded({extended: false }))

// Importation des controllers
const userController = require('./controllers/userController');
const roleController = require('./controllers/roleController');
const permissionController = require('./controllers/permissionController.js');
const authController = require('./controllers/authcontroller.js');

// Importation des routes
const userRoutes = require('./routes/users');
const roleRoutes = require('./routes/roles');
const permissionRoutes = require('./routes/permissions');
const authRoutes = require('./routes/auth');

// Utilisation des routes
app.use('/api', userRoutes);
app.use('/api', roleRoutes);
app.use('/api', permissionRoutes);
app.use('/api', authRoutes);


app.get('/', (req, res) => {
    res.send('Helloooooo World!');
  });
  
  app.get('/users', userController.getAllUsers);
  app.get('/roles', roleController.getAllRoles);
  app.get('/permissions', permissionController.getAllPermissions);

  app.post('/users/createuser', userController.createUser);
  app.post('/roles/createrole', roleController.createRole);
  app.post('/permissions/createpermission', permissionController.createPermission);

  app.post('/login', authController.login);
  app.post('/signup', authController.signup);

 
  // Middleware pour gérer les routes non trouvées
  app.use((req, res, next) => {
      res.status(404).send('Page non trouvée!');
    });
  
  // Démarrage du serveur
  app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
  });
