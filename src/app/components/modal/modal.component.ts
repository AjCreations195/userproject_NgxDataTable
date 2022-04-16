import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Dimensions, ImageCroppedEvent } from 'ngx-image-cropper';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  genders = ['male', 'female'];
  managers: any;
  editMode = false;
  file!: File
  imageData = '';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropperVisible = false;
  fileToReturn!: File;

  @ViewChild('inputField') inputField!: ElementRef;
  @ViewChild('exampleModal') exampleModal!: ElementRef

  constructor(private userService: UserService,
    public dialogRef: MatDialogRef<ModalComponent>,
    private dialog: MatDialog,
    private toast: HotToastService,
    @Inject(MAT_DIALOG_DATA) public userData: User) { }

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    age: new FormControl(''),
    gender: new FormControl('', Validators.required),
    manager: new FormControl(''),
    company: new FormControl('', Validators.required),
    // file:new FormControl('')
  })

  ngOnInit(): void {
    if (this.userData) {
      this.editMode = true;
      this.userForm.controls['name'].setValue(this.userData.name);
      this.userForm.controls['email'].setValue(this.userData.email);
      this.userForm.controls['gender'].setValue(this.userData.gender);
      this.userForm.controls['company'].setValue(this.userData.company);
      this.userForm.controls['age'].setValue(this.userData.age);
      this.userForm.controls['manager'].setValue(this.userData.manager);
    }
    this.userService.getAllUsers().subscribe(res => {
      this.managers = res.map((i: User) => {
        return { name: i.name };
      })
    })
  }
  onSubmit() {
    const formData = new FormData()
    formData.append('name', this.userForm.get('name')?.value)
    formData.append('email', this.userForm.get('email')?.value)
    formData.append('manager', this.userForm.get('manager')?.value)
    formData.append('company', this.userForm.get('company')?.value)
    formData.append('file', this.fileToReturn)
    formData.append('age', this.userForm.get('age')?.value)
    formData.append('gender', this.userForm.get('gender')?.value)
    if (!this.userData) {
      this.userService.createNewUser(formData).pipe(this.toast.observe({
        loading: 'Adding new user...',
        success: 'User added successfully',
        error: 'There was an error'
      })).subscribe(res => {
        this.dialogRef.close('save');

      })
    } else {
      this.userService.updateUserProfile(this.userData._id, formData).pipe(this.toast.observe({
        loading: 'Updating user...',
        success: 'User updated successfully',
        error: 'There was an error'
      })).subscribe(res => {
        this.dialogRef.close('update');
      })
    }
  }
 
  onSelectedFile(event: any) {
    this.imageChangedEvent = event;
    this.cropperVisible = true;
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
      reader.readAsDataURL(this.file);

      reader.onload = () => {
        this.imageData = reader.result as string;
      };
    }
  }

  onEditImage() {
    this.inputField.nativeElement.click()
  }
  onFileSelected(event: any) { }
  imageLoaded() {
    this.cropperVisible = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }


  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64
    this.fileToReturn = this.base64ToFile(
      event.base64,
      this.imageChangedEvent.target.files[0].name,
    )
    console.log(this.fileToReturn);
    return this.fileToReturn;

  }
  base64ToFile(data: any, filename: string) {
    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  get name() {
    return this.userForm.get('name');
  }
  get company() {
    return this.userForm.get('company');
  }
  get email() {
    return this.userForm.get('email');
  }
}
