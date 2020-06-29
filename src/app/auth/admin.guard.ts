import { User } from "./user.model";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { take, map } from "rxjs/operators";

import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { Role } from "./role.model";

@Injectable({ providedIn: "root" })
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map((user: User) => {
        let isValid = false;
        if (user) {
          user.roles.forEach((role: Role) => {
            console.log("roles ne: "+ role.name);
            
            if (role.name.localeCompare("ROLE_ADMIN") == 0) {
              isValid = true;
              return;
            }
          });
        }
        if (isValid) {
          return true;
        } else {
          return this.route.createUrlTree(["/login"]);
        }
      })
    );
  }
}
