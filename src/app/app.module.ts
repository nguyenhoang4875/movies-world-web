import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";
import { AdminComponent } from "./admin/admin.component";
import { HeaderComponent } from "./shared/layout/header/header.component";
import { FooterComponent } from "./shared/layout/footer/footer.component";
import { SidebarComponent } from "./shared/layout/sidebar/sidebar.component";
import { DropdownDirective } from "./shared/dropdown.directive";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { CustomersComponent } from "./customers/customers.component";
import { CustomerDetailComponent } from "./customers/customer-detail/customer-detail.component";
import { StaffsComponent } from "./staffs/staffs.component";
import { AlertComponent } from "./shared/layout/alert/alert.component";
import { StaffDetailComponent } from './staffs/staff-detail/staff-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    CustomersComponent,
    CustomerDetailComponent,
    StaffsComponent,
    StaffDetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
