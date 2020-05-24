import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { CustomerService } from "../../../customers/customer.service";
import { UserDetail } from "../../../admin/user-detail.model";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.css"],
})
export class AlertComponent {
  private _visibleAlert: boolean;
  message = "Do you make sure save this action?";
  // @Input() customer: UserDetail;
  @Input() get visibleAlert(): boolean {
    return this._visibleAlert;
  }
  set visibleAlert(value: boolean) {
    this._visibleAlert = value;
    this.visibleAlertChange.emit(value);
  }
  @Output() visibleAlertChange = new EventEmitter();
  @Output() onGoBackFirstPage = new EventEmitter();
  @Output() clickedConfim = new EventEmitter();

  constructor() {}

  onConfirm() {
    this.clickedConfim.emit(event);
    this.visibleAlert = false;
    this.onGoBackFirstPage.emit(!this.visibleAlert);
  }

  onClosed() {
    this.visibleAlert = false;
  }
}
