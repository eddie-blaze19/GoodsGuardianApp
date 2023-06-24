import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { InvertoryApiService } from 'src/app/services/invertory-api.service';
import { AddCouponsComponent } from '../add-coupons/add-coupons.component';

@Component({
  selector: 'app-edit-coupons',
  templateUrl: './edit-coupons.component.html',
  styleUrls: ['./edit-coupons.component.sass']
})
export class EditCouponsComponent {

  CouponsForm: any;

  constructor(
    private service: InvertoryApiService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialogref: MatDialogRef<AddCouponsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

      ngOnInit(): void {
        this.CouponsForm = this.formBuilder.group({
          couponName  : ['', Validators.required],
          coupon: ['', Validators.required],
          description : ['', Validators.required]
        });
    };

    //notifications-positions
horizontalPosition: MatSnackBarHorizontalPosition = 'start';
verticalPosition: MatSnackBarVerticalPosition = 'bottom';

//notifications
  openSnackBar(message: string) {
      this._snackBar.open( message , 'Done', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
}

updateCoupon() {
        this.service.updateProducts(this.CouponsForm.value.id, this.CouponsForm.value).subscribe(result => {
          var closeModalBtn = document.getElementById('add-edit-modal-close');
          if(closeModalBtn) {
            closeModalBtn.click();
          }
          var showUpdateSuccess = document.getElementById('update-success-alert');
          if(showUpdateSuccess) {
            showUpdateSuccess.style.display = "block";
            this.dialogref.close();
          }
          setTimeout(function() {
            if(showUpdateSuccess) {
              showUpdateSuccess.style.display = "none"
            }
          }, 4000);
        })

      }
      //closes Dialog
      exit(){
        this.dialogref.close();
      }
      }

