import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../auth/auth.service";
import { User } from "../../../auth/user.model";
import { Location } from "@angular/common";
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
  parameterValue: string = "movies";
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.parameterValue = e.url.substring(e.url.lastIndexOf("/") + 1);
      }
    });
    this.authService.user.subscribe((user) => {
      this.loginedUser = user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
