import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { FormModalComponent } from '../components/form-modal/form-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  users:User[]=[]
  selectedIndex!:number;
  constructor(private http:HttpClient,
    public dialog: MatDialog) { }

  getAllUsers(){
    return this.http.get('https://user-app-41eeb-default-rtdb.firebaseio.com/users.json')
  }
  createNewUser(user:User){
    return this.http.post('https://user-app-41eeb-default-rtdb.firebaseio.com/users.json',user)
  }


  updateUser(user:User,index:number){
    return this.http.put<User>('http://localhost:3000/users/'+index,user)
  }

  deleteUser(index:number){
      return this.http.delete<User>('http://localhost:3000/users/'+index)
  }

 
  openModal(user: User): void {
    this.dialog.open(FormModalComponent,{
     width:'50%',
  data:user
    })
  }

}
