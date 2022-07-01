import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais } from '../interfaces/paises.interface';
import { map, Observable } from 'rxjs';
import { Pais2 } from '../interfaces/pais2.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private _regiones: string[] = [
    'america',
    'africa',
    'asia',
    'europe',
    'oceania',
  ];

  private _url: string = 'https://restcountries.com/v3.1/';

  get regiones(): string[] {
    return [...this._regiones];
  }

  constructor(private http: HttpClient) {}

  getPaisesPorRegion(region: string): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this._url}/region/${region}`);
  }

  getFronterasPorPais(pais: string) {
    return this.http.get<Pais2[]>(`${this._url}name/${pais}`).pipe(
      map((pais) => {
        return pais[0].borders ? pais[0].borders : [];
      })
    );
  }
}
