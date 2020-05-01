import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UserInfor } from "../admin/user-infor.model";
import { Subject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class CustomerService {
  private customers: UserInfor[] = [
    new UserInfor({
      id: 1,
      username: "hang2k",
      password: "hang2k",
      fullname: "Lâm Vũ Hằng",
      email: "hang2k@gmail.com",
      phone: "09010101010",
      address: "Quảng Nam",
    }),
    new UserInfor({
      id: 2,
      username: "nhile",
      password: "nhile",
      fullname: "Lê Thị Quỳnh Nhi",
      email: "nhile@gmail.com",
      phone: "09010101010",
      address: "Huế",
    }),
    new UserInfor({
      id: 3,
      username: "trangnguyen",
      password: "trangnguyen",
      fullname: "Nguyễn Thị Thu Trang",
      email: "trangnguyen@gmail.com",
      phone: "09010101010",
      address: "Huế",
    }),
    new UserInfor({
      id: 4,
      username: "hoangnguyen",
      password: "hoangnguyen",
      fullname: "Nguyễn Văn Hoàng",
      email: "hoangnguyen@gmail.com",
      phone: "09010101010",
      address: "Hà Tĩnh",
    }),
    new UserInfor({
      id: 5,
      username: "nhinguyen",
      password: "nhinguyen",
      fullname: "Nguyễn Thị Yến Nhi",
      email: "nhinguyen@gmail.com",
      phone: "09010101010",
      address: "Huế",
    }),
  ];
  customersChanged = new Subject<UserInfor[]>();
  isGoBack = new Subject<boolean>();
  goBack: boolean = false;
  getCustomers() {
    return this.customers.slice();
  }

  newCustomer(customer: UserInfor) {
    this.customers.push(customer);
    this.customersChanged.next(this.customers.slice());
  }

  updateCustomer(customer: UserInfor) {
    const index = customer.id - 1;
    this.customers[index] = customer;
    this.customersChanged.next(this.customers.slice());
  }

  deleteCustomer(id: number) {
    this.customers.splice(id - 1, 1);
    this.customersChanged.next(this.customers.slice());
  }
  /* private customers: UserInfor[] = [];
  customersChanged = new Subject<UserInfor[]>();
  urlCustomer =
    "https://ng-web-movie-s-world-demo.firebaseio.com/customers.json";

  constructor(private http: HttpClient) {}

  storeCustomers() {
    this.http.put(this.urlCustomer, this.customers).subscribe((response) => {
      console.log(response);
    });
  }

  fetchCustomers() {
    return this.http.get<UserInfor[]>(this.urlCustomer).pipe(
      tap((response) => {
        this.setCustomers(response);
      })
    );
  }

  setCustomers(customers: UserInfor[]) {
    this.customers = customers;
    this.customersChanged.next(this.customers);
  }

  getCustomers(): Observable<UserInfor[]> {
    return this.http.get<UserInfor[]>(this.urlCustomer);
  }

  newCustomer(customer: UserInfor) {
    return this.http.post(this.urlCustomer, customer);
  }

  updateCustomer(customer: UserInfor) {
    return this.http.put(`${this.urlCustomer}/${customer.id}`, customer);
  }

  deleteCustomer(customer: UserInfor) {
    return this.http.delete(`${this.urlCustomer}/${customer.id}`);
  } */
}
