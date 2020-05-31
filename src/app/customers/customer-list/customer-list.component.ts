import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  AfterViewChecked,
  AfterContentChecked,
  DoCheck,
} from "@angular/core";
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

  search: string;
  page: number;
  pages: number;
  pagesArr: number[] = [];
  currentPage: number;
  numberOfPage = 5;

  isLoading = false;
  isToastsShowing = false;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadCustomers();
    this.onShowToasts();
  }

  private loadCustomers() {
    this.isLoading = true;
    this.initialCustomers();
  }

  private initialCustomers() {
    this.subscription = this.customerService
      .fetchCustomers()
      .subscribe((res: UserDetail[]) => {
        this.customers = res;
        console.log(this.customers);
        this.separatePage(res);
      });
  }

  private onShowToasts() {
    this.customerService.isToastsChanged.subscribe((value) => {
      this.isToastsShowing = value;
      setTimeout(() => {
        this.isToastsShowing = false;
      }, 2000);
    });
  }

  private separatePage(customers: UserDetail[]) {
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

  editCustomer(id: number) {
    let customer = this.customerService.getCustomer(id);
    console.log(customer);
    this.router.navigate([id, "edit"], { relativeTo: this.route });
  }

  newCustomer() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  viewCustomer(id: number) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  deleteCustomer(id: number) {
    this.subscription = this.customerService.deleteCustomer(id).subscribe();
  }

  searchCustomer() {
    //this.customerService.searchCustomer(this.search);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
