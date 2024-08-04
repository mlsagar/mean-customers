import { Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './customer/customer.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "customers",
        component: CustomersComponent
    },
    {
        path: "customer/:customerId",
        component: CustomerComponent
    },
    {
        path: "**",
        component: ErrorPageComponent
    },
    {
        path: "**",
        component: ErrorPageComponent
    },
    {
        path: "**",
        component: ErrorPageComponent
    },
];
