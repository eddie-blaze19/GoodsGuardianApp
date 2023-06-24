import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NavbarComponent } from './navbar/navbar.component';
import { BodyComponent } from './body/body.component';
import { SalesComponent } from './sales/sales.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { CouponsComponent } from './coupons/coupons.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SettingComponent } from './setting/setting.component';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { InvertoryApiService } from './services/invertory-api.service';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { AddCustomerComponent } from './Components/add-customer/add-customer.component';
import { AddOrdersComponent } from './Components/add-orders/add-orders.component';
import { AddCouponsComponent } from './Components/add-coupons/add-coupons.component';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from "@angular/material/card";
import { UsersComponent } from './Components/users/users.component';
import { UpdatepopupComponent } from './Components/updatepopup/updatepopup.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { RemoveComponent } from './Components/remove/remove.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { EditSaleComponent } from './Components/edit-sale/edit-sale.component';
import { AddSaleComponent } from './Components/add-sale/add-sale.component';
import { EditCouponsComponent } from './Components/edit-coupons/edit-coupons.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BodyComponent,
    SalesComponent,
    PurchasesComponent,
    CouponsComponent,
    CalendarComponent,
    SettingComponent,
    LoginComponent,
    SignupComponent,
    AddProductComponent,
    AddCustomerComponent,
    AddOrdersComponent,
    AddCouponsComponent,
    UsersComponent,
    UpdatepopupComponent,
    RemoveComponent,
    EditProductComponent,
    EditSaleComponent,
    AddSaleComponent,
    EditCouponsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HighchartsChartModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule ,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule, MatSortModule,
    MatSlideToggleModule ,
    MatSnackBarModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
        CalendarModule.forRoot({ provide: DateAdapter,
      useFactory: adapterFactory })
  ],
  providers: [InvertoryApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
