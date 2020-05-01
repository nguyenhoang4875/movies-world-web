import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { UserInfor } from "../../admin/user-infor.model";
import { cloneDeep } from "lodash";
import { CustomerService } from "../customer.service";

@Component({
  selector: "app-customer-detail",
  templateUrl: "./customer-detail.component.html",
  styleUrls: ["./customer-detail.component.css"],
})
export class CustomerDetailComponent implements OnInit, OnChanges {
  private _visible: boolean;
  isConfirm: boolean = false;

  @Input()
  get visible(): boolean {
    return this._visible;
  }
  @Input() customer: UserInfor = new UserInfor();
  @Input() isEditable: boolean = true;
  @Input() isNewCustomer: boolean = false;
  @Output() visibleChange = new EventEmitter();
  @Output() onGoBackCustomersPage = new EventEmitter();

  set visible(value: boolean) {
    this._visible = value;
    this.visibleChange.emit(value);
  }

  editingCustomer: UserInfor = new UserInfor();

  constructor(private customerService: CustomerService) {}

  ngOnInit() {}

  ngOnChanges(params: SimpleChanges) {
    if (params && params.customer) {
      this.editingCustomer = cloneDeep(this.customer);
    }
  }

  onClose(e) {
    this.visible = false;
  }

  saveCustomer(e) {
    if (this.customer && this.customer.id) {
      // update
      console.log("update");
      // this.customerService.updateCustomer(this.editingCustomer).subscribe();
      this.isConfirm = true;
    } else {
      // new
      console.log("new");
      //  this.customerService.newCustomer(this.editingCustomer).subscribe();
      this.customerService.newCustomer(this.editingCustomer);
      this.onGoBackFirstPage(e);
    }
  }

  onGoBackFirstPage(e) {
    this.visible = false;
    this.onGoBackCustomersPage.emit(this.visible);
  }
  onClickedConfirmEditted(e) {
    this.customerService.updateCustomer(this.editingCustomer);
  }
}
