import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  treeStatuss=['disabled','collapsed'];
  genders=['male','female'];
  editMode=false;
  constructor(private userService:UserService,
    public dialogRef: MatDialogRef<ModalComponent>,
    private toast:HotToastService,
    @Inject(MAT_DIALOG_DATA) public userData: User) { }

  userForm = new FormGroup({
    id:new FormControl(null,[Validators.required,Validators.pattern(`^[1-9][0-9]*$`)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    name:new FormControl('',Validators.required),
    age:new FormControl(null),
    gender:new FormControl('male'),
    manager:new FormControl(''),
    company:new FormControl('',Validators.required),
    treeStatus:new FormControl('',Validators.required),
 
  })
 
  ngOnInit(): void {
    
      if (this.userData) {
        this.editMode = true;
        this.userForm.controls['id'].setValue(this.userData.id);
        this.userForm.controls['name'].setValue(this.userData.name);
        this.userForm.controls['email'].setValue(this.userData.email);
        this.userForm.controls['gender'].setValue(this.userData.gender);
        this.userForm.controls['company'].setValue(this.userData.company);
        this.userForm.controls['manager'].setValue(
          this.userData.manager
        );
        this.userForm.controls['treeStatus'].setValue(this.userData.treeStatus); 
        this.userForm.controls['age'].setValue(this.userData.age);
        this.userForm.controls['manager'].setValue(this.userData.manager);
   
   
    }
  }

  onSubmit(){
    if(!this.userData){
    console.log(this.userForm.value);
    this.userService.createNewUser(this.userForm.value).pipe(this.toast.observe({
      loading:'Adding new user...',
      success:'User added successfully',
      error:'There was an error'
    })).subscribe(res=>{
      this.dialogRef.close('save');
      
    })
  }else{
    this.userService.updateUser(this.userForm.controls['id'].value,this.userForm.value).pipe(this.toast.observe({
      loading:'Updating user...',
      success:'User updated successfully',
      error:'There was an error'
    })).subscribe(res=>{
      this.dialogRef.close('update');
  })
}
    
  }
  get id(){
    return this.userForm.get('id');
  }
  get name(){
    return this.userForm.get('name');
  }
  get company(){
    return this.userForm.get('company');
  }
  get treeStatus(){
    return this.userForm.get('treeStatus');
  }
  get email(){
    return this.userForm.get('email');
  }
}
