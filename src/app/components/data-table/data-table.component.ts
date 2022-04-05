
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  rows:any;
  editing : any;
  ColumnMode = ColumnMode;

  constructor(private userService:UserService,
    private dialog:MatDialog,
    private toast:HotToastService) {
    }

  ngOnInit(): void {
    this.getAllUsers()
  }
  
  getAllUsers(){
    this.userService.getAllUsers().subscribe(res=>{
      console.log(res);
      
      this.rows = res;
    })
  }

  
  onTreeAction(event: any) {
    const index = event.rowIndex;
    const row = event.row;
    if (row.treeStatus === 'collapsed') {
      row.treeStatus = 'expanded';
    } else {
      row.treeStatus = 'collapsed';
    }
    this.rows = [...this.rows];
  }

  onDelete(data:any){
    const id = data.id
    this.userService.deleteUser(id).pipe(this.toast.observe({
       loading:'Deleting user...',
       success:'User deleted successfully',
       error:'There was an error'
     })).subscribe(
      res=>{
          this.getAllUsers()
         }
     )
  }


  openModal(data:User | null){
   const dialogRef = this.dialog.open(ModalComponent,{
        width: '50%',
        data:data
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.getAllUsers();
      });
      
  }

}
