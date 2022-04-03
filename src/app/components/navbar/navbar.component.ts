import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { MatDialog } from '@angular/material/dialog';
import { FormModalComponent } from '../form-modal/form-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService:UserService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  addUser(){
      this.dialog.open(FormModalComponent,{
       width:'50%',
      }).afterClosed().subscribe(val =>{if(val ==='save'){
        this.userService.getAllUsers()
      }})
  }
}
