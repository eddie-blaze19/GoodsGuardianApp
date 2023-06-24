import { Component, ViewChild } from '@angular/core';
import { AddOrdersComponent } from '../Components/add-orders/add-orders.component';
import { MatDialog } from '@angular/material/dialog';
import { InvertoryApiService } from '../services/invertory-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.sass']
})
export class PurchasesComponent {

  ProductsList : any=[];
  SuppliersList : any=[];
  PurchasesList : any=[];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  accessdata: any;
  haveedit = false;
  haveadd = false;
  havedelete = false;
  // Map to display data associate with foreign keys
  SuppliersMap:Map <number, string> = new Map()
  ProductsMap:Map <number, string> = new Map()

  constructor( private dialog: MatDialog, private service:InvertoryApiService ) {
    this.loadPurchasesPage();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddOrdersComponent, {
      width:'30%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  ngOnInit(): void {  }
  ngAfterViewInit() { }

  loadPurchasesPage() {
      this.service.getPurchasesList().subscribe(res => {
      this.PurchasesList = res;
      this.dataSource = new MatTableDataSource(this.PurchasesList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
       });
     }
// Vendor == Supplier
     displayedColumns: string[] =
     ['id', 'vendor','product_name',
      'deliveryDate','unitPrice','quantity',
      'totalPrice','productId','suppliersId','action']


      updateOrder( code : number){}
      removeOrder( code : number){}



     applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
      onRowClicked(row: any) {
        this.openDialog('100ms', '60ms' );
    }

}
