import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomersDataService {
  baseUrl = "http://localhost:3000/api"
  constructor(
    private _http: HttpClient
  ) { }

  getAllCustomers() {
    return this._http.get<any>(this.baseUrl + "/customers")
  }

  getOneCustomer(customerId: string) {
    return this._http.get<any>(this.baseUrl + "/customers/" + customerId);
  }

  addCustomer(request: any){
    return this._http.post<any>(this.baseUrl + "/customers", request)
  }

  partialUpdateCustomer(customerId: string, request: any) {
    return this._http.patch<any>(this.baseUrl + "/customers/" + customerId, request);
  }
}
