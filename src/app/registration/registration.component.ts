import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/Employee';
import { ShareemployeeService } from '../shared/shareemployee.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit , OnDestroy{
  employeeForm: FormGroup;
  employees: Employee[] = [];

  constructor(private authService: AuthService,private fb: FormBuilder, private employeeService: EmployeeService, private sharedEmployeeService: ShareemployeeService) {
    this.employeeForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      department: [''],
      date_joined: ['']
    });
  }

  ngOnInit(): void {
   this.sharedEmployeeService.currentEmp.subscribe(employee => {
      console.log(employee);
      this.employeeForm.patchValue(employee);
      this.selectEmployee(employee);
    });
  }

  selectedEmployee: Employee | null = null;

  logout(){
    this.authService.logout();
  }

  onSubmit(): void {
    if (this.selectedEmployee) {
      this.updateEmployee();
    } else {
      this.createEmployee();
    }
  }

  createEmployee(): void {
    const newEmployee: Employee = this.employeeForm.value;
    this.employeeService.createEmployee(newEmployee)
      .subscribe(employee => {
        this.employees.push(employee);
        this.employeeForm.reset();
      });
  }

  updateEmployee(): void {
    if (this.selectedEmployee) {
      const updatedEmployee: Employee = { ...this.selectedEmployee, ...this.employeeForm.value };
      this.employeeService.updateEmployee(updatedEmployee.id!, updatedEmployee)
        .subscribe((employee: any) => {
          this.employees = this.employees.map(emp => emp.id === employee.id ? employee : emp);
          this.selectedEmployee = null;
          this.employeeForm.reset();
        });
    }
  }

  selectEmployee(employee: Employee): void {
    this.selectedEmployee = employee;
  }
  ngOnDestroy() {
    this.sharedEmployeeService.resetEmployee();
  }

  cancelEdit(): void {
    this.selectedEmployee = null;
    this.employeeForm.reset();
  }

}
