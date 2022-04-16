import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Dimensions, ImageCroppedEvent } from 'ngx-image-cropper';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'src/app/models/user.model';
import { ModalComponent } from '../modal/modal.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css']
})
export class EditImageComponent implements OnInit {

  @ViewChild('inputField') inputField!: ElementRef;
  file!: File;
  profileImage = '';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropperVisible = false;
  fileToReturn!: File;
  imageData = '';
  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    private userService: UserService,
    private toast: HotToastService,
    @Inject(MAT_DIALOG_DATA) public userData: User) { }

  ngOnInit(): void {
    if (this.userData) {
      this.profileImage = this.userData.file
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

  saveImage() {
    if (this.userData) {
      const formData = new FormData()
      formData.append('name', this.userData.name)
      formData.append('email', this.userData.email!)
      formData.append('manager', this.userData.manager!)
      formData.append('company', this.userData.company)
      formData.append('file', this.fileToReturn)
      formData.append('age', this.userData.age + '')
      formData.append('gender', this.userData.gender)

      this.userService.updateUserProfile(this.userData._id, formData).pipe(this.toast.observe({
        loading: 'Updating user...',
        success: 'User updated successfully',
        error: 'There was an error'
      })).subscribe(res => {
        this.dialogRef.close('update');
      })
    }
  }

}
