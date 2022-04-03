import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService implements InMemoryDbService {

  constructor() { }

  createDb(){
    const users: User[]=[
      {id:1,
      firstName:'Dane',
      lastName:'Smith',
      email:'dane@gmail.com',
      gender:'male',
      contact:6464678,
      image:'jjsj',
      isParent:true,
      parentId:null
    },
    {id:2,
      firstName:'John',
      lastName:'Mia',
      email:'john@gmail.com',
      gender:'male',
      contact:6464678,
      image:'jjsj',
      isParent:false,
      parentId:1
    },
    {id:3,
      firstName:'jaf',
      lastName:'na',
      email:'jafna@gmail.com',
      gender:'female',
      contact:6464678,
      image:'jjsj',
      isParent:false,
      parentId:4
    },
    {id:4,
      firstName:'jas',
      lastName:'raa',
      email:'jas@gmail.com',
      gender:'female',
      contact:336464678,
      image:'jjsj',
      isParent:true,
      parentId:null
    }
    ]

    return { users};
  }
}
