/*
export class role{
  name: string;
  constructor(nale:string){
    this.name = nale;
  }
}*/
export class User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  role: {name: string};

  constructor(id: string, username: string, email: string, role: { name: string } , date: string) {
    this._id = id;
    this.username = username;
    this.email = email;
    this.role = role;
    this.createdAt =date;
  }
}
