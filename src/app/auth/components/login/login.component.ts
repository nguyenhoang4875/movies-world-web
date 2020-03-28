import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private _authService: AuthService) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    this._authService.login(form.value).subscribe();
  }
}
