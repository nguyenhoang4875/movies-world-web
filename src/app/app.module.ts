import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { AdminComponent } from "./admin/admin.component";
import { HeaderComponent } from "./shared/layout/header/header.component";
import { FooterComponent } from "./shared/layout/footer/footer.component";
import { SidebarComponent } from "./shared/layout/sidebar/sidebar.component";
import { DropdownDirective } from "./shared/dropdown.directive";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { CustomersComponent } from "./customers/customers.component";
import { CustomerListComponent } from "./customers/customer-list/customer-list.component";
import { CustomerDetailComponent } from "./customers/customer-detail/customer-detail.component";
import { CustomerService } from "./customers/customer.service";
import { CustomerEditComponent } from "./customers/customer-edit/customer-edit.component";
import { StaffsComponent } from "./staffs/staffs.component";
import { StaffDetailComponent } from "./staffs/staff-detail/staff-detail.component";
import { AlertComponent } from "./shared/layout/alert/alert.component";
import { MoviesComponent } from "./movies/movies.component";
import { MovieListComponent } from "./movies/movie-list/movie-list.component";
import { MovieDetailComponent } from "./movies/movie-detail/movie-detail.component";

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
    MoviesComponent,
    MovieListComponent,
    MovieDetailComponent,
    CustomerListComponent,
    CustomerEditComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    CustomerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
