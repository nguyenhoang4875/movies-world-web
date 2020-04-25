import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent {
  constructor(private authService: AuthService) {}
  onSubmit(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    this.authService.login(username, password);
  }
}
