import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeService } from './employee.service';
import { EmployeeComponent } from './employee/employee.component';
import { RegistrationComponent } from './registration/registration.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { JwtInterceptor } from './auth/jwt-interceptor.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    RegistrationComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8000/api/v1'],  // Update with your backend domain
        disallowedRoutes: ['http://127.0.0.1:8000/api/new/register/']
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [EmployeeService,AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
