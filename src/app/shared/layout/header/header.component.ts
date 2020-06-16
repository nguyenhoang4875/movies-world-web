import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../auth/auth.service";
import { User } from "../../../auth/user.model";
import { Subject, BehaviorSubject } from "rxjs";
import { UserDetail } from "../../../admin/user-detail.model";
import {
  Router,
  ActivatedRoute,
  NavigationStart,
  NavigationEnd,
} from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  loginedUser: User;
  parameterValue: string;
  id: number;
  userAuth = new BehaviorSubject<UserDetail>(null);
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.parameterValue = this.onSubUrl(this.router.url.substring(1));

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.parameterValue = this.onSubUrl(e.url.substring(1)).replace(
          /\//g,
          " / "
        );
      }
    });
    this.authService.user.subscribe((user) => {
      this.loginedUser = user;
    });
  }

  private onSubUrl(url: string): string {
    let index = url.indexOf("/");
    return url.substring(index + 1);
  }

  onGetProfile() {
    this.authService.onGetProfile().subscribe((userAuth) => {
      this.userAuth.next(userAuth);
      this.router.navigate(["staffs", userAuth.id], {
        relativeTo: this.route,
      });
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
