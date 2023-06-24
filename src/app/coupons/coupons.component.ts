import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvertoryApiService } from '../services/invertory-api.service';
import { AddCouponsComponent } from '../Components/add-coupons/add-coupons.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { EditCouponsComponent } from '../Components/edit-coupons/edit-coupons.component';

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
  haveedit = true;
  haveadd = true;
  havedelete = true;

  constructor( private dialog: MatDialog,
    private service:InvertoryApiService,
    private _snackBar: MatSnackBar) {
    this.loadCouponsPage();
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

 openSnackBar (message: string) {
    this._snackBar.open( message , 'Done', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
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

OpenDialog(enterAnimationDuration: string, exitAnimationDuration: string, code: string): void {
        const popup = this.dialog.open(EditCouponsComponent, {
        width:'30%',
        enterAnimationDuration,
        exitAnimationDuration,
        data: {
          couponcode: code
        }
     });
     popup.afterClosed().subscribe(res => {
      this.CouponsList = this.service.getCouponsList(); });
    }
     updateCoupon( code : any){
     if(this.haveedit){
      this.OpenDialog('100ms', '60ms', code);
      this.openSnackBar (`Update coupon ${code.id} Details`)
     }
     else{
    this.openSnackBar ("You don't have access for Edit")
     }
}
     removeCoupon( code : number){
        if(this.havedelete){
          if(confirm(`Are you sure you want to delete Sale ${code}`)) {
                this.service.deleteCoupons(code).subscribe(res => {
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
                  this.CouponsList = this.service.getCouponsList();
                  });
                }}
                 else{
                  this.openSnackBar ("You don't have access for Delete");
                  }

     }

     displayedColumns: string[] =
     ['id', 'couponName','coupon', 'description', 'action']

     applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
      onRowClicked(row: any) {
        console.log('Row clicked: ', row);
    }

}
