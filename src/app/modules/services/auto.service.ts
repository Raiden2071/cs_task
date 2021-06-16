import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from 'src/app/models/auto';
import { AbstractCrudService } from 'src/app/shared/abstracts/abstract-crud.service';

@Injectable({
  providedIn: 'root'
})
export class AutoService extends AbstractCrudService<Car> {

  constructor(protected http:HttpClient) {
    super(http);
   }

   path = 'api/auto';
}
