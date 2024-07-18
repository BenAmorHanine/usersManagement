declare module 'E:/usersmanagement/backend/models/usermodel.js' {
    import { Document, Schema, Model } from 'mongoose';
  
    // Déclaration de l'interface User
    export interface IUser extends Document {
      username: string;
      email: string;
      password: string;
      role: Schema.Types.ObjectId;
      createdAt: Date;
    }
  
    // Déclaration du modèle User
    const User: Model<IUser>;
    export default User;
  }
  