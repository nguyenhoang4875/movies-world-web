import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError, BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { User } from "./user.model";
import { Role } from "./role.model";

export interface AuthResponseData {
  // kind: string;
  // idToken: string;
  // email: string;
  // refreshToken: string;
  // expiresIn: string;
  // localId: string;
  // registered?: boolean;

  username: string;
  token: string;
  roles: Role[];
}

@Injectable({ providedIn: "root" })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  roleIds: number[] = [];
  private tokenExpirationTimer: any;

  constructor(private router: Router, private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post<AuthResponseData>("http://localhost:9000/api/auth", {
        username: username,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          for (let role of resData.roles) {
            this.roleIds.push(role.id);
          }

          this.handleAuthentication(
            resData.username,
            resData.token,
            this.roleIds
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      username: string;
      _token: string;
      idRole: number[];
    } = JSON.parse(localStorage.getItem("userData"));

    if (!userData) {
      return;
    }

    const loadedUSer = new User(
      userData.username,
      userData._token,
      userData.idRole
    );

    if (loadedUSer.token) {
      this.user.next(loadedUSer);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/login"]);
    this.roleIds = [];
    localStorage.removeItem("userData");
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
    roleId: number[]
  ) {
    const user = new User(username, token, roleId);
    this.user.next(user);
    localStorage.setItem("userData", JSON.stringify(user));
  }
}
