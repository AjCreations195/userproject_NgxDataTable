import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { HotToastModule } from '@ngneat/hot-toast';
import { EditService, FilterService, PageService, SortService, ToolbarService, TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { UserDataService } from './services/user-data.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    TreeGridModule,
    InMemoryWebApiModule.forRoot(UserDataService),
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
