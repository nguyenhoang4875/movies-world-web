import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { UserDetail } from "../../admin/user-detail.model";
import { cloneDeep } from "lodash";
import { StaffService } from "../staff.service";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params } from "@angular/router";
import { OnDestroy } from "@angular/core";
import { DataStorageService } from "../../shared/services/data-storage.service";

@Component({
  selector: "app-staff-detail",
  templateUrl: "./staff-detail.component.html",
  styleUrls: ["./staff-detail.component.css"],
})
export class StaffDetailComponent implements OnInit, OnDestroy {
  id: number;
  subscription: Subscription;
  editingStaff: UserDetail = new UserDetail();
  @Output() sendMessage = new EventEmitter();

  constructor(
    private staffService: StaffService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.dataStorageService.fetchUser(this.id).subscribe((staff) => {
        this.editingStaff = staff;
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
