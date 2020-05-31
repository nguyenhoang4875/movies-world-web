import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
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

  constructor(
    private customerService: CustomerService,
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
        console.log(this.editingCustomer);
      }
    });
    // this.authService.userAuth.subscribe((userAuth) => {
    //   this.editingCustomer = this.customerService.getCustomer(userAuth.id);
    //   console.log(this.editingCustomer);
    // });
  }

  onSaveCustomer() {
    if (!this.editMode) {
      this.customerService.newCustomer(this.editingCustomer);
      this.router.navigate(["../"], { relativeTo: this.route });
    } else {
      this.showNotification("Do you sure want to do it?");
    }
  }

  onCancel(e) {
    if (!this.editMode) {
      this.router.navigate(["../"], { relativeTo: this.route });
    } else {
      this.router.navigate(["../../"], { relativeTo: this.route });
    }
  }

  showNotification(errorMessage: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = errorMessage;

    this.subscription = componentRef.instance.confirm.subscribe(() => {
      this.subscription.unsubscribe();
      this.customerService
        .updateCustomer(this.editingCustomer)
        .subscribe((cutomer) => {
          this.customers[this.editingCustomer.id - 1] = cutomer;
          hostViewContainerRef.clear();
          this.router
            .navigate(["../../"], { relativeTo: this.route })
            .then(() => {});
          this.customerService.onShowToasts(true);
        });
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

  // saveCustomer(e) {
  //   if (this.customer && this.customer.id) {
  //     // update
  //     this.isConfirm = true;
  //   } else {
  //     // new
  //     this.customerService
  //       .newCustomer(this.editingCustomer)
  //       .subscribe((customer) => {
  //         console.log(customer);
  //          this.customers.push(customer);
  //       });
  //     this.router.navigate(["../"], { relativeTo: this.route });
  //   }
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
