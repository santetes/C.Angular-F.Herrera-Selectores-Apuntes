import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [],
})
export class SelectorPageComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
  });

  private _regiones: string[] = [];

  get regiones(): string[] {
    return this._regiones;
  }

  constructor(private fb: FormBuilder, private paisService: PaisesService) {}

  ngOnInit(): void {
    this._regiones = this.paisService.regiones;
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
