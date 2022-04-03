import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { HotToastService } from '@ngneat/hot-toast'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {

  editMode = false;
  userForm!: FormGroup;
  actionBtn ='SAVE'
  genders = ['male', 'female']
  constructor(private userService: UserService,
    private toast: HotToastService,
    @Inject(MAT_DIALOG_DATA) public editData:User,
    public dialogRef: MatDialogRef<FormModalComponent>) { }
  ngOnInit(): void {
    console.log(this.editData);
    
      this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl('', Validators.required),
      gender: new FormControl('male'),
      image: new FormControl('', Validators.required)

    })

    if (this.editData) {
      this.editMode = true;
      this.actionBtn = "UPDATE"
      this.userForm.controls['firstName'].setValue(this.editData.firstName);
      this.userForm.controls['lastName'].setValue(this.editData.lastName);
      this.userForm.controls['email'].setValue(this.editData.email);
      this.userForm.controls['gender'].setValue(this.editData.gender);
      this.userForm.controls['contact'].setValue(
        this.editData.contact
      );
      this.userForm.controls['image'].setValue(this.editData.image);

    }

    
  }

  onSubmit() {
    if (!this.editData) {
      if(this.userForm.valid){
        this.userService.createNewUser(this.userForm.value).pipe(this.toast.observe({
          success: 'User Added successfully',
          loading: 'Adding new user...',
          error: ({ message }) => `${message}`,
        })).subscribe(res => {
          console.log(res);
          this.userForm.reset();
          this.dialogRef.close('save')
        })
      }
    }
    //  else {

    //     this.userService.updateUser(this.userForm.value,)
    //     // .pipe(this.toast.observe({
    //     //   success: 'User Updated successfully',
    //     //   loading: 'Updating the user...',
    //     //   error: ({ message }) => `${message}`,
    //     // }))
    //     .subscribe(res => {
    //       console.log(res);
    //       this.userForm.reset();
    //       this.dialogRef.close('update');
    //     })
      
    // }


  }


  get firstName() {
    return this.userForm.get('firstName');
  }
  get lastName() {
    return this.userForm.get('lastName');
  }
  get email() {
    return this.userForm.get('email');
  }
  get contact() {
    return this.userForm.get('contact');
  }
}
