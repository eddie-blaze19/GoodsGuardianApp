import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.sass'],
})
export class AddProductComponent implements OnInit {

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
    'Apple (Electronics)',
    'Samsung(Electronics)',
    'Sony (Electronics)',
    'Nike (Sportswear)',
    'Adidas (Sportswear)',
    'Puma (Sportswear)',
    'Gucci (Fashion)',
    'Louis Vuitton (Fashion)',
    'Chanel (Fashion)',
    'Maybelline (Cosmetics)',
    "L'Oréal (Cosmetics)",
    'Dove (Personal Care)',
    'Gillette (Personal Care)',
    'Dell (Computers)',
    'HP (Computers)',
    'Canon (Photography)',
    'Nikon (Photography)',
    'Panasonic (Home Appliances)',
    'LG (Home Appliances)',
    'IBM (Technology)',
    'Intel (Technology)',
    'Nike (Sportswear)',
    'Reebok (Sportswear)',
  ];

  product_status =
  [
    'In-Stock',
    'Out-Of-Stock',
    'Discontined',
    'ComingSoon'
  ];
  ProductForm: any;
 

  constructor(private Formbuilder: FormBuilder) {}

  ngOnInit(): void {
    this.ProductForm = this.Formbuilder.group({
      productname: ['', Validators.required],
      category: ['', Validators.required],
      sku: ['', Validators.required],
      date: ['', Validators.required],
      brandname: ['', Validators.required],
      quntity: ['', Validators.required],
      price: ['', Validators.required],
    });
  }


}
