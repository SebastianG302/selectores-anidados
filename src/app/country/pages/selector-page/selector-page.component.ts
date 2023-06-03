import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interfaces';
import { Observable, pipe, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit{

  public countriesByRegion: SmallCountry[] = [];

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
    
  })
  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ){}

  ngOnInit(): void {
    this.onRegionChanged();
  }

  get regions(): Region[]{
    return this.countriesService.regions;
  }

  onRegionChanged(): void{
    this.myForm.get('region')!.valueChanges
      .pipe(
        tap( () => this.myForm.get('country')!.setValue('') ),//formatear el selector

        //este operador espera un observable para retornar otro.
        //Util en caso de que se hagan muchas peticiones para evitar que sobrepongan las peticiones 
        switchMap(region => this.countriesService.getCountriesByRegion(region))
      )
      .subscribe(country => {
        this.countriesByRegion = country;
      })
  }


}
