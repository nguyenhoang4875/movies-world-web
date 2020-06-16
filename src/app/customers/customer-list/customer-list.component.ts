import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ComponentFactoryResolver,
} from "@angular/core";
import { Subscription } from "rxjs";
import { cloneDeep } from "lodash";

import { Router, ActivatedRoute } from "@angular/router";
import { UserDetail } from "../../admin/user-detail.model";
import { CustomerService } from "../customer.service";
import { PlaceholderDirective } from "../../shared/placeholder/placeholder.directive";
import { AlertComponent } from "src/app/shared/layout/alert/alert.component";
import { ToastShowService } from "../../shared/services/toast-show.service";

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
  isSucceeding = false;
  message: string = "";

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  constructor(
    private customerService: CustomerService,
    private toastShowService: ToastShowService,
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
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
    this.toastShowService.isToastsChanged.subscribe(
      (value) => {
        this.isToastsShowing = value;
        this.isSucceeding = true;
        this.message = "Table has been updated successfully!!!";
        setTimeout(() => {
          this.isToastsShowing = false;
        }, 2000);
      },
      (error) => {
        this.isSucceeding = false;
        this.message = "Manipulation has been implement !!!";
      }
    );
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
    this.showNotification("Do you sure want to do it?", id);
  }

  showNotification(errorMessage: string, id: number) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = errorMessage;

    this.subscription = componentRef.instance.confirm.subscribe(() => {
      this.subscription.unsubscribe();
      this.customerService.deleteCustomer(id).subscribe((value) => {
        hostViewContainerRef.clear();
        this.router
          .navigate(["../../customers"], { relativeTo: this.route })
          .then(() => {
            this.toastShowService.onShowToasts(true);
          });
      });
    });

    this.subscription = componentRef.instance.close.subscribe(() => {
      // remove subscription when component removed
      this.subscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  searchCustomer() {
    //this.customerService.searchCustomer(this.search);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
