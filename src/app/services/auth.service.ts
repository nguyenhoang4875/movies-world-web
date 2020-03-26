import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authUrl = "";

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.authUrl + "/login", model);
  }
}
