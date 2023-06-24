import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from "rxjs";
import { InvertoryApiService } from 'src/app/services/invertory-api.service';
import { AddCustomerComponent } from '../Components/add-customer/add-customer.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EditSaleComponent } from '../Components/edit-sale/edit-sale.component';
import { AddSaleComponent } from '../Components/add-sale/add-sale.component';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.sass']
})
export class SalesComponent implements OnInit {

  SalesList$! : Observable<any[]>;
  ProductsList$! : Observable<any[]>;
  CouponsList$! : Observable<any[]>;
  CustomersList$! : Observable<any[]>;

  SalesList : any=[];
  ProductsList : any=[];
  CouponsList : any=[];
  CustomersList : any=[];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  accessdata: any;
  haveedit = true;
  haveadd = true;
  havedelete = true;


  // Map to display data associate with foreign keys
  ProductsMap:Map <number, string> = new Map()
  CouponsMap:Map <number, string> = new Map()
  CustomersMap:Map <number, string> = new Map()



constructor( private dialog: MatDialog,
      private service:InvertoryApiService,
      private _snackBar: MatSnackBar) {
      this.loadSalesPage();
 }

ngOnInit(): void {
  this.SalesList$ = this.service.getSalesList();
  this.ProductsList$ = this.service.getProductsList();
  this.CouponsList$ = this.service.getCouponsList();
  this.CustomersList$ = this.service.getCustomersList();
  this.refreshProductsListMap();
  this.refreshCouponsListMap();
  this.refreshCustomersListMap();

}
  refreshProductsListMap() {
    this.service.getProductsList().subscribe(data => {
      this.ProductsList = data;

      for(let i = 0; i < data.length; i++)
      {
        this.ProductsMap.set(this.ProductsList[i].id, this.ProductsList[i].product_Name);
      }
    })
  }
  refreshCouponsListMap() {
    this.service.getCouponsList().subscribe(data => {
      this.CouponsList = data;

      for(let i = 0; i < data.length; i++)
      {
        this.CouponsMap.set(this.CouponsList[i].id, this.CouponsList[i].coupon);
      }
    })
  }
  refreshCustomersListMap() {
    this.service.getCustomersList().subscribe(data => {
      this.CustomersList = data;

      for(let i = 0; i < data.length; i++)
      {
        this.CustomersMap.set(this.CustomersList[i].id, this.CustomersList[i].customer_Name);
      }
    })
  }

ngAfterViewInit() { }

loadSalesPage() {
    this.service.getSalesList().subscribe(res => {
    this.SalesList = res;
    this.dataSource = new MatTableDataSource(this.SalesList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
     });
   }

   addCustomer(){
    if(this.haveadd){
      this.openDialog('300ms', '150ms');
      this.openSnackBar ('Add Sale To Database')
   }else{
     this.openSnackBar ("You don't have access to Add Sale")
   }
   }

  addSale(){
    if(this.haveadd){
      this.opendialog('300ms', '150ms');
      this.openSnackBar ('Add Sale To Database')
   }else{
     this.openSnackBar ("You don't have access to Add Sale")
   }
   }

   updateSale( code : any){
    if(this.haveedit){
      this.OpenDialog('100ms', '60ms', code);
      this.openSnackBar (`Update Product ${code.id} Details`)
    }else{
      this.openSnackBar ("You don't have access for Edit")
    }
   }

   removeSale( code : any){
    if(this.havedelete){
      if(confirm(`Are you sure you want to delete Sale ${code.id}`)) {
            this.service.deleteSales(code.id).subscribe(res => {
              var closeModalBtn = document.getElementById('add-edit-modal-close');
              if(closeModalBtn) {
                closeModalBtn.click();
              }
              var showDeleteSuccess = document.getElementById('delete-success-alert');
              if(showDeleteSuccess) {
                showDeleteSuccess.style.display = "block";
              }
              setTimeout(function() {
                if(showDeleteSuccess) {
                  showDeleteSuccess.style.display = "none"
                }
              }, 4000);
              this.SalesList$ = this.service.getSalesList();
              });
            }}
             else{
              this.openSnackBar ("You don't have access for Delete");
              }
   }


   displayedColumns: string[] =
   ['id','productId','customerId',
    'quantity_name','date','unitprice','couponsId',
    'totalprice','payment_method','action' ]


 horizontalPosition: MatSnackBarHorizontalPosition = 'start';
 verticalPosition: MatSnackBarVerticalPosition = 'bottom';

openSnackBar (message: string) {
   this._snackBar.open( message , 'Done', {
     horizontalPosition: this.horizontalPosition,
     verticalPosition: this.verticalPosition,
   });
 }

openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  this.dialog.open(AddCustomerComponent, {
    width:'30%',
    enterAnimationDuration,
    exitAnimationDuration,
  });
}
opendialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  this.dialog.open(AddSaleComponent, {
    width:'30%',
    enterAnimationDuration,
    exitAnimationDuration,
  });
}
OpenDialog(enterAnimationDuration: string, exitAnimationDuration: string, code: string): void {
    const popup = this.dialog.open(EditSaleComponent, {
    width:'30%',
    enterAnimationDuration,
    exitAnimationDuration,
    data: {
      productcode: code
    }
 });
 popup.afterClosed().subscribe(res => {
  this.SalesList$ = this.service.getSalesList(); });
}


   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
    onRowClicked(row: any) {
      console.log('Row clicked: ', row);
  }
}

