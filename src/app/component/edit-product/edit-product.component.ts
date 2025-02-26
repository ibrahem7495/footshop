import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  // {
  //   "title": "string",
  //   "price": 0,
  //   "description": "string",
  //   "categoryId": 0,
  //   "images": [
  //     "string"
  //   ]
  // }
newProduct =new FormGroup({
title : new FormControl(''),
 price: new FormControl(''),
 description: new FormControl(''),
 categoryId: new FormControl(''),
 images: new FormControl(''),

})
  constructor() { }

  ngOnInit(): void {
  }

}
