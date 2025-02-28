import { EditService } from './../../../services/edit.service';
import { ProType } from 'src/app/model/pro-type';
import { ApiService } from '../../../services/api.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { CatType } from 'src/app/model/cat-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  products?: ProType[];
  proDetails?:ProType;
  Categories?:CatType[];
  catigoryId:number
  constructor(private apiService: ApiService ,	private offcanvasService :NgbOffcanvas, private editService:EditService
) {
  this.catigoryId =0;
}

  ngOnInit(): void {
    //get all product as defolt on initialize the page
    this.apiService.getAllProduts(20,0).subscribe({
      next:(apiProducts)=>{
        this.products = apiProducts;
        console.log(' this.products = ', this.products )
      },
      error:(err)=>{
        console.error(err)
      }
    })
    this.apiService.getAllCategory().subscribe({
      next:(allCategories)=>{
        this.Categories=allCategories;


      }
    })
  }
  // offcanvas
  openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' });
	}
  openProDetalis(proId:number){
this.apiService.getPrductById(proId).subscribe({
  next:(product)=>{
    this.proDetails=product
  },
  error:(err)=> {
console.error(err)
  },
})
  }
  categorySelection(){
this.apiService.getProductByCatId(20,0,this.catigoryId).subscribe({
  next:(ProductByCat)=>{
    if (this.catigoryId>0) {
      this.products=ProductByCat;
    }
    else{
      this.apiService.getAllProduts(20,0).subscribe({
          next:(apiProducts)=>{
            this.products = apiProducts;
            console.log(' this.products = ', this.products )
          },
          error:(err)=>{
            console.error(err)
          }
        })
    }

  }
})
  }
deletProduct(){
  this.apiService.deletProductById(this.proDetails?.id).subscribe({
    next :()=>{console.log('deleted successfuly')}
    ,error:(err)=>{console.error(err)}
  })
}
shareEditId(){
  this.editService.updateData(this.proDetails?.id)
}
}
