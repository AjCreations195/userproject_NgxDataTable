import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog'
import {MatRadioModule} from '@angular/material/radio'
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotToastModule } from '@ngneat/hot-toast';
import { EditService, FilterService, PageService, SortService, ToolbarService, TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataTableComponent } from './components/data-table/data-table.component'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DataTableComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,
    TreeGridModule,
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      }
    }),
    // InMemoryWebApiModule.forRoot(UserDataService),
    HotToastModule.forRoot()
  ],
  providers: [
    PageService,
                SortService,
                FilterService,
                EditService,
                ToolbarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
