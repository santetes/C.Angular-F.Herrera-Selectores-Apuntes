import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais } from '../interfaces/paises.interface';
import { combineLatest, map, Observable } from 'rxjs';

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
    return this.http.get<Pais[]>(`${this._url}name/${pais}`).pipe(
      map((pais) => {
        return pais[0].borders ? pais[0].borders : [];
      })
    );
  }

  getNombreFronterasCompleto(listadoFronterasAbreviado: string[]) {
    let listadoObservablesFronteras: Observable<Pais[]>[] = [];
    listadoFronterasAbreviado.forEach((abr) => {
      let paisObservable = this.http.get<Pais[]>(
        `https://restcountries.com/v3.1/alpha/${abr}`
      );
      listadoObservablesFronteras.push(paisObservable);
    });
    return combineLatest(listadoObservablesFronteras);
  }
}
