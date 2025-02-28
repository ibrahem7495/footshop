import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { NewProduct } from 'src/app/model/new-product';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  private sharedData = new BehaviorSubject<number | undefined>(0);
  currentData = this.sharedData.asObservable(); // Expose as observable

 // Function to update data
 updateData(newValue: number | undefined) {
  this.sharedData.next(newValue);
}
  constructor() {

  }

}
