import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { SortSettingsModel, PageSettingsModel, DataStateChangeEventArgs, EditSettingsModel } from '@syncfusion/ej2-angular-treegrid';
import { Observable } from 'rxjs';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public sortSettings!: SortSettingsModel;
  public pageSettings!: PageSettingsModel;
  public users: any = [];
  public editSettings!: EditSettingsModel;
  public toolbar!: String[];
  public User: Observable<DataStateChangeEventArgs>;


  constructor(public userService: UserStoreService,
    private toast: HotToastService,
  ) {
    this.User = userService;
  }

  ngOnInit(): void {
    this.sortSettings = { columns: [{ field: 'firstName', direction: 'Ascending' }, { field: 'id', direction: 'Ascending' }] };
    this.pageSettings = { pageSize: 5 };

    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: "Dialog"
    }

    this.toolbar = ["Add", "Edit", "Delete", "Update", "Cancel"]
    const state: any = { skip: 0, take: 10 };
    this.userService.execute(state);

  }

  public dataStateChange(state: DataStateChangeEventArgs) {
    this.userService.execute(state);
  }
  public dataSourceChanged(dataSourceChangedEvent: any): void {
    if (dataSourceChangedEvent.action === "add") {
      this.userService.addRecord(dataSourceChangedEvent).pipe(this.toast.observe(
        {
          success: 'User Added Succcesfully',
          loading: 'Adding user...',
          error: 'There was an error'
        }
      )).subscribe(
        () => dataSourceChangedEvent.endEdit()
      )
    }
    if (dataSourceChangedEvent.action === "edit") {
      this.userService.updateRecord(dataSourceChangedEvent).pipe(this.toast.observe(
        {
          success: 'User Updated Succcesfully',
          loading: 'Updating user...',
          error: 'There was an error'
        }
      ))
        .subscribe(() => dataSourceChangedEvent.endEdit())
    }
    if (dataSourceChangedEvent.requestType === "delete") {
      this.userService.deleteRecord(dataSourceChangedEvent).pipe(this.toast.observe(
        {
          success: 'User Deleted Succcesfully',
          loading: 'Deleting user...',
          error: 'There was an error'
        }
      )).subscribe(() =>
        dataSourceChangedEvent.endEdit())
    }
  }


}
