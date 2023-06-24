import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { InvertoryApiService } from 'src/app/services/invertory-api.service';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-edit-sale',
  templateUrl: './edit-sale.component.html',
  styleUrls: ['./edit-sale.component.sass']
})
export class EditSaleComponent {


  CustomersList$!: Observable<any[]>;
  CouponsList$!: Observable<any[]>;
  ProductsList$!: Observable<any[]>;

  ProductsList : any=[];
  CouponsList : any=[];
  CustomersList : any=[];

    // Map to display data associate with foreign keys
    ProductsMap:Map <number, string> = new Map()
    CouponsMap:Map <number, string> = new Map()
    CustomersMap:Map <number, string> = new Map()
    editdata: any;

  constructor(private formBuilder: FormBuilder,
    private service : InvertoryApiService,
    private _snackBar: MatSnackBar,
    private dialogref: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }



      ngOnInit(): void {

        if (this.data.productcode != '' && this.data.productcode != null) {
          this.loadsaledata(this.data.productcode);
        }

        this.ProductsList$ = this.service.getProductsList();
        this.CouponsList$ = this.service.getCouponsList();
        this.CustomersList$ = this.service.getCustomersList();
        this.refreshProductsListMap();
        this.refreshCouponsListMap();
        this.refreshCustomersListMap();
    };


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

//Input details
    SaleForm = this.formBuilder.group({
      id:  this.formBuilder.control(''),
      customer_Name  : this.formBuilder.control(''),
      product_Name : this.formBuilder.control(''),
      quantity: this.formBuilder.control(''),
      date : this.formBuilder.control(''),
      unitPrice:  this.formBuilder.control(''),
      coupon : this.formBuilder.control(''),
      totalPrice : this.formBuilder.control(''),
      payment_method:this.formBuilder.control(''),
      productId: this.formBuilder.control(''),
      customerId: this.formBuilder.control(''),
      couponsId: this.formBuilder.control('')
    });

//Loads details for database
loadsaledata(code: any) {
  this.service.getSaleById(code.id).subscribe(res => {
    this.editdata = res;
    console.log(this.editdata);
    this.SaleForm.setValue({
      id: this.editdata.id,
      customer_Name: this.editdata.customer_Name,
      product_Name: this.editdata.product_Name,
      quantity: this.editdata.quantity,
      date: this.editdata.date,
      unitPrice: this.editdata.unitPrice,
      coupon : this.editdata.coupon ,
      totalPrice: this.editdata.totalPrice,
      payment_method: this.editdata.payment_method,

      productId: this.editdata.productId,
      customerId: this.editdata.customerId,
      couponsId: this.editdata.couponsId
    });
  });
}

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


    updateSale(){
      if (this.SaleForm.valid) {
      this.service.updateSales(this.SaleForm.value.id, this.SaleForm.value).subscribe(res => { 
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
            console.log("Invalid")
       } }

 //closes Dialog
 exit(){
  this.dialogref.close();
}

}
