
const User = require('../models/usermodel');
const validateUserData  = require('../tools/validateUserData');

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
      }

      const validationError = validateUserData({ username, email, password });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }
    const newUser = new User({ username, email, password, role });
    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès.', user: newUser });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé.' });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
// Get users with role 'dev'
exports.getDevs = async (req, res) => {
  try {
    const devs = await User.find({ role: 'dev' });
    if (devs.length === 0) {
      return res.status(404).json({ message: 'Aucun développeur trouvé.' });
    }
    res.status(200).json(devs);
  } catch (error) {
    console.error('Erreur lors de la récupération des développeurs:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
// Get users with role 'testor'
exports.getTestors = async (req, res) => {
  try {
    const devs = await User.find({ role: 'testor' });
    if (devs.length === 0) {
      return res.status(404).json({ message: 'Aucun développeur trouvé.' });
    }
    res.status(200).json(devs);
  } catch (error) {
    console.error('Erreur lors de la récupération des développeurs:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
// Get users with role 'simple-user' //msh aajebni l essm
exports.getCondidats = async (req, res) => {
  try {
    const devs = await User.find({ role: 'simple-user' });
    if (devs.length === 0) {
      return res.status(404).json({ message: 'Aucun développeur trouvé.' });
    }
    res.status(200).json(devs);
  } catch (error) {
    console.error('Erreur lors de la récupération des développeurs:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    //pour verifier la validité des données des données
    const validationError = validateUserData(user);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur par ID:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};


exports.getUserData = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the decoded token

    const user = await User.findById(userId).select('-password'); // Exclude the password field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Mettre à jour un utilisateur par ID , peut aussi changer son role 
exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, password, roleId } = req.body;
    //pour verifier la validité des données des données
    const validationError = validateUserData({ username, email, password });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, { username, email, password, role: roleId }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    res.status(200).json({ message: 'Utilisateur mis à jour avec succès.', user: updatedUser });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur par ID:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Update own data except role
exports.updateUserAccount = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the decoded token

    // Exclude the role field from the update
    const { role, ...updateData } = req.body;
    if (role) {
      return res.status(403).json({ message: 'You are not allowed to change your role.' });
    }

    const validationError = validateUserData(updateData);
if (validationError) {
  return res.status(400).json({ message: validationError });
}
/* // the hashing is in the pre('save') in the model, isnt it enough?
if (updateData.password) {
  if (updateData.password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }
  updateData.password = await bcrypt.hash(updateData.password, 10);
}*/
  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).select('-password'); // Exclude the password field from the object returned in the response

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user's role to 'dev'
exports.updateRoleToDev = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from request parameters

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    user.role = 'dev';
    await user.save();

    res.status(200).json({ message: 'Rôle mis à jour avec succès.', user: user });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rôle à "dev":', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Update user's role to 'testor'
exports.updateRoleToTestor = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from request parameters

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    
    user.role = 'testor';
    await user.save();

    res.status(200).json({ message: 'Rôle mis à jour avec succès.', user: user });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rôle à "dev":', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
// Update user's role to 'Resp-dev'
exports.updateRoleToRespDev = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from request parameters

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    
    user.role = 'Responsible-dev';
    await user.save();

    res.status(200).json({ message: 'Rôle mis à jour avec succès.', user: user });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rôle à "dev":', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
// Update user's role to 'Responsible-test'
exports.updateRoleToRespTest = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from request parameters

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    
    user.role = 'Responsible-testor';
    await user.save();

    res.status(200).json({ message: 'Rôle mis à jour avec succès.', user: user });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rôle à "dev":', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};


// Supprimer un utilisateur par ID
exports.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    
    res.status(200).json({ message: 'Utilisateur supprimé avec succès.', user: deletedUser });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur par ID:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
//findbyid et findByIdAndDelete are predefined by mongoose lib
//autreversion pour:
/*
// Delete user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from request parameters

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Perform deletion
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    res.status(200).json({ message: 'Utilisateur supprimé avec succès.', user: deletedUser });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur par ID:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
*/
// Delete own account
exports.deleteUserAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndDelete(userId);
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Change user's role from 'dev' to 'simple-user'
exports.removeWorkerFromJob = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from request parameters

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    user.role = 'simple-user';
    await user.save();

    res.status(200).json({ message: 'Le travailleur a été retiré de son poste avec succès.', user });
  } catch (error) {
    console.error('Erreur lors de la modification du rôle du travailleur :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

