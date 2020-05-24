import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { UserDetail } from "../admin/user-detail.model";
import { StaffService } from "./staff.service";
import { cloneDeep } from "lodash";

@Component({
  selector: "app-staffs",
  templateUrl: "./staffs.component.html",
  styleUrls: ["./staffs.component.css"],
})
export class StaffsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  staffs: UserDetail[] = [];
  showedStaffs: UserDetail[] = [];
  selectedStaff: UserDetail = new UserDetail();

  search: string;
  page: number;
  pages: number;
  pagesArr: number[] = [];
  currentPage: number;
  numberOfPage = 2;

  isLoading = false;
  isShowStaffDetail: boolean = false;
  isEditableStaffDetail: boolean = false;
  isNewStaff: boolean = false;
  isGoBackPage: boolean = false;
  isConfirm: boolean = false;
  constructor(private staffService: StaffService) {}

  ngOnInit() {
    this.loadStaffs();
  }

  loadStaffs() {
    this.isLoading = true;
    this.subscription = this.staffService.isGoBack.subscribe((res) => {
      this.isGoBackPage = res;
    });

    this.staffService.staffsChanged.subscribe((res: UserDetail[]) => {
      this.staffs = res;

      console.log(this.staffs.length);

      this.separatePage(this.staffs);
    });
    this.staffs = this.staffService.getStaffs();
    this.separatePage(this.staffs);
  }

  private separatePage(staffs: UserDetail[]) {
    if (staffs) {
      this.pages = Math.ceil(staffs.length / this.numberOfPage);
      for (let i = 1; i <= this.pages; i++) {
        this.pagesArr.push(i);
      }
      this.onSelectPage(1);
      this.isLoading = false;
    } else {
      this.isLoading = false;
    }
  }

  onSelectPage(page: number) {
    this.currentPage = page;
    const temp = cloneDeep(this.staffs);

    this.showedStaffs = temp.splice(
      this.numberOfPage * (page - 1),
      this.numberOfPage
    );
  }

  onNextPage() {
    if (this.currentPage == this.pages) {
      return;
    }
    this.onSelectPage(this.currentPage + 1);
  }

  onPreviousPage() {
    if (this.currentPage == 1) {
      return;
    }
    this.onSelectPage(this.currentPage - 1);
  }

  editStaff(staff: UserDetail) {
    this.isShowStaffDetail = true;
    this.selectedStaff = staff;
    this.isEditableStaffDetail = true;
    this.isNewStaff = false;
  }

  newStaff(e) {
    this.isShowStaffDetail = true;
    this.selectedStaff = new UserDetail();
    this.isEditableStaffDetail = true;
    this.isNewStaff = true;
  }

  viewStaff(staff: UserDetail) {
    this.isShowStaffDetail = true;
    this.selectedStaff = staff;
    this.isEditableStaffDetail = false;
    this.isNewStaff = false;
  }

  deleteStaff(staff: UserDetail) {
    this.selectedStaff = staff;
    this.isConfirm = true;
  }

  searchStaff() {
    this.staffService.searchStaff(this.search);
  }

  onGoBackStaffsPage(e) {
    this.isShowStaffDetail = false;
  }

  onClickedConfirmDeleted() {
    this.staffService.deleteStaff(this.selectedStaff.id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
