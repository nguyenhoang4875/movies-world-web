import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UserDetail } from "../../admin/user-detail.model";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  apiCustomers = "http://localhost:9000/api";

  apiMovies = "http://localhost:3000/movies";

  constructor(private httpClient: HttpClient) {}

  fetchCustomers() {
    return this.httpClient.get<UserDetail[]>(this.apiCustomers + "/users");
  }

  updateCustomer(customer: UserDetail) {
    return this.httpClient.put<UserDetail>(
      `${this.apiCustomers}/users/${customer.id}`,
      customer
    );
  }

  newCustomer(customer: UserDetail) {
    this.httpClient
      .post<UserDetail>(this.apiCustomers + "/admin/register", customer)
      .subscribe();
  }

  deleteCustomer(id: number) {
    return this.httpClient.delete(`${this.apiCustomers}/users/${id}`);
  }

  searchCustomer() {}
}
