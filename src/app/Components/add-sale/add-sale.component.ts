import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { InvertoryApiService } from 'src/app/services/invertory-api.service';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.sass']
})
export class AddSaleComponent {

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

  constructor(private formBuilder: FormBuilder,
    private service : InvertoryApiService,
    private _snackBar: MatSnackBar,
    private dialogref: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  SaleForm: any;

      ngOnInit(): void {
        this.SaleForm = this.formBuilder.group({
          customer_Name  : 'null',
          product_Name : 'null',
          quantity: ['', Validators.required],
          date : ['', Validators.required],
          unitPrice:  ['', Validators.required],
          coupon : '0',
          totalPrice : ['', Validators.required],
          payment_method:['', Validators.required],
          productId: ['', Validators.required],
          customerId: ['', Validators.required],
          couponsId: ['', Validators.required],
        });

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



    addSales(){
      if (this.SaleForm.valid) {
      this.service.addSales(this.SaleForm.value).subscribe(res => {
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
