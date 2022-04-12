import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createNewUser(data: User) {
    return this.http.post('http://localhost:3000/users', data)
  }

  getAllUsers() {
    return this.http.get<any>('http://localhost:3000/users')}

  deleteUser(id: any) {
    return this.http.delete(`http://localhost:3000/users/${id}`)
  }

  updateUser(id: any, data: User) {
    return this.http.put(`http://localhost:3000/users/${id}`, data)
  }

 
}
