import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/Employee';
import { ShareemployeeService } from '../shared/shareemployee.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification-service.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  employees: Employee[] = [];
  
  paginatedItems:Employee[] = []; // Array to hold the current page of items
  totalItems =0; // Set total number of items
  pageSize = 5; // Default page size
  currentPage = 0; // Default current page

  constructor(private notificationService: NotificationService,private authService: AuthService,private employeeService: EmployeeService, private sharedEmployeeService: ShareemployeeService, private router: Router) {
  }

  fetchEmployee() {
    this.employeeService.getEmployees().subscribe((data: any) => {
      this.employees = data.data;
      this.totalItems = this.employees.length;
      this.paginateItems(); 
      // console.log(data);
    });
  }

  paginateItems() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedItems = this.employees.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateItems();
  }

  logout(){
    this.authService.logout();
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
      .subscribe(() => { this.fetchEmployee();
        this.notificationService.showSuccess('Employee deleted successfully!'); });
  }



}
