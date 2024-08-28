import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: 'employees', component: EmployeeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', redirectTo: '/employees', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
