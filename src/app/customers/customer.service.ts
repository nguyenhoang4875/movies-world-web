import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { UserDetail } from "../admin/user-detail.model";
import { DataStorageService } from "../shared/services/data-storage.service";
import { tap } from "rxjs/operators";

@Injectable()
export class CustomerService {
  customers: UserDetail[] = [];
  //isToastsChanged = new BehaviorSubject<boolean>(false);

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

  getCustomers(): UserDetail[] {
    return this.customers.slice();
  }

  getCustomer(id: number): UserDetail {
    let position = this.getIndex(id);
    return this.customers[position];
  }

  getIndex(id: number): number {
    let position = 0;
    this.customers.forEach((item, index) => {
      if (item.id === id) {
        position = index;
      }
    });
    return position;
  }

  newCustomer(customer: UserDetail) {
    return this.dataStorageService.newCustomer(customer);
  }

  updateCustomer(customer: UserDetail) {
    return this.dataStorageService.updateCustomer(customer);
  }

  deleteCustomer(id: number) {
    return this.dataStorageService.deleteCustomer(id);
  }

  // onShowToasts(value: boolean) {
  //   this.isToastsChanged.next(value);
  // }

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
