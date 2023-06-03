import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingComponent } from './setting/setting.component';
import { InventoryComponent } from './inventory/inventory.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { SalesComponent } from './sales/sales.component';
import { CouponsComponent } from './coupons/coupons.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { SignupComponent } from './Components/signup/signup.component';
import { UsersComponent } from './Components/users/users.component';

const routes: Routes = [
  {path: '' , redirectTo: 'dashboard' , pathMatch:'full'},
  {path: 'dashboard' , component: DashboardComponent,canActivate:[AuthGuard]},
  {path: 'inventory' , component: InventoryComponent,canActivate:[AuthGuard]},
  {path: 'purchases' , component: PurchasesComponent,canActivate:[AuthGuard]},
  {path: 'sales' , component: SalesComponent,canActivate:[AuthGuard]},
  {path: 'coupons' , component: CouponsComponent,canActivate:[AuthGuard]},
  {path: 'calendar' , component: CalendarComponent,canActivate:[AuthGuard]},
  {path: 'setting' , component: SettingComponent,canActivate:[AuthGuard]},
  {path: 'user' , component: UsersComponent,canActivate:[AuthGuard]},  {component:LoginComponent,path:'login'},
  {component:SignupComponent,path:'signup'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
