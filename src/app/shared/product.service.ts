import {Product} from './product.model';
import {Observable} from 'rxjs/observable';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import {ProductAdministrationComponent} from '../product-administration/product-administration.component';

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
  editProduct(id: number , product: Product): Observable<Product> {
    return this.http
      .put<Product>(url + '/' + id, product);
  }
}
