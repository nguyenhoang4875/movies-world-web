import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authUrl = "";

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.authUrl + "/login", model).pipe(
      map((response: any) => {
        const user = response;
        if (user.result.succeeded) {
          localStorage.setItem("token", user.token);
        }
      })
    );
  }
}
