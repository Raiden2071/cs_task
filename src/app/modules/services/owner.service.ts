import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Owner } from 'src/app/models/owner';
import { AbstractCrudService } from 'src/app/shared/abstracts/abstract-crud.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerService extends AbstractCrudService<Owner> {

  constructor(protected http:HttpClient) {
    super(http);
   }

   path = 'api/owner';
}
