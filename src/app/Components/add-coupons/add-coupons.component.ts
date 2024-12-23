import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { InvertoryApiService } from 'src/app/services/invertory-api.service';

@Component({
  selector: 'app-add-coupons',
  templateUrl: './add-coupons.component.html',
  styleUrls: ['./add-coupons.component.sass']
})
export class AddCouponsComponent {

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

    AddCoupon() {
      if (this.CouponsForm.valid) {
      this.service.addCoupons(this.CouponsForm.value).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if(closeModalBtn) {
          closeModalBtn.click();
        }

        var showAddSuccess = document.getElementById('add-success-alert');
        if(showAddSuccess) {
          showAddSuccess.style.display = "block";
          this.dialogref.close();
        }
        setTimeout(function() {
          if(showAddSuccess) {
            showAddSuccess.style.display = "none"
          }
        }, 4000);
      })
    }
      else {
        this.openSnackBar("Invalid Form")

       }
    }

//closes Dialog
exit(){
  this.dialogref.close();
}

  }
