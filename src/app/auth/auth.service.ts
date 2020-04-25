import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { AuthResponseData } from "./auth-response-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  authUser = new AuthResponseData("test@test.com", "tester");

  constructor(private router: Router) {}

  login(username: string, password: string) {
    console.log(`${username} and ${password}`);
    if (
      username === this.authUser.username &&
      password === this.authUser.password
    ) {
      this.router.navigate(["/admin"]);
    }
  }
}
