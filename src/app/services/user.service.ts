import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

createNewUser(data:User){
  return this.http.post('http://localhost:3000/users',data)
}

  getAllUsers(){
    return this.http.get<User[]>('http://localhost:3000/users')
  }

  deleteUser(id:number){
     return this.http.delete('http://localhost:3000/users/'+id)
  }

  updateUser(id:number,data:User){
    return this.http.put('http://localhost:3000/users/'+id,data)
 }

}
