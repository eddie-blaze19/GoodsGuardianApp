import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from "rxjs";
import { InvertoryApiService } from 'src/app/services/invertory-api.service';
import { AddCustomerComponent } from '../Components/add-customer/add-customer.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.sass']
})
export class SalesComponent implements OnInit {

  ProductsList : any=[];
  CouponsList : any=[];
  CustomersList : any=[];
  SalesList : any=[];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  accessdata: any;
  haveedit = false;
  haveadd = false;
  havedelete = false;

  // Map to display data associate with foreign keys
  ProductsMap:Map <number, string> = new Map()
  CouponsMap:Map <number, string> = new Map()
  CustomersMap:Map <number, string> = new Map()

  SalesTitle: string = 'New';
  activateAddCustomerComponent  : boolean = false;
  Sales:any;

  constructor( private dialog: MatDialog,
    private service:InvertoryApiService,
    private services: AuthService ) {
      this.loadSalesPage();
 }

 openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  this.dialog.open(AddCustomerComponent, {
    width:'30%',
    enterAnimationDuration,
    exitAnimationDuration,
  });
}

ngOnInit(): void {  }
ngAfterViewInit() { }

loadSalesPage() {
    this.service.getSalesList().subscribe(res => {
    this.SalesList = res;
    this.dataSource = new MatTableDataSource(this.SalesList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
     });
   }



   displayedColumns: string[] =
   ['id',  'customer_name','product_name',
    'quantity_name','date','unitprice',
   'coupon','totalprice','payment_method',
   'productId','customerId','couponsId']

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
    onRowClicked(row: any) {
      console.log('Row clicked: ', row);
  }
}

