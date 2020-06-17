import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { cloneDeep } from "lodash";
import { UserDetail } from "../../admin/user-detail.model";
import { CustomerService } from "../customer.service";
import { Subscription } from "rxjs";
import { DataStorageService } from "../../shared/services/data-storage.service";

@Component({
  selector: "app-customer-detail",
  templateUrl: "./customer-detail.component.html",
  styleUrls: ["./customer-detail.component.css"],
})
export class CustomerDetailComponent implements OnInit, OnDestroy {
  id: number;
  subscription: Subscription;
  editingCustomer: UserDetail = new UserDetail();
  @Output() sendMessage = new EventEmitter();

  constructor(
    private customerService: CustomerService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      //this.editingCustomer = this.customerService.getCustomer(this.id);
      this.dataStorageService.fetchUser(this.id).subscribe((customer) => {
        this.editingCustomer = customer;
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
