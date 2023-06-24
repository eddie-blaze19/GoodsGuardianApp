import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddProductComponent } from 'src/app//Components/add-product/add-product.component';
import { MatDialog } from '@angular/material/dialog';
import { InvertoryApiService } from 'src/app//services/invertory-api.service';
import {  Observable} from 'rxjs';

import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { EditProductComponent } from '../Components/edit-product/edit-product.component';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.sass'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule],
 })



export class InventoryComponent implements AfterViewInit, OnInit {

     ProductsList$! : Observable<any[]>;
     ProductsList : any=[];
     dataSource: any;
     @ViewChild(MatPaginator) paginator!: MatPaginator;
     @ViewChild(MatSort) sort!: MatSort;

     accessdata: any;
     haveedit = true;
     haveadd = true;
     havedelete = true;

     modalTitle:string = '';
     activateAddEditProductComponent:boolean = false;
     Products: any;

constructor( private dialog: MatDialog,
      private service:InvertoryApiService,
      private _snackBar: MatSnackBar) {
      this.loadProductPage()
      }

ngOnInit(): void {
     this.loadProductPage()
     }

ngAfterViewInit() {
      this.loadProductPage()
    }

    loadProductPage() {
     this.service.getProductsList().subscribe(res => {
     this.ProductsList = res;
     this.dataSource = new MatTableDataSource(this.ProductsList);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
      });
  }

  displayedColumns: string[] =
  ['id', 'Product_Name', 'category_name',
  'sku', 'brand_name','items_instock','product_status',
  'update_date','unitprice','description','action']

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


openSnackBar (message: string) {
  this._snackBar.open( message , 'Done', {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  });
}
openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  this.dialog.open(AddProductComponent, {
  width:'30%',
  enterAnimationDuration,
  exitAnimationDuration,
});
}
OpenDialog(enterAnimationDuration: string, exitAnimationDuration: string, code: string): void {
    const popup = this.dialog.open(EditProductComponent, {
    width:'30%',
    enterAnimationDuration,
    exitAnimationDuration,
    data: {
      productcode: code
    }
 });
 popup.afterClosed().subscribe(res => {
  this.ProductsList$ = this.service.getProductsList(); });
}
updateproduct(code: any) {
  if(this.haveedit){
    this.OpenDialog('100ms', '60ms', code);
    this.openSnackBar (`Update Product ${code.id} Details`)
  }else{
    this.openSnackBar ("You don't have access for Edit")
  }
}
removeproduct(code: any) {
if(this.havedelete){
if(confirm(`Are you sure you want to delete Product ${code.id}`)) {
      this.service.deleteProducts(code.id).subscribe(res => {
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
        this.ProductsList$ = this.service.getProductsList();
        });
      }}
       else{
        this.openSnackBar ("You don't have access for Delete");
        }
  }
addproduct() {
    if(this.haveadd){
      this.openDialog('100ms', '60ms',);
      this.openSnackBar ('Add Product To Database')
   }else{
     this.openSnackBar ("You don't have access for Create")
   }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onRowClicked(row: any) {
      console.log('Row clicked: ', row);
      this.ProductsList$ = this.service.getProductsList();
  }
}


