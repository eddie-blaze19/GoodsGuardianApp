import {AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddProductComponent } from 'src/app//Components/add-product/add-product.component';
import { MatDialog } from '@angular/material/dialog';
import { InvertoryApiService } from 'src/app//services/invertory-api.service';
import { fromEvent, debounceTime, distinctUntilChanged, tap, merge,
 BehaviorSubject, Observable, of, catchError, finalize } from 'rxjs';

 import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';


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
     haveedit = false;
     haveadd = false;
     havedelete = false;

    constructor( private dialog: MatDialog, private service:InvertoryApiService, private services: AuthService,
      private router: Router, private _snackBar: MatSnackBar) {
        this.loadProductPage()
      }

    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(AddProductComponent, {
        width:'30%',
        enterAnimationDuration,
        exitAnimationDuration,
      });
}

    ngOnInit(): void { }

    ngAfterViewInit() { }

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
  'update_date','unitprice','description']

  SetAccesspermission() {
    this.services.Getaccessbyrole(this.services.getrole(), 'product').subscribe(res => {
      this.accessdata = res;
      if(this.accessdata.length>0){
        this.haveadd=this.accessdata[0].haveadd;
        this.haveedit=this.accessdata[0].haveedit;
        this.havedelete=this.accessdata[0].havedelete;
        this.loadProductPage();
      }else{
        alert('you are not authorized to access.');
        this.router.navigate(['']);
      }

    });
  }



  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar (message: string) {
    this._snackBar.open( message , 'Done', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  updateproduct(code: any) {
    if(this.haveedit){
       this.openSnackBar ('Success')
    }else{
      this.openSnackBar ("You don't have access for Edit")
    }

  }
  removeproduct(code: any) {
    if(this.havedelete){
      this.openSnackBar ('Success')
   }else{
     this.openSnackBar ("You don't have access for Delete")
   }
  }
  addproduct() {
    if(this.haveadd){
      this.openSnackBar ('Success')
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
  }
  }


