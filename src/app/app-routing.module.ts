import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AdminComponent } from "./admin/admin.component";
import { AuthGuard } from "./auth/auth.guard";
import { CustomersComponent } from "./customers/customers.component";
import { StaffsComponent } from "./staffs/staffs.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: AuthComponent },
  {
    path: "admin",
    component: AdminComponent,
    //canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "staffs", pathMatch: "full" },
      { path: "staffs", component: StaffsComponent },
      { path: "customers", component: CustomersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
