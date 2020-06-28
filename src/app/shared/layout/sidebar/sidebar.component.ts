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

  isAdmin: boolean;

  constructor(
    private customerService: CustomerService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.checkAdminRole().subscribe((response) => {
      this.isAdmin = response;
    });
    console.log("admin: " + this.isAdmin);

    this.userSub = this.authService.user.subscribe((user) => {
      console.log(user);
      this.isAuthenticatedStaff = !!user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
