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
import { DataStorageService } from "../../shared/services/data-storage.service";

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
    private dataStorageService: DataStorageService,
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
        this.dataStorageService.fetchUser(this.id).subscribe((customer) => {
          this.editingCustomer = customer;
        });
      }
    });
  }

  onSaveCustomer() {
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

  onCancel() {
    this.router.navigate(["../../"], { relativeTo: this.route });
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
