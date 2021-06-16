import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractCrudService<T> {

  protected path: any;

  constructor(protected http: HttpClient) { }

  getAll(params: string = ''.toLowerCase()): Observable<T[]> {
    return this.http.get<T[]>(this.path + params);
  }

  createOne(item: Partial<T>, params: string = ''): Observable<T> {
    return this.http.post<T>(this.path + params, item);
  }
  
  getOne(id: number, params: string = ''): Observable<T> {
    return this.http.get<T>(this.path + '/' + id + params);
  }

  editOne(id: number, item: Partial<T>, params: string = ''): Observable<T> {
    return this.http.put<T>(this.path + '/' + id + params, item);
  }

  deleteOne(id: number, params: string = ''): Observable<T> {
    return this.http.delete<T>(this.path + '/' + id + params);
  }
}
