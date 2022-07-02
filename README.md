# Formularios Reactivos - Selectores Anidados

---

**En esta sección hemos aprendido:**

- Incluir opciones en selectores de acuerdo a lo seleccionado en el selector anterior
- Resetear selectores cuando se detecte algún cambio en el selector anterior
- utilización de operadores RxJs (tap, combineLatest, switchMap)
  - **tap**: operaciones intermedias entre distintos Obsevables.
  - **CombineLatest**: combinar array de Observables (**codigo de ejemplo abajo**)
  - **SwitchMap**: encadenamiento de peticiones http según el resultado de la anterior
- Manejo de elementos html condicionales según estado de observable
- Refuerzo del módulo HttpClientModule
- Control del tipado en los observables

```javascript
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
```
