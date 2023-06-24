import {Component, Inject, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { InvertoryApiService } from 'src/app/services/invertory-api.service';
import { AddProductComponent } from '../add-product/add-product.component';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.sass']
})
export class EditProductComponent implements OnInit{

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
editdata: any;

constructor(private builder: FormBuilder, private service : InvertoryApiService,
  private services: AuthService,  private _snackBar: MatSnackBar,
  private dialogref: MatDialogRef<AddProductComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any) {}


//captures the form elements
ngOnInit(): void {
  if (this.data.productcode != '' && this.data.productcode != null) {
    this.loadproductdata(this.data.productcode);
  }
}

//Input details
 ProductForm = this.builder.group({
  id: this.builder.control(''),
  product_Name: this.builder.control(''),
  category: this.builder.control(''),
  sku: this.builder.control(''),
  brand_Name: this.builder.control(''),
  items_instock: this.builder.control(''),
  product_Status: this.builder.control(''),
  update_Date: this.builder.control(''),
  unitPrice: this.builder.control(''),
  description:this.builder.control('')
});

//Loads details for database
loadproductdata(code: any) {
  this.service.getProductById(code.id).subscribe(res => {
    this.editdata = res;
    console.log(this.editdata);
    this.ProductForm.setValue({
      id: this.editdata.id,
      product_Name: this.editdata.product_Name,
      category: this.editdata.category,
      sku: this.editdata.sku,
      brand_Name: this.editdata.brand_Name,
      items_instock: this.editdata.items_instock,
      product_Status: this.editdata.product_Status,
      update_Date: this.editdata.update_Date,
      unitPrice: this.editdata.unitPrice,
      description: this.editdata.description
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

//Working
updateproduct() {
  this.service.updateProducts(this.ProductForm.value.id, this.ProductForm.value).subscribe(result => {
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
