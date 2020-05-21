import { Component, OnInit, OnDestroy } from "@angular/core";
import { CustomerService } from "../../../customers/customer.service";
import { AuthService } from "../../../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit, OnDestroy {
  isAuthenticatedStaff = false;
  userSub: Subscription;
  constructor(
    private customerService: CustomerService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      if (user && user.idRole.length == 1) {
        this.isAuthenticatedStaff = !user;
      } else if (user && user.idRole.length >= 2) {
        this.isAuthenticatedStaff = !!user;
      }
    });
  }

  onGetCustomers() {
    this.customerService.getCustomers();
  }

  onGetStaffs() {
    console.log("staffs");
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
