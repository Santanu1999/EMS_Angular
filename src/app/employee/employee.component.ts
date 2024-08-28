import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/Employee';
import { ShareemployeeService } from '../shared/shareemployee.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  employees: Employee[] = [];


  constructor(private employeeService: EmployeeService, private sharedEmployeeService: ShareemployeeService, private router: Router) {
  }

  fetchEmployee() {
    this.employeeService.getEmployees().subscribe((data: any) => {
      this.employees = data.data;
      // console.log(data);
    });
  }

  ngOnInit(): void {
    this.fetchEmployee();
  }

  editEmployee(employee: Employee): void {
    this.sharedEmployeeService.selectEmployee(employee);
    this.router.navigate(['/registration']);
  }

  deleteEmployee(id: any): void {
    this.employeeService.deleteEmployee(id)
      .subscribe(() => { this.fetchEmployee() });
  }



}
