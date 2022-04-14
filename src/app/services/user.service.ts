import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user=new Subject<User>()
  
  constructor(private http: HttpClient) { }

  createNewUser(file:FormData) {
    return this.http.post('http://localhost:3000/users',file)
  }

  getAllUsers() {
    return this.http.get<any>('http://localhost:3000/users')}

  deleteUser(id: any) {
    return this.http.delete(`http://localhost:3000/users/${id}`)
  }

  updateUser(id: any, data: User) {
    return this.http.put(`http://localhost:3000/users/${id}`, data)
  }

  updateUserProfile(id: any, data: FormData) {
    return this.http.put(`http://localhost:3000/users/profile/${id}`, data)
  }

   sendCsvFile(fileData:any){
   return this.http.post('http://localhost:3000/files',fileData)
 }
 
}
