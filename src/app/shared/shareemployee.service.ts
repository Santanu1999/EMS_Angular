import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class ShareemployeeService {
  public employee:any=null;

  private employeeSource = new BehaviorSubject(this.employee);
  currentEmp= this.employeeSource.asObservable();

  constructor() {}

  selectEmployee(employee: Employee): void {
    this.employeeSource.next(employee);
  }

  resetEmployee(): void {
    this.employeeSource.next(null);
  }
}
