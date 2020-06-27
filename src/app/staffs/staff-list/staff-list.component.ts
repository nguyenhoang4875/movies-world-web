import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
} from "@angular/core";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { cloneDeep } from "lodash";

import { PlaceholderDirective } from "../../shared/placeholder/placeholder.directive";
import { StaffService } from "../staff.service";
import { UserDetail } from "src/app/admin/user-detail.model";
import { AlertComponent } from "../../shared/layout/alert/alert.component";
import { ToastShowService } from "../../shared/services/toast-show.service";

@Component({
  selector: "app-staff-list",
  templateUrl: "./staff-list.component.html",
  styleUrls: ["./staff-list.component.css"],
})
export class StaffListComponent implements OnInit {
  subscription: Subscription;
  staffs: UserDetail[] = [];
  showedStaffs: UserDetail[] = [];

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

  @ViewChild(PlaceholderDirective)
  alertHost: PlaceholderDirective;
  constructor(
    private staffService: StaffService,
    private toastShowService: ToastShowService,
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.loadStaffs();
    this.onShowToasts();
  }

  private loadStaffs() {
    this.isLoading = true;
    this.initialStaffs();
  }

  private initialStaffs() {
    this.subscription = this.staffService
      .fetchStaffs()
      .subscribe((res: UserDetail[]) => {
        this.staffs = res;
        this.separatePage(res);
      });
  }

  private onShowToasts() {
    this.subscription = this.toastShowService.isToastsChanged.subscribe(
      (value) => {
        if (typeof value === "boolean") {
          this.isToastsShowing = value;
          this.isSucceeding = true;
          this.message = "Table has been updated successfully!!!";
          setTimeout(() => {
            this.isToastsShowing = false;
          }, 2000);
        } else {
          this.isToastsShowing = true;
          this.isSucceeding = false;
          this.message = "Manipulation has been implement !!!";
          setTimeout(() => {
            this.isToastsShowing = false;
          }, 2000);
        }
      }
    );
  }

  private separatePage(staffs: UserDetail[]) {
    if (staffs) {
      this.pages = Math.ceil(staffs.length / this.numberOfPage);
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
    const temp = cloneDeep(this.staffs);

    this.showedStaffs = temp.splice(
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

  editStaff(id: number) {
    let staff = this.staffService.getStaff(id);
    this.router.navigate([id, "edit"], { relativeTo: this.route });
  }

  newStaff() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  viewStaff(id: number) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  deleteStaff(id: number) {
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
      this.staffService.deleteStaff(id).subscribe((value) => {
        hostViewContainerRef.clear();
        const index = this.showedStaffs.findIndex((_) => _.id === id);
        this.showedStaffs.splice(index, 1);
        this.staffService.onShowToasts(true);
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
