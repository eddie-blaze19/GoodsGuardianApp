import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { InvertoryApiService } from 'src/app/services/invertory-api.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { AddSaleComponent } from '../add-sale/add-sale.component';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.sass']
})
export class AddCustomerComponent implements OnInit {

  CustomerForm: any;

  constructor(
    private service: InvertoryApiService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private dialogref: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

      ngOnInit(): void {
        this.CustomerForm = this.formBuilder.group({
          customer_Name  : ['', Validators.required],
          password : ['', Validators.required],
          phone_no: ['', Validators.required],
          email:  ['', Validators.required],
          address : ['', Validators.required]
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
//Next Dialog
openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  this.dialog.open(AddSaleComponent, {
    width:'30%',
    enterAnimationDuration,
    exitAnimationDuration,
  });
}
    addCustomer() {
      if (this.CustomerForm.valid) {
      this.service.addCustomers(this.CustomerForm.value).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if(closeModalBtn) {
          closeModalBtn.click();
        }

        var showAddSuccess = document.getElementById('addCus-success-alert');
        if(showAddSuccess) {
          showAddSuccess.style.display = "block";
          this.openDialog('300ms', '150ms');
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
            console.log("Invalid")
       }
    }

//closes Dialog
exit(){
  this.dialogref.close();
}

  }
