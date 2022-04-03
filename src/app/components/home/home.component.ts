import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { SortSettingsModel, PageSettingsModel, DataStateChangeEventArgs, EditSettingsModel } from '@syncfusion/ej2-angular-treegrid';
import { map, Observable } from 'rxjs';
import { sampleData } from 'src/app/models/datasource';
import { User } from 'src/app/models/user.model';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';
import { FormModalComponent } from '../form-modal/form-modal.component';
import {DataSourceChangedEventArgs} from '@syncfusion/ej2-grids'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // users:User[]=[]
  public data: Object[] =[];
public sortSettings!: SortSettingsModel;
public pageSettings!: PageSettingsModel;
  public users:any=[];
  public editSettings!:EditSettingsModel;
  public toolbar!: String[];
  public User:Observable<DataStateChangeEventArgs>;


  constructor(public userService:UserStoreService,
    private router :Router,
    public dialog: MatDialog,
    private toast:HotToastService,
    ) { 
      this.User = userService;
    }

  ngOnInit(): void {
    // this.userService.getAllUsers().pipe(map((responseData:any)=>{
    //   const  usersArray =[];
    //   for(const key in responseData){
    //     if(responseData.hasOwnProperty(key)){
    //       usersArray.push({ ...responseData[key],id:key})
    //     }
    //   }
    //   return usersArray;
    // }))
    // .subscribe(res=>{
    // console.log(res);
    // this.users = res;
    // })
    // this.data = sampleData;
    this.sortSettings = { columns: [{ field: 'firstName', direction: 'Ascending' }, { field: 'id', direction: 'Ascending' }]  };
    this.pageSettings = { pageSize: 5};

    this.editSettings ={
      allowEditing:true,
      allowAdding:true,
      allowDeleting:true,
      mode:"Dialog"
    }

    this.toolbar = ["Add","Edit","Delete","Update","Cancel"]
    const state :any ={skip:0,take:10};
    this.userService.execute(state);

  }

  public dataStateChange(state:DataStateChangeEventArgs){
    this.userService.execute(state);
  }
  public dataSourceChanged(dataSourceChangedEvent:DataSourceChangedEventArgs):void{
    if(dataSourceChangedEvent.action ==="add"){
      this.userService.addRecord(dataSourceChangedEvent).subscribe(
        
      )
    }
    if(dataSourceChangedEvent.action === "edit"){
      this.userService.updateRecord(dataSourceChangedEvent)
      .subscribe(res=>{
        console.log(res);
        
        // dataSourceChangedEvent.endEdit();
      })
    }
    // if(dataSourceChangedEvent.requestType === "delete"){
    //   this.userService.deleteRecord(dataSourceChangedEvent).subscribe(()=>{
    //     dataSourceChangedEvent.endEdit;
    //   })
    // }
  }

  onEdit(user:User){
    this.dialog.open(FormModalComponent,{
      width:'50%',
   data:user
     })
  }
}
