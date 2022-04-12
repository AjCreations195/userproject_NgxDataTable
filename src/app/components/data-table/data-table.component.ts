
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Dimensions, ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  rows: any;
  ColumnMode = ColumnMode;
  draggedOverIndex!: number;
  private draggedIndex!: number;
  selectedItem!: User;
  editable = {
    rowIndex: -1,
    editing: false,
    name: ''
  }
  outdentParent = ''
  intendParent = ''
  canIntend!: boolean;
  canOutdend!: boolean;
  SelectionType = SelectionType;
  selected = [];
  userId:string | undefined;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropperVisible = false;
  fileToReturn!:File;

  @ViewChild('mydatatable') mydatatable!: DatatableComponent;
  @ViewChild('inputField') inputField!: ElementRef;
  constructor(private userService: UserService,
    private dialog: MatDialog,
    private toast: HotToastService) {
  }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(res => {
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

  onDelete(data: any) {
    const id = data._id
    this.userService.deleteUser(id).pipe(this.toast.observe({
      loading: 'Deleting user...',
      success: 'User deleted successfully',
      error: 'There was an error'
    })).subscribe(
      res => {
        console.log("deleted");
        
        this.getAllUsers()
      }
    )
  }


  openModal(data: User | null) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '50%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUsers();
    });

  }

  allowDrop(event: any, index: number): void {
    this.draggedOverIndex = index;
    event.preventDefault();
  }

  onDragStart(index: number, row: User): void {
    this.draggedIndex = index;
    this.selectedItem = row;

  }

  onDrop(event: any, index: number, row: User): void {

    event.preventDefault();
    const manager = row.name

    if (manager != this.selectedItem.name) {
      const user = {
        name: this.selectedItem.name,
        email: this.selectedItem.email,
        gender: this.selectedItem.gender,
        manager: manager,
        company: this.selectedItem.company,
        age: this.selectedItem.age,
      }
      this.userService.updateUser(this.selectedItem._id, user).pipe(this.toast.observe({
        loading: 'User updating...',
        success: 'Updated successfully',
        error: 'Something went wrong'
      })).subscribe(res => {
        this.getAllUsers();

      })
    }
  }

  updateValue(event: any, cell: string, row: User) {
    this.editable.editing = false
    const index = this.rows.indexOf(row);
    this.rows[index][cell] = event.target.value;
    this.rows = [...this.rows];
    this.userService.updateUser(row._id,this.rows[index]).pipe(this.toast.observe({
      loading: 'Updating user...',
      success: 'User updated successfully',
      error: 'There was an error'
    })).subscribe(res => {
      this.getAllUsers()
      this.editable = { rowIndex: -1, editing: false, name: '' }
    })
  }

   onEdit(row: User, name: string) {
    this.editable.editing = true;
    const index = this.rows.indexOf(row);
    this.editable.rowIndex = index;
    this.editable.name = name
  }

  onSelect(event: { selected: [] }) {
   const index = this.rows.indexOf(this.selected[0]);
    console.log(index);
    if (this.selected[0]['level'] == 0) {
      this.canIntend = false;
      this.canOutdend = false;
    }
    if (this.selected[0]['level'] > 0) {
      this.canOutdend = true;
      this.canIntend = false
      if (index > 0) {
        for (let i = index - 1; i >= 0; i--) {
          if (this.rows[i].manager == this.rows[index].manager) {
            this.canIntend = true;
            this.intendParent = this.rows[i].name;
            break;
          }
        }
        console.log(this.intendParent);

      } else {
        this.canIntend = false;
      }
    }

  }

  onOutdend() {
    if (this.selected) {
      const id = this.selected[0]['_id'];
      if (this.selected[0]['level'] >= 1) {
        const item1 = this.rows.find((i: User) => i.name === this.selected[0]['manager'])
        this.outdentParent = item1.manager;
      }
      this.doIntendOrOutdent(this.outdentParent)

    }
  }

  onIntend() {
    if (this.selected) {
      this.doIntendOrOutdent(this.intendParent)
    }
  }
  private doIntendOrOutdent(parent:string) {
    const id = this.selected[0]['_id'];
    const user = {
      name: this.selected[0]['name'],
      email: this.selected[0]['email'],
      gender: this.selected[0]['gender'],
      manager: parent,
      company: this.selected[0]['company'],
      age: this.selected[0]['age'],
    }
    this.userService.updateUser(id, user).pipe(this.toast.observe({
      loading: 'User updating...',
      success: 'Updated successfully',
      error: 'Something went wrong'
    })).subscribe(res => {
      this.canIntend = false;
      this.canOutdend = false;
      this.getAllUsers();

    })
  }

  fileChangeEvent(event: any,user:User): void {
    this.imageChangedEvent = event;
    this.cropperVisible = true;
    this.userId = user._id
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

  onSaveImage() {
console.log(this.fileToReturn);

  }
}
