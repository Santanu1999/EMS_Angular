import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './models/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get(this.apiUrl+"getAllEmployees/");
  }

  createEmployee(employee: Employee) {
    return this.http.post(this.apiUrl+"createEmployee/", employee);
  }

  updateEmployee(id: any, employee: Employee) {
    return this.http.put(this.apiUrl+"updateEmployee/"+id, employee);
  }


  deleteEmployee(id: any) {
    return this.http.delete(this.apiUrl+"deleteEmployee/"+id);
  }
}
