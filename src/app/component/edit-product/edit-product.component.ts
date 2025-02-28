import { EditService } from './../../../services/edit.service';
import { ApiService } from 'src/services/api.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CatType } from 'src/app/model/cat-type';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  categories?:CatType[];
newProduct :  FormGroup;


  constructor(private apiService :ApiService , private fb:FormBuilder,private editService:EditService

  ) {
    this.newProduct=fb.group({
title :['',Validators.required],
 price:['',Validators.required],
 description:['',Validators.required],
 categoryId:['',Validators.required],
 images:this.fb.array([this.fb.control('')]),
    })

  }

  ngOnInit(): void {
this.apiService.getAllCategory().subscribe({
  next:(cat)=>{this.categories=cat}
})
this.editService.currentData.subscribe({
  next :(editId)=>{
    if(editId){
    this.apiService.getPrductById(editId).subscribe({
      next:(productToEdit)=>{
        console.log('productToEdit',productToEdit)
        productToEdit.images.forEach(()=>{this.addImage()})//this to add all image in product not only first image
        this.newProduct.patchValue(productToEdit)
        this.categoryId?.setValue(productToEdit.category.id)//manual set category id value  //this because the category in productToEdit is set as array of variable and not assigned to spesific value categoryId
      }
    })
  }//if close
  }
})
  }
get images():FormArray{
  return this.newProduct.get('images') as FormArray
}
get categoryId(){
  return this.newProduct.get('categoryId')
}
  onSubmit(){

    this.apiService.postNewProduct(this.newProduct.value).subscribe({
      next:()=>{console.log('product added ')},
      error:(err)=>{console.log(err)}
     })

  }
  addImage(){
    this.images.push(this.fb.control(''))
  }

}
