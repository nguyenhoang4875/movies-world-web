import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

import { UserDetail } from "../admin/user-detail.model";
import { DataStorageService } from "../shared/services/data-storage.service";

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
    return this.dataStorageService.newCustomer(staff);
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

  // newStaff(staff: UserDetail) {
  //   this.staffs.push(staff);
  //   this.staffsChanged.next(this.staffs.slice());
  // }

  // searchStaff(value: string) {
  //   let filterStaffs: UserDetail[] = [];
  //   if (!value) {
  //     this.staffsChanged.next(this.staffs.slice());
  //   } else {
  //     if (value) {
  //       for (let i = 0; i < this.staffs.length; i++) {
  //         if (
  //           this.staffs[i].username === value ||
  //           this.staffs[i].fullName.toLowerCase() === value ||
  //           this.staffs[i].email === value ||
  //           this.staffs[i].phone === value ||
  //           this.staffs[i].address.toLowerCase() === value
  //         ) {
  //           filterStaffs.push(this.staffs[i]);
  //         }
  //       }
  //     }
  //     this.staffsChanged.next(filterStaffs);
  //   }
  // }

  // updateStaff(staff: UserDetail) {
  //   const index = staff.id - 1;
  //   this.staffs[index] = staff;
  //   this.staffsChanged.next(this.staffs.slice());
  // }

  // deleteStaff(id: number) {
  //   this.staffs.splice(id - 1, 1);
  //   this.staffsChanged.next(this.staffs.slice());
  // }
}
