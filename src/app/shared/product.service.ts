import {Product} from './product.model';
import {Observable} from 'rxjs/observable';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


const url = environment.apiEndpoint + '/product';


@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}
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
  editProduct(product: Product): Observable<Product> {
    return this.http
      .put<Product>(url, Product);
  }
}
