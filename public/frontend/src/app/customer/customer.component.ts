import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersDataService } from '../customers-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{
  customerId = ""
  customer: any;
  constructor(
    private _customersDataService: CustomersDataService,
    private _route: ActivatedRoute
  ) {
    this.customerId = this._route.snapshot.params["customerId"];
  }

  ngOnInit() {
    this._customersDataService.getOneCustomer(this.customerId).subscribe(response => {
      this.customer = response
    })
  }

  updateStatus() {
    this.customer.activeStatus = String(!this.customer.activeStatus);
    this._customersDataService.partialUpdateCustomer(this.customerId, this.customer).subscribe(response => {
      console.log(response)  
    })
  }
}
