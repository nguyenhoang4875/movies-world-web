import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ComponentFactoryResolver,
} from "@angular/core";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { UserDetail } from "../../admin/user-detail.model";
import { PlaceholderDirective } from "../../shared/placeholder/placeholder.directive";
import { StaffService } from "../staff.service";
import { AlertComponent } from "src/app/shared/layout/alert/alert.component";
import { ToastShowService } from "../../shared/services/toast-show.service";
import { DataStorageService } from "../../shared/services/data-storage.service";

@Component({
  selector: "app-staff-edit",
  templateUrl: "./staff-edit.component.html",
  styleUrls: ["./staff-edit.component.css"],
})
export class StaffEditComponent implements OnInit, OnDestroy {
  id: number;
  staffs: UserDetail[] = [];
  editMode: boolean = false;

  subscription: Subscription;
  editingStaff: UserDetail = new UserDetail();
  errorMessage: string = "";

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  constructor(
    private staffService: StaffService,
    private toastService: ToastShowService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.staffs = this.staffService.getStaffs();
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      if (this.editMode) {
        //this.editingStaff = this.staffService.getStaff(this.id);
        this.dataStorageService.fetchUser(this.id).subscribe((staff) => {
          this.editingStaff = staff;
        });
      }
    });
  }

  onSaveStaff() {
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

  private updateStaff() {
    this.staffService.updateStaff(this.editingStaff).subscribe((staff) => {
      this.staffs[this.editingStaff.id - 1] = staff;
      //hostViewContainerRef.clear();
      this.router.navigate(["../../"], { relativeTo: this.route }).then(() => {
        this.toastService.onShowToasts(true);
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
      this.updateStaff();
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
      //this.newStaff();
      this.subscription = this.staffService
        .newStaff(this.editingStaff)
        .subscribe(
          (staff) => {
            this.staffs.push(staff);
            hostViewContainerRef.clear();
            this.router.navigate(["../"], { relativeTo: this.route });
            this.toastService.onShowToasts(true);
          },
          (errorMessage) => {
            hostViewContainerRef.clear();
            this.errorMessage = errorMessage;
            // this.router.navigate(["../"], { relativeTo: this.route });
            // this.toastService.onShowToasts(error);
            //this.router.navigate([""], { relativeTo: this.route });
          }
        );
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
