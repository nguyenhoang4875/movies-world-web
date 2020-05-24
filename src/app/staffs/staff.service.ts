import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UserDetail } from "../admin/user-detail.model";
import { Subject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class StaffService {
  private staffs: UserDetail[] = [
    new UserDetail({
      id: 1,
      username: "hang2k",
      password: "hang2k",
      fullName: "Lâm Vũ Hằng",
      email: "hang2k@gmail.com",
      phone: "09010101010",
      address: "Quảng Nam",
    }),
    new UserDetail({
      id: 2,
      username: "nhile",
      password: "nhile",
      fullName: "Lê Thị Quỳnh Nhi",
      email: "nhile@gmail.com",
      phone: "09010101010",
      address: "Huế",
    }),
    new UserDetail({
      id: 3,
      username: "trangnguyen",
      password: "trangnguyen",
      fullName: "Nguyễn Thị Thu Trang",
      email: "trangnguyen@gmail.com",
      phone: "09010101010",
      address: "Huế",
    }),
    new UserDetail({
      id: 4,
      username: "hoangnguyen",
      password: "hoangnguyen",
      fullName: "Nguyễn Văn Hoàng",
      email: "hoangnguyen@gmail.com",
      phone: "09010101010",
      address: "Hà Tĩnh",
    }),
    new UserDetail({
      id: 5,
      username: "nhinguyen",
      password: "nhinguyen",
      fullName: "Nguyễn Thị Yến Nhi",
      email: "nhinguyen@gmail.com",
      phone: "09010101010",
      address: "Huế",
    }),
  ];
  staffsChanged = new Subject<UserDetail[]>();
  isGoBack = new Subject<boolean>();
  goBack: boolean = false;
  getStaffs() {
    return this.staffs.slice();
  }

  newStaff(staff: UserDetail) {
    this.staffs.push(staff);
    this.staffsChanged.next(this.staffs.slice());
  }

  searchStaff(value: string) {
    let filterStaffs: UserDetail[] = [];
    if (!value) {
      this.staffsChanged.next(this.staffs.slice());
    } else {
      if (value) {
        for (let i = 0; i < this.staffs.length; i++) {
          if (
            this.staffs[i].username === value ||
            this.staffs[i].fullName.toLowerCase() === value ||
            this.staffs[i].email === value ||
            this.staffs[i].phone === value ||
            this.staffs[i].address.toLowerCase() === value
          ) {
            filterStaffs.push(this.staffs[i]);
          }
        }
      }
      this.staffsChanged.next(filterStaffs);
    }
  }

  updateStaff(staff: UserDetail) {
    const index = staff.id - 1;
    this.staffs[index] = staff;
    this.staffsChanged.next(this.staffs.slice());
  }

  deleteStaff(id: number) {
    this.staffs.splice(id - 1, 1);
    this.staffsChanged.next(this.staffs.slice());
  }
}
