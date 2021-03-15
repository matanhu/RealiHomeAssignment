import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';

const routes: Routes = [
  {path: '', component: DashboardPageComponent},
  {path: 'create', component: CreatePageComponent},
  {path: 'edit/:id', component: EditPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
