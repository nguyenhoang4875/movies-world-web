import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AdminComponent } from "./admin/admin.component";
import { AuthGuard } from "./auth/auth.guard";
import { CustomersComponent } from "./customers/customers.component";
import { StaffsComponent } from "./staffs/staffs.component";
import { MovieDetailComponent } from "./movies/movie-detail/movie-detail.component";
import { MoviesComponent } from "./movies/movies.component";
import { MovieListComponent } from "./movies/movie-list/movie-list.component";
import { CustomerDetailComponent } from "./customers/customer-detail/customer-detail.component";
import { CustomerListComponent } from "./customers/customer-list/customer-list.component";
import { CustomerEditComponent } from "./customers/customer-edit/customer-edit.component";
import { MovieEditComponent } from "./movies/movie-edit/movie-edit.component";
import { StaffDetailComponent } from "./staffs/staff-detail/staff-detail.component";
import { StaffEditComponent } from "./staffs/staff-edit/staff-edit.component";
import { StaffListComponent } from "./staffs/staff-list/staff-list.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: AuthComponent },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "movies", pathMatch: "full" },
      {
        path: "customers",
        component: CustomersComponent,
        children: [
          { path: "", component: CustomerListComponent },
          { path: "new", component: CustomerEditComponent },
          {
            path: ":id",
            component: CustomerDetailComponent,
          },
          {
            path: ":id/edit",
            component: CustomerEditComponent,
          },
        ],
      },
      {
        path: "staffs",
        component: StaffsComponent,
        children: [
          { path: "", component: StaffListComponent },
          { path: "new", component: StaffEditComponent },
          { path: ":id", component: StaffDetailComponent },
          { path: ":id/edit", component: StaffEditComponent },
        ],
      },
      {
        path: "movies",
        component: MoviesComponent,
        children: [
          { path: "", component: MovieListComponent },
          { path: "new", component: MovieEditComponent },
          { path: ":id", component: MovieDetailComponent },
          { path: ":id/edit", component: MovieEditComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
