import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { InvertoryApiService } from 'src/app/services/invertory-api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.sass'],
})

export class AddProductComponent implements OnInit  {

//Forms select options
  categoryList = [
    'Electronics',
    'Home Appliances',
    'Clothing and Accessories',
    'Beauty and Personal Care',
    'Health and Wellness',
    'Sports and Outdoors',
    'Home and Furniture',
    'Books and Stationery',
    'Office Supplies',
    'Food and Beverages',
    'Baby and Child Care',
    'Pet Supplies',
    'Tools and Home Improvement',
    'Jewelry and Watches',
    'Musical Instruments',
  ];
  brandList = [
    'Apple ',
    'Samsung',
    'Sony',
    'Nike ',
    'Adidas ',
    'Puma ',
    'Gucci ',
    'Louis Vuitton ',
    'Chanel ',
    'Maybelline',
    "L'Oréal",
    'Dove ',
    'Gillette ',
    'Dell ',
    'HP ',
    'Canon ',
    'Nikon ',
    'Panasonic ',
    'LG ',
    'IBM ',
    'Intel ',
    'Nike ',
    'Reebok ',
    'Generic'
  ];
//Variables
  ProductForm: any;

  constructor(
    private Formbuilder: FormBuilder,
    private service : InvertoryApiService,
    private _snackBar: MatSnackBar,
    private dialogref: MatDialogRef<AddProductComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any) {}

//captures the form elements
ngOnInit(): void {
  this.ProductForm = this.Formbuilder.group({
    product_Name: ['', Validators.required],
    category: ['', Validators.required],
    sku: ['', Validators.required],
    brand_Name: ['', Validators.required],
    items_instock: ['', Validators.required],
    product_Status: ['', Validators.required],
    update_Date: ['', Validators.required],
    unitPrice: ['', Validators.required],
    description:['', Validators.required]
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
//working
  AddProduct( ) {
    if (this.ProductForm.valid) {
      this.service.addProducts(this.ProductForm.value).subscribe(result => {
          this.dialogref.close();

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
       });
         }
          else {
          console.log(this.ProductForm.value)
          this.openSnackBar ('Please enter valid data.')
         }
     }
//closes Dialog
     exit(){
      this.dialogref.close();
    }

}
