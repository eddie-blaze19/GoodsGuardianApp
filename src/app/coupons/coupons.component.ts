import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvertoryApiService } from '../services/invertory-api.service';
import { AddCouponsComponent } from '../Components/add-coupons/add-coupons.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.sass']
})
export class CouponsComponent {
  CouponsList : any=[];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  accessdata: any;
  haveedit = false;
  haveadd = false;
  havedelete = false;

  constructor( private dialog: MatDialog, private service:InvertoryApiService ) {
    this.loadCouponsPage();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddCouponsComponent, {
      width:'30%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  ngOnInit(): void {  }
  ngAfterViewInit() { }

  loadCouponsPage() {
      this.service.getCouponsList().subscribe(res => {
      this.CouponsList = res;
      this.dataSource = new MatTableDataSource(this.CouponsList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
       });
     }

     displayedColumns: string[] =
     ['id', 'couponName','coupon', 'description' ]

     applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
      onRowClicked(row: any) {
        console.log('Row clicked: ', row);
    }

}
 