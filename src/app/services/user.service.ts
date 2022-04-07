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
    return this.http.post('https://user-app-41eeb-default-rtdb.firebaseio.com/users.json', data)
  }

  getAllUsers() {
    return this.http.get<User[]>('https://user-app-41eeb-default-rtdb.firebaseio.com/users.json').pipe(
      map(responseData => {
        const postsArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key })
          }
        }
        return postsArray;
      })
    )
  }

  deleteUser(id: number) {
    return this.http.delete(`https://user-app-41eeb-default-rtdb.firebaseio.com/users/${id}.json`)
  }

  updateUser(id: any, data: User) {
    return this.http.put(`https://user-app-41eeb-default-rtdb.firebaseio.com/users/${id}.json`, data)
  }

}
