import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AngularDateTimePickerModule } from "angular2-datetimepicker";
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule,
} from "@angular-material-components/datetime-picker";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

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
import { MoviesComponent } from "./movies/movies.component";
import { MovieListComponent } from "./movies/movie-list/movie-list.component";
import { MovieDetailComponent } from "./movies/movie-detail/movie-detail.component";
import { PlaceholderDirective } from "./shared/placeholder/placeholder.directive";
import { AlertComponent } from "./shared/layout/alert/alert.component";
import { ToastsComponent } from "./shared/layout/toasts/toasts.component";
import { MovieEditComponent } from "./movies/movie-edit/movie-edit.component";

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
    CustomersComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    CustomerEditComponent,
    StaffsComponent,
    StaffDetailComponent,
    MoviesComponent,
    MovieListComponent,
    MovieDetailComponent,
    PlaceholderDirective,
    AlertComponent,
    ToastsComponent,
    MovieEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularDateTimePickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
  ],
  providers: [
    CustomerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent],
})
export class AppModule {}
