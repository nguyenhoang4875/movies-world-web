import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ComponentFactoryResolver,
} from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { cloneDeep } from "lodash";
import { UserDetail } from "../../admin/user-detail.model";
import { CustomerService } from "../customer.service";
import { Subscription } from "rxjs";
import { AlertComponent } from "../../shared/layout/alert/alert.component";
import { PlaceholderDirective } from "../../shared/placeholder/placeholder.directive";
import { AuthService } from "../../auth/auth.service";
import { ToastShowService } from "../../shared/services/toast-show.service";
import { ViewContainerRef } from "@angular/core";

@Component({
  selector: "app-customer-edit",
  templateUrl: "./customer-edit.component.html",
  styleUrls: ["./customer-edit.component.css"],
})
export class CustomerEditComponent implements OnInit, OnDestroy {
  id: number;
  customers: UserDetail[] = [];
  editMode: boolean = false;

  subscription: Subscription;
  editingCustomer: UserDetail = new UserDetail();

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  hostViewContainerRef: ViewContainerRef;

  constructor(
    private customerService: CustomerService,
    private toastShowService: ToastShowService,
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.customers = this.customerService.getCustomers();
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      if (this.editMode) {
        this.editingCustomer = this.customerService.getCustomer(this.id);
      }
    });
    // this.authService.userAuth.subscribe((userAuth) => {
    //   this.editingCustomer = this.customerService.getCustomer(userAuth.id);
    //   console.log(this.editingCustomer);
    // });
  }

  onSaveCustomer() {
    const message = "Do you sure want to do it?";
    if (!this.editMode) {
      this.showNotificationNew(message);
    } else {
      this.showNotificationEdit(message);
    }
  }

  onCancel(e) {
    if (!this.editMode) {
      this.router.navigate(["../"], { relativeTo: this.route });
    } else {
      this.router.navigate(["../../"], { relativeTo: this.route });
    }
  }

  private updateCustomer() {
    this.customerService
      .updateCustomer(this.editingCustomer)
      .subscribe((cutomer) => {
        this.customers[this.editingCustomer.id - 1] = cutomer;
        this.router
          .navigate(["../../"], { relativeTo: this.route })
          .then(() => {
            this.toastShowService.onShowToasts(true);
          });
      });
  }

  private newCustomer() {
    this.customerService
      .newCustomer(this.editingCustomer)
      .subscribe((cutomer) => {
        this.customers.push(cutomer);

        this.router.navigate(["../"], { relativeTo: this.route }).then(() => {
          this.toastShowService.onShowToasts(true);
        });
      });
  }

  showNotificationEdit(errorMessage: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = errorMessage;

    this.subscription = componentRef.instance.confirm.subscribe(() => {
      this.subscription.unsubscribe();
      this.updateCustomer();
    });

    this.subscription = componentRef.instance.close.subscribe(() => {
      // remove subscription when component removed
      this.subscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  showNotificationNew(errorMessage: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = errorMessage;

    this.subscription = componentRef.instance.confirm.subscribe(() => {
      this.subscription.unsubscribe();
      this.newCustomer();
    });

    this.subscription = componentRef.instance.close.subscribe(() => {
      // remove subscription when component removed
      this.subscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  // // ngOnChanges(params: SimpleChanges) {
  // //   if (params && params.customer) {
  // //     this.editingCustomer = cloneDeep(this.customer);
  // //   }
  // // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
