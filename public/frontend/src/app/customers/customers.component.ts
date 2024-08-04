import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomersDataService } from '../customers-data.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
 
  customers: any = [];

  constructor(
    private customersDataService: CustomersDataService
  ) {}

  ngOnInit(): void {
    this.customersDataService.getAllCustomers().subscribe(response => {
      this.customers = response
    })
  }
}
