const express= require('express');
const mongoose = require('mongoose');
const db = require('./dbconfig');
const cors =require ('cors');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT|| 3000 ;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
//app.use(express.urlencoded({extended: false }));
/*Header('Access-Control-Allow-Origin:  *');
Header('Access-Control-Allow-Methods:  GET, POST, PUT, DELETE, OPTIONS');
Header('Access-Control-Allow-Headers:  Content-Type, Authorization, X-Requested-With, x-Auth-Token, Origin');
*/
// Importation des controllers
const userController = require('./controllers/userController');
const roleController = require('./controllers/roleController');
const authController = require('./controllers/authcontroller.js');
const authMiddleware = require('./tools/authMiddleware.js')

// Importation des routes
const userRoutes = require('./routes/users');
const roleRoutes = require('./routes/roles');
const authRoutes = require('./routes/auth');
const todoRoutes= require('./routes/todo.js');

// Utilisation des routes
app.use('/', userRoutes);
app.use('/', roleRoutes);
app.use('/', authRoutes);
app.use('/', todoRoutes);


app.get('/', (req, res) => {
    res.send('Helloooooo World!');
  });
  
 // app.get('/users', userController.getAllUsers);
  app.get('/roles', roleController.getAllRoles);
  //app.get('/users/{id}',userController.getUserById(id));
  

  app.post('/users/createuser', userController.createUser);
  app.post('/roles/createrole', roleController.createRole);

  app.post('/login', authController.login);
  app.post('/signup', authController.signup);

  app.get('/profile', authMiddleware.protect, userController.getUserData);
  
//app.get('/users/all',authMiddleware.protect,authMiddleware.restrictTo('admin'), userController.getAllUsers);

 
  // Middleware pour gérer les routes non trouvées
  app.use((req, res, next) => {
      res.status(404).send('Page non trouvée!');
    });
  
  // Démarrage du serveur
  app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
  });
