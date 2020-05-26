import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { cloneDeep } from "lodash";

import { Router, ActivatedRoute } from "@angular/router";
import { UserDetail } from "../../admin/user-detail.model";
import { CustomerService } from "../customer.service";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.css"],
})
export class CustomerListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  customers: UserDetail[] = [];
  showedCustomers: UserDetail[] = [];
  selectedCustomer: UserDetail = new UserDetail();

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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.isLoading = true;
    this.initialCustomers();
  }

  private initialCustomers() {
    this.subscription = this.customerService
      .fetchCustomers()
      .subscribe((res: UserDetail[]) => {
        this.customers = res;
        this.separatePage(res);
      });
  }

  private separatePage(customers: UserDetail[]) {
    if (customers) {
      console.log(customers);
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

  editCustomer(id: number) {
    this.router.navigate([id, "edit"], { relativeTo: this.route });
  }

  newCustomer() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  viewCustomer(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe();
  }

  onClickedConfirmDeleted() {
    this.subscription = this.customerService
      .deleteCustomer(+this.selectedCustomer.id)
      .subscribe((data) => {
        this.customers.splice(+this.selectedCustomer.id - 1, 1);
      });
  }

  searchCustomer() {
    //this.customerService.searchCustomer(this.search);
  }

  onGoBackCustomersPage(e) {
    this.isShowCustomerDetail = false;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
