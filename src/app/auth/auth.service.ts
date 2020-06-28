import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError, BehaviorSubject, observable, Observable } from "rxjs";
import { catchError, tap, map, take } from "rxjs/operators";

import { User } from "./user.model";
import { Role } from "./role.model";
import { UserDetail } from "../admin/user-detail.model";
import { environment } from "src/environments/environment.prod";

@Injectable({ providedIn: "root" })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  baseUrl = environment.baseUrl;
  userAuth = new BehaviorSubject<UserDetail>(null);

  constructor(private router: Router, private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post<User>(this.baseUrl + "/auth", {
        username: username,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData: User) => {
          this.handleAuthentication(
            resData.username,
            resData.token,
            resData.expired,
            resData.roles
          );
        })
      );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!userData) {
      return;
    }

    const loadedUSer = new User(
      userData.username,
      userData._token,
      userData.expired,
      userData.roles
    );

    if (loadedUSer.token) {
      this.user.next(loadedUSer);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/login"]);
    localStorage.clear();
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    } else {
      errorMessage = "Username or password is invalid";
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(
    username: string,
    token: string,
    expired: Date,
    roles: Role[]
  ) {
    const user = new User(username, token, expired, roles);
    this.user.next(user);
    localStorage.setItem("token", "Bearer " + token);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  onGetProfile() {
    return this.http.get<UserDetail>(this.baseUrl + "/profile");
  }

  public checkAdminRole(): Observable<boolean> {
    return this.user.pipe(
      take(1),
      map((user: User) => {
        let isValid = false;
        if (user) {
          user.roles.forEach((role: Role) => {
            if (role.name.localeCompare("ROLE_ADMIN") == 0) {
              isValid = true;
              return;
            }
          });
        }
        if (isValid) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
