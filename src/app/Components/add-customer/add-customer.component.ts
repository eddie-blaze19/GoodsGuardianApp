import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { InvertoryApiService } from 'src/app/services/invertory-api.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.sass']
})
export class AddCustomerComponent implements OnInit {

  SalesList$!: Observable<any[]>;
  CustomersList$!: Observable<any[]>;
  CouponsList$!: Observable<any[]>;
  ProductList$!: Observable<any[]>;

  constructor(private service: InvertoryApiService, private formBuilder: FormBuilder) { }



  @Input()Sales:any;
      id: number= 0;
      customer_Name : string = "";
      product_Name: string = "";
      quantity: number = 0 ;
      date: string = "";
      unitPrice: number= 0;
      coupon: number= 0;
      totalPrice: number= 0;
      payment_method: string = "";
      customerId!: number ;
      couponsId!: number ;
      productId!: number ;

      ngOnInit(): void {

    this.id = this.Sales.id;
    this.customer_Name = this.Sales.customer_Name;
    this.product_Name =  this.Sales.product_Name;
    this.quantity = this.Sales.quantity;
    this.unitPrice = this.Sales.unitPrice;
    this.coupon = this.Sales.coupon;
    this.totalPrice = this.Sales.totalPrice;
    this.payment_method = this.Sales.payment_method;

    this.customerId = this.Sales.customerId;
    this.productId = this.Sales.productId;
    this.couponsId = this.Sales.couponsId;

    this.SalesList$ = this.service.getSalesList();
    this.ProductList$ = this.service.getProductsList();
    this.CustomersList$ = this.service.getCustomersList();
    this.CouponsList$ = this.service.getCouponsList();

    };

    Salesform = this.formBuilder.group({
      customer_Name: this.formBuilder.control('', Validators.required),
      product_Name: this.formBuilder.control('', Validators.required),
      quantity: this.formBuilder.control('', Validators.required),
      name: this.formBuilder.control('', Validators.required),
      unitPrice: this.formBuilder.control('', Validators.required),
      coupon: this.formBuilder.control('', Validators.required),
      totalPrice: this.formBuilder.control('', Validators.required),
      payment_method: this.formBuilder.control('', Validators.required),
      role: this.formBuilder.control(''),
      isactive: this.formBuilder.control(false),

      customerId :this.formBuilder.control('', Validators.required),
      productId  :this.formBuilder.control('', Validators.required),
      couponsId :this.formBuilder.control('', Validators.required)

    });


    addCustomer(){
      
    }
    addSales() {
      this.service.addSales(this.Salesform.value).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if(closeModalBtn) {
          closeModalBtn.click();
        }

        var showAddSuccess = document.getElementById('add-success-alert');
        if(showAddSuccess) {
          showAddSuccess.style.display = "block";
        }
        setTimeout(function() {
          if(showAddSuccess) {
            showAddSuccess.style.display = "none"
          }
        }, 4000);
      })
    }

    updateSales() {
      var Sales = {
        id: this.id,
        customer_Name:this.customer_Name,
        product_Name : this.product_Name,
        quantity :this.quantity,
        unitPrice :this.unitPrice,
        coupon :this.coupon,
        totalPrice :this.totalPrice,
        payment_method :this.payment_method,
        customerId :this.customerId,
        productId  :this.productId,
        couponsId :this.couponsId
      }
      var id:number = this.id;
      this.service.updateSales(id,Sales).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if(closeModalBtn) {
          closeModalBtn.click();
        }

        var showUpdateSuccess = document.getElementById('update-success-alert');
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = "block";
        }
        setTimeout(function() {
          if(showUpdateSuccess) {
            showUpdateSuccess.style.display = "none"
          }
        }, 4000);
      })

    }

  }
