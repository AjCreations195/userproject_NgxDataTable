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
}

