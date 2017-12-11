import {Observable} from 'rxjs/observable';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import {environment} from '../../../environments/environment';
import {Ingredient} from './ingredient.model';



const url = environment.apiEndpoint + '/ingredient';


@Injectable()
export class IngredientService {
  constructor(private http: HttpClient) {}
  createIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http
      .post<Ingredient>(url, ingredient);
  }
  getIngredients(): Observable<Ingredient[]> {
    return this.http
      .get<Ingredient[]>(url);
  }
}

