import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  DataStateChangeEventArgs } from '@syncfusion/ej2-angular-treegrid';
import { map, Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { DataSourceChangedEventArgs } from '@syncfusion/ej2-grids';

const httpOptions = {headers: new HttpHeaders({
  "Content-type":"application/json"
})};

@Injectable({
  providedIn: 'root'
})
export class UserStoreService extends Subject<DataStateChangeEventArgs> {
  private apiUrl = "api/users";

  constructor(private http:HttpClient) {
    super()
   }

   public execute(state:any):void{
     if(state.requestType === "expand"){
       state.childDataBind()
     }
     this.getUsers(state).subscribe(x =>
      super.next(x as DataStateChangeEventArgs))
   }

   getUsers(state?:any):Observable<User[]>{
     return this.http.get<User[]>(this.apiUrl).pipe(map((response:any)=><any>{
       result:
       state.take > 0 ? response.slice(state.skip,state.take)
       :response,
       count: response.length
     }))
   }

   addRecord(dataSourceChangedEvent:DataSourceChangedEventArgs):Observable<User>{
      return this.http.post<User>(this.apiUrl, dataSourceChangedEvent.data, httpOptions)
   }
   updateRecord(dataSourceChangedEvent:DataSourceChangedEventArgs){
     console.log(dataSourceChangedEvent);
     
     return this.http.put<User>(this.apiUrl, dataSourceChangedEvent.data)
   }
   deleteRecord(dataSourceChangedEvent:any){

     const id= dataSourceChangedEvent.data[0].id
    
     const url = `${this.apiUrl}/${id}`;
     return this.http.delete(url,httpOptions)
   }
  }
