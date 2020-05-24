import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { cloneDeep } from "lodash";
import { UserDetail } from "../../admin/user-detail.model";
import { CustomerService } from "../customer.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-customer-detail",
  templateUrl: "./customer-detail.component.html",
  styleUrls: ["./customer-detail.component.css"],
})
export class CustomerDetailComponent implements OnInit, OnDestroy {
  id: number;
  editMode: boolean = false;
  subscription: Subscription;
  editingCustomer: UserDetail = new UserDetail();
  @Output() sendMessage = new EventEmitter();

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
    });
  }

  onSaveCustomer() {
    if (!this.editMode) {
      this.customerService.newCustomer(this.editingCustomer);
      this.router.navigate(["../"], { relativeTo: this.route });
    }
  }

  onCancel(e) {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  onClose(e) {}

  // // ngOnChanges(params: SimpleChanges) {
  // //   if (params && params.customer) {
  // //     this.editingCustomer = cloneDeep(this.customer);
  // //   }
  // // }

  // saveCustomer(e) {
  //   if (this.customer && this.customer.id) {
  //     // update
  //     this.isConfirm = true;
  //   } else {
  //     // new
  //     this.customerService
  //       .newCustomer(this.editingCustomer)
  //       .subscribe((customer) => {
  //         console.log(customer);
  //          this.customers.push(customer);
  //       });
  //     this.router.navigate(["../"], { relativeTo: this.route });
  //   }
  // }

  // onGoBackFirstPage(e) {
  //   this.visible = false;
  //   this.onGoBackCustomersPage.emit(this.visible);
  // }
  // onClickedConfirmEditted(e) {
  //   this.subscription = this.customerService
  //     .updateCustomer(this.editingCustomer)
  //     .subscribe();
  // }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
