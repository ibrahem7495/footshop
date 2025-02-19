import { ApiService } from './../../../server/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
   
  }

}
