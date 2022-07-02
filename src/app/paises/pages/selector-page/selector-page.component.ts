import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';
import { Pais } from '../../interfaces/paises.interface';
import { switchMap, tap, map } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [],
})
export class SelectorPageComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required],
  });

  private _regiones: string[] = [];
  private _paises: Pais[] = [];
  private _fronteras: Pais[] = [];

  cargando: boolean = false;

  get regiones(): string[] {
    return this._regiones;
  }

  get paises(): Pais[] {
    return this._paises;
  }

  get fronteras() {
    return this._fronteras;
  }

  constructor(private fb: FormBuilder, private paisService: PaisesService) {}

  ngOnInit(): void {
    this._regiones = this.paisService.regiones;

    // Cuando cambie la región
    this.miFormulario
      .get<string>('region')
      ?.valueChanges.pipe(
        tap((_) => {
          this.miFormulario.controls['pais'].setValue('');
          this._paises = [];
          this.cargando = true;
        }),
        switchMap((region) => this.paisService.getPaisesPorRegion(region))
      )
      .subscribe((paises) => {
        this._paises = paises;
        this.cargando = false;
      });

    // Cuando cambie el Pais
    this.miFormulario
      .get<string>('pais')
      ?.valueChanges.pipe(
        tap((_) => {
          this.miFormulario.controls['frontera']?.setValue('');
          this._fronteras = [];
          this.cargando = true;
        }),
        switchMap((pais) => {
          return pais ? this.paisService.getFronterasPorPais(pais) : [];
        }),
        switchMap((listadoFronterasAbreviado) =>
          this.paisService.getNombreFronterasCompleto(listadoFronterasAbreviado)
        ),
        map((elementos: Pais[][]) => {
          let arrayTemporal: any = [];
          elementos.forEach((element) => {
            let pais = element[0];
            arrayTemporal.push(pais);
          });
          return arrayTemporal;
        })
      )
      .subscribe((arrayPaisesFronteras) => {
        this._fronteras = arrayPaisesFronteras;
        this.cargando = false;
      });
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
