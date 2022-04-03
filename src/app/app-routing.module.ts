import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormModalComponent } from './components/form-modal/form-modal.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
