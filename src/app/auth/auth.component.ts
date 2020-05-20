import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent {
  isLoading = false;
  error: string = null;
  constructor(private authService: AuthService, private route: Router) {}

  onSubmit(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    this.isLoading = true;
    this.authService.login(username, password).subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.route.navigate(["/admin"]);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.isLoading = false;
        this.error = errorMessage;
      }
    );
    form.reset();
  }
}
