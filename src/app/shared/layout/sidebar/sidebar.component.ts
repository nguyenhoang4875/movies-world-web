import { Component, OnInit } from "@angular/core";
import { CustomerService } from "../../../customers/customer.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  constructor(private customerService: CustomerService) {}

  ngOnInit() {}

  onGetCustomers() {
    this.customerService.getCustomers();
  }

  onGetStaffs() {
    console.log("staffs");
  }
}
