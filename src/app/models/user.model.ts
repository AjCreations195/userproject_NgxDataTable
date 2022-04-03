export class User {
  id?:number;
  firstName!: string;
  lastName!: string;
  email!: string;
  gender!: string;
  contact!: number;
  image!: string;
  isParent!: boolean;
  parentId!: number |null;

  // constructor(
  //   id:number,
  //   f_Name: string,
  //   l_Name: string,
  //   email: string,
  //   gender: string,
  //   number: number,
  //   image: string,
  //   subUsers:User
  // ) {
  //   this.id =id;
  //   this.firstName = f_Name;
  //   this.lastName = l_Name;
  //   this.email = email;
  //   this.gender = gender;
  //   this.contact = number;
  //   this.image = image;
  //   this.subUsers= subUsers;
  // }
}

