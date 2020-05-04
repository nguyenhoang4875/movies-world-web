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
import { StaffService } from "../staff.service";

@Component({
  selector: "app-staff-detail",
  templateUrl: "./staff-detail.component.html",
  styleUrls: ["./staff-detail.component.css"],
})
export class StaffDetailComponent implements OnInit, OnChanges {
  private _visible: boolean;
  isConfirm: boolean = false;

  @Input()
  get visible(): boolean {
    return this._visible;
  }
  @Input() staff: UserInfor = new UserInfor();
  @Input() isEditable: boolean = true;
  @Input() isNewStaff: boolean = false;
  @Output() visibleChange = new EventEmitter();
  @Output() onGoBackStaffsPage = new EventEmitter();

  set visible(value: boolean) {
    this._visible = value;
    this.visibleChange.emit(value);
  }

  editingStaff: UserInfor = new UserInfor();

  constructor(private staffService: StaffService) {}

  ngOnInit() {
    console.log(this.staff);
  }

  ngOnChanges(params: SimpleChanges) {
    if (params && params.staff) {
      this.editingStaff = cloneDeep(this.staff);
    }
  }

  onClose(e) {
    this.visible = false;
  }

  saveStaff(e) {
    if (this.staff && this.staff.id) {
      // update
      console.log("update");
      // this.customerService.updateCustomer(this.editingCustomer).subscribe();
      this.isConfirm = true;
    } else {
      // new
      console.log("new");
      //  this.customerService.newCustomer(this.editingCustomer).subscribe();
      this.staffService.newStaff(this.editingStaff);
      this.onGoBackFirstPage(e);
    }
  }

  onGoBackFirstPage(e) {
    this.visible = false;
    this.onGoBackStaffsPage.emit(this.visible);
  }
  onClickedConfirmEditted(e) {
    this.staffService.updateStaff(this.editingStaff);
  }
}
