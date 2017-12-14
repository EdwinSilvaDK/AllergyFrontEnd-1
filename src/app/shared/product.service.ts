import {Product} from './product.model';
import {Observable} from 'rxjs/observable';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import {Ingredient} from '../ingredient/shared/ingredient.model';
import {post} from 'selenium-webdriver/http';


const url = environment.apiEndpoint + '/product';


@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}
  ShoppingList: Array<string> = [];
  filteredListIds: Array <number> = [];
  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(url);
  }
  getProductById(id: number): Observable<Product> {
    return this.http
      .get<Product>
      (url + '/' + id);
  }
  deleteProductById(id: number): Observable<Product> {
    return this.http
      .delete<Product>(url + '/' + id);
  }
  createProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(url, product);
  }
  createFilteredList(ids: number[]): Observable<Product[]> {
    return this.http
      .post<Product[]>(url + '/' + 'FilteredProducts', ids);
  }
  editProduct(id: number , product: Product): Observable<Product> {
    return this.http
     .put<Product>(url + '/' + id, product);
  }
  addToFilteredList(id: number) {
    this.filteredListIds.push(id);
    localStorage.setItem('filteredListIds', JSON.stringify(this.filteredListIds));
  }
  addToShoppingList(name: string) {
    this.ShoppingList.push(name);
    console.log(this.ShoppingList);
    localStorage.setItem('shoppingList', JSON.stringify(this.ShoppingList));
}
  getfilteredList(): number[] {
    return JSON.parse(localStorage.getItem( 'filteredListIds'));
  }
  getShoppingList(): string[] {
    return JSON.parse(localStorage.getItem('shoppingList'));
}
  DeletefilteredList() {
    localStorage.removeItem('filteredListIds');
  }
  DeleteShoppingList() {
    localStorage.removeItem('shoppingList');
  }
}
