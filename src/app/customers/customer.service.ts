import { Injectable, OnDestroy } from "@angular/core";
import { Subject, Subscription } from "rxjs";

import { UserDetail } from "../admin/user-detail.model";
import { DataStorageService } from "../shared/services/data-storage.service";
import { tap } from "rxjs/operators";

@Injectable()
export class CustomerService {
  customers: UserDetail[] = [];
  subscription: Subscription;
  customersChanged = new Subject<UserDetail[]>();
  isGoBack = new Subject<boolean>();
  goBack: boolean = false;

  constructor(private dataStorageService: DataStorageService) {}

  fetchCustomers() {
    return this.dataStorageService.fetchCustomers().pipe(
      tap((customers) => {
        this.setCustomers(customers);
      })
    );
  }

  setCustomers(customers: UserDetail[]) {
    this.customers = customers;
  }

  getCustomers() {
    return this.customers.slice();
  }

  getCustomer(id: number) {
    return this.customers[id - 1];
  }

  newCustomer(customer: UserDetail) {
    this.dataStorageService.newCustomer(customer);
  }

  updateCustomer(customer: UserDetail) {
    return this.dataStorageService.updateCustomer(customer);
  }

  deleteCustomer(id: number) {
    return this.dataStorageService.deleteCustomer(id);
  }

  // searchCustomer(value: string) {
  //   let filterCustomers: UserDetail[] = [];
  //   if (!value) {
  //     this.customersChanged.next(this.customers.slice());
  //   } else {
  //     if (value) {
  //       for (let i = 0; i < this.customers.length; i++) {
  //         if (
  //           this.customers[i].username === value ||
  //           this.customers[i].fullName.toLowerCase() === value ||
  //           this.customers[i].email === value ||
  //           this.customers[i].phone === value ||
  //           this.customers[i].address.toLowerCase() === value
  //         ) {
  //           filterCustomers.push(this.customers[i]);
  //         }
  //       }
  //     }
  //     this.customersChanged.next(filterCustomers);
  //   }
  // }
}
