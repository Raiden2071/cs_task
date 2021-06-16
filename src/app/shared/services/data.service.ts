import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  constructor() { }
  createDb() {
    return {
      
      auto: [
        {
          id: 1,
          stateNumber: 'FF228FF',
          firm: 'BMW',
          model: 'E3',
          productionYear: '2012'
        },
        {
          id: 2,
          stateNumber: 'A1337AA',
          firm: 'BMW',
          model: 'E3',
          productionYear: '2012'
        },
        {
          id: 3,
          stateNumber: 'AB2282AB',
          firm: 'Mercedes',
          model: 'cla 250',
          productionYear: '2012'
        }
      ],

      owner: [
        {
          id: 1,
          name: 'Andrey',
          surname: 'Andreev',
          patronymic: 'Andreevich',
          aCars: []
        },
        {
          id: 2,
          name: 'Andrey',
          surname: 'Andreev',
          patronymic: 'Andreevich',
          aCars: []
        },
        {
          id: 3,
          name: 'Andrey',
          surname: 'Andreev',
          patronymic: 'Andreevich',
          aCars: []
        }
      ]
    };
  }
}