import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

import { UserDetail } from "../admin/user-detail.model";
import { DataStorageService } from "../shared/services/data-storage.service";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class StaffService {
  private staffs: UserDetail[] = [];
  isToastsChanged = new BehaviorSubject<boolean>(false);

  constructor(private dataStorageService: DataStorageService) {}

  fetchStaffs() {
    return this.dataStorageService.fetchStaffs().pipe(
      tap((staffs) => {
        this.setStaffs(staffs);
      })
    );
  }

  setStaffs(staffs: UserDetail[]) {
    this.staffs = staffs;
  }

  getStaffs() {
    return this.staffs.slice();
  }

  getStaff(id: number): UserDetail {
    let position = this.getIndex(id);
    return this.staffs[position];
  }

  getIndex(id: number): number {
    let position = 0;
    this.staffs.forEach((item, index) => {
      if (item.id === id) {
        position = index;
      }
    });
    return position;
  }

  newStaff(staff: UserDetail) {
    return this.dataStorageService
      .newStaff(staff)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";

    if (errorResponse.error) {
      switch (errorResponse.error.message) {
        case "EXISTED EMAIL":
          errorMessage = "This email exists already";
          break;
        case "EXISTED USER":
          errorMessage = "This user exists already";
          break;
      }
    }

    return throwError(errorMessage);
  }

  updateStaff(staff: UserDetail) {
    return this.dataStorageService.updateCustomer(staff);
  }

  deleteStaff(id: number) {
    return this.dataStorageService.deleteCustomer(id);
  }

  onShowToasts(value: boolean) {
    this.isToastsChanged.next(value);
  }

}
