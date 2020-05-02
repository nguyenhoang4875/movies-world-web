import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { cloneDeep } from "lodash";

import { UserInfor } from "../admin/user-infor.model";
import { CustomerService } from "./customer.service";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.css"],
})
export class CustomersComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  customers: UserInfor[] = [];
  showedCustomers: UserInfor[] = [];
  selectedCustomer: UserInfor = new UserInfor();

  search: string;
  page: number;
  pages: number;
  pagesArr: number[] = [];
  currentPage: number;
  numberOfPage = 2;

  isLoading = false;
  isShowCustomerDetail: boolean = false;
  isEditableCustomerDetail: boolean = false;
  isNewCustomer: boolean = false;
  isGoBackPage: boolean = false;
  isConfirm: boolean = false;
  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.isLoading = true;
    this.subscription = this.customerService.isGoBack.subscribe((res) => {
      this.isGoBackPage = res;
    });
    /* this.customerService.getCustomers().subscribe(
      (res) => {
        this.customers = res;
        this.pages = Math.ceil(this.customers.length / this.numberOfPage);
        for (let i = 1; i <= this.pages; i++) {
          this.pagesArr.push(i);
        }
        this.onSelectPage(1);
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    ); */

    this.customerService.customersChanged.subscribe((res: UserInfor[]) => {
      this.customers = res;

      console.log(this.customers.length);

      this.separatePage(this.customers);
    });
    this.customers = this.customerService.getCustomers();
    this.separatePage(this.customers);
  }

  private separatePage(customers: UserInfor[]) {
    if (customers) {
      this.pages = Math.ceil(customers.length / this.numberOfPage);
      for (let i = 1; i <= this.pages; i++) {
        this.pagesArr.push(i);
      }
      this.onSelectPage(1);
      this.isLoading = false;
    } else {
      this.isLoading = false;
    }
  }

  onSelectPage(page: number) {
    this.currentPage = page;
    const temp = cloneDeep(this.customers);

    this.showedCustomers = temp.splice(
      this.numberOfPage * (page - 1),
      this.numberOfPage
    );
  }

  onNextPage() {
    if (this.currentPage == this.pages) {
      return;
    }
    this.onSelectPage(this.currentPage + 1);
  }

  onPreviousPage() {
    if (this.currentPage == 1) {
      return;
    }
    this.onSelectPage(this.currentPage - 1);
  }

  editCustomer(customer: UserInfor) {
    this.isShowCustomerDetail = true;
    this.selectedCustomer = customer;
    this.isEditableCustomerDetail = true;
    this.isNewCustomer = false;
  }

  newCustomer(e) {
    this.isShowCustomerDetail = true;
    this.selectedCustomer = new UserInfor();
    this.isEditableCustomerDetail = true;
    this.isNewCustomer = true;
  }

  viewCustomer(customer: UserInfor) {
    this.isShowCustomerDetail = true;
    this.selectedCustomer = customer;
    this.isEditableCustomerDetail = false;
    this.isNewCustomer = false;
  }

  deleteCustomer(customer: UserInfor) {
    this.selectedCustomer = customer;
    this.isConfirm = true;
  }

  searchCustomer() {
    this.customerService.searchCustomer(this.search);
  }

  onGoBackCustomersPage(e) {
    this.isShowCustomerDetail = false;
  }

  onClickedConfirmDeleted() {
    this.customerService.deleteCustomer(this.selectedCustomer.id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
